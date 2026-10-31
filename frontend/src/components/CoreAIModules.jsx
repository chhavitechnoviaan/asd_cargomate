import {
  Search,
  Tag,
  Waypoints,
  PackageSearch,
  FileText,
  Users,
} from "lucide-react";

const modules = [
  {
    icon: Search,
    title: "AI Search",
    desc: "Ask anything get instant, accurate shipping information.",
  },
  {
    icon: Tag,
    title: "Rate Explorer",
    desc: "Compare real-time rates from multiple carriers.",
  },
  {
    icon: Waypoints,
    title: "Route Planner",
    desc: "Discover the fastest & most effective routes.",
  },
  {
    icon: PackageSearch,
    title: "Shipment Tracker",
    desc: "Track your shipment in real time with AI updates.",
  },
  {
    icon: FileText,
    title: "Document AI",
    desc: "Automate document check and compliance clearance.",
  },
  {
    icon: Users,
    title: "Exporters",
    desc: "Visualize performance with advance AI analytics.",
  },
];

export default function CoreAIModules() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 sm:pb-16">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Core <span className="text-blue-600">AI Modules</span>
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Powerful modules built to automate, optimize, and accelerate your
          logistics operations.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {modules.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-blue-50 rounded-xl p-4 flex flex-col items-start"
          >
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
            <p className="mt-3 text-sm font-bold text-gray-900">{title}</p>
            <p className="mt-1 text-xs text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
