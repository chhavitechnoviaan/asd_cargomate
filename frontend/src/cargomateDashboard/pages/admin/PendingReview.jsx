import { useState, useEffect } from "react";
import { Clock, FileText, FileClock, Timer, Search ,MoreVertical} from "lucide-react";
import {
  FaPlus, FaMagnifyingGlass, FaXmark, FaChevronDown,
  FaStar, FaTruck, FaBoxOpen, FaWarehouse, FaFileContract
} from "react-icons/fa6";
import ReviewShipment from "./ReviewShipment"
const initialRequests = [
  {
    id: "REQ-2505-0012",
    company: "Global Exports Pvt. Ltd.",
    email: "info@globalexports.com",
    phone: "+91 98765 43210",
    route: "India ---- USA",
    submittedOn: "16 May 2025, 10:30 AM",
    shipmentType: "Export",
    status: "Pending Review",
    documentsUploaded: 7,
    riskScore: "Low (18/100)",
    compliance: "Eligible (2.5%)",
  },
    {
    id: "REQ-2505-0012",
    company: "international Exports Pvt. Ltd.",
    email: "info@internationalexport.com",
    phone: "+91 98765 43210",
    route: "India ---- USA",
    submittedOn: "16 May 2025, 10:30 AM",
    shipmentType: "Export",
    status: "Pending Review",
    documentsUploaded: 7,
    riskScore: "Low (18/100)",
    compliance: "Eligible (2.5%)",
  },
];

const stats = [
  { icon: FileText, iconColor: "text-orange-500", bg: "bg-orange-50", label: "Total Pending", value: "8", sub: "Requests" },
  { icon: FileClock, iconColor: "text-blue-500", bg: "bg-blue-50", label: "New Today", value: "3", sub: "Requests" },
  { icon: Timer, iconColor: "text-red-500", bg: "bg-red-50", label: "Due for review", value: "5", sub: "Requests" },
  { icon: Clock, iconColor: "text-green-500", bg: "bg-green-50", label: "Avg. Review time", value: "3.5 Hours", sub: "Approx." },
];

export default function PendingReviews({setPendingReview,}) {
  const [requests, setRequests] = useState(
    Array.from({ length: 8 }, (_, i) => ({ ...initialRequests[i % initialRequests.length], key: i }))
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selected, setSelected] = useState(requests[0]);
  const [reviews, setReviews] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const filtered = requests.filter((r) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      r.id?.toLowerCase().includes(term) ||
      r.company?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.route?.toLowerCase().includes(term) ||
      r.shipmentType?.toLowerCase().includes(term) ||
      r.status?.toLowerCase().includes(term) ||
      r.phone?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedRequests = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDecision = async (decision) => {
    try {
      await fetch(`/api/requests/${selected.id}/${decision}`, { method: "POST" });
    } catch (err) {}
  };

  useEffect(() => {
  const handleClickOutside = () => setOpenMenu(null);
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);
  return (
   <>
   <div className="w-full  grid grid-cols-1   gap-2 ">
      <div className=" bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-3">
        <div className="flex  justify-between items-start"> 
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pending Reviews</h2>
            <p className="text-sm text-gray-500">Review and verify shipment requests submitted by users.</p>
          </div>
        </div>
        <div> <button onClick={() => setPendingReview(false)}> <FaXmark className="text-lg"/></button></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="border border-gray-100 rounded-lg p-3">
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${s.iconColor}`} />
                </div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-lg font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by Request ID, Company, Email..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm"
            />
          </div>
          <button className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-700 whitespace-nowrap">
            Select Data Range
          </button>
        </div>

        {/* <div className="overflow-x-auto border border-gray-100 rounded-xl"> */}
        <div className="w-full overflow-x-auto rounded-xl border border-gray-100 [-webkit-overflow-scrolling:touch]">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[1.1fr_1.5fr_1fr_1.3fr_0.9fr_110px_50px] gap-x-3 bg-gray-50 px-4 py-3 text-xs font-semibold text-gray-700 tracking-wide">
            <span>Request ID</span>
            <span>Company / User</span>
            <span className="text-center">Route</span>
            <span>Submitted On</span>
            <span className="text-center">Shipment Type</span>
            <span className="text-center">Status</span>
            <span className="text-right">Actions</span>
          </div>

          {paginatedRequests.length > 0 ? (
            paginatedRequests.map((r) => (
              <div
                key={r.key}
                onClick={() => setSelected(r)}
                className="grid grid-cols-[1.1fr_1.5fr_1fr_1.3fr_0.9fr_110px_50px] gap-x-3 items-center px-4 py-3 border-t border-gray-100 cursor-pointer hover:bg-gray-50/70 transition-colors"
              >
                <span className="text-xs text-blue-600 font-medium truncate">{r.id}</span>

                <div className="min-w-0">
                  <p className="text-xs text-gray-800 font-medium truncate">{r.company}</p>
                  <p className="text-xs text-gray-400 truncate">{r.email}</p>
                </div>

                <span className="text-xs text-gray-600 text-center">{r.route}</span>
                <span className="text-xs text-gray-500">{r.submittedOn}</span>
                <span className="text-xs text-gray-600 text-center">{r.shipmentType}</span>

                <span className="text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200 px-2.5 py-1 rounded-full w-fit mx-auto">
                  {r.status}
                </span>

                <div className="flex items-center justify-end relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === r.key ? null : r.key);
                    }}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical size={18} className="text-gray-500" />
                  </button>

                  {openMenu === r.key && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 top-9 z-20 w-36 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 flex flex-col gap-1"
                    >
                      <button
                        onClick={() => {
                          setSelected(r);
                          setReviews(true);
                          setOpenMenu(null);
                        }}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-xs text-left hover:bg-blue-100 transition-colors"
                      >
                        Review
                      </button>
                      <button
                          onClick={() => {
                            setSelected(r);
                            handleDecision("accept");
                            setOpenMenu(null);
                          }}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-green-50 text-green-700 font-medium text-xs text-left hover:bg-green-100 transition-colors"
                        >
                          Accept
                        </button>
                      <button
                        onClick={() => {
                          setSelected(r);
                          handleDecision("reject");
                          setOpenMenu(null);
                        }}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-red-50 text-red-600 font-medium text-xs text-left hover:bg-red-100 transition-colors"
                      >
                        Reject
                      </button>

                     
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-gray-500 border-t border-gray-100">
              No requests found matching your search.
            </div>
          )}
        </div>
      </div>
        {/* </div> */}

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <div>
            Showing {filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
            {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 border rounded-lg font-medium ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* {selected && (
        <div className="bg-white rounded-2xl w-full shadow-xl p-4 sm:p-6 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Request Details</h3>
            <span className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
              {selected.status}
            </span>
          </div>
          <p className="text-xs text-gray-400">Request ID</p>
          <p className="font-bold text-gray-900 mb-1">{selected.id}</p>
          <p className="text-xs text-gray-400 mb-4">Submitted on {selected.submittedOn}</p>

          <p className="text-xs text-gray-400">User/ Company</p>
          <p className="font-semibold text-gray-900">{selected.company}</p>
          <p className="text-xs text-gray-500">{selected.email}</p>
          <p className="text-xs text-gray-500 mb-4">{selected.phone}</p>

          <p className="text-xs text-gray-400">Route</p>
          <p className="text-sm text-gray-800 mb-4">{selected.route}</p>

          <p className="text-xs text-gray-400">Shipment Type</p>
          <p className="text-sm text-gray-800 mb-4">{selected.shipmentType}</p>

          <p className="text-xs text-gray-400">Status</p>
          <span className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full inline-block mb-4">
            {selected.status}
          </span>

          <p className="text-sm text-gray-500 mb-4">
            Review the shipment details and approve or request more information.
          </p>

         

          <div className="border border-gray-100 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-900 mb-2">Quick Information</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <p className="text-gray-400">Documents Uploaded</p>
                <p className="font-bold text-gray-900">{selected.documentsUploaded}</p>
              </div>
              <div>
                <p className="text-gray-400">All risk score</p>
                <p className="font-bold text-green-600">{selected.riskScore}</p>
              </div>
              <div>
                <p className="text-gray-400">Compliance</p>
                <p className="font-bold text-green-600">{selected.compliance}</p>
              </div>
            </div>
          </div>
        </div>
      )} */}

    </div>

     {reviews && 
       <ReviewShipment onClose={() => setReviews(false)} />
       }

     </> 
  );
}