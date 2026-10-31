import { useState } from "react";
import { X, CheckCircle2, Search, ListChecks, FileCheck2, Send, Mail } from "lucide-react";
import { stakeholders } from "../data/stakeholders";
import StakeholderModal from "./StakeholderModal";

const workflowIcons = [Search, ListChecks, FileCheck2, Send, Mail];

export default function SolutionsOverview() {
  const [activeTab, setActiveTab] = useState(stakeholders[0].id);
  const [modalStakeholder, setModalStakeholder] = useState(null);

  const active = stakeholders.find((s) => s.id === activeTab);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Solutions for Every Stakeholders
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose your role. Discover your advantage.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {stakeholders.map((s) => (
          <button
            key={s.id}
            onClick={() => setModalStakeholder(s)}
            className="border border-gray-200 rounded-xl p-4 text-left hover:border-blue-300"
          >
            <s.icon className="w-6 h-6 text-blue-600" />
            <p className="mt-2 text-sm font-bold text-gray-900">{s.title}</p>
            <p className="mt-0.5 text-xs text-gray-500">{s.cardDesc}</p>
          </button>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-blue-600 font-semibold">
        Explore in details
      </p>
      <h2 className="mt-1 text-center text-lg sm:text-xl font-bold text-gray-900">
        Tailored Solutions. Real Impact.
      </h2>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {stakeholders.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`text-sm font-semibold rounded-full px-4 py-2 ${
              activeTab === s.id
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-700"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-2xl p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1 flex flex-col items-center text-center bg-white rounded-xl p-5">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <active.icon className="w-8 h-8 text-blue-600" />
          </div>
          <p className="mt-3 text-sm text-gray-500">{active.description}</p>
        </div>

        <div className="lg:col-span-1">
          <p className="text-sm font-bold text-red-600">Challenges</p>
          <ul className="mt-3 space-y-3">
            {[
              "Finding the right buyer and markets",
              "Payment delay and risk",
              "Lack of Shipment visibility",
              "Complex documentation and compliance",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <p className="text-sm font-bold text-blue-600">CargoMate Solution</p>
          <ul className="mt-3 space-y-3">
            {[
              "AI powered buyer & market discovery",
              "Real-time rate comparison",
              "End-to-end Shipment tracking",
              "Risk scoring & secure payment insights",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <p className="text-sm font-bold text-green-600">Benefits</p>
          <ul className="mt-3 space-y-3">
            {[
              "Reach the right market faster",
              "Lower logistics cost and transit time",
              "100% compliant, error free documentation",
              "Real-time visibility & control",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1">
          <p className="text-sm font-bold text-purple-600">Workflow</p>
          <ul className="mt-3 space-y-3">
            {[
              "Search Buyer & markets",
              "Compare Rates & plan routes",
              "Prepare & Verify documents",
              "Ship & Track in Real time",
              "Get paid faster",
            ].map((item, i) => {
              const Icon = workflowIcons[i];
              return (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <Icon className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <StakeholderModal
        stakeholder={modalStakeholder}
        onClose={() => setModalStakeholder(null)}
      />
    </div>
  );
}
