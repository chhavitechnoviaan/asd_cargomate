import { Truck, Clock, PackageCheck, PiggyBank } from "lucide-react";

const stats = [
  { label: "Total shipments", value: "1,245", change: "12.5%", icon: Truck },
  { label: "In Transit", value: "212", change: "5.3%", icon: Clock },
  { label: "Delivered", value: "933", change: "16.0%", icon: PackageCheck },
  { label: "Avg. savings", value: "18.6%", change: "20.0%", icon: PiggyBank },
];

const tradeLanes = [
  { route: "Ind→USA", percent: 32 },
  { route: "Ind→UAE", percent: 24 },
  { route: "Ind→China", percent: 14 },
  { route: "Ind→France", percent: 12 },
  { route: "Others", percent: 10 },
];

const shipments = [
  { id: "AS00001", route: "Ind→USA", status: "In Transit", eta: "10 May 2025" },
  { id: "AS00002", route: "Ind→UAE", status: "In Transit", eta: "10 May 2025" },
  { id: "AS00003", route: "Ind→China", status: "Delivered", eta: "10 May 2025" },
  { id: "AS00004", route: "Ind→France", status: "In Transit", eta: "10 May 2025" },
];

const chartPoints = [30, 90, 60, 140, 100, 190, 150, 230, 190, 260, 220, 300];

export default function DashboardOverview() {
  const chartMax = Math.max(...chartPoints);
  const chartWidth = 300;
  const chartHeight = 120;
  const step = chartWidth / (chartPoints.length - 1);
  const path = chartPoints
    .map((point, i) => {
      const x = i * step;
      const y = chartHeight - (point / chartMax) * chartHeight;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">
          Dashboard Overview
        </h2>

        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ label, value, change, icon: Icon }) => (
            <div
              key={label}
              className="bg-gray-50 rounded-xl p-3 flex items-start justify-between"
            >
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  {value}
                </p>
                <p className="text-xs text-green-600">{change}</p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">
                Shipment Performance
              </p>
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="mt-3 w-full h-28"
              preserveAspectRatio="none"
            >
              <path
                d={path}
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
              />
            </svg>
            <div className="mt-1 flex justify-between text-[10px] text-gray-400">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>Jun</span>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">
                Top Trade Lanes
              </p>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-3 space-y-2.5">
              {tradeLanes.map(({ route, percent }) => (
                <div key={route} className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 w-20 shrink-0">
                    {route}
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">
                Recent Shipments
              </p>
              <PackageCheck className="w-4 h-4 text-blue-600" />
            </div>
            <table className="mt-3 w-full text-xs">
              <thead>
                <tr className="text-gray-400 text-left">
                  <th className="font-medium pb-2">Shipment Id</th>
                  <th className="font-medium pb-2">Route</th>
                  <th className="font-medium pb-2">Status</th>
                  <th className="font-medium pb-2">ETA</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((s) => (
                  <tr key={s.id} className="border-t border-gray-100">
                    <td className="py-2 text-gray-500">{s.id}</td>
                    <td className="py-2 text-gray-500">{s.route}</td>
                    <td className="py-2 text-gray-500">{s.status}</td>
                    <td className="py-2 text-gray-500">{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-900">Cost Savings</p>
              <PiggyBank className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-3 flex-1 flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background:
                    "conic-gradient(#2563eb 0% 18.6%, #bfdbfe 18.6% 100%)",
                }}
              >
                <div className="w-14 h-14 rounded-full bg-white flex flex-col items-center justify-center">
                  <span className="text-sm font-bold text-gray-900">
                    18.6%
                  </span>
                  <span className="text-[9px] text-gray-400">
                    Avg. Savings
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-gray-500">Actual Cost</span>
                  <span className="font-semibold text-gray-900">
                    $32,00,000
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-200" />
                  <span className="text-gray-500">Saved</span>
                  <span className="font-semibold text-gray-900">
                    $10,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
