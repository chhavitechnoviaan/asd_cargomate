import { useState } from "react";
import { LuBoxes } from "react-icons/lu";

const initialForm = {
  length: "100",
  width: "100",
  height: "100",
  unit: "CM",
  grossWeight: "12.0",
  netWeight: "11.0",
  volumetricWeight: "96",
  chargeableWeight: "120",
  cbm: "0.480",
  packageType: "Carton box",
  stackable: "Yes",
  fragile: "Yes",
  dangerousGoods: "NO",
  temperatureControl: "Yes",
  temperatureRange: "2 - 8* C",
  remarks: "",
};

function Field({ label, name, value, onChange, unit }) {
  return (
    <div>
      <label className="block text-sm whitespace-nowrap font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex rounded-lg border border-gray-300 overflow-hidden">
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 text-sm outline-none"
        />
        {unit && (
          <span className="px-3 py-2 text-xs text-gray-500 bg-gray-50 border-l border-gray-300 flex items-center">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export default function PackageDetails() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      setMessage("Package details saved successfully");
      console.log(data);
    } catch (err) {
      setMessage("Something went wrong while saving package details");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-8">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 shrink-0">
            <LuBoxes size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Package- Level Details</h1>
            <p className="text-sm text-gray-500">Enter details for each packages</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-5 text-sm font-medium">
            <span className="text-pink-500">Package 1</span>
            <span className="text-green-500">Box</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Field label="Length" name="length" value={form.length} onChange={handleChange} unit="CM" />
            <Field label="Widht" name="width" value={form.width} onChange={handleChange} unit="CM" />
            <Field label="Height" name="height" value={form.height} onChange={handleChange} unit="CM" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
              />
            </div>
            <Field label="Gross Weight" name="grossWeight" value={form.grossWeight} onChange={handleChange} unit="KG" />
            <Field label="Net Weight" name="netWeight" value={form.netWeight} onChange={handleChange} unit="KG" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <Field label="Volumetric weight" name="volumetricWeight" value={form.volumetricWeight} onChange={handleChange} unit="KG" />
            <Field label="Chargeable weight" name="chargeableWeight" value={form.chargeableWeight} onChange={handleChange} unit="KG" />
            <Field label="CBM" name="cbm" value={form.cbm} onChange={handleChange} unit="m" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Package type</label>
              <input
                name="packageType"
                value={form.packageType}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stackable</label>
              <input
                name="stackable"
                value={form.stackable}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fragile</label>
              <input
                name="fragile"
                value={form.fragile}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dangerous Goods(DG)</label>
              <input
                name="dangerousGoods"
                value={form.dangerousGoods}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm whitespace-nowrap font-medium text-gray-700 mb-1">Temperature Control</label>
                <input
                  name="temperatureControl"
                  value={form.temperatureControl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0">Range</label>
                <input
                  name="temperatureRange"
                  value={form.temperatureRange}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Remarks(optional)</label>
              <input
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Enter remarks...."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          {message && <p className="text-sm text-gray-500">{message}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="ml-auto px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Package"}
          </button>
        </div>
      </form>
    </div>
  );
}