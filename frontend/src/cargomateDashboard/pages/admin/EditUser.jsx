import { useState } from "react";
import { Headphones, X } from "lucide-react";

export default function EditUser({ user, onClose, onUpdated }) {
  const [form, setForm] = useState({
    fullName: user?.fullName || "Rahul Sharma",
    email: user?.email || "abc@gmail.com",
    phone: user?.phone || "123456789",
    companyName: user?.companyName || "xyz Traders",
    role: user?.role || "Importer",
    status: user?.status || "Active",
    assignedHandler: user?.assignedHandler || "Arjun Soni",
  });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const removeHandler = () => setForm({ ...form, assignedHandler: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/" + (user?.id || ""), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (onUpdated) onUpdated(data);
    } catch (err) {
      if (onUpdated) onUpdated(form);
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-500";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <Headphones className="w-6 h-6 text-purple-500" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Edit User</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
            <input value={form.fullName} onChange={handleChange("fullName")} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email Addres</label>
            <input value={form.email} onChange={handleChange("email")} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone No.</label>
            <input value={form.phone} onChange={handleChange("phone")} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Company Name</label>
            <input value={form.companyName} onChange={handleChange("companyName")} className={inputClass} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <input value={form.role} onChange={handleChange("role")} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Status</label>
            <select value={form.status} onChange={handleChange("status")} className={inputClass}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm text-gray-700 mb-1">Assigned Handler</label>
          {form.assignedHandler ? (
            <div className="w-full border border-gray-300 rounded-full px-4 py-2.5 flex items-center justify-between">
              <span className="text-sm text-gray-500">{form.assignedHandler}</span>
              <button type="button" onClick={removeHandler}>
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <select value="" onChange={handleChange("assignedHandler")} className={inputClass}>
              <option value="">Search and select handler</option>
              <option>Arjun Soni</option>
              <option>Neha Singh</option>
              <option>Vikram Patel</option>
            </select>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="submit"
            className="px-8 py-2.5 rounded-full bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}