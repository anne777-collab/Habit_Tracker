import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "AI insights are not configured" }, { status: 503 });
  const user = await prisma.user.findUniqueOrThrow({ where: { email: session.user.email } });
  const since = new Date(); since.setUTCDate(since.getUTCDate() - 30);
  const [completions, moods, journals] = await Promise.all([
    prisma.habitCompletion.count({ where: { habit: { userId: user.id }, date: { gte: since } } }),
    prisma.moodEntry.findMany({ where: { userId: user.id, date: { gte: since } }, select: { score: true } }),
    prisma.journalEntry.findMany({ where: { userId: user.id, date: { gte: since }, includeInAi: true }, select: { content: true }, take: 5 }),
  ]);
  const averageMood = moods.length ? (moods.reduce((sum, entry) => sum + entry.score, 0) / moods.length).toFixed(1) : "not recorded";
  const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const result = await ai.chat.completions.create({ model: "gpt-4o-mini", messages: [{ role: "system", content: "You are a supportive habit coach. Give a concise, practical monthly reflection. Never make medical claims." }, { role: "user", content: `Last 30 days: ${completions} habit completions; average mood: ${averageMood}; opt-in notes: ${journals.map(j => j.content).join(" | ") || "none"}` }] });
  const content = result.choices[0]?.message.content ?? "Keep showing up—small actions compound.";
  const insight = await prisma.aiInsight.create({ data: { userId: user.id, periodStart: since, periodEnd: new Date(), content } });
  return NextResponse.json(insight);
}
