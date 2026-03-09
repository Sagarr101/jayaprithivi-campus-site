import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer style={{ background: "linear-gradient(135deg, #0f172a 0%, #134e4a 100%)", borderTop: "4px solid #f97316" }} className="text-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* About Campus */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt={`${site.name} Logo`} className="w-10 h-10 rounded-lg object-contain" style={{ background: "rgba(255,255,255,0.1)" }} />
            <div className="text-lg font-bold text-white">{site.fullName}</div>
          </div>
          <p className="mt-2 text-sm text-gray-300 leading-7">
            {site.location}. Affiliated to{" "}
            <a
              className="font-bold underline underline-offset-4 hover:no-underline"
              style={{ color: "#f97316" }}
              href={site.links.university}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.affiliation}
            </a>
            .
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#f97316" }}>Quick Links</div>
          <ul className="grid gap-3 text-sm">
            {site.nav.slice(0, 6).map((i) => (
              <li key={i.href}>
                <Link className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-4" href={i.href}>
                  → {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Admissions */}
        <div>
          <div className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#f97316" }}>Admissions</div>
          <ul className="grid gap-3 text-sm">
            <li>
              <Link className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-4" href="/admissions">
                → Apply Now
              </Link>
            </li>
            <li>
              <Link className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-4" href="/courses">
                → Explore Courses
              </Link>
            </li>
            <li>
              <Link className="text-gray-300 hover:text-white transition-colors hover:underline underline-offset-4" href="/contact">
                → Contact Admissions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#f97316" }}>Contact Information</div>
          <ul className="grid gap-3 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span style={{ color: "#0d9488" }}>📍</span>
              <span>{site.contact.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#0d9488" }}>📞</span>
              <span>+977-92-420123</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "#0d9488" }}>✉️</span>
              <a className="hover:underline underline-offset-4" style={{ color: "#f97316" }} href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: "#f97316" }}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: "#f97316" }}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184A4.92 4.92 0 0 0 16.616 3c-2.717 0-4.92 2.206-4.92 4.917 0 .386.044.762.127 1.124C7.691 8.834 4.066 6.87 1.64 3.905c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.213 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 1.982 1.388 3.834 3.444 4.252a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.419A9.868 9.868 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.634A10.025 10.025 0 0 0 24 4.557z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:opacity-80" style={{ color: "#f97316" }}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.981.981-1.264 2.093-1.323 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.342 2.393 1.323 3.374.981.981 2.093 1.264 3.374 1.323C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.281-.059 2.393-.342 3.374-1.323.981-.981 1.264-2.093 1.323-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.342-2.393-1.323-3.374-.981-.981-2.093-1.264-3.374-1.323C15.668.013 15.259 0 12 0z"/><path d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.324A4.162 4.162 0 1 1 16.162 12 4.162 4.162 0 0 1 12 16.162zm6.406-11.845a1.44 1.44 0 1 1-2.881 0 1.44 1.44 0 0 1 2.881 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="py-6 text-center text-xs text-gray-400" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        © 2026 Jayaprithivi Campus. All Rights Reserved. &nbsp;|&nbsp; Powered by{" "}
        <span style={{ color: "#f97316" }}>Far Western University</span>
      </div>
    </footer>
  );
}
