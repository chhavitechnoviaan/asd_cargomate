import { useState } from "react";
import { Shield, Star, Users, Radar, FileText, RefreshCcw, Webhook, Trash2 } from "lucide-react";

const initialStandards = [
  {
    id: 1,
    icon: Star,
    title: "API Versioning",
    desc: "Manage and support multiple API versions.",
  },
  {
    id: 2,
    icon: Users,
    title: "Role Permissions",
    desc: "Define access and permissions by user roles.",
  },
  {
    id: 3,
    icon: Radar,
    title: "Scope Checks",
    desc: "Ensure users access only allowed resources.",
  },
  {
    id: 4,
    icon: FileText,
    title: "Audit Logs",
    desc: "Track all actions and changes in the system.",
  },
  {
    id: 5,
    icon: RefreshCcw,
    title: "Idempotency",
    desc: "Prevent duplicate actions from repeated requests.",
  },
  {
    id: 6,
    icon: Webhook,
    title: "Webhook Signature Verification",
    desc: "Verify webhook request for secure integrations.",
  },
  {
    id: 7,
    icon: Trash2,
    title: "Soft Delete",
    desc: "Data is not permanently deleted, only archived.",
  },
];

export default function SecurityApiStandards() {
  const [standards, setStandards] = useState(
    initialStandards.map((s) => ({ ...s, enabled: true }))
  );

  const toggle = (id) => {
    setStandards((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
          <Shield className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Security & API Standards</h2>
          <p className="text-sm text-gray-500">Platform security and API best Practices</p>
        </div>
      </div>

      <div className="space-y-5">
        {standards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{s.title}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </div>
              <button
                onClick={() => toggle(s.id)}
                className={`text-sm font-medium shrink-0 ${
                  s.enabled ? "text-green-600" : "text-gray-400"
                }`}
              >
                {s.enabled ? "Enabled" : "Disabled"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}