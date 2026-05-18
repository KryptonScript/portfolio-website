"use client";
import { MouseEvent } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { MusicToggle } from "@/components/MusicToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
];

export function Header() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<string>("#about");

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.location.reload();
    };

    useEffect(() => {
        const ids = nav.map((n) => n.href.replace("#", ""));
        const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) setActive(`#${visible[0].target.id}`);
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <header className="sticky top-0 z-50 glass border-b border-black/5 dark:border-white/10">
            <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
                <Link href="#" onClick={handleClick} className="font-bold gradient-text">
                Godfidence
                </Link>
                <nav className={cn("hidden md:flex items-center gap-6 text-sm")}>
                    {nav.map((item) => (
                        <a key={item.href} href={item.href} className={cn("hover:opacity-80", active === item.href && "text-accent")}>
                            {item.label}
                        </a>
                    ))}
                </nav>
                <div className="hidden md:flex items-center gap-2">
                    <MusicToggle />
                    <ThemeToggle />
                </div>
                <button aria-label="Open menu" className="md:hidden" onClick={() => setOpen((v) => !v)}>
                    ☰
                    </button>
            </div>
            {open && (
                <div className="md:hidden border-t border-black/5 dark:border-white/10 glass">
                    <div className="mx-auto max-w-6xl px-6 py-4 grid gap-3">
                        {nav.map((item) => (
                            <a key={item.href} href={item.href} className="py-2" onClick={() => setOpen(false)}>
                                {item.label}
                            </a>
                        ))}
                        <div className="flex items-center gap-2">
                            <MusicToggle />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}