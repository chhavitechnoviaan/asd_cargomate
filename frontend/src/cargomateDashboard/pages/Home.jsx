import { FiPlay } from "react-icons/fi";
import { MdOutlineLocalShipping, MdOutlineGavel, MdOutlineBarChart } from "react-icons/md";
import { TbRobot, TbGift, TbTrendingUp, TbBuildingWarehouse } from "react-icons/tb";
import { BsGlobeAmericas } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { TbMessageCircle, TbBulb, TbPackage, TbCircleCheck } from "react-icons/tb";
import { MdOutlineImportExport } from "react-icons/md";
import { BsBuilding, BsGlobe2, BsPeopleFill } from "react-icons/bs";
import { RiMedalLine, RiShieldCheckLine, RiAwardLine } from "react-icons/ri";
import { BsStars, BsTwitterX, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";
import homeImg from '../assets/Images/image.png';
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate()
  return (
    <section className="bg-white min-h-screen flex items-center px-4 sm:px-8 md:px-12 lg:px-20 py-12 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
        <div className="flex-1 z-10 ">
          <span className="inline-flex items-center gap-2 border border-teal-400 text-teal-600 text-xs font-medium py-4 px-2 rounded-xl mb-6">
         
            <span className="w-1.5 h-1.5 bg-teal-500  sm:text-xl rounded-full " />
            AI Powered Platform
          </span> 

          <div className="flex gap-3">
             <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              onClick={() => navigate("/b2b-dashboard")}>
                 B2b Dashboard </button>
              <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
               onClick={() => navigate("/user-dashboard")}> User Dashboard</button>

               {/* <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
               onClick={() => navigate("/chatbot")}> chatbot</button> */}
             </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
            <span className="text-teal-500">AI-Powered</span> Global
            <br className="hidden sm:block" /> Trade & Logistics
            <br className="hidden sm:block" /> Intelligence
          </h1>

          <p className="text-gray-500 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
            One platform for EXIM benefits, freight insights, compliance guidance, and trade planning
          </p>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/admin-dashboard')} className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
              Get Started
            </button>
            <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
              <FiPlay size={13} />
              Request for Demo
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
            <img src={homeImg} />
        </div>
      </div>
    </section>
  );
}

function GlobalTradeSection() {
  const challenges = [
    {
      icon: MdOutlineBarChart,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      title: "Complex EXIM Incentives",
      desc: "Difficult to understand government schemes",
    },
    {
      icon: MdOutlineLocalShipping,
      color: "text-teal-500",
      bg: "bg-teal-50",
      title: "Freight Cost Uncertainty",
      desc: "Lack of transparency in pricing",
    },
    {
      icon: MdOutlineGavel,
      color: "text-gray-400",
      bg: "bg-gray-50",
      title: "Compliance Risks",
      desc: "Errors lead to losses and delays",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Challenges in Global Trade
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Traditional trade processes are complex, costly, and time-consuming
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={20} className={color} />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CargoMateSection() {
  const features = [
    {
      icon: TbRobot,
      color: "text-teal-600",
      bg: "bg-teal-500",
      title: "Ask CargoMate",
      desc: "AI Assistant for instant trade insights and guidance",
    },
    {
      icon: TbGift,
      color: "text-yellow-600",
      bg: "bg-yellow-500",
      title: "EXIM Benefits Finder",
      desc: "Discover government schemes and incentives for your business",
    },
    {
      icon: TbTrendingUp,
      color: "text-teal-600",
      bg: "bg-teal-500",
      title: "Ask CargoMate",
      desc: "AI Assistant for instant trade insights and guidance",
    },
    {
      icon: TbBuildingWarehouse,
      color: "text-yellow-600",
      bg: "bg-yellow-500",
      title: "Trade Planning Tools",
      desc: "End-to-end shipment planning and documentation",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Meet ASD CargoMate™
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Your intelligent companion for seamless global trade operations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, bg, title, desc }, i) => (
            <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


 
const steps = [
  {
    num: "1",
    icon: TbMessageCircle,
    title: "Ask a Question",
    desc: "Query trade, logistics, or compliance topics",
  },
  {
    num: "2",
    icon: TbBulb,
    title: "Get AI Insight",
    desc: "Receive instant, accurate guidance",
  },
  {
    num: "3",
    icon: TbPackage,
    title: "Plan Shipment",
    desc: "Create optimal trade strategy",
  },
  {
    num: "4",
    icon: TbCircleCheck,
    title: "Execute with Confidence",
    desc: "Ship with full compliance",
  },
];
 
const audiences = [
  { icon: MdOutlineImportExport, label: "Exporters", bg: "bg-teal-50", color: "text-teal-600" },
  { icon: MdOutlineLocalShipping, label: "Importers", bg: "bg-gray-50", color: "text-gray-600" },
  { icon: MdOutlineLocalShipping, label: "Freight Forwarders", bg: "bg-yellow-50", color: "text-yellow-600" },
  { icon: BsBuilding, label: "MSMEs", bg: "bg-indigo-50", color: "text-indigo-500" },
  { icon: BsGlobe2, label: "Enterprises", bg: "bg-gray-50", color: "text-gray-500" },
];
 
const certs = [
  { icon: BsPeopleFill, title: "MSME Registered", desc: "Official MSME certification" },
  { icon: RiShieldCheckLine, title: "Trademark Applied", desc: "IP protection in progress" },
  { icon: RiAwardLine, title: "10+ Years Logistics Expertise", desc: "Proven industry experience" },
];
 
function HowItWorks() {
  return (
    <section className="bg-[#F8FBFF] py-14 px-4 sm:px-8 md:px-12 lg:px-20 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
          <p className="text-gray-500 text-sm sm:text-base">Simple, powerful, and designed for your success</p>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map(({ num, icon: Icon, title, desc }, i) => (
            <div key={i} className="relative">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col items-center text-center h-full">
                <span className="absolute -top-3 -right-2 sm:-right-3 w-7 h-7 bg-yellow-400 text-white text-xs font-bold rounded-full flex items-center justify-center z-10 shadow">
                  {num}
                </span>
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mb-4 mt-2">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
 
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 items-center justify-center">
                  <FiArrowRight size={16} className="text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function WhoIsFor() {
  return (
    <section className="bg-blue-50 py-14 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Who Is For</h2>
          <p className="text-gray-500 text-sm sm:text-base">Simple, powerful, and designed for your success</p>
          <div className="flex justify-center mt-3">
            <BsGlobe2 size={18} className="text-gray-400" />
          </div>
        </div>
 
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {audiences.map(({ icon: Icon, label, bg, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center gap-3">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
                <Icon size={22} className={color} />
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-700">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function TrustedCertified() {
  return (
    <section className="bg-white py-14 px-4 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Trusted & Certified</h2>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certs.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-teal-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-0.5">{title}</h3>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function CTASection() {
    return (
      <section className="relative bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900 py-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800/30 via-transparent to-teal-800/20 pointer-events-none" />
   
        <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 bg-gray-700/70 border border-gray-600 text-gray-200 text-xs font-medium px-4 py-1.5 rounded-full">
            <BsStars size={13} className="text-yellow-400" />
            Limited Time Offer
          </span>
   
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            Start Smarter Global Trade Today
          </h2>
   
          <p className="text-sm sm:text-base text-blue-300 underline underline-offset-2 max-w-md leading-relaxed">
            Join of businesses transforming their trade operations with AI-powered intelligence
          </p>
   
          {/* <p className="text-gray-400 text-xs sm:text-sm">
            No credit card required • Free 14-day trial • Cancel anytime
          </p> */}
        </div>
      </section>
    );
  }

export default function Home() {
  return (
    <div className="min-h-screen ">
      <HeroSection />
      <GlobalTradeSection />
      <CargoMateSection />
 
      <HowItWorks />
      <WhoIsFor />
      <TrustedCertified />

      <CTASection />


    </div>
  );
}