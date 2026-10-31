import {
  FileText,
  UserCog,
  Landmark,
  Monitor,
  BookOpen,
  ClipboardList,
  Grid2x2,
  MessageCircleQuestion,
  Bell,
  Volume2,
  List,
} from "lucide-react";

export const resourceCards = [
  {
    id: "blog",
    icon: FileText,
    color: "bg-blue-500",
    title: "Blog",
    desc: "Read expert articles, industry insights and lastest trends in global trade and logistics.",
    sectionTitle: "Latest Articles",
    itemIcon: FileText,
    items: [
      { title: "Global Trade Trend 2024: key insights", meta: "May 10,2024 . 5 min read" },
      { title: "Digital Transformation in logistics", meta: "May 8,2024 . 6 min read" },
      { title: "Top 10 Export opportunities for india", meta: "May 5,2024 . 4 min read" },
    ],
  },
  {
    id: "dgft-updates",
    icon: UserCog,
    color: "bg-green-600",
    title: "DGFT Updates",
    desc: "Stay informed with the latest notifications, policy changes, and circulars from the DGFT.",
    sectionTitle: "Latest Updates",
    itemIcon: FileText,
    items: [
      { title: "Export policy update 2024", meta: "May 9,2024" },
      { title: "RoDTEP scheme Guidelines Updated", meta: "May 7, 2024" },
      { title: "Advance Authorization Norms Revised", meta: "May 4, 2024" },
    ],
  },
  {
    id: "customs-notifications",
    icon: Landmark,
    color: "bg-orange-500",
    title: "Customs Notifications",
    desc: "Get real-time updates on customs notifications, regulations, and compliance requirements.",
    sectionTitle: "Recent Notifications",
    itemIcon: Bell,
    items: [
      { title: "Notification No. 25/2024 - Customs Duty Changes", meta: "May 10, 2024" },
      { title: "Notification No. 24/2024 - Valuation Rules Update", meta: "May 8, 2024" },
      { title: "Notification No. 23/2024 - Import Policy Amendment", meta: "May 6, 2024" },
    ],
  },
  {
    id: "icegate-updates",
    icon: Monitor,
    color: "bg-fuchsia-600",
    title: "ICEGATE Updates",
    desc: "Access the latest ICEGATE updates, system changes, and important announcements.",
    sectionTitle: "Recent Updates",
    itemIcon: Volume2,
    items: [
      { title: "System maintenance on May 12,2024", meta: "May 10, 2024" },
      { title: "New Features: eSanchit integration", meta: "May 8, 2024" },
      { title: "User Interface Enhancements Deployed", meta: "May 6, 2024" },
    ],
  },
  {
    id: "export-guides",
    icon: BookOpen,
    color: "bg-teal-500",
    title: "Export Guides",
    desc: "Step-by-step guides and resources to help you navigate the export process with ease.",
    sectionTitle: "Top Guides",
    itemIcon: FileText,
    items: [
      {
        title: "Step-by-Step Export Process from India",
        meta: "Complete guide to exporting goods from India",
      },
      {
        title: "Export Documentation Checklist",
        meta: "Essential documents required for smooth export",
      },
      {
        title: "Export Incentives & Schemes",
        meta: "Benefits and schemes for Indian exporters",
      },
    ],
  },
  {
    id: "import-guides",
    icon: ClipboardList,
    color: "bg-blue-400",
    title: "Import Guides",
    desc: "Detailed information and practical guides to simplify your import process and compliance.",
    sectionTitle: "Top Guides",
    itemIcon: FileText,
    items: [
      {
        title: "Step-by-Step Import Process in India",
        meta: "A complete guide to importing goods into India",
      },
      {
        title: "Import Documentation Checklist",
        meta: "Documents required for hassle-free imports",
      },
      {
        title: "Customs Duties & Import Regulations",
        meta: "Understand duties, taxes and import regulations",
      },
    ],
  },
  {
    id: "hs-code-guide",
    icon: Grid2x2,
    color: "bg-green-600",
    title: "HS Code Guide",
    desc: "Find and understand HS codes to ensure accurate classification and smooth global trade.",
    sectionTitle: "Popular Resources",
    itemIcon: List,
    items: [
      {
        title: "How to find a right HS Code",
        meta: "Step-by-step guide to find right hs code",
      },
      {
        title: "HS Code classification rules",
        meta: "General rules for integration of HS Code",
      },
      {
        title: "HS Code search tool",
        meta: "Search and find HS code by product description",
      },
    ],
  },
  {
    id: "faqs",
    icon: MessageCircleQuestion,
    color: "bg-rose-500",
    title: "FAQs",
    desc: "Find answers to the most commonly asked questions about trade, compliance, and our platform.",
    sectionTitle: "Popular Questions",
    itemIcon: null,
    items: [
      {
        title: "What documents are required for export/import?",
        meta: "Get details on essential documents",
      },
      {
        title: "How to calculate customs duty?",
        meta: "Learn how customs duties are calculated",
      },
      {
        title: "What is HS code and why is it important?",
        meta: "Understand the importance of HS code",
      },
    ],
  },
];
