import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar collapsed={collapsed} />

      <div className="flex flex-1 flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-auto p-5 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
