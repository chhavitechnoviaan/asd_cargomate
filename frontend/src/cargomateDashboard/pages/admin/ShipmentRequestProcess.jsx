import { LuClipboardList, LuCopy, LuCheck, LuSquarePen, LuUserCheck, LuPackage, LuLandmark } from "react-icons/lu";

const steps = [
  { title: "1. Form Submission", desc: "User files and submits shipment form", icon: LuClipboardList, bg: "bg-blue-100", color: "text-blue-500" },
  { title: "2. Under Review", desc: "Admin reviews and verifies the details", icon: LuCopy, bg: "bg-orange-100", color: "text-orange-500" },
  { title: "3. Approved", desc: "Admin approves the shipment request", icon: LuCheck, bg: "bg-green-500", color: "text-white" },
  { title: "4. Quotation Sent", desc: "Admin sends quotation to the user", icon: LuSquarePen, bg: "bg-purple-100", color: "text-purple-500" },
  { title: "5. User Response", desc: "User reviews quotation and responds", icon: LuUserCheck, bg: "bg-orange-100", color: "text-orange-500" },
  { title: "6. Confirmed", desc: "Shipment request confirmed", icon: LuPackage, bg: "bg-blue-100", color: "text-blue-400" },
];

export default function ShipmentProcess() {
  return (
   
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-8">
        <div className="flex items-start gap-3 mb-8">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
            <LuLandmark size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Shipment Request Process</h1>
            <p className="text-sm text-gray-500">End to end process from request to quotation</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-2">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative flex-1">
                {i !== steps.length - 1 && (
                  <span className="hidden md:block absolute top-6 left-1/2 w-full h-px bg-gray-200 -z-10" />
                )}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${step.bg}`}>
                  <Icon className={step.color} size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500 max-w-[140px]">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    
  );
}