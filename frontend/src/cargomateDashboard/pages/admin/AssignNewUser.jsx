import { useState } from "react";
import { UserPlus, X, Info } from "lucide-react";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  status: "Active",
  handler: "",
};

export default function AssignNewUser({ onClose, onAssigned }) {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (onAssigned) onAssigned(data);
    } catch (err) {
      if (onAssigned) onAssigned(form);
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <UserPlus className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Assign New User</h2>
              <p className="text-xs text-gray-500">Add a new user and assign to a handler.</p>
            </div>
          </div>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-gray-900 text-sm mb-4">User Information</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name *</label>
              <input
                required
                value={form.fullName}
                onChange={handleChange("fullName")}
                placeholder="Enter Your Full Name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email Address *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="Enter Email Address"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Phone Number *</label>
              <input
                required
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="Enter Your Full Phone Number"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Company *</label>
              <input
                required
                value={form.company}
                onChange={handleChange("company")}
                placeholder="Enter Your Company Name"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Role *</label>
              <select
                required
                value={form.role}
                onChange={handleChange("role")}
                className={inputClass}
              >
                <option value="">Select Role</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>User</option>
                <option>Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={handleChange("status")} className={inputClass}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <p className="font-bold text-gray-900 mb-3">Assign Handler</p>
          <label className="block text-sm text-gray-700 mb-1">Select Handler *</label>
          <select
            required
            value={form.handler}
            onChange={handleChange("handler")}
            className={inputClass + " mb-4"}
          >
            <option value="">Search and select handler</option>
            <option>Arjun Soni</option>
            <option>Neha Singh</option>
            <option>Vikram Patel</option>
          </select>

          <div className="flex items-start gap-2 bg-purple-50 rounded-lg px-4 py-3">
            <Info className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
            <p className="text-sm text-purple-600">
              The selected handler will be responsible for this user and will be able to manage their
              requests.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Assign User
          </button>
        </div>
      </form>
    </div>
  );
}