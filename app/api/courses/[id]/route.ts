import { NextRequest, NextResponse } from "next/server"

// Your course list
const courses = [
  {
    id: "data-structures-algorithms",
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of DSA with practical examples",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: true,
    category: "Programming",
    color: "purple",
    youtubeLink: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU",
  },
  {
    id: "computer-organization-architecture",
    title: "Computer Organization & Architecture",
    description: "Understand the inner workings of computer systems",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: true,
    category: "Systems",
    color: "teal",
    youtubeLink: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
  },
  {
    id: "operating-system",
    title: "Operating Systems",
    description: "Learn about process management, memory, and file systems",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Systems",
    color: "orange",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
  },
  {
    id: "advanced-java-programming",
    title: "Advanced Java Programming",
    description: "Take your Java skills to the next level",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "999",
    category: "Programming",
    color: "pink",
    youtubeLink: "",
  },
  {
    id: "discrete-mathematics",
    title: "Discrete Mathematics",
    description: "Essential mathematical concepts for computer science",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Mathematics",
    color: "purple",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3",
  },
  {
    id: "automata-theory",
    title: "Automata Theory",
    description: "Understand formal languages and computational models",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Theory",
    color: "teal",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev",
  },
  {
    id: "c-programming",
    title: "C Programming",
    description: "Learn the fundamentals of C programming language",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Programming",
    color: "orange",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
  },
  {
    id: "cpp-programming",
    title: "C++ Programming",
    description: "Master object-oriented programming with C++",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: true,
    category: "Programming",
    color: "pink",
    youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRh6isJ01MBnbNpV3ZsktSyS",
  },
  {
    id: "database-management-systems",
    title: "Database Management Systems",
    description: "Learn SQL and database design principles",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "799",
    category: "Systems",
    color: "purple",
    youtubeLink: "",
  },
  {
    id: "advanced-algorithms",
    title: "Advanced Algorithms",
    description: "Deep dive into complex algorithmic techniques",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: false,
    price: "1299",
    category: "Programming",
    color: "teal",
    youtubeLink: "",
  },
  {
    id: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    description: "Introduction to ML concepts and algorithms",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: false,
    price: "1499",
    category: "AI",
    color: "orange",
    youtubeLink: "",
  },
  {
    id: "web-development-bootcamp",
    title: "Web Development Bootcamp",
    description: "Full-stack web development with modern technologies",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "1999",
    category: "Web",
    color: "pink",
    youtubeLink: "",
  },
]

// export async function GET(request: Request, { params }: { params: { courseId: string } }) {
//   const { courseId } = params
//   const course = courses.find((c) => c.id === courseId)
//   if (!course) {
//     console.log('ram')
//     return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 })
//   }
//   return NextResponse.json({ success: true, data: course })
// }
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const courseId = params.id
  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return NextResponse.json(
      { success: false, error: "Course not found" },
      { status: 404 }
    )
  }

  return NextResponse.json({ success: true, data: course })
}