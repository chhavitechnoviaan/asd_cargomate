import { useState } from "react";
import { Users, User, UserX, Users2, Pencil, Trash2 } from "lucide-react";
import AssignNewUser from "./AssignNewUser";

const initialUsers = [
  { id: 1, name: "Rahul Sharma", email: "abc@gmail.com", handler: "Arjun Soni", status: "Active", assignedOn: "20 May 2025" },
  { id: 2, name: "Manvi Nayak", email: "abc@gmail.com", handler: "Neha Singh", status: "Active", assignedOn: "20 May 2025" },
  { id: 3, name: "Rajesh Singh", email: "abc@gmail.com", handler: "Vikram Patel", status: "Active", assignedOn: "20 May 2025" },
  { id: 4, name: "Prince Yadav", email: "abc@gmail.com", handler: "Arjun Soni", status: "Active", assignedOn: "20 May 2025" },
  { id: 5, name: "Yashi Pal", email: "abc@gmail.com", handler: "-", status: "Unassigned", assignedOn: "20 May 2025" },
  { id: 6, name: "Yavi Singh", email: "abc@gmail.com", handler: "-", status: "Unassigned", assignedOn: "20 May 2025" },
];

const avatarColors = ["bg-purple-100 text-purple-700", "bg-pink-100 text-pink-700", "bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-yellow-100 text-yellow-700", "bg-rose-100 text-rose-700"];

export default function UserAssignments() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [handlerFilter, setHandlerFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  const handlers = [...new Set(users.map((u) => u.handler).filter((h) => h !== "-"))];

  const filtered = users.filter((u) => {
    const term = search.toLowerCase();
    const matchesSearch = u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
    const matchesHandler = !handlerFilter || u.handler === handlerFilter;
    const matchesStatus = !statusFilter || u.status === statusFilter;
    return matchesSearch && matchesHandler && matchesStatus;
  });

  const clearFilters = () => {
    setSearch("");
    setHandlerFilter("");
    setStatusFilter("");
  };

  const startEdit = (u) => {
    setEditingId(u.id);
    setEditValues(u);
  };

  const saveEdit = async (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? editValues : u)));
    setEditingId(null);
    try {
      await fetch("/api/user-assignments/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
    } catch (err) {}
  };

  const deleteUser = async (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    try {
      await fetch("/api/user-assignments/" + id, { method: "DELETE" });
    } catch (err) {}
  };

  const handleAssigned = (data) => {
    setUsers((prev) => [
      {
        id: Date.now(),
        name: data.fullName,
        email: data.email,
        handler: data.handler,
        status: data.status,
        assignedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      },
      ...prev,
    ]);
    setShowAssignModal(false);
  };

  const stats = [
    { icon: User, iconColor: "text-purple-600", bg: "bg-purple-50", label: "Total User", value: users.length, sub: "All Users" },
    { icon: User, iconColor: "text-blue-600", bg: "bg-blue-50", label: "Assign User", value: users.filter((u) => u.handler !== "-").length, sub: "With Handler" },
    { icon: UserX, iconColor: "text-orange-500", bg: "bg-orange-50", label: "Unassigned User", value: users.filter((u) => u.handler === "-").length, sub: "No Handler" },
    { icon: Users2, iconColor: "text-green-600", bg: "bg-green-50", label: "Total Handlers", value: handlers.length, sub: "Active Handlers" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Assignments</h2>
            <p className="text-sm text-gray-500">Assign and Manage users with handlers.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAssignModal(true)}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 self-start sm:self-auto"
        >
          + Assign User
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="border border-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${s.iconColor}`} />
                </div>
                <span className="text-sm text-gray-600">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2.5 text-sm"
        />
        <select
          value={handlerFilter}
          onChange={(e) => setHandlerFilter(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-600"
        >
          <option value="">Filter by Handler</option>
          {handlers.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-600"
        >
          <option value="">Filter by Status</option>
          <option>Active</option>
          <option>Unassigned</option>
        </select>
        <button
          onClick={clearFilters}
          className="border border-purple-300 rounded-full px-4 py-2.5 text-sm text-purple-600"
        >
          Clear
        </button>
        <button className="bg-blue-600 text-white rounded-full px-6 py-2.5 text-sm font-medium">
          Apply
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-6 px-4 py-3 text-sm font-bold text-gray-900 border-b border-gray-100">
            <span>User</span>
            <span>Email</span>
            <span>Assigned Handler</span>
            <span>Status</span>
            <span>Assigned on</span>
            <span>Action</span>
          </div>

          {filtered.map((u, idx) => {
            const isEditing = editingId === u.id;
            return (
              <div key={u.id} className="grid grid-cols-6 items-center px-4 py-3 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${avatarColors[idx % avatarColors.length]}`}>
                    {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                  {isEditing ? (
                    <input
                      value={editValues.name}
                      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    <span className="text-sm text-gray-800">{u.name}</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{u.email}</span>
                {isEditing ? (
                  <input
                    value={editValues.handler}
                    onChange={(e) => setEditValues({ ...editValues, handler: e.target.value })}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{u.handler}</span>
                )}
                <span className={`text-sm font-medium ${u.status === "Active" ? "text-green-600" : "text-orange-500"}`}>
                  {u.status}
                </span>
                <span className="text-sm text-gray-500">{u.assignedOn}</span>
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <button onClick={() => saveEdit(u.id)} className="text-xs text-green-600 font-medium">
                      Save
                    </button>
                  ) : (
                    <button onClick={() => startEdit(u)}>
                      <Pencil className="w-4 h-4 text-gray-700" />
                    </button>
                  )}
                  <button onClick={() => deleteUser(u.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAssignModal && (
        <AssignNewUser onClose={() => setShowAssignModal(false)} onAssigned={handleAssigned} />
      )}
    </div>
  );
}