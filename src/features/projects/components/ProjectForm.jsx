import { useContext, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const ProjectForm = ({ isOpen, setIsOpen }) => {
  const { addProject } = useContext(ProjectContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "PLANNING",
    priority: "MEDIUM",
    start_date: "",
    end_date: "",
    team_members: [],
    team_lead: "",
    progress: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newProject = {
      id: Date.now(),
      ...formData,
    };

    addProject(newProject);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 w-full max-w-lg relative text-black dark:text-white">

        {/* CLOSE */}
        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-medium mb-4">
          Create New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Project Name
            </label>
            <input
              className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded px-3 py-2 mt-1 text-sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* DESC */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded px-3 py-2 mt-1 text-sm h-20"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* STATUS + PRIORITY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Status
              </label>
              <select
                className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded px-3 py-2 mt-1 text-sm"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option>PLANNING</option>
                <option>ACTIVE</option>
                <option>COMPLETED</option>
                <option>ON_HOLD</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Priority
              </label>
              <select
                className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded px-3 py-2 mt-1 text-sm"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
              </select>
            </div>
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded px-3 py-2 mt-1 text-sm"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-300">
                End Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded px-3 py-2 mt-1 text-sm"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
              />
            </div>
          </div>

          {/* LEAD */}
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Project Lead
            </label>
            <input
              placeholder="lead email"
              className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded px-3 py-2 mt-1 text-sm"
              value={formData.team_lead}
              onChange={(e) =>
                setFormData({ ...formData, team_lead: e.target.value })
              }
            />
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-2 text-sm">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
