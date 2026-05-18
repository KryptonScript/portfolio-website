import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";

export function ExperienceSection() {
    return(
        <Section id="experience" title="Experience" subtitle="Where I've worked">
            <ol className="space-y-6">
                {siteConfig.experience.map((e) => (
                    <li key={`${e.company}-${e.role}`} className="rounded-lg border-black/10 dark:border-white/20 p-5 transition hover:shadow-md card-surface">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                        <span>{e.start} - {e.end}</span>
                        <span>•</span>
                        <span>{e.company}</span>
                        </div>
                        <h3 className="mt-1 text-lg font-semibold">{e.role}</h3>
                        <p className="mt-2 text-sm text-foreground/80">{e.summary}</p>
                        {e.highlights && (
                            <ul className="mt-3 list-disc pl-5 text-sm">
                                {e.highlights.map((h) => (
                                    <li key={(h)}>{h}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ol>
        </Section>
    )
}