import ctaImage from "../assets/cta-banner.png";

export default function TradeChainBanner() {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={ctaImage}
        alt="Trade chain logistics"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/70 to-blue-950/20" />

      <div className="relative max-w-4xl mx-auto px-4 py-14 sm:py-20">
        <span className="inline-block bg-blue-600 text-white text-xs font-semibold rounded-full px-3 py-1">
          SOLUTIONS
        </span>
        <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
          AI-Powered Solutions
          <br />
          For Every Link in the <span className="text-blue-300">Trade Chain</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-blue-100 max-w-lg">
          Industry-specific intelligence. Real-world impact. CargoMate
          delivers tailored AI solutions for every stakeholder in the global
          trade ecosystem — simplifying complexity, boosting efficiency, and
          driving growth.
        </p>
      </div>
    </div>
  );
}
