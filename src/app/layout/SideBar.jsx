import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { FaLayerGroup } from "react-icons/fa6";

import {
  FaHome,
  FaCreditCard,
  FaUsers,
  FaUserPlus,
  FaProjectDiagram,
  FaTasks,
  FaCog,
} from "react-icons/fa";

const SideBar = ({ collapsed }) => {
  const location = useLocation();
  const isDark = document.documentElement.classList.contains("dark");

  const menuItemStyle = (path) => ({
    backgroundColor:
      location.pathname === path
        ? isDark
          ? "#1f2937"
          : "#e5e7eb"
        : "transparent",
    color: isDark ? "white" : "#111827",
  });

  const hoverStyle = {
    transition: "all 0.25s ease",
    "&:hover": {
      backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      transform: "translateX(4px)",
    },
  };

  return (
    <Sidebar
      collapsed={collapsed}
      backgroundColor={isDark ? "#111827" : "#ffffff"}
      style={{ height: "100vh" }}
      rootStyles={{
        borderRight: isDark ? "none" : "1px solid #e5e7eb",
      }}
    >
      <Menu>
       

        <MenuItem
          icon={<FaLayerGroup size={18} />}
          component={<Link to="/dashboard" />}
          style={menuItemStyle("/dashboard")}
          rootStyles={hoverStyle}
          className="font-semibold tracking-wide"
        >
          WorkPilot
        </MenuItem>

        <MenuItem
          icon={<FaHome />}
          component={<Link to="/dashboard" />}
          style={menuItemStyle("/dashboard")}
          rootStyles={hoverStyle}
          className="mt-4"
        >
          Dashboard
        </MenuItem>

        <MenuItem
          icon={<FaProjectDiagram />}
          component={<Link to="/projects" />}
          style={menuItemStyle("/project")}
          rootStyles={hoverStyle}
        >
          Project
        </MenuItem>

        <MenuItem
          icon={<FaTasks />}
          component={<Link to="/tasks" />}
          style={menuItemStyle("/tasks")}
          rootStyles={hoverStyle}
        >
          Tasks
        </MenuItem>

        <MenuItem
          icon={<FaUsers />}
          component={<Link to="/membersPage" />}
          style={menuItemStyle("/members")}
          rootStyles={hoverStyle}
        >
          Members
        </MenuItem>

        <MenuItem
          icon={<FaCreditCard />}
          component={<Link to="/billing" />}
          style={menuItemStyle("/billing")}
          rootStyles={hoverStyle}
        >
          Billing
        </MenuItem>

        <MenuItem
          icon={<FaUserPlus />}
          component={<Link to="/invite" />}
          style={menuItemStyle("/invite")}
          rootStyles={hoverStyle}
        >
          Invite Member
        </MenuItem>

        <MenuItem
          icon={<FaCog />}
          component={<Link to="/settings" />}
          style={menuItemStyle("/settings")}
          rootStyles={hoverStyle}
        >
          Settings
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SideBar;
