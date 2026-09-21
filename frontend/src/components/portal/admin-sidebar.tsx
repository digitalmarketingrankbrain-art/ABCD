"use client";

import {
  LayoutDashboard,
  FileText,
  Building2,
  UserCog,
  ShieldCheck,
  Users,
  ScrollText,
  FolderOpen,
  ClipboardCheck,
  CalendarClock,
  AlertTriangle,
  ListChecks,
  Inbox,
} from "lucide-react";
import { PortalSidebar } from "./portal-sidebar";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Application Requests", href: "/admin/application-requests", icon: Inbox },
  { label: "Applications", href: "/admin/applications", icon: FileText },
  { label: "Organisations", href: "/admin/organisations", icon: Building2 },
  { label: "Assessors", href: "/admin/assessors", icon: UserCog },
  { label: "Assessor Teams", href: "/admin/assessor-teams", icon: ClipboardCheck },
  { label: "Assessments", href: "/admin/assessments", icon: CalendarClock },
  { label: "Non-Conformities", href: "/admin/non-conformities", icon: AlertTriangle },
  { label: "Required Forms", href: "/admin/required-forms", icon: ListChecks },
  { label: "Accreditation Records", href: "/admin/accreditation-records", icon: ShieldCheck },
  { label: "Documents", href: "/admin/documents", icon: FolderOpen },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: ScrollText },
];

function AdminSidebar() {
  return <PortalSidebar items={NAV_ITEMS} />;
}

export { AdminSidebar };
