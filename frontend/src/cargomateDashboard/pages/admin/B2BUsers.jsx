import { useState } from "react";
import { Users, Search, Filter, Eye, Pencil, Trash2, Plus, X } from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Arjun Soni",
    email: "arjun.soni@gmail.com",
    company: "Example Pvt. Ltd.",
    phone: "9320018877",
    status: "Active",
    joined: "12 May 2024",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    email: "rahul.mehta@gmail.com",
    company: "Mehta Exports",
    phone: "9376543210",
    status: "Active",
    joined: "10 May 2024",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    company: "Sharma Traders",
    phone: "9123456780",
    status: "In Active",
    joined: "08 May 2024",
  },
  {
    id: 4,
    name: "Neha Verma",
    email: "neha.verma@gmail.com",
    company: "Verma Global",
    phone: "9988776611",
    status: "Active",
    joined: "05 May 2024",
  },
  {
    id: 5,
    name: "Karan Malhotra",
    email: "karan.malhotra@gmail.com",
    company: "Malhotra & co.",
    phone: "9890090909",
    status: "Active",
    joined: "01 May 2024",
  },
];

const emptyForm = { name: "", email: "", company: "", phone: "" };

export default function B2BUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState(emptyForm);
  const [viewingUser, setViewingUser] = useState(null);

  const filtered = users.filter((u) => {
    const term = search.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.company.toLowerCase().includes(term) ||
      u.phone.includes(term);
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddUser = async (e) => {
    e.preventDefault();
    const user = {
      id: Date.now(),
      ...newUser,
      status: "Active",
      joined: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    };
    setUsers((prev) => [user, ...prev]);
    setNewUser(emptyForm);
    setShowAddForm(false);
    try {
      await fetch("/api/b2b-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } catch (err) {}
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditValues(user);
  };

  const saveEdit = async (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? editValues : u)));
    setEditingId(null);
    try {
      await fetch("/api/b2b-users/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
    } catch (err) {}
  };

  const deleteUser = async (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    try {
      await fetch("/api/b2b-users/" + id, { method: "DELETE" });
    } catch (err) {}
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">B2B Users</h2>
            <p className="text-sm text-gray-500">Manage all business users and their access</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm((v) => !v)}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddUser}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 border border-gray-200 rounded-lg p-4"
        >
          <input
            required
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Company"
            value={newUser.company}
            onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Phone Number"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium sm:col-span-2 lg:col-span-1"
          >
            Save User
          </button>
        </form>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, company or phone"
            className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-600"
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowFilter((v) => !v)}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 w-full sm:w-auto justify-center"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-40">
              {["All", "Active", "In Active"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setStatusFilter(opt);
                    setShowFilter(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    statusFilter === opt ? "text-green-600 font-medium" : "text-gray-700"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-100 rounded-xl">
        <div className="min-w-[850px]">
          <div className="grid grid-cols-7 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-900">
            <span>Name</span>
            <span>Email</span>
            <span>Company</span>
            <span>Phone Number</span>
            <span>Status</span>
            <span>Joined on</span>
            <span>Action</span>
          </div>

          {filtered.map((u) => {
            const isEditing = editingId === u.id;
            return (
              <div
                key={u.id}
                className="grid grid-cols-7 items-center px-4 py-3 border-t border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs flex items-center justify-center shrink-0">
                    {u.name.charAt(0)}
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

                {isEditing ? (
                  <input
                    value={editValues.email}
                    onChange={(e) => setEditValues({ ...editValues, email: e.target.value })}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500 truncate">{u.email}</span>
                )}

                {isEditing ? (
                  <input
                    value={editValues.company}
                    onChange={(e) => setEditValues({ ...editValues, company: e.target.value })}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{u.company}</span>
                )}

                {isEditing ? (
                  <input
                    value={editValues.phone}
                    onChange={(e) => setEditValues({ ...editValues, phone: e.target.value })}
                    className="border border-gray-300 rounded-lg px-2 py-1 text-sm w-full"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{u.phone}</span>
                )}

                <span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      u.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {u.status}
                  </span>
                </span>

                <span className="text-sm text-gray-500">{u.joined}</span>

                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <button
                      onClick={() => saveEdit(u.id)}
                      className="text-xs text-green-600 font-medium"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button onClick={() => setViewingUser(u)}>
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button onClick={() => startEdit(u)}>
                        <Pencil className="w-4 h-4 text-gray-700" />
                      </button>
                      <button onClick={() => deleteUser(u.id)}>
                        <Trash2 className="w-4 h-4 text-gray-900" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <p className="text-sm text-gray-500">
          Showing 1-{filtered.length} of {users.length} results
        </p>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700"
          >
            Previous
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg border text-sm ${
                page === p
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              {p}
            </button>
          ))}
          <span className="text-gray-400 text-sm">...</span>
          <button
            onClick={() => setPage(9)}
            className={`w-9 h-9 rounded-lg border text-sm ${
              page === 9 ? "bg-green-600 text-white border-green-600" : "border-gray-300 text-gray-700"
            }`}
          >
            9
          </button>
          <button
            onClick={() => setPage((p) => Math.min(9, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm text-gray-700"
          >
            Next
          </button>
        </div>
      </div>

      {viewingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative">
            <button
              onClick={() => setViewingUser(null)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">{viewingUser.name}</h3>
            <p className="text-sm text-gray-500 mb-1">Email: {viewingUser.email}</p>
            <p className="text-sm text-gray-500 mb-1">Company: {viewingUser.company}</p>
            <p className="text-sm text-gray-500 mb-1">Phone: {viewingUser.phone}</p>
            <p className="text-sm text-gray-500 mb-1">Status: {viewingUser.status}</p>
            <p className="text-sm text-gray-500">Joined: {viewingUser.joined}</p>
          </div>
        </div>
      )}
    </div>
  );
}