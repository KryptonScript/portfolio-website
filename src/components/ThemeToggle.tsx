"use client";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

type ThemeMode = "light" | "dark";

function getStoredOrDefault() : ThemeMode {
    if (typeof window === "undefined") return "dark";
    try {
        const stored = localStorage.getItem("theme") as ThemeMode | null;
        return stored ?? "dark";
    } catch {
        return "dark";
    }
}

function applyTheme(mode: ThemeMode) {
    const root = document.documentElement;
    root.setAttribute("data-theme", mode);
    if (mode === "dark") {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }
}

export function ThemeToggle() {
    const [mode, setMode] = useState<ThemeMode>("dark");

    useEffect(() => {
        const initial = getStoredOrDefault();
        applyTheme(initial);
    }, []);

    function setTheme(next: ThemeMode) {
        setMode(next);
        applyTheme(next);
        try {
            localStorage.setItem("theme", next);
        } catch {}
    }

    return (
        <div className="inline-flex items-center gap-2">
            <button onClick={() => setTheme("light")}
            aria-label="Switch to light mode"
            aria-pressed={mode === "light"}
            title = "Light mode"
            className={`inline-flex items-center justify-center rounded-md border p-2 text-lg ${
                mode === "light"
                ? "bg-foreground text-background border-foreground" : "border-black/10 dark:border-white/20"
            }`}
            >
                <FiSun aria-hidden />
            </button>
            <button
            onClick={() => setTheme("dark")}
            aria-label="Switch to dark mode"
            aria-pressed={mode === "dark"}
            title="Dark mode"
            className={`inline-flex items-center justify-center rounded-md border p-2 text-lg ${
                mode === "dark"
                ? "bg-foreground text-background border-foreground"
                : "border-black/10 dark:border-white/20"
            }`}
            >
                <FiMoon aria-hidden />
            </button>
        </div>
    )
}