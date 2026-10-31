import React, { useState, useEffect, useRef } from "react";
import {
  FiChevronDown,
  FiFileText,
  FiClipboard,
  FiAward,
  FiCreditCard,
  FiShoppingCart,
  FiFolder,
  FiTruck,
  FiZap,
  FiUploadCloud,
  FiEye,
  FiSend,
  FiCheckCircle,
  FiExternalLink,
  FiCalendar,
} from "react-icons/fi";

import {
  createShipment,
  updateShipmentStep2,
  updateShipmentStep3,
  saveDraft,
  analyzeShipment,
  submitShipment,
  getHSCodes,
  uploadShipmentDocument,
  getShipmentDetails,
} from "../services/shipmentApi";

function Label({ children, required = true }) {
  return (
    <label className="block text-[13px] font-semibold text-slate-700 mb-2 leading-tight">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({
  label,
  placeholder,
  value,
  name,
  onChange,
  required = true,
  disabled = false,
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full min-w-0 h-10 border border-slate-200 bg-white rounded-xl px-3 text-[13px] text-slate-700 placeholder-slate-400 shadow-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50 disabled:text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap"
      />
    </div>
  );
}

function DateInput({ label, value, name, onChange, required = false }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full h-10 border border-slate-200 bg-white rounded-xl px-3 text-sm text-slate-700 placeholder-slate-400 shadow-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
        <FiCalendar
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

function Select({
  label,
  placeholder,
  value,
  name,
  onChange,
  children,
  required = true,
}) {
  return (
    <div>
      <Label  required={required}>{label}</Label>
      <div className="relative">
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full min-w-0 h-10 appearance-none border border-slate-200 bg-white rounded-xl px-3 pr-9 text-[13px] text-slate-700 shadow-sm transition focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          <option value="">{placeholder}</option>
          {children}
        </select>
        <FiChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
      </div>
    </div>
  );
}

function RadioGroup({ label, name, value, onChange, required = true }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <div className="flex items-center gap-5 mt-2.5">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <input
            type="radio"
            name={name}
            checked={value === true || value === "yes"}
            onChange={() => onChange(name, true)}
            className="accent-blue-600"
          />
          Yes
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <input
            type="radio"
            name={name}
            checked={value === false || value === "no"}
            onChange={() => onChange(name, false)}
            className="accent-blue-600"
          />
          No
        </label>
      </div>
    </div>
  );
}

function Grid2({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">{children}</div>;
}

function SectionCard({ number, title, subtitle, children }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-[0_4px_18px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)] transition-shadow">
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
          {number}
        </span>
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h3>
      </div>
      {subtitle && <p className="text-[13px] text-slate-500 mt-1 ml-9">{subtitle}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

const docTypes = [
  { label: "Commercial Invoice", icon: FiFileText, color: "text-blue-600 bg-blue-50" },
  { label: "Packing List", icon: FiClipboard, color: "text-orange-600 bg-orange-50" },
  { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
  { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
  { label: "Purchase Order", icon: FiShoppingCart, color: "text-orange-600 bg-orange-50" },
  { label: "Product Certificate", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "Other Documents", icon: FiFolder, color: "text-gray-500 bg-gray-100" },
];

function DocumentsUpload({ uploadedDocs, handleDocumentUpload, fileInputRef }) {
  return (
    <SectionCard number={5} title="Documents Upload" subtitle="Upload all relevant documents">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {docTypes.map((d) => {
          const Icon = d.icon;
          return (
            <div
              key={d.label}
              className="border border-slate-200 bg-slate-50/50 items-center rounded-xl p-2.5 text-center hover:bg-white hover:border-blue-200 transition-colors"
            >
              <div className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center ${d.color}`}>
                <Icon size={14} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 mt-2 leading-[1.15] min-h-[23px] flex items-center justify-center">
                  {d.label}
                </p>
                <>
                  <input
                    type="file"
                    hidden
                    ref={(el) => (fileInputRef.current[d.label] = el)}
                    onChange={(e) => {
                      if (e.target.files.length) {
                        handleDocumentUpload(d.label, e.target.files[0]);
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current[d.label].click()}
                    className="text-xs text-blue-600 font-semibold mt-1"
                  >
                    {uploadedDocs[d.label] ? "Uploaded ✔" : "Upload"}
                  </button>
                </>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
        Accepted formats: PDF, JPG, PNG (Max size: 10MB per file)
      </p>
    </SectionCard>
  );
}

function AIOutputAnalysis({ analysis }) {
  const aiTopStats = [
    { label: "Suggested HS Code", value: analysis?.hsCode || "--", color: "bg-blue-50 text-blue-700" },
    { label: "Required Documents", value: analysis?.requiredDocs ? `${analysis.requiredDocs} Documents` : "--", color: "bg-green-50 text-green-700" },
    { label: "Freight Estimate", value: analysis?.freightEstimate ? `₹${analysis.freightEstimate}` : "--", color: "bg-orange-50 text-orange-700" },
    { label: "RoDTEP / Incentive", value: analysis?.incentive || "N/A", color: "bg-purple-50 text-purple-700" },
  ];

  const aiBottomStats = [
    { label: "Compliance Requirements", value: analysis?.complianceCount || "--", sub: "Requirements" },
    { label: "Risk Score", value: analysis?.riskScore || "--", sub: analysis?.riskSub || "", green: true },
    { label: "Estimated Timeline", value: analysis?.timeline || "--" },
    { label: "Recommended Action", value: analysis?.recommendation || "--", green: true },
  ];

  return (
    <SectionCard number={6} title="AI Output After Analysis">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 ">
        {aiTopStats.map((s) => (
          <div key={s.label} className={`flex flex-col justify-around rounded-xl p-3 ${s.color} border border-white shadow-sm`}>
            <p className="text-xs  font-medium">{s.label}</p>
            <p className="text-xs  font-bold mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
        {aiBottomStats.map((s) => (
          <div key={s.label} className="rounded-xl p-3 bg-slate-50 border border-slate-100">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-sm font-bold mt-0.5 ${s.green ? "text-green-600" : "text-gray-900"}`}>
              {s.value}
            </p>
            {s.sub && <p className="text-xs  text-gray-400">{s.sub}</p>}
          </div>
        ))}
      </div>
      <button type="button" className="w-full flex items-center justify-center gap-2 border border-blue-100 bg-blue-50/50 rounded-xl py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition">
        <FiExternalLink size={13} />
        View Full Analysis Report
      </button>
    </SectionCard>
  );
}

function BasicShipmentDetails({ formData, handleDirectChange, handleNestedChange, referenceNumber }) {
  return (
    <SectionCard number={1} title="Basic Shipment Details">
      <Grid2>
        <Select label="Shipment Type" placeholder="Select Type" name="shipmentType" value={formData.shipmentType} onChange={handleDirectChange}>
          <option value="Export">Export</option>
          <option value="Import">Import</option>
        </Select>
        <Select label="Shipment Mode" placeholder="Select Mode" name="shipmentMode" value={formData.shipmentMode} onChange={handleDirectChange}>
          <option value="Air">Air</option>
          <option value="Sea">Sea</option>
          <option value="Road">Road</option>
        </Select>
      </Grid2>
      <Grid2>
        <Select label="Shipment Purpose" placeholder="Select Purpose" name="shipmentPurpose" value={formData.shipmentPurpose} onChange={handleDirectChange}>
          <option value="Commercial">Commercial</option>
          <option value="Sample">Sample</option>
          <option value="Personal">Personal</option>
        </Select>
        <Input
          label="Customer / Company Name"
          name="companyName"
          value={formData.exporter.companyName}
          onChange={(e) => handleNestedChange("exporter", "companyName", e.target.value)}
        />
      </Grid2>
      <Input
        label="Contact Person"
        name="contactPerson"
        value={formData.exporter.contactPerson}
        placeholder="Enter contact person"
        onChange={(e) => handleNestedChange("exporter", "contactPerson", e.target.value)}
      />
      <Input
        label="Reference No"
        value={referenceNumber || "Auto Generated on Draft/Submit"}
        disabled={true}
        required={false}
      />
    </SectionCard>
  );
}

function OriginDestination({ formData, handleDirectChange, handleNestedChange }) {
  return (
    <SectionCard number={2} title="Origin & Destination">
      <Grid2>
        <Select
          label="Origin Country"
          placeholder="Select Country"
          value={formData.route.originCountry}
          onChange={(e) => handleNestedChange("route", "originCountry", e.target.value)}
        >
          <option value="India">India</option>
          <option value="China">China</option>
          <option value="USA">USA</option>
        </Select>
        <Input
          label="Origin City / Port / Airport"
          value={formData.route.originCity}
          onChange={(e) => handleNestedChange("route", "originCity", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Select
          label="Destination Country"
          placeholder="Select Country"
          value={formData.route.destinationCountry}
          onChange={(e) => handleNestedChange("route", "destinationCountry", e.target.value)}
        >
          <option value="India">India</option>
          <option value="Singapore">Singapore</option>
          <option value="Dubai">Dubai</option>
        </Select>
        <Input
          label="Destination City / Port / Airport"
          value={formData.route.destinationCity}
          onChange={(e) => handleNestedChange("route", "destinationCity", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Input
          label="Consignee / Buyer Name"
          value={formData.importer.companyName}
          onChange={(e) => handleNestedChange("importer", "companyName", e.target.value)}
        />
        <Input
          label="Consignee Address"
          value={formData.importer.address}
          onChange={(e) => handleNestedChange("importer", "address", e.target.value)}
        />
      </Grid2>
      <Grid2>
        <Select
          label="Incoterm"
          required={false}
          placeholder="Select Incoterm"
          value={formData.incoterm}
          onChange={(e) => handleDirectChange(e)}
          name="incoterm"
        >
          <option value="FOB">FOB</option>
          <option value="CIF">CIF</option>
          <option value="EXW">EXW</option>
        </Select>
        <DateInput label="Expected Shipment Date" name="etd" value={formData.etd} onChange={handleDirectChange} />
      </Grid2>
    </SectionCard>
  );
}

function InvoiceValue({ formData, handleDirectChange, handleRadioChange }) {
  return (
    <SectionCard number={3} title="Invoice & Value">
      <Grid2>
        <Input label="Invoice Value" placeholder="Enter invoice value" name="amount" value={formData.amount} onChange={handleDirectChange} />
        <Select label="Currency" placeholder="Select currency" name="currency" value={formData.currency} onChange={handleDirectChange}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
          <option value="EUR">EUR</option>
        </Select>
      </Grid2>
      <Select label="Payment Terms" placeholder="Select payment terms" name="paymentTerms" value={formData.paymentTerms} onChange={handleDirectChange}>
        <option value="Advance">Advance</option>
        <option value="LC">Letter of Credit (LC)</option>
        <option value="Net 30">Net 30</option>
      </Select>
      <RadioGroup label="Insurance Required" name="insuranceRequired" value={formData.insuranceRequired} onChange={handleRadioChange} />
      <RadioGroup label="Export Incentive" name="exportIncentive" value={formData.exportIncentive} onChange={handleRadioChange} />
    </SectionCard>
  );
}

function ProductDetails({ formData, handleNestedChange, handleRadioChange, hsCodes }) {
  const cargo = formData.cargo;

  const updateDimension = (key, value) => {
    handleNestedChange("cargo", "dimensions", { ...cargo.dimensions, [key]: value });
  };

  return (
    <SectionCard number={4} title="Product Details">
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="min-w-0">
            <Input label="Product Details" placeholder="Enter product name" value={cargo.productName} onChange={(e) => handleNestedChange("cargo", "productName", e.target.value)} />
          </div>
          <div className="min-w-0">
            <Input label="Product Description" placeholder="Enter product description" value={cargo.productDescription} onChange={(e) => handleNestedChange("cargo", "productDescription", e.target.value)} />
          </div>
          <div className="min-w-0">
            <Select label="HS Code" placeholder="Select HS Code" value={cargo.hsCode} onChange={(e) => handleNestedChange("cargo", "hsCode", e.target.value)}>
              {hsCodes.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.hsCode}
                </option>
              ))}
            </Select>
          </div>
          <div className="min-w-0">
            <Select label="Product Category" placeholder="Select category" value={cargo.category} onChange={(e) => handleNestedChange("cargo", "category", e.target.value)}>
              <option value="Electronics">Electronics</option>
              <option value="Textiles">Textiles</option>
              <option value="General">General Cargo</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="min-w-0">
            <Input label="Quantity" placeholder="Enter quantity" value={cargo.quantity} onChange={(e) => handleNestedChange("cargo", "quantity", e.target.value)} />
          </div>
          <div className="min-w-0">
            <Select label="Unit" placeholder="Select unit" value={cargo.unit} onChange={(e) => handleNestedChange("cargo", "unit", e.target.value)}>
              <option value="PCS">PCS</option>
              <option value="KG">KG</option>
              <option value="BOX">BOX</option>
            </Select>
          </div>
          <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
            <RadioGroup label="Dangerous Goods (DG)" name="isDangerous" value={cargo.isDangerous} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
          </div>
          <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
            <RadioGroup label="Temperature Controlled" name="isTemperatureControlled" value={cargo.isTemperatureControlled} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="min-w-0">
            <Input label="Net Weight (Kg)" placeholder="Enter net weight" value={cargo.weight} onChange={(e) => handleNestedChange("cargo", "weight", e.target.value)} />
          </div>
          <div className="min-w-0">
            <Input label="Gross Weight (Kg)" placeholder="Enter gross weight" value={cargo.grossWeight} onChange={(e) => handleNestedChange("cargo", "grossWeight", e.target.value)} />
          </div>
          <div className="xl:col-span-2 min-w-0">
            <Label>Dimensions (L × W × H)</Label>
            <div className="grid grid-cols-[1fr_1fr_1fr_82px] gap-2 mt-1.5">
              <input type="text" placeholder="Length" value={cargo.dimensions?.length || ""} onChange={(e) => updateDimension("length", e.target.value)} className="min-w-0 w-full h-10 border border-slate-200 rounded-xl px-3 text-sm text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
              <input type="text" placeholder="Width" value={cargo.dimensions?.width || ""} onChange={(e) => updateDimension("width", e.target.value)} className="min-w-0 w-full h-10 border border-slate-200 rounded-xl px-3 text-sm text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
              <input type="text" placeholder="Height" value={cargo.dimensions?.height || ""} onChange={(e) => updateDimension("height", e.target.value)} className="min-w-0 w-full h-10 border border-slate-200 rounded-xl px-3 text-sm text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" />
              <div className="relative min-w-0">
                <select value={cargo.dimensions?.unit || "CM"} onChange={(e) => updateDimension("unit", e.target.value)} className="w-full h-10 appearance-none border border-slate-200 rounded-xl px-3 pr-7 text-sm text-slate-700 bg-white shadow-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10">
                  <option value="CM">CM</option>
                  <option value="INCH">INCH</option>
                </select>
                <FiChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="min-w-0">
            <Input label="Volumetric Weight" placeholder="Auto Calculate" value={cargo.volumetricWeight} onChange={(e) => handleNestedChange("cargo", "volumetricWeight", e.target.value)} />
          </div>
          <div className="min-w-0">
            <Input label="No. of Packages" placeholder="Enter number" value={cargo.packages} onChange={(e) => handleNestedChange("cargo", "packages", e.target.value)} />
          </div>
          <div className="min-w-0">
            <Select label="Packing Type" placeholder="Select type" value={cargo.packingType} onChange={(e) => handleNestedChange("cargo", "packingType", e.target.value)}>
              <option value="Carton">Carton</option>
              <option value="Pallet">Pallet</option>
              <option value="Wooden Crate">Wooden Crate</option>
            </Select>
          </div>
          <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
            <RadioGroup label="Stackable" name="isStackable" value={cargo.isStackable} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
            <RadioGroup label="Fragile" name="isFragile" value={cargo.isFragile} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
          </div>
          <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
            <RadioGroup label="Battery Included" name="hasBattery" value={cargo.hasBattery} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
          </div>
          <div className="min-w-0 rounded-xl bg-slate-50/70 border border-slate-100 px-3 py-2.5">
            <RadioGroup label="Lithium Battery" name="isLithium" value={cargo.isLithium} onChange={(name, val) => handleNestedChange("cargo", name, val)} />
          </div>
          <div className="min-w-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-1 border-t border-slate-100">
          <Input label="UN Number (if DG)" placeholder="Enter UN number" required={false} value={cargo.unNumber} onChange={(e) => handleNestedChange("cargo", "unNumber", e.target.value)} />
          <Input label="Package Marks & Numbers" placeholder="Enter marks & numbers" required={false} value={cargo.packageMarks} onChange={(e) => handleNestedChange("cargo", "packageMarks", e.target.value)} />
        </div>
      </div>
    </SectionCard>
  );
}

const quickTips = [
  "Fill all mandatory fields marked with *",
  "Upload clear and valid documents",
  "Use Analyze Shipment to get AI insights",
  "Submit to admin for review and quotation",
];

function QuickTipsCard() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 rounded-2xl p-5 shadow-sm">
      <h3 className="text-[15px] font-bold text-slate-900 mb-3">Quick Tips</h3>
      <ul className="space-y-2.5">
        {quickTips.map((t) => (
          <li key={t} className="text-xs text-slate-600 flex gap-2 leading-relaxed">
            <span>•</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header({ setActiveTab, setShipment, handleSaveDraft, handleAnalyze, handleSubmit, loading, currentTab, isEdit }) {
  return (
    <div>
      <p className="text-xs text-gray-500">
        Dashboard <span className="mx-1 text-gray-300">›</span> Shipment Operations{" "}
        <span className="mx-1 text-gray-300">›</span> My Shipments{" "}
        <span className="mx-1 text-gray-300">›</span>
        <span className="text-slate-600 font-semibold">{isEdit ? "Edit Shipment" : "New Shipment"}</span>
      </p>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isEdit ? "Edit Shipment" : "New Shipment Form"}
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            {isEdit
              ? "Update shipment details below and save your changes."
              : "Enter shipment details to generate HS code, freight estimate, document checklist and risk score."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={loading}
            className="h-10 border border-slate-200 bg-white text-slate-700 text-sm font-semibold px-4 rounded-xl shadow-sm hover:bg-slate-50 hover:border-slate-300 transition disabled:opacity-50"
          >
            {isEdit ? "Save Changes" : "Save Draft"}
          </button>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="h-10 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 rounded-xl shadow-sm shadow-blue-200 transition disabled:opacity-50"
          >
            Analyze Shipment
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 rounded-xl shadow-sm shadow-emerald-200 transition disabled:opacity-50"
          >
            Submit to Admin
          </button>
          <button
            type="button"
            onClick={() => {
              // Cancel never saves anything - it just navigates away.
              setShipment("");
              setActiveTab(currentTab);
            }}
            className="h-10 border border-red-200 text-red-600 bg-white text-sm font-semibold px-4 rounded-xl hover:bg-red-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="border-t border-slate-200 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
      <p>2025 ASC CargoMatrix. All rights reserved</p>
      <div className="flex items-center gap-4">
        <span>Privacy Policy</span>
        <span>Terms of Uses</span>
        <span>Support</span>
      </div>
    </div>
  );
}

// -------- helpers for prefilling from an unpredictable API shape --------
const pickVal = (...candidates) => {
  for (const c of candidates) {
    if (c !== undefined && c !== null && c !== "") return c;
  }
  return undefined;
};

const formatDateForInput = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

const emptyFormData = {
  shipmentType: "",
  shipmentMode: "",
  shipmentPurpose: "",
  customerType: "Individual",
  exporter: {
    companyName: "",
    contactPerson: "",
  },
  route: {
    originCountry: "",
    originCity: "",
    destinationCountry: "",
    destinationCity: "",
  },
  importer: {
    companyName: "",
    address: "",
  },
  incoterm: "",
  etd: "",
  eta: "",
  cargo: {
    productName: "",
    productDescription: "",
    hsCode: "",
    category: "",
    quantity: "",
    unit: "",
    weight: "",
    grossWeight: "",
    volumetricWeight: "",
    packages: "",
    packingType: "",
    unNumber: "",
    packageMarks: "",
    isDangerous: false,
    isTemperatureControlled: false,
    isStackable: false,
    isFragile: false,
    hasBattery: false,
    isLithium: false,
    dimensions: {
      length: "",
      width: "",
      height: "",
      unit: "CM",
    },
  },
  amount: "",
  currency: "",
  paymentTerms: "",
  insuranceRequired: false,
  exportIncentive: false,
  additionalInformation: {
    packagingType: "",
    packages: 0,
    marksNumbers: "",
    dangerousGoods: false,
    specialHandling: false,
    temperatureControl: false,
  },
};

export default function Shipment({ setActiveTab, setShipment, currentTab, editId, prefill }) {
  const isEdit = Boolean(editId);

  const [shipmentId, setShipmentId] = useState(editId || "");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Draft");
  const [loading, setLoading] = useState(false);
  const [prefillLoading, setPrefillLoading] = useState(isEdit);
  const [hsCodes, setHsCodes] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const fileInputRef = useRef({});

  const [formData, setFormData] = useState(emptyFormData);
  useEffect(()=>{if(!prefill || editId)return;const q=prefill.query?.parsed||{};const hs=prefill.recommended?.hs_code||{};const freight=prefill.recommended?.freight||{};const detail=prefill.freight_detail?.options?.[0]||{};setFormData(prev=>({...prev,shipmentMode:/air/i.test(q.mode||freight.mode||"")?"Air":/sea/i.test(q.mode||freight.mode||"")?"Sea":prev.shipmentMode,route:{...prev.route,originCountry:"India",originCity:q.origin||"",destinationCountry:q.destination_country||"",destinationCity:q.destination||""},incoterm:q.incoterm||"",cargo:{...prev.cargo,productName:q.product||"",productDescription:hs.description||"",hsCode:hs.hs_code||"",weight:q.weight_kg?.toString()||"",grossWeight:q.weight_kg?.toString()||""},amount:q.product_value_inr?.toString()||"",currency:prefill.currency||"INR",etd:detail.est_departure||"",eta:detail.est_arrival||""}));},[prefill,editId]);


  const fetchHsCodes = async () => {
    try {
      const res = await getHSCodes();
      setHsCodes(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHsCodes();
  }, []);

  // ---- Keep shipmentId in sync with the editId prop at all times. ----
  // This is the critical fix: useState(editId || "") only runs on the very
  // first render. If editId ever arrives late/changes, shipmentId would be
  // stuck at "" forever and saveAllSteps() would wrongly create a NEW
  // shipment instead of updating the one being edited.
  useEffect(() => {
    if (editId) {
      setShipmentId(editId);
    }
  }, [editId]);

  // ---- EDIT MODE: fetch existing shipment and prefill the form ----
  useEffect(() => {
    if (!editId) return;

    const loadExisting = async () => {
      try {
        setPrefillLoading(true);
        const res = await getShipmentDetails(editId);
        const data = res.data?.data || res.data;

        console.log("Edit mode - fetched shipment data:", data);

        // `raw` is the exact shipment document from the DB (added by the
        // backend patch) - it matches 1:1 what step1/step2/step3 write,
        // so prefill is reliable. header is used only as a fallback.
        const raw = data.raw || {};
        const header = data.header || {};
        const info = data.shipmentInfo || {};

        const route = raw.route || header.route || {};
        const cargo = raw.cargo || {};
        const exporter = raw.exporter || {};
        const importer = raw.importer || {};

        setReferenceNumber(
          pickVal(raw.referenceNumber, header.referenceNumber, raw.sbNumber, header.shipmentId) || ""
        );

        const hsCodeId =
          (cargo.hsCode && typeof cargo.hsCode === "object" && cargo.hsCode._id) ||
          (typeof cargo.hsCode === "string" ? cargo.hsCode : "") ||
          (info.hsCode && typeof info.hsCode === "object" && info.hsCode._id) ||
          "";

        setFormData({
          shipmentType: pickVal(raw.shipmentType) || "",
          shipmentMode: pickVal(raw.shipmentMode, route.mode, info.mode) || "",
          shipmentPurpose: pickVal(raw.shipmentPurpose) || "",
          customerType: pickVal(raw.customerType) || "Individual",
          exporter: {
            companyName: pickVal(exporter.companyName) || "",
            contactPerson: pickVal(exporter.contactPerson) || "",
          },
          route: {
            originCountry: pickVal(route.originCountry) || "",
            originCity: pickVal(route.originCity) || "",
            destinationCountry: pickVal(route.destinationCountry) || "",
            destinationCity: pickVal(route.destinationCity) || "",
          },
          importer: {
            companyName: pickVal(importer.companyName) || "",
            address: pickVal(importer.address) || "",
          },
          incoterm: pickVal(raw.incoterm) || "",
          etd: formatDateForInput(pickVal(raw.etd, header.etd)),
          eta: formatDateForInput(pickVal(raw.eta, header.eta)),
          cargo: {
            productName: pickVal(cargo.productName, info.goods) || "",
            productDescription: pickVal(cargo.productDescription) || "",
            hsCode: hsCodeId || "",
            category: pickVal(cargo.category) || "",
            quantity: pickVal(cargo.quantity, info.quantity) || "",
            unit: pickVal(cargo.unit) || "",
            weight: pickVal(cargo.weight, info.weight) || "",
            grossWeight: pickVal(cargo.grossWeight) || "",
            volumetricWeight: pickVal(cargo.volumetricWeight) || "",
            packages: pickVal(cargo.packages) || "",
            packingType: pickVal(cargo.packingType) || "",
            unNumber: pickVal(cargo.unNumber) || "",
            packageMarks: pickVal(cargo.packageMarks) || "",
            isDangerous: cargo.isDangerous ?? false,
            isTemperatureControlled: cargo.isTemperatureControlled ?? false,
            isStackable: cargo.isStackable ?? false,
            isFragile: cargo.isFragile ?? false,
            hasBattery: cargo.hasBattery ?? false,
            isLithium: cargo.isLithium ?? false,
            dimensions: {
              length: cargo.dimensions?.length || "",
              width: cargo.dimensions?.width || "",
              height: cargo.dimensions?.height || "",
              unit: cargo.dimensions?.unit || "CM",
            },
          },
          amount: pickVal(raw.amount, header.estimatedCost) || "",
          currency: pickVal(raw.currency) || "",
          paymentTerms: pickVal(raw.paymentTerms) || "",
          insuranceRequired: raw.insuranceRequired ?? false,
          exportIncentive: raw.exportIncentive ?? false,
          additionalInformation: {
            ...emptyFormData.additionalInformation,
            ...(raw.additionalInformation || {}),
          },
        });

        // Belt-and-braces: also set it here (in addition to the sync
        // effect above) right after prefill succeeds.
        setShipmentId(editId);
      } catch (err) {
        console.error("Failed to load shipment for edit:", err);
        alert(err.response?.data?.message || err.message || "Failed to load shipment data for editing.");
      } finally {
        setPrefillLoading(false);
      }
    };

    loadExisting();
  }, [editId]);

  const handleDirectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parentKey, childKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: { ...prev[parentKey], [childKey]: value },
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveAllSteps = async () => {
    let currentId = shipmentId || editId; // fall back to the prop directly, just in case

    if (!currentId) {
      // Edit mode me shipmentId missing hona ek bug hai -
      // isse duplicate/naya shipment ban jaata, isliye yahan explicitly rok rahe hain.
      if (isEdit) {
        throw new Error(
          "Shipment ID nahi mila edit mode me. Page reload karke dobara Edit try karein."
        );
      }

      // Sirf tabhi naya shipment banega jab genuinely "+ Shipment" se aaya ho
      const step1Res = await createShipment({
        shipmentType: formData.shipmentType,
        shipmentMode: formData.shipmentMode,
        shipmentPurpose: formData.shipmentPurpose,
        customerType: formData.customerType,
        exporter: formData.exporter,
      });

      const resData = step1Res.data?.data || step1Res.data;
      currentId = resData._id;
      setShipmentId(currentId);
      if (resData.referenceNumber) {
        setReferenceNumber(resData.referenceNumber);
      }
    }

    await updateShipmentStep2(currentId, {
      route: formData.route,
      importer: formData.importer,
      eta: formData.eta,
      etd: formData.etd,
      incoterm: formData.incoterm,
    });

    // Clean cargo before sending: an empty hsCode ("") crashes Mongoose
    // with "Cast to ObjectId failed" - only include it when it has a value.
    const { hsCode, ...restCargo } = formData.cargo;
    const cleanCargo = {
      ...restCargo,
      ...(hsCode ? { hsCode } : {}),
    };

    await updateShipmentStep3(currentId, {
      cargo: cleanCargo,
      amount: formData.amount,
      paymentTerms: formData.paymentTerms,
      insuranceRequired: formData.insuranceRequired,
      currency: formData.currency,
      additionalInformation: formData.additionalInformation,
    });

    return currentId;
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      const id = await saveAllSteps();
      await saveDraft(id);
      setCurrentStatus("Draft");
      alert(isEdit ? "Shipment updated successfully!" : "Draft saved successfully!");

      // Go back to the dashboard list so the updated/new shipment is visible
      setShipment("");
      setActiveTab(currentTab);
    } catch (err) {
      console.error("Save Draft Error:", err);
      alert(err.response?.data?.message || err.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const id = await saveAllSteps();
      const res = await analyzeShipment(id);
      const data = res.data?.data || res.data;
      setAnalysis(data);
      setCurrentStatus("AI Analyzed");
      alert("Shipment analyzed successfully!");
      // Intentionally stay on the form so the user can see the AI Output section.
    } catch (err) {
      console.error("Analyze Error:", err);
      alert(err.response?.data?.message || err.message || "Failed to analyze shipment.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const id = await saveAllSteps();
      await submitShipment(id);
      setCurrentStatus("Submitted");
      alert("Shipment submitted to admin successfully!");

      setShipment("");
      setActiveTab(currentTab);
    } catch (err) {
      console.error("Submit Error:", err);
      alert(err.response?.data?.message || err.message || "Failed to submit shipment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (documentName, file) => {
    try {
      const id = await saveAllSteps();

      const form = new FormData();
      form.append("shipmentId", id);
      form.append("documentType", documentName);
      form.append("required", true);
      form.append("file", file);

      const res = await uploadShipmentDocument(form);

      setUploadedDocs((prev) => ({
        ...prev,
        [documentName]: res.data.data,
      }));

      alert("Uploaded Successfully");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.message || "Upload Failed");
    }
  };

  if (prefillLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Loading shipment for editing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1440px] mx-auto">
        <Header
          setActiveTab={setActiveTab}
          setShipment={setShipment}
          handleSaveDraft={handleSaveDraft}
          handleAnalyze={handleAnalyze}
          handleSubmit={handleSubmit}
          loading={loading}
          currentTab={currentTab}
          isEdit={isEdit}
        />

        <div className="mt-7 grid grid-cols-1  gap-5 items-start">
          <div className="xl:col-span-9 grid grid-cols-1 xl:grid-cols-9 gap-5 items-start">
            <div className="xl:col-span-3">
              <BasicShipmentDetails
                formData={formData}
                handleDirectChange={handleDirectChange}
                handleNestedChange={handleNestedChange}
                referenceNumber={referenceNumber}
              />
            </div>

            <div className="xl:col-span-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <OriginDestination formData={formData} handleDirectChange={handleDirectChange} handleNestedChange={handleNestedChange} />
                <InvoiceValue formData={formData} handleDirectChange={handleDirectChange} handleRadioChange={handleRadioChange} />
              </div>
            </div>

            <div className="xl:col-span-9">
              <ProductDetails formData={formData} handleNestedChange={handleNestedChange} handleRadioChange={handleRadioChange} hsCodes={hsCodes} />
            </div>
          </div>

         
        </div>
         <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mt-4">
            {/* <QuickTipsCard /> */}
             
            <DocumentsUpload uploadedDocs={uploadedDocs} handleDocumentUpload={handleDocumentUpload} fileInputRef={fileInputRef} />
             
             <AIOutputAnalysis analysis={analysis} />
          </div>

        <Footer />
      </div>
    </div>
  );
}