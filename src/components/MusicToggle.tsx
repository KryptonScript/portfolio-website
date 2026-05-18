"use client";
import { useEffect, useRef, useState } from "react";
import { FiMusic, FiPause } from "react-icons/fi";

type Props = {
    src?: string;
    loop?:boolean;
    volume?: number;
};

export function MusicToggle({ src="public/Ethiopian-mezmur-classical.mp3", loop = true, volume = 0.5}: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
    const resumeOnGestureRef = useRef<(() => void) | null>(null);

    function normalizeSrc(input: string): string {
        let path = input.trim();
        if (path.startsWith("public/")) path = "/" + path.slice(7);
        if (!path.startsWith("/")) path = "/" + path;
        try {
            return encodeURI(path);
        } catch {
            return path;
        }
    }

    useEffect(() => {
        const audio = new Audio(normalizeSrc(src));
        audioRef.current = audio;
        audio.loop = loop;
        audio.volume = Math.min(1, Math.max(0, volume));
        audio.preload = "auto";
        const onError = () => setIsAvailable(false);
        const onCanPlay = () => setIsAvailable(true);
        audio.addEventListener("error", onError);
        audio.addEventListener("canplaythrough", onCanPlay, { once: true});

        try {
            const stored = localStorage.getItem("music:isPlaying");
            if (stored === "true") {
                const tryPlay = async () => {
                    try {
                        await audio.play();
                        setIsPlaying(true);
                        cleanupGesture();
                    } catch {
                        attachGesture();
                    }
                };

                const onVisible = () => {
                    if (document.visibilityState === "visible") {
                        document.removeEventListener("visibilitychange", onVisible);
                        void tryPlay();
                    }
                };
                if (document.visibilityState === "visible") {
                    void tryPlay();
                } else {
                    document.addEventListener("visibilitychange", onVisible);
                }
            }
        } catch { }

        function attachGesture() {
            if (resumeOnGestureRef.current) return;
            const handler = async () => {
                try {
                    await audio.play();
                    setIsPlaying(true);
                    cleanupGesture();
                } catch { }
            };
            resumeOnGestureRef.current = handler;
            window.addEventListener("pointerdown", handler, { once: true });
            window.addEventListener("keydown", handler, { once: true });
            window.addEventListener("touchstart", handler, { once: true });
        }

        function cleanupGesture() {
            const handler = resumeOnGestureRef.current;
            if (!handler) return;
            window.removeEventListener("pointerdown", handler as EventListener);
            window.removeEventListener("keydown", handler as EventListener);
            window.removeEventListener("touchstart", handler as EventListener);
            resumeOnGestureRef.current = null;
        }

        return () => {
            cleanupGesture();
            audio.pause();
            audio.removeEventListener("error", onError);
            audio.removeEventListener("canplaythrough", onCanPlay as EventListener);
            audioRef.current = null;
        };
    }, [src, loop, volume]);

    useEffect(() => {
        try {
            localStorage.setItem("music:isPlaying", String(isPlaying));
        } catch { }
    }, [isPlaying]);

    async function toggle() {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch {

            }
        }
    }

    return (
        <button onClick={toggle}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isAvailable === false ? "File missing (place at public/ or set src)" : isPlaying ? "Pause music" : "Play music"}
        className={`inline-flex items-center justify-center rounded-md border p-2 text-lg transition-colors ${isPlaying ? "text-accent" : ""} border-black/20 dark:border-white/20 bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-foreground`}
        >
            {isPlaying ? <FiPause aria-hidden /> : <FiMusic aria-hidden />}
        </button>
    );
}