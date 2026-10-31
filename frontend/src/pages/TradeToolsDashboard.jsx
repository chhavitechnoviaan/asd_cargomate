import { useEffect, useMemo, useState } from "react";
import { Activity, Bot, Boxes, Calculator, CheckCircle2, ChevronRight, CircleAlert, Clock3, FileText, History, LoaderCircle, MessageSquare, Plane, Search, Send, ShieldCheck, Sparkles, X } from "lucide-react";
import { aiApi, extractText } from "../services/aiApi";
import "./TradeToolsDashboard.css";

const storageIdentity = () => localStorage.getItem("userId") || localStorage.getItem("user_id") || localStorage.getItem("email") || localStorage.getItem("userEmail") || localStorage.getItem("userName") || localStorage.getItem("name") || "current-user";
const storageKey = (kind, mode) => `cargomate_ai_${kind}_v1_${mode}_${encodeURIComponent(storageIdentity())}`;
const blankHistory = (mode) => { try { return JSON.parse(localStorage.getItem(storageKey("tool_history", mode)) || "[]"); } catch { return []; } };
const blankReports = (mode) => { try { return JSON.parse(localStorage.getItem(storageKey("tool_reports", mode)) || "[]"); } catch { return []; } };
const id = () => `CM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
const stringify = (value) => typeof value === "string" ? value : JSON.stringify(value, null, 2);
const getNumber = (obj, keys) => {
  for (const key of keys) {
    const parts = key.split("."); let value = obj;
    for (const part of parts) value = value?.[part];
    if (value !== undefined && value !== null && value !== "" && Number.isFinite(Number(value))) return Number(value);
  }
  return null;
};
const money = (value) => value == null ? "—" : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);

export default function TradeToolsDashboard({ mode = "user" }) {
  const [active, setActive] = useState("chat");
  const [history, setHistory] = useState(() => blankHistory(mode));
  const [reports, setReports] = useState(() => blankReports(mode));
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: "Hello! I’m your AI CargoMate assistant. Ask me about HS codes, export incentives, freight, compliance, or shipment planning." }]);
  const [chatLoading, setChatLoading] = useState(false);
  const [lookupForm, setLookupForm] = useState({ product_description: "", country_of_export: "India", country_of_import: "United Arab Emirates", quantity: "500", unit: "KG" });
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [incentiveForm, setIncentiveForm] = useState({ hs_code: "", product_description: "", origin_country: "India", destination_country: "United Arab Emirates", shipment_value: "", quantity: "500" });
  const [incentiveLoading, setIncentiveLoading] = useState(false);
  const [incentiveResult, setIncentiveResult] = useState(null);
  const [meisResult, setMeisResult] = useState(null);
  const [error, setError] = useState("");
  const [auditFilter, setAuditFilter] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => { localStorage.setItem(storageKey("tool_history", mode), JSON.stringify(history.slice(0, 100))); }, [history, mode]);
  useEffect(() => { localStorage.setItem(storageKey("tool_reports", mode), JSON.stringify(reports.slice(0, 50))); }, [reports, mode]);

  const addHistory = (kind, query, input, result) => {
    const item = { id: id(), kind, query, input, result, createdAt: new Date().toISOString(), user: localStorage.getItem("userName") || localStorage.getItem("name") || "Current user" };
    setHistory(prev => [item, ...prev].slice(0, 100));
    return item;
  };
  const addReport = (kind, input, result) => {
    const report = { id: id(), kind, input, result, createdAt: new Date().toISOString(), title: input.product_description || input.message || input.hs_code || `${kind} report` };
    setReports(prev => [report, ...prev].slice(0, 50));
    return report;
  };

  async function sendChat(e) {
    e?.preventDefault(); const message = chatInput.trim(); if (!message || chatLoading) return;
    setError(""); setChatInput(""); setMessages(prev => [...prev, { role: "user", text: message }]); setChatLoading(true);
    try {
      const payload = { message, query: message, prompt: message, user_role: mode === "b2b" ? "b2b" : mode === "admin" ? "admin" : "user" };
      const data = await aiApi.chat(payload);
      const answer = extractText(data) || stringify(data);
      setMessages(prev => [...prev, { role: "assistant", text: answer, raw: data }]);
      addHistory("AI Chat", message, payload, data);
    } catch (err) { setError(`Chat API: ${err.message}. Check that ${aiApi.baseUrl} is reachable and CORS is enabled.`); setMessages(prev => [...prev, { role: "assistant", text: "I couldn't reach the AI service. Please check the API connection and try again." }]); }
    finally { setChatLoading(false); }
  }

  async function runLookup(e) {
    e.preventDefault(); setError(""); setLookupLoading(true); setLookupResult(null);
    const quantity = Number(lookupForm.quantity);
    const payload = { ...lookupForm, quantity, product: lookupForm.product_description, product_description: lookupForm.product_description, origin_country: lookupForm.country_of_export, destination_country: lookupForm.country_of_import, country_of_export: lookupForm.country_of_export, country_of_import: lookupForm.country_of_import };
    try {
      const data = await aiApi.lookup(payload); setLookupResult(data); addHistory("HS Code Lookup", lookupForm.product_description, payload, data); addReport("HS Code Lookup", payload, data);
      const hs = data?.hs_code || data?.hsCode || data?.result?.hs_code || data?.data?.hs_code;
      if (hs) setIncentiveForm(prev => ({ ...prev, hs_code: String(hs), product_description: lookupForm.product_description, origin_country: lookupForm.country_of_export, destination_country: lookupForm.country_of_import, quantity: String(quantity) }));
    } catch (err) { setError(`HS Code Lookup API: ${err.message}`); }
    finally { setLookupLoading(false); }
  }

  async function runIncentive(e) {
    e.preventDefault(); setError(""); setIncentiveLoading(true); setIncentiveResult(null); setMeisResult(null);
    const payload = { ...incentiveForm, quantity: Number(incentiveForm.quantity), shipment_value: Number(incentiveForm.shipment_value), fob_value: Number(incentiveForm.shipment_value), hs_code: incentiveForm.hs_code.trim(), product: incentiveForm.product_description, product_description: incentiveForm.product_description, country_of_export: incentiveForm.origin_country, country_of_import: incentiveForm.destination_country };
    try {
      const [incentiveOutcome, meisOutcome] = await Promise.allSettled([aiApi.estimateIncentive(payload), aiApi.estimateMeis(payload)]);
      if (incentiveOutcome.status === "fulfilled") setIncentiveResult(incentiveOutcome.value);
      if (meisOutcome.status === "fulfilled") setMeisResult(meisOutcome.value);
      if (incentiveOutcome.status === "rejected" && meisOutcome.status === "rejected") throw new Error(`${incentiveOutcome.reason.message}; MEIS: ${meisOutcome.reason.message}`);
      const combined = { incentive: incentiveOutcome.status === "fulfilled" ? incentiveOutcome.value : { error: incentiveOutcome.reason.message }, meis: meisOutcome.status === "fulfilled" ? meisOutcome.value : { error: meisOutcome.reason.message } };
      addHistory("Incentive Checker", `${payload.hs_code} · ${payload.product_description}`, payload, combined);
      const report = addReport("Incentive & MEIS Estimate", payload, combined); setSelectedReport(report);
      if (incentiveOutcome.status === "rejected" || meisOutcome.status === "rejected") setError(`Partial result: ${incentiveOutcome.status === "rejected" ? `Incentive API: ${incentiveOutcome.reason.message}. ` : ""}${meisOutcome.status === "rejected" ? `MEIS API: ${meisOutcome.reason.message}` : ""}`);
    } catch (err) { setError(`Incentive API: ${err.message}`); }
    finally { setIncentiveLoading(false); }
  }

  const totalIncentive = useMemo(() => getNumber(incentiveResult, ["estimated_total_incentive", "estimated_total_incentive_inr", "total_incentive", "total_incentive_inr", "total_benefit", "data.estimated_total_incentive", "data.total_incentive", "result.total_incentive", "result.estimated_total_incentive"]), [incentiveResult]);
  const totalMeis = useMemo(() => getNumber(meisResult, ["estimated_total_meis_benefit", "estimated_meis_benefit", "total_meis_benefit", "meis_benefit", "estimated_total_benefit", "data.estimated_total_meis_benefit", "data.total_meis_benefit", "result.meis_benefit"]), [meisResult]);
  const filteredHistory = history.filter(item => `${item.kind} ${item.query} ${item.user}`.toLowerCase().includes(auditFilter.toLowerCase()));

  const tabs = [{ id: "chat", label: "AI Chatbot", icon: Bot }, { id: "lookup", label: "HS Code Lookup", icon: Search }, { id: "incentive", label: "Incentive Checker", icon: Calculator }, { id: "audit", label: "Audit Log", icon: History }, { id: "reports", label: "Report Information", icon: FileText }];
  return <div className="cm-app-shell">
    <aside className="cm-sidebar">
      <div className="cm-brand"><span className="cm-brand-mark"><Plane size={21}/></span><span><b>ASD CargoMate</b><small>Ask. Plan. Ship.</small></span></div>
      <div className="cm-side-label">AI & TRADE TOOLS</div>
      {tabs.map(tab => { const Icon = tab.icon; return <button key={tab.id} className={`cm-side-link ${active === tab.id ? "active" : ""}`} onClick={() => { setActive(tab.id); setError(""); }}><Icon size={17}/><span>{tab.label}</span></button>; })}
      <div className="cm-sidebar-note"><ShieldCheck size={17}/><span>Trade intelligence workspace</span></div>
    </aside>
    <main className="cm-main">
      <header className="cm-topbar"><div><span className="cm-online-dot"/> AI-powered trade workspace</div><div className="cm-user"><span className="cm-avatar">{mode === "b2b" ? "B" : mode === "admin" ? "A" : "U"}</span><span><b>{mode === "b2b" ? "B2B Dashboard" : mode === "admin" ? "CargoMate AI Assistant" : "User Dashboard"}</b><small>{mode === "admin" ? "Admin assistant" : "Connected tools"}</small></span></div></header>
      <div className="cm-content">
        <div className="cm-page-heading"><div><div className="cm-eyebrow"><Sparkles size={14}/> CARGOMATE INTELLIGENCE</div><h1>{tabs.find(t => t.id === active)?.label}</h1><p>Make informed trade decisions with connected AI services and transparent estimates.</p></div><div className="cm-api-status"><span className="cm-online-dot"/> API integration <small>Configured</small></div></div>
        {error && <div className="cm-alert"><CircleAlert size={18}/><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss"><X size={16}/></button></div>}

        {active === "chat" && <section className="cm-panel cm-chat-panel"><div className="cm-panel-head"><div className="cm-icon-tile blue"><Bot size={20}/></div><div><h2>AI CargoMate Assistant</h2><p>Ask about freight, HS codes, export incentives and compliance.</p></div><span className="cm-badge">Live API</span></div><div className="cm-messages">{messages.map((msg, index) => <div className={`cm-message ${msg.role}`} key={index}><div className="cm-message-avatar">{msg.role === "assistant" ? <Bot size={17}/> : "You"}</div><div className="cm-message-body"><div className="cm-message-text">{msg.text}</div>{msg.raw && <details><summary>View API response</summary><pre>{stringify(msg.raw)}</pre></details>}</div></div>)}{chatLoading && <div className="cm-loading"><LoaderCircle className="cm-spin" size={17}/> Analyzing your request…</div>}</div><form className="cm-chat-form" onSubmit={sendChat}><input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask anything about international trade…" aria-label="Chat message"/><button className="cm-primary" disabled={chatLoading || !chatInput.trim()}><Send size={16}/> Send</button></form><div className="cm-hint">Your request is sent to the configured AI chat API. Avoid entering passwords or sensitive personal information.</div></section>}

        {active === "lookup" && <div className="cm-grid-two"><section className="cm-panel"><div className="cm-panel-head"><div className="cm-icon-tile blue"><Search size={20}/></div><div><h2>HS Code Lookup</h2><p>Enter the product and shipment details to identify likely classification.</p></div></div><form className="cm-form" onSubmit={runLookup}><label className="cm-field full"><span>Product description <i>*</i></span><input required value={lookupForm.product_description} onChange={e => setLookupForm({...lookupForm, product_description:e.target.value})} placeholder="e.g. Cotton T-shirt 100% cotton, knitted, for men"/></label><label className="cm-field"><span>Country of export</span><input value={lookupForm.country_of_export} onChange={e => setLookupForm({...lookupForm, country_of_export:e.target.value})} required/></label><label className="cm-field"><span>Country of import</span><input value={lookupForm.country_of_import} onChange={e => setLookupForm({...lookupForm, country_of_import:e.target.value})} required/></label><label className="cm-field"><span>Quantity</span><input type="number" min="0.001" step="any" value={lookupForm.quantity} onChange={e => setLookupForm({...lookupForm, quantity:e.target.value})} required/></label><label className="cm-field"><span>Unit</span><select value={lookupForm.unit} onChange={e => setLookupForm({...lookupForm, unit:e.target.value})}><option>KG</option><option>PCS</option><option>TON</option><option>UNIT</option><option>MT</option></select></label><button className="cm-primary full" disabled={lookupLoading}>{lookupLoading ? <LoaderCircle className="cm-spin" size={16}/> : <Search size={16}/>} {lookupLoading ? "Searching…" : "Search HS Code"}</button></form></section><section className="cm-panel cm-result-panel"><div className="cm-panel-head"><div className="cm-icon-tile teal"><Boxes size={20}/></div><div><h2>Query Summary</h2><p>Latest classification response</p></div></div>{lookupResult ? <><div className="cm-result-highlight"><span>HS Code / Classification</span><strong>{lookupResult.hs_code || lookupResult.hsCode || lookupResult.result?.hs_code || lookupResult.data?.hs_code || "See API response"}</strong><small>Use this as a reference and verify with official customs guidance.</small></div><div className="cm-data-block"><h3>Response details</h3><pre>{stringify(lookupResult)}</pre></div><button className="cm-secondary" onClick={() => { setActive("incentive"); setIncentiveForm(prev => ({...prev, product_description:lookupForm.product_description, origin_country:lookupForm.country_of_export, destination_country:lookupForm.country_of_import, quantity:lookupForm.quantity, hs_code:lookupResult.hs_code || lookupResult.hsCode || lookupResult.result?.hs_code || lookupResult.data?.hs_code || prev.hs_code})); }}>Continue to Incentive Checker <ChevronRight size={16}/></button></> : <div className="cm-empty"><Search size={27}/><b>No lookup performed yet</b><span>Complete the form to view the API result and save it to your audit history.</span></div>}</section></div>}

        {active === "incentive" && <div className="cm-incentive-layout"><section className="cm-panel"><div className="cm-panel-head"><div className="cm-icon-tile teal"><Calculator size={20}/></div><div><h2>Incentive Checker</h2><p>Estimate export incentive and MEIS benefit for one product.</p></div></div><form className="cm-form" onSubmit={runIncentive}><label className="cm-field"><span>HS Code <i>*</i></span><input required value={incentiveForm.hs_code} onChange={e => setIncentiveForm({...incentiveForm,hs_code:e.target.value})} placeholder="e.g. 6109.10.00"/></label><label className="cm-field"><span>Product description <i>*</i></span><input required value={incentiveForm.product_description} onChange={e => setIncentiveForm({...incentiveForm,product_description:e.target.value})} placeholder="e.g. Cotton T-shirts"/></label><label className="cm-field"><span>Origin country</span><input required value={incentiveForm.origin_country} onChange={e => setIncentiveForm({...incentiveForm,origin_country:e.target.value})}/></label><label className="cm-field"><span>Destination country</span><input required value={incentiveForm.destination_country} onChange={e => setIncentiveForm({...incentiveForm,destination_country:e.target.value})}/></label><label className="cm-field"><span>Shipment / FOB value (INR) <i>*</i></span><input type="number" min="0.01" step="any" required value={incentiveForm.shipment_value} onChange={e => setIncentiveForm({...incentiveForm,shipment_value:e.target.value})} placeholder="e.g. 124680"/></label><label className="cm-field"><span>Quantity (kg) <i>*</i></span><input type="number" min="0.001" step="any" required value={incentiveForm.quantity} onChange={e => setIncentiveForm({...incentiveForm,quantity:e.target.value})}/></label><button className="cm-primary full" disabled={incentiveLoading}>{incentiveLoading ? <LoaderCircle className="cm-spin" size={16}/> : <Calculator size={16}/>} {incentiveLoading ? "Calculating…" : "Calculate Incentives & MEIS"}</button></form><p className="cm-disclaimer">Estimates are informational only. Scheme eligibility, rates and actual benefits must be verified against current official rules.</p></section>
          <div className="cm-results-column"><section className="cm-panel"><div className="cm-panel-head"><div className="cm-icon-tile green"><Activity size={20}/></div><div><h2>Estimated Total Incentive (INR)</h2><p>From <code>/incentive/estimate</code></p></div></div><div className="cm-amount">{incentiveResult ? money(totalIncentive) : "—"}</div>{incentiveResult ? <><div className="cm-result-caption">Calculated for {incentiveForm.product_description || incentiveForm.hs_code}</div><details className="cm-raw-details"><summary>View incentive breakdown / raw response</summary><pre>{stringify(incentiveResult)}</pre></details></> : <div className="cm-empty compact">Submit product details to calculate the incentive.</div>}</section>
          <section className="cm-panel"><div className="cm-panel-head"><div className="cm-icon-tile purple"><Boxes size={20}/></div><div><h2>Estimated Total MEIS Benefit</h2><p>From <code>/incentive/meis</code></p></div></div><div className="cm-amount purple-text">{meisResult ? money(totalMeis) : "—"}</div>{meisResult ? <><div className="cm-result-caption">MEIS estimate for {incentiveForm.product_description || incentiveForm.hs_code}</div><details className="cm-raw-details"><summary>View MEIS breakdown / raw response</summary><pre>{stringify(meisResult)}</pre></details></> : <div className="cm-empty compact">MEIS benefit will appear here after calculation.</div>}</section>
          <section className="cm-panel"><div className="cm-panel-head"><div className="cm-icon-tile blue"><FileText size={20}/></div><div><h2>Report Information</h2><p>Generated record for this calculation</p></div></div>{selectedReport ? <div className="cm-report-info"><div><span>Report ID</span><strong>{selectedReport.id}</strong></div><div><span>Generated on</span><strong>{new Date(selectedReport.createdAt).toLocaleString()}</strong></div><div><span>Product</span><strong>{selectedReport.input.product_description || "—"}</strong></div><div><span>HS Code</span><strong>{selectedReport.input.hs_code || "—"}</strong></div><div><span>Shipment value</span><strong>{money(selectedReport.input.shipment_value)}</strong></div><div><span>Estimated incentive</span><strong>{money(getNumber(selectedReport.result?.incentive,["estimated_total_incentive","estimated_total_incentive_inr","total_incentive","total_incentive_inr","total_benefit","data.total_incentive","result.total_incentive"]))}</strong></div><div><span>Estimated MEIS</span><strong>{money(getNumber(selectedReport.result?.meis,["estimated_total_meis_benefit","estimated_meis_benefit","total_meis_benefit","meis_benefit","estimated_total_benefit","data.total_meis_benefit","result.meis_benefit"]))}</strong></div><button className="cm-secondary full" onClick={() => { setSelectedReport(null); setActive("reports"); }}>Open full report <ChevronRight size={16}/></button></div> : <div className="cm-empty compact"><FileText size={24}/><span>Run a calculation to generate a report ID and save the complete input and API results.</span></div>}</section></div></div>}

        {active === "audit" && <section className="cm-panel"><div className="cm-panel-head"><div className="cm-icon-tile blue"><History size={20}/></div><div><h2>Audit Log</h2><p>Search and tool activity recorded in this browser for the current user.</p></div></div><div className="cm-toolbar"><div className="cm-search"><Search size={16}/><input value={auditFilter} onChange={e => setAuditFilter(e.target.value)} placeholder="Search by query, tool, or user…"/></div><span className="cm-count">{filteredHistory.length} records</span></div>{filteredHistory.length ? <div className="cm-table-wrap"><table className="cm-table"><thead><tr><th>Activity</th><th>Query / Product</th><th>User</th><th>Date & time</th><th>Details</th></tr></thead><tbody>{filteredHistory.map(item => <tr key={item.id}><td><span className="cm-type-pill">{item.kind}</span></td><td>{item.query || "—"}</td><td>{item.user}</td><td>{new Date(item.createdAt).toLocaleString()}</td><td><button className="cm-text-button" onClick={() => setSelectedReport({ ...item, title: item.query || item.kind })}>View response</button></td></tr>)}</tbody></table></div> : <div className="cm-empty"><History size={28}/><b>No audit history yet</b><span>Chat, HS code searches and incentive calculations will be listed here after successful requests.</span></div>}</section>}

        {active === "reports" && <section className="cm-panel"><div className="cm-panel-head"><div className="cm-icon-tile blue"><FileText size={20}/></div><div><h2>Report Information</h2><p>Saved lookup and incentive reports with their input details and service response.</p></div></div>{reports.length ? <div className="cm-report-list">{reports.map(report => <article className="cm-report-card" key={report.id}><div className="cm-report-icon"><FileText size={20}/></div><div className="cm-report-main"><div className="cm-report-title">{report.title || report.kind}</div><div className="cm-report-meta">{report.kind} · {new Date(report.createdAt).toLocaleString()}</div><div className="cm-report-id">Report ID: {report.id}</div></div><button className="cm-secondary" onClick={() => setSelectedReport(report)}>View report <ChevronRight size={15}/></button></article>)}</div> : <div className="cm-empty"><FileText size={28}/><b>No reports generated</b><span>Use HS Code Lookup or Incentive Checker to create a report.</span><button className="cm-primary" onClick={() => setActive("incentive")}>Open Incentive Checker</button></div>}</section>}
        <footer className="cm-footer"><span><ShieldCheck size={14}/> Estimates are not customs, tax or legal advice.</span><span>API base: {aiApi.baseUrl}</span></footer>
      </div>
    </main>
    {selectedReport && <div className="cm-modal-backdrop" onClick={() => setSelectedReport(null)}><div className="cm-modal" onClick={e => e.stopPropagation()}><div className="cm-modal-head"><div><h2>{selectedReport.kind || "Report details"}</h2><p>{selectedReport.id}</p></div><button onClick={() => setSelectedReport(null)} aria-label="Close"><X size={19}/></button></div><div className="cm-modal-content"><div className="cm-detail-section"><h3>Request / Product details</h3><pre>{stringify(selectedReport.input || {})}</pre></div><div className="cm-detail-section"><h3>API result</h3><pre>{stringify(selectedReport.result || {})}</pre></div><div className="cm-detail-section"><h3>Record metadata</h3><p>Generated: {selectedReport.createdAt ? new Date(selectedReport.createdAt).toLocaleString() : "—"}</p><p>User: {selectedReport.user || "Current user"}</p></div></div></div></div>}
  </div>;
}
