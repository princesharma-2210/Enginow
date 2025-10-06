"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  
  useEffect(() => {
    axios.get("/api/enrollments").then(res => setEnrollments(res.data));
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      <ul>
        {enrollments.map((e:any)=>(
          <li key={e._id} className="mb-2">
            {e.courseId} — {e.paymentStatus}
          </li>
        ))}
      </ul>
    </div>
  );
}
