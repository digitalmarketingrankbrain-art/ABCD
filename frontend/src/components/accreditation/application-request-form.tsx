"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Building2,
  Mail,
  MapPin,
  Globe,
  FileText,
  CheckCircle2,
  Printer,
  Upload,
  Calendar,
  ShieldCheck,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const COUNTRY_CODES = [
  { code: "+1", country: "US/CA" },
  { code: "+91", country: "IN" },
  { code: "+92", country: "PK" },
  { code: "+880", country: "BD" },
  { code: "+94", country: "LK" },
  { code: "+977", country: "NP" },
  { code: "+975", country: "BT" },
  { code: "+960", country: "MV" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "SG" },
];

const APPLY_FOR_OPTIONS = [
  { id: "ms", label: "Management Systems" },
  { id: "ib", label: "Inspection Bodies" },
  { id: "pcb", label: "Personnel Certification Bodies" },
  { id: "tl", label: "Testing Laboratories" },
  { id: "vvb", label: "Validation and Verification Bodies" },
  { id: "prod", label: "Product Certification Bodies" },
];

export function ApplicationRequestForm() {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+1",
    phoneNumber: "",
    address1: "",
    address2: "",
    addressDetails: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Company Info
    companyName: "",
    companyWebsite: "",
    directors: "",
    responsiblePerson: "",
    isAlreadyAccredited: "No",
    dateOfEstablishment: "",
    licenseNumber: "",
    licenseFileName: "",

    // Apply For
    applyFor: [] as string[],

    // Remarks
    remarks: "",

    // Captcha
    isCaptchaChecked: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplyForToggle = (id: string) => {
    setFormData((prev) => {
      const exists = prev.applyFor.includes(id);
      return {
        ...prev,
        applyFor: exists
          ? prev.applyFor.filter((item) => item !== id)
          : [...prev.applyFor, id],
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        licenseFileName: file.name,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const generatedId = `SAAF-APP-2026-${randomNum}`;
      setReferenceId(generatedId);
      setSubmittedDate(
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneCode: "+1",
      phoneNumber: "",
      address1: "",
      address2: "",
      addressDetails: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      companyName: "",
      companyWebsite: "",
      directors: "",
      responsiblePerson: "",
      isAlreadyAccredited: "No",
      dateOfEstablishment: "",
      licenseNumber: "",
      licenseFileName: "",
      applyFor: [],
      remarks: "",
      isCaptchaChecked: false,
    });
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Application Received
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-slate-900">
                Application Request Form Submitted
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="ml-auto text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1.5 border border-slate-200 rounded-lg px-3 py-1.5"
            >
              <Printer className="size-3.5" /> Print
            </button>
          </div>

          {/* Details Bar */}
          <div className="my-6 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 text-xs">
            <div>
              <span className="text-slate-500 block">Reference ID</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{referenceId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Date Submitted</span>
              <span className="font-medium text-slate-900">{submittedDate}</span>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-slate-100 p-4">
                <span className="text-xs font-semibold text-slate-400 block mb-1">PERSONAL INFO</span>
                <p className="font-semibold text-slate-900">{formData.firstName} {formData.lastName}</p>
                <p className="text-xs text-slate-600 mt-1">{formData.email}</p>
                <p className="text-xs text-slate-600">{formData.phoneCode} {formData.phoneNumber}</p>
              </div>

              <div className="rounded-xl border border-slate-100 p-4">
                <span className="text-xs font-semibold text-slate-400 block mb-1">COMPANY INFO</span>
                <p className="font-semibold text-slate-900">{formData.companyName || "Organization"}</p>
                <p className="text-xs text-slate-600 mt-1">License No: {formData.licenseNumber || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-6 space-y-2">
            <p className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <Info className="size-3.5 text-blue-600" /> What happens next?
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our Secretariat will review your request within 24-48 business hours. You will receive an email with institutional portal access instructions to complete your formal document submission.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "primary", size: "sm" }), "bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4")}
            >
              Go to Sign In
            </Link>
            <button
              onClick={handleReset}
              className={cn(buttonVariants({ variant: "tertiary", size: "sm" }), "text-slate-600 hover:text-slate-900")}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6" suppressHydrationWarning>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* SECTION 1: Personal Info* */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
          <div className="border-b border-slate-100 pb-3 mb-5">
            <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="size-4 text-blue-600" />
              Personal Info<span className="text-red-500">*</span>
            </h3>
          </div>

          <div className="space-y-4">
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Email Address & Phone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handleInputChange}
                    className="rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={item.code + item.country} value={item.code}>
                        {item.country} {item.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    required
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="flex-1 rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Address Line 1 & Apt/Suite */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Search and select address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    placeholder="Search and select address"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Apartment/Suite/Building No.
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                  placeholder="Apartment/Suite/Building No."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Enter Address Details & City */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Enter Address Details
                </label>
                <input
                  type="text"
                  name="addressDetails"
                  value={formData.addressDetails}
                  onChange={handleInputChange}
                  placeholder="Enter Address Details"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <p className="mt-1 text-[11px] text-red-500 font-medium">
                  Can&apos;t find your address in suggestions? Enter Address Details manually above.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* State, Zip Code, Country */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="Zip Code"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Maldives">Maldives</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Company Info* */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
          <div className="border-b border-slate-100 pb-3 mb-5">
            <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="size-4 text-blue-600" />
              Company Info<span className="text-red-500">*</span>
            </h3>
          </div>

          <div className="space-y-4">
            {/* Company Name & Company Website */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Company Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="Company Website"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Directors/Managing Director & Certification Manager */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Directors/Managing Director
                </label>
                <input
                  type="text"
                  name="directors"
                  value={formData.directors}
                  onChange={handleInputChange}
                  placeholder="Directors/Managing Director"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Certification Manager /Operations Manager/Responsible Person
                </label>
                <input
                  type="text"
                  name="responsiblePerson"
                  value={formData.responsiblePerson}
                  onChange={handleInputChange}
                  placeholder="Certification Manager /Operations Manager/Responsible Person"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Is Already Accredited By another IAF MLA Body & Date Of Establishment */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Is Already Accredited By another IAF MLA Accreditation Body
                </label>
                <select
                  name="isAlreadyAccredited"
                  value={formData.isAlreadyAccredited}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Date Of Establishment
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="date"
                    name="dateOfEstablishment"
                    value={formData.dateOfEstablishment}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3.5 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* License/ Registration Number & Upload Document */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  License/ Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  placeholder="License/ Registration Number"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Upload License/Registration Document
                </label>
                <label className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 text-xs font-semibold text-white transition-colors hover:bg-blue-700">
                  <Upload className="size-4" />
                  <span>
                    {formData.licenseFileName ? formData.licenseFileName : "Upload License/Registration Document"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Apply for* */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
          <div className="border-b border-slate-100 pb-3 mb-5">
            <h3 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="size-4 text-blue-600" />
              Apply for<span className="text-red-500">*</span>
            </h3>
          </div>

          <div className="divide-y divide-slate-100 border-y border-slate-100 py-1 space-y-2">
            {APPLY_FOR_OPTIONS.map((option) => {
              const isChecked = formData.applyFor.includes(option.id);
              return (
                <label
                  key={option.id}
                  className="flex items-center gap-3 py-2.5 cursor-pointer text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleApplyForToggle(option.id)}
                    className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: Remarks */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Remarks
            </label>
            <textarea
              rows={4}
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              placeholder="Remarks"
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Captcha Box */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3 max-w-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                name="isCaptchaChecked"
                checked={formData.isCaptchaChecked}
                onChange={handleInputChange}
                className="size-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-medium text-slate-700">I&apos;m not a robot</span>
            </label>
            <div className="flex flex-col items-end">
              <ShieldCheck className="size-5 text-blue-600" />
              <span className="text-[9px] text-slate-400">reCAPTCHA</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              buttonVariants({ variant: "primary", size: "md" }),
              "h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-none"
            )}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 text-sm">
                <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2 text-sm">
                Submit &raquo;
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
