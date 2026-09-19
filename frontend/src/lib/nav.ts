export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  links: NavLink[];
}

/** Primary header nav. "Verify" is a single link, not a dropdown — Phase 5. */
export const HEADER_NAV: NavGroup[] = [
  {
    label: "About",
    href: "/about/who-we-are",
    links: [
      {
        label: "About SAAF",
        href: "/about/who-we-are",
        description: "What SAAF does, non-profit status, and operational mandate.",
      },
      {
        label: "About Accreditation",
        href: "/about/accreditation",
        description: "The benefits of accreditation for CABs, businesses & consumers.",
      },
      {
        label: "International Recognition",
        href: "/about/international-recognition",
        description: "IAF MLA, APAC MRA & Global ACI international signatory status.",
      },
    ],
  },
  {
    label: "Accreditation",
    href: "/accreditation",
    links: [
      {
        label: "Programs",
        href: "/accreditation/programs",
        description: "Overview of all SAAF accreditation schemes & scopes.",
      },
      {
        label: "Management Systems",
        href: "/accreditation/programs/management-systems",
        description: "ISO 9001, 14001, 45001, 27001 & 22000 certification bodies.",
      },
      {
        label: "Inspection Bodies",
        href: "/accreditation/programs/inspection-bodies",
        description: "ISO/IEC 17020 inspection & survey authorities.",
      },
      {
        label: "Personnel Certification Bodies",
        href: "/accreditation/programs/personnel-certification",
        description: "ISO/IEC 17024 auditor & professional certifiers.",
      },
      {
        label: "Laboratories",
        href: "/accreditation/programs/laboratories",
        description: "ISO/IEC 17025 testing, calibration & medical labs.",
      },
      {
        label: "Product Certification Bodies",
        href: "/accreditation/programs/product-certification",
        description: "ISO/IEC 17065 product & process certifiers.",
      },
      {
        label: "Validation and Verification Bodies",
        href: "/accreditation/programs/validation-and-verification",
        description: "ISO/IEC 17029 GHG & project verification.",
      },
    ],
  },
  {
    label: "Directory",
    href: "/directory/accredited-cabs",
    links: [
      {
        label: "List Of Accredited CABS",
        href: "/directory/accredited-cabs",
        description: "Public register of all active accredited Conformity Assessment Bodies.",
      },
      {
        label: "Organizations certified by SAAF Accredited CABs",
        href: "/directory/certified-organizations",
        description: "Search certified client organizations and scope validations.",
      },
      {
        label: "False Claims Of Accreditation",
        href: "/directory/false-claims",
        description: "Public warnings and notices of unauthorized logo usage or false claims.",
      },
    ],
  },
  {
    label: "Publications",
    href: "/publications/documents",
    links: [
      {
        label: "SAAF Documents",
        href: "/publications/documents",
        description: "Official accreditation criteria, requirements, and compliance standards.",
      },
      {
        label: "SAAF Manual And Procedures",
        href: "/publications/manual-and-procedures",
        description: "Standard operating procedures and quality management manuals.",
      },
      {
        label: "General Information",
        href: "/publications/general-information",
        description: "Overview of publication rules, rights, and document access.",
      },
      {
        label: "Impartiality Policy",
        href: "/publications/impartiality-policy",
        description: "Ethics framework, independence policy, and safeguards.",
      },
      {
        label: "Documents For Stakeholder's Comments",
        href: "/publications/stakeholder-comments",
        description: "Draft policies and proposals open for public stakeholder feedback.",
      },
      {
        label: "Notice Of Change(s)",
        href: "/publications/notice-of-changes",
        description: "Official change notices, standard updates, and transition periods.",
      },
    ],
  },
];

export const HEADER_SIMPLE_LINKS: NavLink[] = [
  { label: "Contact", href: "/contact" },
];

export const FOOTER_GROUPS: NavGroup[] = [
  {
    label: "About",
    links: [
      { label: "About SAAF", href: "/about/who-we-are" },
      { label: "About Accreditation", href: "/about/accreditation" },
      { label: "International Recognition", href: "/about/international-recognition" },
      { label: "Impartiality Policy", href: "/publications/impartiality-policy" },
    ],
  },
  {
    label: "Accreditation",
    links: [
      { label: "Management Systems", href: "/accreditation/programs/management-systems" },
      { label: "Inspection Bodies", href: "/accreditation/programs/inspection-bodies" },
      { label: "Personnel Certification", href: "/accreditation/programs/personnel-certification" },
      { label: "Laboratories (17025)", href: "/accreditation/programs/laboratories" },
      { label: "Product Certification", href: "/accreditation/programs/product-certification" },
      { label: "Validation & Verification", href: "/accreditation/programs/validation-and-verification" },
    ],
  },
  {
    label: "Directory",
    links: [
      { label: "Accredited CABs", href: "/directory/accredited-cabs" },
      { label: "Certified Organizations", href: "/directory/certified-organizations" },
      { label: "False Claims Warnings", href: "/directory/false-claims" },
      { label: "Verify Certificate", href: "/verify" },
    ],
  },
  {
    label: "Publications",
    links: [
      { label: "SAAF Documents", href: "/publications/documents" },
      { label: "Manual & Procedures", href: "/publications/manual-and-procedures" },
      { label: "General Information", href: "/publications/general-information" },
      { label: "Stakeholder Comments", href: "/publications/stakeholder-comments" },
      { label: "Notice Of Change(s)", href: "/publications/notice-of-changes" },
    ],
  },
  {
    label: "Trust & Legal",
    links: [
      { label: "Complaints & Appeals", href: "/complaints-and-appeals" },
      { label: "Report Fraud", href: "/report-fraud" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms of Use", href: "/legal/terms-of-use" },
      { label: "Accessibility Statement", href: "/legal/accessibility-statement" },
    ],
  },
  {
    label: "Contact",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Apply for Accreditation", href: "/accreditation/apply" },
    ],
  },
];

