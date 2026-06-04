import { NextResponse } from "next/server";
import { Resend } from "resend";

import { env } from "@/env";

const RECIPIENT: Record<string, string> = {
  student: "info@ramsocunsw.org",
  teacher: "outreach@ramsocunsw.org",
  industry: "sponsorships@ramsocunsw.org",
  it_test: "it.port@ramsocunsw.org",
};

export async function POST(request: Request) {
  try {
    if (!env.RESEND_API_KEY) {
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

    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "noreply@ramsocunsw.org",
      to: [recipient],
      replyTo: email,
      subject: `RAMSoc Inquiry — ${contactTypeLabel}`,
      text: `Name: ${name}\nEmail: ${email}\nContact Type: ${contactTypeLabel}\n\nInquiry:\n${inquiry}`,
      attachments,
    });

    if (error) {
      console.error("[contact route] Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact route]", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
