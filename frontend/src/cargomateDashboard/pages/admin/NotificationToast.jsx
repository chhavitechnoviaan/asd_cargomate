

import { useState } from "react";
import { LuX, LuTriangleAlert } from "react-icons/lu";

const initialNotifications = [
  {
    id: 1,
    icon: "5",
    iconBg: "bg-red-500",
    cardBg: "bg-red-50",
    title: "Pending",
    titleColor: "text-red-500",
    message: "You have 5 pending approvals that require your attention.",
    time: "2 min ago",
  },
  {
    id: 2,
    icon: "2",
    iconBg: "bg-orange-400",
    cardBg: "bg-orange-50",
    title: "Compliance",
    titleColor: "text-orange-500",
    message: "You have 2 compliance issue that need to be addressed.",
    time: "5 min ago",
  },
  {
    id: 3,
    icon: null,
    iconBg: "bg-yellow-400",
    cardBg: "bg-yellow-50",
    title: "API Failure Alert",
    titleColor: "text-yellow-600",
    message: "1 API integration is currently failing. Check and take actions.",
    time: "1 min ago",
  },
];

export default function NotificationToasts() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleClose = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-sm space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className={`relative rounded-2xl p-4 ${n.cardBg}`}>
            <button
              onClick={() => handleClose(n.id)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <LuX size={16} />
            </button>
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-semibold ${n.iconBg}`}>
                {n.icon ? n.icon : <LuTriangleAlert size={14} />}
              </div>
              <div className="pr-4">
                <p className={`text-sm font-semibold ${n.titleColor}`}>{n.title}</p>
                <p className="text-sm text-gray-700 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-400 mt-2">{n.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}