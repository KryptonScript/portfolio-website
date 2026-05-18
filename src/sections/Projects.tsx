"use client"
import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";
import { useMemo, useState } from "react";
import { TiltCard } from "@/components/TiltCard";
import { FiGithub } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";

const allTags = Array.from(
    new Set(siteConfig.projects.flatMap((p) => p.technologies))
).sort();

export function ProjectsSection() {
    const [active, setActive] = useState<string | "all">("all");
    const filtered = useMemo(() => {
        if (active === "all") return siteConfig.projects;
        return siteConfig.projects.filter((p) => p.technologies.includes(active));
    }, [active]);

    return (
    <Section id="projects" title="Projects" subtitle="Selected Work">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
            <button onClick={() => setActive("all")} className={`rounded-md border px-3 py-1.5 ${active === "all" ? "bg-accent text-background" : "border-black/10 dark:border-white/20"}`}>All</button>
            {allTags.map((t) => (
                <button key={t} onClick={() => setActive(t)} className={`rounded-md border px-3 py-1.5 ${active === t ? "bg-accent text-background" : "border-black/10 dark:border-white/20"}`}>
                    {t}
                </button>
            ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((p) => (
                <TiltCard
                    key={p.title}
                    className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/20 transition-transform hover:-translate-y-1 hover:shadow-md card-surface h-64 md:h-72">
                    {p.href && !p.image && p.title !== "GitHub Profile" && (
                        <iframe src={p.href} title={`${p.title} preview`}
                        className="absolute inset-0 h-full w-full border-0" loading="lazy" sandbox="allow-forms allow-scripts allow-same-origin allow-popups"/>
                    )}
                    <div className="absolute inset-x-0 bottom-0 translte-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="glass border-t border-black/10 dark:border-white/10 bg-background/80 backdrop-blur px-4 py-3">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <h3 className="text-base font-semibold truncate" title={p.title}>{p.title}</h3>
                                    <p className="mt-0 5 text-xs text-foreground/80 line-clamp-2">{p.description}</p>
                                </div>
                                <div className="flex items-center gap-3 text-base shrink-0">
                                    {p.href && (
                                        <a
                                        className="no-underline hover:underline underline-offset-4 decoration-accent hover:text-accent"
                                        href={p.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Open live site"
                                        title="Open live site">

                                            <FaExternalLinkAlt />
                                        </a>
                                    )}
                                    {p.repo && (
                                        <a
                                        className="no-underline hover:underline underline-offset-4 decoration-accent hover:text-accent"
                                        href={p.repo}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Open source code on GitHub"
                                        title="Open source code on GitHub"
                                        >
                                        <FiGithub />

                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {p.technologies.map((t) => (
                                    <span key={t} className="text-[10px] rounded dark:bg-white/10 px-2 py-0.5">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                </TiltCard>
            ))}
        </div>
    </Section>    
    )
}

