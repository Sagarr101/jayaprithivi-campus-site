import Link from "next/link";

import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-[color:var(--accent)] bg-[color:var(--primary)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt={`${site.name} Logo`} className="size-8 rounded-lg object-contain bg-white/10" />
            <div className="text-lg font-bold text-white">{site.fullName}</div>
          </div>
          <p className="mt-2 text-sm text-white/80">
            {site.location}. Affiliated to{" "}
            <a
              className="font-medium text-[color:var(--accent)] underline underline-offset-4 hover:no-underline"
              href={site.links.university}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.affiliation}
            </a>
            .
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-[color:var(--accent)] uppercase tracking-wider">Quick links</div>
          <ul className="mt-4 grid gap-3 text-sm text-white/80">
            {site.nav.slice(0, 6).map((i) => (
              <li key={i.href}>
                <Link className="hover:text-white transition-colors" href={i.href}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-[color:var(--accent)] uppercase tracking-wider">Contact</div>
          <ul className="mt-4 grid gap-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <span className="font-medium text-white">Address:</span>{" "}
              <span>{site.contact.address}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-white">Phone:</span>{" "}
              <span>+977-92-420123</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-medium text-white">Email:</span>{" "}
              <a className="hover:underline underline-offset-4" href="mailto:info@jayaprithivicampus.edu.np">
                info@jayaprithivicampus.edu.np
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © 2026 Jayaprithivi Campus. All Rights Reserved.
      </div>
    </footer>
  );
}

