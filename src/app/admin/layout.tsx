import type { ReactNode } from "react";

import { PageHeader } from "@/components/layout/PageHeader";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="pb-16">
      <PageHeader
        title="Admin area"
        description="Manage notices, events, and staff. Do not expose this publicly without proper authentication."
      />
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </div>
  );
}

