"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Pass job data from JobsPage or mock here
const JOBS = [
  {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹12-18 LPA",
      experience: "3-5 years",
      skills: ["React", "Node.js", "MongoDB", "AWS"],
      description: "Join our dynamic team to build scalable web applications using modern technologies.",
      posted: "2 days ago",
      applicants: 45,
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹15-22 LPA",
      experience: "2-4 years",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      description: "Analyze complex datasets and build predictive models to drive business insights.",
      posted: "1 week ago",
      applicants: 32,
    },
    {
      id: 3,
      title: "Frontend Developer Intern",
      company: "StartupXYZ",
      location: "Remote",
      type: "Internship",
      salary: "₹15,000/month",
      experience: "0-1 years",
      skills: ["React", "JavaScript", "CSS", "Git"],
      description: "Great opportunity for fresh graduates to work on exciting projects.",
      posted: "3 days ago",
      applicants: 78,
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Inc",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹10-16 LPA",
      experience: "2-4 years",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
      description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
      posted: "5 days ago",
      applicants: 23,
    },
    {
      id: 5,
      title: "Mobile App Developer",
      company: "AppMakers Ltd",
      location: "Pune, India",
      type: "Full-time",
      salary: "₹8-14 LPA",
      experience: "1-3 years",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      description: "Develop cross-platform mobile applications for our growing user base.",
      posted: "1 week ago",
      applicants: 56,
    },
]

export default function JobDetail({ params }: { params: { jobId: string } }) {
  const router = useRouter()
  const job = JOBS.find((j) => j.id === parseInt(params.jobId))
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null as File | null,
    agreeTerms: false,
  })
  const [submitting, setSubmitting] = useState(false)

  if (!job) return <p className="text-center py-12">Job not found</p>

  const handleChange = (field: string, value: string | File | boolean | null) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!formData.name || !formData.email || !formData.phone || !formData.resume || !formData.agreeTerms) {
    alert("Please fill all required fields")
    return
  }

  setSubmitting(true)
  try {
    const data = new FormData()
    data.append("jobTitle", job.title)
    data.append("name", formData.name)
    data.append("email", formData.email)
    data.append("phone", formData.phone)
    data.append("resume", formData.resume)

    const res = await fetch("/api/jobs/apply", { method: "POST", body: data })
    const result = await res.json()
    if (result.success) {
      alert(result.message)
      setFormData({ name: "", email: "", phone: "", resume: null, agreeTerms: false })
      router.push('/jobs')
    } else {
      alert(result.error)
    }
  } catch (err) {
    alert("Error submitting application")
  } finally {
    setSubmitting(false)
  }
}

  return (
    <div className="container py-12 grid md:grid-cols-2 gap-8">
      {/* Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>Apply for {job.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="resume">Resume *</Label>
              <Input type="file" id="resume" onChange={(e) => handleChange("resume", e.target.files?.[0] || null)} required />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.agreeTerms} onCheckedChange={(checked) => handleChange("agreeTerms", checked as boolean)} />
              <Label>I agree to terms *</Label>
            </div>
            <Button type="submit" disabled={submitting} className="w-full">{submitting ? "Submitting..." : "Submit Application"}</Button>
          </form>
        </CardContent>
      </Card>

      {/* Job Details */}
      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          <p className="text-muted-foreground">{job.company}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>{job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Type:</strong> {job.type}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Experience:</strong> {job.experience}</p>
          <p><strong>Skills:</strong> {job.skills.map(skill => <Badge key={skill} className="mr-1">{skill}</Badge>)}</p>
          <p className="text-sm text-muted-foreground">Posted {job.posted}</p>
        </CardContent>
      </Card>
    </div>
  )
}