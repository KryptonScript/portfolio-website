import { Section } from "@/components/Section";
import { siteConfig } from "@/config/site";

export function EducationSection() {
    return (
        <Section id="education" title="Education" subtitle="What I Studied">
            <ul className="space-y-4">
                {siteConfig.education.map((ed) => (
                    <li key={`${ed.school}-${ed.degree}`} className="rounded-md border border-black/10 dark:border-white/20 p-4 transition hover:shadow-md card-surface">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
                        <span>{ed.start} - {ed.end}</span>
                        <span>.</span>
                        <span>{ed.school}</span>
                        </div>
                        <h3 className="mt-1 font-medium">{ed.degree}</h3>
                    </li>
                ))}
            </ul>
        </Section>
    )
}