import { createContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useOrganization } from "@clerk/clerk-react";

export const MembersContext = createContext();

export const MembersProvider = ({ children }) => {
  const { organization } = useOrganization();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (!organization) return;

    const q = query(
      collection(db, "users"),
      where("organizationId", "==", organization.id)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(data);
    });

    return () => unsub();
  }, [organization]);

  return (
    <MembersContext.Provider value={{ members }}>
      {children}
    </MembersContext.Provider>
  );
};
