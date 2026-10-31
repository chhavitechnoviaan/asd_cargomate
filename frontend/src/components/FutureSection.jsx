import { useState } from "react";
import { Bot, Package, Leaf, Boxes } from "lucide-react";
import RequestDemoModal from "./RequestDemoModal";
import ThankYouModal from "./ThankYouModal";

const stats = [
  { icon: Bot, value: "92%", label: "Smarter Automation" },
  { icon: Package, value: "3.5x", label: "Predictive Supply Chain" },
  { icon: Leaf, value: "40%", label: "Sustainability Insights" },
  { icon: Boxes, value: "120+", label: "Global Commodity" },
];

export default function FutureSection() {
  const [showDemo, setShowDemo] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleDemoSuccess = () => {
    setShowDemo(false);
    setShowThankYou(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <p className="text-center text-xs font-semibold text-blue-600 uppercase">
        Future Ready
      </p>
      <h2 className="mt-1 text-center text-lg sm:text-xl font-bold text-gray-900">
        Building the Future of Logistics
      </h2>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="border border-gray-200 rounded-xl p-4 text-center"
          >
            <Icon className="w-5 h-5 text-blue-600 mx-auto" />
            <p className="mt-2 text-lg font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-700 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-white font-bold">Ready to Ship Smarter?</p>
          <p className="text-blue-100 text-sm mt-0.5">
            Join thousands of businesses simplifying logistics with AI.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setShowDemo(true)}
            className="bg-white text-blue-700 text-sm font-semibold rounded-lg px-5 py-2.5"
          >
            Request Demo
          </button>
          <button className="border border-white text-white text-sm font-semibold rounded-lg px-5 py-2.5">
            Explore Platform
          </button>
        </div>
      </div>

      {showDemo && (
        <RequestDemoModal
          onClose={() => setShowDemo(false)}
          onSuccess={handleDemoSuccess}
        />
      )}
      {showThankYou && (
        <ThankYouModal onClose={() => setShowThankYou(false)} />
      )}
    </div>
  );
}
