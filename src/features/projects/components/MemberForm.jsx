import { useContext, useState } from "react";
// import MemberContext from "../../context/MemberContext";
import { MemberContext } from "../../context/MemberContext";

export default function AddMemberForm({ isOpen, setIsOpen }) {

    const { addMembers } = useContext(MemberContext)

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "Frontend",
        status: "Active",
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.email) return;

        addMembers(form);   // 🔥 FIX

        setForm({
            name: "",
            email: "",
            role: "Frontend",
            status: "Active",
        });

        setIsOpen(false);
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-xl border">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">Add addMembers</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500">
                        ✕
                    </button>
                </div>

                {/* BODY */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">

                    {/* NAME */}
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Chandru"
                            className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="user@mail.com"
                            className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* ROLE */}
                    <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                        >
                            <option>Frontend</option>
                            <option>Backend</option>
                            <option>Designer</option>
                            <option>Manager</option>
                        </select>
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="text-sm text-gray-600">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 text-sm border rounded-md"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        >
                            Add addMembers
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
