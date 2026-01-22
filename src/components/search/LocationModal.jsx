import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { MapPin, X, Search, Crosshair } from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* ===============================
   WATCH MAP MOVE (SAFE)
================================ */
function CenterWatcher({ onMove }) {
  const map = useMap();
  const onMoveRef = useRef(onMove);

  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);

  useEffect(() => {
    const handler = () => {
      const c = map.getCenter();
      onMoveRef.current({ lat: c.lat, lng: c.lng });
    };

    map.on("moveend", handler);
    return () => map.off("moveend", handler);
  }, [map]);

  return null;
}

export default function LocationModal({
  open,
  onClose,
  center,
  setCenter,
  onPick,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // IMPORTANT: map initial center (no rerender loop)
  const initialCenter = useRef([center.lat, center.lng]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  /* ===============================
     SEARCH LOCATION
  ================================ */
  const searchLocation = async (q) => {
    setQuery(q);
    if (q.length < 3) return setResults([]);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5`
    );
    const data = await res.json();
    setResults(data);
  };

  /* ===============================
     SELECT SEARCH RESULT
  ================================ */
  const selectPlace = (place) => {
    const lat = Number(place.lat);
    const lng = Number(place.lon);

    setCenter({ lat, lng });
    initialCenter.current = [lat, lng];

    setQuery(place.display_name);
    setResults([]);
  };

  /* ===============================
     CURRENT LOCATION
  ================================ */
  const useCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setCenter({ lat, lng });
        initialCenter.current = [lat, lng];
        setLoading(false);
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

  return createPortal(
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 z-[9998] bg-black/60"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-3xl h-[90vh] rounded-xl overflow-hidden flex flex-col shadow-2xl">

          {/* HEADER */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="font-semibold">Select Location</h2>
            <button onClick={onClose}><X /></button>
          </div>

          {/* SEARCH */}
          <div className="px-4 py-3 border-b space-y-2 relative">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                value={query}
                onChange={(e) => searchLocation(e.target.value)}
                placeholder="Search city, area..."
                className="w-full outline-none px-2 text-sm"
              />
            </div>

            <button
              onClick={useCurrentLocation}
              className="flex items-center gap-2 text-green-600 text-sm font-medium"
            >
              <Crosshair size={16} />
              {loading ? "Detecting location..." : "Use current location"}
            </button>

            {results.length > 0 && (
              <div className="absolute top-full left-4 right-4 bg-white border rounded-lg shadow max-h-52 overflow-auto z-[9999]">
                {results.map((r) => (
                  <div
                    key={r.place_id}
                    onClick={() => selectPlace(r)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {r.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MAP */}
          <div className="relative h-[60vh]">
            <MapContainer
              center={initialCenter.current}
              zoom={14}
              className="h-full w-full"
              whenReady={(map) => {
                setTimeout(() => {
                  map.target.invalidateSize();
                }, 200);
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <CenterWatcher onMove={setCenter} />
            </MapContainer>

            {/* CENTER PIN */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <MapPin size={40} className="text-green-600 drop-shadow-xl" />
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t">
            <button
              onClick={onPick}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
            >
              Pick This Location
            </button>
          </div>

        </div>
      </div>
    </>,
    document.body
  );
}
