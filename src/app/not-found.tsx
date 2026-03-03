import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-black/70 dark:text-white/70">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/">Go home</Button>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-black/70 hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
              href="/contact"
            >
              Contact campus
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

