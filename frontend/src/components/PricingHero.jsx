import { Ban, Bookmark } from "lucide-react";
import pricingHeroImage from "../assets/pricing-hero.png";

export default function PricingHero() {
  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 bg-blue-950 overflow-hidden">
      <img
        src={pricingHeroImage}
        alt="Global logistics network"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-blue-950/40" />
      <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
          Simple, Transparent Pricing
          <br />
          Built for <span className="text-blue-400">Every Business</span>
        </h1>
        <p className="mt-3 text-sm text-blue-100 max-w-md">
          Choose the plan that fits your needs and scale as you grow. All
          plans include access to our core AI-powered features.
        </p>
        <div className="mt-4 flex items-center gap-5 text-xs text-blue-100">
          <span className="flex items-center gap-1.5">
            <Ban className="w-3.5 h-3.5" />
            No Setup Fees
          </span>
          <span className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5" />
            Cancel Anytime
          </span>
        </div>
      </div>
    </div>
  );
}
