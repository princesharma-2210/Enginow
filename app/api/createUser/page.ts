// /app/api/create-user/route.ts
import { auth, currentUser } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST() {
  try {
    const { userId } = await auth();
    const clerkUser = await currentUser();

    if (!userId || !clerkUser) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    // Connect to MongoDB
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
      return Response.json({ message: "User already exists" });
    }

    // Create new user document
    const newUser = await User.create({
      clerkId: userId,
      name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      email: clerkUser.emailAddresses[0]?.emailAddress,
    });

    return Response.json({ message: "User created successfully", user: newUser });
  } catch (err: any) {
    console.error("❌ Error creating user:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
