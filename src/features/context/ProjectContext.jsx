import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";


export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {

    // store LIST of projects
    const [projects, setProjects] = useState([]);
    
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded) return;
        if (!user) return;

        const unsubscribe = onSnapshot(
            collection(db, "projects"),
            (snap) => {
                const data = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProjects(data);
            },
            (err) => console.error(err)
        );

        return () => unsubscribe();
    }, [user, isLoaded]);








    const updateProjectStatus = async (id, newStatus) => {
        try {
            // update in firebase
            await updateDoc(doc(db, "projects", id), {
                status: newStatus,
            });

            // update in local state (IMPORTANT)
            setProjects((prev) =>
                prev.map((p) =>
                    p.id === id ? { ...p, status: newStatus } : p
                )
            );

        } catch (err) {
            console.error(err);
        }
    };



    // add project
    const addProject = async (newProject) => {
        try {
            const docRef = await addDoc(collection(db, "projects"), {
                name: newProject.name,
                description: newProject.description || "",
                status: newProject.status || "PLANNING",
                priority: newProject.priority || "MEDIUM",
                start_date: newProject.start_date,
                end_date: newProject.end_date,
                team_lead: newProject.team_lead,
                tasks: [],                // 👈 THIS FIXES EVERYTHING
                createdBy: "testUser",
                createdAt: serverTimestamp(),
            });


            console.log("Saved ID:", docRef.id);
            toast.success("Project-Added")

        } catch (error) {
            console.error("Add error:", error);
        }
    };


    // delete project
    const deleteProject = (id) => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        
    };

    // update project
    const updateProject = (updatedProject) => {
        setProjects((prev) =>
            prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
        );
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                addProject,
                deleteProject,
                updateProject,
                updateProjectStatus
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
