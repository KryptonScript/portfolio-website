"use client";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export function ScrollTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function onScroll() {
            setVisible(window.scrollY > 95);
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;
    return (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" className="fixed bottom-6 right-6 z-60 inline-flex items-center justify-center rounded-full p-3 border border-black/10 dark:border-white/20 bg-background/80 shadow hover:shadow-md">
            <FiArrowUp />
        </button>
    );
}