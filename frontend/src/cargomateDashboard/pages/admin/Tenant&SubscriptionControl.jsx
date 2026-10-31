import { Smartphone, Users, Package, Database, Code } from "lucide-react";

export default function TenantSubscriptionControl() {
  const usage = [
    { icon: Users, label: "Users", value: "24 / 50", percent: 48 },
    { icon: Package, label: "Shipments", value: "1,245 / 5,000", percent: 25 },
    { icon: Database, label: "Storage", value: "12.4 GB / 100 GB", percent: 12 },
    { icon: Code, label: "API Calls", value: "8,420 /50,000", percent: 17 },
  ];

  const handleAction = async (action) => {
    try {
      await fetch("/api/tenant/" + action, { method: "POST" });
    } catch (err) {}
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Smartphone className="w-6 h-6 text-purple-600" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tenant & Subscription Control</h2>
          <p className="text-sm text-gray-500">Manage tenant details, subscription plan and usage.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-purple-600 font-semibold text-sm mb-3">Tenant Information</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tenant ID</span>
              <span className="font-semibold text-gray-900">TEN-000245</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Company Name</span>
              <span className="font-semibold text-gray-900">ABC Exports Pvt. Ltd.</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-500">Tenant Status</span>
              <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Active
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Created On</span>
              <span className="font-semibold text-gray-900">20 May 2025</span>
            </div>
          </div>
        </div>

        <div className="border border-gray-100 rounded-lg p-4">
          <p className="text-purple-600 font-semibold text-sm mb-3">Subscription Plan</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current Plan</span>
              <span className="font-semibold text-gray-900">Enterprise Plan</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Billing Cycle</span>
              <span className="font-semibold text-gray-900">Yearly</span>
            </div>
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-500">Plan Status</span>
              <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Active
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Valid Until</span>
              <span className="font-semibold text-gray-900">24 May 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-lg p-4 mb-4">
        <p className="text-purple-600 font-semibold text-sm mb-4">Usage Summary</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {usage.map((u) => {
            const Icon = u.icon;
            return (
              <div key={u.label}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="text-sm text-gray-600">{u.label}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{u.value}</p>
                <div className="w-full h-1.5 bg-gray-100 rounded-full">
                  <div
                    className="h-1.5 bg-blue-500 rounded-full"
                    style={{ width: `${u.percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border border-gray-100 rounded-lg p-4 mb-4">
        <p className="text-purple-600 font-semibold text-sm mb-3">Access & Billing</p>
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <div>
            <p className="text-sm text-gray-500">Auto Renewal</p>
            <p className="text-sm font-semibold text-green-600">Enabled</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Payment Status</p>
            <p className="text-sm font-semibold text-green-600">Paid</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Billing Date</p>
            <p className="text-sm font-semibold text-gray-900">24 May 2026</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => handleAction("change-plan")}
          className="flex-1 px-4 py-2 rounded-lg border border-purple-300 text-purple-600 text-sm font-medium"
        >
          Change Plan
        </button>
        <button
          onClick={() => handleAction("manage-billing")}
          className="flex-1 px-4 py-2 rounded-lg border border-purple-300 text-purple-600 text-sm font-medium"
        >
          Manage Billing
        </button>
        <button
          onClick={() => handleAction("view-usage")}
          className="flex-1 px-4 py-2 rounded-lg border border-purple-300 text-purple-600 text-sm font-medium"
        >
          View usage
        </button>
      </div>
    </div>
  );
}