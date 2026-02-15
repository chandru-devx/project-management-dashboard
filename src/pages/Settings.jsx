import { useState } from "react";

export default function SettingsPage() {
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
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your account and workspace
        </p>
      </div>

      {/* PROFILE CARD */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-5">
        <h2 className="text-lg font-semibold">Profile</h2>

        <div className="grid md:grid-cols-2 gap-4">

          {/* NAME */}
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          {/* COMPANY */}
          <Input
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
          />

        </div>
      </div>

      {/* SECURITY */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold">Security</h2>

        <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
          Change Password
        </button>

        <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
          Enable 2FA
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
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
      <div className="bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold">Appearance</h2>

        <select
          name="theme"
          value={form.theme}
          onChange={handleChange}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* SAVE BUTTON */}
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

/* INPUT COMPONENT */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
