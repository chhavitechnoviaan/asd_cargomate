import { useState } from "react";
import {  FaPlus, FaUser, FaUserTie, FaUserGear, FaUserShield, FaUserCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Toggle = ({ checked, onChange }) => (
  <div
    onClick={() => onChange(!checked)}
    className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer border transition ${
      checked
        ? "bg-teal-500 border-teal-500"
        : "bg-gray-100 border-gray-300"
    }`}
  >
    {checked && <span className="text-white text-xs">✓</span>}
  </div>
);

const moduleMap = {
  "Dashboard": "dashboard",
  "Booking Request": "booking",
  "Orders/Shipment": "shipment",
  "Tracking Updates": "tracking",
  "Documents": "documents",
  "Earnings": "earnings",
  "Ads/Marketplace": "ads",
  "Support": "support",
  "Settings": "settings"
};

const modules = ["Dashboard", "Booking Request", "Orders/Shipment", "Tracking Updates", "Documents", "Earnings", "Ads/Marketplace", "Support", "Settings"];
const permKeys = ["view", "add", "edit", "delete"];

function AddUserModal({ onClose, onAdd }) {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");

  const handleAdd = () => {
    if (!roleName.trim()) return;
    onAdd({ roleName, description, users: parseInt(users) || 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Add New Role</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Role Name</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Description</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Users</label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
              placeholder="Number of users"
              value={users}
              onChange={(e) => setUsers(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">
            Cancel
          </button>
          <button onClick={handleAdd} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RolesPermission() {
  const [roles, setRoles] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const selected = roles.find((r) => r.id === selectedId);

  const fetchRoles = async () => {
    try {
      const res = await API.get("/roles");
  
      const roleColors = [
        "bg-blue-500",
        "bg-orange-400",
        "bg-gray-400",
        "bg-indigo-500",
        "bg-green-500",
        "bg-purple-500"
      ];
  
      const roleIcons = [
        <FaUserTie className="text-white text-lg" />,
        <FaUserShield className="text-white text-lg" />,
        <FaUserGear className="text-white text-lg" />,
        <FaUserCheck className="text-white text-lg" />,
        <FaUser className="text-white text-lg" />
      ];
  
      const formatted = res.data.data.map((r, i) => ({
        id: r._id,
        name: r.name,
        users: r.userCount,
        permissions: r.permissions,
        color: roleColors[i % roleColors.length],
        icon: roleIcons[i % roleIcons.length],
        description: "Role access control"
      }));
  
      setRoles(formatted);
  
      if (formatted.length > 0) {
        setSelectedId(formatted[0].id);
      }
  
    } catch (err) {
      toast.error("Failed to load roles ❌");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const togglePerm = (mod, key) => {
    const backendKey = moduleMap[mod];
  
    setRoles((prev) =>
      prev.map((r) =>
        r.id === selectedId
          ? {
              ...r,
              permissions: {
                ...r.permissions,
                [backendKey]: {
                  ...r.permissions[backendKey],
                  [key]: !r.permissions[backendKey][key]
                }
              }
            }
          : r
      )
    );
  };

  const handleSave = async () => {
    try {
      const selectedRole = roles.find(r => r.id === selectedId);
  
      await API.put(`/roles/${selectedId}`, {
        name: selectedRole.name,
        permissions: selectedRole.permissions
      });
  
      toast.success("Permissions updated ✅");
  
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  const handleAddRole = async ({ roleName }) => {
    try {
      await API.post("/roles", {
        name: roleName,
        permissions: {}
      });
  
      toast.success("Role created ✅");
  
      fetchRoles();
  
    } catch (err) {
      toast.error("Create failed ❌");
    }
  };

  const handleRoleClick = (id) => {
    setSelectedId(id);
    setShowRight(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {showModal && <AddUserModal onClose={() => setShowModal(false)} onAdd={handleAddRole} />}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-semibold text-gray-800">Roles & Permissions</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage user rooles and their permissions</p>
          </div>
          {/* <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <FaPlus className="text-xs" /> Add User
          </button> */}
        </div>

        <div className="flex flex-col lg:flex-row gap-4">

          {/* LEFT - ROLES LIST */}
          <div className={`w-full lg:w-72 xl:w-80 flex-shrink-0 ${showRight ? "hidden lg:block" : "block"}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">Roles</h2>
              <div className="flex flex-col gap-2">
                {roles.map((role) => (
                  <div
  key={role.id}
  onClick={() => handleRoleClick(role.id)}
  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
    selectedId === role.id
      ? "border-teal-200 bg-teal-50"
      : "border-gray-200 hover:bg-gray-50"
  }`}
>
  {/* ICON */}
  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${role.color}`}>
    {role.icon}
  </div>

  {/* TEXT */}
  <div className="flex flex-col">
    <p className="text-lg font-medium text-gray-800">
      {role.name}
    </p>

    <p className="text-xs text-gray-400">
      {role.description}
    </p>

    <p className="text-xs text-gray-400 mt-1">
      {role.users} users
    </p>
  </div>
</div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - PERMISSIONS TABLE */}
          <div className={`flex-1 min-w-0 ${showRight ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">

              <div className="flex items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-2">
                  {showRight && (
                    <button onClick={() => setShowRight(false)} className="lg:hidden w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <FaTimes />
                    </button>
                  )}
                  <h2 className="text-xl font-semibold text-gray-800">
  {selected?.name}
</h2>
                </div>
                <button
  onClick={handleSave}
  className="bg-teal-500 hover:bg-teal-600 text-sm text-white px-3 py-2 rounded-xl"
>
  Save Changes
</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[380px]">
                <thead>
  <tr className="bg-blue-50">
    <th className="text-left text-lg font-semibold text-[#18599A] px-4 py-3 w-1/2">
      MODULE
    </th>

    {permKeys.map((k) => (
      <th
        key={k}
        className="text-left text-lg font-medium text-[#18599A] px-8 py-3 uppercase"
      >
        {k}
      </th>
    ))}
  </tr>
</thead>
<tbody>
  {modules.map((mod) => (
    <tr key={mod} className="border-b hover:bg-gray-50 transition">
      
      {/* MODULE NAME */}
      <td className="text-lg text-gray-700 px-4 py-4 font-medium">
        {mod}
      </td>

      {/* PERMISSIONS */}
      {permKeys.map((key) => (
        <td key={key} className="text-center py-3">
          <div className="flex justify-center">
            <Toggle
              checked={
                selected?.permissions[moduleMap[mod]]?.[key] || false
              }
              onChange={() => togglePerm(mod, key)}
            />
          </div>
        </td>
      ))}
    </tr>
  ))}
</tbody>
                </table>
              </div>

              <div className="mt-6 border border-teal-200 bg-teal-50/50 rounded-xl p-4">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-700">Note : </span>
                  When assigning this role to a user, these permissions will be automatically applied. You can save this role configuration for reuse across multiple users.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}