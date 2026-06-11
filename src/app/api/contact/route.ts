import { NextResponse } from "next/server";
import { Resend } from "resend";

import { env } from "@/env";

const RECIPIENT: Record<string, string> = {
  student: "info@ramsocunsw.org",
  teacher: "outreach@ramsocunsw.org",
  industry: "sponsorships@ramsocunsw.org",
  other: "info@ramsocunsw.org",
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

    const hasAttachments = attachments.length > 0;
    const attachmentList = hasAttachments
      ? attachments
          .map((a) => `<li style="margin:2px 0;color:#374151;">${a.filename}</li>`)
          .join("")
      : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-top:4px solid #29abe2;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#29abe2;">
              RAMSoc Website
            </p>
            <h1 style="margin:0;font-size:22px;font-weight:700;color:#0d2631;">
              New Inquiry — ${contactTypeLabel}
            </h1>
          </td>
        </tr>

        <!-- Sender details -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:16px;width:50%;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9ca3af;">Name</p>
                  <p style="margin:0;font-size:15px;color:#0d2631;font-weight:600;">${name}</p>
                </td>
                <td style="padding-bottom:16px;width:50%;vertical-align:top;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9ca3af;">Email</p>
                  <a href="mailto:${email}" style="margin:0;font-size:15px;color:#29abe2;font-weight:600;text-decoration:none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding-bottom:24px;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9ca3af;">Contact Type</p>
                  <p style="margin:0;display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#29abe2;border:1px solid #29abe2;padding:3px 10px;">${contactTypeLabel}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Inquiry -->
        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9ca3af;">Inquiry</p>
            <div style="background:#f9fafb;border-left:3px solid #29abe2;padding:16px 20px;">
              <p style="margin:0;font-size:15px;line-height:1.7;color:#374151;white-space:pre-wrap;">${inquiry}</p>
            </div>
          </td>
        </tr>

        ${
          hasAttachments
            ? `<!-- Attachments -->
        <tr>
          <td style="padding:0 40px 28px;">
            <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#9ca3af;">Attachments (${attachments.length})</p>
            <ul style="margin:0;padding:0 0 0 18px;">${attachmentList}</ul>
          </td>
        </tr>`
            : ""
        }

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px;background:#f9fafb;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;color:#9ca3af;">
              Sent via the RAMSoc website contact form &nbsp;·&nbsp;
              <a href="https://ramsocunsw.org" style="color:#29abe2;text-decoration:none;">ramsocunsw.org</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: "noreply@ramsocunsw.org",
      to: [recipient],
      replyTo: email,
      subject: `RAMSoc Inquiry — ${contactTypeLabel} from ${name}`,
      html,
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
