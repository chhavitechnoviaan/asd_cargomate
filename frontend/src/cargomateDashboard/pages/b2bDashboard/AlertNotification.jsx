import React, { useState,useEffect } from 'react';
import {
  getDashboard,
  getAlerts,
  getAlertFilters,
  resolveAlert,
  deleteAlert,
  getNotifications,
  getNotificationFilters,
  markNotificationsRead,
  markAllNotificationsRead,
  deleteNotification
} from '../../api/AlertNotificationApi';
import { getRecentAlerts } from '../../api/ShipmentApi';
import { 
  Settings, Check, Search, ChevronDown, MoreVertical, ChevronLeft, 
  ChevronRight, AlertTriangle, Clock, ShieldAlert, Mail, FileText, 
  UserPlus, UploadCloud, BarChart3, HelpCircle, Info
} from 'lucide-react';

export default function AlertsNotificationsDashboard() {
  
  // --- STATE FOR TABS (For interactivity if needed) ---
  const [activeAlertTab, setActiveAlertTab] = useState('All');
  const [activeNotifTab, setActiveNotifTab] = useState('All');
  const [dashboard, setDashboard] = useState({});
  const [alerts, setAlerts] = useState([]);

  const [alertFilters, setAlertFilters] = useState({categories: [], severity: [], status: [],});
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [search, setSearch] = useState("");

  const [notifications, setNotifications] = useState([]);

  const [notificationFilters, setNotificationFilters] = useState({category: [], urgency: [],});
  const [notificationSearch, setNotificationSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");

  const [recentAlerts, setRecentAlerts] = useState([]);
  
  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      console.log("Dashboard:", res.data);
      setDashboard(res.data.data || {});
   } catch (err) {
      console.error(err);
    }
  };
  const fetchAlerts = async () => {
    try {
      const res = await getAlerts();
      console.log("Alerts:", res.data);
      setAlerts(res.data.data || []);
    } catch (err) {
        console.error(err);
      }
  };
  const fetchAlertFilters = async () => {
    try {
      const res = await getAlertFilters();
      console.log("Alert Filters:", res.data);
      setAlertFilters(res.data.data || {});
    } catch (err) {
        console.error(err);
      }
  };
  const fetchNotifications = async () => {
    try {
      const res = await getNotifications();
      console.log("Notifications:", res.data);
      setNotifications(res.data.data || []);
    } catch (err) {
       console.error(err);
      }
  };
  const fetchNotificationFilters = async () => {
    try {
      const res = await getNotificationFilters();
      console.log("Notification Filters:", res.data);
      setNotificationFilters(res.data.data || {});
    } catch (err) {
        console.error(err);
      }
  };
  const fetchRecentAlerts = async () => {
    try {
      const res = await getRecentAlerts();
      setRecentAlerts(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchAlerts();
    fetchAlertFilters();
    fetchNotifications();
    fetchNotificationFilters();
    fetchRecentAlerts();
  }, []);

  const notificationIcons = {
    Shipment: {icon: UploadCloud, bg: "bg-teal-50 text-teal-500",},
    Finance: {icon: Check, bg: "bg-emerald-50 text-emerald-500",},
    Compliance: {icon: FileText, bg: "bg-purple-50 text-purple-500",},
    System: {icon: BarChart3, bg: "bg-slate-50 text-slate-500",},
  };

  return (
   <div className="w-full min-h-screen bg-[#f8fafc] p-6 text-slate-700  text-xs antialiased selection:bg-blue-100">
      
     <div className="w-full mt-10">
        
        

        {/* ================= RIGHT COLUMN: NOTIFICATIONS ================= */}
        <div className="w-full">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">Notifications</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Stay updated with important activities and system updates.</p>
            </div>
            <button className="flex items-center gap-1 text-blue-600 font-semibold hover:underline">
              <Check size={13} />
              <span>Mark all as read</span>
            </button>
          </div>

          {/* Pill Filters */}
          <div className="flex items-center gap-2 mb-4">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold shadow-sm">
              All <span className="px-1.5 py-0.2 bg-blue-600 text-white text-[10px] rounded-full font-bold">{dashboard.notifications?.totalNotifications || 0}</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Unread <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] rounded-full font-bold">{dashboard.notifications?.unread || 0}</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Read <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] rounded-full font-bold">{dashboard.notifications?.read || 0}</span>
            </button>
          </div>

          {/* Filter Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="relative">
              <Search size={13} className="absolute right-2.5 top-2.5 text-slate-400" />
              <input type="text" placeholder="Search notifications..." value={notificationSearch} onChange={(e) => setNotificationSearch(e.target.value)} className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none placeholder:text-slate-400 focus:border-blue-500"/>
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none">
              <option value="">All Types</option>{notificationFilters.category.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
           <select value={selectedUrgency} onChange={(e) => setSelectedUrgency(e.target.value)} className="w-full bg-white px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none">
             <option value="">All Urgency</option>{notificationFilters.urgency.map((item) => (<option key={item} value={item}>{item}</option>))}
           </select>
          </div>

          {/* Notifications White Main Container Box */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {recentAlerts.map((notif) => {
                const Icon = notificationIcons[notif.category]?.icon || Mail;
                const iconBg = notificationIcons[notif.category]?.bg || "bg-blue-50 text-blue-500";
                return (
                <div key={notif._id} className="p-4 flex items-center gap-3.5 hover:bg-slate-50/40 transition-colors">
                  <div className={`p-2 rounded-lg shrink-0 ${iconBg}`}>
                    <Icon size={15} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-xs leading-snug">{notif.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-semibold">{notif.message}</p>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-slate-400 font-medium">{new Date(notif.createdAt).toLocaleString()}</span>
                        {/* Status Blue/Gray Indicator Dot */}
                        <span className={`w-1.5 h-1.5 rounded-full ${!notif.isRead ? 'bg-blue-600' : 'bg-slate-200'}`}></span>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {/* Pagination Segment */}
            <div className="p-3 border-t border-slate-100 bg-[#f8fafc]/40 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span> Showing {notifications.length > 0 ? 1 : 0} to {notifications.length} of{" "} {dashboard?.notifications?.totalNotifications || notifications.length} notifications</span>
              <div className="flex items-center gap-1">
                <button className="p-1 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed opacity-50"><ChevronLeft size={13} /></button>
                <button className="px-2 py-0.5 rounded font-bold bg-blue-600 text-white shadow-sm">1</button>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">2</button>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">3</button>
                <span className="px-0.5 text-slate-300">...</span>
                <button className="px-2 py-0.5 rounded font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">5</button>
                <button className="p-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><ChevronRight size={13} /></button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SYSTEM BOTTOM SUMMARY METADATA FOOTER */}
      <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-semibold text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Info size={12} className="text-blue-500" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
          <HelpCircle size={12} className="text-slate-400" />
          <span>Help Center</span>
        </div>
      </div>

    </div>
  );
}