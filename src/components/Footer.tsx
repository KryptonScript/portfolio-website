import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FiMail, FiGithub, FiLinkedin, FiTwitter, FiYoutube } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="border-t border-black/5 dark:border-white/10 mt-20">
            <div className="mx-auto max-w-6xl px-6 py-10 text-sm flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <p className="text-foreground/70">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                <div className="flex gap-4 text-xl">
                    {(() => {
                        const byKey = Object.fromEntries(siteConfig.socials.map(s => [s.label.toLowerCase(), s]));
                        const ordered = [byKey["email"], byKey["github"], byKey["linkedin"], byKey["telegram"], byKey["x/twitter"], byKey["youtube"]].filter(Boolean);
                        return ordered.map((s) => {
                            const label = s!.label.toLowerCase();
                            const Icon = label === "email" ? FiMail : label === "github" ? FiGithub : label === "linkedin" ? FiLinkedin : label === "telegram" ? FaTelegramPlane: label === "x/twitter" ? FiTwitter : label === "youtube" ? FiYoutube : FiMail;
                            const external = s!.href.startsWith("http");
                            return(
                                <Link
                                key={s!.label}
                                href={s!.href}
                                aria-label={s!.label}
                                target={external ? "noreferrer": undefined}
                                rel={external ? "noreferrer" : undefined}
                                className="hover:text-accent transition-colors">
                                    <Icon aria-hidden />
                                </Link>
                            )
                        });
                    })()}
                </div>
            </div>

        </footer>
    );
}