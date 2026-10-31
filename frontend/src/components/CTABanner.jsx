import ctaImage from "../assets/cta-banner.png";

export default function CTABanner() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-12 sm:pb-16">
      <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 md:h-72">
        <img
          src={ctaImage}
          alt="Global shipping network"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent" />
        <div className="relative px-6 sm:px-10 py-10 sm:py-14 max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Ready to Ship Smarter?
          </h2>
          <p className="mt-2 text-sm text-blue-50">
            Join thousands of businesses simplifying logistics with AI.
          </p>
          <button className="mt-6 bg-white text-blue-700 text-sm font-semibold rounded-lg px-6 py-2.5">
            Explore Platform
          </button>
        </div>
      </div>
    </div>
  );
}
