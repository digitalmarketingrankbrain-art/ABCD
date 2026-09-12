import { prisma } from "@/lib/prisma";

export interface ProgramFee {
  amount: number;
  currency: string;
}

/**
 * Real fee data from the Prisma `Program` table (seeded, Milestone 11),
 * keyed by slug so it can be merged into the public site's static program
 * copy (src/lib/programs.ts) without changing that file's shape or the
 * other pages that read from it.
 */
export async function getProgramFees(): Promise<Record<string, ProgramFee>> {
  const rows = await prisma.program.findMany({ select: { slug: true, feeAmount: true, currency: true } });
  return Object.fromEntries(rows.map((r) => [r.slug, { amount: Number(r.feeAmount), currency: r.currency }]));
}
