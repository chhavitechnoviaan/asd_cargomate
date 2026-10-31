import { FileText } from "lucide-react";
import PolicyPage from "../components/PolicyPage";
const sections = [
["Platform Purpose", "ASD CargoMate is an AI-enabled EXIM, trade intelligence, logistics and compliance technology platform providing AI CargoMate Assistant, HS code assistance, export incentive guidance, import duty estimation, freight estimation, buyer/supplier intelligence, shipment planning/tracking, documentation assistance and vendor/RFQ services."],
["User Registration", "Provide correct and current information. Keep login credentials confidential; do not share accounts without authorization. Keep company and KYC information updated. False, fraudulent or misleading information may result in suspension."],
["Platform Information", "CargoMate provides technology-assisted information and decision support. Independently verify customs, regulatory, taxation, licensing, freight and legal decisions before executing transactions."],
["HS Code Classification", "Suggested HS codes are recommendations. Final classification depends on complete product specifications, Customs Tariff, DGFT/Customs regulations and decisions of competent authorities."],
["Export Benefits", "RoDTEP, Duty Drawback, RoSCTL, Advance Authorisation, EPCG, GST refund and other schemes depend on current rules, eligibility, effective dates and notifications. Estimates are not guaranteed benefits."],
["Freight Rates", "Freight results must be labelled LIVE RATE, CONTRACT RATE or ESTIMATED RATE. Final rates depend on carrier/vendor confirmation, capacity, routing, surcharges, taxes and shipment conditions."],
["Vendor Marketplace", "CargoMate may introduce customers to freight forwarders, customs brokers, transporters, warehouses and service providers. Vendors are responsible for quotations, valid licences, service delivery, regulatory compliance, documentation, taxes and applicable insurance. CargoMate is not necessarily the contracted logistics provider."],
["Subscriptions", "Free and paid plans, monthly/annual billing, GST, upgrades, downgrades, renewals, usage limits, failed payments, suspension and cancellation apply according to the subscribed terms and displayed plan."],
["Intellectual Property", "CargoMate branding, software, UI, proprietary algorithms, databases and original content are protected intellectual property."],
["Prohibited Use", "No fraud, illegal trade, false documentation, unauthorized access, data misuse, system abuse, evasion of trade controls or unauthorized scraping/resale of protected data."],
["Account Suspension", "Accounts may be suspended or terminated for fraud, abuse, non-payment, illegal activity, false KYC or serious Terms violations."],
["Third-Party Services", "Government data, APIs, payment gateways, carriers and other third parties may be involved. Their availability and accuracy may be outside CargoMate's control."],
["Liability — Pending Legal Review", "Limitation of liability, indemnification and damages provisions must be finalized by qualified legal counsel before production release."],
["Governing Law — Pending Legal Review", "Applicable Indian law, jurisdiction and dispute-resolution mechanisms must be finalized following legal review."]
];
export default function TermsConditionsPage({onNavigate}) {
 return <PolicyPage title="Terms & Conditions" subtitle="ASD CargoMate platform terms and use conditions" items={sections.map(([title,desc])=>({icon:FileText,title,desc}))} lastUpdated="Draft — legal review required" ctaQuestion="Questions about our Terms? Contact Support." onClose={()=>onNavigate("Home")}/>;
}
