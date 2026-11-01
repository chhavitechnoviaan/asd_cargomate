import SubscriptionManager from "../../components/SubscriptionManager";
import {AccountBadge} from "../../../components/AccountProfile";
import DashboardAdPlacement from "../../components/DashboardAdPlacement";
import { useState,useEffect } from "react";
import { GiCutDiamond } from "react-icons/gi";
import {
  getDashboardMetrics,
  getOperationalInsights,
  getGlobalTradeOverview,
  getTradeValueTrend,
  getTopTradingPartners,
  getTopImportedProducts,
  getTopExportDestinations,
  getRecentShipments
} from '../../api/B2BDashboardApi';
import { getDashboard } from "../../api/ShipmentApi";
import { getAccountSummary } from "../../api/SettingsApi";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMail,
  FiSun,
  FiMoon,
  FiPlus, FiHash,FiGift,FiMap,FiRadio,FiBookmark,FiClipboard,FiBarChart2,
  FiUsers,
  FiShield,
  FiCreditCard,
  FiDatabase,
  FiFileText,
  FiGlobe,
  FiPackage,
  FiTruck,
  FiCpu,
  FiPieChart,
  FiLink,
  FiMonitor,
  FiHelpCircle,
  FiGrid,
  FiSettings,
  FiChevronRight,
  FiUserPlus,
  FiUserCheck,
  FiPlusCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiHome,
  FiCamera,
  FiUpload,
  FiLock,
  FiSend,
} from "react-icons/fi";
import {
  FaTrash,
  FaAngleDown ,
  FaCheck,
  FaBox,
  FaBell,
  FaChevronLeft,
  FaFileLines,
  FaListCheck,
  FaGripVertical,
  FaPlus,
  FaSliders,
  FaEye,
  FaClock,
  FaUser,
  FaFloppyDisk,
  FaPaperPlane,
  FaUsers,
  FaIndianRupeeSign,
  FaRotate,
  FaArrowUp,
  FaStar,
  FaChevronRight,
  FaRobot,
  FaAngleUp,
  FaCalculator
} from "react-icons/fa6";
import { TbContract } from "react-icons/tb";
import {
  FiEdit,
  FiTrash2,
  FiCheck,
  FiDollarSign,
  FiRefreshCw,
  FiUser,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  MdMenu,
  MdLocalShipping,
  MdDescription,
  MdPsychology,
  MdPayments,
  MdDoubleArrow,
  MdBolt,
  MdAdd,
  MdForum,
  MdCloudUpload,
  MdMyLocation,
  MdCalculate,
  MdSavings,
  MdHelp,
  MdDownload,
  MdTrendingFlat,
  MdCheckCircle,
  MdStorage,
  MdApi,
  MdSync,
  MdDashboard,
  MdSettings,
  MdArrowUpward,
  MdQrCode2,
  MdCheckroom,
  MdPerson,
} from "react-icons/md";
import {
  Package,
  IndianRupee,
  Users,
  MessageSquare,
  TrendingUp,
  Clock3,Lightbulb ,ChartNoAxesCombined  , SquareChartGantt ,Binoculars 
} from "lucide-react";
import { TbChartBar } from "react-icons/tb";
import API from "../../api/axios";
import { LuChartNoAxesCombined, LuLightbulb ,  } from "react-icons/lu";
  import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";

import Chatbot from "../../components/Chatbot"
import { RxCross1 } from "react-icons/rx";
import { FaAngleRight, FaCalendarAlt, FaTimes  } from "react-icons/fa";
import up from "../../assets/icon/up.png"

import logo from "../../assets/Images/logo.png";

import { BsCalendarCheck, BsPersonPlus, BsGraphUp } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiWhatsappLine } from "react-icons/ri";
import { FiX } from "react-icons/fi";

import map from "../../assets/Images/logo.png";

import home from "../../assets/icon/home.png";
import user from "../../assets/icon/user.png";
import exportInt from "../../assets/icon/orders.png";
import supplier from "../../assets/icon/suppliers.png";

import buyer from "../../assets/icon/Buyers.png";

import analytical from "../../assets/icon/analytical.png";

import document from "../../assets/icon/document.png";

import payment from "../../assets/icon/payment.png";
import ai from "../../assets/icon/ai.png";

import support from "../../assets/icon/supportCenter.png";
import setting from "../../assets/icon/setting.png";

import report from "../../assets/icon/report.png";
import insight from "../../assets/icon/insight.png";

import risk from "../../assets/icon/risk.png";


import globe from "../../assets/icon/globe.png";
import compass from "../../assets/icon/compass.png";

import discovery from "../../assets/icon/discovery.png";

import settings from "../../assets/icon/settings.png";
import TradeIntelligenceImport from "./TradeIntelligenceImport";
import ExportIntelligence from "./ExportIntelligence"
import ShipmentDatabase from "./ShipmentDatabase";

import FreightCalculator from "../userDashboard/FreightCalculator";
import AiCargoMateAssistant from "../userDashboard/AiCargoMateAssistant";
import HSCodeLookup from "../userDashboard/HsCodeLookUp";
import IncentiveChecker from "../userDashboard/IncentiveChecker";
import alert from '../../assets/icon/alert.png'

import graph from '../../assets/icon/graph.png'
import file from '../../assets/icon/file.png'
import android from '../../assets/icon/android.png'

import HSCodeIntelligence from "./HsCodeIntelligence";
import RiskAnalysis from "./RiskAnalysis";
import AiInsight from "./AiInsight";
import Shipment from "./Shipment";
import Documents from "./Documents";
import Invoices from "./Invoice";
import Reports from "./Reports";
import AlertNotification from "./AlertNotification";
import Settings from "./Settings";
import HelpSupportDashboard from "../userDashboard/Help&Support";
import NoticeBanner from "../../components/NoticeBanner";



import SelectRangeModal from "../../components/b2bComponent/SelectDateRange";
import MarketIntelligencePopup from "../../components/b2bComponent/MarketIntelligence";

import ShipmentForm from "../../components/ShipmentForm"
import MessagesModal from "../../components/Messages";
import NotificationsModal from "../../components/Notifications";
import ShipmentPlanning from "../userDashboard/ShipmentPlanning";

const iconMap = {
  shipment: Package,
  trade: IndianRupee,
  partner: Users,
  inquiry: MessageSquare,
  avgVal: TrendingUp,
  leadTime: Clock3,
};

const trendingProducts = [
  { name: "Electronics", pct: "38.4%" },
  { name: "Machinery", pct: "29.1%" },
  { name: "Pharmaceuticals", pct: "18.2%" },
  { name: "Chemicals", pct: "15.33%" },
  { name: "Textiles", pct: "12.4" },
];

const fastCountries = [
  { name: "India", pct: "28.4%" },
  { name: "Vietnam", pct: "32.0%" },
  { name: "Mexico", pct: "18.3" },
  { name: "Indonesia", pct: "12.53" },
  { name: "UAE", pct: "12.4" },
];

const suppliers = [
  {
    name: "Shenzhan Tech Ltd.",
    reliability: "90%",
    quality: "90%",
    ontime: "90%",
    risk: "Low",
  },
  {
    name: "Global Machinery Co.",
    reliability: "90%",
    quality: "90%",
    ontime: "90%",
    risk: "Low",
  },
  {
    name: "Global Machinery Co.",
    reliability: "90%",
    quality: "90%",
    ontime: "90%",
    risk: "Medium",
  },
  {
    name: "Global Machinery Co.",
    reliability: "90%",
    quality: "90%",
    ontime: "90%",
    risk: "Medium",
  },
];

const buyers = [
  {
    name: "Amazon Retail",
    order: 256,
    ontime: "90%",
    payment: "98/100",
    growth: "28.4%",
  },
  {
    name: "Walmart Inc",
    order: 189,
    ontime: "90%",
    payment: "95/100",
    growth: "28.4%",
  },
  {
    name: "Best Buy Co.",
    order: 142,
    ontime: "90%",
    payment: "92/100",
    growth: "28.4%",
  },
  {
    name: "Costco Wholesale",
    order: 76,
    ontime: "90%",
    payment: "90/100",
    growth: "28.4%",
  },
];


const sidebarSections = [
  {
    title: "Dashboard",
    items: [],
  },
  {
    title: "Intelligence",
    items: [
       {
        icon: FaRobot,
        label: "AI Chatbot",
        badgeColor: "bg-teal-500",
      },
      {
        icon: FiCpu,
        label: "Import Intelligence",
        // badge: "Core",
        badgeColor: "bg-teal-500",
      },
      { icon: FiHash, label: "Export Intelligence" },
      { icon: TbChartBar , label: "HS code Intelligence" },
      { icon: FiMap, label: "Shipment Database" },

      { icon: FiHash, label: "HS Code Lookup" },
      { icon: FiGift, label: "Incentive Checker" },
      { icon: FiTruck, label: "Freight Calculator" },
      { icon: FiMap, label: "Shipment Planning" },
      
      { icon: FiTruck, label: "Risk Analysis" },
      { icon: FaRobot , label: "Ai Insight" },
    ],
  },
  {
    title: "Manage",
    items: [
      { icon: FiPackage, label: "Shipments" },
      { icon: FiFileText, label: "Documents" },
      { icon: FiFileText, label: "Invoices" },
    
    ],
  },
  {
    title: "Reports & Tools",
    items: [
      {
        icon: FiBookmark,
        label: "Reports",
        
        badgeColor: "bg-[#2B7FFF]",
      },
       
         {
        icon: FiBell,
        label: "Alert Notifications",
        badgeColor: "bg-red-500",
      },
      
    ],
  },
  {
    title: "System",
    items: [
      {
        icon: FiHelpCircle,
        label: "Help & Support",
      },
      {
        icon: FiCreditCard,
        label: "Settings",
        badge: "",
        badgeColor: "bg-[#00BBA7]",
      },
    ],
  },
];


const statCards = [
  { label: "Global Trade Volume", value: "12,450", change: "28.4%" },
  { label: "Active Containers", value: "24,875", change: "28.4%" },
  { label: "Revenue (YTD)", value: "4,320", change: "28.4%" },
  { label: "Trade Growth", value: "$ 2.48B", change: "28.4%" },
  { label: "AI Market Forecast", value: "23", change: "28.4%" },
  { label: "Supplier Network Score", value: "$ 1.26M", change: "28.4%" },
];

const globalTrade = [
  {
    name: "Live Shipment",
    color: "text-red-600",
    no: "1246",
  },
  {
    name: "In Transit",
    color: "text-green-500",
    no: "892",
  },
  {
    name: "Port",
    color: "text-black",
    no: "184",
  },
  {
    name: "Delivered",
    color: "text-black",
    no: "171",
  },
];

export default function B2BDashboard({profileMode=false}) {
  const [openTrade, setOpenTrade] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(profileMode ? "Settings" : "Dashboard");
  const [activeSubTab, setActiveSubTab] = useState('Import Intelligence');
  const [openMenu, setOpenMenu] = useState("Import Intelligence"); // null
  const [shipment, setShipment] = useState("")
  const [messages, setMessage] = useState(false)
  const [notifications, setNotifications] = useState(false)

const [accountSummary, setAccountSummary] = useState({});
  const [chatInput, setChatInput] = useState("");
  const riskColor = {
    Low: "bg-teal-100 text-teal-600",
    Medium: "bg-orange-100 text-orange-500",
    High: "bg-red-100 text-red-500",
  };

  useEffect(() => {
  const fetchAccountSummary = async () => {
    try {
      const res = await getAccountSummary();

      console.log("Logged in user:", res.data);

      setAccountSummary(res.data.data || {});
    } catch (error) {
      console.error("Failed to fetch account summary:", error);
    }
  };

  fetchAccountSummary();
}, []);

  const b2bAdLocationByTab = {
    "Dashboard": "B2B Dashboard - Dashboard",
    "AI Chatbot": "B2B Dashboard - AI Chatbot",
    "Import Intelligence": "B2B Dashboard - Import Intelligence",
    "Export Intelligence": "B2B Dashboard - Export Intelligence",
    "HS code Intelligence": "B2B Dashboard - HS code Intelligence",
    "Shipment Database": "B2B Dashboard - Shipment Database",
    "Risk Analysis": "B2B Dashboard - Risk Analysis",
    "Ai Insight": "B2B Dashboard - Ai Insight",
    "Shipments": "B2B Dashboard - Shipments",
    "Documents": "B2B Dashboard - Documents",
    "Invoices": "B2B Dashboard - Invoices",
    "Reports": "B2B Dashboard - Reports",
    "Alert Notifications": "B2B Dashboard - Alert Notifications",
    "Settings": "B2B Dashboard - Settings",
  };
  const activeAdLocation = b2bAdLocationByTab[activeTab];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden  ">
      {/* Overlay for mobile */}

      {sidebarOpen && (
             <div
               className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
               onClick={() => setSidebarOpen(false)}
             />
           )}

           <header className="fixed top-0 w-full z-30 pr-3 bg-white border-b border-gray-200     py-0 flex items-center gap-3  ">
             <button
               className="lg:hidden p-1.5 pl-4 rounded-md hover:bg-gray-100 text-gray-600"
               onClick={() => setSidebarOpen(!sidebarOpen)}
             >
               <MdMenu size={18} />
             </button>
     
             <div className="lg:flex  items-center sm:w-60 hidden  justify-center gap-2 px-4 py-2   ">
               <img src={logo} className="h-10" onClick={() => navigate("/")} />
             </div>
     
             <NoticeBanner />
     
             <div className="flex items-center gap-1.5 ml-auto">
               <button onClick={() => setNotifications(true)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative">
                 <FiBell size={16} />
                 <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
               </button>
               <button onClick={() => setMessage(true)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
                 <FiMail size={16} />
               </button>
             
               <AccountBadge />
             </div>
           </header>
     
           <aside
             className={`
               fixed lg:sticky top-14 bottom-0 lg:top-16   left-0  z-20 w-60  
                bg-white text-white flex flex-col sm:h-[calc(104vh-5rem)]  h-[calc(105vh-5rem)]
               transform transition-transform duration-300 ease-in-out
               ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
               lg:translate-x-0 flex-shrink-0
             `}
           >
             <nav className="flex-1 overflow-y-auto py-3  bg-gray-900 pr-2">
               {sidebarSections.map((section) => (
                 <div key={section.title} className="  ">
                   <p  onClick={() => {
                       if (section.items.length === 0) {
                         setActiveTab(section.title);
                       }
                     }}
                     className={`px-4 py-2 text-[0.7rem] font-normal cursor-pointer uppercase tracking-widest
                         ${section.items.length === 0 && activeTab === "Dashboard" ? " bg-teal-500 rounded-r-lg text-white" : "text-white hover:bg-teal-500 rounded-r-lg hover:text-white"}
                       `}
                   >
                     {section.title}
                   </p>
                   {section.items.map(({ icon: Icon, label, badge, badgeColor }) => (
                     <button
                       key={label}
                       className={`w-full   flex items-center gap-2  rounded-r-lg text-xs text-left transition-colors
                         ${
                           activeTab === label
                             ? "bg-teal-500 text-white rounded-r-lg "
                             : "text-[#8aa0bc] hover:bg-teal-500 hover:text-white rounded-r-lg"
                         }`}
                           onClick={() => {
                             setActiveTab(label);
                             setSidebarOpen(false);
                           }}
                     >
                       <div className=" flex gap-3 px-4 py-2">
                         <Icon className="text-base  flex-shrink-0" />
                         <span
                         
                           className="flex-1 font-normal text-xs  truncate  "
                         >
                           {label}
                         </span>
                         {badge && (
                           <span
                             className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded-full font-normal`}
                           >
                             {badge}
                           </span>
                         )}
                       </div>
                     </button>
                   ))}
                 </div>
               ))}
               <div className="bg-[##152A4E] rounded-xl p-4 text-white flex flex-col">
              
     
                 {/* <div className="flex-1 flex items-center justify-center rounded-lg bg-[#15253d] min-h-[100px]">
                   <img
                     src={"/ai-query-placeholder.png"}
                     alt="AI Queries"
                     className=" object-contain"
                   />
                 </div> */}
     
                 <div className="text-center mt-4 bg-[#0B48B2] rounded-lg p-3">
                   <GiCutDiamond className="text-2xl mx-auto mb-2" />
                   <p className="text-sm font-bold"> Enterprise plan </p>
                   <p className="text-xs text-slate-300 mt-1">
                    Valid till 24 may 26
                   </p>

                     {/* <button
                   onClick={() => setActiveTab("UpgradePlan")}
                   className="mt-4 bg-white text-[#073D89] text-xs px-5 font-semibold py-2 rounded-lg"
                 >
                   View plan details
                 </button> */}
                 </div>
     
               
               </div>
             </nav>
           </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden  ">  
        <main className="flex-1 overflow-y-auto bg-gray-50 p-3  ">
            {activeTab === "AI Chatbot" && <Chatbot />}
{activeTab === "UpgradePlan" && <SubscriptionManager mode="upgrade"/>}
{activeTab === "Subscription" && <SubscriptionManager mode="subscription" onChangePlan={()=>setActiveTab("UpgradePlan")}/> }
          {activeTab === "Dashboard" && (
              <Dashboard setMainTab={setActiveTab} />
          )}

          {activeTab === "Import Intelligence" &&  (
           <TradeIntelligenceImport   setMainTab={setActiveTab} />
          )}

          {activeTab === "Export Intelligence" &&  (
           <ExportIntelligence setMainTab={setActiveTab}  />
          )}
          {activeTab === "HS code Intelligence" &&  (
           <HSCodeIntelligence   />
          )}

         {activeTab === "Shipment Database" && (
           <ShipmentDatabase   />
          )}

        {/* {activeTab === "AI CargoMate Assistant" && <AiCargoMateAssistant />} */}
        {activeTab === "HS Code Lookup" && <HSCodeLookup />}
        {activeTab === "Incentive Checker" && <IncentiveChecker />}
        {activeTab === "Freight Calculator" && <FreightCalculator />}
        {activeTab === "Shipment Planning" && <ShipmentPlanning />}

             {activeTab === "Risk Analysis" && (
              <RiskAnalysis />
            )}

             {activeTab === "Ai Insight" && (
              <AiInsight />
            )}

             {activeTab === "Shipments" && (
              <Shipment activeTab={activeTab}  setActiveTab={setActiveTab} currectTab={"Shipments"}/>
            )}

             {activeTab === "Documents" && (
              <Documents />
            )}

              {activeTab === "Invoices" && (
              <Invoices />
            )}  


            
              {activeTab === "Reports" && (
              <Reports />
            )}  
            
              {activeTab === "Alert Notifications" && (
              <AlertNotification />
            )}  
            
              {activeTab === "Help & Support" && (
              <HelpSupportDashboard role="b2b" />
            )}

              {activeTab === "Settings" && (
              <Settings initialTab={profileMode ? "General" : "General"} showAccountProfile={profileMode} />
            )}   


        </main>   
      </div>

       {messages && (<MessagesModal onClose={() => setMessage(false)} />)}
        {notifications && (<NotificationsModal onClose={() => setNotifications(false)} />)}
      {/* <SelectRangeModal /> */}
      {/* <MarketIntelligencePopup /> */}
    </div>
  );
}

const DynamicIcon = ({ type, color, size = "4" }) => {
    const s = `w-${size} h-${size}`;
    switch (type) {
        case 'shipment': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 10h-4V7l-3-3H9L6 7v3H2c0 1.7.9 3.5 2.7 4.8L3 21h18l-1.7-6.2zM9 7h6v3H9V7z" /></svg>;
        case 'trade': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M6 5h12M6 9h12M6 5c6 0 8 4 0 4M6 9c7 0 9 7 11 11M6 13h6" /></svg>;
        case 'partner': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
        case 'inquiry': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
        case 'avgVal': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" /></svg>;
        case 'leadTime': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
        case 'ontime': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" /></svg>;
        case 'accuracy': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
        case 'compliance': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>;
        case 'repeat': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>;
        case 'satisfaction': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
        case 'tracking': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M10 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM22 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM12 12h2M8 12h2M12 12v6M9 18h6" /></svg>;
        case 'intel': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></svg>;
        case 'bulb': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4" /></svg>;
        case 'brain': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z" /></svg>;
        case 'chevron': return <svg className="w-3 h-3" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>;
        case 'calendar': return <svg className={s} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
        default: return null;
    }
};
const updateTime= "24 Apr 2025, 09:30 AM";

 function Dashboard({ setMainTab }) {
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedTrend] = useState('This Month');

    const [dashboardMetrics, setDashboardMetrics] = useState({});
    
      const [dashboard, setDashboard] = useState({});
    const [globalTradeOverview, setGlobalTradeOverview] = useState([]);
    const [tradeValueTrend, setTradeValueTrend] = useState([]);
    const [topTradingPartners, setTopTradingPartners] = useState([]);
    const [topImportedProducts, setTopImportedProducts] = useState([]);
    const [topExportDestinations, setTopExportDestinations] = useState([]);
    const [recentShipments, setRecentShipments] = useState([]);
    const [accountSummary, setAccountSummary] = useState({});
    
const fetchDashboardMetrics = async () => {
  try {
    const res = await getDashboardMetrics();
    console.log("Dashboard Metrics:", res.data);
    setDashboardMetrics(res.data.data || {});
  } catch (err) {
    console.error(err);
  }
};

const fetchDashboard = async () => {
  try {
    const res = await getDashboard();

    console.log("Dashboard Response", res.data);

    setDashboard(res?.data?.data || {});
  } catch (err) {
    console.log(err);
  }
};

const fetchGlobalTradeOverview = async () => {
  try {
    const res = await getGlobalTradeOverview();
    console.log("Global Trade Overview:", res.data);
    setGlobalTradeOverview(res.data.data || {});
  } catch (err) {
    console.error(err);
  }
};


const fetchTradeValueTrend = async () => {
  try {
    const res = await getTradeValueTrend();
    console.log("Trade Value Trend:", res.data);
    setTradeValueTrend(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};


const fetchTopTradingPartners = async () => {
  try {
    const res = await getTopTradingPartners();
    console.log("Top Trading Partners:", res.data);
    setTopTradingPartners(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};


const fetchTopImportedProducts = async () => {
  try {
    const res = await getTopImportedProducts();
    console.log("Top Imported Products:", res.data);
    setTopImportedProducts(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};


const fetchTopExportDestinations = async () => {
  try {
    const res = await getTopExportDestinations();
    console.log("Top Export Destinations:", res.data);
    setTopExportDestinations(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};


const fetchRecentShipments = async () => {
  try {
    const res = await getRecentShipments();
    console.log("Recent Shipments:", res.data);
    setRecentShipments(res.data.data || []);
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  fetchDashboardMetrics();
  fetchDashboard();
  fetchGlobalTradeOverview();
  fetchTradeValueTrend();
  fetchTopTradingPartners();
  fetchTopImportedProducts();
  fetchTopExportDestinations();
  fetchRecentShipments();
}, []);
 useEffect(() => {
  const fetchAccountSummary = async () => {
    try {
      const res = await getAccountSummary();

      console.log("Logged in user:", res.data);

      setAccountSummary(res.data.data || {});
    } catch (error) {
      console.error("Failed to fetch account summary:", error);
    }
  };

  fetchAccountSummary();
}, []);
 const topMetrics= [
        { id: 1, title: 'Total Shipments', value: dashboardMetrics.totalShipments?.toLocaleString() || "0", growth: '', isPositive: true, color: '#3B82F6', bgColor: '#F0F6FF', icon: 'shipment' },
        { id: 2, title: 'Total Trade Value (INR)', value: dashboardMetrics.totalTradeValue ? `₹${(dashboardMetrics.totalTradeValue / 10000000).toFixed(2)} Cr` : '₹0.00 Cr', growth: '', isPositive: true, color: '#10B981', bgColor: '#ECFDF5', icon: 'trade' },
        { id: 3, title: 'Active Business Partners', value: dashboardMetrics.activeBusinessPartners?.toLocaleString() || "0", growth: '', isPositive: true, color: '#4F46E5', bgColor: '#EEF2FF', icon: 'partner' },
        { id: 4, title: 'New Business Inquiries', value:  dashboardMetrics.pendingBuyers?.toLocaleString() || "0", growth: '', isPositive: true, color: '#06B6D4', bgColor: '#ECFEFF', icon: 'inquiry' },
        { id: 5, title: 'Avg. Shipment Value (INR)', value:  dashboardMetrics.averageShipmentValue ? `₹${(dashboardMetrics.averageShipmentValue / 100000).toFixed(2)} L` : '₹0.00 L', growth: '', isPositive: true, color: '#F59E0B', bgColor: '#FFFBEB', icon: 'avgVal' },
    ];
  const operationalInsightPills=[
        { title: 'In Transit', value: dashboard?.inTransit || 0, growth: '', color: '#0D9488', bgColor: '#F0FDFA', icon: 'ontime' },
        { title: 'Delivered', value: dashboard?.delivered || 0 , growth: '', color: '#EF4444', bgColor: '#FEF2F2', icon: 'accuracy' },
        { title: 'Delayed', value: dashboard?.delayed || 0, growth: '', color: '#2563EB', bgColor: '#EFF6FF', icon: 'compliance' },
        { title: 'Exception', value: dashboard?.exception || 0, growth: '', color: '#059669', bgColor: '#ECFDF5', icon: 'repeat' },
        { title: 'Pending', value: dashboard?.pending || 0, growth: '', color: '#F43F5E', bgColor: '#FFF1F2', icon: 'satisfaction' },
    ];
    const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  function WorldMap() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden bg-white">
      <MapContainer
        center={[20, 10]}
        zoom={2}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        style={{
          height: "100%",
          width: "100%",
          background: "#fff",
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

          {globalTradeOverview.map((item, index) => {
          const marker = regionMarkers[item.region];

          if (!marker) return null;

          return (
            <CircleMarker
              key={index}
              center={marker.position}
              radius={13}
              pathOptions={{
                fillColor: marker.color,
                color: "#ffffff",
                weight: 4,
                fillOpacity: 1,
              }}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
const DynamicPlottingMap = () => (
  <div className="h-[200px] w-full bg-[#f8fafc] rounded-2xl">
      <WorldMap/>

  </div>
);

const regionMarkers = {
  Asia: {
    position: [22, 78],
    color: "#2563EB",
  },
  Europe: {
    position: [50, 10],
    color: "#10B981",
  },
  "North America": {
    position: [40, -100],
    color: "#8B5CF6",
  },
  "South America": {
    position: [-15, -60],
    color: "#F59E0B",
  },
  Africa: {
    position: [0, 20],
    color: "#14B8A6",
  },
};

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-[#334155] p-6  antialiased pt-14 ">

            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-[22px] font-bold text-[#0F172A] flex items-center gap-2 tracking-tight">
                        Welcome back, {accountSummary?.user?.name} ! <span className="text-xl">👋</span>
                    </h1>
                    <p className="text-xs text-[#64748B] mt-1 font-medium">Here's your B2B trade overview and key business insights.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-white border border-[#E2E8F0] px-3.5 py-2 rounded-lg text-xs font-semibold text-[#334155] flex items-center gap-2.5 shadow-sm">
                        <DynamicIcon type="calendar" color="#64748B" size="4" />
                        <span>01 Apr 2025 - 24 Apr 2025</span>
                    </div>
                </div>
            </div>



            {/* --- METRICS GRID --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {topMetrics.map((m) => {
              const Icon = iconMap[m.icon];

              return (
                <div
                  key={m.id}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <div
                      className="p-2 rounded-xl"
                      style={{ backgroundColor: m.bgColor }}
                    >
                      {Icon && (
                        <Icon size={18} color={m.color} strokeWidth={2.2} />
                      )}
                    </div>

                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#64748B] line-clamp-1">
                      {m.title}
                    </span>
                  </div>

                  <div>
                    <div className="text-[19px] font-extrabold text-[#0F172A] tracking-tight">
                      {m.value}
                    </div>

                    <div
                      className={`text-[11px] font-bold mt-1 flex items-center gap-1 ${
                        m.isPositive ? "text-[#10B981]" : "text-[#EF4444]"
                      }`}
                    >
                      {m.growth}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

            <DashboardAdPlacement location="B2B Dashboard - Dashboard" />
           
            {/* --- INSIGHT PILLS --- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {operationalInsightPills.map(item => (
                    <div key={item.title} className="bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm flex items-center gap-3.5">
                        <div className="p-2 rounded-2xl" style={{ backgroundColor: item.bgColor }}>
                            <DynamicIcon type={item.icon} color={item.color} size="5" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-bold text-[#64748B] truncate tracking-wide">{item.title}</div>
                            <div className="text-base font-black text-[#0F172A] mt-0.5 tracking-tight">{item.value}</div>
                            <div className="text-[10px] font-bold text-[#10B981] mt-0.5">{item.growth}</div>
                        </div>
                    </div>
                ))}
            </div>

           
            {/* --- DATA PANELS ROW 2 (Imported, Exported, & Recent Shipments Tables) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* TOP IMPORTED PRODUCTS */}
<div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm flex flex-col">

  {/* HEADER */}
  <div className="flex items-center justify-between mb-5">
    <h4 className="text-[15px] font-bold text-[#0F172A] tracking-tight">
      Top Imported Products
    </h4>

  </div>

  {/* PRODUCTS LIST */}
  <div className="flex flex-col">

    {topImportedProducts.map((p, index) => {

      const totalTradeValue = topImportedProducts.reduce(
        (sum, item) => sum + (item.tradeValue || 0),
        0
      );

      const share =
        totalTradeValue > 0
          ? ((p.tradeValue || 0) / totalTradeValue) * 100
          : 0;

      return (
        <div
          key={p._id || index}
          className="py-3.5 border-b border-[#F1F5F9] last:border-0"
        >

          {/* TOP ROW */}
          <div className="flex items-center justify-between gap-4">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-2 min-w-0 flex-1">

              {/* HS CODE */}
              <span
                className="text-[11px] text-[#94A3B8] font-medium truncate max-w-[150px]"
                title={p.hsCode || "-"}
              >
                {p.hsCode || "-"}
              </span>

              {/* PRODUCT NAME */}
              <span
                className="text-[11px] text-[#334155] font-medium truncate"
                title={p.productDescription || p.description || p._id || "-"}
              >
                {p.productDescription ||
                  p.description ||
                  p._id ||
                  "-"}
              </span>

            </div>

            {/* VALUE */}
            <span className="text-[11px] font-semibold text-[#0F172A] whitespace-nowrap">
              ₹{((p.tradeValue || 0) / 10000000).toFixed(2)} Cr
            </span>

          </div>


          {/* PROGRESS + SHARE */}
          <div className="flex items-center gap-3 mt-2">

            {/* PROGRESS BAR */}
            <div className="flex-1 h-1.5 bg-[#EEF2F7] rounded-full overflow-hidden">

              <div
                className="h-full bg-[#3B82F6] rounded-full transition-all duration-300"
                style={{
                  width: `${share}%`,
                }}
              />

            </div>

            {/* PERCENTAGE */}
            <span className="text-[10px] text-[#94A3B8] font-medium w-8 text-right">
              {share.toFixed(0)}%
            </span>

          </div>

        </div>
      );
    })}

  </div>


  {/* EMPTY STATE */}
  {topImportedProducts.length === 0 && (
    <div className="py-8 text-center text-xs text-[#94A3B8]">
      No imported products available.
    </div>
  )}


  {/* FOOTER */}
  <button onClick={() => setMainTab && setMainTab("Shipments")}  className="w-full text-center text-xs font-bold text-[#2563EB] mt-4 pt-4 border-t border-[#F1F5F9] hover:text-blue-700 transition-colors">
    View All Products →
  </button>

</div>
                {/* Top Export Destinations */}
                <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-[#0F172A] mb-4 tracking-tight">Top Export Destinations</h4>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="text-[#94A3B8] border-b border-[#F1F5F9] font-bold">
                                        <th className="pb-2 font-medium">Country</th>
                                        <th className="pb-2 text-center font-medium">Shipments</th>
                                        <th className="pb-2 text-right font-medium">Value (INR)</th>
                                        <th className="pb-2 text-right font-medium">Share</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F8FAFC] font-bold text-[#334155]">
                                    {topExportDestinations.map(d => (
                                        <tr key={d._id} className="hover:bg-[#F8FAFC]/50 transition-colors">
                                            <td className="py-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-[11px] text-[#0F172A]">
                                                        {d._id}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-2.5 text-center text-[#64748B] font-semibold">{d.shipments}</td>
                                            <td className="py-2.5 text-right font-black text-[#334155]">₹{((d.tradeValue || 0) / 10000000).toFixed(2)} Cr</td>
                                            <td className="py-2.5 text-right text-[#64748B]">{topExportDestinations.length > 0 ? ((d.tradeValue / topExportDestinations.reduce((sum, item) => sum + (item.tradeValue || 0), 0)) * 100).toFixed(1) + "%" : "0%"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recent Shipments */}
                <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                    <div>
                        <h4 className="text-[15px] font-bold text-[#0F172A] mb-3 tracking-tight">Recent Shipments</h4>
                        <div className="overflow-x-auto w-full">
                            <table className="w-full text-left text-xs">
                                <thead>
                                    <tr className="text-[#94A3B8] border-b border-[#F1F5F9] font-bold">
                                        <th className="pb-2 font-medium">Shipment ID</th>
                                        <th className="pb-2 font-medium">Product Description</th>
                                        <th className="pb-2 text-right font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F8FAFC] font-bold text-[#334155]">
                                    {recentShipments.map(s => (
                                        <tr key={s._id} className="hover:bg-[#F8FAFC]/50 transition-colors">
                                            <td className="py-2.5 text-[#2563EB] font-extrabold tracking-tight">{s.sbNumber || s.referenceNumber}</td>
                                            <td className="py-2.5 text-[#64748B] font-semibold max-w-[120px] truncate">{s.cargo?.description || s.cargo?.productName || "-"}</td>
                                            <td className="py-2.5 text-right">
                                                <span className={`text-[9px] font-black px-2 py-0.5 border rounded-full uppercase tracking-wider ${s.shipmentStatus === "Delivered" ? "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]" : 
                                                  s.shipmentStatus === "In Transit" ? "bg-[#F0F6FF] text-[#3B82F6] border-[#BFDBFE]" : "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]"}`}>
                                                    {s.shipmentStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className="text-xs font-bold text-[#2563EB] text-center mt-3 pt-3 border-t border-[#F1F5F9]" onClick={() => setMainTab && setMainTab("Shipments")} >View All Shipments</button>
                </div>
            </div>

            {/* --- FOOTER STRIP --- */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#94A3B8] font-semibold mt-8 border-t border-[#E2E8F0] pt-4 gap-2">
                <div>ⓘ All data is updated daily. Last updated on {updateTime}</div>
                <button onClick={() => setMainTab && setMainTab("Help & Support")} className="hover:text-[#64748B]">Help Center</button>
            </div>
        </div>
    );
    
}