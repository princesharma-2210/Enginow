import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Enrollment from "@/models/Enrollment"
import { randomBytes } from "crypto"

// Valid referral codes
const VALID_REFERRAL_CODES = [
  "FRIEND2024",
  "STUDENT50",
  "WELCOME25",
  "REFER100",
  "SAVE15",
  "NEWUSER",
  "DISCOUNT20",
  "SPECIAL30",
]

// Training programs data
const TRAINING_PROGRAMS = {
  "web-development": {
    title: "Full Stack Web Development",
    duration: "6 months",
    price: "15,000",
  },
  "data-science": {
    title: "Data Science & Machine Learning",
    duration: "8 months",
    price: "20,000",
  },
  "mobile-development": {
    title: "Mobile App Development",
    duration: "5 months",
    price: "12,000",
  },
  devops: {
    title: "DevOps & Cloud Computing",
    duration: "4 months",
    price: "18,000",
  },
  cybersecurity: {
    title: "Cybersecurity & Ethical Hacking",
    duration: "6 months",
    price: "22,000",
  },
  "digital-marketing": {
    title: "Digital Marketing & SEO",
    duration: "3 months",
    price: "8,000",
  },
  "training-placement": {
    title: "Training & Placement Program",
    duration: "12 months",
    price: "25,000",
  },
}

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Starting enrollment process...")

    // Parse request body
    let body
    try {
      body = await request.json()
      console.log("✅ Request body parsed successfully")
      console.log("📋 Enrollment data:", {
        programId: body.programId,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
      })
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request data format",
        },
        { status: 400 },
      )
    }

    // Validate required fields
    const requiredFields = [
      "programId",
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "education",
      "experience",
    ]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      console.error("❌ Missing required fields:", missingFields)
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Connect to database
    // try {
    //   await connectDB()
    //   console.log("✅ Database connected successfully")
    // } catch (dbError) {
    //   console.error("❌ Database connection failed:", dbError)
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       error: "Database connection failed. Please try again.",
    //     },
    //     { status: 500 },
    //   )
    // }

    // // Validate referral code if provided
    // if (body.referralCode) {
    //   body.referralCodeValid = VALID_REFERRAL_CODES.includes(body.referralCode.toUpperCase())
    //   body.referralCode = body.referralCode.toUpperCase()
    //   console.log("🎁 Referral code processed:", body.referralCode, "Valid:", body.referralCodeValid)
    // }

    // // Check for duplicate enrollment
    // try {
    //   const existingEnrollment = await Enrollment.findOne({
    //     email: body.email,
    //     programId: body.programId,
    //   })

    //   if (existingEnrollment) {
    //     console.log("⚠️ Duplicate enrollment detected")
    //     return NextResponse.json(
    //       {
    //         success: false,
    //         error: "You have already enrolled in this program with this email address.",
    //       },
    //       { status: 400 },
    //     )
    //   }
    //   console.log("✅ No duplicate enrollment found")
    // } catch (duplicateError) {
    //   console.error("❌ Error checking duplicates:", duplicateError)
    //   // Continue with enrollment even if duplicate check fails
    // }
    await connectDB()

    if (body.referralCode) {
      body.referralCodeValid = VALID_REFERRAL_CODES.includes(body.referralCode.toUpperCase())
      body.referralCode = body.referralCode.toUpperCase()
    }

    const existingEnrollment = await Enrollment.findOne({
      email: body.email,
      programId: body.programId,
    })
    if (existingEnrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already enrolled in this program with this email address.",
        },
        { status: 400 }
      )
    }

    console.log("📝 Creating new enrollment...")

    // ✅ Generate enrollment ID
    const enrollmentId = `ENR-${Date.now()}-${randomBytes(3).toString("hex").toUpperCase()}`
    const enrollment = new Enrollment({ ...body, enrollmentId })

    await enrollment.save()
    console.log("✅ Enrollment saved successfully:", enrollmentId)

    return NextResponse.json(
      {
        success: true,
        data: enrollment,
        message: "Enrollment created successfully! You will be contacted within 24–48 hours.",
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("❌ Error during enrollment:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    )
  }
}


export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const status = searchParams.get("status")
    const programId = searchParams.get("programId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    // Build query
    const query: any = {}
    if (email) query.email = email
    if (status) query.status = status
    if (programId) query.programId = programId

    // Execute query with pagination
    const enrollments = await Enrollment.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean()

    const total = await Enrollment.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: enrollments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      message: `${enrollments.length} enrollments retrieved`,
    })
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch enrollments",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment ID is required",
        },
        { status: 400 },
      )
    }

    const deletedEnrollment = await Enrollment.findByIdAndDelete(id)

    if (!deletedEnrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Enrollment deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting enrollment:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete enrollment",
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment ID is required",
        },
        { status: 400 },
      )
    }

    const updatedEnrollment = await Enrollment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!updatedEnrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "Enrollment not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedEnrollment,
      message: "Enrollment updated successfully",
    })
  } catch (error: any) {
    console.error("Error updating enrollment:", error)

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update enrollment",
      },
      { status: 500 },
    )
  }
}
