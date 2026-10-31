import { useState } from "react";
import { CalendarDays, X, ShieldCheck } from "lucide-react";

const jobRoles = [
  "Operations Manager",
  "Logistics Head",
  "Founder / CEO",
  "Procurement Manager",
  "Other",
];

export default function RequestDemoModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    phone: "",
    jobRole: "",
    requirements: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      onSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 py-8 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <CalendarDays className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900">
            Request Demo
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            See how ASD CargoMate can transform your logistics operations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name*"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              required
            />
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleChange}
              placeholder="Work Email*"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              required
            />
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name *"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number*"
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              required
            />
          </div>

          <select
            name="jobRole"
            value={formData.jobRole}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 text-gray-700"
            required
          >
            <option value="">Job Role *</option>
            {jobRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Tell us about your requirements"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg py-3 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Request Demo"}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            We respect your privacy. Your information is safe with us.
          </p>
        </form>
      </div>
    </div>
  );
}
