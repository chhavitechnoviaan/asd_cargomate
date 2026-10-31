import { useState } from "react";
import { Mail } from "lucide-react";

export default function ChangeEmailAddress({ onSaved }) {
  const [form, setForm] = useState({
    oldEmail: "abc@gmail.com",
    newEmail: "",
    confirmEmail: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.newEmail)) {
      setError("Enter a valid email address");
      return;
    }
    if (form.newEmail !== form.confirmEmail) {
      setError("New email and confirm email do not match");
      return;
    }
    setError("");
    try {
      await fetch("/api/account/change-email", {
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
        <Mail className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Change Email Address</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Old Email</label>
          <input disabled value={form.oldEmail} className={inputClass + " bg-gray-50"} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">New Number</label>
          <input value={form.newEmail} onChange={handleChange("newEmail")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Confirm Number</label>
          <input
            value={form.confirmEmail}
            onChange={handleChange("confirmEmail")}
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