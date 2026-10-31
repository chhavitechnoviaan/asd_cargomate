import { useState } from "react";
import { FiX, FiMessageCircle, FiUser, FiShield } from "react-icons/fi";

export default function ChatWithExpertModal({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phoneNumber: "",
    shipmentId: "",
    message: "",
  });

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/chat-with-expert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Chat request submitted:", result);
      onClose();
    } catch (error) {
      console.error("Failed to submit chat request:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <FiMessageCircle size={20} className="text-teal-500" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Chat with Expert
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1 ml-8">
          Conect with our export specialists for instant assistance.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Full Name<span className="text-gray-500">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Company Name<span className="text-gray-500">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="Enter your company name"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Email Address <span className="text-gray-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Phone Number <span className="text-gray-500">*</span>
              </label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => updateField("phoneNumber", e.target.value)}
                placeholder="Enter your phone number"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Shipment ID</label>
            <input
              type="text"
              value={formData.shipmentId}
              onChange={(e) => updateField("shipmentId", e.target.value)}
              placeholder="Enter shipment ID"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Message <span className="text-gray-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Briefly describe your query..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          <div className="bg-teal-50 rounded-xl p-3 flex items-start gap-2">
            <FiShield size={15} className="text-teal-600 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-600">
              Your information is secure and will only be used to assist you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              Start Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

