"use client";
import { useEffect, useState } from "react";

export function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function onScroll() {
            const doc = document.documentElement;
            const total = doc.scrollHeight - doc.clientHeight;
            const current = doc.scrollTop;
            const p = total > 0 ? current / total : 0;
            setProgress(Math.min(1, Math.max(0, p)));
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div aria-hidden className="fixed left-0 right-0 top-0 z-60 h-1">
            <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${progress})`, transition: "transform 80ms linear"}} />
        </div>
    );
}