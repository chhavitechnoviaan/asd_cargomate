import { useState, useRef, useEffect } from "react";
import { FiX, FiPlus, FiChevronDown, FiPhone, FiMessageSquare, FiCheckCircle, FiStar, FiZap } from "react-icons/fi";
import { BsCalendar2Check, BsPerson, BsFileText,  } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdOutlineWhatsapp } from "react-icons/md";
import { RiWhatsappLine } from "react-icons/ri";



function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${checked ? "bg-teal-500" : "bg-gray-300"}`}
    >
      <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none">
        <span>{value}</span>
        <FiChevronDown className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} size={15} />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {options.map((o) => (
            <button key={o} onClick={() => { onChange(o); setOpen(false); }} className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${value === o ? "bg-blue-100 text-gray-800" : "text-gray-600 hover:bg-gray-50"}`}>{o}</button>
          ))}
        </div>
      )}
    </div>
  );
}


const botIntents = [
  "Greeting/Welcome Flow", "Freight Quote Request", "DGFT Scheme Eligibility",
  "Shipment Track & Trace", "Document Checklist", "Document Checklist", "Human Handoff",
];

const chatMessages = [
  { from: "bot", text: "" }, { from: "user", text: "" },
  { from: "bot", text: "" }, { from: "user", text: "" },
  { from: "bot", text: "" },
];

export default function WhatsappBot({showBot, setShowBot, fabOpen, setFabOpen}) {

 
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);
  const [webhookResult, setWebhookResult] = useState(null);
  const [intents, setIntents] = useState(botIntents.map((name) => ({ name, active: true })));

  const [apiForm, setApiForm] = useState({
    phone: "+91 9889888",
    token: "",
    url: "https://api.cargomate.in/webhook/whatsapp",
  });

  const [aiForm, setAiForm] = useState({
    provider: "Anthropic (Claude)",
    language: "English + Hindi (Auto-detect)",
    schemeAnswer: true,
    freightQuotes: true,
    trackTrace: true,
  });

  const handleApiChange = (k, v) => setApiForm((p) => ({ ...p, [k]: v }));
  const handleAiChange = (k, v) => setAiForm((p) => ({ ...p, [k]: v }));

  const handleSaveConfigure = (e) => {
    e.preventDefault();
    alert("Configuration saved!");
  };

  const handleTestWebhook = () => {
    setWebhookResult("testing");
    setTimeout(() => setWebhookResult("success"), 1500);
  };

  const handleTestBot = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => { setTesting(false); setTestResult("Bot is live and responding correctly! ✓"); }, 2000);
  };

  

  const addIntent = () => {
    const name = prompt("Enter intent name:");
    if (name) setIntents((p) => [...p, { name, active: true }]);
  };

  const toggleIntent = (i) => setIntents((p) => p.map((item, idx) => idx === i ? { ...item, active: !item.active } : item));

  if (!showBot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <RiWhatsappLine className="text-teal-400 mx-auto mb-3" size={48} />
          <p className="text-gray-500 text-sm">Click the <span className="font-semibold text-teal-600">+</span> button to open WhatsApp Bot</p>
        </div>

        {fabOpen && (
          <div className="fixed inset-0 z-30" onClick={() => setFabOpen(false)} />
        )}
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
          {fabOpen && (
            <div className="flex flex-col gap-2 items-end mb-1">
              {fabActions.map((a, i) => (
                <button key={i} onClick={() => handleFabAction(a.label)} className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2.5 hover:bg-gray-50 transition-all">
                  <span className="text-sm font-medium text-gray-700">{a.label}</span>
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">{a.icon}</div>
                </button>
              ))}
            </div>
          )}
          <button onClick={() => setFabOpen(!fabOpen)} className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all ${fabOpen ? "bg-gray-600 rotate-45" : "bg-teal-500 hover:bg-teal-600"}`}>
            {fabOpen ? <FiX size={22} /> : <FiPlus size={24} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-5 sm:px-5 sm:py-7 relative">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-base sm:text-lg font-bold text-gray-800">WhatsApp Bot Configuration</h1>
            <p className="text-xs text-gray-500 mt-0.5">Manage your AI-powered WhatsApp chatbot for SME exporters</p>
          </div>
          <button onClick={handleTestBot} disabled={testing} className="px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-full transition-colors flex-shrink-0">
            {testing ? "Testing..." : "Test Bot"}
          </button>
        </div>

        {testResult && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm text-green-700 flex items-center justify-between">
            <span>{testResult}</span>
            <button onClick={() => setTestResult(null)}><FiX size={15} /></button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Active Users", value: "2,840", icon: <FiPhone className="text-orange-400" size={20} /> },
            { label: "Messages Today", value: "14,320", icon: <FiMessageSquare className="text-teal-500" size={20} /> },
            { label: "Avg Response (sec)", value: "1.8s", icon: <FiCheckCircle className="text-teal-500" size={20} /> },
            { label: "Satisfaction", value: "94.2%", icon: <FiStar className="text-yellow-400" size={20} /> },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4">
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs text-gray-500">{s.label}</p>
                {s.icon}
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">WhatsApp Business API</h2>
            <div className="flex items-center justify-between bg-teal-50 rounded-lg px-3 py-2 mb-4">
              <span className="text-sm font-medium text-gray-700">Bot Status</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-teal-600">
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span> Live
              </span>
            </div>
            <form onSubmit={handleSaveConfigure} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Business Phone Number</label>
                <input type="text" value={apiForm.phone} onChange={(e) => handleApiChange("phone", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Whatsapp API Token</label>
                <input type="text" value={apiForm.token} onChange={(e) => handleApiChange("token", e.target.value)} placeholder="Enter Token Id" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Website URL</label>
                <input type="text" value={apiForm.url} onChange={(e) => handleApiChange("url", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-300" />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors">
                  Save Configure
                </button>
                <button type="button" onClick={handleTestWebhook} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  {webhookResult === "testing" ? "Testing..." : webhookResult === "success" ? "✓ Connected" : "Test Webhook"}
                </button>
              </div>
            </form>
          </div>

          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Live Bot Preview</h2>
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <div className="bg-teal-700 px-3 py-2 flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <RiWhatsappLine className="text-white" size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">ASD CargoMate</p>
                  <p className="text-xs text-teal-200">● Online</p>
                </div>
              </div>
              <div className="p-3 space-y-2 min-h-48 bg-amber-50">
                <div className="flex justify-start"><div className="bg-white rounded-xl rounded-tl-none px-3 py-2 text-xs text-gray-600 max-w-xs shadow-sm w-32 h-8" /><span className="text-xs text-gray-400 ml-1 self-end">10:32 AM</span></div>
                <div className="flex justify-end"><span className="text-xs text-gray-400 mr-1 self-end">10:32 AM</span><div className="bg-teal-100 rounded-xl rounded-tr-none px-3 py-2 text-xs max-w-xs shadow-sm w-24 h-8" /></div>
                <div className="flex justify-start"><div className="bg-white rounded-xl rounded-tl-none px-3 py-2 text-xs text-gray-600 max-w-xs shadow-sm w-36 h-8" /><span className="text-xs text-gray-400 ml-1 self-end">10:32 AM</span></div>
                <div className="flex justify-end"><span className="text-xs text-gray-400 mr-1 self-end">10:32 AM</span><div className="bg-teal-100 rounded-xl rounded-tr-none px-3 py-2 text-xs max-w-xs shadow-sm w-20 h-8" /></div>
                <div className="flex justify-start"><div className="bg-white rounded-xl rounded-tl-none px-3 py-2 text-xs text-gray-600 max-w-xs shadow-sm w-28 h-8" /><span className="text-xs text-gray-400 ml-1 self-end">10:32 AM</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-4">AI Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1.5">AI Provider</label>
                <CustomSelect value={aiForm.provider} onChange={(v) => handleAiChange("provider", v)} options={["Anthropic (Claude)", "Open AI", "Google AI"]} />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1.5">Default Language</label>
                <CustomSelect value={aiForm.language} onChange={(v) => handleAiChange("language", v)} options={["English + Hindi (Auto-detect)", "English Only", "Hindi Only"]} />
              </div>
              {[
                { key: "schemeAnswer", label: "Scheme Eligible Answer", sub: "Auto-calculate RoDTEP, EPCO, drawback" },
                { key: "freightQuotes", label: "Instant Freight Quotes", sub: "Pull live rates when user asks" },
                { key: "trackTrace", label: "track & trace via WhatsApp", sub: "Reply with live vessels position" },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium text-gray-700">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>
                  </div>
                  <Toggle checked={aiForm[item.key]} onChange={(v) => handleAiChange(item.key, v)} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-800">Bot Intents (Flow)</h2>
              <button onClick={addIntent} className="w-8 h-8 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center transition-colors">
                <FiPlus size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {intents.map((intent, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{intent.name}</span>
                  <button onClick={() => toggleIntent(i)} className={`text-xs font-semibold ${intent.active ? "text-teal-500" : "text-gray-400"}`}>
                    {intent.active ? "Active" : "Inactive"}
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addIntent} className="mt-3 w-full py-2 text-sm text-gray-500 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
              <FiPlus size={14} /> Add New Intent
            </button>
          </div>
        </div>
      </div>

     
    </div>
  );
}



