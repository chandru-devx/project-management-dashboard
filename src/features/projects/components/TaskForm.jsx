import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";

export default function TaskForm({ isOpen, setIsOpen }) {
  const { addTask } = useContext(TaskContext);

  const [form, setForm] = useState({
    person: "",
    task: "",
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
    if (!form.person || !form.task) return;

    addTask(form);
    setForm({ person: "", task: "" });
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl w-full max-w-md shadow-lg text-black dark:text-white">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-zinc-800 px-5 py-4">
          <h2 className="font-semibold">Create Task</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Person
            </label>
            <input
              name="person"
              value={form.person}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">
              Task
            </label>
            <input
              name="task"
              value={form.task}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
