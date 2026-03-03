import Link from "next/link";

import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white dark:border-white/10 dark:bg-black">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-base font-semibold">{site.fullName}</div>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            {site.location}. Affiliated to{" "}
            <a
              className="font-medium underline underline-offset-4 hover:no-underline"
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
          <div className="text-sm font-semibold">Quick links</div>
          <ul className="mt-3 grid gap-2 text-sm text-black/70 dark:text-white/70">
            {site.nav.slice(0, 6).map((i) => (
              <li key={i.href}>
                <Link className="hover:underline underline-offset-4" href={i.href}>
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">Contact</div>
          <ul className="mt-3 grid gap-2 text-sm text-black/70 dark:text-white/70">
            <li>
              <span className="font-medium text-black dark:text-white">Address:</span>{" "}
              {site.contact.address}
            </li>
            <li>
              <span className="font-medium text-black dark:text-white">Phone:</span>{" "}
              {site.contact.phone}
            </li>
            <li>
              <span className="font-medium text-black dark:text-white">Email:</span>{" "}
              <a className="hover:underline underline-offset-4" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 py-6 text-center text-xs text-black/60 dark:border-white/10 dark:text-white/60">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}

