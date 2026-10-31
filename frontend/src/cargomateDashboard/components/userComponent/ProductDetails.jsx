import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import ModalShell from "./ModalShell";

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500";
const labelCls = "block text-sm font-semibold text-gray-900 mb-1.5";

const Req = () => <span className="text-red-500">*</span>;

const ProductDetails = ({ onClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    hsCode: "",
    productCategory: "",
    quantity: "",
    unit: "",
    dangerousGoods: "No",
    temperatureControlled: "No",
    netWeight: "",
    grossWeight: "",
    length: "",
    width: "",
    height: "",
    dimensionUnit: "CM",
    volumetricWeight: "",
    noOfPackages: "",
    packingType: "",
    stackable: "No",
    fragile: "No",
    batteryIncluded: "No",
    lithiumBattery: "No",
    unNumber: "",
    packageMarks: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/product-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Product details saved:", result);
      onClose?.();
    } catch (error) {
      console.error("Failed to submit product details:", error);
    }
  };

  const textField = (field, label, placeholder, required = true, type = "text") => (
    <div>
      <label className={labelCls}>
        {label} {required && <Req />}
      </label>
      <input
        type={type}
        value={formData[field]}
        onChange={handleChange(field)}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );

  const selectField = (field, label, placeholder, options) => (
    <div>
      <label className={labelCls}>
        {label} <Req />
      </label>
      <div className="relative">
        <select
          value={formData[field]}
          onChange={handleChange(field)}
          className={`${inputCls} appearance-none ${formData[field] ? "" : "text-gray-400"}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
      </div>
    </div>
  );

  const radioField = (field, label) => (
    <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
      <p className="text-sm font-semibold text-gray-900 mb-1.5">
        {label} <Req />
      </p>
      <div className="flex items-center gap-5">
        {["Yes", "No"].map((opt) => (
          <label key={opt} className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name={field}
              value={opt}
              checked={formData[field] === opt}
              onChange={handleChange(field)}
              className="accent-blue-600"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <ModalShell width="max-w-6xl">
      <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
          4
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Product Details</h2>
      </div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <FiX size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {textField("productName", "Product Details", "Enter product name")}
          {textField("productDescription", "Product Description", "Enter product description")}
          {selectField("hsCode", "HS Code", "Select HS Code", ["6109.10.00", "6205.20.00", "6204.62.00"])}
          {selectField("productCategory", "Product Category", "Select category", ["Apparel", "Electronics", "Machinery", "Food"])}

          {textField("quantity", "Quantity", "Enter quantity")}
          {selectField("unit", "Unit", "Select unit", ["Pieces", "Kg", "Boxes", "Pallets"])}
          {radioField("dangerousGoods", "Dangerous Goods (DG)")}
          {radioField("temperatureControlled", "Temperature Controlled")}

          {textField("netWeight", "Net Weight (Kg)", "Enter net weight")}
          {textField("grossWeight", "Gross Weight (Kg)", "Enter gross weight")}
          <div className="sm:col-span-2">
            <label className={labelCls}>
              Dimensions (L × W × H) <Req />
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                ["length", "Length"],
                ["width", "Width"],
                ["height", "Height"],
              ].map(([f, p]) => (
                <input
                  key={f}
                  type="text"
                  value={formData[f]}
                  onChange={handleChange(f)}
                  placeholder={p}
                  className={inputCls}
                />
              ))}
              <div className="relative">
                <select
                  value={formData.dimensionUnit}
                  onChange={handleChange("dimensionUnit")}
                  className={`${inputCls} appearance-none`}
                >
                  <option>CM</option>
                  <option>INCH</option>
                  <option>M</option>
                </select>
                <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {textField("volumetricWeight", "Volumetric Weight", "Auto Calculate")}
          {textField("noOfPackages", "No. of Packages", "Enter number")}
          {selectField("packingType", "Packing Type", "Select type", ["Carton", "Pallet", "Crate", "Bag"])}
          {radioField("stackable", "Stackable")}

          {radioField("fragile", "Fragile")}
          {radioField("batteryIncluded", "Battery Included")}
          {radioField("lithiumBattery", "Lithium Battery")}
        </div>

        <div className="border-t border-gray-100 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {textField("unNumber", "UN Number (if DG)", "Enter UN number", false)}
          {textField("packageMarks", "Package Marks & Numbers", "Enter marks & numbers", false)}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="w-full border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

export default ProductDetails;
