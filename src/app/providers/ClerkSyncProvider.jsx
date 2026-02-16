import { useEffect } from "react";
import { useUser, useOrganization } from "@clerk/clerk-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const ClerkSyncProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { organization, membership } = useOrganization();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;
    if (!organization) return;

    const syncUser = async () => {
      const ref = doc(db, "users", user.id);
      const snap = await getDoc(ref);

      // If user already stored → stop
      if (snap.exists()) return;

      await setDoc(ref, {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
        role: membership?.role === "org:admin" ? "admin" : "member",
        organizationId: organization.id,
        createdAt: new Date(),
      });

      console.log("User synced to Firestore");
    };

    syncUser();
  }, [user, isLoaded, organization, membership]);

  return children;
};

export default ClerkSyncProvider;
