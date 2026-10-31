import { useState } from "react";
import {
  Search,
  HelpCircle,
  PlayCircle,
  GraduationCap,
  Headphones,
  BookOpen,
  Play,
  BookMarked,
  ChevronRight,
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Footer from "../components/Footer";
import {
  AllFAQsModal,
  AllVideosModal,
  AllTrainingModal,
  AllSupportModal,
  AllKnowledgeModal,
} from "../components/HelpCenterModals";
import {
  previewFAQs,
  previewVideos,
  previewTraining,
  previewSupportOptions,
  knowledgeColumns,
  helpQuickLinks,
  trustedCompanies,
  stillNeedHelpPoints,
} from "../data/helpCenterData";
import helpHero from "../assets/resources-hero.png";
import supportAgent from "../assets/contact-hero.png";

const quickLinkIcons = {
  faqs: HelpCircle,
  videos: PlayCircle,
  training: GraduationCap,
  support: Headphones,
  knowledge: BookOpen,
};

const quickLinkColors = {
  faqs: "text-blue-600 bg-blue-50",
  videos: "text-purple-600 bg-purple-50",
  training: "text-green-600 bg-green-50",
  support: "text-orange-600 bg-orange-50",
  knowledge: "text-blue-600 bg-blue-50",
};

const supportIconMap = {
  "Raise a Ticket": Mail,
  "Live Chat": MessageCircle,
  "Call Us": Phone,
  Feedback: MessageSquare,
};

const HelpCenterPage = ({ onNavigate }) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (id) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative bg-blue-950 bg-cover bg-center"
        style={{ backgroundImage: `url(${helpHero})` }}
      >
        <div className="absolute inset-0 bg-blue-950/70" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-blue-100 text-lg mb-2">We're here to help you succeed</p>
          <p className="text-blue-200 max-w-xl mb-8">
            Find answers, watch tutorials and get the support you need to make the most of ASD
            CargoMate
          </p>
          <div className="flex items-center bg-white rounded-lg overflow-hidden max-w-xl shadow-lg">
            <Search className="ml-4 text-gray-400 shrink-0" size={20} />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles, topics or questions..."
              className="flex-1 px-3 py-3 text-sm text-gray-700 focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-3 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-b border-gray-200 pb-12">
          {helpQuickLinks.map((link) => {
            const Icon = quickLinkIcons[link.id];
            return (
              <button
                key={link.id}
                onClick={() => openModal(link.id)}
                className="flex flex-col items-center text-center gap-3 group"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center ${quickLinkColors[link.id]} group-hover:scale-105 transition`}
                >
                  <Icon size={24} />
                </div>
                <p className="font-bold text-gray-900 text-sm">{link.label}</p>
                <p className="text-xs text-gray-500">{link.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <HelpCircle className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900">FAQs</h3>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Browse frequently asked questions and get instantly answers.
            </p>
            <div className="space-y-2 mb-5 flex-1">
              {previewFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-3 text-sm text-gray-700"
                >
                  {faq.question}
                  <ChevronRight size={14} className="text-gray-400 shrink-0" />
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("faqs")}
              className="inline-flex items-center gap-1.5 text-blue-600 font-medium text-sm hover:gap-2.5 transition-all"
            >
              View All FAQs <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                <PlayCircle className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Videos</h3>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Watch short and helpful videos to learn and solve issues quickly.
            </p>
            <div className="space-y-3 mb-5 flex-1">
              {previewVideos.map((video) => (
                <div key={video.id} className="flex items-center gap-3">
                  <div className="relative w-16 h-11 rounded-md bg-purple-900 flex items-center justify-center shrink-0">
                    <Play className="text-white" size={16} fill="white" />
                    <span className="absolute bottom-0.5 right-0.5 text-[9px] text-white bg-black/60 px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium">{video.title}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("videos")}
              className="inline-flex items-center gap-1.5 text-purple-600 font-medium text-sm hover:gap-2.5 transition-all"
            >
              View All Videos <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Training</h3>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Improve your skills with our experts training materials.
            </p>
            <div className="space-y-3 mb-5 flex-1">
              {previewTraining.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shrink-0">
                    <BookMarked className="text-green-600" size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{item.title}</p>
                    <p className="text-[11px] text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("training")}
              className="inline-flex items-center gap-1.5 text-green-600 font-medium text-sm hover:gap-2.5 transition-all"
            >
              View All Training <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-orange-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <Headphones className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Support</h3>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Our support team is ready to help you choose the best way to connect with us.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {previewSupportOptions.map((option) => {
                const Icon = supportIconMap[option.title] || Mail;
                return (
                  <div key={option.id} className="bg-white rounded-xl p-4">
                    <Icon className="text-orange-500 mb-2" size={18} />
                    <p className="text-xs font-bold text-gray-900">{option.title}</p>
                    <p className="text-[11px] text-gray-500 mt-1 whitespace-pre-line">
                      {option.description}
                    </p>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => openModal("support")}
              className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition"
            >
              Contact Support <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <BookOpen className="text-white" size={20} />
              </div>
              <h3 className="font-bold text-gray-900">Knowledge</h3>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              Explore our detailed guides and articles to help you better.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {knowledgeColumns.map((col) => (
                <div key={col.id}>
                  <p className="font-bold text-gray-900 text-sm mb-3">{col.heading}</p>
                  <div className="space-y-2">
                    {col.links.map((link) => (
                      <p key={link} className="text-sm text-gray-600">
                        {link}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("knowledge")}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition"
            >
              Browse All Articles <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-blue-50 rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Still Need Help?</h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to assist you
              personally.
            </p>
            <button
              onClick={() => openModal("support")}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6 py-3 rounded-lg transition"
            >
              Contact Our Team <ArrowRight size={16} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center text-blue-600 shrink-0">
              <Clock size={28} />
              <span className="text-xs font-bold text-blue-900 mt-1 whitespace-nowrap">
                24/7 Support
              </span>
            </div>
            <img
              src={supportAgent}
              alt="Support agent ready to help"
              className="w-40 sm:w-48 md:w-56 object-contain shrink-0"
            />
            <div className="space-y-2 shrink-0">
              {stillNeedHelpPoints.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="text-blue-600 shrink-0" size={16} />
                  <span className="text-sm text-gray-700 whitespace-nowrap">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 text-center">
        <p className="text-gray-500 font-medium mb-8">Trusted by 1000+ Businesses Worldwide</p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {trustedCompanies.map((name) => {
            const [first, ...rest] = name.split(" ");
            return (
              <div
                key={name}
                className="border border-gray-200 rounded-lg py-3 px-2 text-gray-500 text-xs font-semibold"
              >
                <p className="text-gray-800">{first}</p>
                <p>{rest.join(" ")}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      {activeModal === "faqs" && <AllFAQsModal onClose={closeModal} />}
      {activeModal === "videos" && <AllVideosModal onClose={closeModal} />}
      {activeModal === "training" && <AllTrainingModal onClose={closeModal} />}
      {activeModal === "support" && <AllSupportModal onClose={closeModal} />}
      {activeModal === "knowledge" && <AllKnowledgeModal onClose={closeModal} />}
    </div>
  );
};

export default HelpCenterPage;
