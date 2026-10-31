import { useState } from "react";
import { Calculator } from "lucide-react";

export default function FreightCalculator({ onClose }) {
  const [form, setForm] = useState({
    origin: "Mumbai, India",
    destination: "Dubai, UAE",
    mode: "Sea freight",
    weight: "1000 KG",
  });
  const [estimate, setEstimate] = useState("24,860 RS.");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/freight-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setEstimate(data.estimate);
    } catch (err) {
      const weightNum = parseFloat(form.weight) || 0;
      setEstimate(`${Math.round(weightNum * 24.86).toLocaleString()} RS.`);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600";

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Calculator className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Freight Calculator</h2>
          <p className="text-sm text-gray-500">Estimate freight cost for your shipment.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">Origin</label>
          <input value={form.origin} onChange={handleChange("origin")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">Destination</label>
          <input
            value={form.destination}
            onChange={handleChange("destination")}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">Mode</label>
          <input value={form.mode} onChange={handleChange("mode")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">Shipment Weight</label>
          <input value={form.weight} onChange={handleChange("weight")} className={inputClass} />
        </div>

        <div className="bg-blue-100 border border-blue-200 rounded-lg px-4 py-4">
          <p className="text-blue-700 font-bold">Estimated Freight</p>
          <p className="text-blue-700 font-bold text-lg">{estimate}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleCalculate}
          disabled={loading}
          className="px-6 py-2 rounded-full bg-purple-500 text-white text-sm hover:bg-purple-600 disabled:opacity-60"
        >
          {loading ? "Calculating..." : "Calculate"}
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}