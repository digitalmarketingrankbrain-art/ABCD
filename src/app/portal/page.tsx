import { redirect } from "next/navigation";
import { auth } from "@/auth";

const ROLE_HOME: Record<string, string> = {
  APPLICANT: "/portal/applicant",
  ASSESSOR: "/portal/assessor",
  ADMIN: "/portal/admin",
};

export default async function PortalIndexPage() {
  const session = await auth();
  redirect(session?.user ? (ROLE_HOME[session.user.role] ?? "/login") : "/login");
}
