import { Sparkles, Eye, Globe2, Zap, Layers, Brain, Languages } from "lucide-react";

const pillars = [
  { icon: Sparkles, label: "AI-Powered Intelligence" },
  { icon: Eye, label: "End-to-End Visibility" },
  { icon: Globe2, label: "Global Data Network" },
  { icon: Zap, label: "Time & Cost Efficiency" },
  { icon: Layers, label: "Scalable for Every Business" },
];

const techs = [
  {
    icon: Brain,
    title: "Machine Learning Models",
    desc: "Continuously learning from live shipping data to improve accuracy.",
  },
  {
    icon: Languages,
    title: "Natural Language Processing",
    desc: "Understand and respond to shipping queries in plain language.",
  },
];

export default function WhyCargoMate() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <p className="text-center text-xs font-semibold text-blue-600 uppercase">
          Why CargoMate?
        </p>
        <h2 className="mt-1 text-center text-xl sm:text-2xl font-bold text-gray-900">
          Smarter by Choice. Stronger by Result.
        </h2>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {pillars.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-4 flex flex-col items-center text-center"
            >
              <Icon className="w-5 h-5 text-blue-600" />
              <p className="mt-2 text-xs font-semibold text-gray-900">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs font-semibold text-blue-600 uppercase">
          Our Technology
        </p>
        <h3 className="mt-1 text-lg sm:text-xl font-bold text-gray-900">
          Intelligence at the Core
        </h3>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techs.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-4 flex items-start gap-3"
            >
              <Icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
