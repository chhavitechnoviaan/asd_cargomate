import { DollarSign, ClipboardList, Ban, CreditCard, HandCoins } from "lucide-react";
import PolicyPage from "../components/PolicyPage";

const items = [
  {
    icon: DollarSign,
    title: "Eligibility for Refund",
    desc: "Refunds are applicable only in cases of service failure caused by us or cancellations made within the agreed time frame.",
  },
  {
    icon: ClipboardList,
    title: "Refund Requests",
    desc: "All refund requests must be raised within 7 days of the service date by contacting our support team.",
  },
  {
    icon: DollarSign,
    title: "Non-Refundable Cases",
    desc: "Refunds are not applicable for services completed successfully or delays caused by incorrect information provided by the client.",
  },
  {
    icon: CreditCard,
    title: "Refund Process",
    desc: "Approved refunds will be processed within 7-10 business days through the original payment method.",
  },
  {
    icon: HandCoins,
    title: "Partial Refunds",
    desc: "In certain cases, only partial refunds may be granted based on the extent of service provided.",
  },
];

export default function RefundPolicyPage({ onNavigate }) {
  return (
    <PolicyPage
      title="Refund Policy"
      subtitle="We aim to provide the best service possible. Please read our refund policy carefully."
      items={items}
      ctaQuestion="Need help with a refund? We're here to assist you."
      onClose={() => onNavigate("Home")}
    />
  );
}
