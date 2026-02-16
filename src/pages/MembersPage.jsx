import { useContext } from "react";
import { MembersContext } from "../features/context/MemberContext";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const MembersPage = () => {
    const { members } = useContext(MembersContext);

    const changeRole = async (id, newRole) => {
        try {
            await updateDoc(doc(db, "users", id), {
                role: newRole,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const removeMember = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Team Members</h1>

            <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase bg-white dark:bg-zinc-900 border dark:border-zinc-700">
                        <tr>
                            <th className="text-left px-6 py-3">Name</th>
                            <th className="text-left px-6 py-3">Email</th>
                            <th className="text-left px-6 py-3">Role</th>
                            <th className="text-right px-6 py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {members.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{m.name}</td>
                                <td className="px-6 py-4">{m.email}</td>

                                <td className="px-6 py-4">
                                    <select
                                        value={m.role}
                                        onChange={(e) => changeRole(m.id, e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                    >
                                        <option value="admin">admin</option>
                                        <option value="member">member</option>
                                    </select>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => removeMember(m.id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MembersPage;
