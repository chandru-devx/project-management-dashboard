import { Outlet } from "react-router-dom";
import { ProjectProvider } from "../features/context/ProjectContext";

const ProjectLayout = () => {
  return (
    <ProjectProvider>
      <Outlet />
    </ProjectProvider>
  );
};

export default ProjectLayout;
