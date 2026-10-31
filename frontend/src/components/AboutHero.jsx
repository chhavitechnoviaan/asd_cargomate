import portMapImage from "../assets/port-map.jpg";

export default function AboutHero() {
  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden">
      <img
        src={portMapImage}
        alt="Global logistics network"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-blue-950/70" />
      <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          About ASD CargoMate
        </h1>
        <p className="mt-2 text-sm sm:text-base text-blue-200">
          Smarter Decisions. Seamless Shipping. Powered by AI.
        </p>
        <p className="mt-3 text-xs sm:text-sm text-blue-100 max-w-2xl">
          ASD CargoMate is an AI-powered logistics intelligence platform
          built to simplify global shipping. We combine data, technology,
          and industry expertise to help businesses plan, compare, and
          ship with confidence.
        </p>
      </div>
    </div>
  );
}
