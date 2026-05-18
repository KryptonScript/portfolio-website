"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 md:pt-24 pb-10">
      <div className="flex items-start gap-6">
        {siteConfig.avatar && (
          <motion.div
            initial={{ opacity: 0, scale: 2.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden border border-black/10 dark:border-white/20 shadow">
            <Image src={siteConfig.avatar}
              alt={`${siteConfig.name} avatar`}
              fill sizes="112px"
              className="object-cover" 
              loading="eager"/>
          </motion.div>
        )}
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: -125 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-wide text-foreground/90">
            {siteConfig.role} • {siteConfig.location}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 125 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-2 text-4xl md:text-6xl font-bold gradient-text">
            {siteConfig.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-4 text-lg text-foreground max-w-2xl whitespace-pre-line" 
            dangerouslySetInnerHTML={{
              __html: siteConfig.description
            }} />
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <a
          href="#projects"
          className="group inline-flex items-center rounded-md bg-accent text-background px-4 py-2 text-sm font-medium hover-opacity-90 shadow">
          View Projects
        </a>
        <a
          href="#experience"
          className="group inline-flex items-center rounded-md border border-black/10 dark:border-white px-4 py-2 text-sm font-medium hover:bg-accent/5 dark:hover:bg-white/10">
          My Experience
        </a>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-10 h-px w-full bg-linear-to-r from-transparent via-(--accent)/40 to-transparent" />
    </section>
  );
}
