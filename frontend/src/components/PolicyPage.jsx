import { MessageCircleQuestion } from "lucide-react";
import policyHeroImage from "../assets/policy-hero.jpg";

export default function PolicyPage({
  title,
  subtitle,
  items,
  lastUpdated,
  ctaQuestion,
  onClose,
}) {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img
            src={policyHeroImage}
            alt="Cargo ship at night"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/40" />
          <div className="relative h-full flex flex-col justify-center px-5 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {title}
            </h1>
            <p className="mt-2 text-sm text-blue-50 max-w-md">{subtitle}</p>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="space-y-3">
            {items.map(({ icon: Icon, title: itemTitle, desc }, i) => (
              <div
                key={itemTitle}
                className="border border-gray-200 rounded-xl p-4 flex items-start gap-3"
              >
                <Icon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-blue-600">
                    {i + 1}. {itemTitle}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            {lastUpdated && (
              <p className="text-xs text-gray-400">
                Last Updated: {lastUpdated}
              </p>
            )}
            <button
              onClick={onClose}
              className="border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg px-6 py-2 ml-auto"
            >
              Close
            </button>
          </div>

          <div className="mt-6 bg-blue-600 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
              <MessageCircleQuestion className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white font-bold">
                Let's Connect and Grow Together
              </p>
              <p className="text-blue-100 text-sm mt-0.5">{ctaQuestion}</p>
            </div>
            <button className="bg-white text-blue-700 text-sm font-semibold rounded-lg px-5 py-2 shrink-0">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
