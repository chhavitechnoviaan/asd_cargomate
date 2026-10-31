// import { useState } from "react";
// import { Copy } from "lucide-react";

// export default function Documents() {
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     shipperCompanyName: "ABC Exports Pvt. Ltd.",
//     shipperContactPerson: "Aarav sharma",
//     shipperEmail: "aarav.sharma@gmail.com",
//     shipperPhone: "+91 74833 65549",
//     consigneeCompanyName: "Global Imports Inc.",
//     consigneeContactPerson: "John Williams",
//     consigneeEmail: "john.williams@gmail.com",
//     consigneePhone: "+1 202 555 0147",
//   });

//   const handleChange = (field) => (e) => {
//     setFormData({ ...formData, [field]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/shipment/documents", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setEditMode(false);
//     } catch (err) {}
//   };

//   const inputClass =
//     "w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 disabled:bg-gray-50";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-2xl mx-auto bg-white rounded-2xl  p-4 sm:p-6"
//     >
//       <div className="flex items-center justify-between mb-6 gap-3">
//         <div className="flex items-center gap-3 min-w-0">
//           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
//             <Copy className="w-6 h-6 text-blue-500" />
//           </div>
//           <div className="min-w-0">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Documents</h2>
//             <p className="text-sm text-gray-500 truncate">View and manage shipment documents</p>
//           </div>
//         </div>
//         <button
//           type="button"
//           onClick={() => setEditMode((v) => !v)}
//           className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0"
//         >
//           {editMode ? "Cancel" : "Edit Details"}
//         </button>
//       </div>

//       <div className="space-y-4">
//         <h3 className="font-semibold text-gray-900 text-sm">Shipper</h3>
//         <div className="grid sm:grid-cols-2 gap-4">
//           <div>
//               <label className="block text-sm text-gray-700 mb-1">Company Name</label>
//             <input
//               disabled={!editMode}
//               value={formData.shipperCompanyName}
//               onChange={handleChange("shipperCompanyName")}
//               className={inputClass}
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Contact Person</label>
//             <input
//               disabled={!editMode}
//               value={formData.shipperContactPerson}
//               onChange={handleChange("shipperContactPerson")}
//               className={inputClass}
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Category Name</label>
//             <input
//               disabled={!editMode}
//               value={formData.shipperEmail}
//               onChange={handleChange("shipperEmail")}
//               className={inputClass}
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Category Name</label>
//             <input
//               disabled={!editMode}
//               value={formData.shipperPhone}
//               onChange={handleChange("shipperPhone")}
//               className={inputClass}
//             />
//           </div>
//         </div>

//         <h3 className="font-semibold text-gray-900 text-sm">Consignee</h3>
//         <div className="grid sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Company Name</label>
//             <input
//               disabled={!editMode}
//               value={formData.consigneeCompanyName}
//               onChange={handleChange("consigneeCompanyName")}
//               className={inputClass}
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Contact Person</label>
//             <input
//               disabled={!editMode}
//               value={formData.consigneeContactPerson}
//               onChange={handleChange("consigneeContactPerson")}
//               className={inputClass}
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Email</label>
//             <input
//               disabled={!editMode}
//               value={formData.consigneeEmail}
//               onChange={handleChange("consigneeEmail")}
//               className={inputClass}
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">Contact Person</label>
//             <input
//               disabled={!editMode}
//               value={formData.consigneePhone}
//               onChange={handleChange("consigneePhone")}
//               className={inputClass}
//             />
//           </div>
//         </div>
//       </div>

//       {editMode && (
//         <div className="flex justify-end mt-6">
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </form>
//   );
// }



import { useState } from "react";
import { Copy } from "lucide-react";

export default function Documents() {
  const initialFormData = {
    shipperCompanyName: "ABC Exports Pvt. Ltd.",
    shipperContactPerson: "Aarav sharma",
    shipperEmail: "aarav.sharma@gmail.com",
    shipperPhone: "+91 74833 65549",
    consigneeCompanyName: "Global Imports Inc.",
    consigneeContactPerson: "John Williams",
    consigneeEmail: "john.williams@gmail.com",
    consigneePhone: "+1 202 555 0147",
  };

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const [savedData, setSavedData] = useState(initialFormData);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setSavedData(formData);
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend save
    setSavedData(formData);
    setEditMode(false);
  };

  const inputClass =
    "w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 disabled:bg-gray-50";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl  p-4 sm:p-6"
    >
      <div className="flex items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <Copy className="w-6 h-6 text-blue-500" />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Documents
            </h2>

            <p className="text-sm text-gray-500 truncate">
              View and manage shipment documents
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={editMode ? handleCancel : handleEdit}
          className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0"
        >
          {editMode ? "Cancel" : "Edit Details"}
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-sm">Shipper</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Company Name
            </label>

            <input
              disabled={!editMode}
              value={formData.shipperCompanyName}
              onChange={handleChange("shipperCompanyName")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Contact Person
            </label>

            <input
              disabled={!editMode}
              value={formData.shipperContactPerson}
              onChange={handleChange("shipperContactPerson")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Category Name
            </label>

            <input
              disabled={!editMode}
              value={formData.shipperEmail}
              onChange={handleChange("shipperEmail")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Category Name
            </label>

            <input
              disabled={!editMode}
              value={formData.shipperPhone}
              onChange={handleChange("shipperPhone")}
              className={inputClass}
            />
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm">Consignee</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Company Name
            </label>

            <input
              disabled={!editMode}
              value={formData.consigneeCompanyName}
              onChange={handleChange("consigneeCompanyName")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Contact Person
            </label>

            <input
              disabled={!editMode}
              value={formData.consigneeContactPerson}
              onChange={handleChange("consigneeContactPerson")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email
            </label>

            <input
              disabled={!editMode}
              value={formData.consigneeEmail}
              onChange={handleChange("consigneeEmail")}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Contact Person
            </label>

            <input
              disabled={!editMode}
              value={formData.consigneePhone}
              onChange={handleChange("consigneePhone")}
              className={inputClass}
            />
          </div>
        </div>
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