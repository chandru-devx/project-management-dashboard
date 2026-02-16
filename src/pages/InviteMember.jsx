import { useState } from "react";
import { useOrganization } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function InviteMember() {
  const { organization, isLoaded } = useOrganization();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("org:member");

  if (!isLoaded) return null;

  const sendInvite = async () => {
    if (!organization) {
      alert("Organization still not active");
      return;
    }

    await organization.inviteMember({
      emailAddress: email,
      role,
    });

    toast.success("Invite sent");
    setEmail("");
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-black dark:text-black">
      <h1 className="text-2xl font-semibold">Invite Member</h1>

      <div className="flex gap-3">
        <input
          className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 rounded w-full"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="org:member">Member</option>
          <option value="org:admin">Admin</option>
        </select>

        <button
          onClick={sendInvite}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Invite
        </button>
      </div>
    </div>
  );
}
