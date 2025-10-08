import Image from "next/image"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Instagram, Linkedin } from "lucide-react"

export default function AboutPage() {
  const founder = {
    name: "Ankush Singh Bhadauriya",
    role: "Founder & CEO",
    bio: "Ankush is an IT graduate from PSIT, Kanpur with 1+ years of experience in the tech industry. He founded Enginow with a mission to make technical education accessible and easy to understand for all engineering students.",
    image: "/founder.jpg?height=300&width=300",
    social: {
      instagram: "#",
      linkedin: "#",
    },
  }

  const cofounder = {
    name: "Akshat Gupta",
    role: "Co-Founder",
    bio: "Akshat graduated from a renowned college in Kanpur and has extensive knowledge of DSA and other coding languages.",
    image: "/co-founder.jpg?height=300&width=300",
    social: {
      instagram: "#",
      linkedin: "#",
    },
  }

  const faqs = [
    {
      question: "What is Enginow?",
      answer: "Enginow is a platform dedicated to simplifying technical education for engineering students with comprehensive courses, notes, and resources.",
    },
    {
      question: "What services do they offer?",
      answer: "We offer online courses, concept notes, practice problems, and guidance to help students excel in technical subjects.",
    },
    {
      question: "How can I join the team?",
      answer: "You can join Enginow by applying through our Careers page or reaching out to us via the contact form on our website.",
    },
  ]

  return (
    <div className="container py-12">
      {/* About Company */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-kolka">About Us❤️</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Our mission is to simplify technical education for engineering students
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Enginow was founded in 2025 with a simple mission: to make complex technical and non-technical subjects accessible 
            and easy to understand for all engineering students.
          </p>
          <p className="text-muted-foreground mb-4">
            Having experienced the challenges of technical education firsthand, our founder recognized the need for clear, 
            concise, and practical learning resources that bridge the gap between theoretical knowledge and practical application.
          </p>
          <p className="text-muted-foreground">
            Today, we serve hundreds of students across India, helping them excel through our comprehensive courses, concept notes, and learning resources.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/Enginow White.png?height=400&width=500"
            alt="About Enginow"
            width={500}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Founder */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Founder</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-3xl mx-auto">
          <div className="flex-shrink-0">
            <Image
              src={founder.image || "/founder.jpg"}
              alt={founder.name}
              width={300}
              height={300}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{founder.name}</h3>
            <p className="text-primary mb-2">{founder.role}</p>
            <div className="flex space-x-3 mb-4">
              <a
                href={founder.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
                aria-label={`${founder.name}'s Instagram`}
              >
                <Instagram size={20} />
              </a>
              <a
                href={founder.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label={`${founder.name}'s LinkedIn`}
              >
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-muted-foreground">{founder.bio}</p>
          </div>
        </div>
      </div>

      {/* Co-Founder */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Co-Founder</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-3xl mx-auto">
          <div className="flex-shrink-0">
            <Image
              src={cofounder.image || "/co-founder.jpg"}
              alt={cofounder.name}
              width={300}
              height={300}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{cofounder.name}</h3>
            <p className="text-primary mb-2">{cofounder.role}</p>
            <div className="flex space-x-3 mb-4">
              <a
                href={cofounder.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 transition-colors"
                aria-label={`${cofounder.name}'s Instagram`}
              >
                <Instagram size={20} />
              </a>
              <a
                href={cofounder.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transition-colors"
                aria-label={`${cofounder.name}'s LinkedIn`}
              >
                <Linkedin size={20} />
              </a>
            </div>
            <p className="text-muted-foreground">{cofounder.bio}</p>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">FAQs</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
