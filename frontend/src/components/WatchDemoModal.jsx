import { X } from "lucide-react";
import { demoRenderers, ListDemo } from "./demoRenderers";

export default function WatchDemoModal({ module, onClose }) {
  if (!module) return null;
  const DemoComponent = demoRenderers[module.demoType] || ListDemo;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 py-8 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs p-5 relative">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-900">{module.title}</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <DemoComponent module={module} />
      </div>
    </div>
  );
}
