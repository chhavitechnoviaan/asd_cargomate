import { useState } from "react";
import { LuGift } from "react-icons/lu";

const initialForm = {
  product: "Almond",
  destinationCountry: "UAE",
};

export default function IncentiveChecker() {
  const [form, setForm] = useState(initialForm);
  const [eligibleCount, setEligibleCount] = useState(2);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/incentives/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      setEligibleCount(data.eligibleCount ?? 0);
    } catch (err) {
      setEligibleCount(0);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 shrink-0">
            <LuGift size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">Incentive Checker</h1>
            <p className="text-xs text-gray-500">Check available export incentives and schemes</p>
          </div>
        </div>

        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <input
              name="product"
              value={form.product}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm text-gray-500 outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination Country</label>
            <input
              name="destinationCountry"
              value={form.destinationCountry}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm text-gray-500 outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Eligible Incentives</label>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-full bg-orange-50 border border-orange-100">
              <span className="text-orange-500 text-sm font-medium">{eligibleCount} Found</span>
              <LuGift className="text-orange-400" size={18} />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Checking..." : "View result"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}