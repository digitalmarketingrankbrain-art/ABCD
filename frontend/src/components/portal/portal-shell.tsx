import Link from "next/link";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/auth/logout-button";
import { StatusBadge } from "@/components/ui/status-badge";
import { NotificationBell } from "@/components/portal/notification-bell";
import { getMyNotifications } from "@/lib/notifications-actions";
import { BackendUnavailableError } from "@/lib/rpc-client";
import { SaafLogo } from "@/components/ui/saaf-logo";

const PORTAL_LABEL: Record<string, string> = {
  APPLICANT: "CAB Portal",
  ASSESSOR: "Assessor Portal",
  ADMIN: "Admin Portal",
};

export async function PortalShell({ children }: { children: React.ReactNode }) {
  const session = await auth();
  let notifications: Awaited<ReturnType<typeof getMyNotifications>>["notifications"] = [];
  let unreadCount = 0;
  let serviceIssue = false;
  if (session?.user) {
    try {
      ({ notifications, unreadCount } = await getMyNotifications());
    } catch (err) {
      if (!(err instanceof BackendUnavailableError)) throw err;
      serviceIssue = true;
    }
  }

  const userInitial = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50/80 antialiased selection:bg-blue-600 selection:text-white">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <SaafLogo variant="emblem" size="sm" className="sm:hidden" />
            <SaafLogo variant="horizontal" size="sm" className="hidden sm:inline-flex" />
            {session?.user && (
              <span className="hidden sm:inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 uppercase tracking-wider border border-blue-200/60">
                {PORTAL_LABEL[session.user.role] ?? "Portal"}
              </span>
            )}
          </Link>

          {session?.user && (
            <div className="flex items-center gap-3">
              <NotificationBell initialNotifications={notifications} initialUnreadCount={unreadCount} />

              <div className="h-4 w-px bg-slate-200" />

              <div className="flex items-center gap-2.5 pl-1">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-xs font-bold text-white shadow-xs">
                  {userInitial}
                </div>
                <div className="hidden md:flex md:flex-col">
                  <span className="text-xs font-semibold text-slate-800 leading-tight">{session.user.name}</span>
                  <span className="text-[10px] text-slate-500 capitalize">{session.user.role.toLowerCase()}</span>
                </div>
              </div>

              <StatusBadge tone="neutral" label={session.user.role} size="sm" className="hidden lg:inline-flex" />
              <LogoutButton />
            </div>
          )}
        </div>
      </header>
      {serviceIssue && (
        <div role="alert" className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
          We&apos;re having a database connection issue right now. Some information may be unavailable — please try again shortly.
        </div>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}
