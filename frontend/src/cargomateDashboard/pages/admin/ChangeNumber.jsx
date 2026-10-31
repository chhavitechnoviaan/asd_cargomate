import { useState } from "react";
import { Phone } from "lucide-react";

export default function ChangeNumber({ onSaved }) {
  const [form, setForm] = useState({
    oldNumber: "123456789",
    newNumber: "",
    confirmNumber: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(form.newNumber.replace(/\s/g, "")) && form.newNumber.length < 9) {
      setError("Enter a valid phone number");
      return;
    }
    if (form.newNumber !== form.confirmNumber) {
      setError("New number and confirm number do not match");
      return;
    }
    setError("");
    try {
      await fetch("/api/account/change-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (onSaved) onSaved();
    } catch (err) {}
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-900";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Phone className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Change Number</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Old Number</label>
          <input
            disabled
            value={form.oldNumber}
            className={inputClass + " bg-gray-50"}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">New Number</label>
          <input
            value={form.newNumber}
            onChange={handleChange("newNumber")}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Confirm Number</label>
          <input
            value={form.confirmNumber}
            onChange={handleChange("confirmNumber")}
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-green-100 text-green-800 text-sm font-semibold hover:bg-green-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}