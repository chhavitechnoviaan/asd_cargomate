import React, { useState, useEffect } from "react";
import { 
  FiSearch, FiChevronDown, FiX, FiCheck, FiSend, FiPaperclip, 
  FiClock, FiRefreshCw, FiMessageSquare, FiEye, FiMail, FiUsers, FiTag
} from "react-icons/fi";
import { 
  BsBuilding, BsHeadset, BsCode, BsCreditCard, BsTicketPerforated 
} from "react-icons/bs";
import Swal from "sweetalert2";
import API from "../../api/axios";

function formatDateTime(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  const timePart = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 0) return `Today, ${timePart}`;
  if (diffDays === 1) return `Yesterday, ${timePart}`;
  if (diffDays < 7) return `${diffDays} Days Ago`;
  return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}, ${timePart}`;
}

function formatFullDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const timePart = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}, ${timePart}`;
}

export default function Support() {
  const [activeTab, setActiveTab] = useState("tickets"); // "tickets" | "departments"
  const [loading, setLoading] = useState(true);

  // Metrics
  const [metrics, setMetrics] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    repliedTickets: 0
  });

  // Tickets List
  const [tickets, setTickets] = useState([]);
  const [userTypeFilter, setUserTypeFilter] = useState("All Users");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Selected ticket for bottom inline reply panel
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyStatus, setReplyStatus] = useState("In Progress");
  const [sendingReply, setSendingReply] = useState(false);

  // Modal View Ticket
  const [modalTicket, setModalTicket] = useState(null);
  const [modalReplyText, setModalReplyText] = useState("");
  const [modalReplyStatus, setModalReplyStatus] = useState("In Progress");
  const [modalSendingReply, setModalSendingReply] = useState(false);

  // Admin identity (defaulting to Priya Sharma / Support Admin if not configured)
  const [adminName, setAdminName] = useState("Priya Sharma");
  const [adminRole, setAdminRole] = useState("Support Admin");

  // Fetch Dashboard Metrics & Tickets
  const fetchTicketsData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/help-support/dashboard");
      if (res.data?.status && res.data.data?.metrics) {
        setMetrics(res.data.data.metrics);
      }

      const ticketsRes = await API.get("/help-support/tickets");
      if (ticketsRes.data?.status) {
        const fetched = ticketsRes.data.data || [];
        setTickets(fetched);
        if (fetched.length > 0 && !selectedTicket) {
          setSelectedTicket(fetched[0]);
          setReplyStatus(fetched[0].status === "Open" ? "In Progress" : fetched[0].status);
        }
      }
    } catch (err) {
      console.error("Error fetching support tickets in admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketsData();
  }, []);

  // Filter tickets
  const filteredTickets = tickets.filter(t => {
    if (userTypeFilter !== "All Users") {
      const isVendor = t.userType === "Vendor" || t.userType === "Dealer";
      if (userTypeFilter === "Vendor" && !isVendor) return false;
      if (userTypeFilter === "Customer" && t.userType !== "Customer") return false;
    }
    if (statusFilter !== "All Status") {
      if (t.status?.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = t.ticketId?.toLowerCase().includes(q);
      const matchSub = t.subject?.toLowerCase().includes(q);
      const matchUser = t.userId?.name?.toLowerCase().includes(q) || t.userId?.email?.toLowerCase().includes(q);
      return matchId || matchSub || matchUser;
    }
    return true;
  });

  // Handle Send Reply from Bottom Panel
  const handleSendReply = async () => {
    if (!selectedTicket) return;
    if (!replyText.trim()) {
      Swal.fire({ icon: "warning", title: "Message Required", text: "Please enter your reply text before sending." });
      return;
    }

    try {
      setSendingReply(true);
      const res = await API.post(`/help-support/ticket/${selectedTicket._id}/reply`, {
        message: replyText.trim(),
        newStatus: replyStatus
      });

      if (res.data?.status) {
        const updated = res.data.data;
        setSelectedTicket(updated);
        setReplyText("");
        await fetchTicketsData();
        Swal.fire({
          icon: "success",
          title: "Reply Dispatched",
          text: `Reply sent via email to ${selectedTicket.userId?.email || 'customer'} successfully.`,
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Reply Failed",
        text: err.response?.data?.message || err.message || "Failed to send reply."
      });
    } finally {
      setSendingReply(false);
    }
  };

  // Handle Send Reply from Admin View Ticket Modal
  const handleSendModalReply = async () => {
    if (!modalTicket) return;
    if (!modalReplyText.trim()) {
      Swal.fire({ icon: "warning", title: "Message Required", text: "Please enter your reply text." });
      return;
    }

    try {
      setModalSendingReply(true);
      const res = await API.post(`/help-support/ticket/${modalTicket._id}/reply`, {
        message: modalReplyText.trim(),
        newStatus: modalReplyStatus
      });

      if (res.data?.status) {
        const updated = res.data.data;
        setModalTicket(updated);
        setModalReplyText("");
        if (selectedTicket?._id === updated._id) {
          setSelectedTicket(updated);
        }
        await fetchTicketsData();
        Swal.fire({
          icon: "success",
          title: "Reply Dispatched",
          text: `Reply sent via email to ${modalTicket.userId?.email || 'user'} successfully.`,
          timer: 2000,
          showConfirmButton: false
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.response?.data?.message || err.message || "Failed to send reply"
      });
    } finally {
      setModalSendingReply(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-6 pt-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Tab switcher: Support Tickets (default) | Department Teams */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("tickets")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "tickets"
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <BsTicketPerforated className="w-4 h-4" /> Support Tickets
          </button>
          <button
            onClick={() => setActiveTab("departments")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === "departments"
                ? "bg-teal-700 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <FiUsers className="w-4 h-4" /> Department & Teams
          </button>
        </div>

        {activeTab === "tickets" ? (
          <>
            {/* Header Title (matching Image 2) */}
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Support Ticket Management</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Review customer and vendor tickets and send replies by email.
              </p>
            </div>

            {/* 4 Metrics Cards (matching Image 2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Total Tickets */}
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600">
                  <BsTicketPerforated className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Total Tickets</span>
                  <span className="text-2xl font-bold text-slate-900 block mt-0.5">
                    {metrics.totalTickets || tickets.length}
                  </span>
                </div>
              </div>

              {/* Open */}
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="p-3.5 bg-orange-50 rounded-2xl text-orange-500">
                  <FiClock className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Open</span>
                  <span className="text-2xl font-bold text-slate-900 block mt-0.5">
                    {metrics.openTickets ?? tickets.filter(t => t.status === "Open").length}
                  </span>
                </div>
              </div>

              {/* In Progress */}
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="p-3.5 bg-blue-50 rounded-2xl text-blue-600">
                  <FiRefreshCw className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">In Progress</span>
                  <span className="text-2xl font-bold text-slate-900 block mt-0.5">
                    {metrics.inProgressTickets ?? tickets.filter(t => t.status === "In Progress").length}
                  </span>
                </div>
              </div>

              {/* Replied */}
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-4">
                <div className="p-3.5 bg-purple-50 rounded-2xl text-purple-600">
                  <FiMessageSquare className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Replied</span>
                  <span className="text-2xl font-bold text-slate-900 block mt-0.5">
                    {metrics.repliedTickets ?? tickets.filter(t => t.status === "Replied" || t.status === "Resolved").length}
                  </span>
                </div>
              </div>

            </div>

            {/* Support Tickets Section */}
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
              
              {/* Header & Filters (matching Image 2) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-base font-bold text-slate-900">Support Tickets</h2>

                <div className="flex items-center gap-3">
                  {/* All Users Filter */}
                  <div className="relative">
                    <select
                      value={userTypeFilter}
                      onChange={(e) => setUserTypeFilter(e.target.value)}
                      className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-teal-500 cursor-pointer"
                    >
                      <option value="All Users">All Users</option>
                      <option value="Customer">Customer</option>
                      <option value="Vendor">Vendor</option>
                    </select>
                    <FiChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>

                  {/* All Status Filter */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-teal-500 cursor-pointer"
                    >
                      <option value="All Status">All Status</option>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Replied">Replied</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <FiChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Table (matching Image 2) */}
              {loading ? (
                <div className="py-12 text-center text-xs text-slate-400">Loading tickets...</div>
              ) : filteredTickets.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400">No tickets found matching filters.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold tracking-wider uppercase text-slate-400">
                        <th className="pb-3 font-bold">USER TYPE</th>
                        <th className="pb-3 font-bold">TICKET ID</th>
                        <th className="pb-3 font-bold">SUBJECT</th>
                        <th className="pb-3 font-bold">STATUS</th>
                        <th className="pb-3 font-bold">VIEW TICKET</th>
                        <th className="pb-3 font-bold">REPLY</th>
                        <th className="pb-3 font-bold">REPLIED BY</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-700">
                      {filteredTickets.map((t) => {
                        const isVendor = t.userType === "Vendor" || t.userType === "Dealer";
                        const isSelected = selectedTicket?._id === t._id;
                        return (
                          <tr 
                            key={t._id || t.ticketId}
                            className={`hover:bg-slate-50/70 transition-colors ${isSelected ? "bg-teal-50/30" : ""}`}
                          >
                            {/* USER TYPE */}
                            <td className="py-4">
                              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                isVendor 
                                  ? "bg-purple-50 text-purple-600 border border-purple-100" 
                                  : "bg-blue-50 text-blue-600 border border-blue-100"
                              }`}>
                                {isVendor ? "Vendor" : "Customer"}
                              </span>
                            </td>

                            {/* TICKET ID */}
                            <td className="py-4 font-bold text-slate-800">
                              {t.ticketId}
                            </td>

                            {/* SUBJECT */}
                            <td className="py-4 font-semibold text-slate-700 max-w-[200px] truncate" title={t.subject}>
                              {t.subject}
                            </td>

                            {/* STATUS */}
                            <td className="py-4">
                              <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                                t.status === "Open" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                                t.status === "In Progress" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                                "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              }`}>
                                {t.status}
                              </span>
                            </td>

                            {/* VIEW TICKET */}
                            <td className="py-4">
                              <button
                                onClick={() => {
                                  setModalTicket(t);
                                  setModalReplyStatus(t.status === "Open" ? "In Progress" : t.status);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-slate-700 hover:text-teal-700 rounded-lg text-xs font-semibold transition-colors"
                              >
                                <FiEye className="w-3.5 h-3.5 text-slate-400" /> View Ticket
                              </button>
                            </td>

                            {/* REPLY */}
                            <td className="py-4">
                              <button
                                onClick={() => {
                                  setSelectedTicket(t);
                                  setReplyStatus(t.status === "Open" ? "In Progress" : t.status);
                                }}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                              >
                                <FiMail className="w-3.5 h-3.5" /> Reply Here
                              </button>
                            </td>

                            {/* REPLIED BY */}
                            <td className="py-4 text-[11px]">
                              {t.lastRepliedBy?.name ? (
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-slate-800">{t.lastRepliedBy.name}</span>
                                    <span className="bg-purple-100 text-purple-700 px-1.5 py-0.2 rounded font-semibold text-[9px]">
                                      {t.lastRepliedBy.role || "Support Admin"}
                                    </span>
                                  </div>
                                  <span className="text-slate-400 font-medium block mt-0.5">
                                    {formatDateTime(t.lastRepliedBy.repliedAt || t.updatedAt)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-slate-400 italic">Not replied yet</span>
                              )}
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

            {/* Bottom 2-Column Section (matching Image 2) */}
            {selectedTicket && (
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-start">
                
                {/* Left Column: Reply to Ticket • TKT-1024 */}
                <div className="lg:col-span-4 bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900">
                      Reply to Ticket • {selectedTicket.ticketId}
                    </h3>
                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs font-medium">
                    {/* To */}
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">To</label>
                      <input
                        type="email"
                        readOnly
                        value={selectedTicket.userId?.email || "customer@example.com"}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Subject</label>
                      <input
                        type="text"
                        readOnly
                        value={`Re: ${selectedTicket.ticketId} — ${selectedTicket.subject}`}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none"
                      />
                    </div>

                    {/* Status Dropdown */}
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Update Status</label>
                      <select
                        value={replyStatus}
                        onChange={(e) => setReplyStatus(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Replied">Replied</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    {/* Your Reply */}
                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Your Reply</label>
                      <textarea
                        rows={4}
                        placeholder="Write your reply to the user..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-teal-500"
                      ></textarea>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Sending as: <strong className="text-slate-600">{adminName}</strong> • {adminRole}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setReplyText("")}
                          className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleSendReply}
                          disabled={sendingReply || !replyText.trim()}
                          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
                        >
                          <FiMail className="w-3.5 h-3.5" />
                          {sendingReply ? "Sending..." : "Send Reply via Email"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Reply History */}
                <div className="lg:col-span-3 bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                    Reply History
                  </h3>

                  {selectedTicket.replies && selectedTicket.replies.length > 0 ? (
                    <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                      {selectedTicket.replies.map((r, idx) => (
                        <div key={idx} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-bold">
                                {(r.senderName || "PS").slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-slate-800">{r.senderName || "Priya Sharma"}</span>
                                  <span className="bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded font-semibold text-[9px]">
                                    {r.senderRole || "Support Admin"}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 block">{formatDateTime(r.createdAt)}</span>
                              </div>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold text-[10px]">
                              Email sent
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 pl-9 leading-relaxed whitespace-pre-wrap">
                            {r.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center text-xs text-slate-400 italic">
                      No replies recorded for this ticket yet.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ========================================================= */}
            {/* ADMIN — VIEW TICKET MODAL (Image 3 Left Side) */}
            {/* ========================================================= */}
            {modalTicket && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">Ticket Details</h3>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {modalTicket.ticketId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        modalTicket.status === "Open" ? "bg-orange-50 text-orange-600 border border-orange-100" :
                        modalTicket.status === "In Progress" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                        "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}>
                        {modalTicket.status}
                      </span>
                    </div>
                    <button
                      onClick={() => setModalTicket(null)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Subject */}
                  <div className="mt-4">
                    <h2 className="text-base font-bold text-slate-900">{modalTicket.subject}</h2>
                    
                    {/* Metadata Grid (Image 3 Left) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 p-3 bg-slate-50/70 rounded-xl text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">User Type</span>
                        <span className="font-bold text-blue-600">{modalTicket.userType || "Customer"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Name</span>
                        <span className="font-semibold text-slate-800">{modalTicket.userId?.name || "Customer"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Email</span>
                        <span className="font-semibold text-slate-800 truncate block">{modalTicket.userId?.email || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Created</span>
                        <span className="text-slate-600">{formatFullDate(modalTicket.createdAt)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold uppercase">Last Updated</span>
                        <span className="text-slate-600">{formatFullDate(modalTicket.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Message */}
                  <div className="mt-4 bg-white border border-slate-200 rounded-xl p-4">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                      Customer Message
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {modalTicket.description}
                    </p>

                    {/* Attachment if present */}
                    {modalTicket.attachmentName && (
                      <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-100">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
                          <FiPaperclip className="w-3.5 h-3.5 text-slate-400" />
                          {modalTicket.attachmentName}
                        </span>
                        {modalTicket.attachment && (
                          <a
                            href={modalTicket.attachment.startsWith("http") ? modalTicket.attachment : `http://localhost:8000${modalTicket.attachment}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-teal-700 hover:underline px-2 py-1"
                          >
                            View
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Conversation / Reply History */}
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Conversation
                    </span>
                    {modalTicket.replies && modalTicket.replies.length > 0 ? (
                      modalTicket.replies.map((rep, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-[10px] font-bold">
                                {(rep.senderName || "PS").slice(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-slate-800">{rep.senderName || "Priya Sharma"}</span>
                                  <span className="bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded font-semibold text-[9px]">
                                    {rep.senderRole || "Support Admin"}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400">{formatFullDate(rep.createdAt)}</span>
                              </div>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-bold text-[9px]">
                              Email sent
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 pl-9 leading-relaxed whitespace-pre-wrap">
                            {rep.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400 italic p-3 bg-slate-50 rounded-xl">
                        No previous replies.
                      </div>
                    )}
                  </div>

                  {/* Reply to Customer (Image 3 Left Bottom) */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3 text-xs font-medium">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                      Reply to Customer
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">To</label>
                        <input
                          type="email"
                          readOnly
                          value={modalTicket.userId?.email || "customer@example.com"}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 font-semibold mb-1">Status</label>
                        <select
                          value={modalReplyStatus}
                          onChange={(e) => setModalReplyStatus(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Replied">Replied</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-500 font-semibold mb-1">Your Reply</label>
                      <textarea
                        rows={3}
                        placeholder="Write your reply..."
                        value={modalReplyText}
                        onChange={(e) => setModalReplyText(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-teal-500"
                      ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Replying as: <strong className="text-slate-600">{adminName}</strong> • {adminRole}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setModalTicket(null)}
                          className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          onClick={handleSendModalReply}
                          disabled={modalSendingReply || !modalReplyText.trim()}
                          className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
                        >
                          <FiMail className="w-3.5 h-3.5" />
                          {modalSendingReply ? "Sending..." : "Send Reply via Email"}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </>
        ) : (
          /* Department Teams fallback tab */
          <DepartmentTeamsSection />
        )}

      </div>
    </div>
  );
}

// Department & Teams fallback view component
function DepartmentTeamsSection() {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/departments").then(res => {
      if (res.data?.status) setDepartments(res.data.data);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm space-y-4">
      <h2 className="text-base font-bold text-slate-900">Department & Roles Management</h2>
      <p className="text-xs text-slate-500">Configure departments and user permissions.</p>

      {departments.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400">No departments configured yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((d) => (
            <div key={d._id} className="border border-slate-200 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-slate-800">{d.name}</span>
              <p className="text-[11px] text-slate-500">{d.description || "Active department"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
