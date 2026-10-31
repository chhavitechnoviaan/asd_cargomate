import { useState } from "react";
import { LuRadar } from "react-icons/lu";

const initialForm = {
  product: "Cotton",
};

export default function TradeOpportunityEngine() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState({ country: "UAE", flag: "\ud83c\udde6\ud83c\uddea", opportunity: "High", potential: "High" });
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
      const response = await fetch("/api/trade-opportunity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shrink-0">
            <LuRadar size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">Trade Opportunity Engine</h1>
            <p className="text-xs text-gray-500">discover potential market and trade opportunity for your product</p>
          </div>
        </div>

        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <input
              name="product"
              value={form.product}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-full border border-gray-200 text-sm text-gray-500 outline-none focus:ring-2 focus:ring-pink-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Opportunity</label>
            <div className="flex items-center justify-between px-4 py-2.5 rounded-full bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <span>{result.flag}</span> {result.country}
              </div>
              <span className="text-sm font-medium text-gray-900">{result.opportunity}</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Market potential</span>
            <span className="text-green-600 font-semibold">{result.potential}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Loading..." : "View Insights"}
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