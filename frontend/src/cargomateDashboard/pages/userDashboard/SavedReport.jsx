import { useState } from "react";
import { FiSearch, FiDownload, FiPlus, FiPlay, FiStar, FiClock, FiCalendar, FiTrash2, FiMoreVertical, FiGrid, FiList, FiChevronLeft, FiChevronRight, FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { BsFileEarmarkText, BsBox, BsPerson, BsShield, BsFileText, BsGraphUp, BsClock } from "react-icons/bs";
import { MdOutlineSchedule } from "react-icons/md";

const statsData = [
  { label: "Total Saved Reports", value: 42, sub: "All time", icon: <BsFileEarmarkText className="text-blue-500" />, iconBg: "bg-blue-100" },
  { label: "My Reports", value: 28, sub: "Reports created by me", icon: <BsPerson className="text-pink-400" />, iconBg: "bg-pink-100" },
  { label: "Shared with Me", value: 14, sub: "Reports shared by others", icon: <BsBox className="text-green-400" />, iconBg: "bg-green-100" },
  { label: "Frequently Used", value: 9, sub: "Used in last 30 days", icon: <FiStar className="text-orange-400" />, iconBg: "bg-orange-100" },
  { label: "Scheduled Reports", value: 7, sub: "Auto-generated reports", icon: <MdOutlineSchedule className="text-purple-400" />, iconBg: "bg-purple-100" },
];

const categories = [
  { name: "All Reports", count: 42 },
  { name: "Shipment Reports", count: 18 },
  { name: "Cost & Finance Reports", count: 10 },
  { name: "Vendor Reports", count: 6 },
  { name: "Compliance Reports", count: 4 },
  { name: "Document Reports", count: 3 },
  { name: "Performance Reports", count: 1 },
];

const quickAccess = [
  { name: "My Favorites", count: 8, icon: <FiStar className="text-yellow-400" /> },
  { name: "Recently Viewed", count: 5, icon: <FiClock className="text-gray-400" /> },
  { name: "Scheduled Reports", count: 7, icon: <MdOutlineSchedule className="text-gray-400" /> },
  { name: "Trash", count: 2, icon: <FiTrash2 className="text-gray-400" /> },
];

const categoryBadgeColors = {
  "Shipment Reports": "text-blue-600 bg-blue-50 border border-blue-200",
  "Cost & Finance Reports": "text-orange-600 bg-orange-50 border border-orange-200",
  "Vendor Reports": "text-purple-600 bg-purple-50 border border-purple-200",
  "Compliance Reports": "text-green-600 bg-green-50 border border-green-200",
  "Analytics & Trends": "text-teal-600 bg-teal-50 border border-teal-200",
  "Performance Reports": "text-pink-600 bg-pink-50 border border-pink-200",
};

const reports = [
  { id: 1, name: "Shipment Performance Overview", desc: "Overview of shipments with transit time and cost", category: "Shipment Reports", source: "My Shipments", createdBy: "Me", modified: "24 Apr 2025, 09:25 AM", frequency: "-", starred: true },
  { id: 2, name: "Monthly Export Summary", desc: "Detailed report summary and analysis", category: "Shipment Reports", source: "Shipment Tracking", createdBy: "Me", modified: "23 Apr 2025, 04:10 PM", frequency: "Monthly", starred: true },
  { id: 3, name: "Cost Analysis - Apr 2025", desc: "Detailed report summary and analysis", category: "Cost & Finance Reports", source: "Cost Breakdown", createdBy: "Me", modified: "23 Apr 2025, 11:30 AM", frequency: "-", starred: true },
  { id: 4, name: "Top Vendors by Performance", desc: "Overview of shipments with transit time and cost", category: "Vendor Reports", source: "Vendor Recommendations", createdBy: "Me", modified: "22 Apr 2025, 03:45 PM", frequency: "Weekly", starred: true },
  { id: 5, name: "Compliance Document Status", desc: "Detailed report summary and analysis", category: "Compliance Reports", source: "Documents Center", createdBy: "Me", modified: "22 Apr 2025, 10:20 AM", frequency: "-", starred: true },
  { id: 6, name: "HS Code Usage Report", desc: "Detailed report summary and analysis", category: "Analytics & Trends", source: "HS Code Lookup", createdBy: "Me", modified: "21 Apr 2025, 06:15 PM", frequency: "Monthly", starred: true },
  { id: 7, name: "Pending Invoice Report", desc: "Detailed report summary and analysis", category: "Cost & Finance Reports", source: "My Shipments", createdBy: "Rohit Verma\nShared", modified: "20 Apr 2025, 02:40 PM", frequency: "Weekly", starred: true },
  { id: 8, name: "Air Freight Shipments Report", desc: "Detailed report summary and analysis", category: "Shipment Reports", source: "Shipment Tracking", createdBy: "Priya Shah\nShared", modified: "19 Apr 2025, 11:05 AM", frequency: "-", starred: true },
  { id: 9, name: "Document Expiry Alert", desc: "Detailed report summary and analysis", category: "Compliance Reports", source: "Documents Center", createdBy: "System\nAuto-generated", modified: "18 Apr 2025, 09:00 AM", frequency: "Daily", starred: true },
  { id: 10, name: "Profitability By Route", desc: "Detailed report summary and analysis", category: "Performance Reports", source: "My Shipments", createdBy: "Me", modified: "17 Apr 2025, 04:30 PM", frequency: "Monthly", starred: true },
];

const scheduled = [
  { name: "Monthly Export Summary", freq: "Monthly", next: "Next run: 01 May 2025, 09:00 AM", email: "arjun.soni@asdcargomate.com", enabled: true },
  { name: "Top Vendors by Performance", freq: "Weekly", next: "Next run: 29 Apr 2025, 09:00 AM", email: "arjun.soni@asdcargomate.com", enabled: true },
  { name: "Document Expiry Alert", freq: "Daily", next: "Next run: 26 Apr 2025, 09:00 AM", email: "arjun.soni@asdcargomate.com", enabled: true },
  { name: "Cost Analysis - Apr 2025", freq: "Weekly", next: "Next run: 29 Apr 2025, 09:00 AM", email: "arjun.soni@asdcargomate.com", enabled: true },
];

export default function SavedReports() {
  const [activeCategory, setActiveCategory] = useState("All Reports");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("list");

  return (
    <div className="min-h-screen bg-gray-50  pt-14">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">

        <nav className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mb-3 md:mb-4">
          <span className="text-teal-600 cursor-pointer hover:underline">Dashboard</span>
          <span className="mx-1">›</span>
          <span className="text-gray-700 font-medium">Saved Reports</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h1 className="text-xl  font-bold text-gray-900">Saved Reports</h1>
            <p className="text-xs  text-[#213B82] mt-0.5">Create, manage, and share your saved reports and dashboards.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 border border-gray-300 bg-white text-gray-700 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition">
              <FiDownload className="text-sm" />
              <span className="hidden sm:inline">Import Report</span>
              <span className="sm:hidden">Import</span>
            </button>
            <button className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-lg transition">
              <FiPlus className="text-sm" />
              <span className="hidden sm:inline">Create New Report</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-4 md:mb-6">
          {statsData.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex items-start gap-3 shadow-sm">
              <div className={`${s.iconBg} p-2 rounded-lg flex-shrink-0`}>
                <span className="text-lg sm:text-xl">{s.icon}</span>
              </div>
              <div className="min-w-0">
              
                <div className="text-xs font-semibold text-gray-700 leading-tight">{s.label}</div>
                  <div className="text-xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5 hidden sm:block">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-end gap-2 sm:gap-3 mb-4 md:mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search reports by name or description..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["Report Type", "Data Source", "Created By", "Last Modified"].map((f, i) => (
              <div className="flex flex-col gap-2 ">
                <span className="text-xs font-normal ">{f}</span>
              <select key={i} className="text-xs sm:text-sm border border-gray-200 placeholder:font-bold placeholder-text-xs rounded-lg bg-white px-2 sm:px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>{i === 0 ? "All Types" : i === 1 ? "All Sources" : i === 2 ? "All Users" : "Anytime"}</option>
              </select>
               </div>
            ))}
            <button className="text-xs sm:text-sm border font-bold border-gray-200 rounded-lg bg-white px-3  text-gray-600 hover:bg-gray-50">More Filters</button>
            <button className="text-xs  font-bold text-[#0A2163] hover:underline px-1 py-2">Clear All</button>
          </div>
        </div>

        <div className="flex gap-3 md:gap-4">

          <div className="hidden md:flex flex-col gap-3 w-48 lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Report Categories</h3>
              <div className="space-y-0.5">
                {categories.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(c.name)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition ${activeCategory === c.name ? "bg-teal-50 text-teal-700 font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <span>{c.name}</span>
                    <span className={`text-xs  w-5 rounded-full flex items-center justify-center h-5 bg-[#F3F7FF] font-medium ${activeCategory === c.name ? "text-teal-600" : "text-gray-400"}`}>{c.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Quick Access</h3>
              <div className="space-y-0.5">
                {quickAccess.map((q, i) => (
                  <button key={i} className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition">
                    <span className="flex font-bold items-center gap-2">{q.icon}{q.name}</span>
                    <span className="text-xs  w-5 rounded-full flex items-center justify-center bg-[#F3F7FF] h-5 text-gray-400">{q.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-sm font-bold text-gray-800 mb-2">Storage Usage</h3>
              <div className="text-sm font-semibold text-gray-700 mb-1">2.4 GB of 10 GB used <span className="font-normal text-gray-400">24%</span></div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-teal-500 h-2 rounded-full" style={{ width: "24%" }} />
              </div>
              <button className="text-sm text-teal-600 font-medium hover:underline flex items-center gap-1">
                Manage Storage →
              </button>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-xs text-gray-500">Sort by: <span className="font-medium text-gray-700">Last Modified</span></span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setViewMode("list")} className={`p-1.5 rounded ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}>
                    <FiList className="text-gray-500 text-sm" />
                  </button>
                  <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}>
                    <FiGrid className="text-gray-500 text-sm" />
                  </button>
                </div>
              </div>

              <div className="hidden lg:grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr] px-4 py-2 border-b border-gray-100 bg-gray-50 text-xs font-bold text-[#20377A] gap-2">
                <span>Report Name</span>
                <span>Category</span>
                <span>Data Source</span>
                <span>Created By</span>
                <span>Last Modified</span>
                <span className="flex items-center justify-between">
                  <span>Frequency</span>
                  <span>Actions</span>
                </span>
              </div>

              <div className="divide-y divide-gray-50 font-bold">
                {reports.map((r) => (
                  <div key={r.id} className="px-3 sm:px-4 py-3 hover:bg-gray-50 transition">
                    <div className="flex items-start gap-2 lg:grid lg:grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr] lg:gap-2 lg:items-center">

                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <FiStar className="text-yellow-400 flex-shrink-0 mt-0.5 text-sm" />
                        <div className="flex items-start gap-2 min-w-0">
                          <BsFileEarmarkText className="text-blue-400 flex-shrink-0 mt-0.5 text-sm" />
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-gray-900 truncate">{r.name}</div>
                            <div className="text-xs text-[#4F6295] font-semibold truncate">{r.desc}</div>
                            <div className="lg:hidden mt-1 flex flex-wrap gap-1.5 items-center">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryBadgeColors[r.category] || "text-gray-600 bg-gray-100"}`}>{r.category}</span>
                              <span className="text-xs text-gray-500">{r.source}</span>
                            </div>
                            <div className="lg:hidden mt-1 text-xs text-gray-400">{r.modified} {r.frequency !== "-" && <span>· {r.frequency}</span>}</div>
                          </div>
                        </div>
                      </div>

                      <div className="hidden lg:block">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryBadgeColors[r.category] || "text-gray-600 bg-gray-100"}`}>{r.category}</span>
                      </div>

                      <div className="hidden lg:block text-xs text-gray-600">{r.source}</div>

                      <div className="hidden lg:block text-xs text-gray-600 whitespace-pre-line leading-tight">
                        {r.createdBy.includes("\n") ? (
                          <>
                            <div>{r.createdBy.split("\n")[0]}</div>
                            <div className="text-teal-500">{r.createdBy.split("\n")[1]}</div>
                          </>
                        ) : r.createdBy}
                      </div>

                      <div className="hidden lg:block text-xs text-gray-600">{r.modified}</div>

                      <div className="hidden lg:flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          {r.frequency !== "-" && <MdOutlineSchedule className="text-gray-400" />}
                          {r.frequency}
                        </span>
                        <div className="flex items-center gap-1">
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><FiPlay className="text-xs" /></button>
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><FiStar className="text-xs" /></button>
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><FiMoreVertical className="text-xs" /></button>
                        </div>
                      </div>

                      <div className="lg:hidden flex items-center gap-1 flex-shrink-0">
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><FiPlay className="text-xs" /></button>
                        <button className="p-1 hover:bg-gray-100 rounded text-gray-500"><FiMoreVertical className="text-xs" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
                <span className="text-xs sm:text-sm text-gray-500">Showing 1 to 10 of 42 reports</span>
                <div className="flex items-center gap-1.5">
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40" disabled>
                    <FiChevronLeft className="text-xs" />
                  </button>
                  {[1, 2, 3, "...", 5].map((p, i) => (
                    <button
                      key={i}
                      onClick={() => typeof p === "number" && setCurrentPage(p)}
                      className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium border transition ${currentPage === p ? "bg-teal-600 text-white border-teal-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
                    <FiChevronRight className="text-xs" />
                  </button>
                  <span className="text-xs text-gray-500 ml-2">Rows per page: <select className="border border-gray-200 rounded px-1 py-0.5 text-xs focus:outline-none"><option>10</option><option>20</option><option>50</option></select></span>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">Scheduled Reports</h3>
                  <p className="text-xs text-gray-500">Reports that are scheduled to run automatically and sent via email.</p>
                </div>
                <button className="text-xs sm:text-sm text-teal-600 hover:underline font-medium whitespace-nowrap">View All Scheduled</button>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
                {scheduled.map((s, i) => (
                  <div key={i} className="border flex items-center gap- border-gray-100 rounded-xl p-3 bg-gray-50">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BsFileEarmarkText className="text-blue-500 text-sm" />
                      </div>
                    <div className="flex flex-col   gap-2 mb-1">
                       <div className="text-xs font-semibold  leading-tight mb-0.">{s.name}</div>
                    <div className="text-[10px] text-gray-500 mb-0.">{s.freq}</div>
                    <div className="text-[10px] text-[#526796] mb-">{s.next}</div>
                    <div className="text-[10px] text-[#526796] truncate">{s.email}</div>
                    
                    </div>
                     <div className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${s.enabled ? "bg-teal-500 justify-end" : "bg-gray-300 justify-start"}`}>
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="md:hidden mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
            <h3 className="text-xs font-bold text-gray-800 mb-2">Report Categories</h3>
            <div className="space-y-0.5">
              {categories.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(c.name)}
                  className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-xs transition ${activeCategory === c.name ? "bg-teal-50 text-teal-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <span className="truncate mr-1">{c.name}</span>
                  <span className={`flex-shrink-0 ${activeCategory === c.name ? "text-teal-600" : "text-gray-400"}`}>{c.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 mb-2">Quick Access</h3>
              <div className="space-y-0.5">
                {quickAccess.map((q, i) => (
                  <button key={i} className="w-full flex items-center justify-between px-2 py-1 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition">
                    <span className="flex items-center gap-1.5">{q.icon}<span className="truncate">{q.name}</span></span>
                    <span className="text-gray-400 flex-shrink-0">{q.count}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
              <h3 className="text-xs font-bold text-gray-800 mb-1.5">Storage Usage</h3>
              <div className="text-xs font-semibold text-gray-700 mb-1">2.4 GB / 10 GB <span className="font-normal text-gray-400">24%</span></div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1.5">
                <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: "24%" }} />
              </div>
              <button className="text-xs text-teal-600 font-medium hover:underline">Manage Storage →</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}