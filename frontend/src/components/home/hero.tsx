"use client";

import React, { useState } from "react";
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
    <section className="relative overflow-hidden bg-slate-50/70 border-b border-slate-200/60 text-slate-900">
      {/* Background Globe Motif */}
      <div className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 opacity-30 lg:block">
        <HeroMotif className="h-[560px] w-[560px]" tone="light" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-12">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50 px-3.5 py-1">
              <span className="flex size-2 rounded-full bg-blue-600" />
              <span className="text-xs font-semibold text-blue-900">
                South Asia Accreditation Foundation (SAAF)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[50px]">
              Independent Accreditation.{" "}
              <span className="text-blue-600">
                Uncompromising Trust.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              SAAF evaluates, accredits, and continuously monitors testing laboratories, inspection bodies,
              and certification authorities across South Asia against stringent international standards.
            </p>

            {/* Interactive Live Quick-Verify Search Box */}
            <div className="mt-6 max-w-xl">
              <form
                onSubmit={handleQuickVerify}
                className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Certificate No, CAB Name, or ISO Standard..."
                    className="w-full rounded-lg bg-slate-50/80 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 sm:shrink-0"
                >
                  <ShieldCheck className="size-4" />
                  <span>Verify Record</span>
                </button>
              </form>
              <p className="mt-2.5 flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>Instant lookup on the official SAAF Public Register</span>
              </p>
            </div>
          </div>

          {/* Right Hero Card / Emblem Display */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                {/* Large SAAF Emblem */}
                <div className="mb-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                  <SaafLogo variant="emblem" size="xl" className="h-[70px] w-auto" />
                </div>

                <h2 className="font-display text-lg font-bold text-slate-900">
                  South Asia Accreditation Foundation
                </h2>
                <p className="mt-0.5 text-xs font-semibold text-blue-700">
                  Official Institutional Oversight
                </p>

                <div className="mt-4 w-full divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-left">
                  <div className="flex justify-between py-1 text-xs">
                    <span className="text-slate-500">Organization:</span>
                    <span className="font-semibold text-slate-900">SAAF Board of Evaluation</span>
                  </div>
                  <div className="flex justify-between py-1 text-xs">
                    <span className="text-slate-500">Standards Scope:</span>
                    <span className="font-semibold text-slate-900">ISO 17025 / 17020 / 17021</span>
                  </div>
                  <div className="flex justify-between py-1 text-xs">
                    <span className="text-slate-500">Public Audit Status:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                      <CheckCircle2 className="size-3" /> ACTIVE & VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Trust Metrics Strip */}
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-4.5 shadow-sm sm:grid-cols-4 lg:gap-8">
          {TRUST_METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600 border border-blue-100">
                  <Icon className="size-4.5" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-slate-900">{metric.value}</p>
                  <p className="text-xs font-semibold text-slate-700">{metric.label}</p>
                  <p className="text-[11px] text-slate-500">{metric.sub}</p>
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
