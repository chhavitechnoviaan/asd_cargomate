import { useState, useEffect, useMemo } from "react";
import { getDashboardRecentUploads } from "../../api/DocumentApi";
import { FiX, FiUploadCloud, FiSearch, FiFilter } from "react-icons/fi";

/*const uploads = [
  { name: "Commercial Invoice", ref: "INV-2025-0424.pdf", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "09:25 AM", by: "Arjun Soni", size: "245 KB" },
  { name: "Commercial Invoice", ref: "PKL-2025-0424.xlsx", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "09:28 AM", by: "Priya Shah", size: "128 KB" },
  { name: "Certificate of origin", ref: "COO-2025-0424.pdf", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "10:05 AM", by: "Rohit Verma", size: "312 KB" },
  { name: "Goods Photo", ref: "IMG-2025-0424.jpg", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "10:12 AM", by: "Arjun Soni", size: "1.2 MB" },
  { name: "Insurance Certificate", ref: "INS-2025-0424.pdf", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "10:20 AM", by: "Priya Shah", size: "198 KB" },
  { name: "Weight List", ref: "WGT-2025-0424.xlsx", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "10:35 AM", by: "Rohit Verma", size: "98 KB" },
  { name: "Bill of Lading", ref: "BOL-2025-0424.docx", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "11:02 AM", by: "Arjun Soni", size: "256 KB" },
  { name: "Delivery Note", ref: "DN-2025-0424.xslx", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "11:18 AM", by: "Priya Shah", size: "176 KB" },
  { name: "Seal Photo", ref: "SP-2025-0424.jpg", refId: "PLN-2025-04-24-000123", date: "24 Apr 2025", time: "11:45 AM", by: "Rohit Verma", size: "109 KB" },
];*/

export default function AllRecentUploadsModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
 const [uploads, setUploads] = useState([]);
 const [loading, setLoading] = useState(false);

 const fetchRecentUploads = async () => {
    try {
      setLoading(true);

      const res = await getDashboardRecentUploads();

      console.log("Recent Uploads:", res.data);

      setUploads(res.data.data || []);
    } catch (error) {
      console.error("Error fetching recent uploads:", error);
      setUploads([]);
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
    fetchRecentUploads();
  }, []);

  const filteredUploads = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return uploads;

    return uploads.filter((u) =>
      [
        u.documentName,
        u.fileName,
        u.fileUrl,
        u.shipmentId?.sbNumber,
        u.uploadedBy?.name,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(term)
        )
    );
  }, [searchTerm, uploads]);


  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl mt-4 sm:mt-10 p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
              <FiUploadCloud size={18} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                All Recent Uploads
              </h2>
              <p className="text-sm text-teal-600">
                View all recently uploaded documents
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0">
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 border border-gray-200 text-sm text-gray-700 px-4 py-2.5 rounded-lg shrink-0"
          >
            <FiFilter size={14} />
            Filters
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-5 text-xs font-semibold text-gray-500 px-1 pb-2">
              <span>Document Name</span>
              <span>Refrence ID</span>
              <span>Uploaded on</span>
              <span>Uploaded by</span>
              <span>Size</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {filteredUploads.map((u, i) => (
                <div key={u._id || i} className="grid grid-cols-5 items-center px-1 py-3 gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{u.documentName || "Document"}</p>
                    <p className="text-xs text-teal-600 truncate">{u.fileName ||
                          u.fileUrl?.split("/").pop() ||
                          "-"}</p>
                  </div>
                  <span className="text-xs text-gray-500">{u.shipmentId?.sbNumber || "-"}</span>
                  <div className="text-xs text-gray-500">
                    <p>{u.createdAt
                          ? new Date(
                              u.createdAt
                            ).toLocaleDateString()
                          : "-"}</p>
                    <p>{u.createdAt
                          ? new Date(
                              u.createdAt
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-"}</p>
                  </div>
                  <span className="text-xs text-gray-700">{u.uploadedBy?.name || "-"}</span>
                  <span className="text-xs text-gray-500">{u.fileSize || "-"}</span>
                </div>
              ))}
              {filteredUploads.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">
                  No documents found.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="border border-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

