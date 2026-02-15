
import { FaCreditCard } from "react-icons/fa";
import Card from "../shared/ui/Card";
import SectionHeader from "../shared/ui/SectionHeader";
import Badge from "../shared/ui/Badge";


const Billing = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-gray-500 text-sm">
          Manage your subscription and billing details
        </p>
      </div>

      {/* PLAN */}
      <Card>
        <SectionHeader
          title="Current Plan"
          desc="Your active subscription plan"
          action={
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
              Upgrade
            </button>
          }
        />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Pro Plan</h3>
            <p className="text-sm text-gray-500">
              ₹999 / month
            </p>
          </div>

          <Badge color="green">Active</Badge>
        </div>
      </Card>

      {/* USAGE */}
      <Card>
        <SectionHeader title="Usage" desc="Current month usage" />

        <div className="space-y-4">
          <UsageBar label="Projects" used={3} total={10} />
          <UsageBar label="Members" used={5} total={20} />
        </div>
      </Card>

      {/* PAYMENT */}
      <Card>
        <SectionHeader title="Payment Method" />

        <div className="flex items-center gap-4">
          <FaCreditCard className="text-2xl text-gray-500" />
          <div>
            <p className="font-medium">Visa ending in 4242</p>
            <p className="text-sm text-gray-500">
              Expiry 12/27
            </p>
          </div>
        </div>

        <button className="mt-4 border px-4 py-2 rounded-md text-sm">
          Change card
        </button>
      </Card>

      {/* HISTORY */}
      <Card>
        <SectionHeader title="Billing History" />

        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">Feb 2026</td>
              <td>₹999</td>
              <td>
                <Badge color="green">Paid</Badge>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const UsageBar = ({ label, used, total }) => {
  const percent = (used / total) * 100;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{used}/{total}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          style={{ width: `${percent}%` }}
          className="h-2 bg-blue-600 rounded"
        />
      </div>
    </div>
  );
};

export default Billing;
