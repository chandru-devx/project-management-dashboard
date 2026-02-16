import { useState, useContext } from "react";
import { ThemeContext } from "../app/providers/ThemeProvider";

export default function SettingsPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    name: "Chandru",
    email: "chandru@mail.com",
    company: "Admin Dashboard",
    theme: "light",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("SAVE SETTINGS:", form);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6 text-black dark:text-white">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-black">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-black-400">
          Manage your account and workspace
        </p>
      </div>

      {/* PROFILE */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 space-y-5">
        <h2 className="text-lg font-semibold">Profile</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Company" name="company" value={form.company} onChange={handleChange} />
        </div>
      </div>

 

      {/* NOTIFICATIONS */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold">Notifications</h2>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="notifications"
            checked={form.notifications}
            onChange={handleChange}
          />
          Email notifications
        </label>
      </div>

      {/* THEME */}
      <button
        onClick={toggleTheme}
        className="border border-gray-300 dark:border-zinc-700 px-3 py-1 rounded"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      {/* SAVE */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm"
        >
          Save Changes
        </button>
      </div>

    </div>
  );
}

/* INPUT */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600 dark:text-gray-300">
        {label}
      </label>
      <input
        {...props}
        className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
