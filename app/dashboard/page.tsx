// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [enrollments, setEnrollments] = useState([]);
  
//   useEffect(() => {
//     axios.get("/api/enrollments").then(res => setEnrollments(res.data));
//   }, []);

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-4">My Courses</h1>
//       <ul>
//         {enrollments.map((e:any)=>(
//           <li key={e._id} className="mb-2">
//             {e.courseId} — {e.paymentStatus}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) return null;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.firstName || "User"} 👋</h1>
      <p className="text-gray-600">This is your dashboard.</p>
    </div>
  );
}
