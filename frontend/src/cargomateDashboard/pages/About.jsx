import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiTarget, FiEye } from "react-icons/fi";
import {
  MdOutlineLocalShipping,
  MdOutlineGavel,
  MdOutlineBarChart,
  MdOutlineImportExport,
} from "react-icons/md";
import { TbRobot, TbShieldCheck, TbBulb, TbWorld } from "react-icons/tb";
import { Reveal, CountUp } from "../components/Reveal";

const stats = [
  { end: 120, suffix: "+", label: "Countries Covered" },
  { end: 5000, suffix: "+", label: "Trade Partners" },
  { end: 98, suffix: "%", label: "Compliance Accuracy" },
  { end: 24, suffix: "/7", label: "AI Assistance" },
];

const offerings = [
  { icon: MdOutlineImportExport, title: "EXIM Benefits", desc: "Government schemes and incentives decoded into clear, actionable steps." },
  { icon: MdOutlineLocalShipping, title: "Freight Insights", desc: "Transparent freight cost visibility across sea, air and road routes." },
  { icon: MdOutlineGavel, title: "Compliance Guidance", desc: "Stay audit-ready and avoid costly delays, penalties and errors." },
  { icon: MdOutlineBarChart, title: "Trade Planning", desc: "Market trends and buyer intelligence to plan your next shipment." },
];

const values = [
  { icon: TbBulb, title: "Innovation", desc: "We apply AI where it removes real friction from trade." },
  { icon: TbShieldCheck, title: "Trust", desc: "Accurate, transparent data you can build decisions on." },
  { icon: TbWorld, title: "Global Mindset", desc: "Built for exporters and importers reaching every market." },
  { icon: TbRobot, title: "Simplicity", desc: "Complex logistics, made simple enough for any MSME." },
];

const timeline = [
  { year: "The Problem", text: "Trade was scattered across paperwork, agents and guesswork, which made it slow and expensive for small businesses." },
  { year: "The Idea", text: "ASD Logistics set out to put trade intelligence, freight and compliance in one AI-powered place." },
  { year: "The Platform", text: "ASD Cargomate launched, bringing dashboards, an AI assistant and live insights together." },
  { year: "What's Next", text: "Deeper automation, wider market coverage and smarter predictions for every shipment." },
];

const marqueeWords = ["Export", "Import", "Freight", "Compliance", "EXIM Benefits", "Customs", "HS Codes", "Trade Intelligence"];

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-white px-4 sm:px-8 md:px-12 lg:px-20 pt-20 pb-24">
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-100/70 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl animate-float-slow" style={{ animationDelay: "-4s" }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="animate-fade-up inline-flex items-center gap-2 border border-teal-400 text-teal-600 text-xs font-medium py-2 px-3 rounded-xl mb-6">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-teal-500" style={{ animation: "ping-ring 1.8s ease-out infinite" }} />
            <span className="relative w-2 h-2 rounded-full bg-teal-500" />
          </span>
          About ASD Cargomate
        </span>

        <h1 className="animate-fade-up text-3xl sm:text-4xl md:text-6xl font-semibold text-gray-900 leading-tight mb-5" style={{ animationDelay: "120ms" }}>
          Making global trade <span className="text-shimmer">simple, smart</span>
          <br className="hidden sm:block" /> and accessible
        </h1>

        <p className="animate-fade-up text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8" style={{ animationDelay: "240ms" }}>
          ASD Cargomate is an AI-powered trade and logistics intelligence platform from ASD Logistics (MSME),
          helping exporters and importers move faster with confidence.
        </p>

        <div className="animate-fade-up flex flex-wrap justify-center gap-3" style={{ animationDelay: "360ms" }}>
          <button onClick={() => navigate("/signup")} className="btn-navy text-sm font-semibold px-6 py-3 rounded-lg cursor-pointer">
            Get Started
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="group flex items-center gap-2 border border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer"
          >
            Talk to us
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <div className="bg-[#0A2540] py-4 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {items.map((w, i) => (
          <span key={i} className="flex items-center text-sm sm:text-base font-medium text-white/80 whitespace-nowrap">
            <span className="mx-8">{w}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="bg-gray-50 px-4 sm:px-8 md:px-12 lg:px-20 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} variant="zoom">
            <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
              <p className="text-3xl sm:text-4xl font-bold text-[#0A2540]">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MissionVision() {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        <Reveal variant="left">
          <div className="h-full rounded-3xl border border-gray-100 bg-gray-50 p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center mb-5">
              <FiTarget size={22} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              To give every business, big or small, the same trade intelligence, freight clarity and compliance
              confidence that large enterprises enjoy, powered by AI.
            </p>
          </div>
        </Reveal>
        <Reveal variant="right">
          <div className="h-full rounded-3xl bg-gradient-to-br from-[#0A2540] via-teal-900 to-teal-800 p-8 text-white hover:shadow-2xl transition-shadow duration-300">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-teal-300 flex items-center justify-center mb-5">
              <FiEye size={22} />
            </div>
            <h3 className="text-xl font-bold mb-2">Our Vision</h3>
            <p className="text-sm text-white/75 leading-relaxed">
              A world where cross-border trade is frictionless, where every shipment is planned, compliant and
              profitable from the very first decision.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Offerings() {
  return (
    <section className="bg-gray-50 px-4 sm:px-8 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What we do</h2>
          <p className="text-gray-500 text-sm sm:text-base">One platform for the whole trade journey</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {offerings.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 110}>
              <div className="group h-full bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:border-teal-300 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center mb-4 group-hover:bg-[#0A2540] group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-20">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Our journey</h2>
          <p className="text-gray-500 text-sm sm:text-base">From a trade headache to an intelligent platform</p>
        </Reveal>
        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-3 sm:left-4 top-1 bottom-1 w-px bg-gradient-to-b from-teal-400 via-teal-200 to-transparent" />
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 120} variant="left" className="relative mb-10 last:mb-0">
              <span className="absolute -left-[26px] sm:-left-[30px] top-1 flex w-4 h-4">
                <span className="absolute inset-0 rounded-full bg-teal-400" style={{ animation: "ping-ring 2.4s ease-out infinite", animationDelay: `${i * 0.4}s` }} />
                <span className="relative w-4 h-4 rounded-full bg-[#0A2540] border-2 border-white shadow" />
              </span>
              <h3 className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-1">{t.year}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="bg-gray-50 px-4 sm:px-8 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">What we stand for</h2>
          <p className="text-gray-500 text-sm sm:text-base">The principles behind every feature we build</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 110} variant="zoom">
              <div className="group h-full bg-white rounded-2xl p-6 border border-gray-100 text-center hover:bg-[#0A2540] hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
                <Icon size={30} className="mx-auto mb-4 text-teal-500 group-hover:text-teal-300 transition-colors" />
                <h3 className="text-sm font-semibold mb-1 text-gray-800 group-hover:text-white transition-colors">{title}</h3>
                <p className="text-xs text-gray-400 group-hover:text-white/70 leading-relaxed transition-colors">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const navigate = useNavigate();
  return (
    <section className="bg-white px-4 sm:px-8 md:px-12 lg:px-20 py-20">
      <Reveal variant="zoom">
        <div className="relative overflow-hidden max-w-5xl mx-auto rounded-3xl bg-[#0A2540] px-6 sm:px-12 py-14 text-center">
          <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl animate-float-slow" style={{ animationDelay: "-5s" }} />
          <h2 className="relative text-2xl sm:text-4xl font-semibold text-white mb-3">Ready to simplify your trade?</h2>
          <p className="relative text-white/70 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Join exporters and importers who plan smarter with ASD Cargomate.
          </p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate("/signup")} className="bg-white text-[#0A2540] hover:bg-teal-50 hover:-translate-y-0.5 text-sm font-semibold px-6 py-3 rounded-lg transition-all cursor-pointer">
              Get Started
            </button>
            <button onClick={() => navigate("/contact")} className="border border-white/40 text-white hover:bg-white/10 text-sm font-medium px-6 py-3 rounded-lg transition-colors cursor-pointer">
              Contact Us
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const About = () => (
  <main className="overflow-x-hidden">
    <Hero />
    <Marquee />
    <Stats />
    <MissionVision />
    <Offerings />
    <Journey />
    <Values />
    <CTA />
  </main>
);

export default About;
