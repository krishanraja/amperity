export type NavLink = { label: string; href: string; note?: string };
export type NavColumn = { heading: string; links: NavLink[] };
export type NavItem =
  | { label: string; href: string; columns?: undefined }
  | { label: string; href?: undefined; columns: NavColumn[] };

export const nav: NavItem[] = [
  {
    label: "Platform",
    columns: [
      {
        heading: "PLATFORM",
        links: [
          {
            label: "Customer Context Platform",
            href: "/platform/customer-context-platform",
            note: "The overview",
          },
          {
            label: "Identity Resolution",
            href: "/platform/identity-resolution",
            note: "Stitch and AmpID",
          },
          { label: "Customer 360", href: "/platform/amp360", note: "One history, per team" },
          { label: "AmpAI", href: "/platform/ampai", note: "AI that starts from the truth" },
          { label: "Services", href: "/platform/services", note: "Implementation and support" },
        ],
      },
      {
        heading: "ARCHITECTURE",
        links: [
          {
            label: "MCP Server",
            href: "/platform/ampai",
            note: "Governed context for agents",
          },
          {
            label: "Amperity Bridge",
            href: "/platform/customer-context-platform",
            note: "Zero-copy sharing",
          },
          {
            label: "Lakehouse native",
            href: "/platform/customer-context-platform",
            note: "Databricks and Snowflake",
          },
          { label: "Integrations", href: "/integrations", note: "400+ connectors" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    columns: [
      {
        heading: "FUNCTIONS",
        links: [
          { label: "Marketing", href: "/solutions/departments/marketing" },
          { label: "Analytics", href: "/solutions/departments/analytics" },
          { label: "IT & Data", href: "/solutions/departments/it" },
        ],
      },
      {
        heading: "INDUSTRIES",
        links: [
          { label: "Retail", href: "/solutions/industries/retail" },
          { label: "Travel & Hospitality", href: "/solutions/industries/travel-hospitality" },
          { label: "Hotels", href: "/solutions/industries/hotels" },
          { label: "Airlines", href: "/solutions/industries/airlines" },
          { label: "Financial Services", href: "/solutions/industries/financial-services" },
          { label: "Restaurants", href: "/solutions/industries/restaurants" },
          { label: "Sports & Entertainment", href: "/solutions/industries/sports-entertainment" },
        ],
      },
      {
        heading: "USE CASES",
        links: [{ label: "Use-case library", href: "/solutions/use-cases" }],
      },
    ],
  },
  { label: "Customers", href: "/customers" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/about" },
];

export const footerColumns: NavColumn[] = [
  {
    heading: "PLATFORM",
    links: [
      { label: "Customer Context Platform", href: "/platform/customer-context-platform" },
      { label: "Identity Resolution", href: "/platform/identity-resolution" },
      { label: "Customer 360", href: "/platform/amp360" },
      { label: "AmpAI", href: "/platform/ampai" },
      { label: "Services", href: "/platform/services" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    heading: "SOLUTIONS",
    links: [
      { label: "Marketing", href: "/solutions/departments/marketing" },
      { label: "Analytics", href: "/solutions/departments/analytics" },
      { label: "IT & Data", href: "/solutions/departments/it" },
      { label: "Industries", href: "/solutions" },
      { label: "Use cases", href: "/solutions/use-cases" },
    ],
  },
  {
    heading: "CUSTOMERS",
    links: [
      { label: "Customer stories", href: "/customers" },
      { label: "Alaska Airlines", href: "/customers/alaska-airlines" },
      { label: "Wyndham", href: "/customers/wyndham" },
      { label: "Seattle Seahawks", href: "/customers/seattle-seahawks" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Resources", href: "/resources" },
      { label: "Contact sales", href: "/contact-sales" },
      { label: "Request a demo", href: "/resources/demo/request" },
    ],
  },
];
