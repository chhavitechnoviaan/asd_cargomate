import {useEffect,useState} from "react";
import {reportRequest} from "../../../lib/accountApi";

import {
  FiX,
  FiTruck,
  FiCalendar,
  FiChevronDown,
  FiInfo,
  FiWifi,
  FiMapPin,
  FiBox,
  FiCheck,
  FiDownload,
  FiAlertTriangle,
  FiEdit3,
  FiLink2,
  FiArrowLeft,
  FiSave,
  FiPlus,
  FiCopy,
  FiStar,
  FiTrendingUp,
  FiDatabase,
  FiAlertCircle,
  FiAnchor,
  FiCpu,
  FiHash,
  FiGift,
  FiMap,
  FiFile,
  FiPackage,
  FiRadio,
  FiFileText,
  FiUsers,
  FiBookmark,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
  FiShare2,
  FiSend,
  FiClock,
  FiDollarSign,
  FiAward,
  FiShoppingCart,
  FiFolder,
  FiPercent,
  FiShield,
  FiZap,
  FiEye,
  FiCheckCircle,
  FiExternalLink,
  FiUploadCloud,
  FiPhone,
  FiSearch,
  FiMail,
  FiSun,
  FiUser,
  FiGlobe,
  FiMessageSquare,
} from "react-icons/fi";
import { FaShip, FaAnchor } from "react-icons/fa";
import PlanSummary from "../../components/userComponent/PlanSummary";
import DashboardAdPlacement from "../../components/DashboardAdPlacement";

export default function Saved({ onClose, setSavePlan }) {
 const [reports,setReports]=useState([]);const [loading,setLoading]=useState(true);useEffect(()=>{reportRequest("?limit=100").then(d=>setReports(Array.isArray(d)?d:d?.reports||d?.data||[])).catch(console.error).finally(()=>setLoading(false))},[]);

  return (
    <div>
        
        <section className="bg-white border border-slate-200 rounded-xl p-5 mb-5"><h2 className="font-semibold text-lg mb-3">Saved Reports</h2>{loading?<p>Loading reports…</p>:reports.length===0?<p className="text-slate-500">No saved reports yet.</p>:<div className="space-y-3">{reports.map(r=><details key={r._id} className="border rounded-lg p-3"><summary className="cursor-pointer font-medium">{r.reportName} <span className="text-xs text-slate-400">{r.createdAt&&new Date(r.createdAt).toLocaleDateString()}</span></summary><p className="text-sm my-2">{r.description}</p><pre className="overflow-auto text-xs bg-slate-50 p-3 rounded">{JSON.stringify(r.reportData,null,2)}</pre></details>)}</div>}</section>
        <PlanSummary  onClose={() => setSavePlan?.(false)}/>
        <div className="mt-6"><DashboardAdPlacement location="User Dashboard - Saved" /></div>
    
    </div>


);
}