import { useState } from "react";
import FreightInvoicePreview from "../FreightInvoicePreview";
import { CircleDollarSign, CalendarDays } from "lucide-react";

export default function CreateInvoice({ onClose, onCreated }) {
  const [form, setForm] = useState({
    customerSupplier: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.customerSupplier ||
      !form.invoiceNumber ||
      !form.invoiceDate ||
      !form.dueDate ||
      !form.amount
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerSupplier: form.customerSupplier,
          invoiceNumber: form.invoiceNumber,
          invoiceDate: form.invoiceDate,
          dueDate: form.dueDate,
          amount: Number(form.amount),
          description: form.description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create invoice");
      }

      if (onCreated) {
        onCreated(data);
      }

      onClose();
    } catch (err) {
      console.error("Create invoice error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-400 rounded-full px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 placeholder:text-gray-400";

  const dateInputClass =
    "w-full border border-gray-400 rounded-full px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600";

  return (
    <>
    {preview && <FreightInvoicePreview data={form} onClose={() => setPreview(false)} />}
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-[515px] max-h-[90vh] overflow-y-auto p-6 sm:p-7"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-10">
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <CircleDollarSign
              className="w-8 h-8 text-fuchsia-500"
              strokeWidth={2}
            />
          </div>

          <div>
            <h2 className="text-[28px] leading-8 font-bold text-black">
              Create Invoice
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Generate a new invoice
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Customer / Supplier */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Customer/ Supplier
          </label>

          <select
            value={form.customerSupplier}
            onChange={handleChange("customerSupplier")}
            className={inputClass}
          >
            <option value="">Select customer or supplier</option>
            <option value="Rahul Sharma">Rahul Sharma</option>
            <option value="ABC Traders">ABC Traders</option>
            <option value="XYZ Suppliers">XYZ Suppliers</option>
          </select>
        </div>

        {/* Invoice Number */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Invoice Number
          </label>

          <input
            type="text"
            value={form.invoiceNumber}
            onChange={handleChange("invoiceNumber")}
            placeholder="Enter invoice number"
            className={inputClass}
          />
        </div>

        {/* Invoice Date + Due Date */}
        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Invoice Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Invoice Date
            </label>

            <div className="relative">
              <input
                type="date"
                value={form.invoiceDate}
                onChange={handleChange("invoiceDate")}
                className={dateInputClass}
              />

             
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Due Date
            </label>

            <div className="relative">
              <input
                type="date"
                value={form.dueDate}
                onChange={handleChange("dueDate")}
                className={dateInputClass}
              />

            
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Amount
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={handleChange("amount")}
            placeholder="Enter amount"
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div className="mb-10">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Description{" "}
            <span className="text-gray-500 font-medium">(Optional)</span>
          </label>

          <input
            type="text"
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Enter description"
            className={inputClass}
          />
        </div>

        {/* Buttons */}
        <button type="button" className="mb-3 rounded border border-teal-600 px-4 py-2 text-teal-700" onClick={() => setPreview(true)}>Freight Invoice Preview / Print</button>
        <div className="flex justify-end items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-fuchsia-700 text-white text-sm font-medium hover:bg-fuchsia-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
    </>
  );
}