import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AddNewField from "./AddNewField";

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

const initialFields = [
  { id: 1, label: "Task Name", enabled: true },
  { id: 2, label: "Assigned To", enabled: true },
  { id: 3, label: "Priority", enabled: true },
  { id: 4, label: "Due Date", enabled: true },
  { id: 5, label: "SLA Time", enabled: true },
  { id: 6, label: "Task Status", enabled: true },
];

export default function TaskSlaSettings({place}) {
  const [fields, setFields] = useState(initialFields);
  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDesc, setSectionDesc] = useState("");
  const [placeHolder, setPlaceHolder] = useState("")

  const toggleField = (id) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  const startEdit = (field) => {
    setEditingId(field.id);
    setEditLabel(field.label);
  };

  const saveEdit = (id) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, label: editLabel } : f)));
    setEditingId(null);
  };

  const deleteField = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAddField = (field) => {
    setFields((prev) => [
      ...prev,
      { id: Date.now(), label: field.label || "New Field", enabled: field.required },
    ]);
    setShowAddModal(false);
  };

  const handleSave = async () => {
    try {
      await fetch("/api/task-sla-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields, sectionTitle, sectionDesc }),
      });
    } catch (err) {}
  };

  const handleReset = () => {
    setFields(initialFields);
    setSectionTitle("");
    setSectionDesc("");
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Task & SLA Settings</h2>
          <p className="text-xs text-gray-500">Manage internal tasks,assignments and SLA requirements</p>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium shrink-0"
        >
          Save Changes
        </button>
      </div>

      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-xs text-gray-500 mb-3 uppercase">Delivery & Task & SLA Fields</p>

        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.id} className="flex items-center justify-between gap-2">
              {editingId === f.id ? (
                <input
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-1 text-sm flex-1"
                />
              ) : (
                <span className="text-sm text-gray-800">{f.label}</span>
              )}
              <div className="flex items-center gap-3 shrink-0">
                <Toggle checked={f.enabled} onChange={() => toggleField(f.id)} />
                {editingId === f.id ? (
                  <button onClick={() => saveEdit(f.id)} className="text-xs text-green-600 font-medium">
                    Save
                  </button>
                ) : (
                  <button onClick={() => startEdit(f)}>
                    <Pencil className="w-4 h-4 text-gray-700" />
                  </button>
                )}
                <button onClick={() => deleteField(f.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600"
          >
            Add new field
          </button>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-4">
        <p className="font-semibold text-gray-900 text-sm mb-4">Field settings</p>

        <label className="block text-sm text-gray-700 mb-1">Section Title</label>
        <input
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
          placeholder="Task & SLA Managment"
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
        />

        <label className="block text-sm text-gray-700 mb-1">Section description</label>
        <textarea
          value={sectionDesc}
          onChange={(e) => setSectionDesc(e.target.value)}
          placeholder="Configure task, assignments and SLA rules"
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 mb-4"
        />

        <button onClick={handleReset} className="text-sm text-red-500 font-medium">
          Reset To Default
        </button>
      </div>

      {showAddModal && (
        <AddNewField
          placeVar={true}
          context="SLA Settings"
          onCancel={() => setShowAddModal(false)}
          onSave={handleAddField}
        />
      )}
    </div>
  );
}