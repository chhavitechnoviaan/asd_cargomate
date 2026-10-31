import { Camera, CheckCircle2, Share2, ShieldCheck, UserCheck2, FileEdit } from "lucide-react";
import PolicyPage from "../components/PolicyPage";

const items = [
  {
    icon: Camera,
    title: "Information We Collect",
    desc: "We collect personal information such as your name, email, phone number, and company details when you use our services.",
  },
  {
    icon: CheckCircle2,
    title: "How We Use Information",
    desc: "Your information is used to provide, improve, and personalize our services and to communicate with you.",
  },
  {
    icon: Share2,
    title: "Information Sharing",
    desc: "We do not sell or rent your personal information. We may share it with trusted partners only to deliver our services.",
  },
  {
    icon: ShieldCheck,
    title: "Data Security",
    desc: "We implement industry-standard security measures to protect your data from unauthorized access or disclosure.",
  },
  {
    icon: UserCheck2,
    title: "Your Rights",
    desc: "You have the right to access, update, or delete your personal information. Contact us for any privacy-related requests.",
  },
  {
    icon: FileEdit,
    title: "Changes to Policy",
    desc: "We may update this privacy policy occasionally. Updates will be posted on this page with the revised date.",
  },
];

export default function PrivacyPolicyPage({ onNavigate }) {
  return (
    <PolicyPage
      title="Privacy Policy"
      subtitle="We value your privacy and are committed to protecting your personal information."
      items={items}
      lastUpdated="May 16, 2025"
      ctaQuestion="Have questions about your privacy? We're here to help."
      onClose={() => onNavigate("Home")}
    />
  );
}
