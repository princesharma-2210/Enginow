// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Search, Filter, BookOpen } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { AnimatedElement } from "@/components/ui/animated-element"
// import { motion } from "framer-motion"
// import Link from "next/link"

// export default function CoursesPage() {
//   const [activeTab, setActiveTab] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [visibleCourses, setVisibleCourses] = useState(9)
//   const [filteredCourses, setFilteredCourses] = useState<any[]>([])

//   const courses = [
//     {
//       id:"data-structures-algorithms",
//       title: "Data Structures & Algorithms",
//       description: "Master the fundamentals of DSA with practical examples",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: true,
//       isFree: true,
//       category: "Programming",
//       color: "purple",
//       youtubeLink: "https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU",
//     },
//     {
//       id:"computer-organization-architecture",
//       title: "Computer Organization & Architecture",
//       description: "Understand the inner workings of computer systems",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: true,
//       isFree: true,
//       category: "Systems",
//       color: "teal",
//       youtubeLink: "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHMonh3G6QNKq53C6oNXGrX",
//     },
//     {
//       id:"operating-system",
//       title: "Operating Systems",
//       description: "Learn about process management, memory, and file systems",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: false,
//       isFree: true,
//       category: "Systems",
//       color: "orange",
//       youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRiVhbXDGLXDk_OQAeuVcp2O",
//     },
//     {
//       id:"advanced-java-programming",
//       title: "Advanced Java Programming",
//       description: "Take your Java skills to the next level",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: false,
//       isFree: false,
//       price: "₹999",
//       category: "Programming",
//       color: "pink",
//       youtubeLink: "",
//     },
//     {
//       id:"discrete-mathematics",
//       title: "Discrete Mathematics",
//       description: "Essential mathematical concepts for computer science",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: false,
//       isFree: true,
//       category: "Mathematics",
//       color: "purple",
//       youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRhqJPDXcvYlLfXPh37L89g3",
//     },
//     {
//       id: "automata-theory",
//       title: "Automata Theory",
//       description: "Understand formal languages and computational models",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: false,
//       isFree: true,
//       category: "Theory",
//       color: "teal",
//       youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev",
//     },
//     {
//       id:"c-programming",
//       title: "C Programming",
//       description: "Learn the fundamentals of C programming language",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: false,
//       isFree: true,
//       category: "Programming",
//       color: "orange",
//       youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR",
//     },
//     {
//       id: "cpp-programming",
//       title: "C++ Programming",
//       description: "Master object-oriented programming with C++",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: false,
//       isFree: true,
//       category: "Programming",
//       color: "pink",
//       youtubeLink: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRh6isJ01MBnbNpV3ZsktSyS",
//     },
//     {
//       id:"database-management-systems",
//       title: "Database Management Systems",
//       description: "Learn SQL and database design principles",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: false,
//       isFree: false,
//       price: "₹799",
//       category: "Systems",
//       color: "purple",
//       youtubeLink: "",
//     },
//     {
//       id: "advanced-algorithms",
//       title: "Advanced Algorithms",
//       description: "Deep dive into complex algorithmic techniques",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: true,
//       isFree: false,
//       price: "₹1299",
//       category: "Programming",
//       color: "teal",
//       youtubeLink: "",
//     },
//     {
//       id: "machine-learning-fundamentals",
//       title: "Machine Learning Fundamentals",
//       description: "Introduction to ML concepts and algorithms",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: true,
//       isFree: false,
//       price: "₹1499",
//       category: "AI",
//       color: "orange",
//       youtubeLink: "",
//     },
//     {
//       id: "'web-development-bootcamp",
//       title: "Web Development Bootcamp",
//       description: "Full-stack web development with modern technologies",
//       image: "/placeholder.svg?height=200&width=350",
//       isNew: false,
//       isFree: false,
//       price: "₹1999",
//       category: "Web",
//       color: "pink",
//       youtubeLink: "",
//     },
//   ]

//   useEffect(() => {
//     filterCourses(activeTab, searchQuery)
//   }, [activeTab, searchQuery])

//   const filterCourses = (tab: string, query: string) => {
//     let filtered = courses

//     // Filter by tab
//     if (tab === "free") {
//       filtered = filtered.filter((course) => course.isFree)
//     } else if (tab === "premium") {
//       filtered = filtered.filter((course) => !course.isFree)
//     }

//     // Filter by search query
//     if (query) {
//       const lowercaseQuery = query.toLowerCase()
//       filtered = filtered.filter(
//         (course) =>
//           course.title.toLowerCase().includes(lowercaseQuery) ||
//           course.description.toLowerCase().includes(lowercaseQuery) ||
//           course.category.toLowerCase().includes(lowercaseQuery),
//       )
//     }

//     setFilteredCourses(filtered)
//   }

//   const handleTabChange = (value: string) => {
//     setActiveTab(value)
//     setVisibleCourses(9)
//   }

//   const handleLoadMore = () => {
//     setVisibleCourses((prev) => prev + 6)
//   }

//   return (
//     <div className="container py-12">
//       <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//         <Badge variant="outline" className="bg-primary/10 border-primary text-primary px-4 py-1 mb-2">
//           Our Courses
//         </Badge>
//         <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading font-kolka">
//           Explore Our Courses
//         </h1>
//         <p className="max-w-[700px] text-muted-foreground md:text-xl">
//           Comprehensive collection of courses designed for engineering students
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 mb-8">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             type="search"
//             placeholder="Search courses..."
//             className="pl-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Button variant="outline" className="flex items-center gap-2">
//           <Filter className="h-4 w-4" /> Filter
//         </Button>
//       </div>

//       <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full mb-8">
//         <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 h-auto p-1 bg-muted">
//           <TabsTrigger value="all" className="py-2">
//             All Courses
//           </TabsTrigger>
//           <TabsTrigger value="free" className="py-2">
//             Free
//           </TabsTrigger>
//           <TabsTrigger value="premium" className="py-2">
//             Premium
//           </TabsTrigger>
//         </TabsList>
//       </Tabs>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCourses.slice(0, visibleCourses).map((course, index) => (
//           <AnimatedElement key={index} animation="fade-up" delay={0.05 * index} className="h-full">
//             <Card className="bg-white overflow-hidden card-hover h-full">
//               <div className={`h-1.5 w-full bg-${course.color}`}></div>
//               <CardHeader className="p-0">
//                 <div className="relative">
//                   <Image
//                     src={course.image || "/placeholder.svg"}
//                     alt={course.title}
//                     width={350}
//                     height={200}
//                     className="object-cover w-full h-[200px]"
//                   />
//                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 to-black/60">
//                     <div className="absolute bottom-3 left-3 flex items-center gap-2">
//                       <Badge className={`bg-${course.color} hover:bg-${course.color}`}>{course.category}</Badge>
//                       {course.isNew && (
//                         <Badge variant="outline" className="bg-white/20 border-white text-white">
//                           New
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className={`p-1.5 rounded-full bg-${course.color}/10`}>
//                     <BookOpen className={`h-3.5 w-3.5 text-${course.color}`} />
//                   </div>
//                   <span className="text-xs text-muted-foreground">12 lessons • 6 hours</span>
//                 </div>
//                 <CardTitle className="text-lg">{course.title}</CardTitle>
//                 <CardDescription className="mt-2">{course.description}</CardDescription>
//               </CardContent>
//               <CardFooter className="p-4 pt-0 flex justify-between items-center">
//                 {course.isFree ? (
//                   <span className="text-sm font-medium text-green-600">Free</span>
//                 ) : (
//                   <span className="text-sm font-medium">{course.price}</span>
//                 )}
//                 {course.isFree && course.youtubeLink ? (
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="border-primary text-primary hover:bg-primary/10"
//                     asChild
//                   >
//                     <a href={course.youtubeLink} target="_blank" rel="noopener noreferrer">
//                       Watch on YouTube
//                     </a>
//                   </Button>
//                 ) : (
//                   <Link href={`/courses/enroll/${course.id}`}>
//                   <Button size="sm" className="bg-gradient-to-r from-primary to-purple-dark hover:opacity-90">
//                     {/* Comming Soon */}
//                     Enroll Now
//                   </Button>
//                   </Link>
//                 )}
//               </CardFooter>
//             </Card>
//           </AnimatedElement>
//         ))}
//       </div>

//       {visibleCourses < filteredCourses.length && (
//         <div className="flex justify-center mt-12">
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Button
//               variant="outline"
//               className="border-primary text-primary hover:bg-primary/10"
//               onClick={handleLoadMore}
//             >
//               Load More Courses
//             </Button>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AnimatedElement } from "@/components/ui/animated-element"
import { motion } from "framer-motion"
import Link from "next/link"

// Simple modal component
function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleCourses, setVisibleCourses] = useState(9)
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

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
    modules: ["Arrays", "Linked Lists", "Stacks & Queues", "Trees", "Graphs"],
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
    modules: ["Digital Logic", "CPU Organization", "Memory Hierarchy", "I/O Systems"],
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
    modules: ["Processes", "Threads", "Memory Management", "File Systems", "Scheduling"],
  },
  {
    id: "advanced-java-programming",
    title: "Advanced Java Programming",
    description: "Take your Java skills to the next level",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "₹999",
    category: "Programming",
    color: "pink",
    youtubeLink: "",
    modules: ["Generics", "Collections Framework", "Streams", "Concurrency", "JVM Internals"],
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
    modules: ["Set Theory", "Logic", "Relations & Functions", "Graph Theory", "Combinatorics"],
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
    modules: ["Finite Automata", "Regular Expressions", "Context-Free Grammars", "Pushdown Automata", "Turing Machines"],
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
    modules: ["Syntax & Data Types", "Pointers", "Arrays", "Functions", "File I/O"],
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
    modules: ["OOP Concepts", "STL", "Templates", "Exception Handling", "File I/O"],
  },
  {
    id: "database-management-systems",
    title: "Database Management Systems",
    description: "Learn SQL and database design principles",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "₹799",
    category: "Systems",
    color: "purple",
    youtubeLink: "",
    modules: ["ER Modeling", "Normalization", "SQL Queries", "Transactions", "Indexing & Optimization"],
  },
  {
    id: "advanced-algorithms",
    title: "Advanced Algorithms",
    description: "Deep dive into complex algorithmic techniques",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: false,
    price: "₹1299",
    category: "Programming",
    color: "teal",
    youtubeLink: "",
    modules: ["Greedy Algorithms", "Dynamic Programming", "Graph Algorithms", "NP-Completeness", "Approximation Algorithms"],
  },
  {
    id: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals",
    description: "Introduction to ML concepts and algorithms",
    image: "/placeholder.svg?height=200&width=350",
    isNew: true,
    isFree: false,
    price: "₹1499",
    category: "AI",
    color: "orange",
    youtubeLink: "",
    modules: ["Linear Regression", "Logistic Regression", "Decision Trees", "Clustering", "Neural Networks"],
  },
  {
    id: "web-development-bootcamp",
    title: "Web Development Bootcamp",
    description: "Full-stack web development with modern technologies",
    image: "/placeholder.svg?height=200&width=350",
    isNew: false,
    isFree: false,
    price: "₹1999",
    category: "Web",
    color: "pink",
    youtubeLink: "",
    modules: ["HTML & CSS", "JavaScript", "React", "Node.js", "Database Integration"],
  },
]


  useEffect(() => {
    filterCourses(activeTab, searchQuery)
  }, [activeTab, searchQuery])

  const filterCourses = (tab: string, query: string) => {
    let filtered = courses

    // Filter by tab
    if (tab === "free") {
      filtered = filtered.filter((course) => course.isFree)
    } else if (tab === "premium") {
      filtered = filtered.filter((course) => !course.isFree)
    }

    // Filter by search query
    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(lowercaseQuery) ||
          course.description.toLowerCase().includes(lowercaseQuery) ||
          course.category.toLowerCase().includes(lowercaseQuery),
      )
    }

    setFilteredCourses(filtered)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setVisibleCourses(9)
  }

  const handleLoadMore = () => {
    setVisibleCourses((prev) => prev + 6)
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <Badge variant="outline" className="bg-primary/10 border-primary text-primary px-4 py-1 mb-2">
          Our Courses
        </Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading font-kolka">
          Explore Our Courses
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Comprehensive collection of courses designed for engineering students
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full mb-8">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 h-auto p-1 bg-muted">
          <TabsTrigger value="all" className="py-2">
            All Courses
          </TabsTrigger>
          <TabsTrigger value="free" className="py-2">
            Free
          </TabsTrigger>
          <TabsTrigger value="premium" className="py-2">
            Premium
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.slice(0, visibleCourses).map((course, index) => (
          <AnimatedElement key={index} animation="fade-up" delay={0.05 * index} className="h-full">
            <Card className="bg-white overflow-hidden card-hover h-full">
              <div className={`h-1.5 w-full bg-${course.color}`}></div>
              <CardHeader className="p-0">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={350}
                    height={200}
                    className="object-cover w-full h-[200px]"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 to-black/60">
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <Badge className={`bg-${course.color} hover:bg-${course.color}`}>{course.category}</Badge>
                      {course.isNew && (
                        <Badge variant="outline" className="bg-white/20 border-white text-white">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-full bg-${course.color}/10`}>
                    <BookOpen className={`h-3.5 w-3.5 text-${course.color}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">12 lessons • 6 hours</span>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="mt-2">{course.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                {course.isFree ? (
                  <span className="text-sm font-medium text-green-600">Free</span>
                ) : (
                  <span className="text-sm font-medium">{course.price}</span>
                )}
                {/* {course.isFree && course.youtubeLink ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href={course.youtubeLink} target="_blank" rel="noopener noreferrer">
                      Watch now
                    </a>
                  </Button> */}
                  {course.isFree && course.youtubeLink ? (
  <Link href={`/courses/${course.id}`}>
    <Button
      variant="outline"
      size="sm"
      className="border-primary text-primary hover:bg-primary/10"
    >
      Watch now
    </Button>
  </Link>
                ) : (
                  <Link href={`/courses/enroll/${course.id}`}>
                    <Button size="sm" className="bg-gradient-to-r from-primary to-purple-dark hover:opacity-90">
                      Enroll Now
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          </AnimatedElement>
        ))}
      </div>

      {/* Load More */}
      {visibleCourses < filteredCourses.length && (
        <div className="flex justify-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={handleLoadMore}
            >
              Load More Courses
            </Button>
          </motion.div>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={!!selectedCourse} onClose={() => setSelectedCourse(null)}>
        {selectedCourse && (
          <>
            <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
            <p className="mt-2">{selectedCourse.description}</p>
            <h3 className="mt-4 font-semibold">Modules / Topics:</h3>
            <ul className="list-disc pl-5 mt-2">
              {selectedCourse.modules?.map((mod: string, idx: number) => (
                <li key={idx}>{mod}</li>
              ))}
            </ul>

            {selectedCourse.isFree && selectedCourse.youtubeLink ? (
              <Button asChild className="mt-4">
                <a href={selectedCourse.youtubeLink} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
              </Button>
            ) : (
              <Link href={`/courses/enroll/${selectedCourse.id}`}>
                <Button className="mt-4">Enroll Now</Button>
              </Link>
            )}
          </>
        )}
      </Modal>
    </div>
  )
}
