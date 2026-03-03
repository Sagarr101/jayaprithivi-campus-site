import * as React from "react";

import { cn } from "@/lib/cn";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium text-black/80 dark:border-white/10 dark:bg-white/10 dark:text-white/80",
        className,
      )}
      {...props}
    />
  );
}

