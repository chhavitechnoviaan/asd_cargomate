import { ArrowRight } from "lucide-react";
import { resourceCards } from "../data/resourceCards";

export default function ResourcesGrid({ onSelect }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {resourceCards.map((card) => (
          <div
            key={card.id}
            className="border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center"
          >
            <div className={`w-14 h-14 rounded-full ${card.color} flex items-center justify-center`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <p className="mt-3 font-bold text-gray-900">{card.title}</p>
            <p className="mt-1 text-xs text-gray-500">{card.desc}</p>
            <button
              onClick={() => onSelect(card)}
              className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600"
            >
              Explore
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
