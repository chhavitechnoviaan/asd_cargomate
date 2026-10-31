import { useState } from "react";
import { X, CheckCircle2, PlayCircle, Send, Flame, ArrowRight } from "lucide-react";

function ChatDemo() {
  return (
    <div className="border border-gray-200 rounded-lg p-2 space-y-2">
      <div className="bg-gray-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 w-fit">
        Hello! How can I help you today?
      </div>
      <div className="bg-blue-50 rounded-lg px-2.5 py-1.5 text-xs text-blue-700 ml-auto w-fit">
        What documents are required for exporting to Dubai?
      </div>
      <div className="bg-gray-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 w-fit">
        Would you like a detailed guide on any of these?
      </div>
      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5">
        <span className="flex-1 text-xs text-gray-400">Type Your Message</span>
        <Send className="w-3.5 h-3.5 text-blue-600" />
      </div>
    </div>
  );
}

function ListDemo() {
  return (
    <div className="border border-gray-200 rounded-lg p-2">
      <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 mb-2">
        Enter Product
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between text-xs text-gray-500 py-1 border-t border-gray-100 first:border-t-0"
        >
          <span>Food</span>
          <span>300</span>
          <span>300</span>
        </div>
      ))}
    </div>
  );
}

function CalculateDemo({ module }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-2">
      <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-500">
        {module.demoLabel}
      </div>
      <p className="text-xl font-bold text-gray-900">{module.demoValue}</p>
      <button className="w-full bg-blue-600 text-white text-xs font-semibold rounded-lg py-2">
        Calculate
      </button>
    </div>
  );
}

function DutyDemo() {
  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-3 text-xs">
      <div>
        <p className="text-gray-500 mb-1">Duty</p>
        <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-500">
          Assessable Value
        </div>
        <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 mt-1 text-gray-700">
          ₹1,00,000
        </div>
      </div>
      <div>
        <p className="text-gray-500 mb-1">Assessable Value</p>
        <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700">
          ₹1,00,00,000
        </div>
      </div>
    </div>
  );
}

function RouteDemo({ module }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-2 text-xs">
      <div className="flex items-center justify-between text-gray-700">
        <span>
          {module.demoFrom}
          <br />
          {module.demoTo}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
      </div>
      <div>
        <p className="text-gray-500 mb-1">Mode</p>
        <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700">
          {module.demoMode}
        </div>
      </div>
      <div>
        <p className="text-gray-500 mb-1">{module.demoResultLabel}</p>
        <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 font-semibold">
          {module.demoResultValue}
        </div>
      </div>
    </div>
  );
}

function ScoreDemo({ module }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-2 text-xs">
      <p className="text-gray-700 font-medium">{module.demoName}</p>
      {module.demoLocation && (
        <p className="text-gray-400">{module.demoLocation}</p>
      )}
      <p className="text-gray-500">{module.demoScoreLabel}</p>
      <p className="text-lg font-bold text-green-600">{module.demoScore}</p>
      <p className="text-green-600">{module.demoScoreNote}</p>
    </div>
  );
}

function ChartDemo({ module }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-2 text-xs">
      <p className="text-gray-700 font-medium">{module.demoName}</p>
      <p className="text-gray-500">{module.demoChartLabel}</p>
      <p className="text-lg font-bold text-gray-900">{module.demoChartValue}</p>
      <svg viewBox="0 0 100 30" className="w-full h-10">
        <path
          d="M0,25 L15,18 L30,22 L45,10 L60,15 L75,5 L100,8"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

function ComplianceDemo({ module }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 space-y-2 text-xs">
      <div>
        <p className="text-gray-700 font-medium mb-2">Compliance Check</p>
        <div className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-500">
          {module.demoName}
        </div>
      </div>
      <p className="text-gray-500">Status</p>
      <div className="border border-green-200 bg-green-50 rounded-lg px-2.5 py-1.5 text-green-700 font-semibold flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {module.demoStatus}
      </div>
    </div>
  );
}

function DGDemo({ module }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 text-xs space-y-2">
      <p className="font-bold text-gray-900">{module.demoUN}</p>
      <p className="text-gray-700">{module.demoDGName}</p>
      <p className="text-gray-500">{module.demoDGClass}</p>
      <div className="flex justify-end">
        <Flame className="w-6 h-6 text-orange-500" />
      </div>
    </div>
  );
}

function TrendDemo({ module }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 text-xs space-y-2">
      <p className="font-bold text-gray-900">{module.demoName}</p>
      <svg viewBox="0 0 100 30" className="w-full h-12">
        <path
          d="M0,25 L15,20 L30,22 L45,12 L60,16 L75,6 L100,10"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

const demoRenderers = {
  chat: ChatDemo,
  list: ListDemo,
  calculate: CalculateDemo,
  duty: DutyDemo,
  route: RouteDemo,
  score: ScoreDemo,
  chart: ChartDemo,
  compliance: ComplianceDemo,
  dg: DGDemo,
  trend: TrendDemo,
};

export default function ModuleDetailModal({ module, onClose }) {
  const [tab, setTab] = useState("features");
  if (!module) return null;

  const Icon = module.icon;
  const DemoComponent = demoRenderers[module.demoType] || ListDemo;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 py-8 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Icon className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {module.title}
          </h2>
        </div>

        <div className="mt-6 flex gap-6 border-b border-gray-100 sm:hidden">
          {["features", "demo", "workflow"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 text-sm font-semibold capitalize ${
                tab === t
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className={tab === "features" ? "block" : "hidden sm:block"}>
            <p className="text-sm font-bold text-gray-900 mb-3 hidden sm:block">
              Features
            </p>
            <div className="space-y-3">
              {module.features.map((f) => (
                <div key={f} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{f}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={tab === "demo" ? "block" : "hidden sm:block"}>
            <p className="text-sm font-bold text-gray-900 mb-3 hidden sm:block">
              Demo
            </p>
            <button className="w-full flex items-center justify-center gap-2 border border-blue-500 text-blue-600 text-sm font-semibold rounded-lg py-2 mb-3">
              <PlayCircle className="w-4 h-4" />
              Watch Demo
            </button>
            <DemoComponent module={module} />
          </div>

          <div className={tab === "workflow" ? "block" : "hidden sm:block"}>
            <p className="text-sm font-bold text-gray-900 mb-3 hidden sm:block">
              Workflow
            </p>
            <ol className="space-y-3">
              {module.workflow.map((step, i) => (
                <li key={step} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 font-medium">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
