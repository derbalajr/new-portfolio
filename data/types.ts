export type Locale = "en" | "ar";

export type NavItem = { name: string; link: string };

export type Stat = { value: string; display: string; label: string };

export type Project = {
  num: string;
  name: string;
  subject: string;
  role: string;
  period: string;
  description: string;
  impact: string[];
  stack: string[];
  link?: string;
  linkLabel?: string;
  /** Omitted where no shareable screenshot exists; the plate ships instead. */
  image?: string;
  /** CSS object-position for the screenshot. */
  fit: string;
  /** Shown behind a screenshot while it decodes. Screenshot cards only. */
  plateTitle?: string;
  /** Mono caption under plateTitle. Screenshot cards only. */
  shot?: string;
  /**
   * The media surface for a project with no shareable screenshot: an index of
   * what the project is, plus a note saying why there's no picture. Every card
   * keeps the same footprint, so the grid stays regular.
   */
  plate?: {
    entries: { name: string; detail: string }[];
    note: string;
  };
  span: 1 | 2;
  ratio: "21/9" | "16/10";
  /** A write-up about the project, linked from its card. */
  article?: { title: string; url: string };
  /** Set on products shipped under Giantrex; the venture section lists them. */
  venture?: "Giantrex";
};

export type SkillGroup = {
  title: string;
  num: string;
  span: 2 | 3 | 4;
  items: string[];
};

export type Role = {
  period: string;
  type: string;
  title: string;
  company: string;
  /** Makes the company name a link. */
  url?: string;
  description: string;
  stack: string[];
};

export type Testimonial = {
  quote: string;
  initials: string;
  name: string;
  title: string;
};
