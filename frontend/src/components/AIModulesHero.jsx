import portMapImage from "../assets/port-map.jpg";

export default function AIModulesHero() {
  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 bg-gradient-to-b from-blue-950 to-blue-950 overflow-hidden">
      <img
        src={portMapImage}
        alt="Global trade network"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />
      <div className="absolute inset-0 bg-blue-950/70" />
      <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          AI Modules
        </h1>
        <p className="mt-1 text-sm sm:text-base text-blue-300 font-semibold">
          Smarter Tools. Intelligent Trade.
        </p>
        <p className="mt-3 text-xs sm:text-sm text-blue-100 max-w-xl">
          Explore our suite of AI-Powered modules designed to simplify every
          step of global trade - from discovery to delivery.
        </p>
      </div>
    </div>
  );
}
