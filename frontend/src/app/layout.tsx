import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import { AuthSessionProvider } from "@/components/auth/session-provider";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "South Asia Accreditation Foundation (SAAF) | Independent Accreditation Body",
  description:
    "Official website of South Asia Accreditation Foundation (SAAF) — Independent international accreditation body delivering trust, scheme competence, and verification across South Asia.",
  keywords: [
    "SAAF",
    "South Asia Accreditation Foundation",
    "Accreditation Body",
    "ISO 17025",
    "ISO 17020",
    "ISO 17021",
    "Verification Portal",
    "Conformity Assessment",
  ],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} font-sans antialiased selection:bg-blue-600 selection:text-white`}
      >
        <AuthSessionProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
