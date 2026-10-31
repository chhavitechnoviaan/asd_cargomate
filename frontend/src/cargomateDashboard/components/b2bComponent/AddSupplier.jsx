import React, { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const countryOptions = ["India", "United States", "United Kingdom", "Australia", "Canada"];
const paymentTermsOptions = ["Net 15", "Net 30", "Net 45", "Net 60", "Due on Receipt"];
const currencyOptions = ["INR", "USD", "EUR", "GBP", "AUD"];

const initialFormState = {
  supplierName: "",
  companyName: "",
  email: "",
  phoneNumber: "",
  country: "",
  city: "",
  address: "",
  gstNumber: "",
  paymentTerms: "",
  currency: "",
  creditLimit: "",
  notes: "",
};

export default function AddSupplier({ onClose }) {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save supplier");
      }

      const data = await response.json();
      console.log("Supplier saved:", data);
      setFormData(initialFormState);
      if (onClose) onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl my-4 sm:my-0 flex flex-col max-h-[90vh]">
        <div className="flex items-start justify-between px-4 sm:px-6 pt-5 pb-4 shrink-0">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
              <HiOutlineUserGroup className="text-indigo-500 text-lg" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">Add Supplier</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Enter supplier details to add a new supplier.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 space-y-4"
        >
          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="border border-gray-100 rounded-xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Supplier Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  Supplier Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  placeholder="Enter Your SupplierName"
                  required
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter Your Company Name"
                  required
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter Your Full Phone Number"
                  required
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none"
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  {countryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter City"
                  required
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Your Full Address"
                required
                rows={3}
                className="w-full text-sm rounded-2xl border border-gray-200 px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 resize-none"
              />
            </div>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Business Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  GST / Tax Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleChange}
                  placeholder="Enter GST/ Text Number"
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  Payment Terms
                </label>
                <select
                  name="paymentTerms"
                  value={formData.paymentTerms}
                  onChange={handleChange}
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none"
                >
                  <option value="" disabled>
                    Select Payment Terms
                  </option>
                  {paymentTermsOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  Currency
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 appearance-none"
                >
                  <option value="" disabled>
                    Select Currency
                  </option>
                  {currencyOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                  Credit Limit (optional)
                </label>
                <input
                  type="number"
                  name="creditLimit"
                  value={formData.creditLimit}
                  onChange={handleChange}
                  placeholder="Enter Creadit Limit"
                  className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-800 mb-1.5">
                Notes Optional
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter any additional notes"
                className="w-full text-sm rounded-full border border-gray-200 px-4 py-2.5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
              />
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Supplier"}
          </button>
        </div>
      </div>
    </div>
  );
}