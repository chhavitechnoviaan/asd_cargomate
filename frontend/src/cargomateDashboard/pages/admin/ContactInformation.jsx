import { Mail, Phone, Pencil, Info } from "lucide-react";

export default function ContactInformation({ onChangeEmail, onChangePhone }) {
  const email = "infoabc@gmail.com";
  const phone = "1234567890";

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Contact Information</h2>
        <p className="text-sm text-gray-500">You can update your phone no.,</p>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Mail className="w-4 h-4 text-gray-700 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">Email Address</p>
              <p className="text-sm text-gray-500 underline truncate">{email}</p>
            </div>
          </div>
          <button
            onClick={onChangeEmail}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium shrink-0"
          >
            <Pencil className="w-3.5 h-3.5" /> Change
          </button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Phone className="w-4 h-4 text-gray-700 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">Phone Number</p>
              <p className="text-sm text-gray-500">{phone}</p>
            </div>
          </div>
          <button
            onClick={onChangePhone}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium shrink-0"
          >
            <Pencil className="w-3.5 h-3.5" /> Change
          </button>
        </div>

        <div className="flex items-start gap-2 bg-blue-50 rounded-lg px-4 py-3">
          <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-500">
            For security reasons, you may need to verify your email pr phone number
          </p>
        </div>
      </div>
    </div>
  );
}