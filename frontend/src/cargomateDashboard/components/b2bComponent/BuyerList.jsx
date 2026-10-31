import React, { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { MoreVertical, X } from "lucide-react";

const initialBuyers = [
  {
    id: 1,
    name: "Amazon Europe S.à r.l.",
    country: "DE",
    type: "Distributor",
    products: "Electronics, Home Appliances",
    tradeValue: "₹ 125.45 Cr",
    shipments: 124,
    score: 92,
    status: "Active",
  },
  {
    id: 2,
    name: "Walmart Inc.",
    country: "US",
    type: "Retailer",
    products: "Apparel, Footwear",
    tradeValue: "₹ 98.76 Cr",
    shipments: 96,
    score: 88,
    status: "Active",
  },
  {
    id: 3,
    name: "Carrefour SA",
    country: "FR",
    type: "Retailer",
    products: "Food Products, Beverages",
    tradeValue: "₹ 76.32 Cr",
    shipments: 78,
    score: 85,
    status: "Active",
  },
  {
    id: 4,
    name: "Alibaba Group",
    country: "CN",
    type: "E-commerce",
    products: "Electronics, Machinery",
    tradeValue: "₹ 64.18 Cr",
    shipments: 62,
    score: 83,
    status: "Active",
  },
  {
    id: 5,
    name: "Target Corporation",
    country: "US",
    type: "Retailer",
    products: "Home & Kitchen, Toys",
    tradeValue: "₹ 52.09 Cr",
    shipments: 54,
    score: 80,
    status: "Active",
  },
  {
    id: 6,
    name: "Costco Wholesale",
    country: "US",
    type: "Wholesaler",
    products: "Electronics, Furniture",
    tradeValue: "₹ 47.28 Cr",
    shipments: 49,
    score: 78,
    status: "Active",
  },
  {
    id: 7,
    name: "Tesco PLC",
    country: "GB",
    type: "Retailer",
    products: "Food Products, Personal Care",
    tradeValue: "₹ 36.75 Cr",
    shipments: 38,
    score: 72,
    status: "Active",
  },
  {
    id: 8,
    name: "Metro AG",
    country: "DE",
    type: "Wholesaler",
    products: "Machinery, Tools",
    tradeValue: "₹ 32.10 Cr",
    shipments: 34,
    score: 70,
    status: "Active",
  },
];

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-600",
};

export default function BuyerListModal({ isOpen, onClose }) {
  const [buyers, setBuyers] = useState(initialBuyers);
  const [selectedBuyers, setSelectedBuyers] = useState([]);
  const [openAction, setOpenAction] = useState(null);

  if (!isOpen) return null;

  // Select / unselect single buyer
  const toggleBuyer = (id) => {
    setSelectedBuyers((prev) =>
      prev.includes(id)
        ? prev.filter((buyerId) => buyerId !== id)
        : [...prev, id]
    );
  };

  // Select / unselect all
  const toggleAll = () => {
    if (selectedBuyers.length === buyers.length) {
      setSelectedBuyers([]);
    } else {
      setSelectedBuyers(buyers.map((buyer) => buyer.id));
    }
  };

  // View buyer
  const handleView = (buyer) => {
    console.log("View buyer:", buyer);
    setOpenAction(null);
  };

  // Edit buyer
  const handleEdit = (buyer) => {
    console.log("Edit buyer:", buyer);
    setOpenAction(null);
  };

  // Delete buyer
  const handleDelete = (id) => {
    console.log("Delete buyer:", id);

    setBuyers((prev) =>
      prev.filter((buyer) => buyer.id !== id)
    );

    setSelectedBuyers((prev) =>
      prev.filter((buyerId) => buyerId !== id)
    );

    setOpenAction(null);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className="
          relative
          w-full
          max-w-[1100px]
          max-h-[95vh]
          bg-white
          rounded-lg
          shadow-2xl
          border
          border-slate-200
          overflow-hidden
        "
      >
        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-slate-100">
          <h2 className="text-base sm:text-lg font-bold text-[#081B6B]">
            Buyer List (3,145)
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              p-1
              rounded-md
              text-slate-900
              hover:bg-slate-100
              transition
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* ================= TABLE ================= */}
        <div className="px-3 sm:px-4 pb-4">
          <div className="overflow-x-auto max-h-[80vh] overflow-y-auto">
            <table className="w-full min-w-[1050px] border-collapse">
              
              {/* ================= THEAD ================= */}
              <thead className="sticky top-0 bg-white z-20">
                <tr className="border-b border-slate-200">

                  {/* Checkbox */}
                  <th className="w-[42px] px-2 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={
                        buyers.length > 0 &&
                        selectedBuyers.length === buyers.length
                      }
                      onChange={toggleAll}
                      className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                    />
                  </th>

                  {/* Buyer Name */}
                  <th className="text-left text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3 whitespace-nowrap">
                    Buyer Name
                  </th>

                  {/* Country */}
                  <th className="text-left text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3">
                    Country
                  </th>

                  {/* Type */}
                  <th className="text-left text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3">
                    Type
                  </th>

                  {/* Products */}
                  <th className="text-left text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3">
                    Top Products
                  </th>

                  {/* Trade Value */}
                  <th className="text-left text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3">
                    <span className="block">Trade Value</span>
                    <span className="block">(INR)</span>
                  </th>

                  {/* Shipments */}
                  <th className="text-left text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3">
                    Shipments
                  </th>

                  {/* Score */}
                  <th className="text-left text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3">
                    <span className="block">Buyer</span>
                    <span className="block">Score</span>
                  </th>

                  {/* Status */}
                  <th className="text-left text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3">
                    Status
                  </th>

                  {/* Actions */}
                  <th className="text-center text-[11px] sm:text-xs font-bold text-[#081B6B] px-3 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* ================= TBODY ================= */}
              <tbody>
                {buyers.map((buyer, index) => (
                  <tr
                    key={buyer.id}
                    className={`
                      border-b border-slate-200
                      hover:bg-slate-50
                      transition
                      ${
                        index === buyers.length - 1
                          ? "border-b-0"
                          : ""
                      }
                    `}
                  >
                    {/* Checkbox */}
                    <td className="px-2 py-3.5 text-center">
                      <input
                        type="checkbox"
                        checked={selectedBuyers.includes(buyer.id)}
                        onChange={() => toggleBuyer(buyer.id)}
                        className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                      />
                    </td>

                    {/* Buyer Name */}
                    <td className="px-3 py-3.5">
                      <div className="max-w-[145px] text-[11px] sm:text-xs font-medium text-[#081B6B] leading-tight">
                        {buyer.name}
                      </div>
                    </td>

                    {/* Country Flag */}
                    <td className="px-3 py-3.5">
                      <ReactCountryFlag
                        countryCode={buyer.country}
                        svg
                        title={buyer.country}
                        style={{
                          width: "17px",
                          height: "13px",
                          objectFit: "cover",
                        }}
                      />
                    </td>

                    {/* Type */}
                    <td className="px-3 py-3.5 text-[11px] sm:text-xs text-[#081B6B] whitespace-nowrap">
                      {buyer.type}
                    </td>

                    {/* Top Products */}
                    <td className="px-3 py-3.5">
                      <div className="max-w-[145px] text-[11px] sm:text-xs text-[#081B6B] leading-tight">
                        {buyer.products}
                      </div>
                    </td>

                    {/* Trade Value */}
                    <td className="px-3 py-3.5 text-[11px] sm:text-xs text-[#081B6B] whitespace-nowrap">
                      {buyer.tradeValue}
                    </td>

                    {/* Shipments */}
                    <td className="px-3 py-3.5 text-[11px] sm:text-xs text-[#081B6B]">
                      {buyer.shipments}
                    </td>

                    {/* Buyer Score */}
                    <td className="px-3 py-3.5">
                      <span className="inline-flex items-center justify-center min-w-[37px] px-2 py-1 rounded-md bg-green-100 text-green-600 text-[11px] font-semibold">
                        {buyer.score}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3.5">
                      <span
                        className={`
                          inline-flex
                          items-center
                          justify-center
                          px-2.5
                          py-1
                          rounded-md
                          text-[11px]
                          font-semibold
                          whitespace-nowrap
                          ${statusStyles[buyer.status]}
                        `}
                      >
                        {buyer.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3.5 text-center relative">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenAction(
                            openAction === buyer.id
                              ? null
                              : buyer.id
                          )
                        }
                        className="
                          p-1
                          rounded-md
                          hover:bg-slate-100
                          transition
                        "
                      >
                        <MoreVertical
                          size={16}
                          className="text-[#081B6B]"
                        />
                      </button>

                      {/* Action Dropdown */}
                      {openAction === buyer.id && (
                        <div
                          className="
                            absolute
                            right-3
                            top-10
                            z-50
                            w-28
                            bg-white
                            border
                            border-slate-200
                            rounded-lg
                            shadow-lg
                            overflow-hidden
                            text-left
                          "
                        >
                          <button
                            type="button"
                            onClick={() => handleView(buyer)}
                            className="
                              w-full
                              px-3
                              py-2
                              text-xs
                              text-slate-700
                              hover:bg-slate-50
                            "
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEdit(buyer)}
                            className="
                              w-full
                              px-3
                              py-2
                              text-xs
                              text-slate-700
                              hover:bg-slate-50
                            "
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(buyer.id)}
                            className="
                              w-full
                              px-3
                              py-2
                              text-xs
                              text-red-500
                              hover:bg-red-50
                            "
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

                {buyers.length === 0 && (
                  <tr>
                    <td
                      colSpan="10"
                      className="text-center py-10 text-sm text-slate-400"
                    >
                      No buyers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}