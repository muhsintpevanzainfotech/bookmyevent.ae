import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MapPin, X, Search, Crosshair } from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* Move map when center changes */
function MapMover({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], 14);
  }, [center]);
  return null;
}

/* Update center when user drags map */
function CenterWatcher({ onMove }) {
  const map = useMap();
  useEffect(() => {
    map.on("moveend", () => {
      const c = map.getCenter();
      onMove({ lat: c.lat, lng: c.lng });
    });
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

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  /* Search by text */
  const searchLocation = async (q) => {
    setQuery(q);
    if (q.length < 3) return setResults([]);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5`
    );
    const data = await res.json();
    setResults(data);
  };

  /* Select search result */
  const selectPlace = (place) => {
    setCenter({
      lat: Number(place.lat),
      lng: Number(place.lon),
    });
    setQuery(place.display_name);
    setResults([]);
  };

  /* Use current location */
  const useCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
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
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {/* SEARCH + CURRENT LOCATION */}
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
          <div className="flex-1 relative">
            <MapContainer
              center={[center.lat, center.lng]}
              zoom={14}
              className="h-full w-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapMover center={center} />
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
