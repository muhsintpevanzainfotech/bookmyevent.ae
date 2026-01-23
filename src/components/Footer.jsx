import {
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const modules = useSelector((s) => s.modules?.modules || []);
  const secondaryModules = useSelector(
    (s) => s.secondaryModules?.secondaryModules || []
  );

  return (
    <footer className="bg-black text-gray-300 mb-10 md:mb-0">

      {/* ================= TOP INQUIRY BAR ================= */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-4 gap-6 text-sm">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-red-500" />
            <div>
              <p className="font-semibold text-white">To More Inquiry</p>
              <p>Don’t hesitate Call to Book My Event.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              className="h-8"
            />
            <div>
              <p className="text-white font-medium">WhatsApp</p>
              <p>+91 98959 65552</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-blue-500" />
            <div>
              <p className="text-white font-medium">Mail Us</p>
              <p>support@bookmyevent.ae</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-green-500" />
            <div>
              <p className="text-white font-medium">Call Us</p>
              <p>+91 90377 90900</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        {/* LOGO + ADDRESS */}
        <div>
          <img src="/menu.svg" className="h-14 mb-4" />
          <p className="text-sm leading-6">
            Book My Event <br />
            Evanza Technologies Pvt Ltd <br />
            Pallath Tower, North Kalamassery <br />
            Kochi, Kerala 683104
          </p>

          <div className="flex gap-4 mt-4">
            <Facebook />
            <Instagram />
            <Linkedin />
            <Youtube />
          </div>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            className="h-12 mt-6"
          />
        </div>

        {/* ================= MAIN SERVICES (API) ================= */}
        <div>
          <h4 className="text-white font-semibold mb-4">Main Services</h4>
          <ul className="space-y-2 text-sm">
            {modules.map((m) => (
              <li key={m._id}>
                <NavLink
                  to={`/service/${m.title.toLowerCase().replace(/\s+/g, "-")}/${m._id}`}
                  className="hover:text-white"
                >
                  {m.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= OTHER SERVICES (API) ================= */}
        <div>
          <h4 className="text-white font-semibold mb-4">Other Services</h4>
          <ul className="space-y-2 text-sm">
            {secondaryModules.map((s) => (
              <li key={s._id}>
                <NavLink
                  to={`/otherservice/${s.title.toLowerCase().replace(/\s+/g, "-")}/${s._id}`}
                  className="hover:text-white"
                >
                  {s.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* ================= RESOURCES ================= */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
            <li><NavLink to="/about" className="hover:text-white">About Book My Event</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-white">Contact</NavLink></li>
            <li><NavLink to="/insight" className="hover:text-white">Insight</NavLink></li>
            <li><NavLink to="/terms" className="hover:text-white">Terms & Condition</NavLink></li>
            <li><NavLink to="/privacy" className="hover:text-white">Privacy Policy</NavLink></li>
            <li><NavLink to="/refund" className="hover:text-white">Cancellation & Refund</NavLink></li>
            <li><NavLink to="/sitemap" className="hover:text-white">Sitemap</NavLink></li>
          </ul>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>
            © 2025 <span className="text-white">Book My Event</span> | All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            <span>Accepted Payment Methods:</span>
            <img src="/payments/mastercard.png" className="h-6" />
            <img src="/payments/visa.png" className="h-6" />
            <img src="/payments/paypal.png" className="h-6" />
            <img src="/payments/gpay.png" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
}
