import { X, ArrowUpDown, Settings, CalendarCheck, CreditCard, ShieldCheck, MonitorUp } from "lucide-react";

const icons = {
  swap: ArrowUpDown,
  gear: Settings,
  trial: CalendarCheck,
  payment: CreditCard,
  "browser-swap": MonitorUp,
  shield: ShieldCheck,
};

const cardColors = {
  swap: "bg-blue-50 text-blue-600",
  gear: "bg-blue-50 text-blue-600",
  trial: "bg-blue-50 text-blue-600",
  payment: "bg-blue-50 text-blue-600",
  "browser-swap": "bg-blue-50 text-blue-600",
  shield: "bg-blue-50 text-blue-600",
};

const paymentMethods = ["VISA", "Mastercard", "Amex", "UPI", "PayPal", "Bank Transfer"];

export default function FAQAnswerModal({ faq, onClose }) {
  if (!faq) return null;
  const Icon = icons[faq.iconType] || Settings;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-blue-600 pr-8">
          {faq.question}
        </h2>
        <p className="mt-3 text-sm text-gray-600">{faq.answer}</p>

        {faq.iconType === "payment" ? (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {paymentMethods.map((m) => (
              <div
                key={m}
                className="border border-gray-200 rounded-lg py-2 text-center text-xs font-semibold text-gray-600"
              >
                {m}
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`mt-5 w-16 h-16 rounded-full flex items-center justify-center ${cardColors[faq.iconType]}`}
          >
            <Icon className="w-8 h-8" />
          </div>
        )}
      </div>
    </div>
  );
}
