import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const jobTitle = formData.get("jobTitle") as string
    const resume = formData.get("resume") as File

    // Basic validation
    if (!name || !email || !phone || !jobTitle || !resume) {
      return NextResponse.json({ success: false, error: "Please fill all required fields." }, { status: 400 })
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const submittedAt = new Date().toLocaleString()

    const mailOptions = {
      from: `"Enginow Job Application" <${process.env.GMAIL_USER}>`,
    //   to:"pp0903557@gmail.com",
      to: "care@enginow.in",
      subject: `New Job Application: ${name} - ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px;">
          <h2 style="text-align: center; background: #4f46e5; color: white; padding: 12px; border-radius: 6px;">
            🚀 New Job Application - Enginow
          </h2>

          <h3>👤 Applicant Details</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Job Applied:</strong> ${jobTitle}</li>
          </ul>

          <hr style="margin: 30px 0;" />
          <p style="text-align: center; font-size: 12px; color: gray;">
            Submitted on: ${submittedAt}<br />
            Please respond to: <strong>${email}</strong>
          </p>
        </div>
      `,
      attachments: [
        {
          filename: resume.name,
          content: await resume.arrayBuffer().then(Buffer.from),
        },
      ],
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Application submitted successfully!" })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}