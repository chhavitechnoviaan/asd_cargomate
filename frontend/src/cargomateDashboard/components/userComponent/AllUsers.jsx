import { useState } from "react";
import { FiX } from "react-icons/fi";

const users = [
  { name: "Abhishek B.", role: "Admin" },
  { name: "Neha Sharma", role: "Manager" },
  { name: "Rohit Verma", role: "Analyst" },
  { name: "Neha Sharma", role: "Manager" },
  { name: "Amit Kumar", role: "Analyst" },
  { name: "System", role: "" },
  { name: "Priya Singh", role: "Manager" },
];

export default function AllUsersModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-5">
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">All Users</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {users.map((u, i) => (
            <button
              key={u.name + i}
              type="button"
              className="w-full text-left"
            >
              <p className="text-base font-bold text-gray-900">{u.name}</p>
              {u.role && <p className="text-sm text-gray-400">({u.role})</p>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

