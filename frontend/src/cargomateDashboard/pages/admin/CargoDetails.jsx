import { useState } from "react";
import { Package } from "lucide-react";

const fields = [
  ["productName", "Product Name"],
  ["hsCode", "HS Code"],
  ["packagingType", "Packaging Type"],
  ["totalPackages", "Total Packages"],
  ["netWeight", "Net Weight"],
  ["grossWeight", "Gross Weight"],
  ["volume", "Volume (CBM)"],
  ["cargoDescription", "Cargo Description"],
  ["dimensions", "Dimensions (Per Package)"],
  ["stackable", "Stackable"],
  ["fragile", "Fragile"],
  ["dg", "DG (Dangerous Goods)"],
  ["tempControl", "Temperature Control"],
];

export default function CargoDetails() {
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState({
    productName: "Almonds (Blanched)",
    hsCode: "0802.12.00",
    packagingType: "Cartons",
    totalPackages: "120",
    netWeight: "1500.00 KG",
    grossWeight: "1650.00 KG",
    volume: "3.250 CBM",
    cargoDescription: "Food Products",
    dimensions: "100*80*60 Cm",
    stackable: "Yes",
    fragile: "No",
    dg: "No",
    tempControl: "2-8 C",
  });

  const handleChange = (key) => (e) => setData({ ...data, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/shipment/cargo-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setEditMode(false);
    } catch (err) {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl  p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Cargo Details</h2>
            <p className="text-sm text-gray-500 truncate">View and manage cargo Information</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEditMode((v) => !v)}
          className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0"
        >
          {editMode ? "Cancel" : "Edit Details"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map(([key, label]) => (
          <div key={key}>
            <p className="text-sm text-gray-900 font-medium mb-1">{label}</p>
            {editMode ? (
              <input
                value={data[key]}
                onChange={handleChange(key)}
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600"
              />
            ) : (
              <p className="text-sm text-gray-500">{data[key]}</p>
            )}
          </div>
        ))}
      </div>

      {editMode && (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
}