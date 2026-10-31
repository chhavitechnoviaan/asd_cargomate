import React, { useState, useMemo, useEffect } from "react";
import {
  getDashboard,
  getFilterOptions,
  getShipments,
  exportReport
} from '../../api/ShipmentDatabaseApi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportReport from "../../components/b2bComponent/ExportReport";
import {
  Calendar,  CalendarDays,
  ChevronDown,
  List,
  Clock,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  HelpCircle,
  Columns,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  FileSpreadsheet,
  LayoutGrid,
  Download
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
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
};
const HEADING = "text-[#07156B]";

export default function ShipmentDatabase() {
  // Static Raw Data
  /*const rawShipmentsData = [
    {
      id: "SHP-2025-1045",
      hs: "85",
      desc: "Electrical Machinery & Equipment",
      importer: "ABCImports Pvt. Ltd.",
      exporter: "Global Exports Inc.",
      origin: "China",
      originCode: "CN",
      dest: "India",
      destCode: "IN",
      loading: "Shenzhen",
      discharge: "Nhava Sheva",
      shipDate: "24 Apr 2025",
      arrDate: "28 Apr 2025",
      value: 45.6,
      status: "Delivered",
    },
    {
      id: "SHP-2025-1044",
      hs: "84",
      desc: "Machinery & Mechanical Appliances",
      importer: "Global Retail Ltd.",
      exporter: "Techno Trade Co.",
      origin: "Germany",
      originCode: "DE",
      dest: "UAE",
      destCode: "AE",
      loading: "Hamburg",
      discharge: "Jebel Ali",
      shipDate: "23 Apr 2025",
      arrDate: "27 Apr 2025",
      value: 38.75,
      status: "Delivered",
    },
    {
      id: "SHP-2025-1043",
      hs: "90",
      desc: "Optical, Medical & Precision Instruments",
      importer: "Medilink Pvt. Ltd.",
      exporter: "Opto Instruments GmbH",
      origin: "USA",
      originCode: "US",
      dest: "India",
      destCode: "IN",
      loading: "Los Angeles",
      discharge: "Mumbai (JNPT)",
      shipDate: "22 Apr 2025",
      arrDate: "26 Apr 2025",
      value: 28.3,
      status: "In Transit",
    },
    {
      id: "SHP-2025-1042",
      hs: "39",
      desc: "Plastics & Articles",
      importer: "Prime Industries",
      exporter: "Polymer Exports Ltd.",
      origin: "UAE",
      originCode: "AE",
      dest: "India",
      destCode: "IN",
      loading: "Jebel Ali",
      discharge: "Nhava Sheva",
      shipDate: "21 Apr 2025",
      arrDate: "24 Apr 2025",
      value: 18.9,
      status: "In Transit",
    },
    {
      id: "SHP-2025-1041",
      hs: "72",
      desc: "Iron & Steel",
      importer: "Shree Steel Pvt.Ltd.",
      exporter: "Euro Steel AG",
      origin: "Russia",
      originCode: "RU",
      dest: "India",
      destCode: "IN",
      loading: "Novorossiysk",
      discharge: "Kandla",
      shipDate: "20 Apr 2025",
      arrDate: "25 Apr 2025",
      value: 16.2,
      status: "Pending",
    },
    {
      id: "SHP-2025-1040",
      hs: "27",
      desc: "Mineral Fuels & Oils",
      importer: "Energy India Ltd.",
      exporter: "Gulf Petroleum LLC",
      origin: "Saudi Arabia",
      originCode: "SA",
      dest: "India",
      destCode: "IN",
      loading: "Dammam",
      discharge: "Tuticorin",
      shipDate: "19 Apr 2025",
      arrDate: "22 Apr 2025",
      value: 12.45,
      status: "Delivered",
    },
    {
      id: "SHP-2025-1039",
      hs: "30",
      desc: "Pharmaceutical Products",
      importer: "HealthCare Pvt. Ltd.",
      exporter: "Pharma Global",
      origin: "Switzerland",
      originCode: "CH",
      dest: "India",
      destCode: "IN",
      loading: "Basel",
      discharge: "Mumbai (JNPT)",
      shipDate: "18 Apr 2025",
      arrDate: "21 Apr 2025",
      value: 11.3,
      status: "Delivered",
    },
    {
      id: "SHP-2025-1038",
      hs: "73",
      desc: "Articles of Iron or Steel",
      importer: "Metalix India Corp.",
      exporter: "Metal Trade Corp.",
      origin: "China",
      originCode: "CN",
      dest: "India",
      destCode: "IN",
      loading: "Tianjin",
      discharge: "Nhava Sheva",
      shipDate: "17 Apr 2025",
      arrDate: "23 Apr 2025",
      value: 10.15,
      status: "In Transit",
    },
    {
      id: "SHP-2025-1037",
      hs: "62",
      desc: "Articles of Apparel & Clothing Accessories",
      importer: "Fashion Hub",
      exporter: "Style Tex Ltd.",
      origin: "Bangladesh",
      originCode: "BD",
      dest: "India",
      destCode: "IN",
      loading: "Chattogram",
      discharge: "Kolkata",
      shipDate: "16 Apr 2025",
      arrDate: "20 Apr 2025",
      value: 8.75,
      status: "Delivered",
    },
    {
      id: "SHP-2025-1036",
      hs: "48",
      desc: "Paper & Paperboard Articles",
      importer: "Packwell Industries",
      exporter: "Paper Source LLC",
      origin: "Brazil",
      originCode: "BR",
      dest: "India",
      destCode: "IN",
      loading: "Santos",
      discharge: "Cochin",
      shipDate: "15 Apr 2025",
      arrDate: "19 Apr 2025",
      value: 7.6,
      status: "Pending",
    },
  ];*/

  const [dashboard, setDashboard] = useState({});
  const [shipments, setShipments] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- STATES FOR FILTERING ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("All Countries");
  const [selectedDest, setSelectedDest] = useState("All Countries");
  const [selectedImporter, setSelectedImporter] = useState("All Importers");
  const [selectedExporter, setSelectedExporter] = useState("All Exporters");
  const [selectedPort, setSelectedPort] = useState("All Ports");
   const [shipmentStartDate, setShipmentStartDate] = useState(null);
    const [shipmentEndDate, setShipmentEndDate] = useState(null);
     const [dateRange, setDateRange] = useState(false)
     const [exportReport, setExportReport] = useState(false)
const [currentPage, setCurrentPage] = useState(1);
const rowsPerPage = 10;
  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data.data || {});
    } catch (err) {
      console.log(err);
    }
  };
  const fetchShipments = async () => {
    try {
      const res = await getShipments();
      setShipments(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
      setFilterOptions(res.data.data || {});
    } catch (err) {
      console.log(err);
    }
  };
  const fetchReport = async () => {
    try {
      const res = await exportReport();
      setReport(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect (() => {
    fetchDashboard();
    fetchShipments();
    fetchFilterOptions();
    fetchReport();
  }, []);


  // --- DYNAMIC DROPDOWN OPTIONS GENERATION ---
  const uniqueOrigins = useMemo(
    () => ["All Countries", ...new Set(shipments.map((s) => s.route?.originCountry).filter(Boolean))],
    [shipments],
  );
  const uniqueDests = useMemo(
    () => ["All Countries", ...new Set(shipments.map((s) => s.route?.destinationCountry).filter(Boolean))],
    [shipments],
  );
  const uniqueImporters = useMemo(
    () => [
      "All Importers",
      ...new Set(shipments.map((s) => s.importer?.companyName).filter(Boolean)),
    ],
    [shipments],
  );
  const uniqueExporters = useMemo(
    () => [
      "All Exporters",
      ...new Set(shipments.map((s) => s.exporter?.companyName).filter(Boolean)),
    ],
    [shipments],
  );
  const uniquePorts = useMemo(
    () => ["All Ports", ...new Set(shipments.map((s) => s.route?.originCity).filter(Boolean))],
    [],
  );

  // --- RESET FILTER FUNCTION ---
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedOrigin("All Countries");
    setSelectedDest("All Countries");
    setSelectedImporter("All Importers");
    setSelectedExporter("All Exporters");
    setSelectedPort("All Ports");
      setCurrentPage(1);
  };

  // --- DYNAMIC SEARCH & FILTER LOGIC ---
  const filteredShipments = useMemo(() => {
  return shipments.filter((shipment) => {
    const matchesSearch =
      (shipment.cargo?.hsCode?.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (shipment.cargo?.hsCode?.hsCode || "")
        .includes(searchTerm) ||
      (shipment.sbNumber || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesOrigin =
      selectedOrigin === "All Countries" ||
      shipment.route?.originCountry === selectedOrigin;

    const matchesDest =
      selectedDest === "All Countries" ||
      shipment.route?.destinationCountry === selectedDest;

    const matchesImporter =
      selectedImporter === "All Importers" ||
      shipment.importer?.companyName === selectedImporter;

    const matchesExporter =
      selectedExporter === "All Exporters" ||
      shipment.exporter?.companyName === selectedExporter;

    const matchesPort =
      selectedPort === "All Ports" ||
      shipment.route?.originCity === selectedPort;

    return (
      matchesSearch &&
      matchesOrigin &&
      matchesDest &&
      matchesImporter &&
      matchesExporter &&
      matchesPort
    );
  });
}, [
  shipments,
  searchTerm,
  selectedOrigin,
  selectedDest,
  selectedImporter,
  selectedExporter,
  selectedPort,
]);
const totalPages = Math.ceil(
  filteredShipments.length / rowsPerPage
);

const paginatedShipments = useMemo(() => {
  const startIndex =
    (currentPage - 1) * rowsPerPage;

  return filteredShipments.slice(
    startIndex,
    startIndex + rowsPerPage
  );
}, [filteredShipments, currentPage]);

const startRow =
  filteredShipments.length === 0
    ? 0
    : (currentPage - 1) * rowsPerPage + 1;

const endRow = Math.min(
  currentPage * rowsPerPage,
  filteredShipments.length
);
  // --- DYNAMIC COUNTERS & STATS COMPUTATION ---
  const totalValue = useMemo(() => {
   return (
     filteredShipments.reduce(
       (sum, item) => sum + (item.cargo?.value || 0),
       0
      ) / 10000000).toFixed(2);
  }, [filteredShipments]);

  const uniqueExportersCount = useMemo(() => {
   return new Set(
     filteredShipments.map((s) => s.exporter?.companyName)).size;
}, [filteredShipments]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchTerm,
      port: selectedPort,
      origin: selectedOrigin,
      exporter: selectedExporter,
      importer: selectedImporter,
    });
  };
useEffect(() => {
  setCurrentPage(1);
}, [
  searchTerm,
  selectedOrigin,
  selectedDest,
  selectedImporter,
  selectedExporter,
  selectedPort,
]);
  return (
    <div className="overflow-y-auto  bg-[#f8fafc] p-6  text-slate-700 pt-14">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Shipment Database
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Explore detailed global shipment records with advanced search and
            filters.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 md:flex-none">
                       <DatePicker
                         selected={shipmentStartDate}
                         onChange={(dates) => {
                           const [start, end] = dates;
                           setShipmentStartDate(start);
                           setShipmentEndDate(end);
                         }}
                         startDate={shipmentStartDate}
                         endDate={shipmentEndDate}
                         selectsRange
                         dateFormat="dd MMM yyyy"
                         placeholderText="01 Apr 2025 - 24 Apr 2025"
                         className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
                       />
                       <CalendarDays
                         size={14}
                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                       />
                     </div>

           <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
                     <Download size={14} className="text-slate-400" />
                     Export Report
                   </button>

         {/* <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-colors">
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
          </button>*/}
        </div>
      </div>

      {/* --- DYNAMIC STATS CARDS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
        {/* Total Shipments - Dynamic */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
              Total Exports Shipments
            </span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📦</div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold text-slate-800">
              {filteredShipments.length}
            </h3>
            <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">
                
            </span>
          </div>
        </div>

        {/* Total Value - Dynamic */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
              Total Exports Value
            </span>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              ₹
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold text-slate-800">
              ₹{totalValue} Cr
            </h3>
            <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">
             
            </span>
          </div>
        </div>

        {/* Total Exporters - Dynamic */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
              Exporters
            </span>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              👥
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold text-slate-800">
              {uniqueExportersCount}
            </h3>
            <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">
               
            </span>
          </div>
        </div>

        {/* Baki Standard Static Cards Metrics Layout ke liye 
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
              Suppliers
            </span>
            <div className="p-1.5 bg-cyan-50 text-cyan-600 rounded-lg">🚚</div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold text-slate-800">{dashboard.totalSuppliers || 0}</h3>
             <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">
               
            </span>
          </div>
        </div>*/}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
              Origins
            </span>
            <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
              🌐
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold text-slate-800">{dashboard.countries || 0}</h3>
             <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">
                
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
              Avg Value
            </span>
            <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
              🔶
            </div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold text-slate-800">₹{((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L</h3>
             <span className="text-[11px] text-red-600 font-semibold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" />  
            </span>
          </div>
        </div>
        {/*<div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-slate-600 tracking-wider">
              Lead Time
            </span>
            <div className="p-1.5 bg-red-50 text-red-600 rounded-lg">⏱️</div>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-bold text-slate-800">
              {dashboard.avgLeadTime || 0} d
               <span className="text-[11px] text-red-600 font-semibold flex items-center gap-0.5 mt-0.5">
              
            </span>
              
              </h3>
          </div>
        </div>*/}
      </div>

      {/* --- DYNAMIC FILTERS ROW BAR --- */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 items-end">
          {/* Input Search Box */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              HS Code / Product / ID
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-3 h-3 absolute right-2.5 top-3 text-slate-400" />
            </div>
          </div>

          {/* Origin Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Origin Country
            </label>
            <div className="relative">
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniqueOrigins.map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Destination Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Destination
            </label>
            <div className="relative">
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniqueDests.map((dest, i) => (
                  <option key={i} value={dest}>
                    {dest}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Importer Dropdown 
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Importer
            </label>
            <div className="relative">
              <select
                value={selectedImporter}
                onChange={(e) => setSelectedImporter(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniqueImporters.map((imp, i) => (
                  <option key={i} value={imp}>
                    {imp}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Exporter Dropdown 
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Exporters
            </label>
            <div className="relative">
              <select
                value={selectedExporter}
                onChange={(e) => setSelectedExporter(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniqueExporters.map((exp, i) => (
                  <option key={i} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Loading Port Dropdown 
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
              Port of Loading
            </label>
            <div className="relative">
              <select
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
              >
                {uniquePorts.map((port, i) => (
                  <option key={i} value={port}>
                    {port}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

        

          {/* Reset Filters Control */}
          <div className="flex gap-2">
            <button
              onClick={handleApplyFilters}
              className="flex-1  bg-blue-600 hover:bg-blue-700  text-white font-medium text-xs rounded-xl py-2 px-3 transition shadow-sm  w-full whitespace-nowrap"
            >
              Search
            </button>

            <button
              onClick={handleResetFilters}
              className="flex items-center justify-center border border-slate-200 text-red-500 hover:bg-red-50 rounded-lg px-2 py-3 bg-white shadow-sm font-semibold text-xs w-full transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* --- DATA TABLE CONTAINER --- */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm ">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
          <div className="text-sm font-bold text-slate-800">
            Filtered: {filteredShipments.length} Results
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50">
              <Columns className="w-3.5 h-3.5 text-slate-400" /> Columns
            </button>
            <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5 shadow-sm">
              <button className="p-1 bg-slate-100 text-slate-700 rounded-md">
                <List className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 text-slate-400 hover:text-slate-600">
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Shipment ID</th>
                <th className="py-3 px-3">HS Code</th>
                <th className="py-3 px-4 max-w-[180px]">Product Description</th>
                <th className="py-3 px-4">Importer</th>
                <th className="py-3 px-4">Exporter</th>
                <th className="py-3 px-3">Origin</th>
                <th className="py-3 px-3">Dest</th>
                <th className="py-3 px-4">Port of Loading</th>
                <th className="py-3 px-4">Port of Discharge</th>
                <th className="py-3 px-3">Ship Date</th>
                <th className="py-3 px-3">Arr. Date</th>
                <th className="py-3 px-4 text-right">Value (INR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                {/*<th className="py-3 px-3 text-center">Actions</th>*/}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedShipments.length > 0 ? (
                paginatedShipments.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
                      {row.referenceNumber || row.sbNumber}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-medium">
                      {row.cargo?.hsCode?.hsCode}
                    </td>
                    <td
                      className="py-3.5 px-4 font-medium text-slate-700 max-w-[180px] truncate"
                      title={row.cargo?.description}
                    >
                      {row.cargo?.description}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {row.importer?.companyName}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-600">
                      {row.exporter?.companyName}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="mr-1.5 inline-flex align-middle shadow-sm rounded-sm ">
                        <ReactCountryFlag
                          countryCode={countryCodes[row.route?.originCountry] || ""}
                          svg
                          style={{ width: "18px", height: "13px" }}
                        />
                      </span>
                      <span className="text-slate-600 font-medium align-middle">
                        {row.route?.originCountry}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="mr-1.5 inline-flex align-middle shadow-sm rounded-sm ">
                        <ReactCountryFlag
                          countryCode={countryCodes[row.route?.destinationCountry] || ""}
                          svg
                          style={{ width: "18px", height: "13px" }}
                        />
                      </span>
                      <span className="text-slate-600 font-medium align-middle">
                        {row.route?.destinationCountry}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {row.route?.originCity}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {row.route?.destinationCity}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      {row.shipmentDate ? new Date(row.shipmentDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short",year: "numeric",}) : "-"}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
                      {row.eta ? new Date(row.eta).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",}) : "-"}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                      ₹ {(row.cargo?.value / 10000000).toFixed(2)} Cr
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
                          row.shipmentStatus === "Delivered"
                            ? "bg-green-50 text-green-600"
                            : row.shipmentStatus === "In Transit"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {row.shipmentStatus}
                      </span>
                    </td>
                   {/* <td className="py-3.5 px-3 text-center text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold">
                      ⋮
                    </td>*/}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="14"
                    className="text-center py-8 text-slate-400 font-medium"
                  >
                    No data found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info pagination */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-400">
           Showing {startRow}-{endRow} of{" "}
  {filteredShipments.length} rows
          </div>
          <div className="flex items-center gap-1">
  <button
    type="button"
    onClick={() =>
      setCurrentPage((prev) =>
        Math.max(prev - 1, 1)
      )
    }
    disabled={currentPage === 1}
    className={`p-1.5 rounded-lg border border-slate-200 bg-white ${
      currentPage === 1
        ? "text-slate-300 cursor-not-allowed"
        : "text-slate-500 hover:bg-slate-100"
    }`}
  >
    <ChevronLeft className="w-3.5 h-3.5" />
  </button>

  {Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).map((page) => (
    <button
      key={page}
      type="button"
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1 rounded-lg text-xs font-bold border ${
        currentPage === page
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
      }`}
    >
      {page}
    </button>
  ))}

  <button
    type="button"
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, totalPages)
      )
    }
    disabled={
      currentPage === totalPages ||
      totalPages === 0
    }
    className={`p-1.5 rounded-lg border border-slate-200 bg-white ${
      currentPage === totalPages ||
      totalPages === 0
        ? "text-slate-300 cursor-not-allowed"
        : "text-slate-500 hover:bg-slate-100"
    }`}
  >
    <ChevronRight className="w-3.5 h-3.5" />
  </button>
</div>
        </div>

      </div> 
       {exportReport && (
                               <ExportReport onClose={() => setExportReport(false)} />
                             )}
    <div className="mt-5 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-slate-300" />
          <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
          <HelpCircle size={13} className="text-slate-300" />
          <span>Help Center</span>
        </div>
      </div>
    </div>
  );
}
