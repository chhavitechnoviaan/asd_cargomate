import { useState } from "react";
import { LuX } from "react-icons/lu";
 import { LuFileText, LuDownload, LuMapPin, LuUser, LuBuilding2, LuFileCheck, LuClipboardCheck } from "react-icons/lu";
import DenyQuotation from "./DenyQuotation";
import React from "react";
import { useNavigate } from "react-router-dom";
const charges = [
  { no: "", desc: "Ocean Freight", details: "1 x 20 FT FCL", amount: "\u20b945,000.00" },
  { no: "1", desc: "Origin Handling Charges", details: "Mumbai cost", amount: "\u20b96,500.00" },
  { no: "2", desc: "Documentation Charges", details: "Per shipment", amount: "\u20b92,000.00" },
  { no: "3", desc: "Custom Clearnce", details: "Export", amount: "\u20b94,000.00" },
  { no: "4", desc: "Destination Charges", details: "Felistone, UK", amount: "\u20b918,500.00" },
  { no: "5", desc: "Insurance (0.3% of invoice value)", details: "Felistone, UK", amount: "\u20b918,500.00" },
];

const timeline = [
  { title: "Quotation sent", sub: "on 24 April 2025 by Arjun Soni", color: "bg-pink-400" },
  { title: "Approved", sub: "on 24 April 2025 by Arjun Soni", color: "bg-green-500" },
  { title: "Form Submitted", sub: "on 24 April 2025 by xyz traders", color: "bg-blue-400" },
];

export default function Quotation({onClose}) {
  const navigate = useNavigate()
  const [deny, setDeny] = useState(false)
  const denyQuotation = () => {
      setDeny(true)
  }
  return (
    <div className=" fixed inset-0 z-[20] bg-black/50 backdrop-blur-sm p-4 sm:p-6 flex items-center  transparent justify-center">
    { !deny && ( 
       <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-gray-200 p-5 shadow-2xl">
       <div className="flex flex-col"> 
        <div className="flex justify-end p-1"> 

         {/* <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0"> */}
              <LuX onClick={onClose} size={22} className="cursor-pointer" />
            
             </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LuFileText className="text-blue-500" size={20} />
            <h1 className="text-lg font-semibold text-gray-900">Quotation</h1>
            <span className="px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-500">QT-2504-0011</span>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700">
            <LuDownload size={14} /> Download PDF
          </button>
        </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <p className="text-xs text-gray-400">Quotation No.: QT-2025-0001</p>
            <p className="text-xs text-gray-400">Sent on 24 April 2025 ,11:45</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-blue-600">79,000.00</p>
            <p className="text-xs text-gray-400">Total Amount</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-500">Status <span className="text-purple-500 font-medium">Quotation Sent</span></p>
            <p className="text-gray-500">Valid <span className="text-gray-900">08 May 2025</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="flex items-center gap-2 text-xs text-gray-400 mb-2"><LuBuilding2 size={14} /> From</p>
            <p className="text-blue-600 font-medium text-sm mb-1">ASD Company</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              123, business park, indore<br />
              9876543213<br />
              abc@gmail.com
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="flex items-center gap-2 text-xs text-gray-400 mb-2"><LuUser size={14} /> To</p>
            <p className="text-blue-600 font-medium text-sm mb-1">xyz Traders</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              xyz@gmail.com<br />
              9876543213<br />
              123 market, surat<br />
              Gujarat- 395002
            </p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="text-gray-400 mb-1">Shipment Route</p>
              <p className="text-gray-900 font-medium">IND &gt; UK</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Shipment Type</p>
              <p className="text-gray-900 font-medium">Export</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Submitted on</p>
              <p className="text-gray-900 font-medium">24 Apr 2025</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Port of Loading</p>
              <p className="text-gray-900 font-medium">Mumbai Cost</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Shipment mode</p>
              <p className="text-gray-900 font-medium">Sea Freight (FCL)</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Approved on</p>
              <p className="text-gray-900 font-medium">30 Apr 2025</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Port of Discharge</p>
              <p className="text-gray-900 font-medium">Felistone, UK</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Incoterm</p>
              <p className="text-gray-900 font-medium">FOB</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Requested ID</p>
              <p className="text-gray-900 font-medium">Req-2504-7612</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Charges Breakdown</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100">
                  <th className="pb-2 font-medium w-6">#</th>
                  <th className="pb-2 font-medium">Description</th>
                  <th className="pb-2 font-medium">Details</th>
                  <th className="pb-2 font-medium text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                {charges.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 text-gray-400">{c.no}</td>
                    <td className="py-2 text-gray-900">{c.desc}</td>
                    <td className="py-2 text-gray-500">{c.details}</td>
                    <td className="py-2 text-gray-900 text-right">{c.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm font-semibold text-blue-600">Total INR</p>
              <p className="text-sm font-semibold text-blue-600">₹79,000.00</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="border border-gray-200 rounded-xl p-4 text-xs space-y-2">
              <p className="text-gray-400 font-medium mb-1">Summary</p>
              <div className="flex justify-between text-gray-500"><span>Sub Total</span><span>₹79,000.00</span></div>
              <div className="flex justify-between text-gray-500"><span>Discount</span><span className="text-green-500">-₹0.00</span></div>
              <div className="flex justify-between text-gray-500"><span>Tax(0%)</span><span>₹0.00</span></div>
              <div className="flex justify-between font-semibold text-blue-600 pt-1 border-t border-gray-100"><span>Total Amt</span><span>₹79,000.00</span></div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 text-xs">
              <p className="text-gray-400 font-medium mb-1">Notes</p>
              <p className="text-gray-500">This quotation is valid till 08 May 2025</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="border border-gray-200 rounded-xl p-3">
            <p className="text-xs text-gray-400">Quote Version</p>
            <p className="text-sm font-semibold text-gray-900">V.2</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-3">
            <p className="text-xs text-gray-400">Freight Quote</p>
            <p className="text-sm font-semibold text-gray-900">1,85,000.00</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-3">
            <p className="text-xs text-gray-400">Valid From</p>
            <p className="text-sm font-semibold text-gray-900">25 Apr 2025</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-3">
            <p className="text-xs text-gray-400">Valid Until</p>
            <p className="text-sm font-semibold text-gray-900">8 May 2025</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 border border-gray-200 rounded-xl p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
              <LuFileCheck size={16} /> Terms &amp; Conditions
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              This quotation valid till the date mentioned above.<br />
              Freight is subject to change in case of fuel surcharge version.<br />
              Booking is subject to space availability at time of confirmation.<br />
              All disputes are subject to Mumbai jurisdiction.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Activity timeline</p>
            <div className="space-y-3">
              {timeline.map((t) => (
                <div key={t.title} className="flex gap-2">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${t.color}`} />
                  <div>
                    <p className="text-xs font-medium text-gray-900">{t.title}</p>
                    <p className="text-[11px] text-gray-400">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

          <div className="flex justify-between items-center">
             <div>
             <button onClick={onClose} className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 flex items-center justify-center gap-2">
            <LuMapPin size={14} /> Back to Shipment
          </button>
          </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
         
          <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2">
            <LuClipboardCheck size={14} /> Accept Quotation
          </button>
          <button onClick={() => denyQuotation()} className="text-white bg-red-500 px-3 py-1 rounded-lg">
             Deny Quotation
          </button>
        </div> </div>
         
      </div>
     )}

        { deny && (<DenyQuotation setDeny={setDeny} />)}
       {}
    </div>
  );
}