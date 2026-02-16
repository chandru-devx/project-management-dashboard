import { useContext, useState } from "react";
import { TaskContext } from "../features/context/TaskContext";
import TaskForm from "../features/projects/components/TaskForm";
import { IoTrashOutline } from "react-icons/io5";

const Tasks = () => {
  const { tasks, deleteTask } = useContext(TaskContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 max-w-5xl mx-auto text-black dark:text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold">Tasks</h2>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Add Task
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 text-xs uppercase">
            <tr>
              <th className="text-left px-6 py-3">Person</th>
              <th className="text-left px-6 py-3">Task</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
            {tasks.map((t) => (
              <tr
                key={t.id}
                className="hover:bg-gray-50 dark:hover:bg-zinc-800"
              >
                <td className="px-6 py-4">{t.person}</td>
                <td className="px-6 py-4">{t.task}</td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => deleteTask(t.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <IoTrashOutline size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tasks.length === 0 && (
          <div className="p-6 text-center text-gray-400 dark:text-gray-500">
            No tasks yet
          </div>
        )}
      </div>

      {/* MODAL */}
      <TaskForm isOpen={open} setIsOpen={setOpen} />
    </div>
  );
};

export default Tasks;
