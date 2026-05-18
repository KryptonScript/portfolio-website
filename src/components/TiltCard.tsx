"use client";
import { PropsWithChildren, useRef } from "react";
import { MouseEvent } from "react";

type Props = PropsWithChildren<{ className?: string; maxTilt?: number }>;

export function TiltCard({ children, className, maxTilt = 5}: Props){
    const ref = useRef<HTMLDivElement | null>(null);

    function onMove(e: MouseEvent) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * -2 * maxTilt;
        const ry = (px - 0.5) * 2 * maxTilt;
        el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    function onLeave() {
        const el = ref.current;
        if (!el) return;
        el.style.transform = `perspective(700px) rotateX(0deg) rotateY(0deg)`
    }

    return (
        <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={className}
        style={{ transition: "transform 200ms ease", backgroundColor: "white" }}>
            {children}
        </div>
    )
}