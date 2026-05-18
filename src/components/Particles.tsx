"use client";
import { useEffect, useRef } from "react";

type Particle = { x: number, y: number; vx: number; vy: number; r: number };

export function Particles() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef<{ x: number; y: number } | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = document.createElement("canvas");
        canvasRef.current = canvas;
        canvas.style.position = "fixed";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "0";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.floor(canvas.clientWidth * dpr);
            canvas.height = Math.floor(canvas.clientHeight * dpr);
            if (ctx) {
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }
        }
        resize();
        window.addEventListener("resize", resize);

        const num = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 30000));
        particlesRef.current = Array.from({ length: num}, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: Math.random() * 2 + 0.5,
        }));
        
        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#f59e0b";
            for (const p of particlesRef.current) {
                if (mouseRef.current) {
                    const dx = mouseRef.current.x - p.x;
                    const dy = mouseRef.current.y - p.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 14000) {
                        const f = -0.6 / Math.max(60, Math.sqrt(d2));
                        p.vx += f * dx;
                        p.vy += f * dy;
                    }
                }
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.995;
                p.vy *= 0.995;
                if (p.x < -10) p.x = window.innerWidth + 10;
                if (p.x > window.innerWidth + 10) p.x = -10;
                if (p.y < -10) p.y = window.innerHeight + 10;
                if (p.y > window.innerHeight + 10) p.y = -10;
                ctx.beginPath();
                ctx.fillStyle = accent + "26";
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const a = particlesRef.current[i];
                    const b = particlesRef.current[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 100) {
                        ctx.strokeStyle = accent + "1a";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            rafRef.current = requestAnimationFrame(draw);
        }

        function onMove(e: MouseEvent) {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }
        function onLeave() {
            mouseRef.current = null;
        }
        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mouseleave", onLeave);

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseleave", onLeave);
            canvas.remove();
        };
    }, []);

    return null;
}