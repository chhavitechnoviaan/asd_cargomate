import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Package,
  MapPin,
  FileText,
  IndianRupee,
  Truck,
  CalendarDays,
  Box,
  AlertCircle,
} from "lucide-react";

import { getShipmentDetails } from "../../api/ShipmentApi";

const ViewShipment = ({ shipmentId, onBack, onEdit }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shipmentId) {
      setLoading(false);
      setError("No shipment selected.");
      return;
    }
    fetchShipmentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipmentId]);

  const fetchShipmentDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getShipmentDetails(shipmentId);
      const payload = response?.data?.data;

      if (!payload) {
        setError("Shipment details not found.");
        setDetails(null);
      } else {
        setDetails(payload);
      }
    } catch (err) {
      console.error("Shipment details error:", err);
      setError(
        err.response?.data?.message || "Unable to load shipment details."
      );
      setDetails(null);
    } finally {
      // IMPORTANT: loading always turns off, success or fail - no infinite spinner
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (onEdit) onEdit(shipmentId);
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value);
    return value;
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const DetailItem = ({ label, value }) => (
    <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
      <p className="text-[11px] font-medium text-slate-400 mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-800 break-words">
        {formatValue(value)}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading shipment details...</p>
        </div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F8FAFC] overflow-y-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <div className="bg-white border border-red-100 rounded-2xl p-8 text-center max-w-xl mx-auto">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800">Unable to load shipment</h2>
          <p className="text-sm text-slate-500 mt-2">
            {error || "Shipment details not found."}
          </p>
        </div>
      </div>
    );
  }

  const { header = {}, shipmentInfo = {}, overview = {}, documents = [], parties = {} } = details;
  const exporter = parties.exporter || {};
  const importer = parties.importer || {};

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-3 transition"
            >
              <ArrowLeft size={17} />
              Back to Shipments
            </button>

            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Shipment Details
              </h1>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                {header.shipmentStatus || "Draft"}
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-1">{header.shipmentId || "-"}</p>
          </div>

          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition"
          >
            <Edit3 size={17} />
            Edit Shipment
          </button>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Package size={19} className="text-blue-600" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Shipment / SB No.</p>
                <p className="text-sm font-bold text-slate-800">{header.shipmentId || "-"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Truck size={19} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Shipment Mode</p>
                <p className="text-sm font-bold text-slate-800">{shipmentInfo.mode || "-"}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <IndianRupee size={19} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Estimated Cost</p>
                <p className="text-sm font-bold text-slate-800">
                  ₹{Number(header.estimatedCost || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <CalendarDays size={19} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">ETA</p>
                <p className="text-sm font-bold text-slate-800">{formatDate(header.eta)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BASIC + ROUTE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Package size={17} />
              </div>
              <h2 className="text-base font-bold text-slate-800">Basic Shipment Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem label="Shipment Mode" value={shipmentInfo.mode} />
              <DetailItem label="Carrier" value={shipmentInfo.carrier?.name} />
              <DetailItem label="Incoterm" value={shipmentInfo.incoterm} />
              <DetailItem label="AWB Number" value={shipmentInfo.awbNumber} />
              <DetailItem label="Transit Time" value={shipmentInfo.transitTime} />
              <DetailItem label="Total Volume" value={shipmentInfo.totalVolume} />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <MapPin size={17} />
              </div>
              <h2 className="text-base font-bold text-slate-800">Origin & Destination</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem label="Origin Country" value={header.route?.originCountry} />
              <DetailItem label="Origin City" value={header.route?.originCity} />
              <DetailItem label="Destination Country" value={header.route?.destinationCountry} />
              <DetailItem label="Destination City" value={header.route?.destinationCity} />
              <DetailItem label="ETD" value={formatDate(header.etd)} />
              <DetailItem label="ETA" value={formatDate(header.eta)} />
            </div>
          </div>
        </div>

        {/* INVOICE + PRODUCT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <FileText size={17} />
              </div>
              <h2 className="text-base font-bold text-slate-800">Invoice & Payment</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem label="Estimated Cost" value={overview.estimatedCost} />
              <DetailItem label="Paid Amount" value={overview.paidAmount} />
              <DetailItem label="Balance Amount" value={overview.balanceAmount} />
              <DetailItem label="Payment Status" value={overview.paymentStatus} />
              <DetailItem label="Created On" value={formatDate(overview.createdOn)} />
              <DetailItem label="Created By" value={overview.createdBy?.name} />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center">
                <Box size={17} />
              </div>
              <h2 className="text-base font-bold text-slate-800">Product / Cargo Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem label="Goods" value={shipmentInfo.goods} />
              <DetailItem label="HS Code" value={shipmentInfo.hsCode?.hsCode} />
              <DetailItem label="Quantity" value={shipmentInfo.quantity} />
              <DetailItem label="Weight" value={shipmentInfo.weight} />
            </div>
          </div>
        </div>

        {/* PARTIES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                <Package size={17} />
              </div>
              <h2 className="text-base font-bold text-slate-800">Exporter</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem label="Company Name" value={exporter.companyName} />
              <DetailItem label="Contact Person" value={exporter.contactPerson} />
              <DetailItem label="Email" value={exporter.email} />
              <DetailItem label="Phone" value={exporter.phone} />
              <DetailItem label="Address" value={exporter.address} />
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center">
                <MapPin size={17} />
              </div>
              <h2 className="text-base font-bold text-slate-800">Importer</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailItem label="Company Name" value={importer.companyName} />
              <DetailItem label="Contact Person" value={importer.contactPerson} />
              <DetailItem label="Email" value={importer.email} />
              <DetailItem label="Phone" value={importer.phone} />
              <DetailItem label="Address" value={importer.address} />
            </div>
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center">
              <FileText size={17} />
            </div>
            <h2 className="text-base font-bold text-slate-800">Documents</h2>
          </div>

          {Array.isArray(documents) && documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {documents.map((doc, index) => (
                <div key={doc._id || index} className="border border-slate-100 bg-slate-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-700">
                    {doc.documentName || `Document ${index + 1}`}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{doc.status}</p>
                  {doc.fileUrl && (
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-blue-600 hover:underline mt-2 inline-block"
                    >
                      View Document
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-5 text-center">
              No documents uploaded.
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-8">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            ← Back to Shipments
          </button>

          <button
            onClick={handleEdit}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
          >
            <Edit3 size={17} />
            Edit Shipment
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewShipment;