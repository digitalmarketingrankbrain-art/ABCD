"use client";

import { LayoutDashboard, ClipboardList, User, CalendarOff, MessageSquare } from "lucide-react";
import { PortalSidebar } from "./portal-sidebar";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/portal/assessor/dashboard", icon: LayoutDashboard },
  { label: "Assignments", href: "/portal/assessor/assignments", icon: ClipboardList },
  { label: "Competence", href: "/portal/assessor/competence", icon: User },
  { label: "Availability", href: "/portal/assessor/availability", icon: CalendarOff },
  { label: "Messages", href: "/portal/assessor/messages", icon: MessageSquare },
];

function AssessorSidebar() {
  return <PortalSidebar items={NAV_ITEMS} />;
}

export { AssessorSidebar };
