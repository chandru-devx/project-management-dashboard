import { useEffect } from "react";
import { useOrganizationList } from "@clerk/clerk-react";

export default function OrgActiveProvider({ children }) {
  const { isLoaded, setActive, organizationList } = useOrganizationList();

  useEffect(() => {
    if (!isLoaded) return;
    const org = organizationList?.[0]?.organization;
    if (!org) return;

    // Set this org as active in the session
    setActive({ organization: org.id });
  }, [isLoaded, organizationList, setActive]);

  return children;
}
