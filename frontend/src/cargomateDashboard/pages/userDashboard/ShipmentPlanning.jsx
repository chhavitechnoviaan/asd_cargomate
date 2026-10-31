import { useEffect, useState } from "react";
import {
  FiArrowLeft, FiSave, FiDownload, FiPlus, FiInfo,
  FiChevronRight, FiCheckCircle, FiAlertCircle, FiFileText,
  FiPhone, FiMail, FiMessageSquare, FiDatabase, FiEdit2,
  FiAlertTriangle, FiBookOpen, FiTruck, FiUpload, FiRadio,
  FiShare2, FiExternalLink, FiBell
} from "react-icons/fi";
import poster from "../../assets/Images/webp/poster4.webp"
import DashboardAdPlacement from "../../components/DashboardAdPlacement"

import { BsAirplane } from "react-icons/bs";
import { MdOutlineRocketLaunch } from "react-icons/md";
import plane from "../../assets/Images/webp/aeroplane.webp"
import girl from "../../assets/Images/webp/girll.webp"
import BookShipment from "../../components/userComponent/BookShipment"
import SharePlan from "../../components/userComponent/SharePlan"
import UploadDocument from "../../components/userComponent/UploadDocument"
import TrackShipment from "../../components/userComponent/TrackShipment"
import Shipment from "../../components/ShipmentForm";
const tabs = [
  { id: 1, label: "Shipment Details" },
  { id: 2, label: "Route & Schedule" },
  { id: 3, label: "Cost Estimation" },
  { id: 4, label: "Compliance & Documents" },
];

const goodsInfo = [
  ["Product Description", "T-shirts, singlets and other vests, of cotton"],
  ["HS Code", "6109.10.00"],
  ["Quantity", "500 kg"],
  ["Value (INR)", "₹1,24,680"],
  ["Incoterm", "FOB"],
  ["Packaging Type", "Cartons"],
  ["No. of Packages", "25"],
  ["Marks & Numbers", "ASD/TSHIRT/S00/2025"],
];

const additionalInfo = [
  ["Insurance", "Yes (1% of Value)"],
  ["Special Handling", "No"],
  ["Temperature Control", "No"],
  ["Dangerous Goods", "No"],
  ["Remarks", "Handle with care"],
];

const complianceDocs = [
  ["Commercial Invoice", "Required"],
  ["Packing List", "Required"],
  ["Certificate of Origin", "If Applicable"],
  
  ["Export License", "Not Required"],
];

const costRows = [
  ["Freight Charges", "₹18,600"],
  ["Surcharges & Fees", "₹6,260"],
  ["Insurance", "₹1,250"],
  ["Customs Duty & Taxes (Est.)", "₹ -"],
  ["Other Charges", "₹750"],
];

const dataSources = [
  ["Freight Rates", "Freightos Marketplace"],
  ["Transit Times", "DHL Tariff Database"],
  ["Customs Info", "ICEGATE"],
  ["Trade Data", "DGFT (India)"],
];

const assumptions = [
  "Rates are based on current day and are subject to change.",
  "Transit time excludes customs clearance.",
  "Charges include estimated surcharges.",
  "Insurance calculated at 1% of invoice value.",
  "Incoterm: FOB (Exporter responsible till loading port).",
];

const whatsNext = [
  { icon: FiTruck, title: "Book Shipment", sub: "Confirm carrier and book", btn: "Proceed to Booking" },
  { icon: FiUpload, title: "Upload Documents", sub: "Upload required documents", btn: "Upload Now" },
  { icon: FiRadio, title: "Track Shipment", sub: "Track status in real-time", btn: "Go to Tracking" },
  { icon: FiShare2, title: "Share Plan", sub: "Share plan with team or partner", btn: "Share Plan" },
];
import PlanSummary from "../../components/userComponent/PlanSummary";



export default function ShipmentPlanning({setActiveTab: setParentActiveTab }) {
  const [activeTab, setActiveTab] = useState(1);
  const [mainTab, setMainTab] = useState("Shipment Planning")
  const [savePlan, setSavePlan] = useState(false)
  const [sharePlan, setSharePlan] = useState(false)
  const [bookShipment, setBookShipment] = useState(false)
  const[uploadDocument,setUploadDocument] = useState(false)
  const[trackShipment, setTrackShipment]  = useState(false)
  const [isEditingGoods, setIsEditingGoods] = useState(false);
const [editedGoodsInfo, setEditedGoodsInfo] = useState(goodsInfo);
   const [shipment, setShipment] = useState("")
 

const handleGoodsChange = (index, value) => {
  const updated = [...editedGoodsInfo];
  updated[index] = [updated[index][0], value];
  setEditedGoodsInfo(updated);
};

const handleSaveGoods = () => {
  setIsEditingGoods(false);
};

const [isEditingAdditional, setIsEditingAdditional] = useState(false);
const [editedAdditionalInfo, setEditedAdditionalInfo] =
  useState(additionalInfo);

const handleAdditionalChange = (index, value) => {
  const updated = [...editedAdditionalInfo];
  updated[index] = [updated[index][0], value];
  setEditedAdditionalInfo(updated);
};

const handleSaveAdditional = () => {
  setIsEditingAdditional(false);
};

const [isEditingParties, setIsEditingParties] = useState(false);

const [partiesInfo, setPartiesInfo] = useState({
  exporter: {
    name: "ABC Exports Pvt. Ltd.",
    location: "Tirupur, India",
  },
  importer: {
    name: "XYZ Trading LLC",
    location: "Dubai, UAE",
  },
  notifyParty: {
    name: "XYZ Trading LLC",
    location: "Dubai, UAE",
  },
});

const [originalPartiesInfo] = useState(partiesInfo);

const handlePartyChange = (party, field, value) => {
  setPartiesInfo((prev) => ({
    ...prev,
    [party]: {
      ...prev[party],
      [field]: value,
    },
  }));
};

const handleSaveParties = () => {
  setIsEditingParties(false);
};

const handleCancelParties = () => {
  setPartiesInfo(originalPartiesInfo);
  setIsEditingParties(false);
};

useEffect(() => {
     setShipment("shipment")
     setMainTab("")
},[])
  return (
    <div className="h-auto bg-gray-50  flex-1 overflow-y-auto pt-14">
     { mainTab === "Shipment Planning" && (
      <div className=" flex-1 overflow-y-auto"> 
       <div className=" border-gray-200 px-4 sm:px-6 py-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Shipment Planning</h1>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">Plan your shipment from origin to destination with all costs, timelines, and compliance in one place.</p>
          </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
         

          <button onClick={() => setParentActiveTab && setParentActiveTab("Saved")} className=" flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold px-3 py-2 rounded-lg hover:bg-gray-50">
            <FiSave size={15} /> Save Plan
          </button>

          {/* <button className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs  font-bold px-3 py-1.5 rounded-lg hover:bg-gray-50">
            <FiDownload size={15} /> Download Plan (PDF)
          </button> */}

          <button  onClick={() => {
                setShipment("shipment")
                setMainTab("")
              }} className="flex items-center justify-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs   font-bold px-3 py-1.5 rounded-lg">
            <FiPlus size={15} /> Create Shipment from this Plan
          </button>
        </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 flex flex-col gap-4">
        <div className="flex items-start gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2.5 text-xs  font-normal text-teal-800">
          <FiInfo size={15} className="text-teal-500 flex-shrink-0 mt-0.5" />
          This plan is based on the data sources and assumptions listed below. Please review before confirming your shipment.
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="hidden  w-14 h-14 bg-blue-50 rounded-full sm:flex items-center justify-center flex-shrink-0">
              <FiFileText className="text-blue-500 text-2xl" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs  font-bold text-gray-800 mb-2">Plan Summary</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                <div>
                  <p className="text-[10px] font-semibold">Plan Name</p>
                  <p className="text-xs font-bold text-[#071B60] mt-0.5">Tirupur to Dubai – T-shirts Export</p>
                </div>
                <div>
                  <p className="text-xs font-medium">Created On</p>
                  <p className="text-xs font-bold text-[#071B60] mt-0.5">24 Apr 2025, 09:25 AM</p>
                </div>
               
                <div>
                  <p className="text-xs font-semibold">Plan ID</p>
                  <p className="text-xs font-bold text-[#071B60] mt-0.5">PLN-2025-04-24-000123</p>
                </div>
                <div>
                  <p className="text-xs font-semibold">Status</p>
                  <span className="inline-block mt-0.5 text-[10px] border border-orange-300 text-orange-600 font-semibold px-2 py-0.5 rounded-full">Draft</span>
                </div>
                <div>
                  <p className="text-xs  font-semibold">Total Estimated Cost</p>
                  <p className="text-base font-medium text-gray-900 mt-0.5">₹24,860</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs font-semibold">Estimated Transit Time</p>
                    <p className="text-base  font-bold  mt-0.5">3 – 5 Days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4  ">
          <div className="flex flex-col gap-4 min-w-0 ">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden ">
              <div className="flex overflow-x-auto border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 -mb-px transition-colors
                      ${activeTab === tab.id ? "border-teal-500 text-teal-600 bg-teal-50" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0
                      ${activeTab === tab.id ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                      {tab.id}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {activeTab === 1 && (
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr] gap-4">
                    <div>
                    {editedGoodsInfo.map(([k, v], index) => (
                      <div
                        key={k}
                        className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 gap-3"
                      >
                        <span className="text-xs font-normal text-gray-500 flex-shrink-0 w-36">
                          {k}
                        </span>

                        <div className="flex items-center gap-2 flex-1 justify-start">
                          {isEditingGoods ? (
                            <input
                              type="text"
                              value={v}
                              onChange={(e) =>
                                handleGoodsChange(index, e.target.value)
                              }
                              className="w-full border border-gray-200 rounded-md px-2 py-1 text-[11px] font-bold text-[#071B60] outline-none focus:border-teal-500"
                            />
                          ) : (
                            <span className="text-[11px] font-bold text-[#071B60]">
                              {v}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end gap-2 mt-3">
                      {isEditingGoods ? (
                        <>
                          <button
                            onClick={() => {
                              setEditedGoodsInfo(goodsInfo);
                              setIsEditingGoods(false);
                            }}
                            className="px-5 border border-gray-300 text-gray-500 text-xs font-medium py-2 rounded-lg hover:bg-gray-50"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={handleSaveGoods}
                            className="px-7 border border-teal-600 bg-teal-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-teal-700 flex items-center justify-center gap-1.5"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsEditingGoods(true)}
                          className="px-7 border border-teal-600 text-teal-600 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5"
                        >
                          <FiEdit2 size={12} />
                          Edit Details
                        </button>
                      )}
                    </div>
                  </div>

                   <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-base font-bold text-[#071B60] mb-3">
                          Parties Information
                        </p>

                        {/* Exporter */}
                        <div className="mb-2">
                          <p className="text-xs text-[#687398] font-medium mb-1">
                            Exporter (Ship From)
                          </p>

                          {isEditingParties ? (
                            <>
                              <input
                                type="text"
                                value={partiesInfo.exporter.name}
                                onChange={(e) =>
                                  handlePartyChange(
                                    "exporter",
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs sm:text-sm font-bold text-[#071B60] border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-teal-500 mb-1"
                              />

                              <input
                                type="text"
                                value={partiesInfo.exporter.location}
                                onChange={(e) =>
                                  handlePartyChange(
                                    "exporter",
                                    "location",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs sm:text-sm text-gray-500 border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-teal-500"
                              />
                            </>
                          ) : (
                            <>
                              <p className="text-xs sm:text-sm font-bold text-[#071B60]">
                                {partiesInfo.exporter.name}
                              </p>

                              <p className="text-xs sm:text-sm text-gray-500">
                                {partiesInfo.exporter.location}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Importer */}
                        <div className="mb-2">
                          <p className="text-xs text-[#687398] font-medium mb-1">
                            Importer (Ship To)
                          </p>

                          {isEditingParties ? (
                            <>
                              <input
                                type="text"
                                value={partiesInfo.importer.name}
                                onChange={(e) =>
                                  handlePartyChange(
                                    "importer",
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs sm:text-sm font-bold text-[#071B60] border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-teal-500 mb-1"
                              />

                              <input
                                type="text"
                                value={partiesInfo.importer.location}
                                onChange={(e) =>
                                  handlePartyChange(
                                    "importer",
                                    "location",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs sm:text-sm text-gray-500 border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-teal-500"
                              />
                            </>
                          ) : (
                            <>
                              <p className="text-xs sm:text-sm font-bold text-[#071B60]">
                                {partiesInfo.importer.name}
                              </p>

                              <p className="text-xs sm:text-sm text-gray-500">
                                {partiesInfo.importer.location}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Notify Party */}
                        <div className="mb-2">
                          <p className="text-xs text-[#687398] font-medium mb-1">
                            Notify Party
                          </p>

                          {isEditingParties ? (
                            <>
                              <input
                                type="text"
                                value={partiesInfo.notifyParty.name}
                                onChange={(e) =>
                                  handlePartyChange(
                                    "notifyParty",
                                    "name",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs sm:text-sm font-bold text-[#071B60] border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-teal-500 mb-1"
                              />

                              <input
                                type="text"
                                value={partiesInfo.notifyParty.location}
                                onChange={(e) =>
                                  handlePartyChange(
                                    "notifyParty",
                                    "location",
                                    e.target.value
                                  )
                                }
                                className="w-full text-xs sm:text-sm text-gray-500 border border-gray-200 rounded-md px-2 py-1 outline-none focus:border-teal-500"
                              />
                            </>
                          ) : (
                            <>
                              <p className="text-xs sm:text-sm font-bold text-[#071B60]">
                                {partiesInfo.notifyParty.name}
                              </p>

                              <p className="text-xs sm:text-sm text-gray-500">
                                {partiesInfo.notifyParty.location}
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      <div>
                        {isEditingParties ? (
                          <div className="flex gap-2">
                            <button
                              onClick={handleCancelParties}
                              className="w-full border border-gray-300 text-gray-500 text-xs font-medium py-2 rounded-lg hover:bg-gray-50"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={handleSaveParties}
                              className="w-full border border-teal-600 text-teal-600 text-xs font-medium py-2 rounded-lg hover:bg-gray-50"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setIsEditingParties(true)}
                            className="w-full border border-teal-600 text-teal-600 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5"
                          >
                            <FiEdit2 size={12} />
                            Edit Details
                          </button>
                        )}
                      </div>
                    </div>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-3">Route & Schedule</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[["Origin", "Tirupur, India (IN)"], ["Destination", "Dubai, UAE (AE)"], ["Mode", "Air Freight"], ["Carrier", "IndiGo Cargo / Emirates SkyCargo"], ["Estimated Departure", "26 Apr 2025"], ["Estimated Arrival", "30 Apr 2025"] ].map(([k, v]) => (
                        <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                          <span className="text-xs sm:text-sm font-medium text-gray-500">{k}</span>
                          <span className="text-xs sm:text-sm font-medium text-gray-800 text-right">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-3">Cost Estimation</p>
                    {costRows.map(([k, v]) => (
                      <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <span className="text-xs sm:text-sm font-medium text-gray-500">{k}</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-800">{v}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-2 mt-1 border-t-2 border-gray-200">
                      <span className="text-sm  sm:text-sm font-bold text-gray-800">Total Estimated Cost</span>
                      <span className="text-sm sm:text-sm font-bold text-emerald-600">₹24,860</span>
                    </div>
                  </div>
                )}

                {activeTab === 4 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-3">Compliance & Documents</p>
                    {complianceDocs.map(([doc, status]) => (
                      <div key={doc} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-2">
                          <FiCheckCircle size={13} className="text-emerald-500" />
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{doc}</span>
                        </div>
                        <span className={`text-xs font-medium ${status === "Required" ? "text-gray-700" : status === "If Applicable" ? "text-blue-500" : "text-gray-400"}`}>{status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

                          <div className="bg-white border border-gray-200 rounded-xl p-4">
                          <p className="text-base font-bold text-[#071B60] mb-3">
                            Additional Information
                          </p>

                          <div className="flex w-full flex-1 justify-between">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 mb-3">
                              {editedAdditionalInfo.map(([k, v], index) => (
                                <div key={k}>
                                  <p className="text-xs text-[#071B60] font-normal mb-0.5">
                                    {k}
                                  </p>

                                  {isEditingAdditional ? (
                                    <input
                                      type="text"
                                      value={v}
                                      onChange={(e) =>
                                        handleAdditionalChange(index, e.target.value)
                                      }
                                      className="text-xs font-medium text-[#071B60] border border-gray-200 rounded px-1.5 py-1 outline-none focus:border-teal-500 w-full"
                                    />
                                  ) : (
                                    <p className="text-xs font-medium text-[#071B60]">
                                      {v}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div>
                              {isEditingAdditional ? (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditedAdditionalInfo(additionalInfo);
                                      setIsEditingAdditional(false);
                                    }}
                                    className="border border-gray-300 text-gray-500 text-xs font-medium px-4 py-1.5 rounded-lg hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>

                                  <button
                                    onClick={handleSaveAdditional}
                                    className="border border-teal-600 text-teal-600 text-xs font-medium px-4 py-1.5 rounded-lg hover:bg-gray-50"
                                  >
                                    Save
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setIsEditingAdditional(true)}
                                  className="border border-teal-600 text-teal-600 text-xs font-medium px-4 py-1.5 rounded-lg hover:bg-gray-50 flex items-center gap-1.5"
                                >
                                  <FiEdit2 />
                                  Edit Details
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full ">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-base  font-bold text-[#071B60] mb-3">Data Sources Used</p>
                {dataSources.map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1.5 py-1.5 border-b border-gray-100 last:border-0">
                    <FiDatabase size={11} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs  text-gray-500  w-24">{k}</span>
                    <span className="text-xs  text-gray-700 font-medium">{v}</span>
                  </div>
                ))}
                {/* <button className="mt-2 text-teal-500 text-xs font-medium hover:underline flex items-center gap-1">
                  View All Sources <FiChevronRight size={11} />
                </button> */}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-base  font-bold text-[#071B60] mb-3">Assumptions</p>
                <ul className="flex flex-col gap-1">
                  {assumptions.map((a, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs  text-gray-400 font-medium">
                      <span className="text-gray-400 flex-shrink-0 mt-0.5"> </span> {a}
                    </li>
                  ))}
                </ul>
                {/* <button className="mt-2 text-teal-500 text-xs font-medium hover:underline flex items-center gap-1">
                  View All Assumptions <FiChevronRight size={11} />
                </button> */}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-base  font-bold text-[#071B60] mb-2">Disclaimer</p>
                <p className="text-xs  font-medium text-gray-400 leading-relaxed">
                  This plan is for reference only. Please verify all details with official sources before finalizing your shipment.
                </p>
                {/* <button className="mt-2 text-[#0FB5A9] text-xs font-medium hover:underline">Read Full Disclaimer</button> */}
              </div>
            </div>


              <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-4 "> 
         <div className="bg-white border border-gray-200 rounded-xl p-4">
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 ">
                {whatsNext.map(({ icon: Icon, title, sub, btn }) => (
                  <div key={title} className="border border-gray-100 rounded-xl p-3 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                      <Icon size={18} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">{title}</p>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">{sub}</p>
                    </div>
                    <button  onClick={() => {
                    if (title === "Track Shipment") {
                      setTrackShipment(true);
                    } else if (title === "Upload Documents") {
                      setUploadDocument(true);
                    } else if (title === "Share Plan") {
                      setSharePlan(true);
                    }else 
                      setBookShipment(true)
                  }}
                  className="w-full border border-teal-500 text-teal-600 text-[11px] font-semibold py-1.5 rounded-lg hover:bg-teal-50 mt-auto">
                      {btn}
                    </button>
                  </div>
                ))}
              </div>

         </div>

            <div className="grid sm:grid-cols-2  lg:grid-cols-1 xl:grid-cols-1 gap-4 ">
                
           
             <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-base  font-bold text-[#071B60] mb-3">Risk & Alerts</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <FiCheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-600">Low Risk</p>
                    <p className="text-xs sm:text-sm  text-gray-500">Route and commodity risk level is low.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FiAlertCircle size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-orange-500">Customs Check</p>
                    <p className="text-xs sm:text-sm  text-gray-500">Random inspection possible.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FiBookOpen size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-blue-500">Documentation</p>
                    <p className="text-xs sm:text-sm  text-gray-500">Ensure HS code and invoice match.</p>
                  </div>
                </div>
              </div>
              {/* <button className="mt-3 text-teal-500 text-xs sm:text-sm font-medium hover:underline flex items-center gap-1">
                View All Alerts <FiChevronRight className="text-xs sm:text-sm" />
              </button> */}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm sm:text-lg  font-semibold text-[#071B60] mb-1">Need Help?</p>
                <div className="flex gap-4 items-center mb-3 ">     
                    <p className="text-xs  font-medium text-gray-500 ">Our trade experts are here to help you.</p>
                      <div className="bg-[#DDE6F4] w-12 flex items-center justify-center h-16 rounded-full "><img src={girl} /> </div>  
                   </div>
               
                {/* <button className="w-full border border-gray-200 text-[#009B8D] text-sm sm:text-sm font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5">
                  <FiMessageSquare size={12} /> Chat with Expert
                </button> */}
              </div>
            </div>

            </div>

          
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 ">
            <div className="bg-white border border-gray-200 rounded-xl p-4 h-auto ">
              <p className="text-base  font-bold text-[#071B60] mb-3">Route & Schedule (Summary)</p>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#071B60]">Tirupur, India (IN)</p>
                </div>
                <img src={plane} className="" />
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-semibold text-[#071B60]">Dubai, UAE (AE)</p>
                </div>
              </div>
              {[["Mode", "Air Freight"], ["Carrier (To be Confirmed)", "IndiGo Cargo / Emirates SkyCargo"], ["Estimated Departure", "26 Apr 2025"], ["Estimated Arrival", "30 Apr 2025"], ["Transit Time", "3 – 5 Days"]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-gray-100 last:border-0 gap-2">
                  <span className="text-xs sm:text-sm  text-gray-500 font- flex-shrink-0">{k}</span>
                  <span className="text-xs sm:text-sm  font-medium text-[#071B60] text-right">{v}</span>
                </div>
              ))}
             
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-base  font-bold text-[#071B60] mb-3">Cost Summary (INR)</p>
              {costRows.map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-xs sm:text-sm text-gray-500 font-">{k}</span>
                  <span className="text-xs sm:text-sm font-medium text-[#071B60]">{v}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 mt-1 border-t-2 border-gray-200">
                <span className="text-sm  font-bold text-[#071B60]">Total Estimated Cost</span>
                <span className="text-sm font-bold text-emerald-600">₹24,860</span>
              </div>
              
            </div>

            <div className="bg-white  border border-gray-200 rounded-xl p-4">
             
              <div className="flex flex-col justify-between   h-full ">  
                <div > 
                <p className="text-base  font-bold text-[#071B60] mb-3">Compliance & Documents (Summary)</p>
                 {complianceDocs.map(([doc, status]) => (
                <div key={doc} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-1.5">
                    <FiCheckCircle size={12} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm  text-gray-700">{doc}</span>
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${status === "Required" ? "text-[#071B60]" : status === "If Applicable" ? "text-[#071B60]" : "text-[#071B60]"}`}>{status}</span>
                </div>
              ))} </div> 
              <div className=""> 
                  {/* <button className="mt-3 w-full border border-teal-600 text-teal-600 text-xs  sm:text-sm font-medium py-2 rounded-lg hover:bg-gray-50">
                View All Documents
              </button> */}
              
              </div> </div> 
            
            </div>

           <div className="">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-base  font-bold text-[#071B60] mb-2">Plan Notes</p>
              <p className="text-xs sm:text-sm font-medium text-gray-600">Urgent shipment for new collection launch.</p>
              {/* <button className="mt-2 text-teal-500 border-teal-600  text-xs sm:text-sm  font-medium hover:underline flex items-center justify-center mx-auto w-full border px-3 py-2 rounded-lg  gap-1">
                <FiEdit2 size={11} /> Edit Notes
              </button> */}
            </div>

          
            </div>
            
          </div>
        </div>
 
        
      </div> 
        <div className="min-w-0  mt-4"> 
                      <DashboardAdPlacement location="User Dashboard - Shipment Planning" />
                  </div>
       </div>)}
      
       {shipment === "shipment" && (
                     <div>
                       <Shipment setActiveTab={setMainTab} setShipment={setShipment} currentTab={"Shipment Planning"} />
                     </div>
              )}
      {bookShipment && (<BookShipment onClose={() => setBookShipment(false)} />)}
       {sharePlan && (<SharePlan onClose={() => setSharePlan(false)} />)}
       {trackShipment && (<TrackShipment onClose={() => setTrackShipment(false)} />)}
       {uploadDocument && (<UploadDocument onClose={() => setUploadDocument(false)} />)}

    </div>
  );
}





  