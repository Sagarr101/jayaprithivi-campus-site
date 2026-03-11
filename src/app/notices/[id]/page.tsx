import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/date";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const notice = await prisma.notice.findUnique({
    where: { id: Number(id) },
  });
  return {
    title: notice?.title ?? "Notice Not Found",
  };
}

export default async function NoticeDetailPage({ params }: Props) {
  const { id } = await params;
  const notice = await prisma.notice.findUnique({
    where: { id: Number(id) },
  });

  if (!notice) notFound();

  const categoryColors: Record<string, string> = {
    general:   "bg-gray-100 text-gray-700",
    academic:  "bg-blue-100 text-blue-700",
    exam:      "bg-orange-100 text-orange-700",
    event:     "bg-purple-100 text-purple-700",
    admission: "bg-green-100 text-green-700",
  };

  return (
    <div>
      <div className="bg-indigo-900 text-white py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <Link href="/notices" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 transition-colors">
            ← Back to Notices
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[notice.category] ?? categoryColors.general}`}>
              {notice.category}
            </span>
            <span className="text-white/60 text-sm">
              {formatDate(notice.createdAt.toISOString().slice(0, 10))}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {notice.title}
          </h1>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 border border-gray-100">
          <div className="prose prose-lg max-w-none text-gray-700 leading-8 whitespace-pre-wrap">
            {notice.content}
          </div>
          <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Published on {formatDate(notice.createdAt.toISOString().slice(0, 10))}
            </span>
            <Link href="/notices" className="px-6 py-2.5 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors text-sm">
              ← All Notices
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}