/**
 * Pure, no-Prisma-import copy lookup — deliberately separate from
 * notifications.ts (which imports the Prisma client) so a Client Component
 * (the notification bell) can import just this without pulling Node-only
 * Prisma code into the client bundle. Same underlying rule as the
 * server/client boundary lessons from Milestones 8/10/12, applied
 * proactively here instead of discovered via a build error.
 */
const NOTIFICATION_COPY: Record<string, { title: string; body: string }> = {
  "application.information_requested": {
    title: "Information requested",
    body: "A reviewer has requested more information on your application.",
  },
  "application.decision_recorded.accredit": {
    title: "Application accredited",
    body: "Your application has been accredited.",
  },
  "application.decision_recorded.decline": {
    title: "Application decision recorded",
    body: "A decision has been recorded on your application.",
  },
  "application.decision_recorded.request_more_info": {
    title: "More information requested",
    body: "A decision-maker has requested more information before deciding on your application.",
  },
};

export function getNotificationCopy(type: string) {
  return NOTIFICATION_COPY[type] ?? { title: type, body: "" };
}
