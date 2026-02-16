import { createContext, useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useUser, useOrganization } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

  const { organization } = useOrganization();

  const [tasks, setTasks] = useState([]);

  // FETCH TASKS
  useEffect(() => {
    if (!organization?.id) return;

    const fetchTasks = async () => {
      const q = query(
        collection(db, "tasks"),
        where("organizationId", "==", organization.id)
      );

      const snap = await getDocs(q);

      const list = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTasks(list);
    };

    fetchTasks();
  }, [organization]);

  // ADD TASK
  const addTask = async (task) => {
    if (!organization?.id) {
      console.error("No organization");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        ...task,
        organizationId: organization.id, // ✅ FIX
        createdAt: new Date(),
      });

      setTasks(prev => [...prev, { id: docRef.id, ...task }]);
      toast.success("Task-Added")
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTasks(prev => prev.filter(t => t.id !== id));
    toast.error("Task-deleted")
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
