// /app/api/createUser/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST() {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    const existingUser = await User.findOne({ clerkId: userId }).lean();
    if (existingUser) {
      return NextResponse.json({ message: "User already exists", user: existingUser });
    }

    const newUser = await User.create({
      clerkId: userId,
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      email: clerkUser.emailAddresses[0]?.emailAddress,
    });

    return NextResponse.json({ message: "User created successfully", user: newUser.toObject() });
  } catch (err: any) {
    console.error("❌ Error creating user:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
