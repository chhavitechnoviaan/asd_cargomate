import { useState } from "react";
import {
  MapPin,
  Pencil,
  FileText,
  FileSignature,
  Share2,
  RefreshCcw,
} from "lucide-react";
import {
  FaPlus, FaMagnifyingGlass, FaXmark, FaChevronDown,
  FaStar, FaTruck, FaBoxOpen, FaWarehouse, FaFileContract
} from "react-icons/fa6";
const tabs = ["Shipment Details", "Parties & Contacts", "Cargo Details", "Documents", "Charges"];
import PartiesContact from "./Parties&Contact"
import CargoDetails from "./CargoDetails"
import Documents from "./Documents"
import Charges from "./Charges"
import ShipmentDetails from "./ShipmentDetails"
import Quotation from "./Quotation"
import CreateNewInvoice from "./CreateNewInvoice";
const actions = [
  { icon: Pencil, bg: "bg-purple-50", color: "text-purple-600", title: "Edit Shipment", desc: "Make changes to shipment details." },
  { icon: FileSignature, bg: "bg-blue-50", color: "text-blue-600", title: "Create quotation", desc: "Generate and share quotation",},
  // { icon: Share2, bg: "bg-orange-50", color: "text-orange-500", title: "Share Quotation", desc: "Share quotation with client." },
  { icon: RefreshCcw, bg: "bg-blue-50", color: "text-blue-500", title: "Change Status", desc: "Change Shipment status." },
    { icon: FileText, bg: "bg-green-50", color: "text-green-600", title: "Create Invoice", desc: "Create invoice for this shipment." },

];

export default function ReviewShipment({onClose}) {
  const [activeTab, setActiveTab] = useState("Shipment Details");
  const [viewShipmentDetail, setViewShipmentDetail] = useState(false)
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [newInvoice, setNewInvoice] = useState(false)
  const [basicInfo, setBasicInfo] = useState({
  shipmentType: "Export",
  transportMode: "Sea",
  incoterm: "FOB",
  priority: "Medium",
  referenceNo: "REF-2025-789",
  bookingNo: "BK-4587",
  etd: "25 May, 2025",
  eta: "05 June, 2025",
});

const initialRoute = {
  origin: "Nhava Sheva Port,India",
  destination: "Rotterdam Port, Netherlands",
  placeOfReceipt: "Indore, Madhya Pradesh",
  finalDelivery: "Rotterdam Warehouse,NL",
};
const [route, setRoute] = useState(initialRoute);
const [originalRoute, setOriginalRoute] = useState(initialRoute);
const [editRoute, setEditRoute] = useState(false);

const handleBasicInfoChange = (key) => (e) => {
  setBasicInfo((prev) => ({
    ...prev,
    [key]: e.target.value,
  }));
};

const saveBaseInfo = () => {

            try {
              // API call yaha kar sakte ho
              // await fetch("/api/shipment/basic-info", {
              //   method: "PUT",
              //   headers: {
              //     "Content-Type": "application/json",
              //   },
              //   body: JSON.stringify(basicInfo),
              // });

              setEditBasicInfo(false);
            } catch (error) {
              console.error("Failed to save basic information", error);
            }
          
}
  const handleProceed = async () => {
    try {
      await fetch("/api/shipments/SHP-250520-0001/proceed", { method: "POST" });
    } catch (err) {}
  };

  const handleRouteChange = (key) => (e) => {
  setRoute((prev) => ({
    ...prev,
    [key]: e.target.value,
  }));
};

const handleRouteEdit = () => {
  setOriginalRoute(route);
  setEditRoute(true);
};

const handleRouteCancel = () => {
  setRoute(originalRoute);
  setEditRoute(false);
};

const handleRouteSave = async () => {
  try {
    // API call yaha kar sakte ho
    // await fetch("/api/shipment/route", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(route),
    // });

    setOriginalRoute(route);
    setEditRoute(false);
  } catch (error) {
    console.error("Failed to save route", error);
  }
};

const initialCargo = {
  productName: "Allnonds (Blached)",
  hsCode: "0802.12.00",
  packagingType: "Cartons",
  totalPackages: "120",
  netWeight: "1500.00 KG",
  grossWeight: "1650.00 KG",
  volume: "3.250 CBM",
  cargoDescription: "Food Products",
};

const [cargo, setCargo] = useState(initialCargo);
const [originalCargo, setOriginalCargo] = useState(initialCargo);
const [editCargo, setEditCargo] = useState(false);

const handleCargoChange = (key) => (e) => {
  setCargo((prev) => ({
    ...prev,
    [key]: e.target.value,
  }));
};

const handleCargoEdit = () => {
  setOriginalCargo(cargo);
  setEditCargo(true);
};

const handleCargoCancel = () => {
  setCargo(originalCargo);
  setEditCargo(false);
};

const handleCargoSave = async () => {
  try {
    // API call yaha kar sakte ho
    // await fetch("/api/shipment/cargo-information", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(cargo),
    // });

    setOriginalCargo(cargo);
    setEditCargo(false);
  } catch (error) {
    console.error("Failed to save cargo information", error);
  }
};

const initialAdditionalInfo = {
  specialInstructions: "Handle with care, keep away from moisture",
  insuranceRequired: "Yes",
  inspectionRequired: "Yes",
  remarks: "Please ensure time delivery",
};

const [additionalInfo, setAdditionalInfo] = useState(initialAdditionalInfo);
const [originalAdditionalInfo, setOriginalAdditionalInfo] =
  useState(initialAdditionalInfo);
const [editAdditionalInfo, setEditAdditionalInfo] = useState(false);

const handleAdditionalInfoChange = (key) => (e) => {
  setAdditionalInfo((prev) => ({
    ...prev,
    [key]: e.target.value,
  }));
};

const handleAdditionalInfoEdit = () => {
  setOriginalAdditionalInfo(additionalInfo);
  setEditAdditionalInfo(true);
};

const handleAdditionalInfoCancel = () => {
  setAdditionalInfo(originalAdditionalInfo);
  setEditAdditionalInfo(false);
};

const handleAdditionalInfoSave = async () => {
  try {
    // API call yaha kar sakte ho
    // await fetch("/api/shipment/additional-information", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(additionalInfo),
    // });

    setOriginalAdditionalInfo(additionalInfo);
    setEditAdditionalInfo(false);
  } catch (error) {
    console.error("Failed to save additional information", error);
  }
};

  return (
  <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50  ">
   {!viewShipmentDetail && (  
    <div className="w-full max-h-[90vh] overflow-y-auto hide-scrollbar ">
    
    <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[70%_30%] gap-4">
      <div className=" bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex justify-between items-start"> 
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Review Shipment</h2>
            <p className="text-sm text-gray-500">Review, edit shipment details, create invoice or share quotation.</p>
          </div>
        </div>
            <div> <button onClick={onClose}> <FaXmark className="text-lg"/></button></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 border border-gray-100 rounded-lg p-3 mb-4 text-xs">
          <div>
            <p className="text-gray-400">Shipment ID</p>
            <p className="font-semibold text-gray-900">SHP-250520-0001</p>
          </div>
          <div>
            <p className="text-gray-400">Submitted By</p>
            <p className="font-semibold text-gray-900">Aarav Sharma</p>
          </div>
          <div>
            <p className="text-gray-400">Company</p>
            <p className="font-semibold text-gray-900">ABC Pvt. Ltd.</p>
          </div>
          <div>
            <p className="text-gray-400">Submitted On</p>
            <p className="font-semibold text-gray-900">20 May 2025, 10:30 PM</p>
          </div>
          <div>
            <p className="text-gray-400">Current Status</p>
            <p className="font-semibold text-orange-500">Under Review</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto border-b border-gray-200 mb-4">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-sm pb-2 border-b-2 ${
                activeTab === tab
                  ? "text-purple-600 border-purple-600 font-medium"
                  : "text-gray-500 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Shipment Details" && (
          <div className="space-y-4">
            <div className="border border-gray-300 rounded-lg   ">
             <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm">
                Basic Information
              </p>

              {!editBasicInfo ? (
                <button
                  type="button"
                  onClick={() => setEditBasicInfo(true)}
                  className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
                >
                  Edit Section
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditBasicInfo(false)}
                    className="text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={saveBaseInfo}
                    className="text-xs text-white bg-blue-600 rounded-lg px-3 py-1.5"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">

              {/* Shipment Type */}
              <div>
                <p className="text-xs text-gray-400">Shipment Type</p>

                {editBasicInfo ? (
                  <input
                    value={basicInfo.shipmentType}
                    onChange={handleBasicInfoChange("shipmentType")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {basicInfo.shipmentType}
                  </p>
                )}
              </div>

              {/* Mode of Transport */}
              <div>
                <p className="text-xs text-gray-400">Mode of Transport</p>

                {editBasicInfo ? (
                  <input
                    value={basicInfo.transportMode}
                    onChange={handleBasicInfoChange("transportMode")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {basicInfo.transportMode}
                  </p>
                )}
              </div>

              {/* Incoterm */}
              <div>
                <p className="text-xs text-gray-400">Incoterm</p>

                {editBasicInfo ? (
                  <input
                    value={basicInfo.incoterm}
                    onChange={handleBasicInfoChange("incoterm")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {basicInfo.incoterm}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div>
                <p className="text-xs text-gray-400">Priority</p>

                {editBasicInfo ? (
                  <select
                    value={basicInfo.priority}
                    onChange={handleBasicInfoChange("priority")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                ) : (
                  <p className="font-medium text-orange-500">
                    {basicInfo.priority}
                  </p>
                )}
              </div>

              {/* Reference No */}
              <div>
                <p className="text-xs text-gray-400">Reference No.</p>

                {editBasicInfo ? (
                  <input
                    value={basicInfo.referenceNo}
                    onChange={handleBasicInfoChange("referenceNo")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {basicInfo.referenceNo}
                  </p>
                )}
              </div>

              {/* Booking No */}
              <div>
                <p className="text-xs text-gray-400">Booking No.</p>

                {editBasicInfo ? (
                  <input
                    value={basicInfo.bookingNo}
                    onChange={handleBasicInfoChange("bookingNo")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {basicInfo.bookingNo}
                  </p>
                )}
              </div>

              {/* ETD */}
              <div>
                <p className="text-xs text-gray-400">ETD (expected)</p>

                {editBasicInfo ? (
                  <input
                    value={basicInfo.etd}
                    onChange={handleBasicInfoChange("etd")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {basicInfo.etd}
                  </p>
                )}
              </div>

              {/* ETA */}
              <div>
                <p className="text-xs text-gray-400">ETA (expected)</p>

                {editBasicInfo ? (
                  <input
                    value={basicInfo.eta}
                    onChange={handleBasicInfoChange("eta")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {basicInfo.eta}
                  </p>
                )}
              </div>

            </div>
          </div>
            </div>

          <div className="border border-gray-300 rounded-lg p-4">
  <div className="flex items-center justify-between mb-3">
    <p className="font-semibold text-gray-900 text-sm">Route</p>

    {!editRoute ? (
      <button
        type="button"
        onClick={handleRouteEdit}
        className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
      >
        Edit Section
      </button>
    ) : (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleRouteCancel}
          className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleRouteSave}
          className="text-xs text-white bg-blue-600 border border-blue-600 rounded-lg px-3 py-1.5"
        >
          Save
        </button>
      </div>
    )}
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">

    {/* From */}
    <div>
      <p className="text-xs text-gray-400">From (Origin)</p>

      {editRoute ? (
        <input
          value={route.origin}
          onChange={handleRouteChange("origin")}
          className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
        />
      ) : (
        <p className="font-medium text-gray-900">
          {route.origin}
        </p>
      )}
    </div>

    {/* To */}
    <div>
      <p className="text-xs text-gray-400">To (Destination)</p>

      {editRoute ? (
        <input
          value={route.destination}
          onChange={handleRouteChange("destination")}
          className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
        />
      ) : (
        <p className="font-medium text-gray-900">
          {route.destination}
        </p>
      )}
    </div>

    {/* Place of receipt */}
    <div>
      <p className="text-xs text-gray-400">Place of receipt</p>

      {editRoute ? (
        <input
          value={route.placeOfReceipt}
          onChange={handleRouteChange("placeOfReceipt")}
          className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
        />
      ) : (
        <p className="font-medium text-gray-900">
          {route.placeOfReceipt}
        </p>
      )}
    </div>

    {/* Final Delivery */}
    <div>
      <p className="text-xs text-gray-400">Final Delivery</p>

      {editRoute ? (
        <input
          value={route.finalDelivery}
          onChange={handleRouteChange("finalDelivery")}
          className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
        />
      ) : (
        <p className="font-medium text-gray-900">
          {route.finalDelivery}
        </p>
      )}
    </div>

  </div>
          </div>

            <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-900 text-sm">
                Cargo Information
              </p>

              {!editCargo ? (
                <button
                  type="button"
                  onClick={handleCargoEdit}
                  className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
                >
                  Edit Section
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCargoCancel}
                    className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleCargoSave}
                    className="text-xs text-white bg-blue-600 border border-blue-600 rounded-lg px-3 py-1.5"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">

              {/* Product Name */}
              <div>
                <p className="text-xs text-gray-400">Product Name</p>

                {editCargo ? (
                  <input
                    value={cargo.productName}
                    onChange={handleCargoChange("productName")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {cargo.productName}
                  </p>
                )}
              </div>

              {/* HS Code */}
              <div>
                <p className="text-xs text-gray-400">HS Code</p>

                {editCargo ? (
                  <input
                    value={cargo.hsCode}
                    onChange={handleCargoChange("hsCode")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {cargo.hsCode}
                  </p>
                )}
              </div>

              {/* Packaging Type */}
              <div>
                <p className="text-xs text-gray-400">Packaging Type</p>

                {editCargo ? (
                  <input
                    value={cargo.packagingType}
                    onChange={handleCargoChange("packagingType")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {cargo.packagingType}
                  </p>
                )}
              </div>

              {/* Total Packages */}
              <div>
                <p className="text-xs text-gray-400">Total Packages</p>

                {editCargo ? (
                  <input
                    value={cargo.totalPackages}
                    onChange={handleCargoChange("totalPackages")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {cargo.totalPackages}
                  </p>
                )}
              </div>

              {/* Net Weight */}
              <div>
                <p className="text-xs text-gray-400">Net weight</p>

                {editCargo ? (
                  <input
                    value={cargo.netWeight}
                    onChange={handleCargoChange("netWeight")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {cargo.netWeight}
                  </p>
                )}
              </div>

              {/* Gross Weight */}
              <div>
                <p className="text-xs text-gray-400">Gross Weight</p>

                {editCargo ? (
                  <input
                    value={cargo.grossWeight}
                    onChange={handleCargoChange("grossWeight")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {cargo.grossWeight}
                  </p>
                )}
              </div>

              {/* Volume */}
              <div>
                <p className="text-xs text-gray-400">Volume (CBM)</p>

                {editCargo ? (
                  <input
                    value={cargo.volume}
                    onChange={handleCargoChange("volume")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {cargo.volume}
                  </p>
                )}
              </div>

              {/* Cargo Description */}
              <div>
                <p className="text-xs text-gray-400">Cargo Description</p>

                {editCargo ? (
                  <input
                    value={cargo.cargoDescription}
                    onChange={handleCargoChange("cargoDescription")}
                    className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                  />
                ) : (
                  <p className="font-medium text-gray-900">
                    {cargo.cargoDescription}
                  </p>
                )}
              </div>

            </div>
          </div>


          <div className="border border-gray-300 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-gray-900 text-sm">
            Additional Information
          </p>

          {!editAdditionalInfo ? (
            <button
              type="button"
              onClick={handleAdditionalInfoEdit}
              className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
            >
              Edit Section
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAdditionalInfoCancel}
                className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAdditionalInfoSave}
                className="text-xs text-white bg-blue-600 border border-blue-600 rounded-lg px-3 py-1.5"
              >
                Save
              </button>
            </div>
          )}
        </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">

            {/* Special Instructions */}
            <div>
              <p className="text-xs text-gray-400">
                Special Instructions
              </p>

              {editAdditionalInfo ? (
                <input
                  value={additionalInfo.specialInstructions}
                  onChange={handleAdditionalInfoChange("specialInstructions")}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                />
              ) : (
                <p className="font-medium text-gray-900">
                  {additionalInfo.specialInstructions}
                </p>
              )}
            </div>

            {/* Insurance Required */}
            <div>
              <p className="text-xs text-gray-400">
                Insurance Required
              </p>

              {editAdditionalInfo ? (
                <select
                  value={additionalInfo.insuranceRequired}
                  onChange={handleAdditionalInfoChange("insuranceRequired")}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <p className="font-medium text-gray-900">
                  {additionalInfo.insuranceRequired}
                </p>
              )}
            </div>

            {/* Inspection Required */}
            <div>
              <p className="text-xs text-gray-400">
                Inspection required
              </p>

              {editAdditionalInfo ? (
                <select
                  value={additionalInfo.inspectionRequired}
                  onChange={handleAdditionalInfoChange("inspectionRequired")}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              ) : (
                <p className="font-medium text-gray-900">
                  {additionalInfo.inspectionRequired}
                </p>
              )}
            </div>

            {/* Remarks */}
            <div>
              <p className="text-xs text-gray-400">
                Remarks
              </p>

              {editAdditionalInfo ? (
                <input
                  value={additionalInfo.remarks}
                  onChange={handleAdditionalInfoChange("remarks")}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
                />
              ) : (
                <p className="font-medium text-gray-900">
                  {additionalInfo.remarks}
                </p>
              )}
            </div>

          </div>
        </div>

            <div className="bg-purple-50 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Ready To Proceed?</p>
                <p className="text-xs text-gray-500">
                  You can edit shipment details, create invoice, or share quotation with your client.
                </p>
              </div>
              <button
                onClick={handleProceed}
                className="px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-medium whitespace-nowrap"
              >
                Proceed to next step
              </button>
            </div>
          </div>
        )}

        {activeTab !== "Shipment Details" && (
          <p className="text-sm text-gray-500">{activeTab} content goes here.</p>
        )}

        {activeTab === "Parties & Contacts" && (
          <PartiesContact />
        )}
         {activeTab === "Cargo Details" && (
          <CargoDetails />
         )}
          {activeTab === "Documents" && (
            <Documents />
          )}
           {activeTab === "Charges" && (
            <Charges />
           )}                            
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <p className="font-bold text-gray-900 mb-4">Actions</p>
          <div className="space-y-3">
            {actions.map((a,i) => {
              const Icon = a.icon;
              return (
                <button
               onClick={() => {
                      if (a.title === "Create quotation") {
                        //  setViewShipmentDetail(false)
                         setShowQuotationModal(true);
                      }else if (a.title === "Create Invoice") {
                        setNewInvoice(true)
                      }
                    }}
                  key={a.title}
                  className={`w-full flex items-center gap-3 rounded-lg p-3 text-left ${a.bg}`}
                >
                  <Icon className={`w-4 h-4 ${a.color} shrink-0`} />
                  <div>
                    <p className={`text-sm font-semibold ${a.color}`}>{a.title}</p>
                    <p className="text-xs text-gray-500">{a.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <p className="font-bold text-gray-900 mb-4">Shipment Summary</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total cargo value</span>
              <span className="text-gray-900">₹8,75,000.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Charges</span>
              <span className="text-gray-900">₹1,24,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Insurance Value</span>
              <span className="text-gray-900">₹50,000.00</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <span className="text-gray-900 font-semibold">Total Payable</span>
              <span className="text-purple-600 font-bold">₹1,74,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status</span>
              <span className="text-blue-600 font-medium">Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <p className="font-bold text-gray-900 mb-4">Client Details</p>
          <div className="flex items-center gap-3 mb-1">
            <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
              AS
            </span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Aarav Sharma</p>
              <p className="text-xs text-gray-500">ABC Export Pvt. Ltd.</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">aarav.sharma@gmail.com</p>
          <p className="text-xs text-gray-500 mb-4">+91 74833 65549</p>
          <button onClick={() => setViewShipmentDetail(true)} className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-800 text-sm font-medium">
            View Full Details
          </button>
        </div>
      </div>
    </div>
    </div>
  
  )}

    {
      viewShipmentDetail && (
          <ShipmentDetails  onClose={() => setViewShipmentDetail(false)}/>
      )
    }

      { showQuotationModal && <Quotation  onClose={() => setShowQuotationModal(false)} />}

      {newInvoice && <CreateNewInvoice onClose={() => setNewInvoice(false)} />}
        
    </div>
  );
}