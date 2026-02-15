import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ProjectContext } from "../../context/ProjectContext";
import MemTable from "../components/MemTable";
import { MemTableProvider } from "../../context/MemTableContext";

const priorityColors = {
  HIGH: "bg-red-100 text-red-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  LOW: "bg-gray-100 text-gray-600",
};

const ProjectDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, updateProjectStatus } = useContext(ProjectContext);

 if (!projects || projects.length === 0) {
  return <div className="p-6">Loading project...</div>;
}

const project = projects.find((p) => String(p.id) === String(id));

if (!project) {
  return <div className="p-6">Loading project...</div>;
}


  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">

      {/* BACK */}
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 cursor-pointer text-gray-700"
      >
        <FaArrowLeft />
        <span className="text-lg font-semibold">Back</span>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl border overflow-hidden">

        {/* DESKTOP TABLE HEADER */}
        <div className="hidden md:grid grid-cols-7 px-4 py-3 text-xs font-semibold text-gray-500 border-b">
          <div>TITLE</div>
          <div>TYPE</div>
          <div>PRIORITY</div>
          <div>STATUS</div>
          <div>ASSIGNEE</div>
          <div>START</div>
          <div>DUE</div>
        </div>

        {/* ROW */}
        <div className="px-4 py-4">

          {/* MOBILE VIEW */}
          <div className="md:hidden space-y-3 text-sm">
            <Row label="Title" value={project.name} />
            <Row label="Type" value="Project" />

            <Row
              label="Priority"
              value={
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[project.priority]
                    }`}
                >
                  {project.priority}
                </span>
              }
            />

            <Row
              label="Status"
              value={
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={project.status}
                  onChange={(e) =>
                    updateProjectStatus(project.id, e.target.value)
                  }
                >
                  <option value="PLANNING">PLANNING</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="ON_HOLD">ON_HOLD</option>
                </select>
              }
            />

            <Row
              label="Assignee"
              value={project.team_lead || "Unassigned"}
            />

            <Row
              label="Start Date"
              value={project.start_date || "-"}
            />

            <Row
              label="End Date"
              value={project.end_date || "-"}
            />
          </div>

          {/* DESKTOP ROW */}
          <div className="hidden md:grid grid-cols-7 items-center text-sm">
            <div>{project.name}</div>
            <div className="text-xs font-medium text-gray-700">Project</div>

            <div>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[project.priority]
                  }`}
              >
                {project.priority}
              </span>
            </div>

            <div>
              <select
                className="border rounded px-3 py-1 text-sm"
                value={project.status}
                onChange={(e) =>
                  updateProjectStatus(project.id, e.target.value)
                }
              >
                <option value="PLANNING">PLANNING</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="ON_HOLD">ON_HOLD</option>
              </select>
            </div>

            <div>{project.team_lead || "Unassigned"}</div>
            <div>{project.start_date || "-"}</div>
            <div>{project.end_date || "-"}</div>
          </div>
        </div>
      </div>

      {/* TEAM TABLE */}
      <MemTableProvider>
        <MemTable />
      </MemTableProvider>

    </div>
  );
};

const Row = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default ProjectDetailsPage;
