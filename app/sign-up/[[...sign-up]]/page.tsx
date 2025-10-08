"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // Sync user to MongoDB
      fetch("/api/creatUser", { method: "POST" })
        .then((res) => res.json())
        .then((data) => console.log("✅ User sync response:", data))
        .catch((err) => console.error("❌ Sync error:", err));
    }
  }, [isSignedIn, user]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Redirect to home after successful sign-up */}
      <SignUp redirectUrl="/" />
    </div>
  );
}
