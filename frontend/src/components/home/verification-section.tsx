"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck, QrCode, CheckCircle2, FileText, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

function VerificationSection() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/verify${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  }

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-slate-900 py-20 text-white saaf-gradient-hero">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          
          {/* Left Side: Verification Description & Live Form */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="size-3.5 text-amber-400" />
              SAAF Public Verification Register
            </div>

            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Verify Any SAAF Accreditation Claim Instantly
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-blue-100/90 sm:text-base">
              To eliminate counterfeit certificates and unauthorized reliance, SAAF provides a public real-time register. Anyone can search an accreditation number or organization name to verify active scope, validity dates, and evaluation status.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur-xl sm:flex-row">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-blue-300"
                  strokeWidth={2}
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try 'ACC-2026-9041' or 'Apex Testing Lab'..."
                  aria-label="Accreditation number or organisation name"
                  className="h-12 border-0 bg-transparent pl-11 pr-4 font-medium text-white placeholder-blue-200/60 focus-visible:ring-0"
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                className="h-12 bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 px-6 sm:shrink-0"
              >
                <ShieldCheck className="size-4" />
                <span>Verify Now</span>
              </Button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-blue-200/75">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                No login required
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="size-3.5 text-amber-400" />
                Cryptographically signed record hashes
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="size-3.5 text-blue-300" />
                Downloadable PDF verification receipt
              </span>
            </div>
          </div>

          {/* Right Side: Mock Verification Certificate & QR Stamp */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-6 backdrop-blur-xl shadow-2xl saaf-glow-border">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <QrCode className="size-5 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Live Status Monitor
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-300 border border-emerald-400/30">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                  STATUS: ACTIVE
                </span>
              </div>

              <div className="mt-5 space-y-3 font-mono text-xs">
                <div className="rounded-xl bg-black/30 p-3 border border-white/10">
                  <p className="text-[10px] text-blue-300">CAB ORGANISATION</p>
                  <p className="font-bold text-white text-sm font-sans mt-0.5">National Metrology &amp; Testing Services</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-black/30 p-3 border border-white/10">
                    <p className="text-[10px] text-blue-300">ACCREDITATION NO.</p>
                    <p className="font-bold text-amber-300 mt-0.5">ACC-2026-9041</p>
                  </div>
                  <div className="rounded-xl bg-black/30 p-3 border border-white/10">
                    <p className="text-[10px] text-blue-300">STANDARD</p>
                    <p className="font-bold text-white mt-0.5">ISO/IEC 17025:2017</p>
                  </div>
                </div>
                <div className="rounded-xl bg-black/30 p-3 border border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-blue-300">VALIDITY PERIOD</p>
                    <p className="font-bold text-white mt-0.5 font-sans">2024-01-15 to 2027-01-14</p>
                  </div>
                  <CheckCircle2 className="size-6 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

        </Reveal>
      </div>
    </section>
  );
}

export { VerificationSection };
