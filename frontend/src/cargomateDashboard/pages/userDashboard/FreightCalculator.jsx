
import React, { useState } from "react";
import CargoMateAPI from "../../api/CargoMateApi";

import plane from "../../assets/Images/webp/plane.webp";
import blueship from "../../assets/Images/webp/blueship.webp";
import orangeship from "../../assets/Images/webp/orangeship.webp";
import NeedHelp from "../../components/core/NeedHelp";
import Shipment from "../../components/ShipmentForm";
import DashboardAdPlacement from "../../components/DashboardAdPlacement";
import poster2 from "../../assets/Images/webp/poster2.webp";
import poster from "../../assets/Images/webp/poster3.webp";

const Icon = ({
  d,
  d2,
  className = "w-4 h-4",
  viewBox = "0 0 24 24",
  fill = "none",
  stroke = "currentColor",
}) => (
  <svg className={className} fill={fill} stroke={stroke} viewBox={viewBox}>
    <path d={d} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    {d2 && (
      <path
        d={d2}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    )}
  </svg>
);

function HeaderActions({ setShipment, setActiveTab, onOpenFreight }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onOpenFreight}
        className="px-4 py-2 bg-white border border-teal-600 text-teal-700 rounded-md text-xs font-bold hover:bg-teal-50"
      >
        Freight Calculate
      </button>
      <button
        onClick={() => {
          setShipment("shipment");
          setActiveTab("");
        }}
        className="px-4 py-2 bg-teal-600 text-white rounded-md text-xs font-bold hover:bg-teal-700"
      >
        Create Shipment
      </button>
    </div>
  );
}

function AiBanner() {
  return (
    <div className="bg-teal-50 border border-teal-200 p-3 rounded-md flex items-center gap-3 mb-6">
      <Icon
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        className="w-5 h-5 text-teal-600"
      />
      <p className="text-xs text-teal-700 font-medium">
        This result is AI-generated based on the data sources and assumptions
        listed below. Please review before making any trade decisions.
      </p>
    </div>
  );
}

function SearchSummary({ result, form }) {
  const query = result?.query || form;
  const fields = [
    { label: "Origin", value: query?.origin || "—" },
    { label: "Destination", value: query?.destination || "—" },
    { label: "Shipment Type", value: result?.best_mode || "—" },
    { label: "Commodity", value: query?.commodity || query?.product || "—" },
    {
      label: "Weight / Volume",
      value: `${query?.weight_kg ?? "—"} kg${query?.volume_cbm != null ? ` / ${query.volume_cbm} CBM` : ""}`,
    },
    { label: "Incoterm", value: query?.incoterm || "—" },
  ];
  const generated = result?.generated_on
    ? new Date(result.generated_on).toLocaleString()
    : "Not calculated yet";
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 items-center">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              className="w-6 h-6 text-blue-600"
            />
          </div>
          <div className="w-full">
            <h3 className="font-bold text-sm">Your Search</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-3 gap-x-4 mt-4 text-sm">
              {fields.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-gray-500 uppercase text-[9px] font-bold tracking-wider mb-1">
                    {label}
                  </p>
                  <p className="font-bold text-xs break-words">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between text-xs text-gray-500 gap-2">
        <span className="text-[#94A3B8]">
          Search ID:{" "}
          <span className="font-mono">{result?.search_id || "—"}</span>
        </span>
        <span className="text-[#94A3B8]">{generated}</span>
      </div>
    </section>
  );
}

function FreightCard({
  badge,
  badgeClass,
  outerBorderClass,
  iconBg,
  iconColor,
  iconD,
  title,
  subtitle,
  subtitleColor,
  price,
  priceColor,
  departure,
  arrival,
  viewBtnClass,
  viewBorderClass,
  viewHoverClass,
}) {
  return (
    <div
      className={`border-2 rounded-xl p-3 py-4 relative ${outerBorderClass}`}
    >
      <span
        className={`absolute top-1 right-1   text-[10px] font-bold px-2 py-1 rounded-full uppercase ${badgeClass}`}
      >
        {badge}
      </span>
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border ${iconBg}`}
        >
          <img src={iconD} />
        </div>
        <div>
          <h4 className="font-bold text-sm">{title}</h4>
          <p className={`text-[10px] font-medium ${subtitleColor}`}>
            {subtitle}
          </p>
        </div>
      </div>
      <div className={`text-xl font-bold mb-4 ${priceColor}`}>{price}</div>
      <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 mb-4">
        {[
          ["Transit Time", "3 - 5 Days"],
          ["Est. Departure", departure],
          ["Est. Arrival", arrival],
        ].map(([lbl, val]) => (
          <div key={lbl}>
            <p className="uppercase text-[9px] font-bold mb-1">{lbl}</p>
            <p className="text-gray-900 text-[9px] font-semibold">{val}</p>
          </div>
        ))}
      </div>
      <button
        className={`w-full text-xs font-bold mb-3 border py-2 rounded-md ${viewBtnClass} ${viewBorderClass} ${viewHoverClass}`}
      >
        View Details
      </button>
      <button className="w-full bg-teal-600 text-white text-xs font-bold py-2.5 rounded-md hover:bg-teal-700">
        Select &amp; Create Shipment
      </button>
    </div>
  );
}

function FreightOptions({ result, onSelectOption, onViewDetails }) {
  const [activeTab, setActiveTab] = useState("freight");
  const [currency, setCurrency] = useState("");
  const options = result?.options || [];
  const selectedCurrency =
    currency ||
    result?.query?.currency ||
    result?.result_summary?.currency ||
    "INR";
  const money = (value) =>
    `${selectedCurrency} ${Number(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  const palettes = [
    {
      badgeClass: "bg-green-100 text-green-700",
      outerBorderClass: "border-teal-200",
      iconBg: "bg-green-50 border-green-100",
      iconD: plane,
      subtitleColor: "text-green-600",
      priceColor: "text-green-600",
      viewBtnClass: "text-teal-600",
      viewBorderClass: "border-teal-200",
      viewHoverClass: "hover:bg-teal-50",
    },
    {
      badgeClass: "bg-blue-100 text-blue-700",
      outerBorderClass: "border-gray-200",
      iconBg: "bg-blue-50 border-blue-100",
      iconD: blueship,
      subtitleColor: "text-blue-600",
      priceColor: "text-blue-700",
      viewBtnClass: "text-blue-700",
      viewBorderClass: "border-blue-200",
      viewHoverClass: "hover:bg-blue-50",
    },
    {
      badgeClass: "bg-orange-100 text-orange-700",
      outerBorderClass: "border-gray-200",
      iconBg: "bg-orange-50 border-orange-100",
      iconD: orangeship,
      subtitleColor: "text-orange-600",
      priceColor: "text-orange-700",
      viewBtnClass: "text-orange-700",
      viewBorderClass: "border-orange-200",
      viewHoverClass: "hover:bg-orange-50",
    },
  ];
  const displayOptions = options.map((option, index) => {
    const palette = palettes[index % palettes.length];
    const mode = option.mode || option.type || `Freight option ${index + 1}`;
    const badge =
      option.badge ||
      (index === 0
        ? "BEST VALUE"
        : index === 1
          ? "BEST BALANCE"
          : "LOWEST COST");
    const breakdown = option.breakdown || {};
    const costRows = Object.entries(breakdown).map(([key, value]) => [
      key.replace(/_/g, " "),
      money(value),
    ]);
    const transit = option.transit_time_days ?? option.transitTime ?? "—";
    const card = {
      ...palette,
      badge,
      title: mode,
      subtitle: option.label || "Estimated freight",
      price: money(option.total_cost ?? option.cost),
      departure: option.est_departure || option.departure || "—",
      arrival: option.est_arrival || option.arrival || "—",
      transit,
      costPerKg: money(option.cost_per_kg),
      surcharges: money(option.surcharges_and_fees),
      costRows,
      raw: option,
    };
    if (mode === result?.best_mode)
      card.outerBorderClass = "border-teal-300 ring-1 ring-teal-100";
    return card;
  });
  const activeOptions =
    activeTab === "cost"
      ? displayOptions.map((o) => ({
          ...o,
          subtitle: "Cost Breakdown",
          price: o.surcharges,
          departure: `Base / fees`,
          arrival: `${Object.keys(o.raw.breakdown || {}).length} cost components`,
        }))
      : activeTab === "transit"
        ? displayOptions.map((o) => ({
            ...o,
            subtitle: "Transit Time",
            price: `${o.transit}${String(o.transit).toLowerCase().includes("day") ? "" : " days"}`,
          }))
        : displayOptions;

  return (
    <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div>
        <div className="flex flex-wrap items-center border-b border-gray-200">
          {[
            ["freight", "Freight Options"],
            ["cost", "Cost Breakdown"],
            ["transit", "Transit Time Comparison"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 md:px-6 py-4 text-xs font-semibold ${activeTab === key ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-500 hover:text-gray-900"}`}
            >
              {label}
            </button>
          ))}
          <div className="ml-auto flex items-center px-3 py-2">
            <span className="text-xs text-gray-500 mr-2">Currency:</span>
            <select
              value={selectedCurrency}
              onChange={(e) => setCurrency(e.target.value)}
              className="text-xs font-bold border-gray-200 rounded px-2 py-1"
            >
              <option>INR</option>
              <option>USD</option>
              <option>AED</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>
        {!result && (
          <div className="p-8 text-center text-sm text-gray-500">
            Click <strong>Freight Calculate</strong> to fetch live estimate
            options.
          </div>
        )}
        {result && displayOptions.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            No freight options were returned by the API.
          </div>
        )}
        {activeOptions.length > 0 && (
          <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeOptions.map((card, index) => (
              <div
                key={`${card.title}-${index}`}
                className={`border-2 rounded-xl p-3 py-4 relative ${card.outerBorderClass}`}
              >
                <span
                  className={`absolute top-1 right-1 text-[10px] font-bold px-2 py-1 rounded-full uppercase ${card.badgeClass}`}
                >
                  {card.badge}
                </span>
                <div className="flex items-center gap-3 mb-4 pr-12">
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center border ${card.iconBg}`}
                  >
                    <img
                      src={card.iconD}
                      alt=""
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{card.title}</h4>
                    <p
                      className={`text-[10px] font-medium ${card.subtitleColor}`}
                    >
                      {card.subtitle}
                    </p>
                  </div>
                </div>
                <div className={`text-xl font-bold mb-4 ${card.priceColor}`}>
                  {card.price}
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 mb-4">
                  {[
                    ["Transit Time", card.transit],
                    ["Est. Departure", card.departure],
                    ["Est. Arrival", card.arrival],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="uppercase text-[9px] font-bold mb-1">
                        {label}
                      </p>
                      <p className="text-gray-900 text-[9px] font-semibold">
                        {value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
                {activeTab === "cost" && (
                  <div className="mb-3 space-y-1 border-t pt-2 text-xs">
                    {card.costRows.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex justify-between gap-2 capitalize"
                      >
                        <span className="text-gray-500">{label}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "freight" && (
                  <>
                    <div className="mb-3 text-xs text-gray-500">
                      Cost / kg:{" "}
                      <strong className="text-gray-900">
                        {card.costPerKg}
                      </strong>
                    </div>
                    <div className="mb-3 text-xs text-gray-500">
                      Surcharges & fees:{" "}
                      <strong className="text-gray-900">
                        {card.surcharges}
                      </strong>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => onViewDetails?.(card.raw)}
                  className={`w-full text-xs font-bold mb-3 border py-2 rounded-md ${card.viewBtnClass} ${card.viewBorderClass} ${card.viewHoverClass}`}
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => onSelectOption?.(card.raw)}
                  className="w-full bg-teal-600 text-white text-xs font-bold py-2.5 rounded-md hover:bg-teal-700"
                >
                  Select &amp; Create Shipment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


function KeyAssumptions({ result }) {
  // Bind directly to the assumptions returned by GET /freight/estimate.
  const items = Array.isArray(result?.assumptions) ? result.assumptions : [];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h4 className="font-bold text-sm mb-4">Key Assumptions</h4>
      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${index}-${item}`}
              className="flex items-start gap-2 text-[10px] font-medium"
            >
              <Icon
                d="M5 13l4 4L19 7"
                className="w-3 h-3 text-green-500 mt-0.5 shrink-0"
              />
              <span className="text-[#475569]">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-gray-500">
          Assumptions will appear here after freight is calculated.
        </p>
      )}
    </div>
  );
}

function DataSources({ result }) {
  // The API returns source identifiers, e.g. ["openai_estimate"].
  const sourceLabels = {
    openai_estimate: "OpenAI Estimate",
    airline_tariff_database: "Airline Tariff Database",
    shipping_lines_tariff: "Shipping Lines Tariff",
    freightos_marketplace: "Freightos Marketplace",
    iata_rate_sheets: "IATA Rate Sheets",
    port_airport_charges: "Port & Airport Charges",
  };
  const sourceIcon =
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z";
  const sourceIds = Array.isArray(result?.sources) ? result.sources : [];
  const sources = sourceIds.map((source) => ({
    id: source,
    label:
      sourceLabels[source] ||
      source
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h4 className="font-bold text-sm mb-4">Data Sources</h4>
      {sources.length > 0 ? (
        <div className="space-y-4">
          {sources.map(({ id, label }) => (
            <div key={id} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                <Icon d={sourceIcon} className="w-4 h-4 text-gray-500" />
              </div>
              <span className="text-xs text-[#475569] font-semibold">
                {label}
              </span>
              <span className="ml-auto rounded bg-teal-50 px-2 py-1 text-[9px] font-bold text-teal-700">
                API
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500">
          Data sources will appear here after freight is calculated.
        </p>
      )}
    </div>
  );
}

function ResultSummary({ setActiveTab, setShipment, result }) {
  const summary = result?.result_summary || {};
  const currency = summary.currency || result?.query?.currency || "INR";
  const money = (value) =>
    `${currency} ${Number(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  const rows = [
    {
      iconD: "M13 10V3L4 14h7v7l9-11h-7z",
      iconColor: "text-blue-500",
      label: "Best Mode",
      value: result?.best_mode || "—",
    },
    {
      iconD:
        "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
      iconColor: "text-blue-500",
      label: "Recommended Route",
      value: result?.recommended_route || "—",
    },
    {
      iconD: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      iconColor: "text-blue-500",
      label: "Estimated Transit Time",
      value: summary.estimated_transit_time_days
        ? `${summary.estimated_transit_time_days} Days`
        : "—",
    },
    {
      iconD:
        "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
      iconColor: "text-orange-500",
      label: "Total Landed Cost (EST.)",
      value:
        summary.total_landed_cost != null
          ? money(summary.total_landed_cost)
          : "—",
    },
    {
      iconD: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      iconColor: "text-green-500",
      label: "Cost Per Kg",
      value: summary.cost_per_kg != null ? money(summary.cost_per_kg) : "—",
    },
    {
      iconD:
        "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      iconColor: "text-teal-500",
      label: "Surcharge & Fees",
      value:
        summary.surcharges_and_fees != null
          ? money(summary.surcharges_and_fees)
          : "—",
    },
    {
      iconD:
        "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      iconColor: "text-blue-500",
      label: "Search Reference",
      value: result?.search_id || "—",
    },
  ];
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-bold text-sm mb-6">Result Summary</h3>
      <div className="space-y-4">
        {rows.map(({ iconD, iconColor, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className={iconColor}>
              <Icon d={iconD} className="w-5 h-5" />
            </div>
            <div className="flex-1 flex justify-between gap-3">
              <span className="text-xs font-medium text-gray-500">{label}</span>
              <span className="text-xs font-bold text-right break-words">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setShipment("shipment");
          setActiveTab("");
        }}
        className="w-full bg-teal-600 text-white font-bold py-3 text-xs rounded-lg mt-6 hover:bg-teal-700"
      >
        Create Shipment
      </button>
      {result?.disclaimer && (
        <p className="mt-3 text-[10px] leading-4 text-gray-500">
          {result.disclaimer}
        </p>
      )}
    </section>
  );
}

function ReportInformation() {
  const rows = [
    { label: "Report ID", value: "INC-2025-04-24-000123" },
    { label: "Generated On", value: "24 Apr 2025, 09:25 AM" },
    { label: "Generated By", value: "Arjun Soni" },
    { label: "Plan", value: "Pro Plan" },
    { label: "AI Model Version", value: "v2.1.0" },
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-bold text-sm mb-4">Report Information</h3>
      <div className="space-y-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between text-xs">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
      <button
        className="w-full border border-teal-600 text-teal-600 font-bold  text-xs
      py-2.5 rounded-lg mt-6 flex items-center justify-center gap-2 hover:bg-teal-50"
      >
        <Icon d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        Download Report (PDF)
      </button>
    </section>
  );
}

function SaveShare() {
  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="font-bold text-sm mb-1">Save &amp; Share</h3>
      <p className="text-[10px] text-gray-500 mb-4">
        Save this report for future reference or share with your team.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg text-xs font-bold hover:bg-gray-50">
          <Icon d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          Save to Reports
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg text-xs font-bold hover:bg-gray-50">
          <Icon d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          Share Report
        </button>
      </div>
    </section>
  );
}

function AuditLog() {
  const events = [
    "Search Submitted by Arjun Soni",
    "Data Validated",
    "Incentives Matched",
    "Result Generated",
  ];

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-sm">
          Audit Log <span className="text-xs font-normal text-gray-500"></span>
        </h3>
        <a href="#" className="text-teal-600 text-[10px] font-bold">
          View All
        </a>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event} className="flex items-start gap-3">
            <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 shrink-0" />
            <div className="flex-1 flex justify-between text-[10px]">
              <span className="font-medium text-gray-900">{event}</span>
              <span className="text-gray-500 uppercase">09:25 AM</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DataSourcesUsedCard() {
  const sources = [
    "DGFT (India)",
    "ICEGATE",
    "Shipping Lines",
    "Customs (UAE)",
    "Trade APIs",
    "Market Data",
  ];
  return (
    <section className="h-full min-w-0 rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h4 className="text-sm font-bold">Data Sources Used</h4>
        <button
          type="button"
          className="shrink-0 text-xs font-semibold text-teal-600 hover:underline"
        >
          View All Sources
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        {sources.map((source) => (
          <div
            key={source}
            className="flex min-w-0 items-center gap-2 text-xs text-slate-600"
          >
            <Icon
              d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 014 15.5z M4 15.5A2.5 2.5 0 016.5 13H20"
              className="h-3.5 w-3.5 shrink-0"
            />
            <span className="break-words">{source}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConnectedToLiveDataCard() {
  return (
    <section className="h-full min-w-0 rounded-xl border border-gray-200 bg-white p-5">
      <h4 className="mb-4 text-sm font-bold">Connected To Live Data</h4>
      <p className="text-xs leading-5 text-slate-600">
        All modules are connected to backend systems and databases for
        real-time, accurate information.
      </p>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Connected
      </div>
    </section>
  );
}

function PageFooter() {
  return (
    <footer className="grid w-full min-w-0 grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
      <DataSourcesUsedCard />
      <ConnectedToLiveDataCard />
      <section className="relative flex h-full min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-5">
        {/* <div className="relative z-10 min-w-0 max-w-[68%]"> */}
        <NeedHelp
          mobile={"+91 22 1234 5678"}
          para={"Our trade experts are here to help you."}
          heading={"Need help?"}
        />
        {/* </div> */}
      </section>
    </footer>
  );
}

export default function FreightCalculatorResult() {
  const [shipment, setShipment] = useState("");
  const [activeTab, setActiveTab] = useState("Freight Calculator");
  const [showFreightForm, setShowFreightForm] = useState(true);
  const [selectedFreightOption, setSelectedFreightOption] = useState(null);
  const [freightLoading, setFreightLoading] = useState(false);
  const [freightError, setFreightError] = useState("");
  const [freightResult, setFreightResult] = useState(null);
  const [freightForm, setFreightForm] = useState({
    origin: "India",
    destination: "UAE",
    weight_kg: "5000",
    volume_cbm: "12",
    commodity: "cotton t-shirt",
    incoterm: "FOB",
    currency: "INR",
  });

  const openFreightForm = () => {
    setFreightError("");
    setShowFreightForm(true);
  };
  const calculateFreight = async (event) => {
    event.preventDefault();
    const payload = {
      origin: freightForm.origin.trim(),
      destination: freightForm.destination.trim(),
      weight_kg: Number(freightForm.weight_kg),
      volume_cbm: Number(freightForm.volume_cbm),
      commodity: freightForm.commodity.trim(),
      incoterm: freightForm.incoterm,
      currency: freightForm.currency,
    };
    if (
      !payload.origin ||
      !payload.destination ||
      !payload.commodity ||
      !Number.isFinite(payload.weight_kg) ||
      payload.weight_kg <= 0 ||
      !Number.isFinite(payload.volume_cbm) ||
      payload.volume_cbm < 0
    ) {
      setFreightError(
        "Please fill all required fields. Weight must be greater than zero and volume cannot be negative.",
      );
      return;
    }
    setFreightLoading(true);
    setFreightError("");
    try {
      // Swagger specifies GET /freight/estimate with query parameters.
      const response = await CargoMateAPI.get("/freight/estimate", {
        params: payload,
      });
      const body = response?.data?.data ?? response?.data;
      if (!body || !Array.isArray(body.options))
        throw new Error(
          body?.message ||
            "Freight API returned an unexpected response. Expected an options array.",
        );
      setFreightResult(body);
      setShowFreightForm(false);
    } catch (error) {
      const data = error?.response?.data;
      setFreightError(
        data?.message ||
          data?.detail ||
          (typeof data === "string" ? data : "") ||
          error?.message ||
          "Unable to calculate freight. Check API URL and server status.",
      );
    } finally {
      setFreightLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-900 antialiased overflow-y-auto pt-10">
      {activeTab === "Freight Calculator" && (
        <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8">
          <header className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Freight Calculator
                </h1>
                <p className="text-gray-500 text-xs">
                  Get accurate freight estimates and compare the best shipping
                  options.
                </p>
              </div>
              <HeaderActions
                setActiveTab={setActiveTab}
                setShipment={setShipment}
                onOpenFreight={openFreightForm}
              />
            </div>
          </header>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <main className="min-w-0 space-y-6 lg:col-span-8">
              <SearchSummary result={freightResult} form={freightForm} />
              <FreightOptions
                result={freightResult}
                onViewDetails={(option) => {
                  setSelectedFreightOption(option);
                  openFreightForm();
                }}
                onSelectOption={(option) => {
                  setSelectedFreightOption(option);
                  setShowFreightForm(false);
                  setShipment("shipment");
                  setActiveTab("");
                }}
              />
              <section className="mt-6 grid grid-cols-2 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-2">
                <KeyAssumptions result={freightResult} />
                <DataSources result={freightResult} />
              </section>
            </main>
            <aside className="min-w-0 space-y-6 lg:col-span-4">
              <ResultSummary
                setActiveTab={setActiveTab}
                setShipment={setShipment}
                result={freightResult}
              />

              <DashboardAdPlacement
                location="User Dashboard - Freight Calculator"
                layout="sidebar"
                slot="sidebar"
              />
              <ReportInformation />
            </aside>
          </div>
          <div className="mt-6">
            <DashboardAdPlacement
              location="User Dashboard - Freight Calculator"
              layout="banner"
              slot="banner"
            />
          </div>
          <div className="mt-6">
            <PageFooter />
          </div>
        </div>
      )}
      {shipment === "shipment" && (
        <div>
          <Shipment
            setActiveTab={setActiveTab}
            setShipment={setShipment}
            currentTab={"Freight Calculator"}
            selectedFreightOption={selectedFreightOption}
          />
        </div>
      )}

      {showFreightForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Freight Calculate
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Enter shipment details to compare available freight options.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFreightForm(false)}
                className="rounded-md px-2 text-2xl leading-none text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form onSubmit={calculateFreight} className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    key: "origin",
                    label: "Country of Origin",
                    placeholder: "e.g. India",
                    type: "text",
                  },
                  {
                    key: "destination",
                    label: "Country of Destination",
                    placeholder: "e.g. UAE",
                    type: "text",
                  },
                  {
                    key: "weight_kg",
                    label: "Weight (kg)",
                    placeholder: "e.g. 5000",
                    type: "number",
                  },
                  {
                    key: "volume_cbm",
                    label: "Volume (CBM)",
                    placeholder: "e.g. 12",
                    type: "number",
                  },
                  {
                    key: "commodity",
                    label: "Product / Commodity",
                    placeholder: "e.g. cotton t-shirt",
                    type: "text",
                  },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-1.5 block text-xs font-bold text-gray-700">
                      {field.label}
                    </span>
                    <input
                      required
                      type={field.type}
                      min={
                        field.type === "number"
                          ? field.key === "volume_cbm"
                            ? "0"
                            : "0.01"
                          : undefined
                      }
                      step={field.type === "number" ? "any" : undefined}
                      value={freightForm[field.key]}
                      onChange={(e) =>
                        setFreightForm((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-gray-700">
                    Incoterm
                  </span>
                  <select
                    value={freightForm.incoterm}
                    onChange={(e) =>
                      setFreightForm((prev) => ({
                        ...prev,
                        incoterm: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                  >
                    {[
                      "EXW",
                      "FCA",
                      "FAS",
                      "FOB",
                      "CFR",
                      "CIF",
                      "CPT",
                      "CIP",
                      "DAP",
                      "DPU",
                      "DDP",
                    ].map((term) => (
                      <option key={term}>{term}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-gray-700">
                    Currency
                  </span>
                  <select
                    value={freightForm.currency}
                    onChange={(e) =>
                      setFreightForm((prev) => ({
                        ...prev,
                        currency: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm"
                  >
                    {["INR", "USD", "AED", "EUR", "GBP", "CNY"].map(
                      (currency) => (
                        <option key={currency}>{currency}</option>
                      ),
                    )}
                  </select>
                </label>
              </div>
              {freightError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {freightError}
                </div>
              )}
              <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowFreightForm(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={freightLoading}
                  className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-700 disabled:opacity-60"
                >
                  {freightLoading ? "Calculating..." : "Calculate Freight"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
