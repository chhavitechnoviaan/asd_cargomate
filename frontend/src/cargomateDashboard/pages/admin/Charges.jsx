import { useState } from "react";
import { DollarSign, Pencil, Trash2, Check } from "lucide-react";

const initialCharges = [
  { id: 1, name: "Ocean Freight", type: "Freight", currency: "USD", amount: "1,500.00" },
  { id: 2, name: "Documentation fees", type: "Local Charges", currency: "USD", amount: "75.00" },
  { id: 3, name: "Handling charges", type: "Local Charges", currency: "USD", amount: "50.00" },
  { id: 4, name: "THC", type: "Local Charges", currency: "USD", amount: "100.00" },
];

export default function Charges() {
  const [charges, setCharges] = useState(initialCharges);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const startEdit = (charge) => {
    setEditingId(charge.id);
    setEditValues(charge);
  };

  const saveEdit = async (id) => {
    setCharges((prev) => prev.map((c) => (c.id === id ? editValues : c)));
    setEditingId(null);
    try {
      await fetch("/api/shipment/charges/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
    } catch (err) {}
  };

  const deleteCharge = async (id) => {
    setCharges((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch("/api/shipment/charges/" + id, { method: "DELETE" });
    } catch (err) {}
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl ">
      <div className="flex items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6 text-purple-500" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Charges</h2>
            <p className="text-sm text-gray-500 truncate">View and manage shipment charges</p>
          </div>
        </div>
        <button className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0">
          Edit Details
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[650px]">
          <div className="grid grid-cols-5 px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">
            <span>Charge Name</span>
            <span>Type</span>
            <span>Currency</span>
            <span>Amount</span>
            <span>Action</span>
          </div>

          {charges.map((charge) => {
            const isEditing = editingId === charge.id;
            return (
              <div
                key={charge.id}
                className="grid grid-cols-5 items-center px-4 sm:px-6 py-3 border-t border-gray-100"
              >
                {isEditing ? (
                  <input
                    value={editValues.name}
                    onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-700">{charge.name}</span>
                )}

                {isEditing ? (
                  <input
                    value={editValues.type}
                    onChange={(e) => setEditValues({ ...editValues, type: e.target.value })}
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{charge.type}</span>
                )}

                {isEditing ? (
                  <input
                    value={editValues.currency}
                    onChange={(e) => setEditValues({ ...editValues, currency: e.target.value })}
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{charge.currency}</span>
                )}

                {isEditing ? (
                  <input
                    value={editValues.amount}
                    onChange={(e) => setEditValues({ ...editValues, amount: e.target.value })}
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{charge.amount}</span>
                )}

                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <button onClick={() => saveEdit(charge.id)}>
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                  ) : (
                    <button onClick={() => startEdit(charge)}>
                      <Pencil className="w-4 h-4 text-gray-700" />
                    </button>
                  )}
                  <button onClick={() => deleteCharge(charge.id)}>
                    <Trash2 className="w-4 h-4 text-gray-900" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}