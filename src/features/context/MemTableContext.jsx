import { createContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export const MemTableContext = createContext();

export const MemTableProvider = ({ children }) => {
  const [memTable, setMemTable] = useState([]);

  // 🔥 REALTIME FETCH
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "members"), // collection name
      (snap) => {
        const data = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setMemTable(data);
      },
      (err) => console.error(err)
    );

    return () => unsubscribe();
  }, []);

  // 🔥 ADD
  const addItem = async (item) => {
    try {
      await addDoc(collection(db, "members"), {
        person: item.person,
        role: item.role,
      });
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // 🔥 UPDATE
  const updateItem = async (editId, person, role) => {
    try {
      await updateDoc(doc(db, "members", editId), {
        person,
        role,
      });
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // 🔥 DELETE
  const removeItem = async (id) => {
    try {
      await deleteDoc(doc(db, "members", id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <MemTableContext.Provider
      value={{
        memTable,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </MemTableContext.Provider>
  );
};
