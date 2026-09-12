"use client";

import {
  LayoutDashboard,
  FileText,
  Receipt,
  ShieldCheck,
  MessageSquare,
  User,
  Lock,
  ClipboardPlus,
  FolderOpen,
  Building2,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react";
import { PortalSidebar } from "./portal-sidebar";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/applicant/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/portal/applicant/profile", icon: User },
  { label: "Documents", href: "/portal/applicant/profile?tab=documents", icon: FolderOpen },
  { label: "CAB Info", href: "/portal/applicant/profile?tab=cab-info", icon: Building2 },
  { label: "Assessments", href: "/portal/applicant/profile?tab=assessments", icon: ClipboardCheck },
  { label: "NC", href: "/portal/applicant/profile?tab=nc", icon: AlertTriangle },
  { label: "Applications", href: "/portal/applicant/applications", icon: FileText },
  { label: "Scope Extension", href: "/portal/applicant/apply/scope-extension", icon: ClipboardPlus },
  { label: "Invoices", href: "/portal/applicant/invoices", icon: Receipt },
  { label: "Accreditation", href: "/portal/applicant/accreditation", icon: ShieldCheck },
  { label: "Messages", href: "/portal/applicant/messages", icon: MessageSquare },
  { label: "Security", href: "/portal/applicant/security", icon: Lock },
];

/**
 * Icon components (lucide-react) can't cross the server/client boundary as
 * props (they're functions, not serializable RSC payloads) — so this nav
 * list is defined here, inside a client component, rather than in the
 * server layout that renders it (Milestone 5 hit the same class of bug with
 * DataTable column render functions; same fix shape applies here).
 */
function ApplicantSidebar() {
  return <PortalSidebar items={NAV_ITEMS} />;
}

export { ApplicantSidebar };
