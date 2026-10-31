


import React, { useState,useMemo,useEffect } from "react";
import {
  getRiskDashboard,
  getRiskMap,
  getRiskDistribution,
  getRiskTopCountries,
  getRiskCategories,
  getRecentRiskAlerts,
  getRiskTrend,
  getShipmentsAtRisk,
  getRiskFilterOptions,
} from "../../api/RiskAnalysisApi";

import {
  assessRisk,
  getRiskHistory,
  getTopRiskHSCodes,
} from "../../api/CargoMateApi";

import ReactCountryFlag from "react-country-flag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExportReport from "../../components/b2bComponent/ExportReport";
import {
  CalendarDays,
  Download,
  ChevronDown,
  Search,
  Sliders,
  Gauge,
  AlertTriangle,
  ShieldCheck,
  Target,
  PackageSearch,
  ListChecks,
  Plus,
  Minus,
  RotateCw,
  Info,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const HEADING = "text-[#07156B]";

const COUNTRY_CODES = {
  China: "CN",
  USA: "US",
  Russia: "RU",
  India: "IN",
  UAE: "AE",
  Germany: "DE",
  Iran: "IR",
  Turkey: "TR",
};

function Flag({ country, size = 14 }) {
  return (
    <ReactCountryFlag
      countryCode={COUNTRY_CODES[country] || "US"}
      svg
      style={{ width: size, height: size, borderRadius: "2px" }}
    />
  );
}

function RiskBadge({ level }) {
  const styles = {
    "Very High": "bg-rose-100 text-rose-600",
    High: "bg-orange-100 text-orange-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-green-100 text-green-600",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${styles[level]}`}>
      {level}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Transit": "bg-blue-100 text-blue-600",
    Delayed: "bg-amber-100 text-amber-600",
    "At Risk": "bg-rose-100 text-rose-600",
    Pending: "bg-orange-100 text-orange-600",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
}
const COUNTRY_POSITIONS = {
  "United Arab Emirates": {
    top: "39%",
    left: "63%",
  },

  India: {
    top: "42%",
    left: "67%",
  },

  China: {
    top: "34%",
    left: "72%",
  },

  Germany: {
    top: "27%",
    left: "51%",
  },

  Netherlands: {
    top: "25%",
    left: "49%",
  },

  Brazil: {
    top: "55%",
    left: "31%",
  },

  "United States": {
    top: "34%",
    left: "22%",
  },

  Canada: {
    top: "25%",
    left: "22%",
  },

  Australia: {
    top: "65%",
    left: "78%",
  },

  Japan: {
    top: "38%",
    left: "79%",
  },
};
/*const MAP_LEGEND = [
  { label: "Very High", color: "#EF4444" },
  { label: "High", color: "#F87171" },
  { label: "Medium", color: "#F59E0B" },
  { label: "Low", color: "#10B981" },
  { label: "Very Low / Stable", color: "#3B82F6" },
  { label: "No Data", color: "#CBD5E1" },
];

const MAP_BLOBS = [
  { top: "18%", left: "45%", w: "26%", h: "20%", color: "#EF4444", rotate: "-6deg" },
  { top: "26%", left: "12%", w: "9%", h: "8%", color: "#10B981", rotate: "10deg" },
  { top: "37%", left: "63%", w: "13%", h: "14%", color: "#F59E0B", rotate: "0deg" },
  { top: "38%", left: "55%", w: "4%", h: "5%", color: "#F87171", rotate: "0deg" },
  { top: "56%", left: "26%", w: "8%", h: "12%", color: "#3B82F6", rotate: "-8deg" },
];

const RISK_DISTRIBUTION = [
  { name: "Very High (0-25)", value: 12, percent: "11.5%", color: "#2563EB" },
  { name: "High (26-50)", value: 24, percent: "23.1%", color: "#EF4444" },
  { name: "Medium (51-75)", value: 36, percent: "34.6%", color: "#F59E0B" },
  { name: "Low (76-100)", value: 20, percent: "19.2%", color: "#10B981" },
  { name: "Very Low / Stable", value: 12, percent: "11.5%", color: "#7DD3FC" },
];

const TOP_RISKY_COUNTRIES = [
  { country: "Iran", score: 18, level: "Very High", trend: "↑ 5" },
  { country: "Russia", score: 22, level: "Very High", trend: "—" },
  { country: "Syria", score: 25, level: "Very High", trend: "↑ 3" },
  { country: "Ukraine", score: 32, level: "High", trend: "↑ 4" },
  { country: "Yemen", score: 35, level: "High", trend: "—" },
  { country: "Venezuela", score: 38, level: "High", trend: "↑ 2" },
  { country: "Myanmar", score: 42, level: "High", trend: "↑ 1" },
  { country: "Sudan", score: 45, level: "High", trend: "↑ 3" },
];

const RISK_BY_CATEGORY = [
  { name: "Political Risk", value: 64, level: "High" },
  { name: "Regulatory Risk", value: 52, level: "Medium" },
  { name: "Economic Risk", value: 48, level: "Medium" },
  { name: "Security Risk", value: 60, level: "High" },
  { name: "Supply Chain Risk", value: 55, level: "Medium" },
  { name: "Compliance Risk", value: 50, level: "Medium" },
  { name: "Natural Disaster Risk", value: 38, level: "Low" },
];

const RECENT_ALERTS = [
  { text: "New sanctions imposed on Russia. US adds 120+ entities to sanction list.", tag: "Country: Russia", date: "24 Apr 2025", level: "Very High" },
  { text: "Red Sea shipping disruptions. Multiple attacks reported near Bab el-Mandeb.", tag: "Region: Red Sea", date: "23 Apr 2025", level: "High" },
  { text: "Export restrictions on rare earth materials. China tightens export controls.", tag: "Country: China", date: "22 Apr 2025", level: "High" },
  { text: "Banking restrictions in Iran. International transactions may be affected.", tag: "Country: Iran", date: "21 Apr 2025", level: "Very High" },
  { text: "Port congestion in Rotterdam. Delays expected due to labor strikes.", tag: "Country: Netherlands", date: "20 Apr 2025", level: "Medium" },
];

const RISK_TREND = [
  { date: "01 Apr", score: 68 },
  { date: "06 Apr", score: 70 },
  { date: "11 Apr", score: 66 },
  { date: "16 Apr", score: 74 },
  { date: "21 Apr", score: 72 },
  { date: "24 Apr", score: 78.6 },
];

const TOP_RISKY_HS = [
  { code: "8703", desc: "Motor Cars", score: 72, level: "High" },
  { code: "8517", desc: "Telephones", score: 68, level: "High" },
  { code: "8708", desc: "Parts of Motor Vehicles", score: 65, level: "High" },
  { code: "8471", desc: "Auto Data Processing Units", score: 62, level: "High" },
  { code: "8525", desc: "Transmission Apparatus", score: 58, level: "Medium" },
  { code: "3917", desc: "Plastic Tubes & Pipes", score: 54, level: "Medium" },
  { code: "3004", desc: "Medicaments", score: 52, level: "Medium" },
];

const SHIPMENTS_AT_RISK = [
  { id: "SHP-2025-1045", date: "24 Apr 2025", from: "China", to: "USA", hs: "8517", desc: "Telephones", level: "High", score: 68, factors: "Regulatory, Supply Chain", impact: "₹12.45 Cr", status: "In Transit" },
  { id: "SHP-2025-1038", date: "23 Apr 2025", from: "Russia", to: "India", hs: "8703", desc: "Motor Cars", level: "Very High", score: 72, factors: "Political, Compliance", impact: "₹8.75 Cr", status: "Delayed" },
  { id: "SHP-2025-1027", date: "22 Apr 2025", from: "UAE", to: "Germany", hs: "7208", desc: "Flat Rolled Products", level: "High", score: 60, factors: "Economic, Supply Chain", impact: "₹5.32 Cr", status: "At Risk" },
  { id: "SHP-2025-1019", date: "21 Apr 2025", from: "Iran", to: "Turkey", hs: "3917", desc: "Plastic Tubes & Pipes", level: "High", score: 58, factors: "Regulatory, Compliance", impact: "₹3.15 Cr", status: "Pending" },
];*/

function SectionCard({ children, className = "" }) {
  return (
    <div className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function ViewAllHeader({ title }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className={`font-bold text-sm ${HEADING}`}>{title}</h3>
      <button className="text-blue-600 text-[11px] font-bold shrink-0">View All</button>
    </div>
  );
}

export default function RiskAnalysis() {

  const [riskDashboard, setRiskDashboard] = useState(null);
  const [riskMap, setRiskMap] = useState([]);
  const [riskDistribution, setRiskDistribution] = useState([]);
  const [riskTopCountries, setRiskTopCountries] = useState([]);
  const [riskCategories, setRiskCategories] = useState([]);
  const [recentRiskAlerts, setRecentRiskAlerts] = useState([]);
  const [riskTrend, setRiskTrend] = useState([]);
  const [topRiskHSCodes, setTopRiskHSCodes] = useState([]);
  const [shipmentsAtRisk, setShipmentsAtRisk] = useState([]);
  const [riskFilters, setRiskFilters] = useState({countries: [], riskLevels: [], riskCategories: [], hsCodes: []});
  const [appliedRiskFilters, setAppliedRiskFilters] = useState({
  country: "",
  riskLevel: "",
  riskCategory: "",
  hsCode: ""
});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("");
  const [selectedRiskCategory, setSelectedRiskCategory] = useState("");
  const [selectedHSCode, setSelectedHSCode] = useState("");
   const [shipmentStartDate, setShipmentStartDate] = useState(null);
    const [shipmentEndDate, setShipmentEndDate] = useState(null);
     const [dateRange, setDateRange] = useState(false)
     const [exportReport, setExportReport] = useState(false);
  const [riskModalOpen, setRiskModalOpen] = useState(false);
  const [riskSubmitting, setRiskSubmitting] = useState(false);
  const [riskError, setRiskError] = useState("");
  const [riskForm, setRiskForm] = useState({
    hs_code: "09011111",
    product: "Coffee",
    country: "India",
    trade_type: "export",
    countries: "UAE"
  });
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [riskHistory, setRiskHistory] = useState([]);
  const [riskHistoryMeta, setRiskHistoryMeta] = useState({ count: 0, average_risk_score: 0, trend: [] });
  const [riskHistoryPage, setRiskHistoryPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [allHsModalOpen, setAllHsModalOpen] = useState(false);
  const [allHsPage, setAllHsPage] = useState(1);
  const [topHsApiData, setTopHsApiData] = useState([]);

  const fetchRiskDashboard = async () => {
    try {
      const res = await getRiskDashboard();
      setRiskDashboard(res.data?.data || null);
    } catch (error) {
      console.error("Risk Dashboard fetch error:", error);
    }
  };

  const fetchRiskMap = async () => {
    try {
      const res = await getRiskMap();
      setRiskMap(res.data?.data || []);
    } catch (error) {
      console.error("Risk Map fetch error:", error);
    }
  };

  const fetchRiskDistribution = async () => {
    try {
      const res = await getRiskDistribution();
      setRiskDistribution(res.data?.data || []);
    } catch (error) {
      console.error("Risk Distribution fetch error:", error);
    }
  };

  const fetchRiskTopCountries = async () => {
    try {
      const res = await getRiskTopCountries();
      setRiskTopCountries(res.data?.data || []);
    } catch (error) {
      console.error("Risk Top Countries fetch error:", error);
    }
  };

  const fetchRiskCategories = async () => {
    try {
      const res = await getRiskCategories();
      setRiskCategories(res.data?.data || []);
    } catch (error) {
      console.error("Risk Categories fetch error:", error);
    }
  };

  const fetchRecentRiskAlerts = async () => {
    try {
      const res = await getRecentRiskAlerts();
      setRecentRiskAlerts(res.data?.data || []);
    } catch (error) {
      console.error("Recent Risk Alerts fetch error:", error);
    }
  };

  const fetchRiskTrend = async () => {
    try {
      const res = await getRiskTrend();
      setRiskTrend(res.data?.data || []);
    } catch (error) {
      console.error("Risk Trend fetch error:", error);
    }
  };

  const fetchTopRiskHSCodes = async () => {
    try {
      const res = await getTopRiskHSCodes();
      const payload = res.data?.data ?? res.data ?? {};
      const rows = Array.isArray(payload)
        ? payload
        : Array.isArray(payload.records)
          ? payload.records
          : Array.isArray(payload.items)
            ? payload.items
            : Array.isArray(payload.results)
              ? payload.results
              : Array.isArray(payload.data)
                ? payload.data
                : [];
      setTopHsApiData(rows);
      setTopRiskHSCodes(rows);
    } catch (error) {
      console.error("Top Risk HS Codes fetch error:", error);
    }
  };

  const fetchShipmentsAtRisk = async () => {
    try {
      const res = await getShipmentsAtRisk();
      setShipmentsAtRisk(res.data?.data || []);
    } catch (error) {
      console.error("Shipments At Risk fetch error:", error);
    }
  };

  const fetchRiskFilterOptions = async () => {
    try {
      const res = await getRiskFilterOptions();

      setRiskFilters(
        res.data?.data || {
          countries: [],
          riskLevels: [],
          riskCategories: [],
          hsCodes: []
        }
      );
    } catch (error) {
      console.error("Risk Filter Options fetch error:", error);
    }
  };
  const handleApplyFilters = () => {
    setAppliedRiskFilters({
     country: selectedCountry,
     riskLevel: selectedRiskLevel,
     riskCategory: selectedRiskCategory,
     hsCode: selectedHSCode
    });
  };
  const handleResetFilters = () => {
    setSelectedCountry("");
    setSelectedRiskLevel("");
    setSelectedRiskCategory("");
    setSelectedHSCode("");

    setAppliedRiskFilters({
    country: "",
    riskLevel: "",
    riskCategory: "",
    hsCode: ""
  });
  };

  const fetchRiskHistory = async (formValues = riskForm) => {
    if (!formValues.hs_code.trim() || !formValues.country.trim()) return;
    setHistoryLoading(true);
    try {
      const res = await getRiskHistory({
        hs_code: formValues.hs_code.trim(),
        country: formValues.country.trim(),
        limit: 100
      });
      const payload = res.data?.data ?? res.data ?? {};
      const rows = Array.isArray(payload.records)
        ? payload.records
        : Array.isArray(payload.data)
          ? payload.data
          : Array.isArray(payload.items)
            ? payload.items
            : Array.isArray(payload.results)
              ? payload.results
              : Array.isArray(payload)
                ? payload
                : [];
      setRiskHistory(rows);
      // Use /risk/history records as the source for the existing Shipments at Risk table.
      // Map API fields to the table's current row shape so the dashboard UI stays unchanged.
      setShipmentsAtRisk(rows.map((record) => ({
        _id: record.id || record.assessment_id,
        country: record.country || "",
        riskCategory: record.top_alert || "",
        shipment: {
          sbNumber: record.assessment_id || record.id || "-",
          shipmentDate: record.created_at || "",
          route: {
            originCountry: record.country || "-",
            destinationCountry: record.country || "-",
          },
          cargo: { productName: record.commodity || "-" },
        },
        hsCode: {
          hsCode: record.hs_code || "-",
          productName: record.commodity || "-",
        },
        riskLevel: record.risk_level || "Low",
        riskScore: Number(record.overall_risk_score ?? 0),
        riskFactors: record.top_alert ? [record.top_alert] : [],
        estimatedImpact: 0,
        status: "Recorded",
      })));
      const trendRows = Array.isArray(payload.trend) ? payload.trend : [];
      setRiskHistoryMeta({
        count: Number(payload.count ?? rows.length),
        average_risk_score: Number(payload.average_risk_score ?? 0),
        trend: trendRows
      });
      if (trendRows.length) {
        setRiskTrend(trendRows.map((item) => ({
          _id: item.date ? new Date(item.date).toLocaleDateString() : item._id || "Latest",
          avgRisk: Number(item.score ?? item.avgRisk ?? 0),
          score: Number(item.score ?? item.avgRisk ?? 0),
          assessment_id: item.assessment_id
        })));
      }
      setRiskHistoryPage(1);
    } catch (error) {
      console.error("Risk history fetch error:", error);
      setRiskError(error?.response?.data?.detail || error?.response?.data?.message || "Could not load risk history.");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleAssessRisk = async (event) => {
    event.preventDefault();
    setRiskError("");
    setRiskSubmitting(true);
    setAssessmentResult(null);
    try {
      const payload = {
        hs_code: riskForm.hs_code.trim(),
        country: riskForm.country.trim(),
        commodity: riskForm.product.trim(),
        trade_type: riskForm.trade_type,
        countries: riskForm.countries.trim(),
        record: true
      };
      const res = await assessRisk(payload);
      const result = res.data?.data ?? res.data ?? {};
      setAssessmentResult(result);
      setRiskModalOpen(false);
      await fetchRiskHistory(riskForm);
      await fetchTopRiskHSCodes();
    } catch (error) {
      console.error("Risk assessment error:", error);
      setRiskError(
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Risk assessment failed. Please check the fields and try again."
      );
    } finally {
      setRiskSubmitting(false);
    }
  };

  const getAssessmentRows = (result) => Array.isArray(result?.by_category) ? result.by_category : [];
  const riskHistoryPageSize = 10;
  const riskHistoryPageCount = Math.max(1, Math.ceil(riskHistory.length / riskHistoryPageSize));
  const visibleRiskHistory = riskHistory.slice(
    (riskHistoryPage - 1) * riskHistoryPageSize,
    riskHistoryPage * riskHistoryPageSize
  );
  const topHsPageSize = 10;
  const dashboardHsRows = useMemo(() => {
    // Do not show previously recorded/default HS-code data before Check Risk is run.
    if (!assessmentResult) return [];
    const latest = {
      hs_code: assessmentResult.query?.hs_code || riskForm.hs_code,
      commodity: assessmentResult.query?.commodity || riskForm.product,
      overall_risk_score: assessmentResult.overall_risk_score ?? assessmentResult.summary?.overall_risk_score ?? 0,
      risk_level: assessmentResult.risk_level || assessmentResult.summary?.risk_level || "Medium",
      assessment_id: assessmentResult.assessment_id,
    };
    return [latest, ...topHsApiData.filter((item) => String(item.hs_code || item.hsCode || item._id || item.code || "") !== String(latest.hs_code))].slice(0, 50);
  }, [assessmentResult, riskForm, topHsApiData]);
  const allHsPageCount = Math.max(1, Math.ceil(dashboardHsRows.length / topHsPageSize));
  const visibleAllHsCodes = dashboardHsRows.slice(
    (allHsPage - 1) * topHsPageSize,
    allHsPage * topHsPageSize
  );
  const visibleTopHsCodes = dashboardHsRows.slice(0, 5);

  useEffect(() => {
    fetchRiskDashboard();
    fetchRiskMap();
    fetchRiskDistribution();
    fetchRiskTopCountries();
    fetchRiskCategories();
    fetchRecentRiskAlerts();
    fetchRiskTrend();
    fetchTopRiskHSCodes();
    fetchRiskHistory(riskForm);
    fetchRiskFilterOptions();
  }, []);
  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "Very High":
        return "#EF4444";
      case "High":
        return "#F87171";
      case "Medium":
        return "#F59E0B";
      case "Low":
        return "#10B981";
      case "Very Low":
        return "#3B82F6";
      default:
        return "#CBD5E1";
    }
  };
  const filteredShipmentsAtRisk = useMemo(() => {
  return shipmentsAtRisk.filter((s) => {

    const country =
      s.shipment?.route?.destinationCountry || s.country || "";

    const riskLevel =
      s.riskLevel || "";

    const hsCode =
      s.hsCode?.hsCode ||
      s.shipment?.cargo?.hsCode?.hsCode ||
      "";

    const riskCategory =
      s.riskCategory ||
      s.riskFactors?.[0] ||
      "";

    return (
      (appliedRiskFilters.country === "" ||
        country === appliedRiskFilters.country) &&

      (appliedRiskFilters.riskLevel === "" ||
        riskLevel === appliedRiskFilters.riskLevel) &&

      (appliedRiskFilters.riskCategory === "" ||
        riskCategory === appliedRiskFilters.riskCategory) &&

      (appliedRiskFilters.hsCode === "" ||
        hsCode === appliedRiskFilters.hsCode)
    );
  });
}, [shipmentsAtRisk, appliedRiskFilters]);
const filteredRiskDistribution = useMemo(() => {
  const levels = ["Very High", "High", "Medium", "Low"];
  if (!assessmentResult) {
    return levels.map((riskLevel) => ({ _id: riskLevel, count: 0 }));
  }
  const distribution = assessmentResult.distribution || {};
  return levels.map((riskLevel) => ({
    _id: riskLevel,
    count: Number(distribution[riskLevel] ?? 0),
  }));
}, [assessmentResult]);

const filteredRiskTopCountries = useMemo(() => {
  if (!assessmentResult) return [];
  if (Array.isArray(assessmentResult?.top_risky_countries) && assessmentResult.top_risky_countries.length) {
    return assessmentResult.top_risky_countries.map((item) => ({
      _id: item.country,
      riskScore: Number(item.score || 0),
      riskLevel: item.level || "Medium",
      alerts: 0,
      iso2: item.iso2,
    }));
  }

  const countries = {};

  filteredShipmentsAtRisk.forEach((item) => {
    const country =
      item.shipment?.route?.destinationCountry ||
      item.country ||
      "";

    if (!country) return;

    if (!countries[country]) {
      countries[country] = {
        riskScores: [],
        alerts: 0
      };
    }

    countries[country].riskScores.push(
      Number(item.riskScore || 0)
    );

    countries[country].alerts += 1;
  });

  return Object.entries(countries)
    .map(([country, data]) => ({
      _id: country,
      riskScore:
        data.riskScores.length > 0
          ? data.riskScores.reduce((a, b) => a + b, 0) /
            data.riskScores.length
          : 0,
      alerts: data.alerts
    }))
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 10);
}, [filteredShipmentsAtRisk, assessmentResult]);

  const riskLegend = assessmentResult
    ? [...new Set(filteredRiskTopCountries.map((item) => item.riskLevel).filter(Boolean))].map((level) => ({ label: level, color: getRiskColor(level) }))
    : [];
  //const totalCountries = RISK_DISTRIBUTION.reduce((a, b) => a + b.value, 0);

  const KPI_STATS = [
  { title: "Overall Risk Score", value: `${Number(assessmentResult?.overall_risk_score ?? assessmentResult?.summary?.overall_risk_score ?? 0).toFixed(0)} / 100`, change: assessmentResult?.risk_level || "No Assessment", icon: Gauge, bg: "bg-amber-50", color: "text-amber-500", tag: true },
  { title: "High Risk Alerts", value: assessmentResult?.summary?.high_risk_alerts ?? 0, change: "", icon: AlertTriangle, bg: "bg-rose-50", color: "text-rose-500" },
  { title: "Medium Risk Alerts", value: assessmentResult?.summary?.medium_risk_alerts ?? 0, change: "", icon: AlertTriangle, bg: "bg-amber-50", color: "text-amber-500" },
  { title: "Low Risk Alerts", value: assessmentResult?.summary?.low_risk_alerts ?? 0, change: "", icon: ShieldCheck, bg: "bg-emerald-50", color: "text-emerald-500" },
  { title: "Countries at High Risk", value: assessmentResult?.summary?.countries_at_high_risk ?? 0, change: "", icon: Target, bg: "bg-blue-50", color: "text-blue-500" },
  { title: "Shipments Affected", value: assessmentResult ? (riskDashboard?.shipmentsAffected ?? 0) : 0, change: "", icon: PackageSearch, bg: "bg-orange-50", color: "text-orange-500", plain: true },
];

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-[#F8FAFC] text-slate-600  antialiased pt-8">
      <div className="max-w-[1400px] mx-auto p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
          <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>Risk Analysis</h1>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Identify, assess and monitor risks that may impact your global trade operations.
            </p>
          </div>  
            <div className="flex gap-3"> 
           <div className="relative flex-1 ">
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
                    <button onClick={() => setRiskModalOpen(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 border border-blue-600 text-white text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-blue-700 transition whitespace-nowrap`}>
                      <ShieldCheck size={14} />
                      Check Risk
                    </button>
                    <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
                      <Download size={14} className="text-slate-400" />
                      Export Report
                    </button> </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-xs flex flex-col justify-between hover:shadow-md transition duration-200">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] sm:text-[11px] font-semibold leading-tight ${HEADING}`}>{stat.title}</span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <Icon size={14} />
                  </div>
                </div>
                <div className="mt-2.5">
                  <h4 className={`text-sm sm:text-base font-extrabold tracking-tight ${HEADING}`}>{stat.value}</h4>
                  {stat.tag ? (
                    <span className="text-[9px] font-bold inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">
                      {stat.change}
                    </span>
                  ) : (
                    <span className={`text-[9px] font-bold block mt-0.5 ${stat.plain ? "text-slate-400" : "text-green-500"}`}>
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <SectionCard className="mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 items-end">
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Risk Type</label>
              <div className="relative">
                <select value={selectedRiskCategory} onChange={(e) => setSelectedRiskCategory(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Risk Types</option>
                  {riskFilters.riskCategories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Country / Region</label>
              <div className="relative">
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Countries</option>
                  {riskFilters.countries.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Product / HS Code</label>
              <div className="relative">
                <select value={selectedHSCode} onChange={(e) => setSelectedHSCode(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Products</option>
                  {riskFilters.hsCodes.map((item) => (
                    <option key={item._id} value={item._id}>{item.hsCode} - {item.productName}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase">Risk Level</label>
              <div className="relative">
                <select value={selectedRiskLevel} onChange={(e) => setSelectedRiskLevel(e.target.value)} className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs appearance-none focus:outline-none">
                  <option value="">All Risk Levels</option>
                  {riskFilters.riskLevels.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex gap-2">
              {/*<button className="flex items-center justify-center gap-1.5 bg-slate-50/80 border border-slate-200 text-slate-600 rounded-xl py-2 px-3 text-xs font-semibold hover:bg-slate-100 transition whitespace-nowrap">
                <Sliders size={13} className="text-slate-400" /> More Filters
              </button>*/}
              <button onClick={handleApplyFilters} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl py-2 px-3 transition shadow-xs whitespace-nowrap">
                Apply Filters
              </button>
              <button onClick={handleResetFilters} className="text-slate-400 hover:text-slate-600 text-xs font-medium px-1 whitespace-nowrap">
                Reset
              </button>
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Global Risk Map</h3>
            <div className="relative h-[260px] sm:h-[300px] bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                alt="world map"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(1) brightness(0) invert(0.85)" }}
              />
              {(assessmentResult ? filteredRiskTopCountries : []).map((country, i) => {
                const position = COUNTRY_POSITIONS[country._id];
                 if (!position) return null;
                const riskColor = getRiskColor(country.riskLevel);
                return (
                <div
                  key={i}
                  className="absolute rounded-[40%] opacity-90"
                  style={{
                    top: position.top,
                    left: position.left,
                    width: "35px",
                    height: "35px",
                    backgroundColor:  riskColor,
                    boxShadow: `0 0 18px ${riskColor}`,
                  }}
                  title={`${country._id} | ${country.riskLevel} | Risk Score: ${Number(country.riskScore || 0).toFixed(1)} | Alerts: ${country.alerts || 0}`}
                />);
              })}
              <div className="absolute bottom-2 left-2 bg-white/95 rounded-lg p-2 shadow border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Risk Level</span>
                <div className="space-y-0.5">
                  {riskLegend.length > 0 ? (
                    riskLegend.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[9px] text-slate-500 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </div>
                    ))) : (<div className="text-[9px] text-slate-400">  No risk data</div>
                  )}
                </div>
              </div>
              <div className="absolute bottom-2 right-2 flex flex-col gap-1">
                <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                  <Plus size={12} />
                </button>
                <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                  <Minus size={12} />
                </button>
                <button className="w-6 h-6 bg-white rounded-md shadow flex items-center justify-center text-slate-500">
                  <RotateCw size={11} />
                </button>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Risk Score Distribution</h3>
            <div className="flex items-center gap-3">
              <div className="relative w-[130px] h-[130px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={filteredRiskDistribution} innerRadius={38} outerRadius={58} dataKey="count" stroke="none">
                      {filteredRiskDistribution.map((entry, index) => (
                        <Cell key={index} fill={getRiskColor(entry._id)} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">Total</span>
                  <span className={`font-black text-lg ${HEADING}`}>{filteredRiskDistribution.reduce((total, item) => total + Number(item.count || 0),0)}</span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">Risks</span>
                </div>
              </div>
              <div className="space-y-2 flex-1 text-[10px]">
                {filteredRiskDistribution.map((r, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: getRiskColor(r._id) }} />
                      <span className="text-slate-600 font-semibold">{r._id}</span>
                    </div>
                    <span className={`font-bold ${HEADING}`}>{r.count} ({filteredRiskDistribution.reduce((total, item) => total + Number(item.count || 0), 0) > 0 ? ((Number(r.count) / filteredRiskDistribution.reduce((total, item) => total + Number(item.count || 0), 0)) * 100).toFixed(1) : 0}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Top Risky Countries" />
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[280px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">Country</th>
                    <th className="text-right pb-2 font-bold">Score</th>
                    <th className="text-right pb-2 font-bold">Level</th>
                    <th className="text-left pb-2 pl-3 font-bold">Alerts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRiskTopCountries.map((country, i) => (
                    <tr key={i}>
                      <td className={`py-2 font-semibold whitespace-nowrap ${HEADING}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400">{COUNTRY_CODES[country._id] || "--"}</span>
                          <span>{country._id || "-"}</span>
                        </div>
                      </td>
                      <td className="py-2 text-right font-bold text-slate-700">{Number(country.riskScore || 0).toFixed(1)}</td>
                      <td className="py-2 pl-3"><RiskBadge level={country.riskScore >= 80? "Very High": country.riskScore >= 60? "High" : country.riskScore >= 40? "Medium": country.riskScore >= 20? "Low": "Very Low"}/></td>
                      <td className="py-2 text-right font-bold text-rose-500 whitespace-nowrap"> {country.alerts || 0}</td>
                    </tr>
                  ))}
                  {filteredRiskTopCountries.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-6 text-center text-slate-400 text-xs">0 countries at risk — run Check Risk to load results</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
          <SectionCard>
            <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Risk by Category</h3>
            <div className="space-y-3">
              {(assessmentResult?.by_category?.length
                ? assessmentResult.by_category.map((item) => ({ _id: item.category, Count: item.score, avgRisk: item.score, level: item.level }))
                : assessmentResult
                  ? []
                  : ["Economic", "Regulatory", "Political", "Operational", "Financial"].map((name) => ({ _id: name, Count: 0, avgRisk: 0, level: "Very Low" }))
              ).map((c, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-700">{c._id}</span>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${HEADING}`}>{c.Count ?? c.score ?? 0}</span>
                    <RiskBadge level={c.level || (c.avgRisk >= 80 ? "Very High" : c.avgRisk >= 60 ? "High" : c.avgRisk >= 40 ? "Medium" : c.avgRisk >= 20 ? "Low" : "Very Low")}/>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader title="Recent High Risk Alerts" />
            <div className="space-y-2.5">
              {(assessmentResult?.alerts || []).slice(0, 4).map((a, i) => (
                <div key={a._id || a.title || i} className="flex items-start justify-between gap-2 border border-slate-100 rounded-xl p-2.5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={13} className="text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] text-slate-700 font-semibold leading-snug">{a.title || `${a.category || a.category || "Risk"} risk detected for ${a.country || assessmentResult?.query?.country || "Unknown Country"}`}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{a.detail || a.hsCode?.productName || a.hsCode?.hsCode || a.category || "Risk Alert"}{" "} • {" "}{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : assessmentResult?.generated_on ? new Date(assessmentResult.generated_on).toLocaleDateString() : "-"}</p>
                    </div>
                  </div>
                  <RiskBadge level={a.level || a.riskLevel || "Medium"} />
                </div>
              ))}
              {(!assessmentResult || !(assessmentResult.alerts || []).length) && (
                <p className="py-5 text-center text-xs text-slate-400">0 alerts — run Check Risk to view assessment alerts</p>
              )}
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Risk Trend <span className="text-slate-400 font-normal text-xs">(Overall Score)</span></h3>
              <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600 shrink-0">
                This Month <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>
            <div className="h-[150px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={assessmentResult ? riskTrend : []} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="_id" tick={{ fill: "#94a3b8", fontSize: 8 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} width={30} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgRisk" stroke="#EF4444" strokeWidth={2} dot={{ fill: "#EF4444", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-2.5 mt-2">
              <span className="text-[10px] text-slate-500 font-semibold block">Average Risk Score</span>
              <div className="flex items-center gap-2">
                <span className={`text-base font-black ${HEADING}`}>{assessmentResult ? Number(assessmentResult.overall_risk_score ?? assessmentResult.summary?.average_risk_score ?? 0).toFixed(1) : "0.0"}{" "}/ 100</span>
                <span className="text-[10px] text-rose-500 font-bold">Updated</span>
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>Top Risky HS Codes</h3>
              <button onClick={() => { setAllHsPage(1); setAllHsModalOpen(true); }} className="text-blue-600 text-[11px] font-bold shrink-0">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[260px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold">
                    <th className="text-left pb-2 font-bold">HS Code</th>
                    <th className="text-left pb-2 font-bold">Description</th>
                    <th className="text-right pb-2 font-bold">Score</th>
                    <th className="text-left pb-2 pl-2 font-bold">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {visibleTopHsCodes.map((h, i) => (
                    <tr key={i}>
                      <td className={`py-2 font-semibold whitespace-nowrap ${HEADING}`}>{h.hs_code || h.hsCode || h._id || h.code || "-"}</td>
                      <td className="py-2 text-slate-600">{h.commodity || h.product || h.description || h.productName || "-"}</td>
                      <td className="py-2 text-right font-bold text-slate-700">{Number(h.overall_risk_score ?? h.risk_score ?? h.avgRisk ?? h.score ?? 0).toFixed(1)}</td>
                      <td className="py-2 pl-2"><RiskBadge level={h.risk_level || h.level || ((Number(h.overall_risk_score ?? h.risk_score ?? h.avgRisk ?? h.score ?? 0) >= 80) ? "Very High" : (Number(h.overall_risk_score ?? h.risk_score ?? h.avgRisk ?? h.score ?? 0) >= 60) ? "High" : (Number(h.overall_risk_score ?? h.risk_score ?? h.avgRisk ?? h.score ?? 0) >= 40) ? "Medium" : (Number(h.overall_risk_score ?? h.risk_score ?? h.avgRisk ?? h.score ?? 0) >= 20) ? "Low" : "Very Low")} /></td>
                    </tr>
                  ))}
                  {visibleTopHsCodes.length === 0 && (
                    <tr><td colSpan="4" className="py-5 text-center text-slate-400">0 records — run Check Risk to load HS-code results</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <SectionCard className="mb-4">
          <h3 className={`font-bold text-sm mb-3 ${HEADING}`}>Shipments at Risk</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px] min-w-[980px]">
              <thead>
                <tr className="text-[9px] text-slate-400 uppercase font-bold border-b border-slate-100">
                  <th className="text-left py-2 font-bold">Shipment ID</th>
                  <th className="text-left py-2 font-bold">Date</th>
                  <th className="text-left py-2 font-bold">From</th>
                  <th className="text-left py-2 font-bold">To</th>
                  <th className="text-left py-2 font-bold">HS Code</th>
                  <th className="text-left py-2 font-bold">Product Description</th>
                  <th className="text-left py-2 font-bold">Risk Level</th>
                  <th className="text-right py-2 font-bold">Risk Score</th>
                  <th className="text-left py-2 font-bold">Risk Factors</th>
                  <th className="text-right py-2 font-bold">Est. Impact</th>
                  <th className="text-left py-2 font-bold">Status</th>
                  <th className="text-right py-2 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredShipmentsAtRisk.map((s, i) => (
                  <tr key={s._id || i}>
                    <td className={`py-2.5 font-semibold whitespace-nowrap ${HEADING}`}>{s.shipment?.sbNumber || "-"}</td>
                    <td className="py-2.5 text-slate-500 whitespace-nowrap"> {s.shipment?.shipmentDate ? new Date(s.shipment.shipmentDate).toLocaleDateString(): "-"}</td>
                    <td className="py-2.5 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Flag country={s.shipment?.route?.originCountry} /> {s.shipment?.route?.originCountry || "-"}
                      </span>
                    </td>
                    <td className="py-2.5 whitespace-nowrap">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Flag country={s.shipment?.route?.destinationCountry} /> {s.shipment?.route?.destinationCountry || "-"}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-600 whitespace-nowrap">{s.hsCode?.hsCode || "-"}</td>
                    <td className="py-2.5 text-slate-600 whitespace-nowrap">{s.hsCode?.productName || s.shipment?.cargo?.productName || "-"}</td>
                    <td className="py-2.5"><RiskBadge level={s.riskLevel} /></td>
                    <td className="py-2.5 text-right font-bold text-slate-700">{s.riskScore ?? 0}</td>
                    <td className="py-2.5 text-slate-500 whitespace-nowrap"> {s.riskFactors?.length ? s.riskFactors.join(", ") : "-"}</td>
                    <td className="py-2.5 text-right font-bold text-slate-800 whitespace-nowrap">{s.estimatedImpact ?? 0}</td>
                    <td className="py-2.5"><StatusBadge status={s.status} /></td>
                    <td className="py-2.5 text-right">
                      <button className={`flex items-center gap-1 border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] font-bold ml-auto ${HEADING}`}>
                        View <ChevronRight size={11} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-slate-200 pt-3 pb-2">
          <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
            <Info size={12} /> All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold cursor-pointer">
            <HelpCircle size={12} /> Help Center
          </span>
        </div>
      </div>

      {riskModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/50 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Check trade risk">
          <div className="my-4 w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className={`text-lg font-bold ${HEADING}`}>Check Trade Risk</h2>
                <p className="mt-1 text-xs text-slate-500">Assess risk for an HS code and primary country.</p>
              </div>
              <button type="button" onClick={() => setRiskModalOpen(false)} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-100">Close ✕</button>
            </div>

            <form onSubmit={handleAssessRisk} className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">HS Code *</label>
                <input required value={riskForm.hs_code} onChange={(e) => setRiskForm((v) => ({ ...v, hs_code: e.target.value }))} placeholder="e.g. 09011111" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Product / Commodity</label>
                <input value={riskForm.product} onChange={(e) => setRiskForm((v) => ({ ...v, product: e.target.value }))} placeholder="e.g. Coffee" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Primary Country *</label>
                <input required value={riskForm.country} onChange={(e) => setRiskForm((v) => ({ ...v, country: e.target.value }))} placeholder="e.g. India" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Trade Type *</label>
                <select required value={riskForm.trade_type} onChange={(e) => setRiskForm((v) => ({ ...v, trade_type: e.target.value }))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option value="export">Export</option>
                  <option value="import">Import</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">Extra Countries (comma-separated)</label>
                <input value={riskForm.countries} onChange={(e) => setRiskForm((v) => ({ ...v, countries: e.target.value }))} placeholder="e.g. China, UAE" className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500" />
                <p className="mt-1 text-[11px] text-slate-400">Assessment history recording is enabled automatically.</p>
              </div>
              {riskError && <p className="sm:col-span-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{riskError}</p>}
              <div className="sm:col-span-2 flex justify-end gap-2">
                <button type="button" onClick={() => { setAssessmentResult(null); setRiskError(""); }} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Clear Result</button>
                <button disabled={riskSubmitting} type="submit" className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{riskSubmitting ? "Assessing..." : "Assess Risk"}</button>
              </div>
            </form>


          </div>
        </div>
      )}

      {allHsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/50 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="All top risky HS codes">
          <div className="my-4 w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
              <div><h2 className={`text-lg font-bold ${HEADING}`}>All Top Risky HS Codes</h2><p className="mt-1 text-xs text-slate-500">Latest recorded risk scores · up to 50 records</p></div>
              <button type="button" onClick={() => setAllHsModalOpen(false)} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-500 hover:bg-slate-100">Close ✕</button>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="w-full min-w-[600px] text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] uppercase text-slate-400"><tr><th className="px-3 py-3">HS Code</th><th className="px-3 py-3">Product / Description</th><th className="px-3 py-3">Score</th><th className="px-3 py-3">Risk Level</th><th className="px-3 py-3">Assessment ID</th></tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleAllHsCodes.map((h, i) => {
                      const score = Number(h.overall_risk_score ?? h.risk_score ?? h.avgRisk ?? h.score ?? 0);
                      return <tr key={h.id || h.assessment_id || h._id || i}><td className="px-3 py-3 font-bold text-slate-700">{h.hs_code || h.hsCode || h._id || h.code || "—"}</td><td className="px-3 py-3">{h.commodity || h.product || h.description || h.productName || "—"}</td><td className="px-3 py-3 font-semibold">{score}</td><td className="px-3 py-3"><RiskBadge level={h.risk_level || h.level || (score >= 80 ? "Very High" : score >= 60 ? "High" : score >= 40 ? "Medium" : score >= 20 ? "Low" : "Very Low")} /></td><td className="px-3 py-3">{h.assessment_id || "—"}</td></tr>;
                    })}
                    {visibleAllHsCodes.length === 0 && <tr><td colSpan="5" className="px-3 py-8 text-center text-slate-400">No HS-code risk records found.</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] text-slate-500">Showing {dashboardHsRows.length ? (allHsPage - 1) * topHsPageSize + 1 : 0}–{Math.min(allHsPage * topHsPageSize, dashboardHsRows.length)} of {dashboardHsRows.length} records · 10 per page</span>
                <div className="flex gap-2">
                  <button type="button" disabled={allHsPage <= 1} onClick={() => setAllHsPage((p) => Math.max(1, p - 1))} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs disabled:opacity-40">Previous</button>
                  <span className="self-center text-xs text-slate-500">Page {allHsPage} / {allHsPageCount}</span>
                  <button type="button" disabled={allHsPage >= allHsPageCount} onClick={() => setAllHsPage((p) => Math.min(allHsPageCount, p + 1))} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs disabled:opacity-40">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {exportReport && (
        <ExportReport onClose={() => setExportReport(false)} />
      )}
    </div>
  );
}