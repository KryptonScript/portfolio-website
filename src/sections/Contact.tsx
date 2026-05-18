"use client"
import { Section } from "@/components/Section"
import { useState } from "react";

export function ContactSection() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(formData: FormData): Promise<void> {
        setStatus("loading");
        setError(null);
        try {
            const res = await fetch("/contact-api", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    message: formData.get("message"),
                }),
            });
            const json = await res.json();
            if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
            setStatus("success");
        } catch (e) {
            setStatus("error");
            const message = e instanceof Error ? e.message : "Something went wrong";
            setError(message);
        }
    }
    
    return (
        <Section id="contact" title="Contact" subtitle="Let's talk">
            <form action={onSubmit} className="grid gap-3 max-w-xl">
                <label className="grid gap-2">
                    <span className="text-sm">Name</span>
                    <input name="name" required className="w-full rounded-md border border-accent dark:border-accent px-3 py-2 bg-white dark:bg-transparent placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-(--accent)/40 focus:border-(--accent)/60" placeholder="Dawit Getachew"/>
                </label>
                <label className="grid gap-2">
                    <span className="text-sm">Email</span>
                    <input type="email" name="email" required className="w-full rounded-md border border-accent dark:border-accent px-3 py-2 bg-white dark:bg-transparent placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-(--accent)/40 focus:border-(--accent)/60"
                    placeholder="dawitgetachew@gmail.com"/>
                </label>
                <label className="grid gap-2">
                    <span className="text-sm">Message</span>
                    <textarea name="message" required rows={5} className="w-full rounded-md border border-accent dark:border-accent px-3 py-2 bg-white dark:bg-transparent placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-(--accent)/40 focus:border-(--accent)/60" 
                    placeholder={`Enter your warm message here ☺️ \n\n "ወዳጅ ሆይ፥ ነፍስህ እንደሚከናወን፥ በነገር ሁሉ እንዲከናወንልህና ጤና እንዲኖርህ እጸልያለሁ።” 3ኛ የዮሐንስ መልእክት 1፥2`} />
                </label>
                <div className="flex items-center gap-3">
                    <button disabled={status === "loading"} className="inline-flex items-center rounded-md bg-accent text-background px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50">
                        {status === "loading" ? "Sending..." : "Send"}
                    </button>
                    {status === "success" && <span className="text-sm text-green-500">🛫 Sent I will reply soon.</span>}
                    {status === "error" && <span className="text-sm text-red500">{error}</span>} 
                </div>
            </form> 
        </Section>
    )
}