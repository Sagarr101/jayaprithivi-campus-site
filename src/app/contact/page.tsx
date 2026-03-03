import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.fullName}.`,
};

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Contact"
        description="Get in touch with the campus administration."
      />

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContactForm />
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Campus office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-black/75 dark:text-white/75">
                <div>
                  <div className="text-xs font-semibold text-black/60 dark:text-white/60">
                    Address
                  </div>
                  <div className="mt-1">{site.contact.address}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-black/60 dark:text-white/60">
                    Phone
                  </div>
                  <div className="mt-1">{site.contact.phone}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-black/60 dark:text-white/60">
                    Email
                  </div>
                  <div className="mt-1">
                    <a
                      className="font-medium underline underline-offset-4 hover:no-underline"
                      href={`mailto:${site.contact.email}`}
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-[4/3] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_55%),linear-gradient(45deg,color-mix(in_srgb,var(--ring)_18%,transparent),transparent_55%)]" />
              <CardContent className="pt-4 text-sm text-black/75 dark:text-white/75">
                Add a Google Maps embed link here when you have it.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

