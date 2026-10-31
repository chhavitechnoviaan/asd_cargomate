import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import globeImage from "../assets/trade-globe.png";

// Keep dashboard navigation on the current origin so local development works.
const goTo = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  window.location.assign(normalizedPath);
};

export default function HeroSearch() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto grid min-h-[560px] max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 md:min-h-[590px] md:py-14 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-10">
        <div className="relative z-10 order-2 max-w-2xl animate-fade-up lg:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-teal-300 bg-white/80 px-4 py-3 text-xs font-semibold tracking-wide text-teal-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_0_4px_rgba(20,184,166,0.12)]" />
            AI Powered Platform
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            <span className="text-teal-500">AI-Powered</span> Global
            <br className="hidden sm:block" /> Trade &amp; Logistics
            <br className="hidden sm:block" /> Intelligence
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
            One platform for EXIM benefits, freight insights, compliance guidance, and trade planning.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => goTo("/signup")}
              className="group inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-300"
            >
              Get Started <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              type="button"
              onClick={() => document.getElementById("contact-demo")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-teal-400 hover:bg-teal-50/60 focus:outline-none focus:ring-4 focus:ring-teal-100"
            >
              <Play className="h-3.5 w-3.5" /> Request for Demo
            </button>
          </div>
          <div className="mt-8 flex items-center gap-2 text-xs font-medium text-slate-400">
            <Sparkles className="h-4 w-4 text-teal-500" /> Smarter decisions for every shipment
          </div>
        </div>

        <div className="relative order-1 flex min-h-[280px] items-center justify-center lg:order-2 lg:min-h-[480px]">
          <div className="absolute h-64 w-64 rounded-full bg-blue-200/40 blur-3xl sm:h-80 sm:w-80 lg:h-[28rem] lg:w-[28rem]" />
          <div className="absolute right-[12%] top-[16%] h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_24px_rgba(45,212,191,0.9)]" />
          <div className="absolute bottom-[18%] left-[12%] h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_22px_rgba(96,165,250,0.9)]" />
          <img
            src={globeImage}
            alt="Blue globe representing global trade and logistics"
            className="relative z-10 w-full max-w-[390px] object-contain drop-shadow-[0_12px_24px_rgba(37,99,235,0.16)] sm:max-w-[450px] lg:max-w-[540px]"
          />
        </div>
      </div>
      <div id="contact-demo" className="sr-only" aria-hidden="true" />
    </section>
  );
}
