"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ChevronRight, ShieldCheck } from "lucide-react";

export default function CertifiedOrganizationsPage() {
  const [cab, setCab] = React.useState("");
  const [scheme, setScheme] = React.useState("");
  const [orgName, setOrgName] = React.useState("");
  const [hasSearched, setHasSearched] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      {/* Header Blue Banner - Matching Image 2 */}
      <div className="bg-blue-700 py-12 text-white text-center">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Details Of Organisations Certified By SAAF Accredited Certification Bodies
          </h1>
        </div>
      </div>

      {/* Main Search Card Container */}
      <div className="mx-auto max-w-3xl px-4 -mt-6 sm:-mt-8 sm:px-6 relative z-10">
        <form onSubmit={handleSearch} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {/* Header of Search Box */}
          <div className="bg-blue-800 px-6 py-4 text-white flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
            <Search className="size-4" />
            <span>SEARCH DETAILS</span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Field 1: CAB Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  ACCREDITED CERTIFICATION BODY (CAB)
                </label>
                <select
                  value={cab}
                  onChange={(e) => setCab(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs text-slate-700 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  <option value="">Select a Certification Body...</option>
                  <option value="A CUBE TIC LIMITED">A CUBE TIC LIMITED</option>
                  <option value="A-MARK RATINGS">A-MARK RATINGS PRIVATE LIMITED</option>
                  <option value="AARANAYA MANAGEMENT">AARANAYA MANAGEMENT SERVICES</option>
                  <option value="ABSOLUTE QUALITY CERTIFICATION">ABSOLUTE QUALITY CERTIFICATION</option>
                  <option value="ACCORD PARTNERS CERT INC">ACCORD PARTNERS CERT INC</option>
                </select>
              </div>

              {/* Field 2: Scheme Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                  MANAGEMENT SYSTEM SCHEME
                </label>
                <select
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs text-slate-700 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  <option value="">Select a Scheme...</option>
                  <option value="ISO 9001">ISO 9001 - Quality Management</option>
                  <option value="ISO 14001">ISO 14001 - Environmental</option>
                  <option value="ISO 45001">ISO 45001 - OH&S</option>
                  <option value="ISO 27001">ISO 27001 - Information Security</option>
                  <option value="ISO 22000">ISO 22000 - Food Safety</option>
                </select>
              </div>
            </div>

            {/* Field 3: Certified Org Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                CERTIFIED ORGANISATION NAME
              </label>
              <input
                type="text"
                placeholder="Enter full organisation name..."
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition-all uppercase tracking-wider"
              >
                <Search className="size-4" />
                <span>Search &gt;&gt;</span>
              </button>
            </div>
          </div>
        </form>

        {/* Results Area */}
        {hasSearched && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
            <ShieldCheck className="mx-auto size-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">Verification Query Recorded</h3>
            <p className="mt-1 text-xs text-slate-500">
              Query matched against SAAF public certificate register. For official verification certificates, please contact the issuing CAB or SAAF Secretariat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
