import { Layers, FileText, Truck, CreditCard, Cloud, Sparkles, Link2 } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Layers,
    title: "Foundation",
    desc: "Core setup, master data, users, roles, permissions & settings.",
  },
  {
    number: 2,
    icon: FileText,
    title: "Shipment Request & Quotation",
    desc: "Request creation, quotation, versioning & approval.",
  },
  {
    number: 3,
    icon: Truck,
    title: "Shipment Operations",
    desc: "Booking, documentation, tracking & delivery.",
  },
  {
    number: 4,
    icon: CreditCard,
    title: "Finance",
    desc: "Invoicing, payments, reconciliation & reports.",
  },
  {
    number: 5,
    icon: Cloud,
    title: "B2B Bulk Upload",
    desc: "Bulk upload, validation, mapping & processing.",
  },
  {
    number: 6,
    icon: Sparkles,
    title: "AI Intelligence",
    desc: "Insights, predictions, risk scoring & recommendations.",
  },
  {
    number: 7,
    icon: Link2,
    title: "External Integrations",
    desc: "APIs, ERP, carriers, accounting & third-party integrations.",
  },
];

export default function FinalBuildOrder() {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-8">
        <Layers className="w-6 h-6 text-purple-600" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Final Build Order</h2>
          <p className="text-sm text-gray-500">System development sequence and module priority.</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.number} className="min-w-[220px] sm:min-w-0 shrink-0 relative pt-5">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center z-10">
                {s.number}
              </span>
              <div className="border border-gray-200 rounded-xl p-4 pt-6 text-center h-full">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{s.title}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}