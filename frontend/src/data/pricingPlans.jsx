import { Rocket, Sparkles, Building2, Gem } from "lucide-react";

export const pricingPlans = [
  {
    id: "starter",
    icon: Rocket,
    name: "Starter",
    tagline: "Perfect for small businesses getting started.",
    monthly: 29,
    yearly: 279,
    features: [
      "AI Chat Assistant",
      "HS Code Intelligence",
      "Import Duty Calculator",
      "Freight Estimator",
      "Up to 2 Users",
      "Email Support",
    ],
  },
  {
    id: "professional",
    icon: Sparkles,
    name: "Professional",
    tagline: "Advanced tools for growing businesses.",
    monthly: 79,
    yearly: 758,
    features: [
      "All Starter features",
      "Shipment Planner",
      "Buyer & Supplier Intelligence",
      "Trade Analytics",
      "Up to 5 Users",
      "Priority Email Support",
    ],
  },
  {
    id: "business",
    icon: Building2,
    name: "Business",
    tagline: "Comprehensive solution for established businesses.",
    monthly: 149,
    yearly: 1430,
    features: [
      "All Professional features",
      "Export Benefits",
      "Compliance Checker",
      "DG Cargo Advisor",
      "Up to 10 Users",
      "Phone & Email Support",
    ],
  },
  {
    id: "enterprise",
    icon: Gem,
    name: "Enterprise",
    tagline: "Custom solutions for large organizations.",
    monthly: null,
    yearly: null,
    features: [
      "All Business features",
      "Custom Integrations",
      "Dedicated Account Manager",
      "SLA & Onboarding Support",
      "Unlimited Users",
      "24/7 Premium Support",
    ],
  },
];

export const compareRows = [
  { label: "AI Chat Assistant", values: [true, true, true, true] },
  { label: "HS Code Intelligence", values: [true, true, true, true] },
  { label: "Import Duty Calculator", values: [true, true, true, true] },
  { label: "Freight Estimator", values: [true, true, true, true] },
  { label: "Shipment Planner", values: [false, true, true, true] },
  { label: "Buyer & Supplier Intelligence", values: [false, true, true, true] },
  { label: "Export Benefits", values: [false, false, true, true] },
  { label: "Compliance Checker", values: [false, false, true, true] },
  { label: "DG Cargo Advisor", values: [false, false, true, true] },
  { label: "Trade Analytics", values: [false, true, true, true] },
  {
    label: "Users",
    values: ["Up to 2", "Up to 5", "Up to 10", "Unlimited"],
    isText: true,
  },
  {
    label: "Support",
    values: ["Email", "Priority mail", "Phone & Email", "24/7 Premium"],
    isText: true,
  },
];

export const pricingFAQs = [
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, bank transfer and online payments. For Enterprise plans, payments can be customized as per your requirements.",
    iconType: "payment",
  },
  {
    id: "free-trial",
    question: "Do you offer a free trial?",
    answer:
      "Yes! We offer a 14-day free trial on all our plans. You get full access to all features with no credit card required. Explore CargoMate and upgrade anytime.",
    iconType: "trial",
  },
  {
    id: "change-plan",
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan anytime from your account settings. Changes will be reflected in your next billing cycle.",
    iconType: "swap",
  },
  {
    id: "setup-fee",
    question: "Is there a setup fee?",
    answer:
      "No, there are no setup fees for any of our plans. You only pay for what you choose. Get started instantly with no hidden charges.",
    iconType: "gear",
  },
  {
    id: "upgrade-downgrade",
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can upgrade or downgrade your plan anytime. Your data and settings will be safely retained. Any changes will be applied in the next billing cycle.",
    iconType: "browser-swap",
  },
  {
    id: "data-secure",
    question: "Is my data secure with CargoMate?",
    answer:
      "Yes, data security is our top priority. We use industry-standard encryption, secure servers, and regular backups to keep your data safe and private.",
    iconType: "shield",
  },
];

export const addOns = [
  {
    id: "users",
    icon: "users",
    title: "Additional Users",
    desc: "Add more team members",
    price: "$10 /user /month",
  },
  {
    id: "priority",
    icon: "headset",
    title: "Priority Support",
    desc: "Get faster response",
    price: "$29/month",
  },
  {
    id: "analytics",
    icon: "chart",
    title: "Advanced Analytics",
    desc: "Deep insights & reports",
    price: "$39/month",
  },
  {
    id: "api",
    icon: "api",
    title: "API Access",
    desc: "Integrate with your systems",
    price: "$49/month",
  },
  {
    id: "manager",
    icon: "manager",
    title: "Dedicated Account Manager",
    desc: "Personalized assistance",
    price: "$99/month",
  },
  {
    id: "integrations",
    icon: "gear",
    title: "Custom Integrations",
    desc: "Tailored to your needs",
    price: "$199/month",
  },
];
