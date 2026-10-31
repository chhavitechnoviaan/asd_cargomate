import { CheckCircle2 } from "lucide-react";

export default function ThankYouModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">Thank You!</h2>
        </div>

        <p className="mt-4 text-sm font-bold text-gray-900">
          Your demo request has been received.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          One of our CargoMate experts will contact you within the next 24
          hours to schedule your personalized product demo and answer any
          questions you may have.
        </p>

        <button
          onClick={onClose}
          className="mt-6 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg px-6 py-2.5"
        >
          Close
        </button>
      </div>
    </div>
  );
}
