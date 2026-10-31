import { useState } from "react";
import { Calendar, CheckCircle, X } from "lucide-react";

export default function BookDemoModal({ isOpen, onClose, onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleClose = () => {
    setSubmitted(false);
    setForm({
      fullName: "",
      companyName: "",
      workEmail: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error(err);
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-8">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Book a Demo</h2>
                <p className="text-blue-600">See ASD CARGOMATE in Action</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={handleChange("fullName")}
                  placeholder="Enter Full Name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={handleChange("companyName")}
                  placeholder="Enter Company Name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  value={form.workEmail}
                  onChange={handleChange("workEmail")}
                  placeholder="Enter Your Work Email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange("phone")}
                  placeholder="Enter Your Phone Number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={form.preferredDate}
                    onChange={handleChange("preferredDate")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={form.preferredTime}
                    onChange={handleChange("preferredTime")}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="Tell us what you'd like to explore..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-blue-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Calendar className="h-4 w-4" />
                  Book a Demo
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Demo Request Recieved!
            </h2>
            <p className="mt-2 font-medium text-blue-600">
              Thank you for booking a demo with ASD CARGOMATE
            </p>
            <p className="mt-2 max-w-xs text-sm text-gray-500">
              Our Team will review your request and contact you shortly to
              confirm your preference date and time.
            </p>
            <div className="mt-6 flex w-full gap-3">
              <button
                onClick={handleClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                <CheckCircle className="h-4 w-4" />
                Done
              </button>
              <button
                onClick={() => {
                  handleClose();
                  if (onNavigate) onNavigate("Home");
                }}
                className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-blue-600 hover:bg-gray-50"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
