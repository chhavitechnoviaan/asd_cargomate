import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { stakeholders } from "../data/stakeholders";
import StakeholderModal from "./StakeholderModal";

export default function AllSolutionsList() {
  const [modalStakeholder, setModalStakeholder] = useState(null);
  const items = stakeholders.filter((s) => s.id !== "exporters");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          All Solutions. One Intelligent Platform.
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Click on any stakeholder to explore how CargoMate solves unique
          challenges with AI-powered intelligence.
        </p>
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
        {items.map((s) => (
          <button
            key={s.id}
            onClick={() => setModalStakeholder(s)}
            className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <s.icon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">{s.title}</p>
              <p className="text-xs text-gray-500">{s.description}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
          </button>
        ))}
      </div>

      <div className="mt-6 bg-blue-700 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-white font-bold">
            Your Role. Our Solution. Shared Success.
          </p>
          <p className="text-blue-100 text-sm mt-0.5">
            See how CargoMate can transform your logistics operations.
          </p>
        </div>
        <button className="bg-white text-blue-700 text-sm font-semibold rounded-lg px-6 py-2.5 shrink-0">
          Explore Platform
        </button>
      </div>

      <StakeholderModal
        stakeholder={modalStakeholder}
        onClose={() => setModalStakeholder(null)}
      />
    </div>
  );
}
