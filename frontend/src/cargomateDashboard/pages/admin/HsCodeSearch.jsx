import { useState } from "react";
import { Search } from "lucide-react";

export default function HsCodeSearch({ onClose }) {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState({
    code: "0.802.12.00",
    label: "Fruits, fresh or dried, almonds",
    confidence: 98,
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hs-code-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"> 
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
          <Search className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">HS Code search</h2>
          <p className="text-sm text-gray-500">Search and validates HS Codes for your products.</p>
        </div>
      </div>

      <label className="block text-sm font-semibold text-gray-900 mb-1">Product Description</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter products description"
        className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
      />

      <label className="block text-sm font-semibold text-gray-900 mb-1">Suggested HS Code</label>
      <div className="bg-green-100 rounded-xl px-4 py-4 flex items-center justify-between mb-4">
        <span className="text-xl font-bold text-green-700">{result.code}</span>
        <span className="text-sm text-gray-600">{result.label}</span>
      </div>

      <label className="block text-sm font-semibold text-gray-900 mb-1">Confidence</label>
      <p className="text-green-600 font-bold text-sm mb-1">{result.confidence}%</p>
      <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
        <div
          className="h-1 bg-green-500 rounded-full"
          style={{ width: `${result.confidence}%` }}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 rounded-full bg-purple-500 text-white text-sm hover:bg-purple-600 disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div></div>
  );
}