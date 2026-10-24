import { getContent, SITE_URL } from "@/data";

// llms.txt (llmstxt.org): a plain-markdown summary for language models and
// AI answer engines. Not a ranking signal any engine has confirmed, so it is
// kept cheap: generated from the same data as the page, so it can't drift.
export const dynamic = "force-static";

export function GET() {
  const c = getContent("en");
  const hero = c.heroData;

  const projects = c.projects
    .map((p) => {
      const link = p.link ? ` — ${p.link}` : "";
      const article = p.article ? `\n\nWrite-up: [${p.article.title}](${p.article.url})` : "";
      return `### ${p.name}${link}\n${p.subject}. ${p.role}, ${p.period}.\n\n${p.description}\n\nStack: ${p.stack.join(", ")}.${article}`;
    })
    .join("\n\n");

  const roles = c.roles
    .map((r) => `- **${r.title}**, ${r.company} (${r.period}). ${r.description}`)
    .join("\n");

  const writing = c.projects
    .filter((p) => p.article)
    .map((p) => `- [${p.article!.title}](${p.article!.url}), about ${p.name}`)
    .join("\n");

  const skills = c.skills
    .map((g) => `- ${g.title}: ${g.items.join(", ")}`)
    .join("\n");

  const body = `# Omar Derbala

> ${c.meta.personDescription}

${hero.tagline}

- Website: ${SITE_URL} (English), ${SITE_URL}/ar (Arabic)
- Company: Giantrex — ${c.giantrex.link.href} (Founder & CTO)
- Location: Cairo, Egypt (GMT+3), works remotely
- Email: ${c.contact.email}
- Profiles: ${c.contact.socials.map((s) => `${s.name} ${s.url}`).join(" · ")}
- Upwork: Top Rated, 100% Job Success
- CV: ${SITE_URL}${hero.cta.secondary.link}

## About

${c.about.lead}

${c.about.body.join("\n\n")}

## Giantrex

${c.giantrex.tagline} ${c.giantrex.body}

## Selected work

${projects}

## Experience

${roles}

## Skills

${skills}

## Writing

${writing}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
