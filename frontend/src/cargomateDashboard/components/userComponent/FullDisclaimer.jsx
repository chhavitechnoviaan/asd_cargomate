import ModalShell from "./ModalShell";

 
import { useState, useRef } from "react";
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
 

const disclaimerSections = [
  {
    number: 1,
    title: "Government Policies & Incentives",
    desc: "Export incentives, benefits, and government policies may change based on official notifications, budget announcements, or regulatory updates. Please verify the latest information from authorized government sources before making any business decisions.",
  },
  {
    number: 2,
    title: "Data Accuracy",
    desc: "We strive to keep all information accurate and up to date. However, ASD CargoMate cannot guarantee the completeness, accuracy, or reliability of information obtained from external data providers or third-party services.",
    icon: FiFileText,
    color: "text-purple-500",
  },
  {
    number: 3,
    title: "Estimates & Calculations",
    desc: "Estimated costs, transit times, customs duties, and shipping charges are calculated using available data and historical trends. Actual values may differ depending on shipment details and government regulations.",
    icon: FiTrendingUp,
    color: "text-amber-500",
  },
  {
    number: 4,
    title: "Third-Party Sources",
    desc: "Some information displayed within the platform is collected from third-party APIs, public databases, and government portals. ASD CargoMate is not responsible for the availability or accuracy of external sources.",
  },
  {
    number: 5,
    title: "No Liability",
    desc: "ASD CargoMate shall not be liable for any direct, indirect, incidental, or consequential losses arising from the use of information, recommendations, or estimates provided within the platform.",
    icon: FiUser,
    color: "text-red-500",
  },
];
 


export default function FullDisclaimerModal({ onClose }) {
  return (
    <ModalShell width="max-w-2xl">
      <div className="flex flex-col max-h-[85vh]">
        <div className="flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
              <FiShield size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Full Disclaimer</h2>
              <p className="text-sm text-gray-500">
                Please read the following important information carefully.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <div className="overflow-y-auto pr-1">
          <div className="mt-4 bg-blue-50 rounded-xl p-4">
            <p className="text-sm font-bold text-blue-600 flex items-center gap-1.5">
              <FiInfo size={15} />
              Important Notice
            </p>
            <p className="text-sm text-gray-600 mt-1.5">
              The information, estimates, and recommendations provided by ASD
              CargoMate are for general informational purposes only and should
              not be considered as legal, financial, or professional advice
            </p>
          </div>

          <div className="mt-4 space-y-4">
            {disclaimerSections.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.number} className="flex gap-3">
                  {Icon ? (
                    <Icon size={16} className={`mt-0.5 shrink-0 ${s.color}`} />
                  ) : (
                    <span className="w-4 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {s.number}. {s.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 bg-amber-50 rounded-xl p-4">
            <p className="text-sm font-bold text-amber-600 flex items-center gap-1.5">
              <FiAlertTriangle size={15} />
              Verify with Official Sources
            </p>
            <p className="text-sm text-gray-600 mt-1.5">
              Always verify critical information through official government
              websites, customs authorities, shipping carriers, and regulatory
              agencies before making business or financial decisions.
            </p>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-400">
              I understand and agree to the above terms.
            </p>
            <button
              onClick={onClose}
              className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg shrink-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}