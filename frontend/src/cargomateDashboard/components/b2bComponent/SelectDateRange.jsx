import { useState, useMemo } from "react";
import { FiX, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const QUICK_OPTIONS = ["Today", "7 Days", "30 Days", "This Month", "Last Month", "This Quarter", "Custom Range"];
const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function DateRangeModal({ isOpen, onClose, onApply }) {
  const [viewDate, setViewDate] = useState(new Date(2026, 7, 1));
  const [startDate, setStartDate] = useState(new Date(2026, 7, 13));
  const [endDate, setEndDate] = useState(new Date(2026, 7, 19));
  const [submitting, setSubmitting] = useState(false);

  const cells = useMemo(
    () => buildCalendar(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  if (!isOpen) return null;

  const isInRange = (day) => {
    if (!day) return false;
    const current = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return current >= startDate && current <= endDate;
  };

  const isEdge = (day) => {
    if (!day) return false;
    const current = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return current.toDateString() === startDate.toDateString() || current.toDateString() === endDate.toDateString();
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const clicked = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (clicked < startDate) {
      setStartDate(clicked);
    } else {
      setEndDate(clicked);
    }
  };

  const handleReset = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
    };
    setSubmitting(true);
    try {
      const response = await fetch("/api/dashboard/date-range", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      onApply && onApply(data, payload);
      onClose && onClose();
    } catch (error) {
      console.error("Failed to apply date range", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 p-2 sm:p-4 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-xl my-4 sm:my-0 p-4 sm:p-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <FiCalendar className="text-blue-600 mt-0.5" size={20} />
            <div>
              <p className="text-sm sm:text-base font-semibold text-gray-900">Select Date Range</p>
              <p className="text-xs text-gray-500">Choose a period for dashboard data</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={18} />
          </button>
        </div>

        <p className="text-xs font-semibold text-gray-500 mt-4 mb-2">Quick Select</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => option === "Custom Range" && null}
              className="border border-gray-200 rounded-md px-3 py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-50"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg mt-4 p-3">
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
              className="text-gray-500 hover:text-gray-800"
            >
              <FiChevronLeft size={16} />
            </button>
            <p className="text-sm font-semibold text-gray-900">
              {viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <button
              type="button"
              onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
              className="text-gray-500 hover:text-gray-800"
            >
              <FiChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center">
            {WEEK_DAYS.map((day) => (
              <span key={day} className="text-xs text-gray-500">
                {day}
              </span>
            ))}
            {cells.map((day, i) => (
              <button
                type="button"
                key={i}
                disabled={!day}
                onClick={() => handleDayClick(day)}
                className={`text-sm py-1.5 rounded-md ${
                  !day
                    ? "cursor-default"
                    : isEdge(day)
                    ? "bg-blue-600 text-white font-semibold"
                    : isInRange(day)
                    ? "bg-rose-50 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {day || ""}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <label className="text-xs text-gray-500">Start Date</label>
            <input
              type="date"
              value={startDate.toISOString().slice(0, 10)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="w-full text-sm text-gray-900 font-medium border border-gray-200 rounded-md px-2 py-1.5 mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">End Date</label>
            <input
              type="date"
              value={endDate.toISOString().slice(0, 10)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="w-full text-sm text-gray-900 font-medium border border-gray-200 rounded-md px-2 py-1.5 mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5">
          <button
            type="button"
            onClick={handleReset}
            className="border border-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-200 rounded-md py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 rounded-md py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Applying..." : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
}