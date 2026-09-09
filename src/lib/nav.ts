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
    label: "Accreditation",
    href: "/accreditation",
    links: [
      {
        label: "How It Works",
        href: "/accreditation/how-it-works",
        description: "The full process, from application to decision.",
      },
      {
        label: "Programs",
        href: "/accreditation/programs",
        description: "Scopes we accredit and their eligibility criteria.",
      },
      {
        label: "Fees",
        href: "/accreditation/fees",
        description: "Fee structure and guidance by program.",
      },
    ],
  },
  {
    label: "About",
    href: "/about/who-we-are",
    links: [
      {
        label: "Who We Are",
        href: "/about/who-we-are",
        description: "What we do and how we operate independently.",
      },
      {
        label: "Governance",
        href: "/about/governance",
        description: "Decision-making structure and oversight.",
      },
      {
        label: "Impartiality & Ethics",
        href: "/about/impartiality-and-ethics",
        description: "Conflict-of-interest policy and safeguards.",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    links: [
      {
        label: "Policies",
        href: "/resources/policies",
        description: "Governing policies, versioned and dated.",
      },
      {
        label: "Procedures",
        href: "/resources/procedures",
        description: "Operational procedures for applicants and assessors.",
      },
      {
        label: "Forms",
        href: "/resources/forms",
        description: "Application documents and templates.",
      },
      {
        label: "Training",
        href: "/training",
        description: "Courses for assessors and client organisations.",
      },
    ],
  },
];

export const HEADER_SIMPLE_LINKS: NavLink[] = [
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_GROUPS: NavGroup[] = [
  {
    label: "Accreditation",
    links: [
      { label: "How It Works", href: "/accreditation/how-it-works" },
      { label: "Programs", href: "/accreditation/programs" },
      { label: "Fees", href: "/accreditation/fees" },
      { label: "Verify an Accreditation", href: "/verify" },
    ],
  },
  {
    label: "About",
    links: [
      { label: "Who We Are", href: "/about/who-we-are" },
      { label: "Governance", href: "/about/governance" },
      { label: "Impartiality & Ethics", href: "/about/impartiality-and-ethics" },
      { label: "Become an Assessor", href: "/assessors/become-an-assessor" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Policies", href: "/resources/policies" },
      { label: "Procedures", href: "/resources/procedures" },
      { label: "Forms", href: "/resources/forms" },
      { label: "Training", href: "/training" },
      { label: "News & Notices", href: "/news" },
    ],
  },
  {
    label: "Trust & Legal",
    links: [
      { label: "Complaints & Appeals", href: "/complaints-and-appeals" },
      { label: "Report Fraud / Impersonation", href: "/report-fraud" },
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
    ],
  },
];
