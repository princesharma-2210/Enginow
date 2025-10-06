"use client"

import { useParams } from "next/navigation"
// import { courses } from "@/data/coursesData"
import { Button } from "@/components/ui/button"
import { disableGlobalCursorStyles } from "react-resizable-panels"

type Course = {
  id: string
  title: string
  description: string
  youtubeLink: string
  timeline?: { time: string; label: string }[]
  topics: string[]
  exercises: string[]
  tasks: string[]
}

export const coursesData: Course[] = [
  {
    id: "data-structures-algorithms",
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA with practical examples",
    youtubeLink: "https://www.youtube.com/embed/videoseries?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU",
    topics: ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Graphs"],
    timeline: [
      { time: "00:00", label: "Introduction" },
      { time: "02:30", label: "Arrays" },
      { time: "05:45", label: "Linked Lists" },
      { time: "10:20", label: "Stacks & Queues" },
      { time: "15:00", label: "Trees" },
      { time: "20:30", label: "Graphs" },
    ],
    exercises: [
      "Solve 10 array problems",
      "Implement a linked list",
      "Practice recursion",
    ],
    tasks: ["Build a stack with arrays", "Graph traversal mini-project"],
  },
  {
    id: "computer-organization-architecture",
    title: "Computer Organization & Architecture",
    description: "Understand the inner workings of computer systems",
    youtubeLink: "https://www.youtube.com/embed/videoseries?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
    topics: ["Digital Logic", "CPU Organization", "Memory Hierarchy", "I/O Systems"],
    timeline: [
      { time: "00:00", label: "Digital Logic" },
      { time: "05:00", label: "CPU Organization" },
      { time: "12:30", label: "Memory Hierarchy" },
      { time: "18:00", label: "I/O Systems" },
    ],
    exercises: ["Design a simple ALU", "Draw CPU datapath for a basic instruction"],
    tasks: ["Simulate memory hierarchy using Python"],
  },
  {
    id: "operating-system",
    title: "Operating Systems",
    description: "Learn about process management, memory, and file systems",
    youtubeLink: "https://www.youtube.com/embed/videoseries?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
    topics: ["Processes", "Threads", "Memory Management", "File Systems", "Scheduling"],
    timeline: [
      { time: "00:00", label: "Processes" },
      { time: "03:30", label: "Threads" },
      { time: "08:00", label: "Memory Management" },
      { time: "13:20", label: "File Systems" },
      { time: "18:45", label: "Scheduling" },
    ],
    exercises: ["Implement a simple scheduler in C", "Simulate process creation and termination"],
    tasks: ["Build a memory allocation simulator", "File system mini-project"],
  },
  // ... add other courses in the same structure
]

export default function CourseDetailPage() {
  const { id } = useParams()
  const course = coursesData.find((c: Course) => c.id === id)

  if (!course) return <div className="p-10">❌ Course not found</div>

  return (
    <div className="container py-10">
      {/* Title & Description */}
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-muted-foreground mb-6">{course.description}</p>

      {/* Embedded YouTube Video */}
      <div className="aspect-video w-full mb-6">
        <iframe
          className="w-full h-full rounded-xl"
          src={course.youtubeLink}
          title={course.title}
          allowFullScreen
        />
      </div>

      {/* Timeline */}
      {course.timeline && (
        <>
          <h2 className="text-xl font-semibold mt-6">⏱ Timeline</h2>
          <ul className="list-disc pl-6 mt-2">
            {course.timeline.map((item: { time: string; label: string }, i: number) => (
              <li key={i}>
                <span className="font-mono">{item.time}</span> — {item.label}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Topics */}
      <h2 className="text-xl font-semibold mt-6">📌 Topics Covered</h2>
      <ul className="list-disc pl-6 mt-2">
        {course.topics.map((topic: string, i: number) => (
          <li key={i}>{topic}</li>
        ))}
      </ul>
      {/* <h2 className="text-xl font-semibold mt-6">📌 Topics Covered</h2>
      <ul className="list-disc pl-6 mt-2">
        <li>{coursesData.descri}</li>
      </ul> */}



      {/* Exercises */}
      <h2 className="text-xl font-semibold mt-6">📝 Exercises</h2>
      <ul className="list-disc pl-6 mt-2">
        {course.exercises.map((ex: string, i: number) => (
          <li key={i}>{ex}</li>
        ))}
      </ul>

      {/* Tasks */}
      <h2 className="text-xl font-semibold mt-6">✅ Tasks</h2>
      <ul className="list-disc pl-6 mt-2">
        {course.tasks.map((task: string, i: number) => (
          <li key={i}>{task}</li>
        ))}
      </ul>

      <Button className="mt-6" on onClick={disableGlobalCursorStyles}>Mark as Completed</Button>
    </div>
  )
}
