import React, { useState, useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import Swal from "sweetalert2";
import {
  Search,
  Globe,
  Anchor,
  Building2,
  RotateCcw,
  Plus,
  Upload,
  LayoutGrid,
  Eye,
  Edit2,
  X,
  Check,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UploadCloud,
  Info,
  FileText
} from "lucide-react";

// ISO Country Code mapping for flag rendering
const countryCodes = {
  India: "IN",
  China: "CN",
  Germany: "DE",
  USA: "US",
  "United States": "US",
  UAE: "AE",
  "Saudi Arabia": "SA",
  Switzerland: "CH",
  Bangladesh: "BD",
  Brazil: "BR",
  Russia: "RU",
  Japan: "JP",
  France: "FR",
  Singapore: "SG",
  Australia: "AU",
  "South Korea": "KR",
  Sweden: "SE",
  Belgium: "BE",
  "United Kingdom": "GB",
  UK: "GB",
  Italy: "IT",
  Netherlands: "NL",
  Vietnam: "VN",
  Malaysia: "MY",
  Thailand: "TH",
  Canada: "CA",
};

// Initial realistic dataset matching the exact screenshot records
const initialShipmentRecords = [
  {
    _id: "SHIP001",
    hsCode: "84713010",
    description: "Dell Latitude Business Laptop",
    importer: "TechNova India Pvt Ltd",
    exporter: "Dell Technologies USA",
    originCountry: "United States",
    destinationCountry: "India",
    portOfLoading: "New York",
    portOfDischarge: "Mumbai",
    shipDate: "2026-08-05",
    arrivalDate: "2026-08-20",
    value: 24500000,
    status: "Delivered",
  },
  {
    _id: "SHIP002",
    hsCode: "85171300",
    description: "Smartphone Devices",
    importer: "Reliance Digital India",
    exporter: "Samsung Electronics",
    originCountry: "South Korea",
    destinationCountry: "India",
    portOfLoading: "Busan",
    portOfDischarge: "Chennai",
    shipDate: "2026-08-10",
    arrivalDate: "2026-08-27",
    value: 18200000,
    status: "In Transit",
  },
  {
    _id: "SHIP003",
    hsCode: "87032300",
    description: "Passenger Motor Vehicles",
    importer: "Tata Motors Limited",
    exporter: "Toyota Motor Corporation",
    originCountry: "Japan",
    destinationCountry: "India",
    portOfLoading: "Yokohama",
    portOfDischarge: "Mumbai",
    shipDate: "2026-07-28",
    arrivalDate: "2026-08-25",
    value: 68500000,
    status: "In Transit",
  },
  {
    _id: "SHIP004",
    hsCode: "85044090",
    description: "Industrial Power Transformer",
    importer: "Adani Power Limited",
    exporter: "Siemens Germany",
    originCountry: "Germany",
    destinationCountry: "India",
    portOfLoading: "Hamburg",
    portOfDischarge: "Mundra",
    shipDate: "2026-08-01",
    arrivalDate: "2026-08-18",
    value: 32600000,
    status: "Delivered",
  },
  {
    _id: "SHIP005",
    hsCode: "30049099",
    description: "Medicines and Pharmaceuticals",
    importer: "Sun Pharma Industries",
    exporter: "Pfizer Inc.",
    originCountry: "United States",
    destinationCountry: "India",
    portOfLoading: "Los Angeles",
    portOfDischarge: "Nhava Sheva",
    shipDate: "2026-08-12",
    arrivalDate: "2026-08-30",
    value: 12800000,
    status: "In Transit",
  },
  {
    _id: "SHIP006",
    hsCode: "94036000",
    description: "Premium Wooden Office Furniture",
    importer: "Urban Living India",
    exporter: "IKEA Sweden",
    originCountry: "Sweden",
    destinationCountry: "India",
    portOfLoading: "Gothenburg",
    portOfDischarge: "Chennai",
    shipDate: "2026-08-08",
    arrivalDate: "2026-08-29",
    value: 7600000,
    status: "Pending",
  },
  {
    _id: "SHIP007",
    hsCode: "85423100",
    description: "Electronic Integrated Circuits",
    importer: "Wipro Technologies",
    exporter: "Intel Corporation",
    originCountry: "United States",
    destinationCountry: "India",
    portOfLoading: "San Francisco",
    portOfDischarge: "Mumbai",
    shipDate: "2026-07-30",
    arrivalDate: "2026-08-22",
    value: 41500000,
    status: "Delivered",
  },
  {
    _id: "SHIP008",
    hsCode: "62034200",
    description: "Men's Cotton Apparel",
    importer: "Reliance Retail",
    exporter: "H&M Sweden",
    originCountry: "Sweden",
    destinationCountry: "India",
    portOfLoading: "Stockholm",
    portOfDischarge: "Nhava Sheva",
    shipDate: "2026-08-03",
    arrivalDate: "2026-08-21",
    value: 9400000,
    status: "In Transit",
  },
  {
    _id: "SHIP009",
    hsCode: "10063020",
    description: "Basmati Rice Export Consignment",
    importer: "Al Maya Group UAE",
    exporter: "KRBL Limited India",
    originCountry: "India",
    destinationCountry: "UAE",
    portOfLoading: "Kandla",
    portOfDischarge: "Jebel Ali",
    shipDate: "2026-08-14",
    arrivalDate: "2026-08-24",
    value: 15600000,
    status: "Delivered",
  },
  {
    _id: "SHIP010",
    hsCode: "84148090",
    description: "Industrial Rotary Air Compressors",
    importer: "L&T Heavy Engineering",
    exporter: "Atlas Copco Belgium",
    originCountry: "Belgium",
    destinationCountry: "India",
    portOfLoading: "Antwerp",
    portOfDischarge: "Chennai",
    shipDate: "2026-07-25",
    arrivalDate: "2026-08-19",
    value: 28900000,
    status: "In Transit",
  },
];

// Available columns for toggle
const allColumns = [
  { key: "hsCode", label: "HS CODE" },
  { key: "description", label: "PRODUCT DESCRIPTION" },
  { key: "importer", label: "IMPORTER" },
  { key: "exporter", label: "EXPORTER" },
  { key: "originCountry", label: "ORIGIN" },
  { key: "destinationCountry", label: "DESTINATION" },
  { key: "portOfLoading", label: "PORT OF LOADING" },
  { key: "portOfDischarge", label: "PORT OF DISCHARGE" },
  { key: "shipDate", label: "SHIP DATE" },
  { key: "arrivalDate", label: "ARRIVAL DATE" },
  { key: "value", label: "VALUE (INR)" },
  { key: "actions", label: "ACTIONS" },
];

export default function MasterData() {
  const [records, setRecords] = useState(initialShipmentRecords);

  // Filter form states
  const [filterInputs, setFilterInputs] = useState({
    search: "",
    originCountry: "All Countries",
    destinationCountry: "All Countries",
    importer: "All Importers",
    exporter: "All Exporters",
    portOfLoading: "All Ports",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    originCountry: "All Countries",
    destinationCountry: "All Countries",
    importer: "All Importers",
    exporter: "All Exporters",
    portOfLoading: "All Ports",
  });

  // Table controls (Default 6 records to match screenshot exactly)
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );
  const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [viewingRecord, setViewingRecord] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);

  // Form State for "Add New Record" / "Edit Record"
  const [recordForm, setRecordForm] = useState({
    hsCode: "",
    description: "",
    importer: "",
    exporter: "",
    originCountry: "",
    destinationCountry: "",
    portOfLoading: "",
    portOfDischarge: "",
    shipDate: "",
    arrivalDate: "",
    value: "",
    status: "In Transit",
  });

  // Bulk Upload state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Format Value in INR matching screenshot (e.g. ₹ 2.45 Cr, ₹ 1.82 Cr)
  const formatValueINR = (val) => {
    if (typeof val === "string" && val.includes("₹")) return val;
    const num = Number(val);
    if (isNaN(num)) return val ? `₹ ${val}` : "₹ 0.00";
    if (num >= 10000000) {
      return `₹ ${(num / 10000000).toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      return `₹ ${(num / 100000).toFixed(2)} L`;
    }
    return `₹ ${num.toLocaleString("en-IN")}`;
  };

  // Format Date matching screenshot (e.g. 05 Aug 2026)
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${day} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Unique options for filter dropdowns
  const uniqueOrigins = useMemo(() => {
    const list = Array.from(new Set(records.map((r) => r.originCountry).filter(Boolean)));
    return ["All Countries", ...list.sort()];
  }, [records]);

  const uniqueDests = useMemo(() => {
    const list = Array.from(new Set(records.map((r) => r.destinationCountry).filter(Boolean)));
    return ["All Countries", ...list.sort()];
  }, [records]);

  const uniqueImporters = useMemo(() => {
    const list = Array.from(new Set(records.map((r) => r.importer).filter(Boolean)));
    return ["All Importers", ...list.sort()];
  }, [records]);

  const uniqueExporters = useMemo(() => {
    const list = Array.from(new Set(records.map((r) => r.exporter).filter(Boolean)));
    return ["All Exporters", ...list.sort()];
  }, [records]);

  const uniquePorts = useMemo(() => {
    const list = Array.from(new Set(records.map((r) => r.portOfLoading).filter(Boolean)));
    return ["All Ports", ...list.sort()];
  }, [records]);

  // Apply filters
  const handleApplyFilters = () => {
    setAppliedFilters({ ...filterInputs });
    setCurrentPage(1);
  };

  // Reset filters
  const handleResetFilters = () => {
    const reset = {
      search: "",
      originCountry: "All Countries",
      destinationCountry: "All Countries",
      importer: "All Importers",
      exporter: "All Exporters",
      portOfLoading: "All Ports",
    };
    setFilterInputs(reset);
    setAppliedFilters(reset);
    setCurrentPage(1);
  };

  // Filter records based on appliedFilters
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (appliedFilters.search.trim()) {
        const q = appliedFilters.search.toLowerCase();
        const matchHs = (r.hsCode || "").toLowerCase().includes(q);
        const matchDesc = (r.description || "").toLowerCase().includes(q);
        const matchId = (r._id || "").toLowerCase().includes(q);
        if (!matchHs && !matchDesc && !matchId) return false;
      }
      if (
        appliedFilters.originCountry !== "All Countries" &&
        r.originCountry !== appliedFilters.originCountry
      ) {
        return false;
      }
      if (
        appliedFilters.destinationCountry !== "All Countries" &&
        r.destinationCountry !== appliedFilters.destinationCountry
      ) {
        return false;
      }
      if (
        appliedFilters.importer !== "All Importers" &&
        r.importer !== appliedFilters.importer
      ) {
        return false;
      }
      if (
        appliedFilters.exporter !== "All Exporters" &&
        r.exporter !== appliedFilters.exporter
      ) {
        return false;
      }
      if (
        appliedFilters.portOfLoading !== "All Ports" &&
        r.portOfLoading !== appliedFilters.portOfLoading
      ) {
        return false;
      }
      return true;
    });
  }, [records, appliedFilters]);

  // Pagination calculation
  const totalRecords = filteredRecords.length;
  const totalPages = Math.ceil(totalRecords / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + pageSize);

  // Column visibility toggle
  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Open Add Record Modal
  const handleOpenAddModal = () => {
    setEditingRecord(null);
    setRecordForm({
      hsCode: "",
      description: "",
      importer: "",
      exporter: "",
      originCountry: "",
      destinationCountry: "",
      portOfLoading: "",
      portOfDischarge: "",
      shipDate: "",
      arrivalDate: "",
      value: "",
      status: "In Transit",
    });
    setShowAddModal(true);
  };

  // Open Edit Modal
  const handleEditClick = (rec) => {
    setEditingRecord(rec);
    setRecordForm({
      hsCode: rec.hsCode || "",
      description: rec.description || "",
      importer: rec.importer || "",
      exporter: rec.exporter || "",
      originCountry: rec.originCountry || "",
      destinationCountry: rec.destinationCountry || "",
      portOfLoading: rec.portOfLoading || "",
      portOfDischarge: rec.portOfDischarge || "",
      shipDate: rec.shipDate || "",
      arrivalDate: rec.arrivalDate || "",
      value: rec.value || "",
      status: rec.status || "In Transit",
    });
    setShowAddModal(true);
  };

  // Save Record (Add or Update)
  const handleSaveRecord = (e) => {
    e.preventDefault();
    if (!recordForm.hsCode.trim() || !recordForm.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields",
        text: "Please provide both HS Code and Product Description.",
      });
      return;
    }

    if (editingRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r._id === editingRecord._id
            ? { ...r, ...recordForm, value: Number(recordForm.value) || recordForm.value }
            : r
        )
      );
      Swal.fire({
        icon: "success",
        title: "Record Updated",
        text: "The master data record has been successfully updated.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const newId = `SHIP${String(records.length + 1).padStart(3, "0")}`;
      const newRec = {
        _id: newId,
        ...recordForm,
        value: Number(recordForm.value) || recordForm.value,
      };
      setRecords((prev) => [newRec, ...prev]);
      Swal.fire({
        icon: "success",
        title: "Record Added",
        text: "The new master data record has been successfully saved.",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    setShowAddModal(false);
    setEditingRecord(null);
  };

  // Download CSV Template
  const handleDownloadTemplate = () => {
    const headers = [
      "hsCode",
      "description",
      "importer",
      "exporter",
      "originCountry",
      "destinationCountry",
      "portOfLoading",
      "portOfDischarge",
      "shipDate",
      "arrivalDate",
      "value",
      "status"
    ];
    const sampleRow = [
      "84713010",
      "Dell Latitude Business Laptop",
      "TechNova India Pvt Ltd",
      "Dell Technologies USA",
      "United States",
      "India",
      "New York",
      "Mumbai",
      "2026-08-05",
      "2026-08-20",
      "24500000",
      "Delivered"
    ];
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), sampleRow.join(",")].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "master_data_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV Validation & Import
  const handleValidateCSV = () => {
    if (!uploadedFile) {
      Swal.fire({
        icon: "warning",
        title: "No File Selected",
        text: "Please select or drop a CSV file to validate.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split(/\r\n|\n/).filter((line) => line.trim() !== "");
        if (lines.length <= 1) {
          Swal.fire({
            icon: "warning",
            title: "Empty CSV",
            text: "The CSV file does not contain any data rows.",
          });
          return;
        }

        const newRecords = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
          if (cols.length >= 2) {
            newRecords.push({
              _id: `CSV-${Date.now()}-${i}`,
              hsCode: cols[0] || "84713010",
              description: cols[1] || "Imported Product",
              importer: cols[2] || "Sample Importer",
              exporter: cols[3] || "Sample Exporter",
              originCountry: cols[4] || "United States",
              destinationCountry: cols[5] || "India",
              portOfLoading: cols[6] || "New York",
              portOfDischarge: cols[7] || "Mumbai",
              shipDate: cols[8] || new Date().toISOString().split("T")[0],
              arrivalDate: cols[9] || new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
              value: Number(cols[10]) || 15000000,
              status: cols[11] || "Delivered",
            });
          }
        }

        setRecords((prev) => [...newRecords, ...prev]);
        setUploadedFile(null);
        setShowBulkModal(false);

        Swal.fire({
          icon: "success",
          title: "Import Successful",
          text: `Successfully validated and imported ${newRecords.length} records.`,
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "CSV Parse Error",
          text: "Failed to parse the CSV file. Please make sure it follows the template format.",
        });
      }
    };
    reader.readAsText(uploadedFile);
  };

  return (
    <div className="w-full max-w-full space-y-2 text-slate-800">
      {/* 1. Header with Title and Top Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-tight">
            Master Data
          </h1>
          <p className="text-[11px] text-gray-500">
            Manage import, export and shipment records.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Add New Button */}
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 bg-[#00897B] hover:bg-[#00796B] text-white text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New</span>
          </button>

          {/* Bulk Upload CSV Button */}
          <button
            onClick={() => {
              setUploadedFile(null);
              setShowBulkModal(true);
            }}
            className="flex items-center gap-1.5 border border-[#00897B] text-[#00897B] hover:bg-teal-50/70 bg-white text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <Upload size={15} />
            <span>Bulk Upload CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Top Filter Bar Card (Compact Single-Row Design) */}
      <div className="bg-white rounded-xl border border-gray-200/90 p-2 shadow-xs w-full overflow-hidden">
        <div className="flex flex-wrap xl:flex-nowrap items-end gap-2 w-full">
          {/* HS Code / Product / ID */}
          <div className="flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
              HS Code / Product / ID
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={filterInputs.search}
                onChange={(e) =>
                  setFilterInputs({ ...filterInputs, search: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApplyFilters();
                }}
                placeholder="Search HS code, product or ID..."
                className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-8 pr-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B]"
              />
            </div>
          </div>

          {/* Origin Country */}
          <div className="w-[110px] sm:w-[120px]">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
              Origin Country
            </label>
            <div className="relative">
              <Globe className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={filterInputs.originCountry}
                onChange={(e) =>
                  setFilterInputs({ ...filterInputs, originCountry: e.target.value })
                }
                className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
              >
                {uniqueOrigins.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Destination */}
          <div className="w-[110px] sm:w-[120px]">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
              Destination
            </label>
            <div className="relative">
              <Globe className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={filterInputs.destinationCountry}
                onChange={(e) =>
                  setFilterInputs({ ...filterInputs, destinationCountry: e.target.value })
                }
                className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
              >
                {uniqueDests.map((dest, i) => (
                  <option key={i} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Importer */}
          <div className="w-[110px] sm:w-[120px]">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
              Importer
            </label>
            <div className="relative">
              <Building2 className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={filterInputs.importer}
                onChange={(e) =>
                  setFilterInputs({ ...filterInputs, importer: e.target.value })
                }
                className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
              >
                {uniqueImporters.map((imp, i) => (
                  <option key={i} value={imp}>
                    {imp}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Exporter */}
          <div className="w-[110px] sm:w-[120px]">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
              Exporter
            </label>
            <div className="relative">
              <Building2 className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={filterInputs.exporter}
                onChange={(e) =>
                  setFilterInputs({ ...filterInputs, exporter: e.target.value })
                }
                className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
              >
                {uniqueExporters.map((exp, i) => (
                  <option key={i} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Port of Loading */}
          <div className="w-[110px] sm:w-[120px]">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
              Port of Loading
            </label>
            <div className="relative">
              <Anchor className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={filterInputs.portOfLoading}
                onChange={(e) =>
                  setFilterInputs({ ...filterInputs, portOfLoading: e.target.value })
                }
                className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
              >
                {uniquePorts.map((port, i) => (
                  <option key={i} value={port}>
                    {port}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Buttons: Apply & Reset */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleApplyFilters}
              className="h-[30px] px-3.5 bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center whitespace-nowrap"
            >
              Apply Filters
            </button>
            <button
              onClick={handleResetFilters}
              className="h-[30px] px-3 border border-[#00897B] text-[#00897B] hover:bg-teal-50/60 bg-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Controls Bar: Records selector & Columns toggle */}
      <div className="flex items-center justify-between">
        {/* Records Dropdown */}
        <div className="relative inline-block">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg px-2.5 py-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none shadow-xs cursor-pointer"
          >
            <option value={6}>6 records</option>
            <option value={10}>10 records</option>
            <option value={20}>20 records</option>
            <option value={50}>50 records</option>
          </select>
          <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* Columns Toggle Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowColumnsDropdown((prev) => !prev)}
            className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-medium rounded-lg px-2.5 py-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <LayoutGrid size={13} className="text-gray-500" />
            <span>Columns</span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>

          {showColumnsDropdown && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowColumnsDropdown(false)}
              />
              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-30 space-y-0.5">
                <p className="text-[10px] font-bold text-gray-400 px-2 py-1 uppercase tracking-wider">
                  Toggle Columns
                </p>
                {allColumns.map((col) => (
                  <label
                    key={col.key}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded-lg text-xs text-gray-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns[col.key]}
                      onChange={() => toggleColumn(col.key)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>{col.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. Trade Records Table Card */}
      <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs w-full overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                {visibleColumns.hsCode && <th className="py-1.5 px-2.5 whitespace-nowrap">HS CODE</th>}
                {visibleColumns.description && <th className="py-1.5 px-2.5 whitespace-nowrap min-w-[170px]">PRODUCT DESCRIPTION</th>}
                {visibleColumns.importer && <th className="py-1.5 px-2.5 whitespace-nowrap">IMPORTER</th>}
                {visibleColumns.exporter && <th className="py-1.5 px-2.5 whitespace-nowrap">EXPORTER</th>}
                {visibleColumns.originCountry && <th className="py-1.5 px-2.5 whitespace-nowrap">ORIGIN</th>}
                {visibleColumns.destinationCountry && <th className="py-1.5 px-2.5 whitespace-nowrap">DESTINATION</th>}
                {visibleColumns.portOfLoading && <th className="py-1.5 px-2.5 whitespace-nowrap">PORT OF LOADING</th>}
                {visibleColumns.portOfDischarge && <th className="py-1.5 px-2.5 whitespace-nowrap">PORT OF DISCHARGE</th>}
                {visibleColumns.shipDate && <th className="py-1.5 px-2.5 whitespace-nowrap">SHIP DATE</th>}
                {visibleColumns.arrivalDate && <th className="py-1.5 px-2.5 whitespace-nowrap">ARRIVAL DATE</th>}
                {visibleColumns.value && <th className="py-1.5 px-2.5 whitespace-nowrap font-bold text-gray-800">VALUE (INR)</th>}
                {visibleColumns.actions && <th className="py-1.5 px-2.5 text-center whitespace-nowrap">ACTIONS</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedRecords.map((row) => (
                <tr
                  key={row._id}
                  className="hover:bg-teal-50/20 transition-colors text-gray-700"
                >
                  {/* HS Code */}
                  {visibleColumns.hsCode && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap font-medium text-gray-900">
                      {row.hsCode}
                    </td>
                  )}

                  {/* Product Description */}
                  {visibleColumns.description && (
                    <td className="py-1.5 px-2.5 font-medium text-gray-800 max-w-[200px] truncate">
                      {row.description}
                    </td>
                  )}

                  {/* Importer */}
                  {visibleColumns.importer && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600 max-w-[140px] truncate">
                      {row.importer}
                    </td>
                  )}

                  {/* Exporter */}
                  {visibleColumns.exporter && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600 max-w-[140px] truncate">
                      {row.exporter}
                    </td>
                  )}

                  {/* Origin with Flag */}
                  {visibleColumns.originCountry && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap">
                      <span className="mr-1.5 inline-flex align-middle shadow-xs rounded-xs">
                        <ReactCountryFlag
                          countryCode={countryCodes[row.originCountry] || ""}
                          svg
                          style={{ width: "16px", height: "12px" }}
                        />
                      </span>
                      <span className="text-gray-700 font-medium align-middle">
                        {row.originCountry}
                      </span>
                    </td>
                  )}

                  {/* Destination with Flag */}
                  {visibleColumns.destinationCountry && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap">
                      <span className="mr-1.5 inline-flex align-middle shadow-xs rounded-xs">
                        <ReactCountryFlag
                          countryCode={countryCodes[row.destinationCountry] || ""}
                          svg
                          style={{ width: "16px", height: "12px" }}
                        />
                      </span>
                      <span className="text-gray-700 font-medium align-middle">
                        {row.destinationCountry}
                      </span>
                    </td>
                  )}

                  {/* Port of Loading */}
                  {visibleColumns.portOfLoading && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600">
                      {row.portOfLoading}
                    </td>
                  )}

                  {/* Port of Discharge */}
                  {visibleColumns.portOfDischarge && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600">
                      {row.portOfDischarge}
                    </td>
                  )}

                  {/* Ship Date */}
                  {visibleColumns.shipDate && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600">
                      {formatDate(row.shipDate)}
                    </td>
                  )}

                  {/* Arrival Date */}
                  {visibleColumns.arrivalDate && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600">
                      {formatDate(row.arrivalDate)}
                    </td>
                  )}

                  {/* Value (INR) */}
                  {visibleColumns.value && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap font-bold text-gray-900">
                      {formatValueINR(row.value)}
                    </td>
                  )}

                  {/* Actions (Eye & Pencil) */}
                  {visibleColumns.actions && (
                    <td className="py-1.5 px-2.5 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setViewingRecord(row)}
                          className="p-1 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => handleEditClick(row)}
                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                          title="Edit Record"
                        >
                          <Edit2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="py-2 px-3 border-t border-gray-100 flex items-center justify-between gap-3 bg-white pr-20 sm:pr-24">
          <p className="text-xs text-gray-500">
            Showing {totalRecords === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + pageSize, totalRecords)} of {totalRecords} records
          </p>

          <div className="flex items-center gap-1.5">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-6 h-6 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs"
            >
              &lt;
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-6 h-6 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#00897B] text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 h-7 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-0.5"
            >
              <span>Next</span>
              <span>&gt;</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. ADD / EDIT RECORD MODAL (Popup - No Scrolling Down!) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">
                {editingRecord ? `Edit Record (${editingRecord._id})` : "Add New Record"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingRecord(null);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveRecord} className="p-5 overflow-y-auto space-y-3.5">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    HS Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recordForm.hsCode}
                    onChange={(e) => setRecordForm({ ...recordForm, hsCode: e.target.value })}
                    placeholder="Enter HS code"
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Product Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recordForm.description}
                    onChange={(e) => setRecordForm({ ...recordForm, description: e.target.value })}
                    placeholder="Enter product description"
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Importer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recordForm.importer}
                    onChange={(e) => setRecordForm({ ...recordForm, importer: e.target.value })}
                    placeholder="Select or enter importer"
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Exporter <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recordForm.exporter}
                    onChange={(e) => setRecordForm({ ...recordForm, exporter: e.target.value })}
                    placeholder="Select or enter exporter"
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Origin Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={recordForm.originCountry}
                    onChange={(e) => setRecordForm({ ...recordForm, originCountry: e.target.value })}
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
                  >
                    <option value="">Select origin country</option>
                    {Object.keys(countryCodes).map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Destination Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={recordForm.destinationCountry}
                    onChange={(e) => setRecordForm({ ...recordForm, destinationCountry: e.target.value })}
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
                  >
                    <option value="">Select destination country</option>
                    {Object.keys(countryCodes).map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Port of Loading <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recordForm.portOfLoading}
                    onChange={(e) => setRecordForm({ ...recordForm, portOfLoading: e.target.value })}
                    placeholder="Select or enter port of loading"
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Port of Discharge <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={recordForm.portOfDischarge}
                    onChange={(e) => setRecordForm({ ...recordForm, portOfDischarge: e.target.value })}
                    placeholder="Select or enter port of discharge"
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Ship Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={recordForm.shipDate}
                    onChange={(e) => setRecordForm({ ...recordForm, shipDate: e.target.value })}
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Arrival Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={recordForm.arrivalDate}
                    onChange={(e) => setRecordForm({ ...recordForm, arrivalDate: e.target.value })}
                    className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Value (INR) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">₹</span>
                    <input
                      type="number"
                      required
                      value={recordForm.value}
                      onChange={(e) => setRecordForm({ ...recordForm, value: e.target.value })}
                      placeholder="Enter value"
                      className="w-full h-[36px] text-xs pl-6 pr-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingRecord(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#00897B] hover:bg-[#00796B] rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. BULK UPLOAD CSV MODAL (Popup - No Scrolling Down!) */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Bulk Upload CSV</h3>
                <p className="text-xs text-gray-500 mt-0.5">Import multiple trade records at once.</p>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00897B] hover:text-[#00796B] transition-colors whitespace-nowrap cursor-pointer"
                  title="Download sample CSV template"
                >
                  <Download size={14} className="shrink-0" />
                  <span>Download CSV Template</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setUploadedFile(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => document.getElementById("csv-modal-input").click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                  isDragging
                    ? "border-[#00897B] bg-teal-50/50"
                    : "border-[#80cbc4] hover:border-[#00897B] bg-[#e0f2f1]/25 hover:bg-[#e0f2f1]/40"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-teal-100/70 text-[#00897B] flex items-center justify-center mb-2.5">
                  <UploadCloud size={28} />
                </div>
                <p className="text-xs font-bold text-gray-800">
                  {uploadedFile ? uploadedFile.name : "Drag & drop your CSV file here"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  or <span className="text-[#00897B] font-semibold underline">browse files</span>
                </p>
                <span className="text-[10px] text-gray-400 mt-1.5">
                  .csv files only
                </span>
                <input
                  id="csv-modal-input"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFile(e.target.files[0]);
                    }
                  }}
                />
              </div>

              {/* Informational Alert Box */}
              <div className="bg-[#e1f5fe]/80 border border-[#b3e5fc] rounded-xl p-3 flex items-center gap-2.5 text-[#0288d1] text-xs">
                <Info size={16} className="shrink-0 text-[#0288d1]" />
                <span>Match the template columns before uploading.</span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleValidateCSV}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#00897B] hover:bg-[#00796B] rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                Validate & Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. VIEW RECORD DETAILS MODAL */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Shipment Details</h3>
                <p className="text-xs text-gray-400">{viewingRecord._id}</p>
              </div>
              <button
                onClick={() => setViewingRecord(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-3.5 text-xs">
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">HS Code:</span>
                  <span className="font-bold text-gray-900">{viewingRecord.hsCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Product:</span>
                  <span className="font-semibold text-gray-800 text-right max-w-[240px]">{viewingRecord.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-500">Value (INR):</span>
                  <span className="font-bold text-emerald-700">{formatValueINR(viewingRecord.value)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-100 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Importer</p>
                  <p className="font-semibold text-gray-800">{viewingRecord.importer}</p>
                  <p className="text-[11px] text-gray-500 mt-1">{viewingRecord.destinationCountry}</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Exporter</p>
                  <p className="font-semibold text-gray-800">{viewingRecord.exporter}</p>
                  <p className="text-[11px] text-gray-500 mt-1">{viewingRecord.originCountry}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-100 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Port of Loading</p>
                  <p className="font-semibold text-gray-800">{viewingRecord.portOfLoading}</p>
                  <p className="text-[11px] text-gray-500 mt-1">Ship Date: {formatDate(viewingRecord.shipDate)}</p>
                </div>
                <div className="border border-gray-100 rounded-xl p-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Port of Discharge</p>
                  <p className="font-semibold text-gray-800">{viewingRecord.portOfDischarge}</p>
                  <p className="text-[11px] text-gray-500 mt-1">Arrival Date: {formatDate(viewingRecord.arrivalDate)}</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setViewingRecord(null)}
                className="px-5 py-1.5 text-xs font-semibold text-white bg-[#00897B] hover:bg-[#00796B] rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
