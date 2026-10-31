import { Send, ArrowRight, CheckCircle2, Flame } from "lucide-react";

export function ChatDemo() {
  return (
    <div className="border border-gray-200 rounded-lg p-2 space-y-2">
      <div className="bg-gray-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 w-fit">
        Hello! How can I help you today?
      </div>
      <div className="bg-blue-50 rounded-lg px-2.5 py-1.5 text-xs text-blue-700 ml-auto w-fit">
        What documents are required for exporting to Dubai?
      </div>
      <div className="bg-gray-100 rounded-lg px-2.5 py-2 text-xs text-gray-700 w-fit">
        <p className="mb-1">Here are the key documents required for exporting to Dubai:</p>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Commercial Invoice</li>
          <li>Packing List</li>
          <li>Bill of Lading / Airway Bill</li>
          <li>Certificate of Origin</li>
        </ul>
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

export function ListDemo() {
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

export function CalculateDemo({ module }) {
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

export function DutyDemo() {
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

export function RouteDemo({ module }) {
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

export function ScoreDemo({ module }) {
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

export function ChartDemo({ module }) {
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

export function ComplianceDemo({ module }) {
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

export function DGDemo({ module }) {
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

export function TrendDemo({ module }) {
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

export const demoRenderers = {
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
