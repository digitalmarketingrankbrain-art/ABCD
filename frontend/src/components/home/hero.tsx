"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck, CheckCircle2, Globe2, Award, Building2 } from "lucide-react";
import { HeroMotif } from "./hero-motif";
import { SaafLogo } from "@/components/ui/saaf-logo";

const TRUST_METRICS = [
  { label: "Accredited Bodies", value: "480+", sub: "Laboratories & CABs", icon: Building2 },
  { label: "South Asia Coverage", value: "8 Nations", sub: "Regional Oversight", icon: Globe2 },
  { label: "Public Register", value: "100%", sub: "Tamper-Proof Verification", icon: ShieldCheck },
  { label: "Standard Rigor", value: "ISO/IEC 17011", sub: "Peer-Evaluated Scheme", icon: Award },
];

function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/verify?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/verify");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#062863] text-white saaf-gradient-hero">
      {/* Background Globe Motif */}
      <div className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 opacity-60 lg:block">
        <HeroMotif className="h-[560px] w-[560px] animate-pulse-subtle" tone="dark" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-[26px] pb-[42px] sm:px-6 sm:pt-[34px] sm:pb-[50px] lg:pt-[38px] lg:pb-[58px]">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-12">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            {/* Top Pill Tag */}
            <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-blue-400/30 bg-blue-950/60 px-4 py-1.5 backdrop-blur-md">
              <span className="flex size-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                South Asia Accreditation Foundation (SAAF)
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="animate-fade-up mt-3.5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[54px]"
              style={{ animationDelay: "60ms" }}
            >
              Independent Accreditation.{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                Uncompromising Trust.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="animate-fade-up mt-3.5 max-w-2xl text-base leading-relaxed text-blue-100/90 sm:text-lg"
              style={{ animationDelay: "120ms" }}
            >
              SAAF evaluates, accredits, and continuously monitors testing laboratories, inspection bodies,
              and certification authorities across South Asia against stringent international standards.
            </p>

            {/* Interactive Live Quick-Verify Search Box */}
            <div
              className="animate-fade-up mt-5.5 max-w-xl"
              style={{ animationDelay: "180ms" }}
            >
              <form
                onSubmit={handleQuickVerify}
                className="flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-md shadow-2xl sm:flex-row sm:items-center"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-blue-300" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Certificate No, CAB Name, or ISO Standard..."
                    className="w-full rounded-xl bg-white/10 py-3 pl-11 pr-4 text-sm font-medium text-white placeholder-blue-200/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-amber-400 hover:shadow-lg active:scale-95 sm:shrink-0"
                >
                  <ShieldCheck className="size-4" />
                  <span>Verify Record</span>
                </button>
              </form>
              <p className="mt-2.5 flex items-center gap-2 text-xs font-medium text-blue-200/70">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>Instant lookup on the official tamper-proof SAAF Public Register</span>
              </p>
            </div>
          </div>

          {/* Right Hero Card / Emblem Display */}
          <div className="lg:col-span-5">
            <div
              className="animate-fade-up relative rounded-3xl border border-white/20 bg-gradient-to-b from-white/15 to-white/5 p-6.5 backdrop-blur-xl shadow-2xl saaf-glow-border"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Large SAAF Emblem */}
                <div className="mb-4.5 rounded-2xl bg-white p-4.5 shadow-2xl ring-4 ring-white/20">
                  <SaafLogo variant="emblem" size="xl" className="h-[74px] w-auto" />
                </div>

                <h2 className="font-display text-xl font-extrabold text-white">
                  South Asia Accreditation Foundation
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-amber-300">
                  Official Institutional Oversight
                </p>

                <div className="mt-4.5 w-full divide-y divide-white/10 rounded-xl border border-white/10 bg-black/20 p-3.5 text-left">
                  <div className="flex justify-between py-1.5 text-xs">
                    <span className="text-blue-200/80">Organization:</span>
                    <span className="font-bold text-white">SAAF Board of Evaluation</span>
                  </div>
                  <div className="flex justify-between py-1.5 text-xs">
                    <span className="text-blue-200/80">Standards Scope:</span>
                    <span className="font-bold text-white">ISO 17025 / 17020 / 17021</span>
                  </div>
                  <div className="flex justify-between py-2 text-xs">
                    <span className="text-blue-200/80">Public Audit Status:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
                      <CheckCircle2 className="size-3" /> ACTIVE & VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Trust Metrics Strip */}
        <div
          className="animate-fade-up mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-white/15 bg-white/5 p-4.5 backdrop-blur-md sm:grid-cols-4 lg:gap-8"
          style={{ animationDelay: "260ms" }}
        >
          {TRUST_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-500/20 p-2 text-amber-400 ring-1 ring-blue-400/30">
                  <Icon className="size-4.5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-black text-white">{metric.value}</p>
                  <p className="text-xs font-bold text-amber-300">{metric.label}</p>
                  <p className="text-[11px] text-blue-200/70">{metric.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export { Hero };
