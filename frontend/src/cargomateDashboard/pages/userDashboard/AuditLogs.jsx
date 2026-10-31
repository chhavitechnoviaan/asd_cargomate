import { useState } from "react";
import { FiDownload, FiSettings, FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight, FiFilter, FiX } from "react-icons/fi";
import { MdOutlineAssignment, MdOutlinePeople, MdOutlineLocalShipping, MdOutlineWarning, MdOutlineReportProblem, MdOutlineStorage } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ChessPawn, Flower } from 'lucide-react';

import NeedHelp from "../../components/core/NeedHelp"

const lineData = [
  { date: "18 Apr", count: 190 },
  { date: "20 Apr", count: 220 },
  { date: "21 Apr", count: 270 },
  { date: "22 Apr", count: 310 },
  { date: "23 Apr", count: 390 },
  { date: "24 Apr", count: 360 },
  { date: "25 Apr", count: 240 },
];

const pieData = [
  { name: "Shipment Tracking", value: 437, color: "#3b82f6" },
  { name: "Documents Center", value: 274, color: "#ef4444" },
  { name: "Shipment Planning", value: 224, color: "#22c55e" },
  { name: "Saved Reports", value: 149, color: "#a855f7" },
  { name: "Others", value: 66, color: "#d1d5db" },
];

const logs = [
  { time: "25 Apr 2025, 09:25 AM", user: "Arjun Soni", color: "bg-green-500", role: "Exporter (Admin)", action: "Created", actionColor: "text-green-600 bg-green-50 border border-green-200", module: "Shipment Planning", entityType: "Shipment", reference: "PLN-2025-04-24-000123", ip: "103.21.45.67", status: "Success" },
  { time: "25 Apr 2025, 09:22 AM", user: "Priya Shah", color: "bg-purple-500", role: "Manager", action: "Updated", actionColor: "text-blue-600 bg-blue-50 border border-blue-200", module: "Shipment Tracking", entityType: "Shipment", reference: "PLN-2025-04-24-000123", ip: "103.21.45.67", status: "Success" },
  { time: "25 Apr 2025, 09:18 AM", user: "Rohit Verma", color: "bg-red-400", role: "Finance", action: "Downloaded", actionColor: "text-teal-600 bg-teal-50 border border-teal-200", module: "Documents Center", entityType: "Document", reference: "Commercial Invoice.pdf", ip: "103.21.45.68", status: "Success" },
  { time: "25 Apr 2025, 09:15 AM", user: "Arjun Soni", color: "bg-green-500", role: "Exporter (Admin)", action: "Deleted", actionColor: "text-red-600 bg-red-50 border border-red-200", module: "Documents Center", entityType: "Document", reference: "Packing List.xlsx", ip: "103.21.45.67", status: "Success" },
  { time: "25 Apr 2025, 09:10 AM", user: "Priya Shah", color: "bg-purple-500", role: "Manager", action: "Shared", actionColor: "text-orange-600 bg-orange-50 border border-orange-200", module: "Saved Reports", entityType: "Report", reference: "Monthly Export Summary", ip: "103.21.45.67", status: "Success" },
  { time: "25 Apr 2025, 09:05 AM", user: "System", color: "bg-gray-400", role: "System", action: "Auto Generated", actionColor: "text-gray-600 bg-gray-100 border border-gray-200", module: "Shipment Tracking", entityType: "Update", reference: "Status Update - In Transit", ip: "System", status: "Success" },
  { time: "25 Apr 2025, 08:59 AM", user: "Rohit Verma", color: "bg-gray-300", role: "Finance", action: "Login", actionColor: "text-cyan-600 bg-cyan-50 border border-cyan-200", module: "Authentication", entityType: "Login", reference: "–", ip: "103.21.45.68", status: "Success" },
  { time: "25 Apr 2025, 08:55 AM", user: "Anjali Arora", color: "bg-blue-500", role: "Viewer", action: "Failed Login", actionColor: "text-red-600 bg-red-50 border border-red-200", module: "Authentication", entityType: "Login", reference: "–", ip: "103.21.45.99", status: "Failed" },
  { time: "25 Apr 2025, 08:45 AM", user: "Priya Shah", color: "bg-purple-500", role: "Manager", action: "Updated", actionColor: "text-blue-600 bg-blue-50 border border-blue-200", module: "Vendor Recommendations", entityType: "Vendor", reference: "IndiGo Cargo", ip: "103.21.45.67", status: "Success" },
  { time: "25 Apr 2025, 08:40 AM", user: "Arjun Soni", color: "bg-green-500", role: "Exporter (Admin)", action: "Created", actionColor: "text-green-600 bg-green-50 border border-green-200", module: "Vendor Recommendations", entityType: "Vendor", reference: "SafePack Solutions", ip: "103.21.45.67", status: "Success" },
];
const stats = [
  { label: "Total Activities", value: "1,248", sub: "All time", icon: <MdOutlineAssignment size={22} className="text-blue-500" />, bg: "bg-blue-50" },
  { label: "Users", value: "18", sub: "Active users", icon: <ChessPawn size={22} className="text-gray-700 fill-black" />, bg: "bg-gray-100" },
  { label: "Shipments Affected", value: "312", sub: "All time", icon: <MdOutlineLocalShipping size={22} className="text-green-500" />, bg: "bg-green-50" },
  { label: "Critical Actions", value: "26", sub: "Require attention", icon: <MdOutlineWarning size={22} className="text-red-500" />, bg: "bg-red-50" },
  { label: "Failed Attempts", value: "14", sub: "All time", icon: <MdOutlineReportProblem size={22} className="text-yellow-500" />, bg: "bg-yellow-50" },
  { label: "Data Changes", value: "486", sub: "All time", icon: <MdOutlineStorage size={22} className="text-teal-500" />, bg: "bg-teal-50" },
];

const selectedLog = logs[1];

export default function AuditLogs() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50  pt-14 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div>
            <p className="text-xs text-gray-400 mb-1">Dashboard &rsaquo; Audit Logs</p>
            <h1 className="text-xl  *: font-bold text-gray-900">Audit Logs</h1>
            <p className="text-xs  text-gray-500 mt-0.5">Track all user activities and system actions for security, compliance, and transparency.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1.5 text-xs  font-medium text-[#0A2163] border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <FiDownload size={13} /> Export Logs (CSV)
            </button>
            <button className="flex items-center gap-1.5 text-xs  font-medium text-[#0A2163] border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <MdOutlineAssignment size={13} /> Export Logs (PDF)
            </button>
            <button className="flex items-center gap-1.5 text-xs  font-medium text-[#0A2163] border border-gray-300 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
              <FiSettings size={13} /> Audit Log Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex flex-col gap-1 shadow-sm">
              <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-1`}>{s.icon}</div>
              <p className="text-xs text-gray-500 font-medium leading-tight">{s.label}</p>
              <p className="text-lg  font-bold text-gray-900 leading-tight">{s.value}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-5">
          <div className="p-3 sm:p-4 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap ">
              <div className="relative flex-1 min-w-[180px]">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400" placeholder="Search by user, action, module, shipment ID, IP address..." />
              </div>
              <div className="flex flex-wrap gap-2">
                {["25 Apr 2025 - 25 Apr 2025", "All Users", "All Modules", "All Actions", "All Status"].map((f, i) => (
                  <button key={i} className="flex items-center gap-1  text-xs font-bold text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50 whitespace-nowrap">
                    {f} <FiChevronDown size={12} />
                  </button>
                ))}
                <button className="flex items-center gap-1 text-xs font-bold text-gray-700 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50">
                  <FiFilter size={12} /> More Filters
                </button>
                <button className="flex items-center gap-1 text-xs font-bold text-gray-500 border border-gray-200 rounded-lg px-3 py-2 bg-white hover:bg-gray-50">
                  <FiX size={12} /> Clear All
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Date & Time", "User", "Role", "Action", "Module", "Entity Type", "Entity / Reference", "IP Address", "Status", "Details"].map((h, i) => (
                    <th key={i} className="text-left text-xs font-bold text-[#33477D] px-4 py-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i === 1 ? "bg-blue-50/40" : ""}`}>
                    <td className="px-4 py-3 text-xs text-[#0B2361] font-medium   whitespace-nowrap">{log.time}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${log.color} flex-shrink-0`}></span>
                        <span className="text-xs font-medium text-[#0B2361] whitespace-nowrap">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#0B2361] font-medium whitespace-nowrap">{log.role}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${log.actionColor} whitespace-nowrap`}>{log.action}</span>
                    </td>
                  <td className="px-4 py-3 text-xs text-[#0B2361] font-medium whitespace-nowrap">{log.module}</td>
                  <td className="px-4 py-3 text-xs text-[#0B2361] font-medium whitespace-nowrap">{log.entityType}</td>
                  <td className="px-4 py-3 text-xs text-[#0B2361] font-medium whitespace-nowrap">{log.reference}</td>
                  <td className="px-4 py-3 text-xs text-[#0B2361] font-medium whitespace-nowrap">{log.ip}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${log.status === "Success" ? "text-gray-700" : "text-red-600"}`}>
                        <BsCircleFill size={7} className={log.status === "Success" ? "text-[#0B2361]" : "text-red-500"} />
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-400">
                        <FiSettings size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">Showing 1 to 10 of 1,248 activities</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                <FiChevronLeft size={13} />
              </button>
              {[1, 2, 3].map(p => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${currentPage === p ? "bg-blue-500 text-white border border-blue-500" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
              ))}
              <span className="text-xs text-gray-400 px-1">...</span>
              <button onClick={() => setCurrentPage(125)} className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium ${currentPage === 125 ? "bg-blue-500 text-white border border-blue-500" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>125</button>
              <button onClick={() => setCurrentPage(p => Math.min(125, p + 1))} className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                <FiChevronRight size={13} />
              </button>
              <div className="flex items-center gap-1 ml-3">
                <span className="text-xs text-gray-500">Rows per page:</span>
                <button className="flex items-center gap-1 text-xs font-semibold text-gray-700 border border-gray-200 rounded px-2 py-1">10 <FiChevronDown size={11} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4">Activity Details</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div>
                <p className="text-xs text-[#435484] mb-0.5">Date & Time</p>
                <p className="text-xs   font-bold text-gray-800">25 Apr 2025, 09:22 AM (IST)</p>
              </div>
              <div>
                <p className="text-xs text-[#435484] mb-0.5">Entity Type</p>
                <p className="text-xs sm:text-sm font-bold text-gray-800">Shipment</p>
              </div>
              <div>
                <p className="text-xs text-[#435484] mb-0.5">User</p>
                <p className="text-xs  font-bold text-gray-800">Priya Shah</p>
                <p className="text-xs text-gray-500">(pshah@asdcargomate.com)</p>
              </div>
              <div>
                <p className="text-xs text-[#435484] mb-0.5">Reference ID</p>
                <p className="text-xs sm:text-sm font-bold text-gray-800">PLN-2025-04-24-000123</p>
              </div>
              <div>
                <p className="text-xs text-[#435484] mb-0.5">Role</p>
                <p className="text-xs sm:text-sm font-bold text-gray-800">Manager</p>
              </div>
              <div>
                <p className="text-xs text-[#435484] mb-0.5">IP Address</p>
                <p className="text-xs sm:text-sm font-bold text-teal-600">103.21.45.67</p>
              </div>
              <div>
                <p className="text-xs text-[#435484] mb-0.5">Status</p>
                <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">Success</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div>
                  <p className="text-xs text-[#0A2163] font-medium mb-1">Changes Made</p>
                  <p className="text-xs text-gray-600">• Updated ETA from 29 Apr 2025 to 30 Apr 2025</p>
                </div>
                <div>
                  <p className="text-xs text-[#0A2163] font-medium mb-1">Other Details</p>
                  <p className="text-xs text-gray-600">• Added AWB / Tracking No. AWB-9123456789</p>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs sm:text-sm font-bold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">View Full Details</button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4">Activities by Module</h3>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full mt-2 space-y-1.5">
                {pieData.map((d, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }}></span>
                      <span className="text-xs text-gray-600">{d.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{Math.round(d.value / 1150 * 100)}% ({d.value})</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs sm:text-sm font-bold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">View Full Analytics</button>
          </div>

          <div className="bg-white rounded-xl border flex flex-col justify-between border-gray-100 shadow-sm p-4 sm:p-5 md:col-span-2 lg:col-span-1">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-4">Activities Over Time (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} domain={[150, 430]} ticks={[200, 300, 400]} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <button className="mt-4 w-full border border-teal-500 text-teal-600 text-xs sm:text-sm font-bold rounded-lg py-2.5 hover:bg-teal-50 transition-colors">View Detailed Report</button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-5
         bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="flex items-center gap-2 border  px-4 py-3 rounded-lg">
            <span className="text-red-400  flex-shrink-0">⚠</span>
            <p className="text-xs text-gray-500">Audit logs are retained for 365 days as per system policy. You can export or download logs for compliance and review.</p>
          </div>
          <div className="  gap-3 ">
           <NeedHelp   para={" Our trade experts are here to help you."} heading={"Need help ?"} />
           
          </div> 
        </div>

      </div>
    </div>
  );
}