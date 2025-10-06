import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Enginow Newsletter" <${process.env.GMAIL_USER}>`,
    //   to: "pp0903557@gmail.com",
      to: "care@enginow.in",
      subject: `New Newsletter Subscription`,
      html: `<h2>📰 New Newsletter Subscription</h2>
             <p><strong>Email:</strong> ${email}</p>
             <p>Subscribed on: ${new Date().toLocaleString()}</p>`,
      text: `New Newsletter Subscription\nEmail: ${email}\nSubscribed on: ${new Date().toLocaleString()}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Subscription successful!" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ success: false, error: "Failed to send subscription." }, { status: 500 });
  }
}