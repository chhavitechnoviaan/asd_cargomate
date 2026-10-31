import {
  Cloud,
  Sparkles,
  Code2,
  BadgeCheck,
  Calculator,
  Truck,
  Building2,
  Radar,
} from "lucide-react";
import { useState } from "react";
import HsCodeSearch from "./HsCodeSearch"
import AiAssistant from "./AiAssistant";
import FreightCalculator from "../../components/FreightCalculator";
import AiInsight from "../../components/AiInsight"
import IncentiveChecker from "../../components/IncentiveChecker";




const modules = [
  {
    icon: Sparkles,
    color: "text-orange-500",
    bg: "bg-orange-50",
    title: "AI Assistant",
    desc: "Get smart answers and automation support.",
  },
  {
    icon: Code2,
    color: "text-green-500",
    bg: "bg-green-50",
    title: "HS Code Search",
    desc: "Search and validate HS codes with descriptions.",
  },
  {
    icon: BadgeCheck,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Incentive Checker",
    desc: "Check export incentive and benefits",
  },
  {
    icon: Calculator,
    color: "text-red-500",
    bg: "bg-red-50",
    title: "Freight Calculator",
    desc: "Calculate freight costs for multiple routes.",
  },
];

export default function AIModulesBackendScope() {
    const [hsCodeSearch, setHsCodeSearch] = useState(false)
   const [activeModal, setActiveModal] = useState(null);
  return (
    <div className="w-full mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
          <Cloud className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">AI Modules (Backend Scope)</h2>
          <p className="text-sm text-gray-500">AI-Powered tools to automate and optimize operations.</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-visible">
        {modules.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
                 onClick={() => setActiveModal(i)}
              className="min-w-[200px] sm:min-w-0 border  border-gray-200  cursor-pointer rounded-xl p-4 shrink-0"
            >
              <div className={`w-9 h-9 rounded-full ${m.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-1">{m.title}</p>
              <p className="text-xs text-gray-500">{m.desc}</p>
            </div>
          );
        })}
      </div>

           {
            activeModal === 0 && (<AiInsight onClose={() => setActiveModal(null)} />)
           }

           {
            activeModal === 1 && (<HsCodeSearch onClose={() => setActiveModal(null)} />)
           }

            {
            activeModal === 2 && (<IncentiveChecker onClose={() => setActiveModal(null)} />)
           }

            {
            activeModal === 3 && (<FreightCalculator onClose={() => setActiveModal(null)} />)
           }

    </div>
  );
}