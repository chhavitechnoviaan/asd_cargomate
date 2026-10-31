import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  UserCircle,
  Clock3,
  Rocket,
  Wrench,
  Handshake,
  User,
} from "lucide-react";
import Footer from "../components/Footer";
import BookDemoModal from "../components/BookDemoModal";
import contactHero from "../assets/resources-hero.png";

const subjects = [
  "General Inquiry",
  "Technical Support",
  "Partnership Opportunity",
  "Billing Question",
  "Product Demo Request",
];

const whyContactUs = [
  {
    icon: UserCircle,
    title: "Expert Assistance",
    description: "Get help from our trade experts",
  },
  {
    icon: Clock3,
    title: "Quick Response",
    description: "We aim to respond within 24 hours",
  },
  {
    icon: Rocket,
    title: "Product Demo",
    description: "See how ASD CARGOMATE can transform your business",
  },
  {
    icon: Wrench,
    title: "Technical Support",
    description: "Resolve issues and get the support you need",
  },
  {
    icon: Handshake,
    title: "Partnership Inquiries",
    description: "Explore partnership and integration opportunities",
  },
];

export default function ContactPage({ onNavigate }) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({
        fullName: "",
        workEmail: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      
      <section
        className="relative inset-0 w-full h-full object-cover"
        style={{ backgroundImage: `url(${contactHero})` }}
      >
        <div className="absolute inset-0 bg-blue-950/40" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <h1 className="text-5xl font-extrabold text-white">Contact Us</h1>
          <p className="mt-3 text-3xl font-bold text-blue-400">
            We're Here to Help You Succeed
          </p>
          <p className="mt-6 max-w-xl text-lg text-gray-200">
            Have questions or need assistance? Get in touch with our team
            and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-6">
            <Building2 className="h-8 w-8 flex-shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Office</h3>
              <p className="mt-1 text-sm text-gray-500">
                ASD CARGOMATE Pvt. Ltd.
                <br />
                601, 6th Floor, Udyog Vihar,
                <br />
                Phase V, Gurugram,
                <br />
                Haryana – 122016, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-6">
            <Mail className="h-8 w-8 flex-shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Email</h3>
              <p className="mt-1 text-sm text-gray-500">
                info@cargomate.com
                <br />
                support@cargomate.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-6">
            <Phone className="h-8 w-8 flex-shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Phone</h3>
              <p className="mt-1 text-sm text-gray-500">
                +91 11 6912 2200
                <br />
                +91 98765 43210
                <br />
                (Mon – Sat | 9:00 AM – 6:00 PM)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-6">
            <Calendar className="h-8 w-8 flex-shrink-0 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Demo Booking</h3>
              <p className="mt-1 text-sm text-gray-500">
                Book a personalized demo with our product experts.
              </p>
              <button
                onClick={() => setIsDemoOpen(true)}
                className="mt-2 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-center text-lg font-bold text-blue-600">
              Support Form
            </h2>
            <p className="mt-1 text-center text-sm text-gray-500">
              Fill out the form and our support team will get back to you
              shortly.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.workEmail}
                    onChange={handleChange("workEmail")}
                    placeholder="Enter your work email"
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="Enter your phone number"
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Subject *
                </label>
                <select
                  required
                  value={form.subject}
                  onChange={handleChange("subject")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange("message")}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Submit Request
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-center text-lg font-bold text-blue-600">
              Office Location
            </h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
              <iframe
                title="ASD CargoMate Office Location"
                src="https://www.google.com/maps?q=Udyog+Vihar+Phase+V+Gurugram+Haryana+122016&output=embed"
                className="h-96 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-blue-600">
              Why Contact Us?
            </h2>
            <div className="mt-6 space-y-6">
              {whyContactUs.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex items-start gap-4">
                  <Icon className="h-6 w-6 flex-shrink-0 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-blue-600 p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Let's Connect and Grow Together
            </h2>
            <p className="mt-2 max-w-xl text-blue-100">
              Whether you have a question, need support, or want to explore
              how we can work together, our team is ready to assist you.
            </p>
          </div>
          <button
            onClick={() => setIsDemoOpen(true)}
            className="flex-shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            Book a demo
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      <BookDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onNavigate={onNavigate}
      />
    </div>
  );
}
