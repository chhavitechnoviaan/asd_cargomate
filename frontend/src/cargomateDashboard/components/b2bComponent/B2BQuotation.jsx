import React, { useMemo, useState } from "react";
import {
  LuFileText,
  LuBuilding2,
  LuUser,
  LuMapPin,
  LuCircleCheck,
  LuCircleX,
  LuSend,
  LuLoaderCircle,
  LuFileCheck,
  LuClock,
} from "react-icons/lu";

export default function B2BQuotation({
  shipment,
  quotation,
  onClose,
  onAccept,
  onReject,
}) {
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("B2B QUOTATION:", quotation);
  console.log("B2B SHIPMENT:", shipment);

  // ==========================================
  // NORMALIZE DATA
  // ==========================================

  const shipmentData =
    shipment?.data ||
    shipment?.shipment ||
    shipment?.shipmentData ||
    shipment ||
    {};

    const quotationData =
    quotation?.data?.quotation ||
    quotation?.data ||
    quotation?.quotation ||
    quotation ||
    {};

    const quotationId =
  quotationData?._id ||
  quotationData?.quotationId ||
  quotationData?.id ||
  "-";

const quotationNumber =
  quotationData?.quotationNumber ||
  quotationData?.quoteNumber ||
  quotationData?.quotationNo ||
  quotationId;
  // ==========================================
  // SHIPMENT DETAILS
  // ==========================================

  const exporter =
    shipmentData?.parties?.exporter ||
    shipmentData?.exporter ||
    {};

  const route =
    shipmentData?.route ||
    shipmentData?.header?.route ||
    {};

  const shipmentInfo =
    shipmentData?.shipmentInfo ||
    shipmentData?.shipmentInfoData ||
    {};

  const overview =
    shipmentData?.overview ||
    {};

  const header =
    shipmentData?.header ||
    {};

  const activity =
    shipmentData?.activity ||
    [];

  const submittedActivity = activity.find(
    (item) =>
      item.type === "SHIPMENT_SUBMITTED"
  );

  const approvedActivity = activity.find(
    (item) =>
      item.type === "SHIPMENT_APPROVED"
  );

  const shipmentReferenceId =
    header?.shipmentId ||
    shipmentData?.shipmentId ||
    shipmentInfo?.shipmentId ||
    shipmentData?.sbNumber ||
    "-";

  // ==========================================
  // QUOTATION DATA
  // ==========================================

  const charges =
  quotationData?.charges ||
  quotationData?.chargeDetails ||
  quotationData?.pricing?.charges ||
  [];

  const subtotal = useMemo(() => {
    if (quotationData?.subtotal !== undefined) {
      return Number(quotationData.subtotal || 0);
    }

    return charges.reduce(
      (total, item) =>
        total +
        Number(
          item.amount ||
          item.price ||
          item.value ||
          0
        ),
      0
    );
  }, [quotationData, charges]);

  const discount = Number(
    quotationData?.discount || 0
  );

  const tax = Number(
    quotationData?.tax || 0
  );

  const totalAmount =
    quotationData?.totalAmount !== undefined
      ? Number(quotationData.totalAmount || 0)
      : subtotal - discount + tax;

  const currency =
    quotationData?.currency ||
    "INR";

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(Number(amount || 0));
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // ACCEPT
  // ==========================================

  const handleAccept = async () => {
    try {
      setLoading(true);

      if (onAccept) {
        await onAccept();
      }

    } catch (error) {
      console.error(
        "ACCEPT QUOTATION ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to accept quotation"
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // REJECT
  // ==========================================

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert(
        "Please enter rejection reason"
      );
      return;
    }

    try {
      setLoading(true);

      if (onReject) {
        await onReject(
          rejectReason.trim()
        );
      }

    } catch (error) {
      console.error(
        "REJECT QUOTATION ERROR:",
        error
      );

      alert(
        error?.response?.data?.message ||
        "Failed to reject quotation"
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // STATUS COLOR
  // ==========================================

  const getStatusStyle = () => {
    switch (quotationData?.status) {
      case "Accepted":
        return "bg-green-100 text-green-600";

      case "Rejected":
        return "bg-red-100 text-red-600";

      case "Shared":
        return "bg-purple-100 text-purple-600";

      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm p-3 sm:p-5 flex items-center justify-center">

      {/* MAIN POPUP */}

      <div className="w-full max-w-6xl h-[92vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="shrink-0 px-5 sm:px-8 py-5 border-b border-gray-200 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <LuFileText
              size={24}
              className="text-blue-600"
            />

            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Quotation
              </h1>

              <p className="text-xs text-gray-400 mt-1">
  {quotationNumber}
</p>
            </div>

          </div>

          <span
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusStyle()}`}
          >
            {quotationData?.status || "Shared"}
          </span>

        </div>


        {/* ========================================= */}
        {/* SCROLLABLE CONTENT */}
        {/* ========================================= */}

        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5">

          {/* ========================================= */}
          {/* QUOTATION TOP INFO */}
          {/* ========================================= */}

          <div className="border border-gray-200 rounded-xl p-4 sm:p-5 mb-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">

              {/* QUOTATION NUMBER */}

              <div>
                <p className="text-xs text-gray-400">
                  Quotation No.
                </p>

                <p className="text-sm font-semibold text-gray-800 mt-1">
                  {quotationData?.quotationNumber || "-"}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  Sent on{" "}
                  {formatDate(
                    quotationData?.sharedAt ||
                    quotationData?.createdAt
                  )}
                </p>
              </div>


              {/* TOTAL */}

              <div className="text-left md:text-center">

                <p className="text-xl sm:text-2xl font-bold text-blue-700">
                  {formatCurrency(totalAmount)}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Total Amount
                </p>

              </div>


              {/* VALIDITY */}

              <div className="md:text-right">

                <p className="text-xs text-gray-400">
                  Status{" "}

                  <span className="font-semibold text-purple-600">
                    {quotationData?.status || "Shared"}
                  </span>
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Valid till{" "}

                  <span className="font-semibold text-gray-700">
                    {formatDate(
                      quotationData?.validUntil
                    )}
                  </span>
                </p>

              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* FROM / TO */}
          {/* ========================================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            {/* FROM */}

            <div className="border border-gray-200 rounded-xl p-5">

              <p className="flex items-center gap-2 text-xs text-gray-400 mb-3">

                <LuBuilding2 size={14} />

                From

              </p>

              <p className="text-blue-600 font-semibold text-sm mb-2">
                ASD Company
              </p>

              <p className="text-xs text-gray-500 leading-relaxed">
                Admin / Company Details
              </p>

            </div>


            {/* TO */}

            <div className="border border-gray-200 rounded-xl p-5">

              <p className="flex items-center gap-2 text-xs text-gray-400 mb-3">

                <LuUser size={14} />

                To

              </p>

              <p className="text-blue-600 font-semibold text-sm mb-2">

                {exporter?.companyName ||
                  exporter?.contactPerson ||
                  "-"}

              </p>

              <div className="text-xs text-gray-500 space-y-1">

                {exporter?.contactPerson && (
                  <p>
                    {exporter.contactPerson}
                  </p>
                )}

                {exporter?.email && (
                  <p>
                    {exporter.email}
                  </p>
                )}

                {exporter?.mobile && (
                  <p>
                    {exporter.mobile}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* SHIPMENT DETAILS */}
          {/* ========================================= */}

          <div className="border border-gray-200 rounded-xl p-5 mb-4">

            <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-5">

              <LuMapPin size={16} />

              Shipment Details

            </p>


            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 text-xs">

              <DetailItem
                label="Shipment Route"
                value={`${route?.originCountry || "-"} → ${
                  route?.destinationCountry || "-"
                }`}
              />

              <DetailItem
                label="Shipment Type"
                value={
                  shipmentInfo?.shipmentType ||
                  shipmentData?.shipmentType ||
                  "-"
                }
              />

              <DetailItem
                label="Submitted On"
                value={
                  submittedActivity?.createdAt
                    ? formatDate(
                        submittedActivity.createdAt
                      )
                    : overview?.createdOn
                    ? formatDate(
                        overview.createdOn
                      )
                    : "-"
                }
              />

              <DetailItem
                label="Port of Loading"
                value={
                  route?.portOfLoading ||
                  shipmentInfo?.portOfLoading ||
                  "-"
                }
              />

              <DetailItem
                label="Shipment Mode"
                value={
                  shipmentInfo?.mode ||
                  shipmentInfo?.shipmentMode ||
                  shipmentData?.mode ||
                  "-"
                }
              />

              <DetailItem
                label="Approved On"
                value={
                  approvedActivity?.createdAt
                    ? formatDate(
                        approvedActivity.createdAt
                      )
                    : overview?.approvedAt
                    ? formatDate(
                        overview.approvedAt
                      )
                    : "-"
                }
              />

              <DetailItem
                label="Port of Discharge"
                value={
                  route?.portOfDischarge ||
                  shipmentInfo?.portOfDischarge ||
                  "-"
                }
              />

              <DetailItem
                label="Incoterm"
                value={
                  shipmentInfo?.incoterm ||
                  shipmentData?.incoterm ||
                  "-"
                }
              />

              <DetailItem
                label="Requested ID"
                value={shipmentReferenceId}
              />

            </div>

          </div>


          {/* ========================================= */}
          {/* CHARGES + SUMMARY */}
          {/* ========================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            {/* CHARGES */}

            <div className="lg:col-span-2 border border-gray-200 rounded-xl p-5">

              <p className="text-sm font-semibold text-gray-900 mb-4">
                Charges Breakdown
              </p>


              <div className="overflow-x-auto">

                <table className="w-full min-w-[650px] text-xs">

                  <thead>

                    <tr className="text-left text-gray-400 border-b border-gray-200">

                      <th className="pb-3 w-10">
                        #
                      </th>

                      <th className="pb-3">
                        Description
                      </th>

                      <th className="pb-3">
                        Details
                      </th>

                      <th className="pb-3 text-right">
                        Amount ({currency})
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {charges?.length > 0 ? (

                      charges.map(
                        (charge, index) => (

                          <tr
                            key={
                              charge?._id ||
                              index
                            }
                            className="border-b border-gray-100"
                          >

                            <td className="py-3 text-gray-400">
                              {index + 1}
                            </td>

                           <td className="py-3 text-gray-500">
  {charge?.details ||
    charge?.remark ||
    charge?.notes ||
    charge?.description ||
    "-"}
</td>

                            <td className="py-3 text-gray-500">
                              {charge?.description || "-"}
                            </td>

                            <td className="py-3 text-right font-semibold text-gray-700">
  {formatCurrency(
    charge?.amount ||
    charge?.price ||
    charge?.value ||
    0
  )}
</td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="4"
                          className="py-6 text-center text-gray-400"
                        >
                          No charges available
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              </div>


              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">

                <p className="text-sm font-semibold text-blue-600">
                  Total {currency}
                </p>

                <p className="text-sm font-bold text-blue-600">
                  {formatCurrency(totalAmount)}
                </p>

              </div>

            </div>


            {/* SUMMARY */}

            <div className="border border-gray-200 rounded-xl p-5 h-fit">

              <p className="text-sm font-semibold text-gray-900 mb-5">
                Summary
              </p>


              <div className="space-y-4 text-xs">

                <div className="flex justify-between text-gray-500">

                  <span>
                    Sub Total
                  </span>

                  <span>
                    {formatCurrency(subtotal)}
                  </span>

                </div>


                <div className="flex justify-between text-gray-500">

                  <span>
                    Discount
                  </span>

                  <span className="text-green-600">
                    -{formatCurrency(discount)}
                  </span>

                </div>


                <div className="flex justify-between text-gray-500">

                  <span>
                    Tax
                  </span>

                  <span>
                    {formatCurrency(tax)}
                  </span>

                </div>


                <div className="flex justify-between font-bold text-blue-600 pt-4 border-t border-gray-200">

                  <span>
                    Total Amount
                  </span>

                  <span>
                    {formatCurrency(totalAmount)}
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* ========================================= */}
          {/* NOTES */}
          {/* ========================================= */}

          {quotationData?.notes && (

            <div className="border border-gray-200 rounded-xl p-5 mb-4">

              <p className="text-sm font-semibold text-gray-900 mb-3">
                Notes
              </p>

              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">

                {quotationData.notes}

              </p>

            </div>

          )}


          {/* ========================================= */}
          {/* QUOTATION DETAILS */}
          {/* ========================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

            <InfoCard
              label="Quote Version"
              value={
                quotationData?.quoteVersion ||
                "-"
              }
            />

            <InfoCard
              label="Freight Quote"
              value={formatCurrency(
                quotationData?.freightQuote
              )}
            />

            <InfoCard
              label="Valid From"
              value={formatDate(
                quotationData?.validFrom
              )}
            />

            <InfoCard
              label="Valid Until"
              value={formatDate(
                quotationData?.validUntil
              )}
            />

          </div>


          {/* ========================================= */}
          {/* TERMS */}
          {/* ========================================= */}

          {quotationData?.termsAndConditions && (

            <div className="border border-gray-200 rounded-xl p-5 mb-4">

              <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-3">

                <LuFileCheck size={16} />

                Terms & Conditions

              </p>


              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">

                {quotationData.termsAndConditions}

              </p>

            </div>

          )}


          {/* ========================================= */}
          {/* REJECT BOX */}
          {/* ========================================= */}

          {showRejectBox && (

            <div className="border border-red-200 bg-red-50 rounded-xl p-5 mb-4">

              <p className="text-sm font-semibold text-red-600 mb-3">
                Reason for denying quotation
              </p>


              <textarea
                value={rejectReason}
                onChange={(e) =>
                  setRejectReason(
                    e.target.value
                  )
                }
                rows={4}
                placeholder="Enter your reason..."
                className="w-full border border-red-200 bg-white rounded-lg p-3 text-sm outline-none focus:border-red-400 resize-none"
              />

            </div>

          )}

        </div>


        {/* ========================================= */}
        {/* STICKY FOOTER */}
        {/* ========================================= */}

        <div className="shrink-0 border-t border-gray-200 bg-white px-5 sm:px-8 py-4">

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

            <button
              onClick={onClose}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 flex items-center justify-center gap-2"
            >
              <LuMapPin size={15} />

              Back to Shipment
            </button>


            {/* ONLY SHOW ACTIONS IF SHARED */}

            {quotationData?.status === "Shared" && (

              <div className="flex w-full sm:w-auto gap-3">

                {!showRejectBox ? (

                  <button
                    onClick={handleAccept}
                    disabled={loading}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                  >

                    {loading ? (

                      <LuLoaderCircle
                        className="animate-spin"
                        size={16}
                      />

                    ) : (

                      <LuCircleX
                        size={16}
                      />

                    )}

                    {loading
                      ? "Processing..."
                      : "Accept Quotation"}

                  </button>

                ) : (

                  <button
                    onClick={handleReject}
                    disabled={loading}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                  >

                    {loading ? (

                      <LuLoaderCircle
                        className="animate-spin"
                        size={16}
                      />

                    ) : (

                      <LuSend size={16} />

                    )}

                    {loading
                      ? "Submitting..."
                      : "Submit Denial"}

                  </button>

                )}


                <button
                  onClick={() => {

                    if (showRejectBox) {
                      setShowRejectBox(false);
                      setRejectReason("");
                    } else {
                      setShowRejectBox(true);
                    }

                  }}
                  disabled={loading}
                  className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 ${
                    showRejectBox
                      ? "border border-gray-300 text-gray-600"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >

                  <LuCircleX size={16} />

                  {showRejectBox
                    ? "Cancel"
                    : "Deny Quotation"}

                </button>

              </div>

            )}


            {/* ACCEPTED STATUS */}

            {quotationData?.status === "Accepted" && (

              <div className="px-5 py-2.5 bg-green-100 text-green-600 rounded-lg text-sm font-semibold flex items-center gap-2">

                <LuCircleX size={16} />

                Quotation Accepted

              </div>

            )}


            {/* REJECTED STATUS */}

            {quotationData?.status === "Rejected" && (

              <div className="px-5 py-2.5 bg-red-100 text-red-600 rounded-lg text-sm font-semibold flex items-center gap-2">

                <LuCircleX size={16} />

                Quotation Denied

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}


// ==========================================
// DETAIL ITEM
// ==========================================

function DetailItem({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-gray-400 mb-1">
        {label}
      </p>

      <p className="text-gray-900 font-medium">
        {value || "-"}
      </p>

    </div>
  );
}


// ==========================================
// INFO CARD
// ==========================================

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-4">

      <p className="text-xs text-gray-400 mb-2">
        {label}
      </p>

      <p className="text-sm font-semibold text-gray-800">
        {value || "-"}
      </p>

    </div>
  );
}