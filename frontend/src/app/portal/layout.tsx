import Link from "next/link";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { StatusBadge } from "@/components/ui/status-badge";
import { NotificationBell } from "@/components/portal/notification-bell";
import { getMyNotifications } from "@/lib/notifications-actions";
import { SaafLogo } from "@/components/ui/saaf-logo";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const { notifications, unreadCount } = session?.user
    ? await getMyNotifications()
    : { notifications: [], unreadCount: 0 };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <SaafLogo variant="horizontal" size="sm" />
          </Link>
          {session?.user && (
            <div className="flex items-center gap-3">
              <NotificationBell initialNotifications={notifications} initialUnreadCount={unreadCount} />
              <span className="text-sm font-semibold text-slate-800">{session.user.name}</span>
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
