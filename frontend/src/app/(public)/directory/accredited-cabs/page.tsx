"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Search, RotateCcw } from "lucide-react";

const CABS_MOCK = [
  { sr: 1, code: "ACUBE", name: "A CUBE TIC LIMITED TRADING AS ACT & A CUBE", status: "Active" },
  { sr: 2, code: "AMARK", name: "A-MARK RATINGS PRIVATE LIMITED", status: "Active" },
  { sr: 3, code: "AMSPL", name: "AARANAYA MANAGEMENT SERVICES PVT. LTD (AMSPL)", status: "Active" },
  { sr: 4, code: "AQCPL", name: "ABSOLUTE QUALITY CERTIFICATION PRIVATE LIMITED", status: "Active" },
  { sr: 5, code: "APCI", name: "ACCORP PARTNERS CERT INC", status: "Active" },
  { sr: 6, code: "Accredify", name: "ACCREDIFY GLOBAL LLC", status: "Active" },
  { sr: 7, code: "AGI", name: "ACCURATE GLOBAL INC", status: "Active" },
  { sr: 8, code: "ABI", name: "ACTIVE BUSINESS INTERNATIONAL FZE", status: "Active" },
  { sr: 9, code: "AQSRPL", name: "AMERICO QUALITY STANDARDS REGISTECH PRIVATE LIMITED", status: "Active" },
  { sr: 10, code: "ANS", name: "ANS SYSTEM CERTIFICATION PRIVATE LIMITED", status: "Active" },
];

export default function AccreditedCabsPage() {
  const [activeTab, setActiveTab] = React.useState<"ACTIVE" | "SUSPENDED" | "WITHDRAWN">("ACTIVE");
  const [search, setSearch] = React.useState("");
  const [mgmtSystem, setMgmtSystem] = React.useState("Management Systems");
  const [scheme, setScheme] = React.useState("");
  const [country, setCountry] = React.useState("");


  const handleReset = () => {
    setSearch("");
    setMgmtSystem("Management Systems");
    setScheme("");
    setCountry("");
  };

  const filtered = CABS_MOCK.filter((cab) =>
    cab.name.toLowerCase().includes(search.toLowerCase()) ||
    cab.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50/50 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <nav className="mb-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-slate-500">Directory</span>
            <ChevronRight className="size-3 text-slate-400" />
            <span className="text-blue-600 font-semibold">List Of Accredited CABs</span>
          </nav>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            List Of Accredited CABs
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Status Filter Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          {(["ACTIVE", "SUSPENDED", "WITHDRAWN"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`rounded-lg px-6 py-2 text-xs font-bold transition-all uppercase tracking-wider ${
                activeTab === status
                  ? status === "ACTIVE"
                    ? "border-2 border-blue-600 bg-white text-blue-600 shadow-sm"
                    : "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by company or short code"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Management Systems Dropdown */}
            <select
              value={mgmtSystem}
              onChange={(e) => setMgmtSystem(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-700 focus:border-blue-600 focus:outline-none"
            >
              <option value="Management Systems">Management Systems</option>
              <option value="Inspection Bodies">Inspection Bodies</option>
              <option value="Testing Labs">Testing Laboratories</option>
              <option value="Product Certification">Product Certification</option>
              <option value="Personnel Certification">Personnel Certification</option>
            </select>

            {/* Select Scheme */}
            <select
              value={scheme}
              onChange={(e) => setScheme(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-700 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select Scheme</option>
              <option value="ISO 9001">ISO 9001 (QMS)</option>
              <option value="ISO 14001">ISO 14001 (EMS)</option>
              <option value="ISO 45001">ISO 45001 (OHSMS)</option>
              <option value="ISO 27001">ISO 27001 (ISMS)</option>
              <option value="ISO 22000">ISO 22000 (FSMS)</option>
            </select>

            {/* Select Country */}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-xs text-slate-700 focus:border-blue-600 focus:outline-none"
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="UAE">United Arab Emirates</option>
            </select>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 px-4 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* CABs Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 bg-blue-700 text-white font-bold text-xs uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4 sm:px-6 w-20 text-center border-r border-blue-600">SR. No.</th>
                <th className="py-3 px-4 sm:px-6 w-48 border-r border-blue-600">Registrar Name</th>
                <th className="py-3 px-4 sm:px-6 border-r border-blue-600">Organisation Name</th>
                <th className="py-3 px-4 sm:px-6 text-center w-28">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filtered.map((row) => (
                <tr key={row.sr} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-4 sm:px-6 text-center font-medium text-slate-500 border-r border-slate-100">
                    {row.sr}
                  </td>
                  <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 border-r border-slate-100">
                    {row.code}
                  </td>
                  <td className="py-3 px-4 sm:px-6 font-semibold text-slate-800 border-r border-slate-100">
                    {row.name}
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-center">
                    <span className="inline-block rounded-full bg-emerald-700 px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            Showing 1-10 of 65 results
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold">
            <button className="flex size-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              «
            </button>
            <button className="flex size-7 items-center justify-center rounded bg-blue-600 text-white font-bold">
              1
            </button>
            <button className="flex size-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              2
            </button>
            <button className="flex size-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="flex size-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
              7
            </button>
            <button className="flex size-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
