import { useState } from "react";

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
      checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
    }`}
  >
    <span className="w-4 h-4 bg-white rounded-full shadow" />
  </button>
);

export default function AddNewField({validationVar, currencyVar, optionsVar, placeVar, context = "", onCancel, onSave }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("Currency");
  const [required, setRequired] = useState(true);
  const [showInSummary, setShowInSummary] = useState(true);
  const [showInPdf, setShowInPdf] = useState(true);
  const [place,setPlace] = useState("")
    const [options, setOptions] = useState("");
  const [currency, setCurrency] = useState("")
  const [validation, setValidation] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const field = { label, type, required, showInSummary, showInPdf };
    try {
      await fetch("/api/fields", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(field),
      });
    } catch (err) {}
    if (onSave) onSave(field);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-sm"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Add New Field {context && <span className="text-gray-500 font-normal ">({context})</span>}
        </h3>
        <p className="text-sm text-gray-500 mb-4">Field Properties</p>
        <p className="text-xs text-gray-400 -mt-3 mb-4">Configure selected field properties</p>

        <label className="block text-sm text-gray-700 mb-1">Field Label</label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Task Name"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">Field Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
        >
          <option>Currency</option>
          <option>Number</option>
          <option>Text</option>
          <option>Dropdown</option>
          <option>Score</option>
        </select>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">Required Field</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Toggle checked={required} onChange={() => setRequired((v) => !v)} />
          <span className="text-sm text-gray-500">Yes, this field is required</span>
        </div>

      {placeVar && ( <div>
         <label className="block text-sm text-gray-700 mb-1">Place holder</label>
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Enter task name"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
        /></div>
        )}

      {optionsVar && ( 
         <div className="w-full">
              <label className="block text-sm   text-gray-800 mb-2">
                Options (one per line)
              </label>
              <textarea
                rows={4}
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                placeholder={`Export Import Domestic`}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div> )}
        
        {currencyVar && (
            <div>
         <label className="block text-sm text-gray-700 mb-1">Currency</label>
        <input
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          placeholder="INR"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
        /></div>

        )}

       { validationVar && (
           <div>
         <label className="block text-sm text-gray-700 mb-1">Validation</label>
        <input
          value={validation}
          onChange={(e) => setValidation(e.target.value)}
          placeholder="Select validation"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
        /></div>
       )}
        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={showInSummary}
            onChange={() => setShowInSummary((v) => !v)}
            className="w-4 h-4 accent-green-600"
          />
          <span className="text-sm text-gray-700">Show in Summary</span>
        </label>
        <label className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={showInPdf}
            onChange={() => setShowInPdf((v) => !v)}
            className="w-4 h-4 accent-green-600"
          />
          <span className="text-sm text-gray-700">Show in PDF/Print</span>
        </label>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600"
          >
            Update field
          </button>
        </div>
      </form>
    </div>
  );
}