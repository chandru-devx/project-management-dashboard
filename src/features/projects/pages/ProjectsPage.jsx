import { useState, useEffect, useContext } from "react";
import { FaPlus, FaSearch, FaFolderOpen } from "react-icons/fa";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import { ProjectContext } from "../../context/ProjectContext"; // 🔥 correct path
// import ProjectDetailsPage from "./ProjectDetailsPage";

export default function ProjectsPage() {
 
    const { projects } = useContext(ProjectContext);

    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);

    const [filters, setFilters] = useState({
        status: "ALL",
        priority: "ALL",
    });

    // 🔹 filter logic
    useEffect(() => {
        let filtered = projects || []; // 🔴 prevent undefined crash

        if (searchTerm) {
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }


        if (filters.status !== "ALL") {
            filtered = filtered.filter((p) => p.status === filters.status);
        }

        if (filters.priority !== "ALL") {
            filtered = filtered.filter((p) => p.priority === filters.priority);
        }

        setFilteredProjects(filtered);
    }, [projects, searchTerm, filters]);

    return (
        <div className="space-y-6 max-w-6xl mx-auto">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">Projects</h1>
                    <p className="text-gray-500">Manage and track your projects</p>
                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                    <FaPlus /> New Project
                </button>
            </div>

            {/* SEARCH + FILTER */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full max-w-sm">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        className="w-full pl-10 pr-4 py-2 border rounded"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    value={filters.status}
                    onChange={(e) =>
                        setFilters({ ...filters, status: e.target.value })
                    }
                    className="px-3 py-2 border rounded"
                >
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PLANNING">Planning</option>
                    <option value="COMPLETED">Completed</option>
                </select>

                <select
                    value={filters.priority}
                    onChange={(e) =>
                        setFilters({ ...filters, priority: e.target.value })
                    }
                    className="px-3 py-2 border rounded"
                >
                    <option value="ALL">All Priority</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
            </div>

            {/* PROJECT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredProjects.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <FaFolderOpen className="mx-auto text-5xl text-gray-400 mb-4" />
                        <h3 className="font-semibold">No projects found</h3>
                        <p className="text-gray-500 mb-4">
                            Create your first project
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            <FaPlus className="inline mr-2" />
                            Create Project
                        </button>
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                )}

            </div>

            {/* FORM */}
            <ProjectForm isOpen={open} setIsOpen={setOpen} />
        </div>
    );
}
