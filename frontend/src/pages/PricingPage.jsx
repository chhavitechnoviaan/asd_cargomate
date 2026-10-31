import { useState } from "react";
import PricingHero from "../components/PricingHero";
import PricingPlans from "../components/PricingPlanss";
import CompareFeaturesTable from "../components/CompareFeaturesTable";
import PricingFAQSection from "../components/PricingFAQSection";
//import CustomSolutionBanner from "../components/CustomSolutionBanner";
import GetStartedModal from "../components/GetStartedModal";
import Footer from "../components/Footer";

export default function PricingPage({ onNavigate }) {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div>
      <PricingHero />
      <PricingPlans onGetStarted={setSelectedPlan} />
      <CompareFeaturesTable />
      <PricingFAQSection />
      
      <Footer onNavigate={onNavigate} />

      {selectedPlan && (
        <GetStartedModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
