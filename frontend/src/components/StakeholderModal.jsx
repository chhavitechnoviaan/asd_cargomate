import { CheckCircle2, X } from "lucide-react";

export default function StakeholderModal({ stakeholder, onClose }) {
  if (!stakeholder) return null;
  const Icon = stakeholder.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {stakeholder.title}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">{stakeholder.description}</p>

        <div className="mt-6 space-y-3">
          {stakeholder.points.map((point) => (
            <div key={point} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-sm font-medium text-gray-800">{point}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full border border-blue-500 text-blue-600 font-bold rounded-full py-2.5 hover:bg-blue-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}
