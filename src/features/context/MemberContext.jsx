import { createContext, useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
    const [member, setMember] = useState([]);

    // 🔹 FETCH MEMBERS FROM FIRESTORE
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));

                const membersData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setMember(membersData);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchMembers();
    }, []);

    // 🔹 ADD MEMBER
    const addMembers = async (newMember) => {
        try {
            const docRef = await addDoc(collection(db, "users"), newMember);

            setMember((prev) => [
                ...prev,
                { id: docRef.id, ...newMember },
            ]);
        } catch (error) {
            console.error("Add member error:", error);
        }
    };

    // 🔹 DELETE MEMBER
    const deleteMember = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));

            setMember((prev) =>
                prev.filter((member) => member.id !== id)
            );
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <MemberContext.Provider
            value={{ member, addMembers, deleteMember }}
        >
            {children}
        </MemberContext.Provider>
    );
};
export default MemberContext