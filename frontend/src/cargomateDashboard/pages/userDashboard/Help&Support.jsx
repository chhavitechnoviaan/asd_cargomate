import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, Mail, MessageSquare, Clock, 
  Search, Plus, ChevronRight, Eye, 
  HelpCircle, FileText, Package, FileCode2, 
  CircleDollarSign, X, Paperclip, Send, AlertCircle
} from 'lucide-react';
import { BookOpen, Phone } from 'lucide-react';
import Swal from 'sweetalert2';
import API from "../../api/axios";
import DashboardAdPlacement from "../../components/DashboardAdPlacement";

function formatDateTime(dateStr) {
  if (!dateStr) return "Just now";
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

export default function HelpSupportDashboard({ role = "user" }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    myTickets: 0,
    openTickets: 0,
    knowledgeBase: 25
  });
  const [tickets, setTickets] = useState([]);
  const [articles, setArticles] = useState([]);
  const [showAllTickets, setShowAllTickets] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewTicket, setViewTicket] = useState(null);
  const [viewArticle, setViewArticle] = useState(null);

  // Form State
  const [createForm, setCreateForm] = useState({
    subject: '',
    category: 'Shipments',
    priority: 'Medium',
    description: '',
    file: null
  });
  const [submitting, setSubmitting] = useState(false);

  // User follow-up reply
  const [userReplyText, setUserReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Fetch Dashboard & Tickets
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/help-support/dashboard');
      if (res.data?.status) {
        const d = res.data.data;
        setSummary(d.summary || {});
        setArticles(d.popularArticles || []);
      }

      const ticketsRes = await API.get('/help-support/tickets');
      if (ticketsRes.data?.status) {
        setTickets(ticketsRes.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching help & support data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle Create Ticket Submit
  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.subject.trim()) {
      Swal.fire({ icon: 'warning', title: 'Subject Required', text: 'Please enter a subject for the ticket.', confirmButtonColor: '#0f766e' });
      return;
    }
    if (!createForm.description.trim()) {
      Swal.fire({ icon: 'warning', title: 'Description Required', text: 'Please describe your problem or issue in detail.', confirmButtonColor: '#0f766e' });
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('subject', createForm.subject.trim());
      formData.append('category', createForm.category);
      formData.append('priority', createForm.priority);
      formData.append('description', createForm.description.trim());
      if (createForm.file) {
        formData.append('attachment', createForm.file);
      }

      const res = await API.post('/help-support/ticket', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data?.status) {
        setIsCreateOpen(false);
        setCreateForm({
          subject: '',
          category: 'Shipments',
          priority: 'Medium',
          description: '',
          file: null
        });
        await fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Ticket Raised!',
          text: `Your ticket ${res.data.data?.ticketId || ''} has been created successfully. Our team will review and reply shortly.`,
          confirmButtonColor: '#0f766e'
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: err.response?.data?.message || err.message || 'Could not create ticket.',
        confirmButtonColor: '#0f766e'
      });
    } finally {
      setSubmitting(false);
    }
  };

  // User sends follow-up reply in view modal
  const handleSendUserReply = async () => {
    if (!userReplyText.trim() || !viewTicket) return;
    try {
      setSendingReply(true);
      const res = await API.post(`/help-support/ticket/${viewTicket._id}/reply`, {
        message: userReplyText.trim()
      });
      if (res.data?.status) {
        setViewTicket(res.data.data);
        setUserReplyText('');
        fetchData();
        Swal.fire({
          icon: 'success',
          title: 'Reply Sent',
          text: 'Your reply has been added to the ticket.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'Failed to send reply' });
    } finally {
      setSendingReply(false);
    }
  };

  const handleLiveChat = () => {
    Swal.fire({
      title: 'Connecting to Live Support...',
      text: 'An agent will be with you shortly.',
      icon: 'info',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  // Filtered tickets
  const filteredTickets = tickets.filter(t => {
    if (selectedCategory && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = t.ticketId?.toLowerCase().includes(q);
      const matchSub = t.subject?.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q);
      return matchId || matchSub || matchDesc;
    }
    return true;
  });

  const displayedTickets = showAllTickets ? filteredTickets : filteredTickets.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-6 pt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Help & Support</h1>
            <p className="text-xs text-slate-500 mt-0.5">How can we help you today?</p>
          </div>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" /> Create Support Ticket
          </button>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* My Tickets */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-teal-50 rounded-full text-teal-600 transition-colors">
                <Phone className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-500 block">My Tickets</span>
                <span className="text-xl font-bold text-slate-900 block mt-0.5">
                  {summary.openTickets !== undefined ? summary.openTickets : (tickets.filter(t => t.status === 'Open').length || tickets.length)}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Open Tickets</span>
                <button 
                  onClick={() => setShowAllTickets(true)} 
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 mt-1"
                >
                  View All Tickets <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-purple-50 rounded-full text-purple-600">
                <BookOpen className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-500 block">Knowledge Base</span>
                <span className="text-xl font-bold text-slate-900 block mt-0.5">{articles.length || 25}</span>
                <span className="text-[11px] text-slate-400 font-medium">Help Articles</span>
                <button 
                  onClick={() => {
                    if (articles.length > 0) setViewArticle(articles[0]);
                  }}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 mt-1"
                >
                  Browse Articles <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Live Support */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-orange-50 rounded-full text-orange-500">
                <MessageSquare className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-500 block">Live Support</span>
                <span className="text-base font-bold text-emerald-600 block mt-1.5 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Available
                </span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">Mon - Sat | 9:00 AM - 6:00 PM</span>
                <button 
                  onClick={handleLiveChat} 
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 mt-1"
                >
                  Start Live Chat <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How Can We Help You & Contact Support */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">How Can We Help You?</h2>
              
              <div className="relative mt-3">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search for help articles, FAQs, guides or ticket subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Popular Topics / Category Cards */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-900 block">Popular Topics</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                
                {/* Shipments */}
                <div 
                  onClick={() => setSelectedCategory(selectedCategory === 'Shipments' ? null : 'Shipments')}
                  className={`border rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-all bg-white ${
                    selectedCategory === 'Shipments' ? 'border-teal-500 ring-2 ring-teal-100 shadow-sm' : 'border-slate-100 hover:border-teal-500 hover:shadow-sm'
                  }`}
                >
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg mb-3">
                    <Package className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Shipments</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-[140px]">Tracking, delays, delivery and status updates.</p>
                </div>

                {/* Documents */}
                <div 
                  onClick={() => setSelectedCategory(selectedCategory === 'Documents' ? null : 'Documents')}
                  className={`border rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-all bg-white ${
                    selectedCategory === 'Documents' ? 'border-teal-500 ring-2 ring-teal-100 shadow-sm' : 'border-slate-100 hover:border-teal-500 hover:shadow-sm'
                  }`}
                >
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg mb-3">
                    <FileText className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Documents</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-[140px]">Invoices, packing list, certificates & more.</p>
                </div>

                {/* HS Codes */}
                <div 
                  onClick={() => setSelectedCategory(selectedCategory === 'HS Codes' ? null : 'HS Codes')}
                  className={`border rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-all bg-white ${
                    selectedCategory === 'HS Codes' ? 'border-teal-500 ring-2 ring-teal-100 shadow-sm' : 'border-slate-100 hover:border-teal-500 hover:shadow-sm'
                  }`}
                >
                  <div className="p-2.5 bg-orange-50 text-orange-500 rounded-lg mb-3">
                    <FileCode2 className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">HS Codes</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-[140px]">Classification, lookup and related queries.</p>
                </div>

                {/* Freight & Costs */}
                <div 
                  onClick={() => setSelectedCategory(selectedCategory === 'Freight & Costs' ? null : 'Freight & Costs')}
                  className={`border rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer transition-all bg-white ${
                    selectedCategory === 'Freight & Costs' ? 'border-teal-500 ring-2 ring-teal-100 shadow-sm' : 'border-slate-100 hover:border-teal-500 hover:shadow-sm'
                  }`}
                >
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg mb-3">
                    <CircleDollarSign className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Freight & Costs</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-[140px]">Rates, charges and cost calculations.</p>
                </div>

              </div>
              {selectedCategory && (
                <div className="flex items-center justify-between text-xs text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg">
                  <span>Filtered by topic: <strong>{selectedCategory}</strong></span>
                  <button onClick={() => setSelectedCategory(null)} className="hover:underline font-bold text-slate-500">Clear filter</button>
                </div>
              )}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Contact Support</h2>
            
            <div className="space-y-3.5">
              <div className="flex items-center gap-3.5 p-1">
                <div className="p-2.5 bg-teal-50 text-teal-600 rounded-full shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 block">Phone Support</span>
                  <span className="text-xs text-slate-500 block mt-0.5 font-medium">+91 22 1234 5678</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-1">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-full shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 block">Email Support</span>
                  <span className="text-xs text-slate-500 block mt-0.5 font-medium">support@asdcargomate.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-1">
                <div className="p-2.5 bg-orange-50 text-orange-500 rounded-full shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 block">Live Chat</span>
                  <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold mt-1 inline-block">Available Now</span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-1 border-t border-slate-50 pt-3">
                <div className="p-2.5 bg-slate-50 text-slate-400 rounded-full shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-700 block">Working Hours</span>
                  <span className="text-xs text-slate-500 block mt-0.5 font-medium">Mon - Sat | 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Support Tickets & Popular Help Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-stretch">
          
          {/* Recent Support Tickets Table */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900">Recent Support Tickets</h2>
                {showAllTickets && (
                  <button 
                    onClick={() => setShowAllTickets(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Show Recent 5
                  </button>
                )}
              </div>

              {loading ? (
                <div className="py-12 text-center text-xs text-slate-400">Loading your support tickets...</div>
              ) : displayedTickets.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs">
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  No tickets found. Raise a ticket whenever you need assistance!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-bold tracking-wider uppercase text-slate-400">
                        <th className="pb-3 font-bold">Ticket ID</th>
                        <th className="pb-3 font-bold">Subject</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold">Last Updated</th>
                        <th className="pb-3 text-center font-bold">Action</th>
                        <th className="pb-3 font-bold">Admin Reply</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-700">
                      {displayedTickets.map((t) => {
                        const adminReplyText = t.lastAdminReply || (t.replies && t.replies.length > 0 ? t.replies[t.replies.length - 1].message : null);
                        return (
                          <tr key={t._id || t.ticketId} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3.5 font-bold text-slate-800">{t.ticketId}</td>
                            <td className="py-3.5 max-w-[170px] truncate text-slate-600 pr-2 font-semibold" title={t.subject}>
                              {t.subject}
                            </td>
                            <td className="py-3.5">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                t.status === 'Open' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                t.status === 'In Progress' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                'bg-emerald-50 text-emerald-600 border border-emerald-100'
                              }`}>
                                {t.status}
                              </span>
                            </td>
                            <td className="py-3.5 text-slate-400 text-[11px] font-medium whitespace-nowrap">
                              {formatDateTime(t.updatedAt || t.createdAt)}
                            </td>
                            <td className="py-3.5 text-center">
                              <button 
                                onClick={() => setViewTicket(t)}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded transition-colors text-[11px] font-semibold"
                              >
                                <Eye className="w-3.5 h-3.5" /> View
                              </button>
                            </td>
                            <td className="py-3.5 max-w-[180px]">
                              {adminReplyText ? (
                                <div className="space-y-0.5">
                                  <p className="text-[11px] text-slate-600 truncate" title={adminReplyText}>
                                    {adminReplyText}
                                  </p>
                                  <button 
                                    onClick={() => setViewTicket(t)}
                                    className="text-[10px] font-bold text-teal-600 hover:text-teal-800 inline-flex items-center gap-0.5"
                                  >
                                    <Eye className="w-3 h-3" /> View
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[11px] text-slate-400 italic">No reply yet</span>
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
            
            <button 
              onClick={() => setShowAllTickets(!showAllTickets)} 
              className="w-full text-center text-xs font-bold text-teal-600 hover:text-teal-800 pt-4 mt-2 border-t border-slate-50 flex items-center justify-center gap-1"
            >
              {showAllTickets ? "Show Recent Tickets" : "View All Tickets"} <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Popular Help Articles */}
          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3">Popular Help Articles</h2>
              
              <div className="divide-y divide-slate-50">
                {(articles.length > 0 ? articles : [
                  { title: 'How do I track my shipment?', content: 'Navigate to the tracking module and insert your container/BOL tracking identifier.' },
                  { title: 'How is freight cost calculated?', content: 'Freight charges are evaluated dynamically based on volumetric weight and spot shipping lane rates.' },
                  { title: 'How do I generate reports?', content: 'Access the Reports section from your sidebar to export tailored audit and trade analytics reports.' },
                  { title: 'How do I check incentives?', content: 'Use the Incentive Checker tool under DGFT Schemes to check duty exemption rates.' }
                ]).map((article, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setViewArticle(article)}
                    className="py-3 flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-teal-700 cursor-pointer group transition-colors"
                  >
                    <span>{article.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                if (articles.length > 0) setViewArticle(articles[0]);
              }} 
              className="w-full text-center text-xs font-bold text-teal-600 hover:text-teal-800 pt-4 border-t border-slate-50 flex items-center justify-center gap-1"
            >
              View All Articles <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

        </div>

        {/* Ad Placement */}
        <section className="w-full min-w-0 mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
          <DashboardAdPlacement
            location="User Dashboard - Help & Support"
            layout="banner"
            slot="banner"
            intervalMs={5000}
          />
        </section>

        {/* Bottom Banner */}
        <div className="bg-[#f1f5f9]/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border border-slate-200/50">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 font-medium tracking-wide">
              Can't find what you're looking for? Our support team is here to help.
            </span>
          </div>
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            Contact Us <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* CREATE SUPPORT TICKET MODAL */}
      {/* ========================================================= */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create Support Ticket</h3>
              <button 
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4 mt-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Subject / Issue Title *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Shipment Delay - PLN-2025-04-24-000123"
                  value={createForm.subject}
                  onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select 
                    value={createForm.category}
                    onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="Shipments">Shipments</option>
                    <option value="Documents">Documents</option>
                    <option value="HS Codes">HS Codes</option>
                    <option value="Freight & Costs">Freight & Costs</option>
                    <option value="Payment">Payment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Priority</label>
                  <select 
                    value={createForm.priority}
                    onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Description / Message *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe your problem or question in detail..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-teal-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Attachment (Optional)</label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 border border-dashed border-slate-300 rounded-lg hover:border-teal-500 text-slate-600 transition-colors">
                    <Paperclip className="w-4 h-4 text-slate-400" />
                    <span className="text-[11px] font-semibold">{createForm.file ? createForm.file.name : "Choose file (PDF, Doc, Image)"}</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setCreateForm({ ...createForm, file: e.target.files[0] })}
                    />
                  </label>
                  {createForm.file && (
                    <button 
                      type="button" 
                      onClick={() => setCreateForm({ ...createForm, file: null })}
                      className="text-red-500 hover:text-red-700 text-[11px] font-bold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CUSTOMER — VIEW TICKET MODAL (Image 3 Right Side) */}
      {/* ========================================================= */}
      {viewTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Ticket Details</h3>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {viewTicket.ticketId}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  viewTicket.status === 'Open' ? 'bg-orange-50 text-orange-600' :
                  viewTicket.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  {viewTicket.status}
                </span>
              </div>
              <button 
                onClick={() => setViewTicket(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ticket Subject */}
            <div className="mt-4">
              <h2 className="text-base font-bold text-slate-900">{viewTicket.subject}</h2>
              <div className="flex items-center gap-6 text-[11px] text-slate-400 font-medium mt-1">
                <div>
                  <span className="text-slate-500 font-semibold">Created: </span>
                  {formatFullDate(viewTicket.createdAt)}
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">Last Updated: </span>
                  {formatFullDate(viewTicket.updatedAt)}
                </div>
              </div>
            </div>

            {/* Your Message Section */}
            <div className="mt-5 bg-slate-50/70 border border-slate-100 rounded-xl p-4">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">Your Message</span>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                {viewTicket.description}
              </p>

              {/* Attachment if any */}
              {viewTicket.attachmentName && (
                <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
                    <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                    {viewTicket.attachmentName}
                  </span>
                  {viewTicket.attachment && (
                    <a 
                      href={viewTicket.attachment.startsWith("http") ? viewTicket.attachment : `http://localhost:8000${viewTicket.attachment}`} 
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

            {/* Admin Reply Section (matching Image 3 right side) */}
            <div className="mt-5 space-y-3">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">Admin Reply</span>
              
              {viewTicket.replies && viewTicket.replies.length > 0 ? (
                viewTicket.replies.map((reply, idx) => (
                  <div key={idx} className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0">
                        ST
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">{reply.senderName || "Support Team"}</span>
                          <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.2 rounded font-semibold">
                            {reply.senderRole || "Support Team"}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block">{formatFullDate(reply.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 pl-11 leading-relaxed whitespace-pre-wrap">
                      {reply.message}
                    </p>
                    <div className="pl-11 pt-1 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>A copy has been sent to your email.</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center text-xs text-slate-400 italic">
                  Our support specialists are reviewing your inquiry. An email notification will be delivered as soon as we reply.
                </div>
              )}
            </div>

            {/* Optional follow-up reply box */}
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">Need to add more details?</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Type a follow-up message..."
                  value={userReplyText}
                  onChange={(e) => setUserReplyText(e.target.value)}
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
                />
                <button 
                  onClick={handleSendUserReply}
                  disabled={sendingReply || !userReplyText.trim()}
                  className="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" /> Send
                </button>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-5 flex justify-end">
              <button 
                onClick={() => setViewTicket(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* ARTICLE VIEWER MODAL */}
      {/* ========================================================= */}
      {viewArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">{viewArticle.title}</h3>
              <button 
                onClick={() => setViewArticle(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
              {viewArticle.content}
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setViewArticle(null)}
                className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
