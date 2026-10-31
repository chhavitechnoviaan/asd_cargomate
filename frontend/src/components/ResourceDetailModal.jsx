import { X } from "lucide-react";

export default function ResourceDetailModal({ resource, onClose }) {
  if (!resource) return null;
  const Icon = resource.icon;
  const ItemIcon = resource.itemIcon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 py-8 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-full ${resource.color} flex items-center justify-center shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {resource.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{resource.desc}</p>
          </div>
        </div>

        <p className="mt-6 text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
          {resource.sectionTitle}
        </p>

        <div className="mt-3 divide-y divide-gray-100">
          {resource.items.map((item) => (
            <div key={item.title} className="py-3 flex items-start gap-3">
              {ItemIcon && (
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <ItemIcon className="w-4 h-4 text-gray-500" />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
