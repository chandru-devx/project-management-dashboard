import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaChartBar,
    FaCreditCard,
    FaUsers,
    FaUserPlus,
    FaUser,
    FaProjectDiagram,
    FaTasks,
    FaCog,
} from "react-icons/fa";


const SideBar = ({ collapsed }) => {

    const location = useLocation();

    const menuItemStyle = (path) => ({
        backgroundColor: location.pathname === path ? "#1f2937" : "transparent",
        color: "white",
    });

    const hoverStyle = {
        transition: "all 0.25s ease",
        "&:hover": {
            backgroundColor: "#1f2937",
            transform: "translateX(4px)",
        },
    };

    return (
        <Sidebar

            collapsed={collapsed}
            backgroundColor="#111827"
            style={{ height: "100vh" }}
            rootStyles={{
                borderRight: "none",
            }}
        >
            <Menu>
                <MenuItem className="mb-2" component={<Link to="/dashboard" />} style={menuItemStyle("/dashboard")} rootStyles={hoverStyle}>
                    Dashboard
                </MenuItem>


                <MenuItem icon={<FaHome />} component={<Link to="/dashboard" />} style={menuItemStyle("/dashboard")} rootStyles={hoverStyle}>
                    Dashboard
                </MenuItem>

                <MenuItem icon={<FaProjectDiagram />} component={<Link to="/projects" />} style={menuItemStyle("/project")} rootStyles={hoverStyle}>
                    Project
                </MenuItem>

                <MenuItem icon={<FaTasks />} component={<Link to="/tasks" />} style={menuItemStyle("/tasks")} rootStyles={hoverStyle}>
                    Tasks
                </MenuItem>

                {/* <MenuItem icon={<FaUsers />} component={<Link to="/members" />} style={menuItemStyle("/members")} rootStyles={hoverStyle}>
                    Members
                </MenuItem> */}

                <MenuItem icon={<FaChartBar />} component={<Link to="/analytics" />} style={menuItemStyle("/analytics")} rootStyles={hoverStyle}>
                    Analytics
                </MenuItem>

                <MenuItem icon={<FaCreditCard />} component={<Link to="/billing" />} style={menuItemStyle("/billing")} rootStyles={hoverStyle}>
                    Billing
                </MenuItem>

                <MenuItem icon={<FaUserPlus />} component={<Link to="/invite" />} style={menuItemStyle("/invite")} rootStyles={hoverStyle}>
                    Invite Member
                </MenuItem>

                {/* <MenuItem icon={<FaUser />} component={<Link to="/profile" />} style={menuItemStyle("/profile")} rootStyles={hoverStyle}>
                    Profile
                </MenuItem> */}

                <MenuItem icon={<FaCog />} component={<Link to="/settings" />} style={menuItemStyle("/settings")} rootStyles={hoverStyle}>
                    Settings
                </MenuItem>

            </Menu>
        </Sidebar>
    );
};

export default SideBar;
