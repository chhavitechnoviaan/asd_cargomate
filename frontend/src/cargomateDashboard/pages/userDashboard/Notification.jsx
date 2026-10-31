import React, { useState, useMemo } from "react";
import {
  Settings,
  Trash2,
  Truck,
  FileText,
  AlertTriangle,
  CheckCircle,
  Download,
  Info,
  ShieldAlert,
} from "lucide-react";
import Swal from "sweetalert2";
import world from "../../assets/Images/webp/world.webp";
import DashboardAdPlacement from "../../components/DashboardAdPlacement";

const INITIAL_ALERTS = [
  {
    id: "PLN-2025-04-24-000123",
    type: "Shipments",
    urgency: "information",
    title: "Shipment Arrived: PLN-2025-04-24-000123",
    message:
      "Your shipment from Tirupur to Dubai has arrived at the destination port. Immediate customs clearance requested to avoid demurrage charges.",
    time: "2 mins ago",
    isNew: true,
    actionText: "View Details",
    icon: Truck,
    colorClass: "teal",
  },
  {
    id: "LICENSE-EXPIRY-01",
    type: "Compliance",
    urgency: "critical",
    title: "Compliance Alert: Driver License Expiry",
    message:
      "License for operator Marcus V. (Vehicle ID: FM-992) will expire in 48 hours. Update records to maintain compliance and avoid operations halt.",
    time: "15 mins ago",
    isNew: false,
    actionText: "Update Records",
    icon: ShieldAlert,
    colorClass: "rose",
  },
  {
    id: "INV-2025-0045",
    type: "Finance",
    urgency: "warning",
    title: "Invoice Generated: INV-2025-0045",
    message:
      "Monthly platform service fee invoice for April 2025 has been generated and is ready for payment.",
    time: "1 hour ago",
    isNew: false,
    actionText: "Download PDF",
    icon: FileText,
    colorClass: "blue",
  },
  {
    id: "MAINTENANCE-01",
    type: "System",
    urgency: "information",
    title: "System Maintenance Scheduled",
    message:
      "Routine maintenance is scheduled for Sunday, April 27th between 02:00 and 04:00 GMT. Brief service interruptions may occur.",
    time: "3 hours ago",
    isNew: false,
    actionText: "Learn More",
    icon: Settings,
    colorClass: "slate",
  },
];

export default function NotificationDashboard() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [activeTab, setActiveTab] = useState("All");
  const [filters, setFilters] = useState({
    critical: true,
    warning: true,
    information: true,
  });
  const [dateRange, setDateRange] = useState("Last 24 Hours");
  const [fromDate, setFromDate] = useState("2026-04-23");
  const [toDate, setToDate] = useState("2026-04-24");
  const handleClearAll = () => {
    if (alerts.length === 0) {
      Swal.fire({
        title: "Empty!",
        text: "There are no alerts to clear.",
        icon: "info",
        confirmButtonColor: "#0f766e",
        background: "#ffffff",
        customClass: { popup: "rounded-xl " },
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to clear all notifications!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#e11d48",
      confirmButtonText: "Yes, clear all!",
      background: "#ffffff",
      customClass: { popup: "rounded-xl " },
    }).then((result) => {
      if (result.isConfirmed) {
        setAlerts([]);
        Swal.fire({
          title: "Cleared!",
          text: "All notifications have been removed.",
          icon: "success",
          confirmButtonColor: "#0f766e",
          background: "#ffffff",
          customClass: { popup: "rounded-xl " },
        });
      }
    });
  };

  const handleDismissAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Notification dismissed",
    });
  };

  const handleActionClick = (alertItem) => {
    let iconType = "info";
    let btnColor = "#0f766e";

    if (alertItem.urgency === "critical") {
      iconType = "error";
      btnColor = "#e11d48";
    } else if (alertItem.urgency === "warning") {
      iconType = "warning";
      btnColor = "#2563eb";
    }

    Swal.fire({
      title: alertItem.type,
      text: `Action triggered for: ${alertItem.title}`,
      icon: iconType,
      confirmButtonColor: btnColor,
      background: "#ffffff",
      customClass: {
        popup: "rounded-xl ",
        title: "text-slate-900 font-bold",
      },
    });
  };

  const handleDropdownDateChange = (val) => {
    setDateRange(val);
    const today = "2026-04-24";
    setToDate(today);

    if (val === "Last 24 Hours") {
      setFromDate("2026-04-23");
    } else if (val === "Last 7 Days") {
      setFromDate("2026-04-17");
    } else if (val === "Last 30 Days") {
      setFromDate("2026-03-25");
    }
  };

  const handleCustomDateChange = (type, value) => {
    setDateRange("Custom Range");
    if (type === "from") setFromDate(value);
    if (type === "to") setToDate(value);
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesTab = activeTab === "All" || alert.type === activeTab;
      const matchesUrgency = filters[alert.urgency];
      return matchesTab && matchesUrgency;
    });
  }, [alerts, activeTab, filters]);

  const counts = useMemo(() => {
    return {
      All: alerts.length,
      Shipments: alerts.filter((a) => a.type === "Shipments").length,
      Compliance: alerts.filter((a) => a.type === "Compliance").length,
      Finance: alerts.filter((a) => a.type === "Finance").length,
      System: alerts.filter((a) => a.type === "System").length,
      critical: alerts.filter((a) => a.urgency === "critical").length,
      warning: alerts.filter((a) => a.warning === "warning").length,
      information: alerts.filter((a) => a.urgency === "information").length,
    };
  }, [alerts]);

  const handleEnableDigest = () => {
    Swal.fire({
      title: "Success!",
      text: "Smart Digest has been enabled successfully.",
      icon: "success",
      iconColor: "#0f766e",
      confirmButtonColor: "#0f766e",
      confirmButtonText: "Awesome",
      background: "#ffffff",
      customClass: {
        popup: "rounded-xl ",
        title: "text-slate-900 font-bold",
        htmlContainer: "text-slate-600 text-sm",
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800  p-6 pt-20">
      {/* <div className="text-sm text-slate-500 mb-4 flex items-center gap-2">
        <span>Dashboard</span>
        <span>&gt;</span>
        <span className="text-slate-700 font-medium">Notifications</span>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-10xl mx-auto">
        {/* LEFT COLUMN*/}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Manage your alerts
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                System updates, task reminders, and operational milestones.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  Swal.fire({
                    title: "Settings",
                    text: "Notification configuration panel coming soon.",
                    icon: "info",
                    confirmButtonColor: "#0f766e",
                  })
                }
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Settings className="w-4 h-4 text-slate-500" /> Notification
                Settings
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
          </div>

          {/* Dynamic Navigation Tabs */}
          <div className="border-b border-slate-200 flex flex-wrap gap-2">
            {["All", "Shipments", "Compliance", "Finance", "System"].map(
              (tabName) => (
                <button
                  key={tabName}
                  onClick={() => setActiveTab(tabName)}
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-1.5 ${
                    activeTab === tabName
                      ? "border-teal-600 text-teal-700 font-semibold"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {tabName}{" "}
                  <span className="text-xs opacity-70">
                    ({counts[tabName]})
                  </span>
                </button>
              ),
            )}
          </div>

          {/* Alerts Container */}
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => {
                const AlertIcon = alert.icon;
                const colors = {
                  teal: {
                    bar: "bg-teal-600",
                    iconBg: "bg-teal-50 text-teal-600",
                    text: "text-teal-700 hover:text-teal-800",
                  },
                  rose: {
                    bar: "bg-rose-600",
                    iconBg: "bg-rose-50 text-rose-600",
                    text: "text-rose-600 hover:text-rose-700",
                  },
                  blue: {
                    bar: "bg-blue-600",
                    iconBg: "bg-blue-50 text-blue-600",
                    text: "text-teal-700 hover:text-teal-800",
                  },
                  slate: {
                    bar: "bg-slate-400",
                    iconBg: "bg-slate-100 text-slate-600",
                    text: "text-teal-700 hover:text-teal-800",
                  },
                }[alert.colorClass];

                return (
                  <div
                    key={alert.id}
                    className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex gap-4 relative overflow-hidden"
                  >
                    {(alert.urgency === "critical" ||
                      (alert.urgency === "information" && alert.isNew)) && (
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bar}`}
                      ></div>
                    )}
                    <div className={`p-3 rounded-xl h-fit ${colors.iconBg}`}>
                      <AlertIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">
                            {alert.title}
                          </h3>
                          <p className="text-xs text-slate-600 mt-1">
                            {alert.message}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-slate-400">
                            {alert.time}
                          </span>
                          {alert.isNew && (
                            <span className="bg-teal-700 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                          {alert.urgency === "critical" && (
                            <span className="bg-rose-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                              Critical
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <button
                          onClick={() => handleActionClick(alert)}
                          className={`${colors.text} font-semibold text-xs flex items-center gap-1.5`}
                        >
                          {alert.urgency === "critical" && (
                            <AlertTriangle className="w-4 h-4" />
                          )}
                          {alert.actionText}{" "}
                          {alert.colorClass === "teal" && "→"}
                        </button>
                        <button
                          onClick={() => handleDismissAlert(alert.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors"
                          title="Dismiss Alert"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200 text-slate-400">
                No alerts found matching the criteria.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN*/}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Quick Filters
            </h2>

            <div className="space-y-3">
              <span className="text-sm font-semibold text-slate-700 block">
                Urgency
              </span>
              {["critical", "warning", "information"].map((type) => (
                <label
                  key={type}
                  className="flex items-center justify-between cursor-pointer group capitalize"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={filters[type]}
                      onChange={(e) =>
                        setFilters({ ...filters, [type]: e.target.checked })
                      }
                      className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 accent-teal-700"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      {type}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded min-w-[1.5rem] text-center ${
                      type === "critical"
                        ? "bg-rose-50 text-rose-600"
                        : type === "warning"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {counts[type]}
                  </span>
                </label>
              ))}
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-3">
              <span className="text-sm font-semibold text-slate-700 block">
                Date Range
              </span>
              <div className="relative">
                <select
                  value={dateRange}
                  onChange={(e) => handleDropdownDateChange(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-700 appearance-none focus:outline-none focus:border-teal-500 cursor-pointer pr-10"
                >
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Custom Range</option>
                </select>
                <span className="absolute right-3 top-3.5 pointer-events-none text-slate-400 border-l border-r-0 border-t-2 border-b-2 transform rotate-45 w-2 h-2 border-slate-500"></span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) =>
                      handleCustomDateChange("from", e.target.value)
                    }
                    className="w-full border border-slate-200 bg-white text-slate-700 rounded-lg p-1.5 text-xs font-medium text-center focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) =>
                      handleCustomDateChange("to", e.target.value)
                    }
                    className="w-full border border-slate-200 bg-white text-slate-700 rounded-lg p-1.5 text-xs font-medium text-center focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-teal-50/50 border border-teal-100/60 rounded-xl p-5 shadow-sm space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Automation
            </h2>
            <div>
              <h3 className="font-bold text-teal-700 text-sm">Smart Digest</h3>
              <p className="text-xs text-teal-800/80 mt-1 leading-relaxed">
                Get a daily summary of low-priority alerts at 8:00 AM.
              </p>
            </div>
            <button
              onClick={handleEnableDigest}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Enable Digest
            </button>
          </div>

          <div className="rounded-2xl overflow-hidden object-cover  bg-[#06121a] border border-slate-100 shadow-sm  ">
            <img src={world} className="w-full" />
          </div>
        </div>
      </div>
      <DashboardAdPlacement
        location="User Dashboard - Notifications"
        layout="banner"
        slot="banner"
        intervalMs={5000}
      />
   
    </div>
  );
}
