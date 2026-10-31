import HeroSearch from "./components/HeroSearch";
import PlatformFeatures from "./components/PlatformFeatures";
import CoreAIModules from "./components/CoreAIModules";
import DashboardOverview from "./components/DashboardOverview";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import CTABanner from "./components/CTABanner";
import SolutionsOverview from "./components/SolutionsOverview";
import AllSolutionsList from "./components/AllSolutionsList";
import TradeChainBanner from "./components/TradeChainBanner";
import AboutHero from "./components/AboutHero";
import WhoWeAre from "./components/WhoWeAre";
import WhyCargoMate from "./components/WhyCargoMate";
import AIBrainSection from "./components/AIBrainSection";
import FutureSection from "./components/FutureSection";
import Footer from "./components/Footer";

export default function Preview() {
  return (
    <div>
      <HeroSearch />
      <PlatformFeatures />
      <CoreAIModules />
      <DashboardOverview />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <SolutionsOverview />
      <AllSolutionsList />
      <TradeChainBanner />
      <AboutHero />
      <WhoWeAre />
      <WhyCargoMate />
      <AIBrainSection />
      <FutureSection />
      <Footer />
    </div>
  );
}
