import { Sparkles, CalendarCheck, AlertTriangle, Globe } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    desc: "Get intelligent answers instantly.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Planning",
    desc: "Find optimal route and compare rates.",
  },
  {
    icon: AlertTriangle,
    title: "Faster Decision",
    desc: "Real-time data for confident actions.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    desc: "Connect and ship worldwide.",
  },
];

export default function PlatformFeatures() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          One Platform. <span className="text-blue-600">Endless Opportunities</span>
        </h2>
        <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
          ASD CARGOMATE is your AI-Powered co-pilot, simplifying global
          shipping with smart insights, real-time data, and automation.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="border border-gray-200 rounded-xl p-4 flex items-start gap-3"
          >
            <Icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-gray-900">{title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
