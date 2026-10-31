


// import React, { useState, useRef, useEffect } from "react";
// import {
//   Bot,
//   Menu,
//   PanelLeft,
//   ExternalLink,
//   X,
//   Plus,
//   Search,
//   MessageSquare,
//   Home,
//   Plane,
//   Truck,
//   FileText,
//   ShieldCheck,
//   Landmark,
//   TrendingUp,
//   BarChart2,
//   BookOpen,
//   HelpCircle,
//   Bell,
//   ChevronDown,
//   Paperclip,
//   Mic,
//   Camera,
//   Send,
//   RefreshCw,
//   ArrowUp,
//   ArrowDown,
//   ShieldAlert,
//   Wallet,
//   Radar,
//   Crown,
//   Ship,
//   GitCompare,
//   Clock,
//   FileSearch, Calculator, BadgeCheck, Globe2,     BadgePercent
// } from "lucide-react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import chatbot from "../assets/Images/webp/chatbot.webp";
// import Shipment from "./ShipmentForm";
// import { sendTradeChat } from "../api/CargoMateApi";
// import API from "../api/axios";

// const CHATBOT_AD_LOCATION = "User Dashboard - AI Chatbot";
// const ADS_API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
// const resolveAdImageUrl = (image) => {
//   if (!image) return "";
//   if (/^https?:\/\//i.test(image)) return image;
//   return `${ADS_API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
// };
// const services = [
//   {
//     icon: ShieldCheck,
//     iconBg: "bg-blue-500/20",
//     iconColor: "text-blue-400",
//     title: "GLOBAL LOGISTICS CORP - Global Trade Insurance",
//     desc: "Protect your cargo globally. Instant quotes.",
//     cta: "Learn More",
//   },
//   {
//     icon: BadgePercent,
//     iconBg: "bg-teal-500/20",
//     iconColor: "text-teal-400",
//     title: "TRADE FINANCE SOLUTIONS - Import/Export Financing",
//     desc: "Specialized pre-shipment and post-shipment finance up to ₹10 Crores.",
//     cta: "Apply Now",
//   },
// ];
// const trendData = [
//   { date: "10 May", rate: 1.95 },
//   { date: "12 May", rate: 2.05 },
//   { date: "14 May", rate: 1.98 },
//   { date: "17 May", rate: 2.1 },
//   { date: "19 May", rate: 2.18 },
//   { date: "21 May", rate: 2.12 },
//   { date: "24 May", rate: 2.28 },
//   { date: "26 May", rate: 2.35 },
//   { date: "28 May", rate: 2.3 },
//   { date: "31 May", rate: 2.45 },
//   { date: "02 Jun", rate: 2.5 },
//   { date: "04 Jun", rate: 2.42 },
//   { date: "07 Jun", rate: 2.6 },
//   { date: "09 Jun", rate: 2.55 },
//   { date: "11 Jun", rate: 2.68 },
//   { date: "13 Jun", rate: 2.7 },
//   { date: "07 Jun", rate: 2.75 },
// ];

// const navItems = [
//   { icon: Home, label: "AI Assistant", badge: "New", active: true },
//   { icon: Plane, label: "Freight Intelligence" },
//   { icon: Truck, label: "Shipment Tracking" },
//   { icon: FileText, label: "Documentation" },
//   { icon: ShieldCheck, label: "Trade Compliance" },
//   { icon: Search, label: "HS Code Finder" },
//   { icon: Wallet, label: "Trade Finance" },
//   { icon: Landmark, label: "Government Schemes" },
//   { icon: TrendingUp, label: "Market Insights" },
//   { icon: BarChart2, label: "Reports & Analytics" },
//   { icon: BookOpen, label: "Training & Resources" },
//   { icon: HelpCircle, label: "Support Center" },
// ];

// const quickOptions = [
//   {
//     icon: Ship,
//     text: "What about sea freight?",
//     response:
//       "Sea freight to London currently averages $0.85 per kg with a transit time of 18-22 days via major carriers. It costs far less than air freight but takes longer, making it ideal for bulk, non-urgent shipments.",
//   },
//   {
//     icon: GitCompare,
//     text: "Compare air vs sea",
//     response:
//       "Air freight: $2.75/kg, 2 days, best for urgent or high-value cargo. Sea freight: $0.85/kg, 18-22 days, best for bulk or non-urgent cargo. Pick air for speed, sea for cost savings on volume.",
//   },
//   {
//     icon: TrendingUp,
//     text: "Show price trend",
//     response:
//       "Freight rates to London have risen 12.5% over the last 30 days, driven by peak season demand and higher fuel surcharges. Rates are expected to keep climbing over the next two weeks.",
//   },
//   {
//     icon: Clock,
//     text: "Best time to book?",
//     response:
//       "Now is a good time to book. Rates are trending upward and pre-booking today could save you 8-10% compared to waiting, based on the current 30-day trend.",
//   },
// ];

// const badges = [
//   { icon: ShieldCheck, label: "Trusted by", value: "5000+ Businesses" },
//   { icon: ShieldCheck, label: "MSME Support", value: "Verified", check: true },
//   { icon: ShieldCheck, label: "DGFT Guidance", value: "Verified", check: true },
//   { icon: FileSearch, label: "ICEGATE", value: "Verified", check: true },
// ];

// const alertCards = [
//   {
//     icon: FileSearch,
//     color: "blue",
//     title: "HS Code Lookup",
//     desc: "Find the right HS code for your product instantly",
//     action: "Search HS Code",
//   },
//   {
//     icon: BadgePercent,
//     color: "green",
//     title: "Incentive checker",
//     desc: "Check RoDTEP, Drawback & state incentives for your shipment",
//     action: "Check Eligibility",
//   },
//   {
//     icon: Calculator,
//     color: "orange",
//     title: "Freight Calculator",
//     desc: "Estimate air, sea & road freight cost before you book",
//     action: "Calculate Now",
//   },
  
// ];

// const colorMap = {
//   red: "bg-red-50 text-red-600 border-red-100",
//   green: "bg-green-50 text-green-600 border-green-100",
//   blue: "bg-blue-50 text-blue-600 border-blue-100",
//   orange: "bg-orange-50 text-orange-600 border-orange-100",
// };



// function Badge({ icon: Icon, label, value, check }) {
//   return (
//     <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg whitespace-nowrap shrink-0">
//       <Icon size={16} className="text-blue-600 shrink-0" />
//       <div className="leading-tight text-xs">
//         <div className="text-gray-500">{label}</div>
//         <div className="font-semibold text-gray-800 flex items-center gap-1">
//           {value}
//           {check && <ShieldCheck size={12} className="text-green-500" />}
//         </div>
//       </div>
//     </div>
//   );
// }

// function AlertCard({ icon: Icon, color, title, desc, action }) {
//   return (
//     <div className={`rounded-xl border p-3 sm:p-4 ${colorMap[color]}`}>
//       <div className="flex items-center gap-2 mb-1.5">
//         <Icon size={16} />
//         <span className="font-semibold text-sm text-gray-900">{title}</span>
//       </div>
//       <p className="text-xs text-gray-600 mb-2">{desc}</p>
//       <button className="text-xs font-semibold flex items-center gap-1">
//         {action} <span>→</span>
//       </button>
//     </div>
//   );
// }

// function createWelcomeMessage() {
//   return {
//     id: "welcome",
//     kind: "text",
//     sender: "bot",
//     text: "👋 Hello! I'm your AI Trade Assistant. I can help you with EXIM, Logistics, Compliance, Documentation, Freight Rates, and more. How can I assist you today?",
//     time: new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//   };
// }

// export default function CargoMateChat() {
//   const [recentChats, setRecentChats] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarVisible, setSidebarVisible] = useState(true);
//   const [plusOpen, setPlusOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState(() => [createWelcomeMessage()]);
//   const [featuredAds, setFeaturedAds] = useState([]);
//   const [adsLoading, setAdsLoading] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [shipment, setShipment] = useState("");
//   const scrollRef = useRef(null);
//   const plusRef = useRef(null);

//   useEffect(() => {
//     let mounted = true;
//     setAdsLoading(true);

//     API.get("/ads/placement", {
//       params: { location: CHATBOT_AD_LOCATION },
//     })
//       .then((response) => {
//         if (!mounted) return;
//         const payload = response?.data?.data ?? response?.data;
//         const ads = Array.isArray(payload)
//           ? payload
//           : Array.isArray(payload?.ads)
//             ? payload.ads
//             : Array.isArray(payload?.items)
//               ? payload.items
//               : [];
//         setFeaturedAds(ads);
//       })
//       .catch((error) => {
//         console.error(
//           "Unable to load featured ads:",
//           error?.response?.data || error.message
//         );
//         if (mounted) setFeaturedAds([]);
//       })
//       .finally(() => {
//         if (mounted) setAdsLoading(false);
//       });

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages, typing]);

//   useEffect(() => {
//     function handleClick(e) {
//       if (plusRef.current && !plusRef.current.contains(e.target)) {
//         setPlusOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const saveCurrentChat = () => {
//     if (messages.length === 0) return;
//     const firstUserMessage = messages.find(
//       (m) => m.kind === "text" && m.sender === "user"
//     );
//     const title = firstUserMessage ? firstUserMessage.text : "New Chat";
//     const chat = {
//       id: currentChatId || Date.now(),
//       title,
//       messages,
//       updatedAt: Date.now(),
//     };
//     setRecentChats((prev) => {
//       const filtered = prev.filter((c) => c.id !== chat.id);
//       return [chat, ...filtered];
//     });
//   };

//   const startNewChat = () => {
//     saveCurrentChat();
//     setMessages([createWelcomeMessage()]);
//     setCurrentChatId(null);
//     setInput("");
//     setSidebarOpen(false);
//   };

//   const openRecentChat = (chat) => {
     
//     setMessages(chat.messages);
//     setCurrentChatId(chat.id);
//     setSidebarOpen(false);
//   };

//   const sendMessage = async (text) => {
//     const trimmed = String(text || "").trim();
//     if (!trimmed || typing) return;
//     const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const userMsg = { id: Date.now(), kind: "text", sender: "user", text: trimmed, time: now() };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setPlusOpen(false);
//     setTyping(true);
//     try {
//       const sessionId = currentChatId ? String(currentChatId) : `web-${Date.now()}`;
//       if (!currentChatId) setCurrentChatId(sessionId);
//       const response = await sendTradeChat({ message: trimmed, session_id: sessionId, user_role: window.location.pathname.toLowerCase().includes("b2b") ? "b2b" : "user" });
//       const data = response?.data ?? response;
//       const replyText =
//         (typeof data === "string" && data) ||
//         data?.answer || data?.response || data?.message || data?.reply ||
//         "I couldn't find a text response for that request. Please try again.";
//       setMessages((prev) => [
//         ...prev,
//         { id: Date.now() + 1, kind: "text", sender: "bot", text: String(replyText), time: now(), raw: data },
//       ]);
//     } catch (error) {
//       const detail = error?.response?.data?.detail || error?.response?.data?.message || error.message;
//       setMessages((prev) => [...prev, {
//         id: Date.now() + 1, kind: "text", sender: "bot",
//         text: `I couldn't connect to the trade assistant API. ${detail || "Please check the API server and try again."}`,
//         time: now(), error: true,
//       }]);
//     } finally {
//       setTyping(false);
//     }
//   };

//   const handleOptionClick = (text) => {
//     setInput(text);
//     setPlusOpen(false);
//   };

//   const renderMessage = (m) => {
//     if (m.kind === "text" && m.sender === "user") {
//       return (
//         <div key={m.id} className="flex justify-end">
//           <div className="max-w-2xl">
//             <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
//               {m.text}
//             </div>
//             <span className="text-[11px] text-gray-400 flex justify-end mr-1 mt-1">
//               {m.time} ✓
//             </span>
//           </div>
//         </div>
//       );
//     }

//     if (m.kind === "text" && m.sender === "bot") {
//       return (
//         <div key={m.id} className="flex sm:gap-3 gap-1 max-w-2xl">
//           <div className="sm:w-20 h-9 rounded-full w-10 sm:flex items-center justify-center shrink-0">
//             <img src={chatbot} alt="chatbot" className="sm:w-16 sm:h-16" />
//           </div>
//           <div>
//             <div className="bg-blue-50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800">
//               {m.text}
//             </div>
//             <span className="text-[11px] text-gray-400 ml-1">{m.time}</span>
//           </div>
//         </div>
//       );
//     }

//     if (m.kind === "analyzing") {
//       return (
//         <div key={m.id} className="flex gap-3 max-w-2xl">
//           <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
//             <img src={chatbot} alt="chatbot" className="w-10 h-10" />
//           </div>
//           <span className="text-sm text-gray-500 mt-2">
//             Analyzing latest rates for London Heathrow...
//           </span>
//         </div>
//       );
//     }

//     if (m.kind === "quick-chips") {
//       return (
//         <div key={m.id} className="flex flex-wrap gap-2">
//           {quickOptions.map((opt) => (
//             <button
//               key={opt.text}
//               onClick={() => sendMessage(opt.text)}
//               className="px-3 py-1.5 border border-gray-200 rounded-full text-xs text-blue-700 hover:bg-blue-50 transition"
//             >
//               {opt.text}
//             </button>
//           ))}
//           <button
//             onClick={() =>
//               setMessages((prev) => prev.filter((msg) => msg.id !== m.id))
//             }
//             className="p-1.5 border border-gray-200 rounded-full text-gray-400 hover:bg-gray-50 transition"
//           >
//             <RefreshCw size={13} />
//           </button>
//         </div>
//       );
//     }

//     if (m.kind === "alerts") {
//       return (
//         <div key={m.id} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//           {alertCards.map((a) => (
//             <AlertCard key={a.title} {...a} />
//           ))}
//         </div>
//       );
//     }

//     return null;
//   };

//   if (shipment === "shipment") {
//     return (
//       <Shipment
//         setActiveTab={() => {}}
//         setShipment={setShipment}
//         currentTab={"AI CargoMate Assistant"}
//       />
//     );
//   }

//   return (
//     <div className="flex flex-col h-full pt-14">
//       <header className="flex items-center justify-between gap-3 px-3 sm:px-5 py-3 border-b border-gray-200 shrink-0">
//         <div className="flex">
//           <button
//             type="button"
//             onClick={() => {
//               if (window.innerWidth < 1024) {
//                 setSidebarOpen(true);
//               } else {
//                 setSidebarVisible((visible) => !visible);
//               }
//             }}
//             className="p-2 rounded-lg hover:bg-gray-100 transition"
//             aria-label="Show or hide chat sidebar"
//             title="Show or hide sidebar"
//           >
//             {sidebarVisible ? (
//               <Menu size={22} className="text-gray-600" />
//             ) : (
//               <PanelLeft size={22} className="text-gray-600" />
//             )}
//           </button>

//           <div className="flex items-center gap-2 shrink-0">
//             <div className="rounded-full flex items-center justify-center">
//               <img src={chatbot} alt="chatbot" className="hidden sm:w-16 sm:h-16" />
//             </div>
//             <div className="leading-tight hidden sm:block">
//               <div className="font-bold text-blue-700 text-base">
//                 ASD CargoMate<span className="align-super text-xs">™</span>
//               </div>
//               <div className="text-[11px] text-gray-500">Your Smart Trade Assistant</div>
//             </div>
//           </div>
//         </div>

//         <div className="flex sm:hidden md:flex items-center gap-2 sm:gap-4 shrink-0">
        
//           <button className="flex items-center gap-1 text-sm text-gray-600">
//             English <ChevronDown size={14} />
//           </button>
//           <div className="flex items-center gap-2">
//             <div className="w-16 h-8 rounded-full flex items-center justify-center">
//               <img src={chatbot} alt="chatbot" className="w-10 h-10 sm:w-14 sm:h-14" />
//             </div>
//             <div className="leading-tight text-xs">
//               <div className="font-semibold text-gray-800">ASD Logistics</div>
//               <div className="text-blue-600">Pro Plan</div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1 min-h-0 w-full bg-white text-gray-900 overflow-hidden ">
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         <aside
//           className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } ${sidebarVisible ? "" : "lg:hidden"} lg:translate-x-0`}
//         >
//           <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 lg:hidden">
//             <span className="font-semibold text-blue-700">Menu</span>
//             <button onClick={() => setSidebarOpen(false)}>
//               <X size={20} className="text-gray-500" />
//             </button>
//           </div>

//           <div className="p-3 space-y-2 border-b border-gray-100">
//             <button
//               onClick={startNewChat}
//               className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
//             >
//               <Plus size={16} />
//               New Chat
//             </button>
//             {/* <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500">
//               <Search size={16} />
//               <input
//                 placeholder="Search chats..."
//                 className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
//               />
//             </div> */}
//           </div>

//           <nav className="flex-1 overflow-y-auto p-3 space-y-1 light-scrollbar">
        

//             <div className="pt-3 mt-2 border-t border-gray-100">
//               <p className="px-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
//                 Recent Chats
//               </p>
//               {recentChats.length === 0 && (
//                 <p className="px-3 py-2 text-xs text-gray-400">No chats yet</p>
//               )}
//               {recentChats.map((chat) => (
//                 <button
//                   key={chat.id}
//                   onClick={() => openRecentChat(chat)}
//                   className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
//                     chat.id === currentChatId
//                       ? "bg-blue-50 text-blue-700 font-medium"
//                       : "text-gray-600 hover:bg-gray-50"
//                   }`}
//                 >
//                   <MessageSquare size={15} className="shrink-0 text-gray-400" />
//                   <span className="truncate text-left">{chat.title}</span>
//                 </button>
//               ))}
//             </div>
//           </nav>

//           <div className="mt-auto max-h-[42%] overflow-y-auto light-scrollbar">
//             {featuredAds.length > 0 && (
//               <section className="border-t border-gray-100 p-3" aria-label="Featured services">
//                 {/* <div className="mb-2 flex items-center justify-between gap-2">
//                   <p className="text-[10px] font-semibold text-slate-500 tracking-wide">
//                     FEATURED SERVICES
//                   </p>
//                   <span className="text-[9px] text-slate-400">Offers for you</span>
//                 </div> */}
//                 <div className="grid grid-cols-1 gap-2">
//                   {featuredAds.map((ad, index) => {
//                     const imageUrl = resolveAdImageUrl(ad.image || ad.imageUrl || ad.banner);
//                     const title = ad.title || ad.name || ad.postText || "Featured service";
//                     const description = ad.subPostText || ad.description || ad.caption || "";
//                     const destination = ad.linkUrl || ad.redirectUrl || ad.ctaUrl || "";
//                     const actionLabel = ad.buttonText || ad.cta || "Learn More";
//                     const adKey = ad._id || ad.id || `${title}-${index}`;
//                     const content = (
//                       <>
//                         {imageUrl && (
//                           <img
//                             src={imageUrl}
//                             alt={title}
//                             loading="lazy"
//                             className="block w-full h-16 object-cover"
//                             onError={(event) => {
//                               event.currentTarget.style.display = "none";
//                             }}
//                           />
//                         )}
//                         <div className="flex flex-1 flex-col gap-1.5 p-2.5">
//                           <p className="text-xs font-semibold leading-snug text-white line-clamp-2">{title}</p>
//                           {description && (
//                             <p className="text-[10px] leading-snug text-slate-300 line-clamp-2">{description}</p>
//                           )}
//                           {destination && (
//                             <span className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-[11px] font-medium text-slate-900 transition-colors hover:bg-slate-100">
//                               {actionLabel}
//                               <ExternalLink size={14} />
//                             </span>
//                           )}
//                         </div>
//                       </>
//                     );

//                     return destination ? (
//                       <a
//                         key={adKey}
//                         href={destination}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex flex-col overflow-hidden rounded-lg bg-[#0f1b2d] text-white"
//                       >
//                         {content}
//                       </a>
//                     ) : (
//                       <article
//                         key={adKey}
//                         className="flex flex-col overflow-hidden rounded-lg bg-[#0f1b2d] text-white"
//                       >
//                         {content}
//                       </article>
//                     );
//                   })}
//                 </div>
//               </section>
//             )}

//             {adsLoading && featuredAds.length === 0 && (
//               <div className="mt-6 text-xs text-slate-400" role="status">
//                 Loading featured services…
//               </div>
//             )}
//             {adsLoading && featuredAds.length === 0 && (
//               <div className="px-3 pb-3 text-[10px] text-slate-400" role="status">
//                 Loading featured services…
//               </div>
//             )}
//           </div>
//         </aside>

//         <div className="flex-1 flex flex-col min-w-0">
//           <main
//             ref={scrollRef}
//             className="flex-1 overflow-y-auto px-3 sm:px-5 py-5 space-y-5 light-scrollbar"
//           >
//             {messages.length === 0 && (
//               <div className="h-full flex items-center justify-center text-sm text-gray-400">
//                 Start typing to begin a new chat
//               </div>
//             )}
//             {messages.map(renderMessage)}

//             {typing && (
//               <div className="flex gap-3 max-w-2xl">
//                 <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
//                   <img src={chatbot} alt="chatbot" className="w-10 h-10" />
//                 </div>
//                 <div className="bg-blue-50 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
//                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
//                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
//                   <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
//                 </div>
//               </div>
//             )}



//           </main>
 
          
//           <div className="border-t relative border-gray-200 px-3 sm:px-5 py-3 shrink-0">
//             <div className=" flex items-center gap-2 max-w-4xl mx-auto">
//               {plusOpen && (
//                 <div
//                   ref={plusRef}
//                   className="absolute bottom-full mb-2 left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20"
//                 >
//                   {quickOptions.map((opt) => (
//                     <button
//                       key={opt.text}
//                       onClick={() => handleOptionClick(opt.text)}
//                       className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition text-left"
//                     >
//                       <opt.icon size={17} className="text-gray-500 shrink-0" />
//                       {opt.text}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               <button
//                 onClick={() => setPlusOpen((v) => !v)}
//                 className="p-2.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition shrink-0"
//               >
//                 {plusOpen ? <X size={18} /> : <Plus size={18} />}
//               </button>

//               <div className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2.5">
//                 <Paperclip size={17} className="text-gray-400 shrink-0" />
//                 <input
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
//                   placeholder="Ask anything about Export, Import, Logistics or Trade..."
//                   className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
//                 />
//                 <Mic size={17} className="text-gray-400 shrink-0 hidden sm:block" />
//                 <Camera size={17} className="text-gray-400 shrink-0 hidden sm:block" />
//               </div>

//               <button
   
//                 onClick={() => {
//                    sendMessage(input)
//                    saveCurrentChat()
//                 }}
//                 className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shrink-0"
//               >
//                 <Send size={16} />
//               </button>
//             </div>
//             <p className="text-center text-[11px] text-gray-400 mt-2">
//               Chatbot can make mistake.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useState, useRef, useEffect } from "react";

import {

  Bot,

  Menu,

  PanelLeft,

  ExternalLink,

  X,

  Plus,

  Search,

  MessageSquare,

  Home,

  Plane,

  Truck,

  FileText,

  ShieldCheck,

  Landmark,

  TrendingUp,

  BarChart2,

  BookOpen,

  HelpCircle,

  Bell,

  ChevronDown,

  Paperclip,

  Mic,

  Camera,

  Send,

  RefreshCw,

  ArrowUp,

  ArrowDown,

  ShieldAlert,

  Wallet,

  Radar,

  Crown,

  Ship,

  GitCompare,

  Clock,

  FileSearch, Calculator, BadgeCheck, Globe2,     BadgePercent

} from "lucide-react";

import {

  AreaChart,

  Area,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer,

} from "recharts";

import chatbot from "../assets/Images/webp/chatbot.webp";

import Shipment from "./ShipmentForm";

import { sendTradeChat } from "../api/CargoMateApi";

import API from "../api/axios";



const CHATBOT_AD_LOCATION = "User Dashboard - AI Chatbot";

const ADS_API_ORIGIN = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

const resolveAdImageUrl = (image) => {

  if (!image) return "";

  if (/^https?:\/\//i.test(image)) return image;

  return `${ADS_API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;

};

const services = [

  {

    icon: ShieldCheck,

    iconBg: "bg-blue-500/20",

    iconColor: "text-blue-400",

    title: "GLOBAL LOGISTICS CORP - Global Trade Insurance",

    desc: "Protect your cargo globally. Instant quotes.",

    cta: "Learn More",

  },

  {

    icon: BadgePercent,

    iconBg: "bg-teal-500/20",

    iconColor: "text-teal-400",

    title: "TRADE FINANCE SOLUTIONS - Import/Export Financing",

    desc: "Specialized pre-shipment and post-shipment finance up to ₹10 Crores.",

    cta: "Apply Now",

  },

];

const trendData = [

  { date: "10 May", rate: 1.95 },

  { date: "12 May", rate: 2.05 },

  { date: "14 May", rate: 1.98 },

  { date: "17 May", rate: 2.1 },

  { date: "19 May", rate: 2.18 },

  { date: "21 May", rate: 2.12 },

  { date: "24 May", rate: 2.28 },

  { date: "26 May", rate: 2.35 },

  { date: "28 May", rate: 2.3 },

  { date: "31 May", rate: 2.45 },

  { date: "02 Jun", rate: 2.5 },

  { date: "04 Jun", rate: 2.42 },

  { date: "07 Jun", rate: 2.6 },

  { date: "09 Jun", rate: 2.55 },

  { date: "11 Jun", rate: 2.68 },

  { date: "13 Jun", rate: 2.7 },

  { date: "07 Jun", rate: 2.75 },

];



const navItems = [

  { icon: Home, label: "AI Assistant", badge: "New", active: true },

  { icon: Plane, label: "Freight Intelligence" },

  { icon: Truck, label: "Shipment Tracking" },

  { icon: FileText, label: "Documentation" },

  { icon: ShieldCheck, label: "Trade Compliance" },

  { icon: Search, label: "HS Code Finder" },

  { icon: Wallet, label: "Trade Finance" },

  { icon: Landmark, label: "Government Schemes" },

  { icon: TrendingUp, label: "Market Insights" },

  { icon: BarChart2, label: "Reports & Analytics" },

  { icon: BookOpen, label: "Training & Resources" },

  { icon: HelpCircle, label: "Support Center" },

];



const quickOptions = [

  {

    icon: Ship,

    text: "What about sea freight?",

    response:

      "Sea freight to London currently averages $0.85 per kg with a transit time of 18-22 days via major carriers. It costs far less than air freight but takes longer, making it ideal for bulk, non-urgent shipments.",

  },

  {

    icon: GitCompare,

    text: "Compare air vs sea",

    response:

      "Air freight: $2.75/kg, 2 days, best for urgent or high-value cargo. Sea freight: $0.85/kg, 18-22 days, best for bulk or non-urgent cargo. Pick air for speed, sea for cost savings on volume.",

  },

  {

    icon: TrendingUp,

    text: "Show price trend",

    response:

      "Freight rates to London have risen 12.5% over the last 30 days, driven by peak season demand and higher fuel surcharges. Rates are expected to keep climbing over the next two weeks.",

  },

  {

    icon: Clock,

    text: "Best time to book?",

    response:

      "Now is a good time to book. Rates are trending upward and pre-booking today could save you 8-10% compared to waiting, based on the current 30-day trend.",

  },

];



const badges = [

  { icon: ShieldCheck, label: "Trusted by", value: "5000+ Businesses" },

  { icon: ShieldCheck, label: "MSME Support", value: "Verified", check: true },

  { icon: ShieldCheck, label: "DGFT Guidance", value: "Verified", check: true },

  { icon: FileSearch, label: "ICEGATE", value: "Verified", check: true },

];



const alertCards = [

  {

    icon: FileSearch,

    color: "blue",

    title: "HS Code Lookup",

    desc: "Find the right HS code for your product instantly",

    action: "Search HS Code",

  },

  {

    icon: BadgePercent,

    color: "green",

    title: "Incentive checker",

    desc: "Check RoDTEP, Drawback & state incentives for your shipment",

    action: "Check Eligibility",

  },

  {

    icon: Calculator,

    color: "orange",

    title: "Freight Calculator",

    desc: "Estimate air, sea & road freight cost before you book",

    action: "Calculate Now",

  },



];



const colorMap = {

  red: "bg-red-50 text-red-600 border-red-100",

  green: "bg-green-50 text-green-600 border-green-100",

  blue: "bg-blue-50 text-blue-600 border-blue-100",

  orange: "bg-orange-50 text-orange-600 border-orange-100",

};







function Badge({ icon: Icon, label, value, check }) {

  return (

    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg whitespace-nowrap shrink-0">

      <Icon size={16} className="text-blue-600 shrink-0" />

      <div className="leading-tight text-xs">

        <div className="text-gray-500">{label}</div>

        <div className="font-semibold text-gray-800 flex items-center gap-1">

          {value}

          {check && <ShieldCheck size={12} className="text-green-500" />}

        </div>

      </div>

    </div>

  );

}



function AlertCard({ icon: Icon, color, title, desc, action }) {

  return (

    <div className={`rounded-xl border p-3 sm:p-4 ${colorMap[color]}`}>

      <div className="flex items-center gap-2 mb-1.5">

        <Icon size={16} />

        <span className="font-semibold text-sm text-gray-900">{title}</span>

      </div>

      <p className="text-xs text-gray-600 mb-2">{desc}</p>

      <button className="text-xs font-semibold flex items-center gap-1">

        {action} <span>→</span>

      </button>

    </div>

  );

}



function createWelcomeMessage() {

  return {

    id: "welcome",

    kind: "text",

    sender: "bot",

    text: "👋 Hello! I'm your AI Trade Assistant. I can help you with EXIM, Logistics, Compliance, Documentation, Freight Rates, and more. How can I assist you today?",

    time: new Date().toLocaleTimeString([], {

      hour: "2-digit",

      minute: "2-digit",

    }),

  };

}



export default function CargoMateChat() {

  const [recentChats, setRecentChats] = useState([]);

  const [currentChatId, setCurrentChatId] = useState(null);



  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarVisible, setSidebarVisible] = useState(true);

  const [plusOpen, setPlusOpen] = useState(false);

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState(() => [createWelcomeMessage()]);

  const [featuredAds, setFeaturedAds] = useState([]);

  const [adsLoading, setAdsLoading] = useState(false);

  const [typing, setTyping] = useState(false);

  const [shipment, setShipment] = useState("");

  const scrollRef = useRef(null);

  const plusRef = useRef(null);



  useEffect(() => {

    let mounted = true;

    setAdsLoading(true);



    API.get("/ads/placement", {

      params: { location: CHATBOT_AD_LOCATION },

    })

      .then((response) => {

        if (!mounted) return;

        const payload = response?.data?.data ?? response?.data;

        const ads = Array.isArray(payload)

          ? payload

          : Array.isArray(payload?.ads)

            ? payload.ads

            : Array.isArray(payload?.items)

              ? payload.items

              : [];

        setFeaturedAds(ads);

      })

      .catch((error) => {

        console.error(

          "Unable to load featured ads:",

          error?.response?.data || error.message

        );

        if (mounted) setFeaturedAds([]);

      })

      .finally(() => {

        if (mounted) setAdsLoading(false);

      });



    return () => {

      mounted = false;

    };

  }, []);



  useEffect(() => {

    if (scrollRef.current) {

      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    }

  }, [messages, typing]);



  useEffect(() => {

    function handleClick(e) {

      if (plusRef.current && !plusRef.current.contains(e.target)) {

        setPlusOpen(false);

      }

    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);

  }, []);



  const saveCurrentChat = () => {

    if (messages.length === 0) return;

    const firstUserMessage = messages.find(

      (m) => m.kind === "text" && m.sender === "user"

    );

    const title = firstUserMessage ? firstUserMessage.text : "New Chat";

    const chat = {

      id: currentChatId || Date.now(),

      title,

      messages,

      updatedAt: Date.now(),

    };

    setRecentChats((prev) => {

      const filtered = prev.filter((c) => c.id !== chat.id);

      return [chat, ...filtered];

    });

  };



  const startNewChat = () => {

    saveCurrentChat();

    setMessages([createWelcomeMessage()]);

    setCurrentChatId(null);

    setInput("");

    setSidebarOpen(false);

  };



  const openRecentChat = (chat) => {



    setMessages(chat.messages);

    setCurrentChatId(chat.id);

    setSidebarOpen(false);

  };



  const sendMessage = async (text) => {

    const trimmed = String(text || "").trim();

    if (!trimmed || typing) return;

    const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg = { id: Date.now(), kind: "text", sender: "user", text: trimmed, time: now() };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    setPlusOpen(false);

    setTyping(true);

    try {

      const sessionId = currentChatId ? String(currentChatId) : `web-${Date.now()}`;

      if (!currentChatId) setCurrentChatId(sessionId);

      const response = await sendTradeChat({ message: trimmed, session_id: sessionId, user_role: window.location.pathname.toLowerCase().includes("b2b") ? "b2b" : "user" });

      const data = response?.data ?? response;

      const replyText =

        (typeof data === "string" && data) ||

        data?.answer || data?.response || data?.message || data?.reply ||

        "I couldn't find a text response for that request. Please try again.";

      setMessages((prev) => [

        ...prev,

        { id: Date.now() + 1, kind: "text", sender: "bot", text: String(replyText), time: now(), raw: data },

      ]);

    } catch (error) {

      const detail = error?.response?.data?.detail || error?.response?.data?.message || error.message;

      setMessages((prev) => [...prev, {

        id: Date.now() + 1, kind: "text", sender: "bot",

        text: `I couldn't connect to the trade assistant API. ${detail || "Please check the API server and try again."}`,

        time: now(), error: true,

      }]);

    } finally {

      setTyping(false);

    }

  };



  const handleOptionClick = (text) => {

    setInput(text);

    setPlusOpen(false);

  };



  const renderMessage = (m) => {

    if (m.kind === "text" && m.sender === "user") {

      return (

        <div key={m.id} className="flex justify-end">

          <div className="max-w-2xl">

            <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">

              {m.text}

            </div>

            <span className="text-[11px] text-gray-400 flex justify-end mr-1 mt-1">

              {m.time} ✓

            </span>

          </div>

        </div>

      );

    }



    if (m.kind === "text" && m.sender === "bot") {

      return (

        <div key={m.id} className="flex sm:gap-3 gap-1 max-w-2xl">

          <div className="sm:w-20 h-9 rounded-full w-10 sm:flex items-center justify-center shrink-0">

            <img src={chatbot} alt="chatbot" className="sm:w-16 sm:h-16" />

          </div>

          <div>

            <div className="bg-blue-50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800">

              {m.text}

            </div>

            <span className="text-[11px] text-gray-400 ml-1">{m.time}</span>

          </div>

        </div>

      );

    }



    if (m.kind === "analyzing") {

      return (

        <div key={m.id} className="flex gap-3 max-w-2xl">

          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">

            <img src={chatbot} alt="chatbot" className="w-10 h-10" />

          </div>

          <span className="text-sm text-gray-500 mt-2">

            Analyzing latest rates for London Heathrow...

          </span>

        </div>

      );

    }



    if (m.kind === "quick-chips") {

      return (

        <div key={m.id} className="flex flex-wrap gap-2">

          {quickOptions.map((opt) => (

            <button

              key={opt.text}

              onClick={() => sendMessage(opt.text)}

              className="px-3 py-1.5 border border-gray-200 rounded-full text-xs text-blue-700 hover:bg-blue-50 transition"

            >

              {opt.text}

            </button>

          ))}

          <button

            onClick={() =>

              setMessages((prev) => prev.filter((msg) => msg.id !== m.id))

            }

            className="p-1.5 border border-gray-200 rounded-full text-gray-400 hover:bg-gray-50 transition"

          >

            <RefreshCw size={13} />

          </button>

        </div>

      );

    }



    if (m.kind === "alerts") {

      return (

        <div key={m.id} className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          {alertCards.map((a) => (

            <AlertCard key={a.title} {...a} />

          ))}

        </div>

      );

    }



    return null;

  };



  if (shipment === "shipment") {

    return (

      <Shipment

        setActiveTab={() => {}}

        setShipment={setShipment}

        currentTab={"AI CargoMate Assistant"}

      />

    );

  }



  return (

    <div className="flex flex-col h-full pt-14">

      <header className="flex items-center justify-between gap-3 px-3 sm:px-5 py-3 border-b border-gray-200 shrink-0">

        <div className="flex">

          <button

            type="button"

            onClick={() => {

              if (window.innerWidth < 1024) {

                setSidebarOpen(true);

              } else {

                setSidebarVisible((visible) => !visible);

              }

            }}

            className="p-2 rounded-lg hover:bg-gray-100 transition"

            aria-label="Show or hide chat sidebar"

            title="Show or hide sidebar"

          >

            {sidebarVisible ? (

              <Menu size={22} className="text-gray-600" />

            ) : (

              <PanelLeft size={22} className="text-gray-600" />

            )}

          </button>



          <div className="flex items-center gap-2 shrink-0">

            <div className="rounded-full flex items-center justify-center">

              <img src={chatbot} alt="chatbot" className="hidden sm:w-16 sm:h-16" />

            </div>

            <div className="leading-tight hidden sm:block">

              <div className="font-bold text-blue-700 text-base">

                ASD CargoMate<span className="align-super text-xs">™</span>

              </div>

              <div className="text-[11px] text-gray-500">Your Smart Trade Assistant</div>

            </div>

          </div>

        </div>



        <div className="flex sm:hidden md:flex items-center gap-2 sm:gap-4 shrink-0">



          <button className="flex items-center gap-1 text-sm text-gray-600">

            English <ChevronDown size={14} />

          </button>

          <div className="flex items-center gap-2">

            <div className="w-16 h-8 rounded-full flex items-center justify-center">

              <img src={chatbot} alt="chatbot" className="w-10 h-10 sm:w-14 sm:h-14" />

            </div>

            <div className="leading-tight text-xs">

              <div className="font-semibold text-gray-800">ASD Logistics</div>

              <div className="text-blue-600">Pro Plan</div>

            </div>

          </div>

        </div>

      </header>



      <div className="flex flex-1 min-h-0 w-full bg-white text-gray-900 overflow-hidden ">

        {sidebarOpen && (

          <div

            className="fixed inset-0 bg-black/40 z-40 lg:hidden"

            onClick={() => setSidebarOpen(false)}

          />

        )}



        <aside

          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ${

            sidebarOpen ? "translate-x-0" : "-translate-x-full"

          } ${sidebarVisible ? "" : "lg:hidden"} lg:translate-x-0`}

        >

          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 lg:hidden">

            <span className="font-semibold text-blue-700">Menu</span>

            <button onClick={() => setSidebarOpen(false)}>

              <X size={20} className="text-gray-500" />

            </button>

          </div>



          <div className="p-3 space-y-2 border-b border-slate-100 bg-white/80">

            <button

              onClick={startNewChat}

              className="w-full flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 px-3.5 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-900/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300"

            >

              <Plus size={16} />

              New Chat

            </button>

            {/* <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-500">

              <Search size={16} />

              <input

                placeholder="Search chats..."

                className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"

              />

            </div> */}

          </div>



          <nav className="flex-1 overflow-y-auto p-3 space-y-1 light-scrollbar">





            <div className="pt-3 mt-2 border-t border-gray-100">

              <p className="px-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">

                Recent Chats

              </p>

              {recentChats.length === 0 && (

                <p className="px-3 py-2 text-xs text-gray-400">No chats yet</p>

              )}

              {recentChats.map((chat) => (

                <button

                  key={chat.id}

                  onClick={() => openRecentChat(chat)}

                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${

                    chat.id === currentChatId

                      ? "bg-blue-50 text-blue-700 font-medium"

                      : "text-gray-600 hover:bg-gray-50"

                  }`}

                >

                  <MessageSquare size={15} className="shrink-0 text-gray-400" />

                  <span className="truncate text-left">{chat.title}</span>

                </button>

              ))}

            </div>

          </nav>



          <div className="mt-auto max-h-[48%] overflow-y-auto border-t border-slate-100 bg-white/70 light-scrollbar">

            {featuredAds.length > 0 && (

              <section className="p-3" aria-label="Featured services">

                {/* <div className="mb-2 flex items-center justify-between gap-2">

                  <p className="text-[10px] font-semibold text-slate-500 tracking-wide">

                    FEATURED SERVICES

                  </p>

                  <span className="text-[9px] text-slate-400">Offers for you</span>

                </div> */}

                <div className="grid grid-cols-1 gap-3">

                  {featuredAds.map((ad, index) => {

                    const imageUrl = resolveAdImageUrl(ad.image || ad.imageUrl || ad.banner);

                    const title = ad.title || ad.name || ad.postText || "Featured service";

                    const description = ad.subPostText || ad.description || ad.caption || "";

                    const destination = ad.linkUrl || ad.redirectUrl || ad.ctaUrl || "";

                    const actionLabel = ad.buttonText || ad.cta || "Learn More";

                    const adKey = ad._id || ad.id || `${title}-${index}`;

                    const content = (
                      <div className="group relative isolate min-h-[190px] overflow-hidden bg-slate-950">
                        {imageUrl ? (
                          <img src={imageUrl} alt={title} loading="lazy"
                            className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={(event) => { event.currentTarget.style.display = "none"; }} />
                        ) : (
                          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-blue-950 via-slate-900 to-teal-900" />
                        )}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/10" />
                        <div className="flex min-h-[190px] flex-col items-start justify-end p-3.5">
                          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-300" /> Sponsored
                          </span>
                          <p className="line-clamp-2 text-sm font-bold leading-snug text-white drop-shadow-sm">{title}</p>
                          {description && <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-white/85">{description}</p>}
                          {destination && (
                            <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[11px] font-bold text-slate-900 shadow-lg transition-colors group-hover:bg-teal-50">
                              {actionLabel}<ExternalLink size={13} />
                            </span>
                          )}
                        </div>
                      </div>
                    );

                    return destination ? (

                      <a

                        key={adKey}

                        href={destination}

                        target="_blank"

                        rel="noopener noreferrer"

                        className="flex flex-col overflow-hidden rounded-lg bg-[#0f1b2d] text-white"

                      >

                        {content}

                      </a>

                    ) : (

                      <article

                        key={adKey}

                        className="flex flex-col overflow-hidden rounded-lg bg-[#0f1b2d] text-white"

                      >

                        {content}

                      </article>

                    );

                  })}

                </div>

              </section>

            )}



            {adsLoading && featuredAds.length === 0 && (

              <div className="mt-6 text-xs text-slate-400" role="status">

                Loading featured services…

              </div>

            )}

            {adsLoading && featuredAds.length === 0 && (

              <div className="px-3 pb-3 text-[10px] text-slate-400" role="status">

                Loading featured services…

              </div>

            )}

          </div>

        </aside>



        <div className="flex-1 flex flex-col min-w-0">

          <main

            ref={scrollRef}

            className="flex-1 overflow-y-auto px-3 sm:px-5 py-5 space-y-5 light-scrollbar"

          >

            {messages.length === 0 && (

              <div className="h-full flex items-center justify-center text-sm text-gray-400">

                Start typing to begin a new chat

              </div>

            )}

            {messages.map(renderMessage)}



            {typing && (

              <div className="flex gap-3 max-w-2xl">

                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">

                  <img src={chatbot} alt="chatbot" className="w-10 h-10" />

                </div>

                <div className="bg-blue-50 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">

                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />

                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />

                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />

                </div>

              </div>

            )}







          </main>





          <div className="border-t relative border-gray-200 px-3 sm:px-5 py-3 shrink-0">

            <div className=" flex items-center gap-2 max-w-4xl mx-auto">

              {plusOpen && (

                <div

                  ref={plusRef}

                  className="absolute bottom-full mb-2 left-0 w-72 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20"

                >

                  {quickOptions.map((opt) => (

                    <button

                      key={opt.text}

                      onClick={() => handleOptionClick(opt.text)}

                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition text-left"

                    >

                      <opt.icon size={17} className="text-gray-500 shrink-0" />

                      {opt.text}

                    </button>

                  ))}

                </div>

              )}



              <button

                onClick={() => setPlusOpen((v) => !v)}

                className="p-2.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 transition shrink-0"

              >

                {plusOpen ? <X size={18} /> : <Plus size={18} />}

              </button>



              <div className="flex-1 flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2.5">

                <Paperclip size={17} className="text-gray-400 shrink-0" />

                <input

                  value={input}

                  onChange={(e) => setInput(e.target.value)}

                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}

                  placeholder="Ask anything about Export, Import, Logistics or Trade..."

                  className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"

                />

                <Mic size={17} className="text-gray-400 shrink-0 hidden sm:block" />

                <Camera size={17} className="text-gray-400 shrink-0 hidden sm:block" />

              </div>



              <button



                onClick={() => {

                   sendMessage(input)

                   saveCurrentChat()

                }}

                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shrink-0"

              >

                <Send size={16} />

              </button>

            </div>

            <p className="text-center text-[11px] text-gray-400 mt-2">

              Chatbot can make mistake.

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}
