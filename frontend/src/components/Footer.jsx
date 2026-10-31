
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const product = [
  { label: "Home", page: "Home" },
  { label: "Pricing", page: "Pricing" },
  { label: "AI Module", page: "AI Module" },
  { label: "Resources", page: "Resources" },
];

const company = [
  { label: "Home", page: "Home" },
  { label: "About Us", page: "About" },
  { label: "Contact", page: "Contact Us" },
];

const legal = [
  { label: "Refund Policy", page: "Refund Policy" },
  { label: "Privacy Policy", page: "Privacy Policy" },
  { label: "Terms & Conditions", page: "Terms & Conditions" },
];

const helpCenter = [{ label: "Help Center", page: "Help Center" }];

const footerLinks = {
  Product: product,
  Company: company,
  Legal: legal,
  "Help Center": helpCenter,
};

const socialIcons = [
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaLinkedinIn, label: "LinkedIn" },
  { Icon: FaXTwitter, label: "X" },
];

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-900 text-gray-400 px-4 sm:px-8 md:px-12 lg:px-16 pt-12 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <button
              type="button"
              onClick={() => onNavigate?.("Home")}
              aria-label="Go to Home"
            >
              <h3 className="text-white font-bold text-sm mb-2">
                ASD CargoMate<sup className="text-xs">™</sup>
              </h3>
            </button>

            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              AI-powered logistics intelligence platform helping businesses
              plan, compare and ship with confidence.
            </p>

            <div className="space-y-2 text-xs text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:support@asdcargomate.com" className="hover:text-white">
                  support@asdcargomate.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="tel:+9118001234567" className="hover:text-white">
                  +91 1800 123 4567
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span>
                  2nd Floor, Logistics Park, Gurgaon, Haryana, India
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialIcons.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  title={label}
                  className="w-8 h-8 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={13} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {heading}
              </h4>

              <ul className="space-y-2.5">
                {links.map(({ label, page }) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onNavigate?.(page)}
                      className="text-gray-400 hover:text-white text-xs transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2026 ASD CargoMate. A product of ASD Logistics (MSME). All
            rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate?.("Refund Policy")}
              className="text-gray-400 hover:text-white text-xs transition-colors"
            >
              Refund
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.("Privacy Policy")}
              className="text-gray-400 hover:text-white text-xs transition-colors"
            >
              Privacy
            </button>

            <button
              type="button"
              onClick={() => onNavigate?.("Terms & Conditions")}
              className="text-gray-400 hover:text-white text-xs transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
