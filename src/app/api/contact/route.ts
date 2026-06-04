import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

import { env } from "@/env";

const RECIPIENT: Record<string, string> = {
  student: "info@ramsocunsw.org",
  teacher: "outreach@ramsocunsw.org",
  industry: "sponsorships@ramsocunsw.org",
  it_test: "it.port@ramsocunsw.org",
};

export async function POST(request: Request) {
  try {
    if (
      !env.SMTP_HOST ||
      !env.SMTP_PORT ||
      !env.SMTP_USER ||
      !env.SMTP_PASS ||
      !env.SMTP_FROM
    ) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 },
      );
    }

    const formData = await request.formData();

    const name = (formData.get("name") as string | null)?.trim() ?? "";
    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const contactType =
      (formData.get("contactType") as string | null)?.trim() ?? "student";
    const inquiry = (formData.get("inquiry") as string | null)?.trim() ?? "";
    const files = formData.getAll("files") as File[];

    if (!name || !email || !inquiry) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const recipient = RECIPIENT[contactType] ?? "info@ramsocunsw.org";
    const contactTypeLabel =
      contactType.charAt(0).toUpperCase() + contactType.slice(1);

    const attachments = await Promise.all(
      files
        .filter((f) => f.size > 0)
        .map(async (file) => ({
          filename: file.name,
          content: Buffer.from(await file.arrayBuffer()),
        })),
    );

    const transporter = createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: recipient,
      replyTo: email,
      subject: `RAMSoc Inquiry — ${contactTypeLabel}`,
      text: `Name: ${name}\nEmail: ${email}\nContact Type: ${contactTypeLabel}\n\nInquiry:\n${inquiry}`,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact route]", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
