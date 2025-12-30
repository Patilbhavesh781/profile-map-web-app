import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from: "ProfileMap <onboarding@resend.dev>", // default verified sender
      to,
      subject,
      html,
    });

    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Email error:", error);
    throw new Error("Email not sent");
  }
};

export default sendEmail;
