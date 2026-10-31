import { Clock, HandCoins, ShieldAlert, Globe } from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Save Time",
    desc: "Automate tasks and reduce manual effort.",
  },
  {
    icon: HandCoins,
    title: "Cut Costs",
    desc: "Compare rates and choose the best.",
  },
  {
    icon: ShieldAlert,
    title: "Reduce Risk",
    desc: "Get AI insights and compliance alerts.",
  },
  {
    icon: Globe,
    title: "Scale Globally",
    desc: "Ship confidently anywhere in the world.",
  },
];

export default function WhyChooseUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Why Choose <span className="text-blue-600">ASD CARGOMATE?</span>
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Empowering businesses with AI-driven logistics intelligence.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reasons.map(({ icon: Icon, title, desc }) => (
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
