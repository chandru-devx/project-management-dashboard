import { useEffect } from "react";
import { useUser, useOrganization } from "@clerk/clerk-react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ClerkSyncProvider = ({ children }) => {
  const { user } = useUser();
  const { organization } = useOrganization();

  useEffect(() => {
    if (!user) return;

    const sync = async () => {
      const ref = doc(db, "users", user.id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          email: user.primaryEmailAddress?.emailAddress,
          role: organization?.membership?.role === "org:admin" ? "admin" : "member",
          organizationId: organization?.id || null,
          createdAt: new Date(),
        });
      }
    };

    sync();
  }, [user, organization]);

  return children;
};

export default ClerkSyncProvider;
