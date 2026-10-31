

import React, { useState } from 'react';
import { 
  PhoneCall, Mail, MessageSquare, Clock, 
  Search, Plus, ChevronRight, Eye, 
  HelpCircle, ShieldCheck, FileText, Compass,
  Layers, Package, FileCode2, CircleDollarSign
} from 'lucide-react';
import { BookOpen, Phone } from 'lucide-react';

import Swal from 'sweetalert2';

import DashboardAdPlacement from "../../components/DashboardAdPlacement";

export default function HelpSupportDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([
    { id: 'TKT-1024', subject: 'Shipment Delay -PLN-2025-04-24-000123', status: 'Open', lastUpdated: 'Today, 09:25 AM' },
    { id: 'TKT-1023', subject: 'Invoice Issue - INV-2025-1034', status: 'In Progress', lastUpdated: 'Yesterday, 04:30 PM' },
    { id: 'TKT-1022', subject: 'HS Code Classification Query', status: 'Resolved', lastUpdated: '2 Days Ago' }
  ]);

  const handleCreateTicket = () => {
    Swal.fire({
      title: 'Create Support Ticket',
      html: `
        <input id="swal-input-sub" class="swal2-input !m-2 !w-[80%] !text-sm" placeholder="Subject / Issue Title">
        <textarea id="swal-input-msg" class="swal2-textarea !m-2 !w-[80%] !text-sm h-24" placeholder="Describe your problem in detail..."></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit Ticket',
      confirmButtonColor: '#0f766e',
      cancelButtonColor: '#64748b',
      background: '#ffffff',
      customClass: { popup: 'rounded-2xl ' },
      preConfirm: () => {
        const subject = document.getElementById('swal-input-sub').value;
        const msg = document.getElementById('swal-input-msg').value;
        if (!subject || !msg) {
          Swal.showValidationMessage('Please fill out both fields');
        }
        return { subject };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
        setTickets([
          { id: newId, subject: result.value.subject, status: 'Open', lastUpdated: 'Just now' },
          ...tickets
        ]);
        Swal.fire({
          title: 'Ticket Created!',
          text: `Your ticket ${newId} has been successfully raised.`,
          icon: 'success',
          confirmButtonColor: '#0f766e'
        });
      }
    });
  };

  const handleViewTicket = (ticket) => {
    Swal.fire({
      title: ticket.id,
      html: `
        <div class="text-left p-2 ">
          <p class="font-bold text-slate-800 text-base mb-2">${ticket.subject}</p>
          <div class="flex gap-4 text-xs text-slate-500 mt-4">
            <span><strong>Status:</strong> ${ticket.status}</span>
            <span><strong>Updated:</strong> ${ticket.lastUpdated}</span>
          </div>
        </div>
      `,
      confirmButtonColor: '#0f766e',
      confirmButtonText: 'Close Window'
    });
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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800  p-6 pt-20">
      
     

      <div className="max-w-10xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Help & Support</h1>
            <p className="text-xs text-slate-500 mt-0.5">How can we help you today?</p>
          </div>
          <button 
            onClick={handleCreateTicket}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-all shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" /> Create Support Ticket
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-teal-50 rounded-full text-teal-600 transition-colors">
                <Phone  className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-500 block">My Tickets</span>
                <span className="text-xl font-bold text-slate-900 block mt-0.5">{tickets.length}</span>
                <span className="text-[11px] text-slate-400 font-medium">Open Tickets</span>
                  <button onClick={() => Swal.fire({title:'Tickets', text:'Viewing filtered active list below.', icon:'info', confirmButtonColor:'#0f766e'})} className="text-l text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1">
              View All Tickets <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
              </div>
            </div>
          
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-purple-50 rounded-full text-purple-600">
                <BookOpen className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-500 block">Knowledge Base</span>
                <span className="text-xl font-bold text-slate-900 block mt-0.5">25</span>
                <span className="text-[11px] text-slate-400 font-medium">Help Articles</span>
               <button onClick={() => Swal.fire({title:'Articles', text:'Redirecting to documentation portal.', icon:'success', confirmButtonColor:'#0f766e'})} className="text-l  text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1">
              Browse Articles <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button> </div>
            </div>
            
          
          </div>

          <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-orange-50 rounded-full text-orange-500">
                {/* <MessageSquareMore  ageSquare className="w-6 h-6 stroke-[1.75]" /> */}
                <MessageSquare className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-500 block">Live Support</span>
                <span className="text-base font-bold text-emerald-600 block mt-1.5 flex items-center gap-1">
                  <span className="h-2 w-2  text-lg rounded-full bg-emerald-500 inline-block animate-pulse"></span> Available
                </span>
                <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">Mon - Sat | 9:00 AM - 6:00 PM</span>
            <button onClick={handleLiveChat} className="text-l font-bold text-xs text-teal-700 hover:text-teal-800 flex items-center gap-1">
              Start Live Chat <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>  </div>
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">How Can We Help You?</h2>
              
              <div className="relative mt-3">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search for help articles, FAQs, guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-900 block">Popular Topics</span>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                
                <div onClick={() => Swal.fire({title:'Shipments Help', text:'Loading related queries...', timer:1000, showConfirmButton:false})} className="border border-slate-100 rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:shadow-sm transition-all bg-white">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg mb-3">
                    <Package className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Shipments</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-[140px]">Tracking, delays, delivery and status updates.</p>
                </div>

                <div onClick={() => Swal.fire({title:'Documents Help', text:'Loading related queries...', timer:1000, showConfirmButton:false})} className="border border-slate-100 rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:shadow-sm transition-all bg-white">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg mb-3">
                    <FileText className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Documents</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-[140px]">Invoices, packing list, certificates & more.</p>
                </div>

                <div onClick={() => Swal.fire({title:'HS Codes Help', text:'Loading related queries...', timer:1000, showConfirmButton:false})} className="border border-slate-100 rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:shadow-sm transition-all bg-white">
                  <div className="p-2.5 bg-orange-50 text-orange-500 rounded-lg mb-3">
                    <FileCode2 className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">HS Codes</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-[140px]">Classification, lookup and related queries.</p>
                </div>

                <div onClick={() => Swal.fire({title:'Freight Help', text:'Loading related queries...', timer:1000, showConfirmButton:false})} className="border border-slate-100 rounded-xl p-5 text-center flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 hover:shadow-sm transition-all bg-white">
                  <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg mb-3">
                    <CircleDollarSign className="w-5 h-5 stroke-[2]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Freight & Costs</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal max-w-[140px]">Rates, charges and cost calculations.</p>
                </div>

              </div>
            </div>
          </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-stretch">
          
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-4">Recent Support Tickets</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold tracking-wider uppercase text-slate-400">
                      <th className="pb-3 font-bold">Ticket ID</th>
                      <th className="pb-3 font-bold">Subject</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold">Last Updated</th>
                      <th className="pb-3 text-center font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-700">
                    {tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 font-bold text-slate-700">{t.id}</td>
                        <td className="py-3.5 max-w-[180px] truncate text-slate-500 pr-2 font-semibold" title={t.subject}>{t.subject}</td>
                        <td className="py-3.5">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            t.status === 'Open' ? 'bg-orange-50 text-orange-600' :
                            t.status === 'In Progress' ? 'bg-blue-50 text-blue-600' :
                            'bg-emerald-50 text-emerald-600'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="py-3.5 text-slate-400 text-[11px] font-bold">{t.lastUpdated}</td>
                        <td className="py-3.5 text-center ">
                          <button 
                            onClick={() => handleViewTicket(t)}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-md transition-colors inline-block"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <button onClick={() => Swal.fire({title:'All Tickets', text:'Paginated historical logs view initialized.', confirmButtonColor:'#0f766e'})} className="w-full text-center text-l text-xs font-bold text-teal-500 hover:text-teal-800 pt-4 mt-2 border-t border-slate-50 flex items-center justify-center gap-1">
              View All Tickets <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3">Popular Help Articles</h2>
              
              <div className="divide-y divide-slate-50">
                {[
                  'How do I track my shipment?',
                  'How is freight cost calculated?',
                  'How do I generate reports?',
                  'How do I check incentives?'
                ].map((article, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => Swal.fire({title: article, text:'This guide content will render inside markdown documentation views.', icon:'info', confirmButtonColor:'#0f766e'})}
                    className="py-3 flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-teal-700 cursor-pointer group transition-colors"
                  >
                    <span>{article}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => Swal.fire({title:'Documentation Base', text:'Opening all 25 indexed learning modules.', confirmButtonColor:'#0f766e'})} className="w-full text-center text-l text-xs font-bold text-teal-500 hover:text-teal-800 pt-4 border-t border-slate-50 flex items-center justify-center gap-1">
              View All Articles <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

        </div>

        {/* Full-width horizontal advertisement banner */}
        <section className="w-full min-w-0 mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
          <DashboardAdPlacement
            location="User Dashboard - Help & Support"
            layout="banner"
            slot="banner"
            intervalMs={5000}
          />
        </section>

        <div className="bg-[#f1f5f9]/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border border-slate-200/50">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 font-medium tracking-wide">Can't find what you're looking for? Our support team is here to help.</span>
          </div>
          <button 
            onClick={() => Swal.fire({title:'Contact Channels', text:'Our executive grid desk will email you immediately.', icon:'success', confirmButtonColor:'#0f766e'})}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            Contact Us <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </div>
  );
}