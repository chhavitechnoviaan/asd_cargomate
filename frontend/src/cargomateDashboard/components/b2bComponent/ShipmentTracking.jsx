import React, { useState, useEffect } from "react";
import { getShipmentTracker } from "../../api/ShipmentApi";
import {
  X,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Maximize2,
  Plane,
  MapPin,
} from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const originPosition = [11.1085, 77.3411];
const currentPosition = [24.4667, 58.5];
const destinationPosition = [25.2048, 55.2708];

function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-600">
      {status || "Pending"}
    </span>
  );
}

function TrackingStep({ step, isLast }) {
  const isDone = step.status === "done";
  const isCurrent = step.status === "current";

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        {isDone ? (
          <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <CheckCircle2
              className="w-5 h-5 text-emerald-500 -m-px"
              strokeWidth={2}
              fill="white"
            />
          </span>
        ) : isCurrent ? (
          <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 ring-4 ring-orange-100">
            <span className="w-2 h-2 rounded-full bg-white" />
          </span>
        ) : (
          <Circle
            className="w-5 h-5 text-gray-300 flex-shrink-0"
            strokeWidth={2}
          />
        )}

        {!isLast && (
          <span
            className={`w-px flex-1 min-h-[28px] ${
              isDone ? "bg-emerald-300" : "bg-gray-200"
            }`}
          />
        )}
      </div>

      <div className="pb-5">
        <p
          className={`text-sm font-medium ${
            isCurrent
              ? "text-orange-600"
              : isDone
              ? "text-gray-900"
              : "text-gray-400"
          }`}
        >
          {step.title}
        </p>

        <p
          className={`text-xs mt-0.5 ${
            isDone || isCurrent ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {step.location}
        </p>

        <p
          className={`text-xs mt-0.5 ${
            isDone || isCurrent ? "text-gray-400" : "text-gray-300"
          }`}
        >
          {step.date}
        </p>

        {step.note && (
          <p
            className={`text-xs italic mt-0.5 ${
              isDone || isCurrent ? "text-gray-400" : "text-gray-300"
            }`}
          >
            {step.note}
          </p>
        )}
      </div>
    </div>
  );
}

const currentLocationIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="flex flex-col items-center -translate-y-2">
      <div className="bg-gray-900 rounded-full p-1.5 shadow-lg border-2 border-white">
        <MapPin
          className="w-3.5 h-3.5 text-white"
          fill="white"
        />
      </div>
    </div>
  ),
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const destinationIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-200 border border-white" />
  ),
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const originIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-200 border border-white" />
  ),
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function TrackingMap({
  origin = originPosition,
  current = currentPosition,
  destination = destinationPosition,
}) {
  return (
    <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-lg overflow-hidden border border-gray-100">
      <MapContainer
        center={current}
        zoom={4}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <Polyline
          positions={[origin, current, destination]}
          pathOptions={{
            color: "#f97316",
            weight: 2,
            dashArray: "6 6",
          }}
        />

        <Marker position={origin} icon={originIcon} />
        <Marker position={current} icon={currentLocationIcon} />
        <Marker position={destination} icon={destinationIcon} />
      </MapContainer>

      <button
        type="button"
        className="absolute top-3 right-3 z-[1000] bg-white rounded-md px-2 py-1.5 shadow text-gray-600 hover:bg-gray-50"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ShipmentTrackingModal({
  open = false,
  onClose = () => {},
  shipmentId = "",
}) {
  const [trackingData, setTrackingData] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState("");

  /*
    Parent se MongoDB _id aa raha hai.
  */
  const trackingId = shipmentId?.trim() || "";

  useEffect(() => {
    if (!open || !trackingId) {
      return;
    }

    let isMounted = true;

    const fetchTracker = async () => {
      try {
        setTrackingLoading(true);
        setTrackingError("");

        console.log(
          "ShipmentTrackingModal - API ID:",
          trackingId
        );

        const response = await getShipmentTracker(trackingId);

        if (!isMounted) return;

        console.log(
          "ShipmentTrackingModal - API Response:",
          response?.data
        );

        const data =
          response?.data?.data ??
          response?.data ??
          response;

        setTrackingData(data);
      } catch (error) {
        console.error(
          "Shipment tracker API error:",
          error
        );

        if (!isMounted) return;

        setTrackingError(
          error?.response?.data?.message ||
            "Unable to fetch tracking details."
        );

        setTrackingData(null);
      } finally {
        if (isMounted) {
          setTrackingLoading(false);
        }
      }
    };

    fetchTracker();

    return () => {
      isMounted = false;
    };
  }, [open, trackingId]);

  useEffect(() => {
    if (!open) {
      setTrackingData(null);
      setTrackingError("");
      setTrackingLoading(false);
    }
  }, [open]);

  /*
    IMPORTANT:
    shipment prop ki zarurat nahi hai.
    Parent already MongoDB _id pass kar raha hai.
  */
  if (!open) return null;

  const tracker =
    trackingData?.tracking ||
    trackingData?.shipment ||
    trackingData?.data ||
    trackingData ||
    {};

  const referenceNumber =
    tracker.referenceNumber ||
    tracker.sbNumber ||
    "-";

  const shipmentStatus =
    tracker.shipmentStatus ||
    tracker.status ||
    "Pending";

  const mode =
    tracker.route?.mode ||
    "-";

  const originCity =
    tracker.route?.originCity ||
    tracker.route?.origin?.city ||
    "-";

  const originCountry =
    tracker.route?.originCountry ||
    tracker.route?.origin?.country ||
    "-";

  const destinationCity =
    tracker.route?.destinationCity ||
    tracker.route?.destination?.city ||
    "-";

  const destinationCountry =
    tracker.route?.destinationCountry ||
    tracker.route?.destination?.country ||
    "-";

  const etd = tracker.etd
    ? new Date(tracker.etd).toLocaleDateString()
    : "-";

  const eta = tracker.eta
    ? new Date(tracker.eta).toLocaleDateString()
    : "-";

  const transitTime =
    tracker.transitTime ||
    "-";

  const timeline =
    tracker.trackingTimeline ||
    tracker.timeline ||
    tracker.trackingHistory ||
    [];

  const trackingSteps =
    Array.isArray(timeline) && timeline.length > 0
      ? timeline.map((item, index) => ({
          title:
            item.status ||
            item.title ||
            item.event ||
            `Tracking Update ${index + 1}`,

          location:
            item.location?.city
              ? `${item.location.city}${
                  item.location.country
                    ? `, ${item.location.country}`
                    : ""
                }`
              : item.location?.name ||
                item.location ||
                "-",

          date:
            item.createdAt
              ? new Date(
                  item.createdAt
                ).toLocaleString()
              : item.date
              ? new Date(
                  item.date
                ).toLocaleString()
              : "-",

          note:
            item.note ||
            item.description ||
            "",

          status:
            item.current === true ||
            item.isCurrent === true
              ? "current"
              : index === timeline.length - 1
              ? "current"
              : "done",
        }))
      : [
          {
            title: shipmentStatus,

            location:
              tracker.liveTracking?.location?.city ||
              tracker.currentLocation?.city ||
              `${originCity}, ${originCountry}`,

            date:
              tracker.updatedAt
                ? new Date(
                    tracker.updatedAt
                  ).toLocaleString()
                : "-",

            status: "current",
          },
        ];

  const currentLocation =
    tracker.liveTracking?.location?.city ||
    tracker.currentLocation?.city ||
    `${originCity}, ${originCountry}`;

  const currentCountry =
    tracker.liveTracking?.location?.country ||
    tracker.currentLocation?.country ||
    "";

  const lastUpdate =
    tracker.liveTracking?.lastUpdate ||
    tracker.lastUpdate ||
    tracker.updatedAt ||
    null;

  const apiOrigin =
    tracker.liveTracking?.originCoordinates ||
    tracker.originCoordinates;

  const apiCurrent =
    tracker.liveTracking?.coordinates ||
    tracker.liveTracking?.currentCoordinates ||
    tracker.currentCoordinates;

  const apiDestination =
    tracker.liveTracking?.destinationCoordinates ||
    tracker.destinationCoordinates;

  const mapOrigin =
    Array.isArray(apiOrigin) &&
    apiOrigin.length === 2
      ? apiOrigin
      : originPosition;

  const mapCurrent =
    Array.isArray(apiCurrent) &&
    apiCurrent.length === 2
      ? apiCurrent
      : currentPosition;

  const mapDestination =
    Array.isArray(apiDestination) &&
    apiDestination.length === 2
      ? apiDestination
      : destinationPosition;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/50">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

        {/* HEADER */}
        <div className="flex items-start justify-between px-4 sm:px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Shipment Tracking
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Track your shipment in real-time and get the latest update.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 space-y-4">

         

          {trackingError && (
            <div className="border border-orange-100 bg-orange-50 rounded-lg px-3 py-2 text-xs text-orange-600">
              {trackingError}
            </div>
          )}

          {/* SUMMARY */}
          <div className="border border-gray-100 rounded-xl px-4 py-3 flex flex-wrap gap-4 sm:gap-8 items-center">

            <StatusBadge status={shipmentStatus} />

            <div className="min-w-[110px]">
              <p className="text-[10px] text-gray-400">
                {mode}
              </p>

              <p className="text-xs font-semibold text-gray-900">
                {referenceNumber}
              </p>
            </div>

            <div className="min-w-[140px] flex items-center gap-2">

              <div>
                <p className="text-[10px] text-gray-400">
                  Route
                </p>

                <p className="text-xs font-semibold text-gray-900">
                  {originCity}, {originCountry}
                </p>
              </div>

              <Plane className="w-3.5 h-3.5 text-gray-300 rotate-90" />

              <div>
                <p className="text-[10px] text-gray-400 invisible">
                  Route
                </p>

                <p className="text-xs font-semibold text-gray-900">
                  {destinationCity}, {destinationCountry}
                </p>
              </div>

            </div>

            <div className="min-w-[90px]">
              <p className="text-[10px] text-gray-400">
                ETD
              </p>

              <p className="text-xs font-semibold text-gray-900">
                {etd}
              </p>
            </div>

            <div className="min-w-[90px]">
              <p className="text-[10px] text-gray-400">
                ETA
              </p>

              <p className="text-xs font-semibold text-gray-900">
                {eta}
              </p>
            </div>

            <div className="min-w-[90px]">
              <p className="text-[10px] text-gray-400">
                Transit Time
              </p>

              <p className="text-xs font-semibold text-gray-900">
                {transitTime}
              </p>
            </div>

          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* TRACKING */}
            <div className="lg:col-span-1 border border-gray-100 rounded-xl p-4">

              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Shipment Status & Tracking
              </h3>

              <div>
                {trackingSteps.map((step, idx) => (
                  <TrackingStep
                    key={`${step.title}-${idx}`}
                    step={step}
                    isLast={
                      idx ===
                      trackingSteps.length - 1
                    }
                  />
                ))}
              </div>

              <button
                type="button"
                className="w-full text-center text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 mt-2 hover:bg-gray-50"
              >
                View Full Tracking History
              </button>

            </div>

            {/* MAP */}
            <div className="lg:col-span-2 border border-gray-100 rounded-xl p-4">

              <div className="flex items-center justify-between mb-3">

                <h3 className="text-sm font-semibold text-gray-900">
                  Live Tracking Map
                </h3>

                <button
                  type="button"
                  className="text-xs font-medium text-emerald-600 flex items-center gap-1"
                >
                  View Fullscreen
                  <Maximize2 className="w-3 h-3" />
                </button>

              </div>

              <TrackingMap
                origin={mapOrigin}
                current={mapCurrent}
                destination={mapDestination}
              />

              <div className="grid grid-cols-3 gap-2 mt-3 text-center">

                {/* CURRENT LOCATION */}
                <div className="border border-gray-100 rounded-lg py-2">

                  <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Current Location
                  </p>

                  <p className="text-xs font-semibold text-gray-900 mt-0.5">
                    {currentLocation}
                  </p>

                  <p className="text-[10px] text-gray-400">
                    {currentCountry}
                  </p>

                </div>

                {/* LAST UPDATE */}
                <div className="border border-gray-100 rounded-lg py-2">

                  <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Last Update
                  </p>

                  <p className="text-xs font-semibold text-gray-900 mt-0.5">
                    {lastUpdate
                      ? new Date(
                          lastUpdate
                        ).toLocaleString()
                      : "-"}
                  </p>

                </div>

                {/* NEXT UPDATE */}
                <div className="border border-gray-100 rounded-lg py-2">

                  <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    Next Update
                  </p>

                  <p className="text-xs font-semibold text-gray-900 mt-0.5">
                    {eta}
                  </p>

                  <p className="text-[10px] text-gray-400">
                    Estimated arrival
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}