import AboutHero from "../components/AboutHero";
import WhoWeAre from "../components/WhoWeAre";
import WhyCargoMate from "../components/WhyCargoMate";
import AIBrainSection from "../components/AIBrainSection";
import FutureSection from "../components/FutureSection";
import Footer from "../components/Footer";

export default function AboutPage({onNavigate}) {
  return (
    <div>
      <AboutHero />
      <WhoWeAre />
      <WhyCargoMate />
      <AIBrainSection />
      <FutureSection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
