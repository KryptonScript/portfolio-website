"use client";
import { useEffect, useRef } from "react";

export function CursorGlow() {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = document.createElement("div");
        ref.current = el;
        el.style.position = "fixed";
        el.style.width = "280px";
        el.style.height = "280px";
        el.style.borderRadius = "50%";
        el.style.pointerEvents = "none";
        el.style.zIndex = "1";
        el.style.opacity = "0.12";
        el.style.filter = "blur(30px)";
        el.style.background = "radial-gradient(circle, var(--accent), transparent 60%";
        el.style.transform = "translate(-50%, -50%)";
        document.body.appendChild(el);

        function onMove(e: MouseEvent) {
            el.style.left = `${e.clientX}px`;
            el.style.top = `${e.clientY}px`;
        }

        window.addEventListener("mousemove", onMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", onMove);
            el.remove();
        };
    }, []);

    return null;
}