import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";
import DashBoard from "./pages/DashBoard";
import ProjectsPage from "./features/projects/pages/ProjectsPage";
import Project from "./pages/Project";
import Tasks from "./pages/Tasks";
import ProjectDetailsPage from "./features/projects/pages/ProjectDetailsPage";
import MembersPage from "./pages/MembersPage";
import Billing from "./pages/Billing";
import InviteMember from "./pages/InviteMember";
import Settings from "./pages/Settings";
import RoleGuard from "./app/guards/RoleGuard";
import { ProjectProvider } from "./features/context/ProjectContext";
import { TaskProvider } from "./features/context/TaskContext";
import { MembersProvider } from "./features/context/MemberContext";
import ThemeProvider from "./app/providers/ThemeProvider";


const App = () => {
  return (
    <BrowserRouter>

      <ThemeProvider>
        <ProjectProvider>
          <TaskProvider>
            <MembersProvider>
              <Routes>
                <Route path="/" element={<MainLayout />}>

                  <Route path="dashboard" element={<DashBoard />} />

                  <Route path="projects" element={<Project />}>
                    <Route index element={<ProjectsPage />} />
                    <Route path=":id" element={<ProjectDetailsPage />} />
                  </Route>

                  <Route path="tasks" element={<Tasks />} />


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
                  <Route path="membersPage" element={<MembersPage />} />
                  <Route path="settings" element={<Settings />} />

                </Route>
              </Routes>
            </MembersProvider>
          </TaskProvider>
        </ProjectProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
