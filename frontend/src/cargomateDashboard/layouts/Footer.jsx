import React from 'react'
import { NavLink } from "react-router-dom";
import { BsStars, BsTwitterX, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";

const footerLinks = {
    Product: [
      { label: "Features", path: "/features" },
      { label: "Pricing", path: "/pricing" },
      { label: "Use Cases", path: "/use-cases" },
      { label: "Integrations", path: "/integrations" },
      { label: "API", path: "/api" },
    ],
    Company: [
      { label: "About us", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Blog", path: "/blog" },
      { label: "Press", path: "/press" },
      { label: "Contact", path: "/contact" },
    ],
    Legal: [
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms of Service", path: "/terms-of-service" },
      { label: "Cookie Policy", path: "/cookie-policy" },
      { label: "GDPR", path: "/gdpr" },
      { label: "Compliance", path: "/compliance" },
    ],
    Resources: [
      { label: "Help Center", path: "/help-center" },
      { label: "Documentation", path: "/documentation" },
      { label: "Community", path: "/community" },
      { label: "Webinars", path: "/webinars" },
      { label: "Partners", path: "/partners" },
    ],
  };

const bottomLinks = [
  { label: "Privacy", path: "/privacy-policy" },
  { label: "Terms", path: "/terms-of-service" },
  { label: "Security", path: "/security" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 px-4 sm:px-8 md:px-12 lg:px-16 pt-12 pb-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="text-white font-bold text-sm mb-2">
              ASD Cargomate<sup className="text-xs">™</sup>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              AI-Powered Trade & Logistics Intelligence Platform
            </p>
            <div className="flex items-center gap-3">
              {[BsTwitterX, BsLinkedin, BsFacebook, BsInstagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={13} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
 
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, path }) => (
                  <li key={label}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `hover:text-white text-xs transition-colors ${isActive ? "text-white" : "text-gray-400"}`
                      }
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
 
        <div className="border-t border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            2026 ASD Cargomate . A product of ASD Logistics (MSME). All rights reserved
          </p>
             <a href="https://technoviaan.com/" target="_blank" rel="noreferrer">
                <button className="hover:underline  text-gray-500 text-xs text-center"> Designed and Developed by Technoviaan Software Solutions</button>
              </a>
         

          <div className="flex items-center gap-4">
            {bottomLinks.map(({ label, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `hover:text-white text-xs transition-colors ${isActive ? "text-white" : "text-gray-400"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer