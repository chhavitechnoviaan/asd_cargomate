// import { useState } from "react";
// import {
//   Calendar,
//   ChevronDown,
//   Plus,
//   Pencil,
//   Trash2,
//   Eye,
//   Megaphone,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const initialPlans = [
//   {
//     id: 1,
//     planName: "Tirupur to Dubai – T-shirts Export",
//     createdOn: "24 Apr 2025, 09:25 AM",
//     planId: "PLN-2025-04-24-000123",
//     status: "Draft",
//     totalEstimatedCost: "₹24,860",
//     estimatedTransitTime: "3 – 5 Days",
//   },
//   {
//     id: 2,
//     planName: "Mumbai to Dubai – Garments Export",
//     createdOn: "25 Apr 2025, 11:10 AM",
//     planId: "PLN-2025-04-25-000124",
//     status: "Draft",
//     totalEstimatedCost: "₹32,450",
//     estimatedTransitTime: "4 – 6 Days",
//   },
//   {
//     id: 3,
//     planName: "Delhi to London – Textile Export",
//     createdOn: "26 Apr 2025, 02:40 PM",
//     planId: "PLN-2025-04-26-000125",
//     status: "Active",
//     totalEstimatedCost: "₹41,280",
//     estimatedTransitTime: "7 – 10 Days",
//   },
//   {
//     id: 4,
//     planName: "Surat to Dubai – Cotton Export",
//     createdOn: "28 Apr 2025, 10:15 AM",
//     planId: "PLN-2025-04-28-000126",
//     status: "Draft",
//     totalEstimatedCost: "₹28,900",
//     estimatedTransitTime: "3 – 5 Days",
//   },
//   {
//     id: 5,
//     planName: "Chennai to Singapore – Apparel Export",
//     createdOn: "30 Apr 2025, 04:20 PM",
//     planId: "PLN-2025-04-30-000127",
//     status: "Completed",
//     totalEstimatedCost: "₹36,750",
//     estimatedTransitTime: "5 – 7 Days",
//   },
//   {
//     id: 6,
//     planName: "Kolkata to Dubai – Fashion Export",
//     createdOn: "02 May 2025, 09:45 AM",
//     planId: "PLN-2025-05-02-000128",
//     status: "Draft",
//     totalEstimatedCost: "₹21,600",
//     estimatedTransitTime: "3 – 5 Days",
//   },
//   {
//     id: 7,
//     planName: "Bangalore to Dubai – T-shirt Export",
//     createdOn: "04 May 2025, 12:30 PM",
//     planId: "PLN-2025-05-04-000129",
//     status: "Active",
//     totalEstimatedCost: "₹30,250",
//     estimatedTransitTime: "4 – 6 Days",
//   },
//   {
//     id: 8,
//     planName: "Tirupur to London – Clothing Export",
//     createdOn: "06 May 2025, 03:10 PM",
//     planId: "PLN-2025-05-06-000130",
//     status: "Draft",
//     totalEstimatedCost: "₹45,900",
//     estimatedTransitTime: "8 – 12 Days",
//   },
 
 
// ];

// const StatusBadge = ({ status }) => {
//   const statusClasses = {
//     Draft: "bg-orange-50 text-orange-500 border-orange-200",
//     Active: "bg-green-50 text-green-600 border-green-200",
//     Completed: "bg-blue-50 text-blue-600 border-blue-200",
//   };

//   return (
//     <span
//       className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium whitespace-nowrap ${
//         statusClasses[status] ||
//         "bg-gray-50 text-gray-500 border-gray-200"
//       }`}
//     >
//       {status}
//     </span>
//   );
// };

// export default function PlanSummary({
//   onAddNew,
//   onDelete,
//   onEdit,
//   onViewDetail,
// }) {
//   const [plans, setPlans] = useState(initialPlans);
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 5;

//   const totalPages = Math.ceil(plans.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;

//   const currentPlans = plans.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleDelete = (id) => {
//     if (onDelete) {
//       onDelete(id);
//     } else {
//       const updatedPlans = plans.filter(
//         (plan) => plan.id !== id
//       );

//       setPlans(updatedPlans);

//       const newTotalPages = Math.ceil(
//         updatedPlans.length / itemsPerPage
//       );

//       if (
//         currentPage > newTotalPages &&
//         newTotalPages > 0
//       ) {
//         setCurrentPage(newTotalPages);
//       }
//     }
//   };

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className=" bg-white p-4 sm:p-6 ">

     
//       <h2 className="text-lg font-bold text-slate-900 mb-4">
//         Plan Summary
//       </h2>

//       {/* ================= TABLE ================= */}
//       <div className="border border-slate-200 rounded-2xl overflow-hidden">

//         {/* 
//           Mobile horizontal scroll
//           Desktop also works normally.
//         */}
//         <div className="w-full overflow-x-auto">

//           <table className="w-full min-w-[1150px] text-left">

//             {/* ================= TABLE HEADER ================= */}
//             <thead>

//               <tr className="border-b border-slate-100 bg-slate-50/50">

//                 <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
//                   Plan Name
//                 </th>

//                 <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
//                   Created On
//                 </th>

//                 <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
//                   Plan ID
//                 </th>

//                 <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
//                   Status
//                 </th>

//                 <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
//                   Total Estimated Cost
//                 </th>

//                 <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
//                   Estimated Transit Time
//                 </th>

//                 <th className="py-4 px-6 text-sm font-semibold text-slate-500 whitespace-nowrap">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             {/* ================= TABLE BODY ================= */}
//             <tbody>

//               {currentPlans.length > 0 ? (
//                 currentPlans.map((plan) => (

//                   <tr
//                     key={plan.id}
//                     className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition"
//                   >

//                     {/* Plan Name */}
//                     <td className="py-5 px-6">

//                       <p className="text-sm font-bold text-slate-800 leading-5 max-w-[240px]">
//                         {plan.planName}
//                       </p>

//                     </td>

//                     {/* Created On */}
//                     <td className="py-5 px-6">

//                       <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
//                         {plan.createdOn}
//                       </span>

//                     </td>

//                     {/* Plan ID */}
//                     <td className="py-5 px-6">

//                       <span className="text-sm font-semibold text-indigo-700 whitespace-nowrap">
//                         {plan.planId}
//                       </span>

//                     </td>

//                     {/* Status */}
//                     <td className="py-5 px-6">

//                       <StatusBadge
//                         status={plan.status}
//                       />

//                     </td>

//                     {/* Estimated Cost */}
//                     <td className="py-5 px-6">

//                       <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
//                         {plan.totalEstimatedCost}
//                       </span>

//                     </td>

//                     {/* Transit Time */}
//                     <td className="py-5 px-6">

//                       <span className="text-sm font-bold text-slate-800 whitespace-nowrap">
//                         {plan.estimatedTransitTime}
//                       </span>

//                     </td>

//                     {/* Actions */}
//                     <td className="py-5 px-6">

//                       <div className="flex items-center gap-2">

//                         {/* View */}
//                         <button
//                           type="button"
//                           title="View Details"
//                           onClick={() =>
//                             onViewDetail?.(plan)
//                           }
//                           className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
//                         >
//                           <Eye size={17} />
//                         </button>

//                         {/* Edit */}
//                         <button
//                           type="button"
//                           title="Edit"
//                           onClick={() =>
//                             onEdit?.(plan)
//                           }
//                           className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition"
//                         >
//                           <Pencil size={16} />
//                         </button>

//                         {/* Delete */}
//                         <button
//                           type="button"
//                           title="Delete"
//                           onClick={() =>
//                             handleDelete(plan.id)
//                           }
//                           className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition"
//                         >
//                           <Trash2 size={16} />
//                         </button>

//                       </div>

//                     </td>

//                   </tr>

//                 ))
//               ) : (

//                 <tr>

//                   <td
//                     colSpan={7}
//                     className="py-12 text-center text-sm text-slate-500"
//                   >
//                     No plans found.
//                   </td>

//                 </tr>

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//       {/* ================= PAGINATION ================= */}
//       {plans.length > 0 && (

//         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

//           {/* Showing text */}
//           <p className="text-sm text-slate-500">

//             Showing{" "}

//             <span className="font-semibold text-slate-700">
//               {startIndex + 1}
//             </span>

//             {" - "}

//             <span className="font-semibold text-slate-700">
//               {Math.min(
//                 startIndex + itemsPerPage,
//                 plans.length
//               )}
//             </span>

//             {" of "}

//             <span className="font-semibold text-slate-700">
//               {plans.length}
//             </span>

//             {" plans"}

//           </p>

//           {/* Pagination controls */}
//           <div className="flex items-center gap-1">

//             {/* Previous */}
//             <button
//               type="button"
//               disabled={currentPage === 1}
//               onClick={() =>
//                 goToPage(currentPage - 1)
//               }
//               className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
//             >
//               <ChevronLeft size={17} />
//             </button>

//             {/* Page numbers */}
//             {Array.from(
//               { length: totalPages },
//               (_, index) => index + 1
//             ).map((page) => (

//               <button
//                 key={page}
//                 type="button"
//                 onClick={() =>
//                   goToPage(page)
//                 }
//                 className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
//                   currentPage === page
//                     ? "bg-indigo-600 text-white"
//                     : "text-slate-600 hover:bg-slate-100"
//                 }`}
//               >
//                 {page}
//               </button>

//             ))}

//             {/* Next */}
//             <button
//               type="button"
//               disabled={
//                 currentPage === totalPages
//               }
//               onClick={() =>
//                 goToPage(currentPage + 1)
//               }
//               className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
//             >
//               <ChevronRight size={17} />
//             </button>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  Package,
  Clock,
  IndianRupee,
  Hash,
  Plus,
} from "lucide-react";

const initialPlans = [
  {
    id: 1,
    planName: "Tirupur to Dubai – T-shirts Export",
    createdOn: "24 Apr 2025, 09:25 AM",
    planId: "PLN-2025-04-24-000123",
    status: "Draft",
    totalEstimatedCost: "₹24,860",
    estimatedTransitTime: "3 – 5 Days",
  },
  {
    id: 2,
    planName: "Mumbai to Dubai – Garments Export",
    createdOn: "25 Apr 2025, 11:10 AM",
    planId: "PLN-2025-04-25-000124",
    status: "Draft",
    totalEstimatedCost: "₹32,450",
    estimatedTransitTime: "4 – 6 Days",
  },
  {
    id: 3,
    planName: "Delhi to London – Textile Export",
    createdOn: "26 Apr 2025, 02:40 PM",
    planId: "PLN-2025-04-26-000125",
    status: "Active",
    totalEstimatedCost: "₹41,280",
    estimatedTransitTime: "7 – 10 Days",
  },
  {
    id: 4,
    planName: "Surat to Dubai – Cotton Export",
    createdOn: "28 Apr 2025, 10:15 AM",
    planId: "PLN-2025-04-28-000126",
    status: "Draft",
    totalEstimatedCost: "₹28,900",
    estimatedTransitTime: "3 – 5 Days",
  },
  {
    id: 5,
    planName: "Chennai to Singapore – Apparel Export",
    createdOn: "30 Apr 2025, 04:20 PM",
    planId: "PLN-2025-04-30-000127",
    status: "Completed",
    totalEstimatedCost: "₹36,750",
    estimatedTransitTime: "5 – 7 Days",
  },
  {
    id: 6,
    planName: "Kolkata to Dubai – Fashion Export",
    createdOn: "02 May 2025, 09:45 AM",
    planId: "PLN-2025-05-02-000128",
    status: "Draft",
    totalEstimatedCost: "₹21,600",
    estimatedTransitTime: "3 – 5 Days",
  },
  {
    id: 7,
    planName: "Bangalore to Dubai – T-shirt Export",
    createdOn: "04 May 2025, 12:30 PM",
    planId: "PLN-2025-05-04-000129",
    status: "Active",
    totalEstimatedCost: "₹30,250",
    estimatedTransitTime: "4 – 6 Days",
  },
  {
    id: 8,
    planName: "Tirupur to London – Clothing Export",
    createdOn: "06 May 2025, 03:10 PM",
    planId: "PLN-2025-05-06-000130",
    status: "Draft",
    totalEstimatedCost: "₹45,900",
    estimatedTransitTime: "8 – 12 Days",
  },
];

const statusStyles = {
  Draft: "bg-amber-50 text-amber-700 ring-amber-200",
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Completed: "bg-blue-50 text-blue-700 ring-blue-200",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] ||
        "bg-slate-50 text-slate-600 ring-slate-200"
      }`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
          status === "Active"
            ? "bg-emerald-500"
            : status === "Completed"
              ? "bg-blue-500"
              : "bg-amber-500"
        }`}
      />
      {status}
    </span>
  );
}

function ActionButtons({ plan, onViewDetail, onEdit, onDelete }) {
  const buttonClass =
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-200";

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        title="View details"
        aria-label={`View ${plan.planName}`}
        onClick={() => onViewDetail?.(plan)}
        className={`${buttonClass} text-slate-500 hover:bg-indigo-50 hover:text-indigo-600`}
      >
        <Eye size={16} />
      </button>

      <button
        type="button"
        title="Edit plan"
        aria-label={`Edit ${plan.planName}`}
        onClick={() => onEdit?.(plan)}
        className={`${buttonClass} text-slate-500 hover:bg-indigo-50 hover:text-indigo-600`}
      >
        <Pencil size={15} />
      </button>

      <button
        type="button"
        title="Delete plan"
        aria-label={`Delete ${plan.planName}`}
        onClick={() => onDelete?.(plan.id)}
        className={`${buttonClass} text-slate-400 hover:bg-red-50 hover:text-red-600`}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

export default function PlanSummary({
  onAddNew,
  onDelete,
  onEdit,
  onViewDetail,
}) {
  const [plans, setPlans] = useState(initialPlans);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(plans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentPlans = plans.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
      return;
    }

    const updatedPlans = plans.filter((plan) => plan.id !== id);
    setPlans(updatedPlans);

    const nextTotalPages = Math.ceil(
      updatedPlans.length / itemsPerPage
    );

    if (currentPage > nextTotalPages && nextTotalPages > 0) {
      setCurrentPage(nextTotalPages);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mt-10">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Package size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Plan Summary
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Manage and review your shipment plans
            </p>
          </div>
        </div>

        {onAddNew && (
          <button
            type="button"
            onClick={onAddNew}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:w-auto"
          >
            <Plus size={17} />
            Add New Plan
          </button>
        )}
      </div>

      {/* Desktop table: fits the available width without horizontal scrolling */}
      <div className="hidden w-full min-w-0 lg:block">
        <table className="w-full table-fixed text-left">
          <colgroup>
            <col className="w-[19%]" />
            <col className="w-[17%]" />
            <col className="w-[17%]" />
            <col className="w-[10%]" />
            <col className="w-[13%]" />
            <col className="w-[13%]" />
            <col className="w-[11%]" />
          </colgroup>

          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {[
                "Plan Name",
                "Created On",
                "Plan ID",
                "Status",
                "Estimated Cost",
                "Transit Time",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-2 py-4 text-xs font-semibold text-slate-500 xl:px-3 xl:text-sm"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentPlans.length > 0 ? (
              currentPlans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-2 py-4 xl:px-3">
                    <p className="break-words text-xs font-semibold leading-5 text-slate-800 xl:text-sm">
                      {plan.planName}
                    </p>
                  </td>

                  <td className="px-2 py-4 xl:px-3">
                    <div className="flex min-w-0 items-start gap-1.5 text-xs leading-5 text-slate-600 xl:text-sm">
                      <Calendar
                        size={14}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />
                      <span className="min-w-0 break-words">
                        {plan.createdOn}
                      </span>
                    </div>
                  </td>

                  <td className="px-2 py-4 xl:px-3">
                    <span className="break-all text-xs font-medium leading-5 text-indigo-700 xl:text-sm">
                      {plan.planId}
                    </span>
                  </td>

                  <td className="px-2 py-4 xl:px-3">
                    <StatusBadge status={plan.status} />
                  </td>

                  <td className="px-2 py-4 xl:px-3">
                    <span className="break-words text-xs font-bold text-slate-800 xl:text-sm">
                      {plan.totalEstimatedCost}
                    </span>
                  </td>

                  <td className="px-2 py-4 xl:px-3">
                    <div className="flex min-w-0 items-start gap-1.5 text-xs leading-5 text-slate-600 xl:text-sm">
                      <Clock
                        size={14}
                        className="mt-0.5 shrink-0 text-slate-400"
                      />
                      <span className="break-words">
                        {plan.estimatedTransitTime}
                      </span>
                    </div>
                  </td>

                  <td className="px-1 py-4 xl:px-2">
                    <ActionButtons
                      plan={plan}
                      onViewDetail={onViewDetail}
                      onEdit={onEdit}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-sm text-slate-500"
                >
                  No plans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile and tablet: responsive plan cards */}
      <div className="grid min-w-0 grid-cols-1 gap-3 p-3 sm:p-4 lg:hidden">
        {currentPlans.length > 0 ? (
          currentPlans.map((plan) => (
            <article
              key={plan.id}
              className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-sm"
            >
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-bold leading-5 text-slate-900">
                    {plan.planName}
                  </p>

                  <p className="mt-1 break-all text-xs leading-5 text-indigo-600">
                    {plan.planId}
                  </p>
                </div>

                <div className="shrink-0">
                  <StatusBadge status={plan.status} />
                </div>
              </div>

              <div className="mt-4 grid min-w-0 grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar size={14} />
                    Created On
                  </div>
                  <p className="break-words text-xs font-medium leading-5 text-slate-800">
                    {plan.createdOn}
                  </p>
                </div>

                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <IndianRupee size={14} />
                    Estimated Cost
                  </div>
                  <p className="break-words text-sm font-bold text-slate-900">
                    {plan.totalEstimatedCost}
                  </p>
                </div>

                <div className="col-span-2 min-w-0">
                  <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={14} />
                    Estimated Transit Time
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    {plan.estimatedTransitTime}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                <span className="text-xs text-slate-500">
                  Plan details
                </span>

                <ActionButtons
                  plan={plan}
                  onViewDetail={onViewDetail}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                />
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 px-4 py-12 text-center">
            <Package
              size={28}
              className="mx-auto mb-3 text-slate-400"
            />
            <p className="text-sm font-semibold text-slate-700">
              No plans found
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Your shipment plans will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {plans.length > 0 && (
        <div className="flex min-w-0 flex-col gap-3 border-t border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-center text-xs leading-5 text-slate-500 sm:text-left sm:text-sm">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {startIndex + 1}
            </span>
            {" – "}
            <span className="font-semibold text-slate-800">
              {Math.min(startIndex + itemsPerPage, plans.length)}
            </span>
            {" of "}
            <span className="font-semibold text-slate-800">
              {plans.length}
            </span>{" "}
            plans
          </p>

          <div className="flex max-w-full items-center justify-center gap-1">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous page"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={17} />
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                aria-current={currentPage === page ? "page" : undefined}
                onClick={() => goToPage(page)}
                className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Next page"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
