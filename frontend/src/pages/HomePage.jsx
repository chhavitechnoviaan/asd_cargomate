import HeroSearch from "../components/HeroSearch";
import PlatformFeatures from "../components/PlatformFeatures";
import CoreAIModules from "../components/CoreAIModules";
import DashboardOverview from "../components/DashboardOverview";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function HomePage({onNavigate}) {
  return (
    <div>
      <HeroSearch />
      <PlatformFeatures />
      <CoreAIModules />
      <DashboardOverview />
      <WhyChooseUs />
      <Testimonials />
      <CTABanner />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
