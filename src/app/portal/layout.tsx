import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { StatusBadge } from "@/components/ui/status-badge";
import { NotificationBell } from "@/components/portal/notification-bell";
import { getMyNotifications } from "@/lib/notifications-actions";

/**
 * Minimal portal shell for Milestone 7 — proves auth/session/RBAC work end
 * to end. The real Applicant/Assessor/Admin sidebar navigation and density
 * (Phase 4/8/9/10) is built out in Milestones 8-10; this is intentionally
 * bare-bones so it doesn't have to be redone.
 */
export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const { notifications, unreadCount } = session?.user
    ? await getMyNotifications()
    : { notifications: [], unreadCount: 0 };

  return (
    <div className="flex min-h-screen flex-col bg-background-portal">
      <header className="sticky top-0 z-20 border-b border-border-portal bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="size-6 text-primary" strokeWidth={1.75} />
            <span className="font-sans text-sm font-semibold text-text">
              SAAF
            </span>
          </Link>
          {session?.user && (
            <div className="flex items-center gap-3">
              <NotificationBell initialNotifications={notifications} initialUnreadCount={unreadCount} />
              <span className="font-sans text-sm text-text-muted">{session.user.name}</span>
              <StatusBadge tone="neutral" label={session.user.role} size="sm" />
              <LogoutButton />
            </div>
          )}
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
