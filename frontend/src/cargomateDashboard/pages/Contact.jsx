import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck } from "react-icons/fi";
import { Reveal } from "../components/Reveal";

const info = [
  { icon: FiMail, label: "Email", value: "support@asdcargomate.com" },
  { icon: FiPhone, label: "Phone", value: "+91 00000 00000" },
  { icon: FiMapPin, label: "Office", value: "ASD Logistics, India" },
  { icon: FiClock, label: "Hours", value: "Mon - Sat, 9:30 AM - 6:30 PM" },
];

const faqs = [
  { q: "How soon will I hear back?", a: "We reply to every message within one business day." },
  { q: "Can I request a product demo?", a: "Yes. Mention it in your message and our team will schedule a walkthrough." },
  { q: "Is ASD Cargomate suitable for small businesses?", a: "Absolutely. It is built for MSMEs as much as large exporters and importers." },
];

const initial = { name: "", email: "", subject: "", message: "" };

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1.5">{label}</span>
      {children}
      <span className={`block text-xs text-red-500 overflow-hidden transition-all duration-300 ${error ? "max-h-6 mt-1 opacity-100" : "max-h-0 opacity-0"}`}>
        {error}
      </span>
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-200 focus:bg-white focus:border-[#0A2540] focus:ring-4 focus:ring-[#0A2540]/10";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 sm:px-8 md:px-12 lg:px-20 pt-20 pb-16">
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal-100/70 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-blue-100/60 blur-3xl animate-float-slow" style={{ animationDelay: "-4s" }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <span className="animate-fade-up inline-flex items-center gap-2 border border-teal-400 text-teal-600 text-xs font-medium py-2 px-3 rounded-xl mb-6">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-teal-500" style={{ animation: "ping-ring 1.8s ease-out infinite" }} />
            <span className="relative w-2 h-2 rounded-full bg-teal-500" />
          </span>
          Contact Us
        </span>
        <h1 className="animate-fade-up text-3xl sm:text-4xl md:text-6xl font-semibold text-gray-900 leading-tight mb-5" style={{ animationDelay: "120ms" }}>
          Let's <span className="text-shimmer">talk trade</span>
        </h1>
        <p className="animate-fade-up text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" style={{ animationDelay: "240ms" }}>
          Questions, a demo request or a partnership idea? Send us a message and the ASD Cargomate team will get back to you.
        </p>
      </div>
    </section>
  );
}

function FormCard() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Please enter a valid email";
    if (!form.subject.trim()) er.subject = "Please add a subject";
    if (form.message.trim().length < 10) er.message = "Message should be at least 10 characters";
    return er;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setSending(true);
    // TODO: connect to backend contact API
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm(initial);
      toast.success("Message sent! We will be in touch soon.");
      setTimeout(() => setSent(false), 4000);
    }, 1200);
  };

  return (
    <form onSubmit={onSubmit} noValidate className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Send us a message</h2>
        <p className="text-xs text-gray-400 mt-1">We usually reply within one business day.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" error={errors.name}>
          <input name="name" value={form.name} onChange={onChange} placeholder="Your name" className={inputCls} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@company.com" className={inputCls} />
        </Field>
      </div>
      <Field label="Subject" error={errors.subject}>
        <input name="subject" value={form.subject} onChange={onChange} placeholder="How can we help?" className={inputCls} />
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea name="message" rows={5} value={form.message} onChange={onChange} placeholder="Tell us a little more..." className={`${inputCls} resize-none`} />
      </Field>
      <button
        type="submit"
        disabled={sending}
        className={`btn-navy w-full flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-lg cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed ${sent ? "!bg-teal-600" : ""}`}
      >
        {sending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Sending...
          </>
        ) : sent ? (
          <>
            <FiCheck size={16} /> Sent
          </>
        ) : (
          <>
            <FiSend size={15} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

function InfoPanel() {
  return (
    <div className="relative overflow-hidden h-full rounded-3xl bg-gradient-to-br from-[#0A2540] via-teal-900 to-teal-800 p-6 sm:p-8 text-white">
      <div className="pointer-events-none absolute -top-16 -right-16 w-60 h-60 rounded-full bg-teal-400/20 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-blue-400/20 blur-3xl animate-float-slow" style={{ animationDelay: "-5s" }} />

      <h2 className="relative text-xl font-bold mb-1">Contact information</h2>
      <p className="relative text-sm text-white/70 mb-8">Reach us through any of these channels.</p>

      <ul className="relative space-y-5">
        {info.map(({ icon: Icon, label, value }, i) => (
          <Reveal as="li" key={label} delay={i * 100} variant="right">
            <div className="group flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-teal-300 group-hover:bg-white group-hover:text-[#0A2540] group-hover:scale-110 transition-all duration-300">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/50">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <svg viewBox="0 0 300 70" className="relative w-full mt-10" fill="none">
        <path d="M10 55 C 70 5, 130 65, 190 25 S 270 10, 290 20" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <path d="M10 55 C 70 5, 130 65, 190 25 S 270 10, 290 20" stroke="#5eead4" strokeWidth="2" strokeDasharray="6 6" className="animate-route-dash" />
        <circle cx="10" cy="55" r="4" fill="#5eead4" />
        <circle cx="290" cy="20" r="4" fill="#fff" />
      </svg>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-gray-50 px-4 sm:px-8 md:px-12 lg:px-20 py-20">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Quick answers</h2>
          <p className="text-gray-500 text-sm sm:text-base">Things people often ask before getting in touch</p>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 100}>
                <div className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? "border-teal-300 shadow-md" : "border-gray-100"}`}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 cursor-pointer">
                    <span className="text-sm font-semibold text-gray-800">{f.q}</span>
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg leading-none transition-all duration-300 ${isOpen ? "bg-[#0A2540] text-white rotate-45" : "bg-gray-100 text-gray-500"}`}>
                      +
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const Contact = () => (
  <main className="overflow-x-hidden">
    <Hero />
    <section className="bg-white px-4 sm:px-8 md:px-12 lg:px-20 pb-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6">
        <Reveal variant="left" className="lg:col-span-3">
          <FormCard />
        </Reveal>
        <Reveal variant="right" className="lg:col-span-2">
          <InfoPanel />
        </Reveal>
      </div>
    </section>
    <Faq />
  </main>
);

export default Contact;
