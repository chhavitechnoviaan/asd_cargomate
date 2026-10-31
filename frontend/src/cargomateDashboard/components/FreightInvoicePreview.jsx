import React from "react";

/** Freight invoice print preview matching the supplied ASD Logistics reference structure.
 * All actual parties, goods, tax details, and banking information must be user-supplied.
 */
export default function FreightInvoicePreview({ data = {}, onClose }) {
  const money = (n) => Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const lines = Array.isArray(data.items) && data.items.length ? data.items : [{description: data.description || "Freight services", qty: 1, unitPrice: Number(data.amount || 0)}];
  const subtotal = lines.reduce((v, x) => v + Number(x.qty || 0) * Number(x.unitPrice || 0), 0);
  const taxRate = Number(data.taxRate || 0);
  const tax = subtotal * taxRate / 100;
  return <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/70 p-3 sm:p-8">
    <style>{`@media print { body * { visibility:hidden!important } #freight-invoice,#freight-invoice *{visibility:visible!important} #freight-invoice{position:absolute!important;inset:0!important;width:100%!important;border:0!important;box-shadow:none!important} }`}</style>
    <div className="mx-auto max-w-4xl"><div className="mb-3 flex justify-end gap-2 print:hidden"><button type="button" className="rounded bg-white px-4 py-2" onClick={onClose}>Close</button><button type="button" className="rounded bg-teal-600 px-4 py-2 text-white" onClick={() => window.print()}>Print / Save PDF</button></div>
    <article id="freight-invoice" className="bg-white p-5 sm:p-10 text-black shadow-lg" style={{fontFamily:"Georgia,serif",fontSize:12}}>
      <header className="text-center border-b border-black pb-3"><h1 className="text-2xl font-bold">{data.issuerName || "Freight Invoice"}</h1><p>{data.issuerAddress || "Company address (configure in Settings)"}</p><p>{data.issuerEmail || ""}</p><h2 className="font-bold tracking-widest">FREIGHT INVOICE</h2></header>
      <div className="grid grid-cols-2 border-x border-b border-black"><div className="border-r border-black p-3"><b>BILL TO</b><p className="whitespace-pre-wrap">{data.billTo || data.customerSupplier || "Customer / consignee"}</p><p>{data.address || ""}</p></div><div className="p-3"><p><b>Invoice No:</b> {data.invoiceNumber || "—"}</p><p><b>Date:</b> {data.invoiceDate || "—"}</p><p><b>Exporter Ref:</b> {data.poReference || "—"}</p><p><b>Terms of Payment:</b> {data.paymentTerms || "—"}</p></div></div>
      <div className="grid grid-cols-2 border-x border-b border-black"><div className="p-3 border-r border-black"><b>Consignee</b><p className="whitespace-pre-wrap">{data.consignee || "—"}</p></div><div className="p-3"><b>AWB / BL No. & Date</b><p>{data.awbNumber || "—"} {data.awbDate || ""}</p></div></div>
      <div className="grid grid-cols-2 border-x border-b border-black"><p className="p-2 border-r border-black"><b>Port of Loading:</b> {data.origin || "—"}</p><p className="p-2"><b>Port of Discharge:</b> {data.destination || "—"}</p></div>
      <p className="border-x border-b border-black p-2"><b>Vessel / Flight No:</b> {data.flightNumber || "—"} &nbsp; <b>Country of Origin:</b> {data.countryOfOrigin || "—"}</p>
      <table className="w-full border-collapse border border-black text-left"><thead><tr>{["Description of Goods / Charges","HS Code","Qty / Weight","Unit Price","Amount"].map(x=><th className="border border-black p-2" key={x}>{x}</th>)}</tr></thead><tbody>{lines.map((x,i)=><tr key={i}><td className="border border-black p-2">{x.description}</td><td className="border border-black p-2">{x.hsCode || "—"}</td><td className="border border-black p-2">{x.qty || 1} {x.unit || ""}</td><td className="border border-black p-2">{money(x.unitPrice)}</td><td className="border border-black p-2">{money(Number(x.qty || 1)*Number(x.unitPrice || 0))}</td></tr>)}</tbody></table>
      <div className="border-x border-b border-black p-3 text-right"><p>Subtotal: {money(subtotal)} {data.currency || "INR"}</p><p>GST ({taxRate}%): {money(tax)}</p><p className="font-bold">Grand Total: {money(subtotal+tax)} {data.currency || "INR"}</p></div>
      <div className="grid grid-cols-2 border-x border-b border-black"><div className="border-r border-black p-3"><b>Bank Details</b><p className="whitespace-pre-wrap">{data.bankDetails || "Configure bank details before issuing invoice"}</p><p><b>Declaration:</b> {data.declaration || ""}</p></div><div className="p-3 flex flex-col justify-end text-center min-h-32"><p>For {data.issuerName || "Issuing company"}</p><p className="mt-10">Authorized Signatory</p></div></div>
      <p className="mt-3 text-xs text-gray-600">Invoice template preview. Verify all parties, tax rates, invoice numbers, banking information and shipping details before issuing.</p>
    </article></div></div>;
}
