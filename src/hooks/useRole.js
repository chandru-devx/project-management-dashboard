import { useUser } from "@clerk/clerk-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export const useRole = () => {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchRole = async () => {
      const snap = await getDoc(doc(db, "users", user.id));
      if (snap.exists()) {
        setRole(snap.data().role);
      }
      setLoading(false);
    };

    fetchRole();
  }, [user, isLoaded]);

  return { role, loading, user };
};
