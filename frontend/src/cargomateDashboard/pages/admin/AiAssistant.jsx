import { useState, useRef, useEffect } from "react";
import {
  FaRobot, FaEllipsisVertical, FaMicrophone, FaPaperPlane,
  FaChevronDown, FaChevronRight, FaArrowUp, FaXmark,
  FaCircleCheck, FaGlobe, FaCalendar
} from "react-icons/fa6";

const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange(!checked)}
    className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${checked ? "bg-teal-500" : "bg-gray-300"}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
  </div>
);

const buyers = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  company: "KPR Mil Limited",
  subtitle: "Textile Manufacturing",
  verified: true,
  location: "🇮🇳 Surat, Gujrat India",
  product: "Cotton",
  volume: "$28.34M",
  orders: 152,
  lastTrade: "May 28, 2025",
}));

const countryData = [
  { name: "Canada", color: "bg-blue-400", value: "$28.6M", pct: "22.4%" },
  { name: "Brazil", color: "bg-green-400", value: "$19.4M", pct: "15.4%" },
  { name: "India", color: "bg-purple-400", value: "$15.4M", pct: "12.4%" },
  { name: "Australia", color: "bg-yellow-400", value: "$12.4M", pct: "9.4%" },
  { name: "Germany", color: "bg-orange-400", value: "$8.4M", pct: "5.4%" },
];

const trendData = [
  { month: "Dec", val: 2.5 }, { month: "Jan", val: 4 }, { month: "Feb", val: 3 },
  { month: "Mar", val: 7 }, { month: "Apr", val: 5.5 }, { month: "May", val: 4 },
  { month: "June", val: 6 }, { month: "July", val: 5 }, { month: "Aug", val: 7.5 },
  { month: "Sep", val: 6 },
];

const quickActions = ["Find buyers in India", "Show export data for cotton", "Top shipping routes this month", "Best ports for UAE exports"];

const messages = [
  { id: 1, type: "user", text: "Find a cotton buyers", time: "10:30 AM" },
  { id: 2, type: "ai", text: "Here are the top cotton buyers in india based on latest trade data", sub: "Showing 1-5 of 128 buyers", time: "10:31 AM" },
  { id: 3, type: "user", text: "Find a cotton buyers", time: "10:31 AM" },
  { id: 4, type: "ai", text: "Here are the top cotton buyers in india based on latest trade data", sub: "Showing 1-5 of 128 buyers", time: "10:31 AM" },
];

function ExportTrendChart() {
  const max = 10;
  const points = trendData.map((d, i) => ({ x: i, y: d.val, month: d.month }));
  const w = 700, h = 200, padL = 40, padB = 30, padT = 10, padR = 10;
  const chartW = w - padL - padR;
  const chartH = h - padB - padT;
  const xScale = (i) => padL + (i / (points.length - 1)) * chartW;
  const yScale = (v) => padT + chartH - (v / max) * chartH;
  const yLines = [10, 7, 4, 1];

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.x)} ${yScale(p.y)}`).join(" ");
  const areaD = `${pathD} L ${xScale(points.length - 1)} ${yScale(0)} L ${xScale(0)} ${yScale(0)} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-40 sm:h-48" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {yLines.map(v => (
        <g key={v}>
          <line x1={padL} x2={w - padR} y1={yScale(v)} y2={yScale(v)} stroke="#e5e7eb" strokeWidth="1" />
          <text x={padL - 6} y={yScale(v) + 4} textAnchor="end" fontSize="10" fill="#9ca3af">₹{v}cr</text>
        </g>
      ))}
      <path d={areaD} fill="url(#areaGrad)" />
      <path d={pathD} fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={xScale(p.x)} cy={yScale(p.y)} r="3.5" fill="#14b8a6" />
      ))}
      {points.map((p, i) => (
        <text key={i} x={xScale(p.x)} y={h - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">{p.month}</text>
      ))}
    </svg>
  );
}

function ProfileModal({ buyer, onClose }) {
  if (!buyer) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Buyer Profile</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><FaXmark /></button>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-teal-600 font-bold text-lg">{buyer.company[0]}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-800">{buyer.company}</p>
              {buyer.verified && <FaCircleCheck className="text-teal-500 text-xs" />}
            </div>
            <p className="text-xs text-gray-400">{buyer.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-gray-50 rounded-xl p-4">
          {[
            ["Location", buyer.location],
            ["Product", buyer.product],
            ["Trade Volume", buyer.volume],
            ["Orders", buyer.orders],
            ["Last Trade", buyer.lastTrade],
          ].map(([label, val]) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-xs font-semibold text-gray-700">{val}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-2.5 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-xl font-medium transition-colors">Close</button>
      </div>
    </div>
  );
}

export default function AiAssistant() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(messages);
  const [showMore, setShowMore] = useState(false);
  const [profileBuyer, setProfileBuyer] = useState(null);
  const [country, setCountry] = useState("India");
  const [product, setProduct] = useState("Cotton");
  const [period, setPeriod] = useState("May 1 - May 31,2026");
  const [trendPeriod, setTrendPeriod] = useState("Monthly");
  const chatRef = useRef(null);

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [chat]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), type: "user", text: text.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    const aiMsg = { id: Date.now() + 1, type: "ai", text: "Here are the top cotton buyers in india based on latest trade data", sub: "Showing 1-5 of 128 buyers", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setChat(prev => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  const displayedBuyers = showMore ? buyers : buyers.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {profileBuyer && <ProfileModal buyer={profileBuyer} onClose={() => setProfileBuyer(null)} />}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">

        {/* LEFT - AI CHAT */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full min-h-[500px] lg:h-[calc(100vh-3rem)] ">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FaRobot className="text-teal-500 text-base" />
                <div>
                  <p className="text-xs font-bold text-gray-800">CargoMate AI Assistant</p>
                  <p className="text-xs text-gray-400">Ask anything about shipment, buyers, and trade data</p>
                </div>
              </div>
              <FaEllipsisVertical className="text-gray-400 text-sm cursor-pointer" />
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {chat.map(m => (
                <div key={m.id} className={`flex flex-col ${m.type === "user" ? "items-end" : "items-start"} gap-1`}>
                  <p className="text-xs text-gray-400">{m.time}</p>
                  {m.type === "user" ? (
                    <div className="bg-teal-500 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[85%]">{m.text}</div>
                  ) : (
                    <div className="flex items-start gap-2 max-w-[95%]">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaRobot className="text-teal-500 text-xs" />
                      </div>
                      <div className="bg-gray-100 text-gray-700 text-xs px-3 py-2 rounded-2xl rounded-tl-sm">
                        <p>{m.text}</p>
                        {m.sub && <p className="text-gray-400 text-xs mt-0.5">{m.sub}</p>}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {quickActions.map(a => (
                  <button key={a} onClick={() => sendMessage(a)}
                    className="text-xs bg-gray-100 hover:bg-teal-50 hover:text-teal-600 text-gray-500 px-2 py-1 rounded-lg transition-colors text-left">
                    {a}
                  </button>
                ))}
              </div>
              <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2 gap-2 focus-within:border-teal-500 transition-all">
                <input className="flex-1 text-xs outline-none bg-transparent" placeholder="Ask something..."
                  value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage(input)} />
                <FaMicrophone className="text-gray-400 text-sm cursor-pointer hover:text-teal-500 transition-colors" />
                <button onClick={() => sendMessage(input)} className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors">
                  <FaPaperPlane className="text-white text-xs" />
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center mt-2">AI can make mistakes. Please verify important information</p>
            </div>
          </div>
        </div>

        {/* RIGHT - MAIN CONTENT */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">

          {/* FILTERS */}
          <div className="flex flex-wrap items-center gap-2">
            <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={country} onChange={e => setCountry(e.target.value)}>
              {["India", "United States", "Germany", "China", "UAE"].map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={product} onChange={e => setProduct(e.target.value)}>
              {["Cotton", "Rice", "Wheat", "Spices", "Electronics"].map(p => <option key={p}>{p}</option>)}
            </select>
            <div className="flex items-center gap-1.5 border border-gray-200 rounded-xl px-3 py-2 bg-white text-sm text-gray-600">
              <FaCalendar className="text-gray-400 text-xs" />
              <span className="text-xs">{period}</span>
              <FaChevronDown className="text-gray-400 text-xs" />
            </div>
          </div>

          {/* HEADING */}
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">Buyers in {country} for {product}</h1>
            <p className="text-xs text-gray-400">1-5 of 128 buyers</p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Total Export Value", value: "₹5cr", change: "18.6% vs Apr 1 - Apr 30", up: true },
              { label: "Total Buyers", value: "128", change: "12.4% vs Apr 1 - Apr 30", up: true },
              { label: "Growth %", value: "18.6%", change: "v9 previous period", up: true },
              { label: "Avg Order Value", value: "₹500k", change: "8.1% vs Apr 1 - Apr 30", up: true },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4">
                <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-teal-500 mb-1">{s.value}</p>
                <p className="flex items-center gap-1 text-xs text-teal-500"><FaArrowUp className="text-xs" />{s.change}</p>
              </div>
            ))}
          </div>

          {/* EXPORT VALUE TREND CHART */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-800">Export Value Trend</h2>
              <select className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-teal-500 bg-white transition-all"
                value={trendPeriod} onChange={e => setTrendPeriod(e.target.value)}>
                <option>Monthly</option><option>Quarterly</option><option>Yearly</option>
              </select>
            </div>
            <ExportTrendChart />
          </div>

          {/* COUNTRY BREAKDOWN */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-6">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Export Value Trend</h2>
            <div className="flex flex-col sm:flex-row gap-10 justify-evenly items-start ">
                  <div className="w-96">
                    <img src="https://res.cloudinary.com/dhuabv2it/image/upload/v1778229817/Map_hhooem.webp" alt="map"/>
                </div>
                <div className="w-full sm:w-48 flex flex-col gap-2">
                {countryData.map(c => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${c.color}`} />
                      <span className="text-xs text-gray-600">{c.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-gray-800">{c.value}</span>
                      <span className="text-xs text-gray-400 ml-1">({c.pct})</span>
                    </div>
                  </div>
                ))}
                <button className="flex items-center gap-1 text-xs text-teal-500 hover:text-teal-600 font-medium mt-1 transition-colors">
                  View All Countries <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          </div>

          {/* BUYERS TABLE */}
        

        </div>
        
      </div>

        {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50">
                    {["Company Name", "Location", "Product", "Trade Volume (USD)", "Orders", "Last Trade", "Actions"].map((h, i) => (
                      <th key={h} className={`text-left text-xs font-semibold text-gray-500 px-4 py-3 ${i === 0 ? "rounded-l-xl" : ""} ${i === 6 ? "rounded-r-xl" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayedBuyers.map(b => (
                    <tr key={b.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-gray-800 whitespace-nowrap">{b.company}</p>
                              {b.verified && <span className="text-xs bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5"><FaCircleCheck className="text-xs" /> Verified</span>}
                            </div>
                            <p className="text-xs text-gray-400">{b.subtitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-xs text-gray-600 px-4 py-3">{b.location}</td>
                      <td className="text-xs text-gray-600 px-4 py-3">{b.product}</td>
                      <td className="text-xs font-semibold text-gray-800 px-4 py-3">{b.volume}</td>
                      <td className="text-xs text-gray-600 px-4 py-3">{b.orders}</td>
                      <td className="text-xs text-gray-600 px-4 py-3 whitespace-nowrap">{b.lastTrade}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => setProfileBuyer(b)}
                          className="text-xs border border-teal-500 text-teal-500 hover:bg-teal-50 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap">
                          View Full Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center py-4 border-t border-gray-100">
              <button onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 text-sm text-teal-500 hover:text-teal-600 font-medium transition-colors">
                {showMore ? "Show Less" : "Show More Buyers"}
                <FaChevronDown className={`text-xs transition-transform ${showMore ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div> */}
    </div>
  );
}