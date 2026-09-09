"use client";

import {
  LayoutDashboard,
  FileText,
  Receipt,
  ShieldCheck,
  MessageSquare,
  User,
  Lock,
} from "lucide-react";
import { PortalSidebar } from "./portal-sidebar";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/applicant/dashboard", icon: LayoutDashboard },
  { label: "Applications", href: "/portal/applicant/applications", icon: FileText },
  { label: "Invoices", href: "/portal/applicant/invoices", icon: Receipt },
  { label: "Accreditation", href: "/portal/applicant/accreditation", icon: ShieldCheck },
  { label: "Messages", href: "/portal/applicant/messages", icon: MessageSquare },
  { label: "Profile", href: "/portal/applicant/profile", icon: User },
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
