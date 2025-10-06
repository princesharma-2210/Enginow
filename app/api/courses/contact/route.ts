import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      whatsapp,
      linkedin,
      city,
      state,
      education,
      experience,
      motivation,
      referralCode,
      referralCodeValid,
      courseId,
      agreeTerms,
      agreeMarketing,
    } = body

    // Basic validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone 
    //   !city ||
    //   !state ||
    //   !education ||
    //   !experience ||
    //   !agreeTerms ||
    //   !courseId
    ) {
      return NextResponse.json(
        { success: false, error: "Please fill all required fields." },
        { status: 400 }
      )
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER || "shaarmprince@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD || "cintyqtfcnvbayav",
      },
    })

    const fullName = `${firstName} ${lastName}`
    const submittedAt = new Date().toLocaleString()

    const mailOptions = {
      from: `"Enginow Enrollment Form" <${process.env.GMAIL_USER || "shaarmprince@gmail.com"}>`,
      to: "care@enginow.in",
    // to:"pp0903557@gmail.com",
      subject: `New Enrollment: ${fullName} - Course ID ${courseId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; padding: 20px;">
          <h2 style="text-align: center; background: #4f46e5; color: white; padding: 12px; border-radius: 6px;">
            🚀 New Enrollment Submission - Enginow
          </h2>

          <h3>📄 Course Details</h3>
          <ul>
            <li><strong>Course ID:</strong> ${courseId}</li>
            <li><strong>Referral Code:</strong> ${referralCode || "N/A"}</li>
            <li><strong>Referral Valid:</strong> ${referralCodeValid ? "✅ Yes" : "❌ No"}</li>
          </ul>

          <h3>👤 Personal Details</h3>
          <ul>
            <li><strong>Name:</strong> ${fullName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>WhatsApp:</strong> ${whatsapp || "N/A"}</li>
            <li><strong>LinkedIn:</strong> ${linkedin || "N/A"}</li>
          </ul>

          <h3>📍 Location & Background</h3>
          <ul>
            <li><strong>City:</strong> ${city}</li>
            <li><strong>State:</strong> ${state}</li>
            <li><strong>Education:</strong> ${education}</li>
            <li><strong>Experience:</strong> ${experience}</li>
            <li><strong>Motivation:</strong> ${motivation || "N/A"}</li>
          </ul>

          <h3>✅ Consents</h3>
          <ul>
            <li><strong>Agreed to Terms:</strong> ${agreeTerms ? "✅ Yes" : "❌ No"}</li>
            <li><strong>Marketing Consent:</strong> ${agreeMarketing ? "✅ Yes" : "❌ No"}</li>
          </ul>

          <hr style="margin: 30px 0;" />
          <p style="text-align: center; font-size: 12px; color: gray;">
            Submitted on: ${submittedAt}<br />
            Please respond to: <strong>${email}</strong>
          </p>
        </div>
      `,
      text: `
New Enrollment Submission - Enginow

Course:
- Course ID: ${courseId}
- Referral Code: ${referralCode || "N/A"} (${referralCodeValid ? "Valid" : "Invalid"})

Personal Info:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- WhatsApp: ${whatsapp || "N/A"}
- LinkedIn: ${linkedin || "N/A"}

Location:
- City: ${city}
- State: ${state}

Background:
- Education: ${education}
- Experience: ${experience}
- Motivation: ${motivation || "N/A"}

Consents:
- Terms: ${agreeTerms ? "Yes" : "No"}
- Marketing: ${agreeMarketing ? "Yes" : "No"}

Submitted at: ${submittedAt}
Reply to: ${email}
      `,
      replyTo: email,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Enrollment submitted successfully!",
    })

  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    )
  }
}
