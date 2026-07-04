"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "shahmdmahi24@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      replyTo: email as string,
      text: message as string,
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
