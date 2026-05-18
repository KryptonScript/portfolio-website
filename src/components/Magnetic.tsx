"use client";
import { PropsWithChildren, useRef } from "react";
import { MouseEvent } from "react";

type Props = PropsWithChildren<{ strength?: number; className?: string }>;

export function Magnetic({ children, strength = 0.3, className }: Props){
    const ref = useRef<HTMLDivElement | null>(null);

    function onMove(e: MouseEvent) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    }
    function onLeave() {
        const el = ref.current;
        if (!el) return;
        el.style.transform = `translate(0px, 0px)`;
    }

    return (
        <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
        style={{ transition: "transform 150ms ease" }}>
            {children}
        </div>
    );
};
