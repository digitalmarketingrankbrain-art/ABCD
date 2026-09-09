export interface AuditLogEntry {
  id: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  reason: string | null;
  before: string | null;
  after: string | null;
  timestamp: string;
}

/**
 * Append-only in-memory log — stands in for the Phase 12 AuditLog table
 * (INSERT-only DB grant) until Milestone 11. Every admin mutation writes
 * here; nothing in this module ever deletes or edits an entry.
 */
const entries: AuditLogEntry[] = [];

export function logAction(input: {
  actorName: string;
  actorRole: string;
  action: string;
  targetType: string;
  targetId: string;
  reason?: string | null;
  before?: string | null;
  after?: string | null;
}) {
  entries.push({
    id: `audit-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    actorName: input.actorName,
    actorRole: input.actorRole,
    action: input.action,
    targetType: input.targetType,
    targetId: input.targetId,
    reason: input.reason ?? null,
    before: input.before ?? null,
    after: input.after ?? null,
    timestamp: new Date().toISOString(),
  });
}

export function getAuditLog(): AuditLogEntry[] {
  return [...entries].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function getAuditLogForTarget(targetType: string, targetId: string): AuditLogEntry[] {
  return getAuditLog().filter((e) => e.targetType === targetType && e.targetId === targetId);
}
