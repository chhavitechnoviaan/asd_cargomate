import { useState } from "react";
import { Plus } from "lucide-react";
import { pricingFAQs } from "../data/pricingPlans";
import FAQAnswerModal from "./FAQAnswerModal";

export default function PricingFAQSection() {
  const [activeFAQ, setActiveFAQ] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12 sm:pb-16">
      <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pricingFAQs.map((faq) => (
          <button
            key={faq.id}
            onClick={() => setActiveFAQ(faq)}
            className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 text-left"
          >
            <span className="text-sm font-medium text-gray-800">
              {faq.question}
            </span>
            <Plus className="w-4 h-4 text-blue-600 shrink-0" />
          </button>
        ))}
      </div>

      <FAQAnswerModal faq={activeFAQ} onClose={() => setActiveFAQ(null)} />
    </div>
  );
}
