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
} from "lucide-react";
import { PortalSidebar } from "./portal-sidebar";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/admin/dashboard", icon: LayoutDashboard },
  { label: "Applications", href: "/portal/admin/applications", icon: FileText },
  { label: "Organisations", href: "/portal/admin/organisations", icon: Building2 },
  { label: "Assessors", href: "/portal/admin/assessors", icon: UserCog },
  { label: "Assessor Teams", href: "/portal/admin/assessor-teams", icon: ClipboardCheck },
  { label: "Assessments", href: "/portal/admin/assessments", icon: CalendarClock },
  { label: "Non-Conformities", href: "/portal/admin/non-conformities", icon: AlertTriangle },
  { label: "Required Forms", href: "/portal/admin/required-forms", icon: ListChecks },
  { label: "Accreditation Records", href: "/portal/admin/accreditation-records", icon: ShieldCheck },
  { label: "Documents", href: "/portal/admin/documents", icon: FolderOpen },
  { label: "Users", href: "/portal/admin/users", icon: Users },
  { label: "Audit Logs", href: "/portal/admin/audit-logs", icon: ScrollText },
];

function AdminSidebar() {
  return <PortalSidebar items={NAV_ITEMS} />;
}

export { AdminSidebar };
