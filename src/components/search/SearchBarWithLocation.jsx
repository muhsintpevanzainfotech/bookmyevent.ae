import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import LocationModal from "./LocationModal";

export default function SearchBarWithLocation() {
  const [city, setCity] = useState(null);
  const [open, setOpen] = useState(false);
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 });

  const getCityName = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();

    setCity(
      data.address.city ||
        data.address.town ||
        data.address.village ||
        "Selected"
    );
  };

  const pickLocation = async () => {
    await getCityName(center.lat, center.lng);
    setOpen(false);
  };

  return (
    <>
      {/* SEARCH BAR */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center bg-gray-100 rounded px-4 py-2 shadow-sm">

          {/* SEARCH ICON */}
          <Search size={18} className="text-gray-400" />

          {/* INPUT */}
          <input
            type="text"
            placeholder="Find your best package"
            className="flex-1 bg-transparent outline-none px-3 text-sm"
          />

          {/* DIVIDER */}
          <div className="h-5 w-px bg-gray-300 mx-2" />

          {/* LOCATION */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 max-w-[140px]"
          >
            <MapPin size={16} className="text-green-600 shrink-0" />

            <span className="truncate">
              {city ? city : "Select location"}
            </span>
          </button>
        </div>
      </div>

      {/* LOCATION MODAL */}
      <LocationModal
        open={open}
        onClose={() => setOpen(false)}
        center={center}
        setCenter={setCenter}
        onPick={pickLocation}
      />
    </>
  );
}
