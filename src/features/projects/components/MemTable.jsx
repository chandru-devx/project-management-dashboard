import { useContext, useState } from "react";
import { MemTableContext } from "../../context/MemTableContext";
import { MdChangeCircle } from "react-icons/md";
import { IoPersonRemoveOutline } from "react-icons/io5";


const MemTable = () => {
    const { addItem, memTable, updateItem,removeItem } = useContext(MemTableContext)

    const [person, setPerson] = useState("")
    const [role, setRole] = useState("")
    const [editId, setEditId] = useState(null);

    // console.log(person)
    // console.log(role)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!person || !role) return;

        if (editId !== null) {
            updateItem(editId, person, role);  
            
        } else {
            addItem({ person, role });
        }

        setPerson("");
        setRole("");
    };


    const handleEdit = (item) => {
        setPerson(item.person);
        setRole(item.role);
        setEditId(item.id);
    };

    return (
        <div className="max-w-xl mx-auto mt-6">
            {/* CARD */}
            <div className="bg-neutral-900 rounded-xl shadow-md p-6 space-y-6">

                {/* TITLE */}
                <h2 className="text-lg font-semibold text-white">
                    Assign Members
                </h2>

                {/* FORM */}
                <form className="flex items-end gap-3" onSubmit={handleSubmit}>
                    {/* PERSON */}
                    <div className="flex-1">
                        <label className="block mb-1 text-sm text-gray-300">
                            Assign Person
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={person}
                            onChange={(e) => { setPerson(e.target.value) }}
                        />
                    </div>

                    {/* ROLE */}
                    <div className="flex-1">
                        <label className="block mb-1 text-sm text-gray-300">
                            Role
                        </label>
                        <input
                            type="text"
                            placeholder="Frontend / Designer"
                            className="w-full px-3 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={role}
                            onChange={(e) => { setRole(e.target.value) }}
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="h-[42px] px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    >
                        {editId ? "Update" : "Add"}
                    </button>
                </form>

                {/* TABLE */}
                <div className="border-t border-neutral-700 pt-4">
                    <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-gray-400 border-b border-neutral-700">
                            <tr>
                                <th className="py-2">Assigned Person</th>
                                <th className="py-2">Role</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-800">
                            {memTable.map((item) => (
                                <tr key={item.id} className="border-b border-neutral-800 items-center">
                                    <td className="py-2">{item.person}</td>
                                    <td className="py-2">{item.role}</td>
                                    <td>
                                        <MdChangeCircle
                                            size={22}
                                            className="cursor-pointer"
                                            onClick={() => handleEdit(item)}
                                        />
                                    </td>

                                    <td>
                                        <IoPersonRemoveOutline
                                            size={22}
                                            className="cursor-pointer"
                                            onClick={() => removeItem(item.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MemTable;
