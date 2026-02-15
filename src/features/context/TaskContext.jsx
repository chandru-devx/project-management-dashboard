import { createContext, useEffect, useState, useContext } from "react";
import { collection, addDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
// import { useAuth } from "../../app/providers/AuthProvider";
import { useUser } from "@clerk/clerk-react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);

  // 🔹 Fetch tasks from Firestore
  useEffect(() => {
    if (!user?.organizationId) return;

    const fetchTasks = async () => {
      try {
        const q = query(
          collection(db, "tasks"),
          where("organizationId", "==", user.organizationId)
        );

        const querySnapshot = await getDocs(q);

        const taskList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTasks(taskList);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchTasks();
  }, [user]);

  // 🔹 Add Task
  const addTask = async (task) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        ...task,
        organizationId: user.organizationId,
        createdAt: new Date(),
      });

      setTasks(prev => [...prev, { id: docRef.id, ...task }]);
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  // 🔹 Delete Task
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
