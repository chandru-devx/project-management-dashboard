import { useEffect } from "react";
import { useUser, useOrganizationList } from "@clerk/clerk-react";

const OrganizationProvider = ({ children }) => {
    const { user } = useUser();
    const { organizationList, createOrganization } = useOrganizationList();

    useEffect(() => {
        if (!user) return;

        const setupOrg = async () => {
            if (organizationList?.length === 0) {
                await createOrganization({
                    name: `${user.firstName || "My"} Workspace`,
                });
            }
        };

        setupOrg();
    }, [user, organizationList]);

    return children;
};

export default OrganizationProvider;
