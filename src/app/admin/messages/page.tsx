import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/date";
import { prisma } from "@/lib/prisma";

export default async function AdminMessagesPage() {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Enquiry Messages</h1>
            <Card>
                <CardHeader>
                    <CardTitle>All Messages ({messages.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {messages.length === 0 ? (
                        <div className="text-sm text-black/60 dark:text-white/60">No messages received yet.</div>
                    ) : (
                        <div className="grid gap-4">
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5"
                                >
                                    <div className="flex flex-wrap justify-between gap-2 mb-3">
                                        <div>
                                            <div className="font-semibold">{m.name}</div>
                                            <div className="text-xs text-black/60 dark:text-white/60 mt-0.5">
                                                {m.email}
                                                {m.phone ? ` · ${m.phone}` : ""}
                                            </div>
                                        </div>
                                        <div className="text-xs text-black/40 dark:text-white/40">
                                            {formatDate(m.createdAt.toISOString().slice(0, 10))}
                                        </div>
                                    </div>
                                    <div className="text-sm text-black/75 dark:text-white/75 whitespace-pre-line">
                                        {m.message}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
