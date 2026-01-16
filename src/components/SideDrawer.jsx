import { X } from "lucide-react";

export default function SideDrawer({ open, onClose, title, children }) {
  return (
    <div
      className={`
        fixed inset-0 z-[60]
        transition-opacity duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          absolute top-0 right-0 h-full w-[90%] max-w-md bg-white
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
