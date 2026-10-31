import { useState } from "react";
import { LuPlus } from "react-icons/lu";

const initialForm = {
  categoryCode: "",
  categoryName: "",
  description: "",
  status: "Active",
};

export default function AddProductCategory({ onClose }) {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/product-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      await response.json();
      setForm(initialForm);
      handleClose();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-5 sm:p-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
              <LuPlus size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Add Product Category</h1>
              <p className="text-sm text-gray-500">Create a new product category</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Category Code</label>
              <input
                name="categoryCode"
                value={form.categoryCode}
                onChange={handleChange}
                placeholder="Enter country code"
                className="w-full px-4 py-2.5 rounded-full border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
              <p className="text-xs text-gray-400 mt-1">Unique code for the category</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Category Name</label>
              <input
                name="categoryName"
                value={form.categoryName}
                onChange={handleChange}
                placeholder="Sample Product 1"
                className="w-full px-4 py-2.5 rounded-full border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
              <p className="text-xs text-gray-400 mt-1">Enter category Name</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Description <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Enter description about product"
                className="w-full px-4 py-2.5 rounded-2xl border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-blue-100 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">Brief description about this category</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-full border border-gray-300 text-sm text-green-600 font-medium outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">Select category status</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 sm:px-8 py-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-lg border border-green-300 bg-green-50 text-green-700 text-sm font-semibold disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create New"}
          </button>
        </div>
      </form>
    </div>
  );
}