import SolutionsOverview from "../components/SolutionsOverview";
import AllSolutionsList from "../components/AllSolutionsList";
import TradeChainBanner from "../components/TradeChainBanner";
import Footer from "../components/Footer";

export default function SolutionsPage({onNavigate}) {
  return (
    <div>
      <SolutionsOverview />
      <AllSolutionsList />
      <TradeChainBanner />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
