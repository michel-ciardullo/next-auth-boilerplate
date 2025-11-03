/* eslint-disable @typescript-eslint/no-unused-vars */
// import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Configure transport
/*const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});*/

export async function sendEmail({ to, subject, html }: EmailOptions) {
  /*try {
    const info = await transporter.sendMail({
      from: `"Next Auth" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Email error:", err);
  }*/
}
