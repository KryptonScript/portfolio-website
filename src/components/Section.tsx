"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
    id?: string;
    className?: string;
    title?: string;
    subtitle?: string;
}>;

export function Section({ id, className, title, subtitle, children }: SectionProps) {
    return (
        <section id={id} className={cn("mx-auto max-w-6xl px-6 py-16 md:py-24", className)}>
            {(title || subtitle) && (
                <div className="mb-10">
                    {subtitle && (
                        <motion.p initial={{ opacity: 0, y:8 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true }} className="text-sm uppercase tracking-wide text-foreground/70">
                            {subtitle}
                        </motion.p>
                    )}
                    {title && (
                        <motion.h2 initial={{ opacity:0, y:10 }} whileInView={{ opacity: 1, y:0 }} viewport={{ once: true }} className="mt-1 text-3xl md:text-4xl font-bold text-accent">
                            {title}
                        </motion.h2>
                    )}
                </div>
            )}
            {children}
        </section>
    );
}