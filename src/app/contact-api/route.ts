import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.email(), 
    message: z.string().min(5).max(5000),
});

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const data = contactSchema.parse(json);

        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = Number(process.env.SMTP_PORT || 587);
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const toEmail = process.env.CONTACT_TO || smtpUser;

        if (smtpHost && smtpUser && smtpPass && toEmail) {
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: { user: smtpUser, pass: smtpPass },
            });

            await transporter.sendMail({
                from: `Portfolio Contact <${smtpUser}>`,
                to: toEmail,
                subject: `New message from ${data.name}`,
                replyTo: data.email,
                text: data.message,
                html: `<p><strong>Name:</strong> ${data.name}</p><p><strong>Email:</strong> ${data.email}</p><p>${data.message}</p>`,
            });
        }   else {
            console.log("[Contact] Email not configured. Message: ", data);
        }

        return NextResponse.json({ ok: true });
    }  catch (error) {
        console.error("[Contact] Error:", error);
        return NextResponse.json({ ok: false, error: "Invalid request" },
            { status: 400 });
    }
}