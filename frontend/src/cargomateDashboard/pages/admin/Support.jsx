
import { useState } from "react";
import { FiMoreVertical, FiX, FiSearch, FiChevronDown, FiUsers } from "react-icons/fi";
import { BsBuilding, BsHeadset, BsCode, BsCreditCard } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useEffect } from "react";
import API from "../../api/axios"; 

const accessKeys = ["DASHBOARD", "USERS", "REPORTS", "SETTINGS"];

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${checked ? "bg-teal-500" : "bg-gray-300"}`}
    >
      <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-0.5"}`} />
    </button>
  );
}

const avatarColors = ["bg-orange-400", "bg-blue-400", "bg-green-400", "bg-purple-400", "bg-pink-400", "bg-yellow-400"];

function Avatar({ name, index }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className={`w-7 h-7 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

const departmentIcons = {
  Sales: <BsBuilding className="text-teal-500" size={20} />,
  Support: <BsHeadset className="text-orange-400" size={20} />,
  Technical: <BsCode className="text-teal-500" size={20} />,
  Billing: <BsBuilding className="text-orange-400" size={20} />,
};

const departmentTypeOptions = ["Sales", "Support", "Technical", "Billing", "HR", "Finance"];



export default function Support() {
  const [departments, setDepartments] = useState([]);
  const [view, setView] = useState("list");
  const [editDept, setEditDept] = useState(null);
  const [access, setAccess] = useState({ Sales: { DASHBOARD: true, USERS: false, REPORTS: false, SETTINGS: false }, Support: {}, Technical: {}, Billing: {} });
  const [memberSearch, setMemberSearch] = useState("");
  const [memberDropOpen, setMemberDropOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", type: "Sales", members: [], status: true });
 
  const [accessMap, setAccessMap] = useState({});

  const [users, setUsers] = useState([]);

  const searchUsers = async (value) => {
    setMemberSearch(value);
  
    const res = await API.get(`/departments/users/search?search=${value}`);
    if (res.data.status) {
      setUsers(res.data.data);
      setMemberDropOpen(true);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchAccess();
  }, []);
  
  const fetchDepartments = async () => {
    const res = await API.get("/departments");
    if (res.data.status) {
      setDepartments(res.data.data);
    }
  };
  
  const fetchAccess = async () => {
    const res = await API.get("/departments/access/all");
  
    if (res.data.status) {
      const map = {};
  
      res.data.data.forEach((a) => {
        map[a.department._id] = a.permissions;
      });
  
      setAccessMap(map);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
  
    const payload = {
      name: form.name,
      description: form.description,
      type: form.type.toLowerCase(),
      members: form.members, 
      status: form.status,
    };
  
    if (editDept) {
      await API.put(`/departments/${editDept}`, payload);
    } else {
      await API.post("/departments", payload);
    }
  
    await fetchDepartments();
    setView("list");
  };

  const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const openCreate = () => {
    setForm({ name: "", description: "", type: "Sales", members: [], status: true });
    setEditDept(null);
    setView("create");
  };



  const openEdit = (dept) => {
    setForm({
      name: dept.name,
      description: dept.description,
      type: dept.type,
      members: dept.members.map((m) => m._id), 
      status: dept.status,
    });
  
    setEditDept(dept._id);
    setView("create");
  };

  const addMember = (user) => {
    if (!form.members.includes(user._id)) {
      handleChange("members", [...form.members, user._id]);
    }
    setMemberSearch("");
    setMemberDropOpen(false);
  };

  const removeMember = (id) => {
    handleChange(
      "members",
      form.members.filter((m) => m !== id)
    );
  };

  const toggleAccess = async (deptId, key) => {
    const current = accessMap[deptId] || {};
  
    const updated = {
      ...current,
      [key.toLowerCase()]: !current?.[key.toLowerCase()],
    };
  
    await API.put(`/departments/access/${deptId}`, {
      permissions: updated,
    });
  
    fetchAccess();
  };
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(memberSearch.toLowerCase()) &&
      !form.members.includes(u._id)
  );

 

  if (view === "create") {
    return (
      <div className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6 sm:py-8 ">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                <button onClick={() => setView("list")} className="font-bold text-gray-800 hover:text-teal-500 transition-colors">Support</button>
                <span className="text-gray-400">›</span>
                <span className="text-gray-700 font-medium">Create Department</span>
              </div>
              <p className="text-xs text-gray-500">Update department details and team members</p>
            </div>
            <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors flex-shrink-0">
              + Create Department
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-teal-600 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Department Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Sales Department"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Drives revenue by managing client relationships generating leads, and closing deals."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Department Type</label>
                  <div className="relative">
                    <select
                      value={form.type}
                      onChange={(e) => handleChange("type", e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300 appearance-none bg-white"
                    >
                      {departmentTypeOptions.map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <span className="text-yellow-500 text-sm">⚠</span>
                    <span className="text-xs text-yellow-700">Changing department type may affect role suggestions</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-teal-600 mb-3">Team Members</h3>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Add Team Members</label>
              <div className="relative mb-3">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                <input
                  type="text"
                  value={memberSearch}
                  onChange={(e) => searchUsers(e.target.value)}
                  onFocus={() => setMemberDropOpen(true)}
                  placeholder="Search users by name or email..."
                  className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                {memberDropOpen && filteredUsers.length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-40 overflow-y-auto">
                    {filteredUsers.map((u, i) => (
  <button
    key={u._id}
    onClick={() => addMember(u)}
    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
  >
    <Avatar name={u.name} index={i} />
    {u.name}
  </button>
))}
                  </div>
                )}
              </div>

              {form.members.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.members.map((m, i) => (
                    <div key={m} className="flex items-center gap-1.5 bg-gray-100 rounded-full pl-1 pr-2 py-0.5">
                      <Avatar name={m} index={i} />
                      <span className="text-xs text-gray-700">{m}</span>
                      <button onClick={() => removeMember(m)} className="text-gray-400 hover:text-gray-600 ml-0.5">
                        <FiX size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {form.members.length > 0 && (
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-teal-600 font-medium flex items-center gap-1">
                    <FiUsers size={13} /> {form.members.length} members selected
                  </span>
                  <button onClick={() => handleChange("members", [])} className="text-xs text-gray-400 hover:text-gray-600">Clear</button>
                </div>
              )}

              <div className="border border-dashed border-gray-300 rounded-lg py-4 text-center">
                <p className="text-sm text-gray-400">No members assigned</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-medium text-teal-600">Status</span>
              <Toggle checked={form.status} onChange={(val) => handleChange("status", val)} />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={() => setView("list")} className="flex-1 py-3 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="flex-1 py-3 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">You have unsaved changes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6 sm:py-8 ">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Support</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage user rooles and their permissions</p>
          </div>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors flex-shrink-0">
            + Create Department
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-start gap-3 mb-5">
          <HiOutlineOfficeBuilding className="text-teal-600 mt-0.5 flex-shrink-0" size={18} />
          <div>
            <p className="text-sm font-semibold text-teal-600">Department Role Assignment</p>
            <p className="text-xs text-gray-500 mt-0.5">When creating users, you can assign them to departments. The department's pre-configured roles and permissions will be automatically applied to the user.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {departments.map((dept) => (
            <div key={dept._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {departmentIcons[dept.name] || <BsBuilding className="text-teal-500" size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{dept.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{dept.description}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <FiMoreVertical size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-500 mb-1.5">Team Members</p>
              <div className="flex items-center gap-1 mb-3">
              {dept.members.slice(0, 4).map((m, i) => (
  <div key={m._id} style={{ marginLeft: i > 0 ? "-6px" : "0" }}>
    <Avatar name={m.name} index={i} />
  </div>
))}
                {dept.members.length > 4 && (
                  <span className="text-xs text-gray-500 ml-2">+{dept.members.length - 4}</span>
                )}
              </div>

              <p className="text-xs text-gray-500 mb-1.5">Department Roles</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
              {dept.roles.map((r) => (
  <span key={r._id} className="px-2 py-0.5 text-xs bg-teal-50 text-teal-700 rounded-full">
    {r.name}
  </span>
))}
              </div>

              <div className="flex gap-2">
                <button onClick={() => openEdit(dept)} className="flex-1 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Edit
                </button>
                <button className="flex-1 py-1.5 text-sm border border-teal-400 text-teal-500 rounded-lg hover:bg-teal-50 transition-colors">
                  Manage Roles
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Department Access Control</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-bold text-teal-500 pb-3 pr-4">DEPARTMENT</th>
                  {accessKeys.map((k) => (
                    <th key={k} className="text-center text-xs font-bold text-teal-500 pb-2 px-2">{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept._id} className="border-b border-gray-50 last:border-0">
                    <td className="py-1 pr-4 text-sm text-gray-700">{dept.name}</td>
                    {accessKeys.map((k) => (
                      <td key={k} className="py-1 px-2 text-center">
                        <input
                          type="checkbox"
                          checked={!!(accessMap[dept._id]?.[k.toLowerCase()])}
onChange={() => toggleAccess(dept._id, k)}
                          className="w-4 h-4 accent-teal-500 cursor-pointer"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
