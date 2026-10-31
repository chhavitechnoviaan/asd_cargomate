import { Fragment } from "react";
import { Copy, X } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

const stats = [
  { label: "Paid on Time", value: "68.4%", sub: "of invoices" },
  { label: "Outstanding Amount", value: "₹1,78,56,000" },
  { label: "Avg. Payment Cycle", value: "32 Days" },
  { label: "Overdue Increase", value: "12.7%", sub: "vs last month" },
];

const overview = [
  { label: "Total Invoices:", value: "125", label2: "Total Invoiced Amount:", value2: "₹5,68,90,000" },
  { label: "Paid Invoices:", value: "125", label2: "Total Paid Amount:", value2: "₹5,68,90,000" },
  { label: "Pending Invoices:", value: "125", label2: "Outstanding Amount:", value2: "₹5,68,90,000" },
  { label: "Overdue Invoices:", value: "125", label2: "Overdue Amount:", value2: "₹5,68,90,000" },
];

const trendData = [
  { month: "Mar", paid: 55, invoiced: 5 },
  { month: "Apr", paid: 130, invoiced: 100 },
  { month: "May", paid: 130, invoiced: 100 },
  { month: "Jun", paid: 190, invoiced: 150 },
];

export default function InvoiceInsightsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
              <Copy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Invoice Insights</h2>
              <p className="text-sm text-gray-500">Detailed insights and analytics of your invoices.</p>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="border border-gray-100 rounded-lg p-3">
              <p className="font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
              {s.sub && <p className="text-xs text-gray-400">{s.sub}</p>}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="font-bold text-gray-900 mb-3">Invoice Overview</p>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {overview.map((o, i) => (
              <Fragment key={i}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{o.label}</span>
                  <span className="text-gray-900 font-medium">{o.value}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{o.label2}</span>
                  <span className="text-gray-900 font-medium">{o.value2}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <p className="font-bold text-gray-900 mb-2">Payment Trend</p>
        <div className="flex gap-6 mb-2">
          <span className="flex items-center gap-1 text-sm text-gray-700">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Paid Amount
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-700">
            <span className="w-2 h-2 rounded-full bg-blue-500" /> Invoiced Amount
          </span>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => (v >= 100 ? `${(v / 100).toFixed(1)}Cr` : `${v}L`)}
              />
              <Line type="monotone" dataKey="paid" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="invoiced" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}