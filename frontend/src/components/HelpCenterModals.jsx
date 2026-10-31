import { useState } from "react";
import {
  X,
  Search,
  HelpCircle,
  PlayCircle,
  GraduationCap,
  Headphones,
  BookOpen,
  Play,
  ChevronRight,
  Mail,
  MessageCircle,
  Phone,
  MessageSquare,
} from "lucide-react";
import {
  topFAQs,
  videoCategories,
  allVideos,
  trainingItems,
  supportOptions,
  supportHours,
  knowledgeArticles,
} from "../data/helpCenterData";

const supportIconMap = {
  "Raise a Ticket": Mail,
  "Live Chat": MessageCircle,
  "Call Us": Phone,
  Feedback: MessageSquare,
};

const ModalShell = ({ icon: Icon, iconColor, headerBg, title, description, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className={`${headerBg} px-6 py-6 flex items-start gap-4 relative shrink-0`}>
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
            <Icon className={iconColor} size={24} />
          </div>
          <div className="pr-8">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export const AllFAQsModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const filtered = topFAQs.filter((faq) =>
    faq.question.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ModalShell
      icon={HelpCircle}
      iconColor="text-blue-600"
      headerBg="bg-blue-50"
      title="All FAQs"
      description="Browse frequently asked questions and get instantly answers."
      onClose={onClose}
    >
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <h3 className="font-bold text-gray-900 mb-3">Top FAQs</h3>
      <div className="space-y-2">
        {filtered.map((faq) => (
          <button
            key={faq.id}
            className="w-full flex items-center justify-between text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition"
          >
            <span className="text-sm text-gray-800">{faq.question}</span>
            <ChevronRight className="text-gray-400" size={16} />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 py-4">No FAQs match your search.</p>
        )}
      </div>
    </ModalShell>
  );
};

export const AllVideosModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Video");

  const filtered = allVideos.filter((video) => {
    const matchesCategory = activeCategory === "All Video" || video.category === activeCategory;
    const matchesQuery = video.title.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <ModalShell
      icon={PlayCircle}
      iconColor="text-purple-600"
      headerBg="bg-purple-50"
      title="All Videos"
      description="Watch short and helpful videos to learn and solve issues quickly."
      onClose={onClose}
    >
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <button
            onClick={() => setActiveCategory("All Video")}
            className={`w-full text-left px-4 py-3 rounded-lg font-bold mb-2 ${
              activeCategory === "All Video" ? "bg-purple-50 text-purple-700" : "text-gray-700"
            }`}
          >
            All Video
          </button>
          <div className="space-y-1">
            {videoCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                  activeCategory === cat
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 space-y-3">
          {filtered.map((video) => (
            <div key={video.id} className="flex items-center gap-3">
              <div className="relative w-24 h-16 rounded-lg bg-purple-900 flex items-center justify-center shrink-0 overflow-hidden">
                <Play className="text-white" size={22} fill="white" />
                <span className="absolute bottom-1 right-1 text-[10px] text-white bg-black/60 px-1 rounded">
                  {video.duration}
                </span>
              </div>
              <p className="text-sm text-gray-800 font-medium">{video.title}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-gray-500 py-4">No videos in this category.</p>
          )}
        </div>
      </div>
    </ModalShell>
  );
};

export const AllTrainingModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const filtered = trainingItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ModalShell
      icon={GraduationCap}
      iconColor="text-green-600"
      headerBg="bg-green-50"
      title="All Training"
      description="Improve your skills with our experts training materials."
      onClose={onClose}
    >
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search training..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="space-y-2">
        {filtered.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center justify-between text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition"
          >
            <div>
              <p className="text-sm font-bold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
            </div>
            <ChevronRight className="text-gray-400 shrink-0" size={16} />
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 py-4">No training resources match your search.</p>
        )}
      </div>
    </ModalShell>
  );
};

export const AllSupportModal = ({ onClose }) => {
  return (
    <ModalShell
      icon={Headphones}
      iconColor="text-orange-600"
      headerBg="bg-orange-50"
      title="All Support Options"
      description="Our support is ready to help you."
      onClose={onClose}
    >
      <h3 className="font-bold text-gray-900 mb-4">How can we help you?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {supportOptions.map((option) => {
          const Icon = supportIconMap[option.title] || Mail;
          return (
            <div
              key={option.id}
              className="border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:bg-orange-50/50 transition"
            >
              <Icon className="text-orange-500 mb-3" size={22} />
              <p className="font-bold text-gray-900 text-sm mb-1">{option.title}</p>
              <p className="text-xs text-gray-500 whitespace-pre-line">{option.description}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-orange-50 rounded-xl p-5">
        <p className="font-bold text-gray-900 mb-2">Support Hours</p>
        <div className="space-y-1">
          {supportHours.map((line) => (
            <p key={line} className="text-sm text-gray-600">
              {line}
            </p>
          ))}
        </div>
      </div>
    </ModalShell>
  );
};

export const AllKnowledgeModal = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const filtered = knowledgeArticles.filter((article) =>
    article.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ModalShell
      icon={BookOpen}
      iconColor="text-blue-600"
      headerBg="bg-blue-50"
      title="All Knowledge Articles"
      description="Explore our detailed guides and articles to help you better."
      onClose={onClose}
    >
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <h3 className="font-bold text-gray-900 mb-3">Popular Activities</h3>
      <div className="space-y-3">
        {filtered.map((article) => (
          <button
            key={article}
            className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 transition"
          >
            {article}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500 py-4">No articles match your search.</p>
        )}
      </div>
    </ModalShell>
  );
};
