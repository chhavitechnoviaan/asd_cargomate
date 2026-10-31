import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  ClipboardList,
  Clock,
  Pencil,
} from "lucide-react";
import { LuX } from "react-icons/lu";
const initialProfile = {
  fullName: "Arjun Soni",
  email: "arjun.soni@trwtech.in",
  phone: "+91 88175 07815",
  dob: "15 Aug 1994",
  gender: "Male",
  role: "Super Admin",
  department: "Management",
  address: "201, Tech Tower, Sector 62, Noida, Uttar Pradesh - 201309",
  joinedDate: "12 Jan 2024",
  lastLogin: "28 Jun 2026, 10:45 AM",
   profileImage: "",
};

const initialPermissions = [
  { module: "Dashboard", actions: ["View"] },
  { module: "Projects", actions: ["View", "Create", "Edit", "Delete"] },
  { module: "Leads", actions: ["View", "Create", "Edit", "Delete"] },
  { module: "Clients", actions: ["View", "Create", "Edit"] },
  { module: "Invoices", actions: ["View", "Create", "Edit", "Delete"] },
  { module: "Payments", actions: ["View"] },
  { module: "Reports", actions: ["View", "Export"] },
];

const allActions = ["View", "Create", "Edit", "Delete", "Export"];

export default function MyAccount({onClose}) {
  const [profile, setProfile] = useState(initialProfile);
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState(initialProfile);

  const [permissions, setPermissions] = useState(initialPermissions);
  const [editPermissions, setEditPermissions] = useState(false);
  const [permissionForm, setPermissionForm] = useState(initialPermissions);

  const handleProfileChange = (field) => (e) =>
    setProfileForm({ ...profileForm, [field]: e.target.value });

  const saveProfile = async () => {
    setProfile(profileForm);
    setEditProfile(false);
    try {
      await fetch("/api/account/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
    } catch (err) {}
  };

  const togglePermission = (module, action) => {
    setPermissionForm((prev) =>
      prev.map((p) => {
        if (p.module !== module) return p;
        const has = p.actions.includes(action);
        return {
          ...p,
          actions: has ? p.actions.filter((a) => a !== action) : [...p.actions, action],
        };
      })
    );
  };

  const savePermissions = async () => {
    setPermissions(permissionForm);
    setEditPermissions(false);
    try {
      await fetch("/api/account/permissions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(permissionForm),
      });
    } catch (err) {}
  };

  const infoClass = "w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0";
  const inputClass = "border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-full";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-6 rounded-xl">
    <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto space-y-4 bg-white p-5 rounded-2xl">
      <div>
        <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
        <button onClick={onClose}>
           <LuX className="text-lg"/>
        </button>
          </div>
        <p className="text-sm text-gray-500">Dashboard &lt; My Account</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center justify-end mb-6 gap-3">
          {/* <h2 className="text-lg sm:text-xl font-bold text-gray-900">Personal Information</h2> */}
          <button
            onClick={() => {
              if (editProfile) saveProfile();
              else {
                setProfileForm(profile);
                setEditProfile(true);
              }
            }}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg border border-blue-300 text-blue-600 text-sm font-medium shrink-0"
          >
            <Pencil className="w-3.5 h-3.5" />
            {editProfile ? "Save" : "Edit Profile"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shrink-0 relative">
            {profile.fullName.charAt(0)}
            <span className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
              <Pencil className="w-3 h-3 text-gray-600" />
            </span>
          </div> */}
          <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      const imageUrl = URL.createObjectURL(file);

                      setProfile((prev) => ({
                        ...prev,
                        profileImage: imageUrl,
                      }));
                    }
                  }}
                />

               <div className="relative w-20 h-20 shrink-0">
                      <label
                        htmlFor="profileImage"
                        className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold overflow-hidden cursor-pointer block"
                      >
                        {profile.profileImage ? (
                          <img
                            src={profile.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          profile.fullName.charAt(0)
                        )}
                      </label>

                      <label
                        htmlFor="profileImage"
                        className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow cursor-pointer z-10"
                      >
                        <Pencil size={14} className="text-gray-600" strokeWidth={2} />
                      </label>
                    </div>
              </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 flex-1">
            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Full Name</p>
                {editProfile ? (
                  <input
                    value={profileForm.fullName}
                    onChange={handleProfileChange("fullName")}
                    className={inputClass}
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-900">{profile.fullName}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <Star className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Role</p>
                <p className="text-sm font-semibold text-gray-900">{profile.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Email Address</p>
                {editProfile ? (
                  <input
                    value={profileForm.email}
                    onChange={handleProfileChange("email")}
                    className={inputClass}
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-900">{profile.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <ClipboardList className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Department</p>
                <p className="text-sm font-semibold text-gray-900">{profile.department}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <Phone className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Phone Number</p>
                {editProfile ? (
                  <input
                    value={profileForm.phone}
                    onChange={handleProfileChange("phone")}
                    className={inputClass}
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-900">{profile.phone}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <MapPin className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Address</p>
                {editProfile ? (
                  <input
                    value={profileForm.address}
                    onChange={handleProfileChange("address")}
                    className={inputClass}
                  />
                ) : (
                  <p className="text-sm font-semibold text-gray-900">{profile.address}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Date of Birth</p>
                <p className="text-sm font-semibold text-gray-900">{profile.dob}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <Calendar className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Joined Date</p>
                <p className="text-sm font-semibold text-gray-900">{profile.joinedDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Gender</p>
                <p className="text-sm font-semibold text-gray-900">{profile.gender}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={infoClass}>
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Last Login</p>
                <p className="text-sm font-semibold text-gray-900">{profile.lastLogin}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Permissions</h2>
            <p className="text-sm text-gray-500">
              Manage what actions and sections this user can access.
            </p>
          </div>
          <button
            onClick={() => {
              if (editPermissions) savePermissions();
              else {
                setPermissionForm(permissions);
                setEditPermissions(true);
              }
            }}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg border border-blue-300 text-blue-600 text-sm font-medium shrink-0"
          >
            <Pencil className="w-3.5 h-3.5" />
            {editPermissions ? "Save" : "Edit Permission"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-2 text-sm font-semibold text-gray-900 pb-2 border-b border-gray-100">
              <span>Module / Feature</span>
              <span>Permissions</span>
            </div>
            {(editPermissions ? permissionForm : permissions).map((p) => (
              <div
                key={p.module}
                className="grid grid-cols-2 items-center py-3 border-b border-gray-50"
              >
                <span className="text-sm text-gray-800">{p.module}</span>
                <div className="flex flex-wrap gap-3">
                  {editPermissions
                    ? allActions.map((action) => (
                        <label key={action} className="flex items-center gap-1 text-sm text-gray-600">
                          <input
                            type="checkbox"
                            checked={p.actions.includes(action)}
                            onChange={() => togglePermission(p.module, action)}
                            className="w-4 h-4 accent-blue-600"
                          />
                          {action}
                        </label>
                      ))
                    : p.actions.map((action) => (
                        <span key={action} className="text-sm text-blue-600">
                          {action}
                        </span>
                      ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div> 
    </div>
  );
}