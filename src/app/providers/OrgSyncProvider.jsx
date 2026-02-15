import { useEffect } from "react";
import { useOrganizationList } from "@clerk/clerk-react";

const OrgSyncProvider = ({ children }) => {
  const { organizationList, setActive, isLoaded } = useOrganizationList();

  useEffect(() => {
    if (!isLoaded) return;
    if (!organizationList) return;
    if (organizationList.length === 0) return;

    setActive({
      organization: organizationList[0].organization.id,
    });
  }, [isLoaded, organizationList, setActive]);

  return children;
};

export default OrgSyncProvider;
