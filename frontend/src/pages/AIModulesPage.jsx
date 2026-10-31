import { useState } from "react";
import { ArrowRight } from "lucide-react";
import AIModulesHero from "../components/AIModulesHero";
import ModuleDetailModal from "../components/ModuleDetailModal";
import Footer from "../components/Footer";
import NeedHelp from "../components/NeedHelpBanner";
import { aiModules } from "../data/aiModules";

export default function AIModulesPage({ onNavigate }) {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div>
      <AIModulesHero />

      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900">
          All AI Modules
        </h2>
        <p className="mt-1 text-center text-sm text-gray-500">
          Click on any module to explore its features, demos, screenshots and
          workflow
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {aiModules.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedModule(m)}
              className="border border-gray-200 rounded-xl p-4 text-left hover:border-blue-300"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <m.icon className="w-4 h-4 text-blue-600" />
              </div>
              <p className="mt-3 text-sm font-bold text-gray-900">
                {m.title}
              </p>
              <p className="mt-1 text-xs text-gray-500">{m.cardDesc}</p>
              <ArrowRight className="mt-2 w-4 h-4 text-blue-600" />
            </button>
          ))}
        </div>
      </div>
      <NeedHelp />
     
      <Footer onNavigate={onNavigate} />

      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />
    </div>
  );
}
