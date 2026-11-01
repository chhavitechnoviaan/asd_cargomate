import React, { useState, useEffect } from "react";
import { Megaphone, X } from "lucide-react";
import API from "../api/axios";
import defaultShipImg from "../assets/Images/webp/shipmentImg.webp";

export default function NoticeBanner() {
  const [notice, setNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchActiveNotice = async () => {
    try {
      const res = await API.get("/notices/active");
      if (res.data?.status && res.data.data) {
        setNotice(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching active notice:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveNotice();
  }, []);

  if (loading || !notice) return null;

  return (
    <>
      {/* Top Navigation Banner Strip (Image 2) */}
      <div className="flex-1 max-w-2xl bg-[#e6f7f6] border border-teal-200/80 rounded-xl px-3.5 py-1.5 flex items-center justify-between gap-3 mx-2 sm:mx-4 shadow-sm animate-in fade-in duration-200">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="text-teal-600 shrink-0 p-1 bg-teal-100/60 rounded-lg">
            <Megaphone className="w-4 h-4 -rotate-12" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-800 leading-tight truncate">
              {notice.title || "Important Shipping Notice"}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
              {notice.description || "Please review the latest shipping guidelines before booking your next shipment."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3.5 py-1 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm shrink-0"
        >
          View
        </button>
      </div>

      {/* Modal Popup (Image 1) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {notice.title || "Important Shipping Notice"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Graphic Card Body (Image 1) */}
            <div className="mt-4 rounded-xl overflow-hidden shadow-md border border-slate-200 flex flex-col sm:flex-row bg-[#0b1f3a] text-white">
              
              {/* Left Content */}
              <div className="p-6 sm:w-1/2 flex flex-col justify-center space-y-3 relative z-10">
                <div className="inline-block">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                    <span>{notice.subtitle?.split(" ")[0] || "Shipping"}</span>
                    <span className="text-[#00d2c4] block">
                      {notice.subtitle?.split(" ").slice(1).join(" ") || "Guidelines"}
                    </span>
                  </h2>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {notice.description}
                </p>

                {notice.details && (
                  <p className="text-[11px] text-slate-300/80 leading-relaxed pt-1 border-t border-slate-700/60">
                    {notice.details}
                  </p>
                )}
              </div>

              {/* Right Image */}
              <div className="sm:w-1/2 relative min-h-[160px] sm:min-h-full overflow-hidden">
                <img
                  src={notice.image ? (notice.image.startsWith("http") ? notice.image : `http://localhost:8000${notice.image}`) : defaultShipImg}
                  alt="Shipping Vessel"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f3a] via-transparent to-transparent sm:block hidden" />
              </div>

            </div>

            {/* Footer Close Button */}
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm text-center"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

