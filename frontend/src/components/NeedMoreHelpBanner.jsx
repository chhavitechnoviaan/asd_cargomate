import bannerImage from "../assets/resources-help.png";

export default function NeedMoreHelpBanner({ onNavigate }) {
  return (
    <div className="relative w-full bg-blue-950 overflow-hidden">
      <img
        src={bannerImage}
        alt="Workspace"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/70 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Need More Help?
        </h2>
        <p className="mt-3 text-sm text-blue-100 max-w-sm">
          Our resources are here to help you stay ahead in your global trade
          journey. Can't find what you are looking for?
        </p>
        <button
          onClick={() => onNavigate?.("Contact Us")}
          className="mt-6 bg-white text-blue-950 text-sm font-semibold rounded-lg px-6 py-3"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
}
