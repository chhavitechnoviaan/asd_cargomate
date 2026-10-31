import { useState, useEffect  } from "react";
import {
  FaXmark, FaCircleCheck, FaChevronDown, FaChevronLeft,
  FaChevronRight, FaStar, FaEllipsis, FaBolt, FaChartLine,
  FaWifi, FaCalendar, FaCircleInfo
} from "react-icons/fa6";
import API from "../../api/axios";

const ROWS_PER_PAGE = 6;

function ProfileModal({ buyer, onClose }) {
  if (!buyer) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-800">Full Profile</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><FaXmark /></button>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-teal-600 font-bold text-lg">{buyer.company[0]}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-800">{buyer.company}</p>
              {buyer.verified && <span className="text-xs bg-teal-50 text-teal-600 px-1.5 py-0.5 rounded font-medium">Verified</span>}
            </div>
            <p className="text-xs text-gray-400">{buyer.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 bg-gray-50 rounded-xl p-4">
          {[
            ["Location", buyer.location],
            ["Product", buyer.product],
            ["Trade Frequency", buyer.freq],
            ["Trade Volume", buyer.volume],
            ["Last Activity", buyer.lastActivity],
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

const freqColors = {
  "High 45": "bg-teal-100 text-teal-600",
  "High 44": "bg-teal-100 text-teal-600",
  "Medium 24": "bg-orange-100 text-orange-500",
  "Medium 20": "bg-orange-100 text-orange-500",
  "Medium 18": "bg-orange-100 text-orange-500",
  "Low 10": "bg-gray-100 text-gray-500",
};

const buyersData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  company: "KPR Mil Limited",
  subtitle: "Textile Manufacturing",
  verified: true,
  location: "🇮🇳 Surat, Gujrat India",
  product: "Cotton",
  freq: i < 2 ? "High 45" : i < 4 ? "Medium 24" : i < 6 ? "Medium 20" : "Medium 18",
  volume: ["$28.45M", "$21.78M", "$18.55M", "$15.33M", "$12.33M", "$8.44M"][i % 6],
  lastActivity: "May 28, 2025",
}));

const sellersData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  company: "Arvind Mills Ltd",
  subtitle: "Cotton Exporter",
  verified: true,
  location: "🇮🇳 Ahmedabad, Gujarat India",
  product: "Cotton",
  freq: i < 2 ? "High 45" : i < 4 ? "Medium 24" : "Medium 18",
  volume: ["$32.10M", "$24.55M", "$19.80M", "$14.22M", "$10.11M", "$6.30M"][i % 6],
  lastActivity: "May 25, 2025",
}));

function WorldMapDisplay() {
  const pins = [
    { top: "28%", left: "22%", label: "🇺🇸 USA", value: "$2.8,1.2.34k", color: "bg-blue-200" },
    { top: "20%", left: "48%", label: "🇩🇪 EUR", value: "$1.45,1.2.45k", color: "bg-teal-200" },
    { top: "32%", left: "62%", label: "🇦🇪 UAE", value: "$4.3,1.2.09", color: "bg-purple-200" },
    { top: "55%", left: "30%", label: "🇧🇷 BRA", value: "$2.46,1.4.60k", color: "bg-green-200" },
    { top: "60%", left: "72%", label: "🇦🇺 AUS", value: "$1.46k", color: "bg-yellow-200" },
  ];

  const regions = [
    { top: "25%", left: "15%", w: "w-20", h: "h-16", color: "bg-blue-200", opacity: "opacity-70", label: "North America" },
    { top: "50%", left: "20%", w: "w-16", h: "h-20", color: "bg-green-300", opacity: "opacity-80", label: "South America" },
    { top: "20%", left: "44%", w: "w-20", h: "h-12", color: "bg-teal-200", opacity: "opacity-70", label: "Europe" },
    { top: "38%", left: "48%", w: "w-12", h: "h-14", color: "bg-yellow-200", opacity: "opacity-70", label: "Africa" },
    { top: "28%", left: "60%", w: "w-24", h: "h-16", color: "bg-purple-200", opacity: "opacity-60", label: "Asia" },
    { top: "60%", left: "68%", w: "w-14", h: "h-10", color: "bg-yellow-300", opacity: "opacity-80", label: "Australia" },
  ];

  return (
    <div className="relative w-full h-48 bg-blue-50 rounded-xl overflow-hidden">
      {regions.map((r, i) => (
        <div key={i} className={`absolute ${r.color} ${r.opacity} rounded-lg ${r.w} ${r.h}`} style={{ top: r.top, left: r.left }} />
      ))}
      {pins.map((p, i) => (
        <div key={i} className="absolute flex flex-col items-start" style={{ top: p.top, left: p.left }}>
          <div className={`${p.color} rounded-lg px-1.5 py-0.5 text-xs font-semibold text-gray-700 shadow-sm whitespace-nowrap`}>
            {p.label}<br /><span className="text-xs text-gray-500 font-normal">{p.value}</span>
          </div>
          <div className="w-0.5 h-3 bg-gray-400 ml-2" />
          <div className="w-2 h-2 bg-gray-500 rounded-full ml-1.5" />
        </div>
      ))}
      <div className="absolute bottom-2 left-3">
        <p className="text-xs text-gray-500 mb-1">Export Value (USD)</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Low</span>
          <div className="w-20 h-2 rounded-full" style={{ background: "linear-gradient(to right, #e0f2fe, #0d9488)" }} />
          <span className="text-xs text-gray-400">High</span>
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, setPage }) {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3, 4, 5, "...", totalPages);
  }
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
      <p className="text-xs text-gray-400">Showing 1 to {ROWS_PER_PAGE} of 12,540 results</p>
      <div className="flex items-center gap-1 flex-wrap">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
          className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors">
          <FaChevronLeft className="text-xs" />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="w-7 h-7 flex items-center justify-center text-xs text-gray-400">...</span>
          ) : (
            <button key={p} onClick={() => setPage(p)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors ${page === p ? "bg-teal-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {p}
            </button>
          )
        )}
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
          className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors">
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

function BuyersSellerTable({ tableData }) {
  const [page, setPage] = useState(1);
  const [profile, setProfile] = useState(null);
  const [product, setProduct] = useState("Cotton");
  const [category, setCategory] = useState("All Categories");
  const [volume, setVolume] = useState("Any");

  
  const safeData = tableData || [];

const totalPages = Math.ceil(safeData.length / ROWS_PER_PAGE);
const pageItems = safeData.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  return (
    <>
      {profile && <ProfileModal buyer={profile} onClose={() => setProfile(null)} />}
      <div className="flex flex-wrap gap-3 mb-4">
        <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white transition-all"
          value={product} onChange={e => setProduct(e.target.value)}>
          {["Cotton", "Rice", "Wheat", "Spices"].map(o => <option key={o}>{o}</option>)}
        </select>
        <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white transition-all"
          value={category} onChange={e => setCategory(e.target.value)}>
          {["All Categories", "Textile", "Electronics", "Agriculture"].map(o => <option key={o}>{o}</option>)}
        </select>
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white text-sm text-gray-600">
          <span className="text-xs">May 1 - May 31, 2026</span>
          <FaCalendar className="text-gray-400 text-xs" />
        </div>
        <div className="flex flex-col  ">
          <span className="text-xs text-gray-400 mb-1 ">Trade Volume</span>
          <select className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white transition-all"
            value={volume} onChange={e => setVolume(e.target.value)}>
            {["Any", "$0-$10M", "$10M-$50M", "$50M+"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-xs font-semibold text-gray-500 px-3 py-3 rounded-l-xl w-8">ID</th>
              {["Company Name", "Location", "Product", "Trade Frequency", "Trade Volume", "Last Activity", "Actions"].map((h, i) => (
                <th key={h} className={`text-left text-xs font-semibold text-gray-500 px-3 py-3 ${i === 6 ? "rounded-r-xl" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((row, idx) => (
              <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-3 py-3 text-xs text-gray-400">{(page - 1) * ROWS_PER_PAGE + idx + 1}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex w-7 h-7 bg-red-100 rounded-lg  items-center justify-center flex-shrink-0">
                      <span className="text-red-500 text-xs font-bold">K</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs font-bold text-gray-800 whitespace-nowrap">{row.company}</p>
                        {row.verified && (
                          <span className="text-xs bg-teal-50 text-teal-600 px-1.5 py-0.5 pr-1 rounded font-medium flex items-center gap-0.5 ">
                            <FaCircleCheck className="text-xs" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{row.subtitle}</p>
                    </div>
                  </div>
                </td>
                <td className="text-xs text-gray-600 px-3 py-3">{row.location}</td>
                <td className="text-xs text-gray-600 px-3 py-3">{row.product}</td>
                <td className="px-3 py-3">
                  <span className={`text-xs px-[0.25rem] py-[0.15rem] rounded-lg font-medium whitespace-nowrap ${freqColors[row.freq] || "bg-gray-100 text-gray-500"}`}>{row.freq}</span>
                </td>
                <td className="text-xs font-semibold text-gray-800 px-3 py-3">{row.volume}</td>
                <td className="text-xs text-gray-600 px-3 py-3 whitespace-nowrap">{row.lastActivity}</td>
                <td className="px-3 py-3">
                  <button onClick={() => setProfile(row)}
                    className="text-xs border border-teal-500 text-teal-500 hover:bg-teal-50 px-2.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap">
                    View Full Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={(p) => { setPage(p); }} />
    </>
  );
}

export default function TradeIntelligence() {
  const [activeTab, setActiveTab] = useState("Buyers");
  const [mapData, setMapData] = useState([]);
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    API.get(`/trade-intel/companies?type=${activeTab === "Buyers" ? "buyer" : "seller"}`)
      .then(res => setTableData(res.data.data))
      .catch(err => console.log(err));
  }, [activeTab]);


  const getInsightStyle = (type) => {
    if (type === "Top Growing Market") {
      return {
        color: "bg-blue-50",
        iconBg: "bg-blue-100",
        icon: <FaBolt className="text-blue-500" />
      };
    }
    if (type === "High Demand Product") {
      return {
        color: "bg-orange-50",
        iconBg: "bg-orange-100",
        icon: <FaChartLine className="text-orange-500" />
      };
    }
    return {
      color: "bg-teal-50",
      iconBg: "bg-teal-100",
      icon: <FaWifi className="text-teal-500" />
    };
  };

  useEffect(() => {
    API.get("/trade-intel/map").then(res => {
      setMapData(res.data.data);
    });
  }, []);

  const [insights, setInsights] = useState([]);

useEffect(() => {
  API.get("/trade-intel/insights").then(res => {
    setInsights(res.data.data);
  });
}, []);

  

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Trade Intelligence Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Analyze global trade data, buyers, and market trends</p>
        </div>

        {/* TOP SECTION - Map + AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold text-gray-800">Global Trade Map</h2>
              <FaCircleInfo className="text-gray-400 text-xs" />
            </div>
             <div>
              <img src="https://res.cloudinary.com/dhuabv2it/image/upload/v1778229817/Map_hhooem.webp" alt="map"/>
             </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-800">AI Insights</h2>
              <button className="text-xs text-teal-500 hover:text-teal-600 font-medium transition-colors">View all</button>
            </div>
            <div className="flex flex-col gap-3">
            {insights.map(ins => {
  const style = getInsightStyle(ins.tag);

  return (
    <div key={ins._id} className={`${style.color} rounded-xl p-3 flex gap-3`}>
      <div className={`w-10 h-10 ${style.iconBg} rounded-xl flex items-center justify-center`}>
        {style.icon}
      </div>
      <div>
        <p className="text-xs text-gray-400">{ins.tag}</p>
        <p className="text-sm font-bold">{ins.title}</p>
        <p className="text-xs text-gray-500">{ins.desc}</p>
      </div>
    </div>
  );
})}
            </div>
          </div>
        </div>

        {/* TABS + TABLE */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit mb-5">
            {["Buyers", "Sellers"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? "bg-teal-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                {tab}
              </button>
            ))}
          </div>

          <BuyersSellerTable tableData={tableData} />
        </div>
      </div>
    </div>
  );
}