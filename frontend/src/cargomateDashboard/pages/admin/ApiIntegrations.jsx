import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  FaPlus, FaEye, FaEyeSlash, FaCopy, FaCheck, FaPen,
  FaXmark, FaChevronDown, FaPlug, FaArrowLeft, FaCircleCheck,
  FaCircleInfo, FaTriangleExclamation
} from "react-icons/fa6";

const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange(!checked)}
    className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${checked ? "bg-teal-500" : "bg-gray-300"}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
  </div>
);

const apiCards = [
  { id: 1, name: "DHI Express API", sub: "Shipping and tracking integration", logo: "DHL", bg: "bg-yellow-400", connected: true },
  { id: 2, name: "UPS Developer API", sub: "Shipping and tracking integration", logo: "UPS", bg: "bg-yellow-700", connected: true },
  { id: 3, name: "FedEx API", sub: "Shipping and tracking integration", logo: "FedEx", bg: "bg-purple-700", connected: false },
  { id: 4, name: "Aramex API", sub: "Shipping and tracking integration", logo: "aramex", bg: "bg-red-500", connected: true },
  { id: 5, name: "Blue Dart API", sub: "Shipping and tracking integration", logo: "BD", bg: "bg-blue-800", connected: true },
  { id: 6, name: "Custom API", sub: "Shipping and tracking integration", logo: "API", bg: "bg-teal-500", connected: true },
];

const selectableApis = [
  { id: 1, name: "DHI Express API", sub: "Shipping and tracking", logo: "DHL", bg: "bg-yellow-400" },
  { id: 2, name: "Aramex API", sub: "Shipping and tracking", logo: "aramex", bg: "bg-red-500" },
  { id: 3, name: "UPS Developer API", sub: "Shipping and tracking", logo: "UPS", bg: "bg-yellow-700" },
  { id: 4, name: "FedEx API", sub: "Shipping and tracking", logo: "FedEx", bg: "bg-purple-700" },
  { id: 5, name: "Aramex API", sub: "Shipping and tracking", logo: "aramex", bg: "bg-red-500" },
  { id: 6, name: "UPS API", sub: "Shipping and tracking", logo: "UPS", bg: "bg-yellow-700" },
  { id: 7, name: "FedEx Express", sub: "Shipping and tracking", logo: "FedEx", bg: "bg-purple-600" },
  { id: 8, name: "FedEx Ground", sub: "Shipping and tracking", logo: "FedEx", bg: "bg-purple-500" },
  { id: 9, name: "Aramex Light", sub: "Shipping and tracking", logo: "aramex", bg: "bg-red-400" },
  { id: 10, name: "UPS Express", sub: "Shipping and tracking", logo: "UPS", bg: "bg-yellow-600" },
  { id: 11, name: "FedEx Intl", sub: "Shipping and tracking", logo: "FedEx", bg: "bg-blue-700" },
  { id: 12, name: "FedEx Lite", sub: "Shipping and tracking", logo: "FedEx", bg: "bg-blue-600" },
];

function LogoBadge({ logo, bg, size = "w-10 h-10" }) {
  return (
    <div className={`${size} ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-xs font-bold">{logo}</span>
    </div>
  );
}

function ApiKeyField({ label, value, onChange }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  return (
    <div>
      {label && <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>}
      <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 bg-gray-50 focus-within:border-teal-500 transition-all">
        <input type={show ? "text" : "password"} className="flex-1 text-sm outline-none bg-transparent text-gray-600"
          value={value} onChange={onChange ? e => onChange(e.target.value) : undefined} readOnly={!onChange} placeholder="••••••••••••••••••••" />
        <button onClick={() => setShow(!show)} className="text-gray-400 hover:text-gray-600 transition-colors">
          {show ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
        </button>
        <button onClick={copy} className="text-gray-400 hover:text-teal-500 transition-colors">
          {copied ? <FaCheck className="text-sm text-teal-500" /> : <FaCopy className="text-sm" />}
        </button>
      </div>
    </div>
  );
}

function EditModal({ title, fields, values, onClose, onSave }) {
  const [form, setForm] = useState({ ...values });
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">Edit {title}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><FaXmark /></button>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          {fields.map(f => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">{f.label}</label>
              {f.type === "select" ? (
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white"
                  value={form[f.key] || ""} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}>
                  {f.options.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : f.type === "toggle" ? (
                <div className="flex items-center gap-2">
                  <Toggle checked={!!form[f.key]} onChange={v => setForm(p => ({ ...p, [f.key]: v }))} />
                  <span className="text-sm text-gray-600">{form[f.key] ? "Active" : "Inactive"}</span>
                </div>
              ) : (
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 transition-all"
                  value={form[f.key] || ""} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium">Save</button>
        </div>
      </div>
    </div>
  );
}

function StepBar({ step }) {
  const steps = ["Select and Integration", "Configure", "Review"];
  return (
    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i < step ? "bg-teal-500 border-teal-500 text-white" : i === step ? "border-teal-500 text-teal-500 bg-white" : "border-gray-300 text-gray-400 bg-white"}`}>
            {i < step ? <FaCheck className="text-xs" /> : i + 1}
          </div>
          <span className={`text-xs font-medium ${i <= step ? "text-teal-500" : "text-gray-400"}`}>{s}</span>
          {i < steps.length - 1 && <div className={`w-12 sm:w-20 h-0.5 ${i < step ? "bg-teal-500" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );
}


const mapCode = {
  "DHI Express API": "dhl",
  "UPS Developer API": "ups",
  "FedEx API": "fedex",
  "Aramex API": "aramex",
  "Blue Dart API": "bluedart",
  "Custom API": "custom"
};


function Step1({ onNext }) {
  const [selected, setSelected] = useState(1);
  return (
    <div>
      <StepBar step={0} />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {selectableApis.map(api => (
          <div key={api.id} onClick={() => setSelected(api.id)}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${selected === api.id ? "border-teal-400 bg-teal-50" : "border-gray-100 bg-white hover:border-gray-300"}`}>
            <div className="flex items-center justify-between mb-3">
              <LogoBadge logo={api.logo} bg={api.bg} size="w-10 h-10" />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === api.id ? "border-teal-500 bg-teal-500" : "border-gray-300"}`}>
                {selected === api.id && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
            </div>
            <p className="text-xs font-bold text-gray-800">{api.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{api.sub}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-5">
        <button onClick={() => onNext(selectableApis.find(a => a.id === selected))}
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
          Next: Configure
        </button>
      </div>
    </div>
  );
}

function Step2({ selectedApi, onBack, onNext }) {
  const [form, setForm] = useState({
    apiKey: "dhl_live_",
    secretKey: "dhl_live_",
    accountNumber: "1234567890",
    environment: "Saandbox (Testing)",
    autoSync: true,
    syncFrequency: "Every 5 minutes",
    webhookUrl: "https://api.cargomate.com",
    testAutoSync: true,
    status: true,
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const [tested, setTested] = useState(false);

  return (
    <div>
      <StepBar step={1} />
      <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-0.5">Configure Integration</h1>
      <p className="text-xs text-gray-400 mb-5">Enter API credentials and connection settings</p>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-700 mb-3">1. Selected Integration</p>
            <div className="flex items-start gap-3">
              <LogoBadge logo={selectedApi?.logo} bg={selectedApi?.bg} size="w-12 h-12" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-gray-800">{selectedApi?.name}</p>
                  <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-lg font-medium">Shipping & Tracking</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Connect your DHL Express account to automate shipping, tracking and rate requests.</p>
              </div>
              <button className="text-xs text-teal-500 hover:text-teal-600 flex items-center gap-1 flex-shrink-0 font-medium">
                <FaPen className="text-xs" /> Change integration
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-700 mb-3">2. API Credentials</p>
            <div className="flex flex-col gap-3">
              <div>
                <ApiKeyField label="API Key" value={form.apiKey} onChange={v => set("apiKey", v)} />
                <p className="text-xs text-teal-500 mt-1 flex items-center gap-1"><FaCircleCheck className="text-xs" /> Looks good</p>
              </div>
              <div>
                <ApiKeyField label="Secret Key" value={form.secretKey} onChange={v => set("secretKey", v)} />
                <p className="text-xs text-teal-500 mt-1 flex items-center gap-1"><FaCircleCheck className="text-xs" /> Looks good</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Account Number (Optional)</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 transition-all"
                  value={form.accountNumber} onChange={e => set("accountNumber", e.target.value)} />
                <p className="text-xs text-teal-500 mt-1 flex items-center gap-1"><FaCircleCheck className="text-xs" /> Looks good</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-700 mb-3">3. Environment</p>
            <p className="text-xs text-gray-400 mb-2">Choose the environment for this integration</p>
            <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
              value={form.environment} onChange={e => set("environment", e.target.value)}>
              <option>Saandbox (Testing)</option>
              <option>Production (Live)</option>
              <option>Staging</option>
            </select>
            <p className="text-xs text-gray-400 mt-2">Use sandbox for testing purpose only.</p>
            <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2">
              <p className="text-xs text-blue-500 flex items-center gap-1.5"><FaCircleInfo className="text-xs" /> You can switch to production after verifying the connection</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-700 mb-3">4. connection Settings</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-700">Auto Sync</p>
                  <p className="text-xs text-gray-400">Automatically sync data with DHL</p>
                </div>
                <Toggle checked={form.autoSync} onChange={v => set("autoSync", v)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Sync Frequency</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white"
                  value={form.syncFrequency} onChange={e => set("syncFrequency", e.target.value)}>
                  <option>Every 5 minutes</option><option>Every 15 minutes</option><option>Every hour</option><option>Daily</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Webhook URL</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-teal-500 bg-white"
                  value={form.webhookUrl} onChange={e => set("webhookUrl", e.target.value)}>
                  <option>https://api.cargomate.com</option><option>https://webhook.cargomate.com</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">The URL is pre-configures for your account.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-700 mb-3">5. Test Connection</p>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-medium text-gray-700">Auto Sync</p>
              </div>
              <Toggle checked={form.testAutoSync} onChange={v => set("testAutoSync", v)} />
            </div>
            <button onClick={async () => {
  try {
    const res = await API.post(`/integrations/test/${selectedApi.code}`);

    if (res.data.status === 1) {
      setTested(true);
    }

  } catch (err) {
    console.log(err);
  }
}}
              className={`w-full py-2 rounded-xl text-xs font-medium border transition-colors flex items-center justify-center gap-1.5 ${tested ? "bg-teal-50 border-teal-400 text-teal-600" : "border-teal-500 text-teal-500 hover:bg-teal-50"}`}>
              {tested ? <><FaCheck className="text-xs" /> Connection Successful</> : <><FaPlug className="text-xs" /> Test Connection</>}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-700 mb-3">6. Status</p>
            <p className="text-xs text-gray-400 mb-2">Set the initial of this integration</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Status</span>
              <Toggle checked={form.status} onChange={v => set("status", v)} />
              <span className={`text-xs font-medium ${form.status ? "text-teal-500" : "text-gray-400"}`}>{form.status ? "Active" : "Inactive"}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Integration will be active and start syncing.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5 bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors w-full sm:w-auto justify-center">
          <FaArrowLeft className="text-xs" /> Back
        </button>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-200 rounded-xl px-3 py-2">
            <FaCircleInfo className="text-gray-300 text-xs" /> Test connection must be successful
          </div>
          <button onClick={() => tested && onNext(form)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl font-medium transition-colors whitespace-nowrap ${tested ? "bg-teal-500 hover:bg-teal-600 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
            Next Review & Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function Step3({ selectedApi, configData, onBack, onConnect }) {
  const [editModal, setEditModal] = useState(null);
  const [data, setData] = useState({ ...configData });
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);

  const openEdit = (section, fields) => setEditModal({ section, fields });
  const handleSave = (section, values) => setData(p => ({ ...p, ...values }));

  return (
    <div>
      <StepBar step={2} />
      <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-0.5">Review Integration</h1>
      <p className="text-xs text-gray-400 mb-5">Verify Details before connecting</p>

      {editModal && (
        <EditModal
          title={editModal.section}
          fields={editModal.fields}
          values={data}
          onClose={() => setEditModal(null)}
          onSave={(values) => { handleSave(editModal.section, values); }}
        />
      )}

      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700">1. Integration Summary</p>
          </div>
          <div className="flex items-center gap-3 border border-gray-100 rounded-xl p-3">
            <LogoBadge logo={selectedApi?.logo} bg={selectedApi?.bg} size="w-10 h-10" />
            <div>
              <p className="text-sm font-bold text-gray-800">{selectedApi?.name}</p>
              <p className="text-xs text-gray-400">Connect your DHL. Express account to automate shipping, tracking and rate requests.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700">2. Credentials</p>
            <button onClick={() => openEdit("Credentials", [
              { key: "apiKey", label: "API Key", type: "text" },
              { key: "secretKey", label: "Secret Key", type: "text" },
              { key: "accountNumber", label: "Account Number", type: "text" },
            ])} className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition-colors">
              <FaPen className="text-xs" /> Edit
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "API Key", value: data.apiKey, show: showApiKey, toggle: () => setShowApiKey(!showApiKey) },
              { label: "Secret Key", value: data.secretKey, show: showSecretKey, toggle: () => setShowSecretKey(!showSecretKey) },
            ].map(f => (
              <div key={f.label} className="flex items-center justify-between border-b border-gray-50 pb-2">
                <span className="text-xs text-gray-500 w-28">{f.label}</span>
                <span className="text-xs text-gray-600 flex-1 text-center font-mono">{f.show ? f.value : "••••••••••••••••••••••••••••••"}</span>
                <button onClick={f.toggle} className="text-gray-400 hover:text-gray-600 ml-2">
                  {f.show ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 w-28">Account Number</span>
              <span className="text-xs text-gray-600 flex-1">{data.accountNumber}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700">3. Settings</p>
            <button onClick={() => openEdit("Settings", [
              { key: "environment", label: "Environment", type: "select", options: ["Sandbox", "Production", "Staging"] },
              { key: "syncFrequency", label: "Account Number", type: "text" },
              { key: "webhookUrl", label: "Webhook URL", type: "text" },
            ])} className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition-colors">
              <FaPen className="text-xs" /> Edit
            </button>
          </div>
          <div className="flex flex-col gap-2.5">
            {[
              { label: "Environment", value: <span className="bg-teal-100 text-teal-600 text-xs px-2 py-0.5 rounded-lg font-medium">Sandbox</span> },
              { label: "Secret Key", value: <span className="bg-teal-100 text-teal-600 text-xs px-2 py-0.5 rounded-lg font-medium">On</span> },
              { label: "Account Number", value: data.syncFrequency },
              { label: "Webhook URL", value: <span className="flex items-center gap-2">{data.webhookUrl} <FaCopy className="text-gray-400 text-xs cursor-pointer" /></span> },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between border-b border-gray-50 pb-2">
                <span className="text-xs text-gray-500 w-28 flex-shrink-0">{r.label}</span>
                <span className="text-xs text-gray-700 flex-1">{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700">4 Status</p>
            <button onClick={() => openEdit("Status", [
              { key: "status", label: "Integration Status", type: "toggle" },
            ])} className="flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-lg px-2.5 py-1.5 hover:bg-gray-50 transition-colors">
              <FaPen className="text-xs" /> Edit
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Integration Status</span>
            <div className="flex items-center gap-2">
              <Toggle checked={data.status} onChange={v => setData(p => ({ ...p, status: v }))} />
              <span className={`text-xs font-medium ${data.status ? "text-teal-500" : "text-gray-400"}`}>{data.status ? "Active" : "Inactive"}</span>
              <FaEye className="text-gray-400 text-sm ml-1" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-xs font-bold text-gray-700 mb-3">5. Import Notes</p>
          <div className="flex flex-col gap-2">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-xs text-blue-600 font-semibold flex items-center gap-1.5 mb-1"><FaCircleInfo className="text-blue-400" /> Automatic Sync</p>
              <p className="text-xs text-blue-500">Once connected data will start syncing automatically as per he frequency set.</p>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
              <p className="text-xs text-orange-600 font-semibold flex items-center gap-1.5 mb-1"><FaTriangleExclamation className="text-orange-400" /> Sandbox Environment</p>
              <p className="text-xs text-orange-500">You are connecting to a sandbox environment. Switch to production when ready</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl border border-gray-100 px-4 py-3 shadow-sm">
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors w-full sm:w-auto justify-center">
            <FaArrowLeft className="text-xs" /> Back to Configure
          </button>
          <button onClick={onConnect} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto justify-center">
            <FaPlug className="text-xs" /> Connect Integration
          </button>
        </div>
      </div>
    </div>
  );
}

const uiMap = {
  dhl: { logo: "DHL", bg: "bg-yellow-400" },
  ups: { logo: "UPS", bg: "bg-yellow-700" },
  fedex: { logo: "FedEx", bg: "bg-purple-700" },
  aramex: { logo: "aramex", bg: "bg-red-500" },
  bluedart: { logo: "BD", bg: "bg-blue-800" },
  custom: { logo: "API", bg: "bg-teal-500" }
};

function APICard({ card, onUpdate }) {
  const ui = uiMap[card.code] || {};
  const [apiKey, setApiKey] = useState("dhl_live_••••••••••••••••");
  const [connected, setConnected] = useState(card.connected);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTest = async () => {
    setTesting(true);
  
    try {
      const res = await API.post(`/integrations/test/${card.code}`);
  
      if (res.data.status === 1) {
        setTestResult("success");
      } else {
        setTestResult("fail");
      }
  
    } catch (err) {
      setTestResult("fail");
    }
  
    setTesting(false);
  };

 
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <LogoBadge logo={ui.logo} bg={ui.bg} size="w-10 h-10" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">{card.name}</p>
            <p className="text-xs text-gray-400 truncate">{card.sub}</p>
          </div>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0 ${connected ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-500"}`}>
          {connected ? "Connected" : "Not connected"}
        </span>
      </div>

      {connected ? (
        <>
          <div className="mb-1">
            <p className="text-xs text-gray-500 mb-1">API Key</p>
            <ApiKeyField value={apiKey} onChange={setApiKey} />
          </div>
          <p className="text-xs text-gray-400 mb-3">Last Sync 2 minutes ago</p>
          <div className="flex gap-2">
            <button onClick={async () => {
    await API.post(`/integrations/disconnect/${card.code}`);
    setConnected(false);
    onUpdate(); 
  }}
              className="flex-1 py-2 text-xs font-medium border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              Disconnect
            </button>
            <button onClick={handleTest}
              className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all ${testResult === "success" ? "bg-green-500 text-white" : "bg-teal-500 hover:bg-teal-600 text-white"}`}>
              {testing ? "Testing..." : testResult === "success" ? "✓ Success" : "Test Connection"}
            </button>
          </div>
        </>
      ) : (
        <button onClick={async () => {
          try {
            const res = await API.post(`/integrations/connect/${card.code}`, {
              apiKey
            });
            
            
            
      
            console.log(res.data);
            setConnected(true);
            onUpdate();
      
          } catch (err) {
            console.log(err);
          }
        }}
          className="w-full py-2.5 text-sm font-medium bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors">
          Connect
        </button>
      )}
    </div>
  );
}

export default function APIIntegrations() {
  const [view, setView] = useState("list");
  const [addStep, setAddStep] = useState(0);
  const [selectedApi, setSelectedApi] = useState(null);
  const [configData, setConfigData] = useState(null);
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    API.get("/integrations")
      .then(res => {
        setIntegrations(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  const fetchIntegrations = async () => {
    try {
      const res = await API.get("/integrations");
      setIntegrations(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  if (view === "add") {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between mb-6 gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {addStep === 0 ? "API Integrations" : addStep === 1 ? "Configure Integration" : "Review Integration"}
              </h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {addStep === 0 ? "Manage API connections and authentication keys" : addStep === 1 ? "Enter API credentials and connection settings" : "Verify Details before connecting"}
              </p>
            </div>
            <button onClick={() => setView("list")} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
              <FaPlus className="text-xs" /> Add Integration
            </button>
          </div>

          {addStep === 0 && (
           <Step1 onNext={(api) => { 
            setSelectedApi({
              ...api,
              code: mapCode[api.name]
            }); 
            setAddStep(1); 
          }} />
          )}
          {addStep === 1 && (
            <Step2 selectedApi={selectedApi} onBack={() => setAddStep(0)} onNext={(data) => { setConfigData(data); setAddStep(2); }} />
          )}
          {addStep === 2 && (
            <Step3 selectedApi={selectedApi} configData={configData} onBack={() => setAddStep(1)} onConnect={async () => {
              try {
                const res = await API.post(`/integrations/connect/${selectedApi.code}`, {
                  apiKey: configData.apiKey
                });
            
                console.log(res.data);
            
                setView("list");
                setAddStep(0);
            
              } catch (err) {
                console.log(err);
              }
            }} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-6 gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">API Integrations</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage API connections and authentication keys</p>
          </div>
          <button onClick={() => { setView("add"); setAddStep(0); }}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
            <FaPlus className="text-xs" /> Add Integration
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        {integrations.map(card => (
  <APICard 
    key={card._id}
    card={card}
    onUpdate={fetchIntegrations} 
  />
))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Integration", value: "12", color: "text-gray-800" },
            { label: "Active Connection", value: "8", color: "text-teal-500" },
            { label: "API Calls Today", value: "15,400", color: "text-teal-500" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}