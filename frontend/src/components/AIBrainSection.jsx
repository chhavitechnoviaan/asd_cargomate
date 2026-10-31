import { Cpu, TrendingUp, ShieldCheck, LineChart } from "lucide-react";
import aiChipImage from "../assets/ai-chip.jpg";

const points = [
  {
    icon: Cpu,
    title: "AI-Powered Automation",
    desc: "Automates repetitive logistics tasks with intelligent workflows.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Supply Chain",
    desc: "Forecasts demand and disruptions before they happen.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance Alerts",
    desc: "Flags compliance issues before shipments are affected.",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    desc: "Turns live shipping data into actionable business insights.",
  },
];

export default function AIBrainSection() {
  return (
    <div className="relative w-full bg-blue-950 overflow-hidden">
      <img
        src={aiChipImage}
        alt="AI technology"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16">
        <p className="text-xs font-semibold text-blue-300 uppercase">
          AI Engine
        </p>
        <h2 className="mt-1 text-xl sm:text-2xl font-bold text-white max-w-md">
          The Brain Behind CargoMate
        </h2>
        <p className="mt-2 text-sm text-blue-100 max-w-md">
          Our AI engine processes millions of data points across ports,
          carriers, and trade routes to give you smarter, faster shipping
          decisions.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg">
          {points.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="mt-0.5 text-xs text-blue-200">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
