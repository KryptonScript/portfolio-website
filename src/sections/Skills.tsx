"use client";
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import { Magnetic } from "@/components/Magnetic";
import { useState } from "react";
import Image from "next/image";

export function SkillsSection() {
  const skillLinks: Record<string, string> = {
    html: "https://www.w3schools.com/html/",
    css: "https://www.w3schools.com/css",
    mysql: "https://www.mysql.com/",
    javascript: "https://www.w3schools.com/js/",
    php: "https://www.php.net/",
    "node.js": "https://nodejs.org",
    "express.js": "https://expressjs.com/",
    ejs: "https://www.npmjs.com/package/ejs",
    git: "https://git-scm.com",
    react: "https://react.dev",
    mongodb: "https://www.mongodb.com",
    typescript: "https://www.typescriptlang.org/",
    "next.js": "https://nextjs.org/",
    "tailwind css": "https://tailwindcss.com/",
  };

  const logoMap: Record<string, string> = {
    html: "https://cdn.simpleicons.org/html5/ef652a",
    css: "https://cdn.simpleicons.org/css/2965f1",
    mysql: "https://cdn.simpleicons.org/mysql/4479A1",
    javascript: "https://cdn.simpleicons.org/javascript/F7DF1E",
    php: "https://cdn.simpleicons.org/php/777BB4",
    "node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
    "express.js": "https://cdn.simpleicons.org/express/555555",
    git: "https://cdn.simpleicons.org/git/F05032",
    react: "https://cdn.simpleicons.org/react/61DAFB",
    mongodb: "https://cdn.simpleicons.org/mongodb/47A248",
    typescript: "https://cdn.simpleicons.org/typescript/3178C6",
    "next.js": "https://cdn.simpleicons.org/nextdotjs/444444",
    "tailwind css": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  };

  function getLogoSrc(name: string): string | null {
    const key = name.toLowerCase();
    return logoMap[key] ?? null;
  }

  function getLinkHref(name: string): string | null {
    const key = name.toLowerCase();
    return skillLinks[key] ?? null;
  }

  type SkillCardProps = {
    skill: string;
    href: string | null;
    logo: string | null;
  };
  function SkillCard({ skill, href, logo }: SkillCardProps) {
    const [failed, setFailed] = useState(false);

    const card = (
      <div
        className="group relative aspect-square overflow-hidden rounded-xl border border-black/10 dark:border-white/20 card-surface shadow-sm hover:shadow-md transition-shadow"
        style={{
          background:
            "radial-gradient(100px 100px at 20% 10%, rgba(0,0,0,0.03), transparent 60%)", }} >

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-black/5 dark:bg-white/10" />

          <div className="absolute inset-0 grid place-items-center">
            {logo && !failed ? (
              <Image
                src={logo}
                alt={`${skill} logo`}
                width={48}
                height={48}
                className="h-10 w-10 sm:h-12 sm:w-12 opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                loading="lazy"
                unoptimized
                onError={() => setFailed(true)} />
            ) : (
              <span className="text-xs sm:text-sm font-semibold opacity-90">
                {skill}
              </span>
            )}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="glass bg-background/85 backdrop-blur border-t border-black/10 dark:border-white/10 px-2.5 py-1.5 text-center">
              <span className="text-xs font-medium">{skill}</span>
            </div>
          </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style= {{ background: "radial-gradient(160px 160px at 50% 45%, var(--accent)/12, transparent 60%)", }} />
      </div>
    );

    return href ? (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${skill} offical website`}
        className="block"
      >
        {card}
      </a>
    ) : (
      card
    );
  }

  return (
    <Section id="skills" title="Skills" subtitle="What I Use">
      <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4">
        {siteConfig.skills.map((skill) => {
          const href = getLinkHref(skill);
          const logo = getLogoSrc(skill);
          return (
            <li key={skill}>
              <Magnetic strength={0.18}>
                <SkillCard skill={skill} href={href} logo={logo} />
              </Magnetic>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
