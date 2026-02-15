import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";

import DashBoard from "./pages/DashBoard";
import ProjectsPage from "./features/projects/pages/ProjectsPage";
// import { ProjectProvider } from "./features/context/ProjectContext";
import Project from "./pages/Project"
import Tasks from "./pages/Tasks";
import ProjectDetailsPage from "./features/projects/pages/ProjectDetailsPage";
import Analytics from "./pages/Analytics";
import Billing from "./pages/Billing";
import InviteMember from "./pages/InviteMember";
import Settings from "./pages/Settings";

// import PlanGuard from "./app/component/PlanGuard";
import RoleGuard from "./app/guards/RoleGuard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} /> */}

        {/* APP ROUTES */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<DashBoard />} />

          <Route path="projects" element={<Project />}>
            <Route index element={<ProjectsPage />} />
            <Route path=":id" element={<ProjectDetailsPage />} />
          </Route>




          <Route path="tasks" element={<Tasks />} />

          <Route path="analytics" element={<Analytics />} />
          <Route
            path="invite"
            element={
              <RoleGuard allowed={["admin"]}>
                <InviteMember />
              </RoleGuard>
            }
          />

          <Route
            path="billing"
            element={
              <RoleGuard allowed={["admin"]}>
                <Billing />
              </RoleGuard>
            }
          />

          <Route path="settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
