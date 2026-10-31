import { useState } from "react";
import { Users, Shield, User, Eye, Pencil, Trash2, Check } from "lucide-react";

const initialRoles = [
  {
    id: 1,
    name: "LC at Sight",
    desc: "Full access to all features and setting",
    members: 2,
    icon: Shield,
    iconColor: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: 2,
    name: "Manager",
    desc: "Manage team and department resources",
    members: 4,
    icon: User,
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 3,
    name: "User",
    desc: "Standard access to assigned resources",
    members: 12,
    icon: User,
    iconColor: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: 4,
    name: "Viewer",
    desc: "Read-only access to department data",
    members: 6,
    icon: Eye,
    iconColor: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export default function ManageRoles({ onClose }) {
  const [roles, setRoles] = useState(initialRoles);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", desc: "" });

  const startEdit = (role) => {
    setEditingId(role.id);
    setEditValues({ name: role.name, desc: role.desc });
  };

  const saveEdit = async (id) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name: editValues.name, desc: editValues.desc } : r))
    );
    setEditingId(null);
    try {
      await fetch("/api/roles/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
    } catch (err) {}
  };

  const deleteRole = async (id) => {
    setRoles((prev) => prev.filter((r) => r.id !== id));
    try {
      await fetch("/api/roles/" + id, { method: "DELETE" });
    } catch (err) {}
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl">
      <div className="flex items-center gap-3 p-4 sm:p-6 border-b border-gray-100">
        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Roles</h2>
          <p className="text-sm text-gray-500">Manage roles and permissions</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-4 px-4 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase">
            <span>Role name</span>
            <span>Description</span>
            <span className="text-center"> Members</span>
            <span>Actions</span>
          </div>

          {roles.map((role) => {
            const Icon = role.icon;
            const isEditing = editingId === role.id;
            return (
              <div
                key={role.id}
                className="grid grid-cols-4 items-center px-4 sm:px-6 py-3 border-t border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${role.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${role.iconColor}`} />
                  </div>
                  {isEditing ? (
                    <input
                      value={editValues.name}
                      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                      className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
                    />
                  ) : (
                    <span className="font-medium text-gray-900 text-sm">{role.name}</span>
                  )}
                </div>

                {isEditing ? (
                  <input
                    value={editValues.desc}
                    onChange={(e) => setEditValues({ ...editValues, desc: e.target.value })}
                    className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{role.desc}</span>
                )}
               <div className="flex items-center  justify-center"> 
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 text-sm flex items-center  justify-center">
                  {role.members}
                </span></div>

                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <button onClick={() => saveEdit(role.id)}>
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                  ) : (
                    <button onClick={() => startEdit(role)}>
                      <Pencil className="w-4 h-4 text-green-600" />
                    </button>
                  )}
                  <button onClick={() => deleteRole(role.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end p-4 sm:p-6">
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}