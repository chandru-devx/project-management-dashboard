import { useUser } from "@clerk/clerk-react";
 

const Analytics = () => {
  

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Analytics Dashboard
      </h1>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Total Projects</h2>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Active Tasks</h2>
            <p className="text-2xl font-bold mt-2">34</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-sm text-gray-500">Team Members</h2>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>

        </div>
       
    </div>
  );
};

export default Analytics;
