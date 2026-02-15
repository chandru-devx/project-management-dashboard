import { useContext, useState } from "react";
import { ProjectContext } from "../../context/ProjectContext";

const ProjectForm = ({ isOpen, setIsOpen }) => {

    const { addProject } = useContext(ProjectContext)

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
            id: Date.now(), // simple id
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
        <div className="fixed inset-0 bg-black/20 backdrop-blur flex items-center justify-center z-50">
            <div className="bg-white border rounded-xl p-6 w-full max-w-lg relative">

                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black"
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button>

                <h2 className="text-xl font-medium mb-4">Create New Project</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="text-sm">Project Name</label>
                        <input
                            className="w-full border rounded px-3 py-2 mt-1 text-sm"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm">Description</label>
                        <textarea
                            className="w-full border rounded px-3 py-2 mt-1 text-sm h-20"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>

                    {/* Status + Priority */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">Status</label>
                            <select
                                className="w-full border rounded px-3 py-2 mt-1 text-sm"
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
                            <label className="text-sm">Priority</label>
                            <select
                                className="w-full border rounded px-3 py-2 mt-1 text-sm"
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

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">Start Date</label>
                            <input
                                type="date"
                                className="w-full border rounded px-3 py-2 mt-1 text-sm"
                                value={formData.start_date}
                                onChange={(e) =>
                                    setFormData({ ...formData, start_date: e.target.value })
                                }
                            />
                        </div>

                        <div>
                            <label className="text-sm">End Date</label>
                            <input
                                type="date"
                                className="w-full border rounded px-3 py-2 mt-1 text-sm"
                                value={formData.end_date}
                                onChange={(e) =>
                                    setFormData({ ...formData, end_date: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Team Lead */}
                    <div>
                        <label className="text-sm">Project Lead</label>
                        <input
                            placeholder="lead email"
                            className="w-full border rounded px-3 py-2 mt-1 text-sm"
                            value={formData.team_lead}
                            onChange={(e) =>
                                setFormData({ ...formData, team_lead: e.target.value })
                            }
                        />
                    </div>

                    {/* Team Members */}
                    <div>
                        <label className="text-sm">Team Members</label>
                        <input
                            placeholder="add member email"
                            className="w-full border rounded px-3 py-2 mt-1 text-sm"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (e.target.value) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            team_members: [...prev.team_members, e.target.value],
                                        }));
                                        e.target.value = "";
                                    }
                                }
                            }}
                        />

                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.team_members.map((email) => (
                                <div
                                    key={email}
                                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm flex items-center gap-1"
                                >
                                    {email}
                                    <button
                                        type="button"
                                        onClick={() => removeTeamMember(email)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-2 text-sm">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 border rounded"
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
