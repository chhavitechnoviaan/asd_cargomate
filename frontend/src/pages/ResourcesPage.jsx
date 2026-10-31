import { useState } from "react";
import ResourcesHero from "../components/ResourcesHero";
import ResourcesGrid from "../components/ResourcesGrid";
import NeedMoreHelpBanner from "../components/NeedMoreHelpBanner";
import ResourceDetailModal from "../components/ResourceDetailModal";
import Footer from "../components/Footer";

export default function ResourcesPage({ onNavigate }) {
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <div>
      <ResourcesHero />
      <ResourcesGrid onSelect={setSelectedResource} />
      <NeedMoreHelpBanner onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />

      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />
    </div>
  );
}
