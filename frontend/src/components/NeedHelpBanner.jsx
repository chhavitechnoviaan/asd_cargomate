import bannerImage from "../assets/module-cta-banner.png";

export default function NeedHelpBanner() {
  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={bannerImage}
        alt="Global network"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Need help Choosing the Right Module?
          </h2>
          <p className="mt-1 text-sm text-blue-100">
            Our experts can help you find the perfect solution for your
            business.
          </p>
        </div>
        <button className="bg-white text-blue-700 text-sm font-semibold rounded-lg px-6 py-2.5 shrink-0">
          Talk to an Expert
        </button>
       
      </div>
    </div>
  );
}
