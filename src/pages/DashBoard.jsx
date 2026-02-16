 import { useContext } from "react";
import { ProjectContext } from "../features/context/ProjectContext";
import { TaskContext } from "../features/context/TaskContext";
import { MembersContext } from "../features/context/MemberContext";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const DashBoard = () => {
  const { projects } = useContext(ProjectContext);
  const { tasks } = useContext(TaskContext);
  const { members } = useContext(MembersContext);

  /* ---------------- DUMMY DATA ---------------- */
  const weeklyTasks = [
    { day: "Mon", tasks: 2 },
    { day: "Tue", tasks: 5 },
    { day: "Wed", tasks: 1 },
    { day: "Thu", tasks: 6 },
    { day: "Fri", tasks: 4 },
  ];

  const projectStatus = [
    { name: "Planning", value: 2 },
    { name: "Active", value: 3 },
    { name: "Completed", value: 1 },
  ];

  const productivity = [
    { week: "W1", value: 30 },
    { week: "W2", value: 60 },
    { week: "W3", value: 45 },
    { week: "W4", value: 80 },
  ];

  const activities = [
    "Chandru created Project A",
    "Ravi completed task UI Fix",
    "Team invited new member",
    "Billing upgraded",
  ];

  return (
    <div className="p-6 w-full space-y-6 text-black dark:text-white">

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card title="Total Projects" value={projects?.length || 0} />
        <Card title="Active Tasks" value={tasks?.length || 0} />
        <Card title="Team Members" value={members?.length || 0} />

      </div>

      {/* ================= CHARTS ROW ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* WEEKLY TASKS */}
        <div className="xl:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Weekly Tasks</h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={weeklyTasks}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PROJECT STATUS */}
        <div className="xl:col-span-1 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Project Status</h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={projectStatus} dataKey="value" outerRadius={90}>
                {projectStatus.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* PRODUCTIVITY */}
        <div className="xl:col-span-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Productivity</h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productivity}>
              <XAxis dataKey="week" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* ================= BOTTOM ROW ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ACTIVITY */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 h-full">
          <h3 className="font-semibold mb-4">Recent Activity</h3>

          <div className="space-y-4">
            {activities.map((a, i) => (
              <div
                key={i}
                className="flex justify-between text-sm border-b border-gray-200 dark:border-zinc-800 pb-2"
              >
                <span className="text-gray-600 dark:text-gray-300">{a}</span>
                <span className="text-xs text-gray-400">now</span>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM PERFORMANCE */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 h-full">
          <h3 className="font-semibold mb-4">Team Performance</h3>

          <div className="space-y-5">
            <Progress label="Completed Tasks" value={80} />
            <Progress label="On-time Delivery" value={92} />
            <Progress label="Sprint Velocity" value={65} />
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashBoard;

/* ================= SMALL COMPONENTS ================= */

const Card = ({ title, value }) => (
  <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
    <h2 className="text-sm text-gray-500 dark:text-gray-400">{title}</h2>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const Progress = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded">
      <div className="bg-blue-600 h-2 rounded" style={{ width: `${value}%` }} />
    </div>
  </div>
);
