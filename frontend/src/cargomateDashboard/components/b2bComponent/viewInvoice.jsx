import {
    FileText,
    DollarSign,
    X,
  } from "lucide-react";
  
  const toNumber = (value) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return 0;
    }
  
    return Number(String(value).replace(/,/g, "")) || 0;
  };
  
  const formatAmount = (value) => {
    return toNumber(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  
  const formatDate = (date) => {
    if (!date) return "-";
  
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  
  export default function ViewInvoiceModal({
    invoice,
    onClose,
  }) {
    if (!invoice) return null;
  
    const items =
      invoice.items ||
      invoice.invoiceItems ||
      [];
  
    /* ================================
       CALCULATIONS
    ================================= */
  
    const subtotal =
      invoice.subtotal ??
      items.reduce((sum, item) => {
        const qty = toNumber(
          item.qty ?? item.quantity
        );
  
        const unitPrice = toNumber(
          item.unitPrice ?? item.price
        );
  
        return sum + qty * unitPrice;
      }, 0);
  
    const freightCharges = toNumber(
      invoice.freightCharges
    );
  
    const insuranceCharges = toNumber(
      invoice.insuranceCharges
    );
  
    const handlingCharges = toNumber(
      invoice.handlingCharges
    );
  
    const discount = toNumber(
      invoice.discount
    );
  
    const taxableAmount =
      invoice.taxableAmount ??
      Math.max(
        0,
        subtotal +
          freightCharges +
          insuranceCharges +
          handlingCharges -
          discount
      );
  
    const cgst =
      invoice.cgst ??
      taxableAmount * 0.09;
  
    const sgst =
      invoice.sgst ??
      taxableAmount * 0.09;
  
    const totalAmount =
      invoice.totalAmount ??
      taxableAmount +
        cgst +
        sgst;
  
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6">
  
        <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-4 sm:p-6">
  
          {/* ================= HEADER ================= */}
  
          <div className="w-full flex items-center justify-between mb-6 gap-3">
  
            <div className="flex items-center gap-3">
  
              <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
  
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Invoice Details
                </h2>
  
                <p className="text-sm text-gray-500">
                  Review complete invoice information
                </p>
              </div>
  
            </div>
  
            <div className="flex items-center gap-3">
  
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  invoice.status === "Paid"
                    ? "bg-green-50 text-green-600"
                    : invoice.status === "Overdue"
                    ? "bg-red-50 text-red-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
              >
                {invoice.status || "Pending"}
              </span>
  
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
  
            </div>
  
          </div>
  
          <div className="grid lg:grid-cols-3 gap-4">
  
            {/* ================= LEFT SECTION ================= */}
  
            <div className="lg:col-span-2 space-y-4">
  
              {/* ================= INVOICE INFORMATION ================= */}
  
              <div className="border border-gray-100 rounded-lg p-4">
  
                <p className="text-purple-600 font-semibold text-sm mb-4">
                  Invoice Information
                </p>
  
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
  
                  <InvoiceField
                    label="Invoice Number"
                    value={invoice.invoiceNumber}
                  />
  
                  <InvoiceField
                    label="Invoice Date"
                    value={formatDate(invoice.invoiceDate)}
                  />
  
                  <InvoiceField
                    label="Due Date"
                    value={formatDate(invoice.dueDate)}
                  />
  
                  <InvoiceField
                    label="Currency"
                    value={invoice.currency || "INR"}
                  />
  
                  <InvoiceField
                    label="Bill To"
                    value={invoice.billTo}
                  />
  
                  <div className="sm:col-span-2">
                    <InvoiceField
                      label="Address"
                      value={invoice.address}
                    />
                  </div>
  
                  <InvoiceField
                    label="Payment Terms"
                    value={invoice.paymentTerms}
                  />
  
                  <InvoiceField
                    label="Payment Mode"
                    value={invoice.paymentMode}
                  />
  
                  <InvoiceField
                    label="PO/Reference No"
                    value={invoice.poReference}
                  />
  
                </div>
  
              </div>
  
              {/* ================= INVOICE ITEMS ================= */}
  
              <div className="border border-gray-100 rounded-lg p-4">
  
                <p className="text-purple-600 font-semibold text-sm mb-4">
                  Invoice Items
                </p>
  
                <div className="overflow-x-auto">
  
                  <div className="min-w-[700px]">
  
                    {/* TABLE HEADER */}
  
                    <div className="grid grid-cols-6 text-xs font-semibold text-gray-700 pb-2 border-b border-gray-100">
  
                      <span>#</span>
  
                      <span className="col-span-2">
                        Description
                      </span>
  
                      <span>HS Code</span>
  
                      <span>Qty</span>
  
                      <span>Amount</span>
  
                    </div>
  
                    {/* TABLE ROWS */}
  
                    {items.length > 0 ? (
                      items.map((item, index) => {
  
                        const qty =
                          item.qty ??
                          item.quantity ??
                          0;
  
                        const unitPrice =
                          item.unitPrice ??
                          item.price ??
                          0;
  
                        const amount =
                          toNumber(qty) *
                          toNumber(unitPrice);
  
                        return (
                          <div
                            key={item._id || item.id || index}
                            className="grid grid-cols-6 items-center py-3 border-b border-gray-50 text-sm"
                          >
  
                            <span>
                              {index + 1}
                            </span>
  
                            <span className="col-span-2 text-gray-700">
                              {item.description || "-"}
                            </span>
  
                            <span className="text-gray-500 text-xs">
                              {item.hsCode || "-"}
                            </span>
  
                            <span className="text-gray-500">
                              {qty} {item.unit || ""}
                            </span>
  
                            <span className="text-gray-700 font-medium">
                              ₹{formatAmount(amount)}
                            </span>
  
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-sm text-gray-400">
                        No invoice items available
                      </div>
                    )}
  
                  </div>
  
                </div>
  
              </div>
  
              {/* ================= ADDITIONAL CHARGES ================= */}
  
              <div className="border border-gray-100 rounded-lg p-4">
  
                <div className="flex items-center gap-2 mb-4">
  
                  <DollarSign className="w-4 h-4 text-purple-600" />
  
                  <p className="text-purple-600 font-semibold text-sm">
                    Additional Charges
                  </p>
  
                </div>
  
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
  
                  <InvoiceField
                    label="Freight Charges"
                    value={`₹${formatAmount(freightCharges)}`}
                  />
  
                  <InvoiceField
                    label="Insurance Charges"
                    value={`₹${formatAmount(insuranceCharges)}`}
                  />
  
                  <InvoiceField
                    label="Handling Charges"
                    value={`₹${formatAmount(handlingCharges)}`}
                  />
  
                  <InvoiceField
                    label="Discount"
                    value={`₹${formatAmount(discount)}`}
                  />
  
                </div>
  
                <div className="mt-4">
  
                  <InvoiceField
                    label="Notes to Customer"
                    value={invoice.notes}
                  />
  
                </div>
  
              </div>
  
            </div>
  
            {/* ================= RIGHT SUMMARY ================= */}
  
            <div className="space-y-4">
  
              <div className="border border-gray-100 rounded-lg p-4 sticky top-2">
  
                <p className="text-purple-600 font-semibold text-sm mb-4">
                  Invoice Summary
                </p>
  
                <div className="space-y-3 text-sm">
  
                  <SummaryRow
                    label="Items Subtotal"
                    value={`₹${formatAmount(subtotal)}`}
                  />
  
                  <SummaryRow
                    label="Freight"
                    value={`₹${formatAmount(freightCharges)}`}
                  />
  
                  <SummaryRow
                    label="Insurance"
                    value={`₹${formatAmount(insuranceCharges)}`}
                  />
  
                  <SummaryRow
                    label="Handling"
                    value={`₹${formatAmount(handlingCharges)}`}
                  />
  
                  <div className="flex justify-between">
  
                    <span className="text-gray-500">
                      Discount
                    </span>
  
                    <span className="text-red-500">
                      - ₹{formatAmount(discount)}
                    </span>
  
                  </div>
  
                  <div className="pt-3 border-t border-gray-100">
  
                    <SummaryRow
                      label="Taxable Amount"
                      value={`₹${formatAmount(taxableAmount)}`}
                    />
  
                  </div>
  
                  <SummaryRow
                    label="CGST (9%)"
                    value={`₹${formatAmount(cgst)}`}
                  />
  
                  <SummaryRow
                    label="SGST (9%)"
                    value={`₹${formatAmount(sgst)}`}
                  />
  
                  <div className="flex justify-between pt-4 mt-2 border-t border-gray-100">
  
                    <span className="text-purple-600 font-bold">
                      Total Amount
                    </span>
  
                    <span className="text-purple-600 font-bold text-base">
                      ₹{formatAmount(totalAmount)}
                    </span>
  
                  </div>
  
                </div>
  
              </div>
  
            </div>
  
          </div>
  
          {/* ================= FOOTER ================= */}
  
          <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
  
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200"
            >
              Close
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  
  /* ================================
     REUSABLE FIELD
  ================================ */
  
  function InvoiceField({ label, value }) {
    return (
      <div>
        <label className="block text-xs text-gray-500 mb-1">
          {label}
        </label>
  
        <div className="min-h-[38px] flex items-center px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800">
          {value || "-"}
        </div>
      </div>
    );
  }
  
  
  /* ================================
     SUMMARY ROW
  ================================ */
  
  function SummaryRow({ label, value }) {
    return (
      <div className="flex justify-between gap-4">
  
        <span className="text-gray-500">
          {label}
        </span>
  
        <span className="text-gray-900 font-medium text-right">
          {value}
        </span>
  
      </div>
    );
  }