"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle,
  Loader2,
  Gift,
  CreditCard,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface Course {
  id: string
  title: string
  description: string
//   duration: string
  price: number
//   originalPrice: number
//   features: string[]
//   highlights: string[]
  isFree: boolean
  youtubeLink?: string
}

export default function CourseEnrollmentPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [courseLoading, setCourseLoading] = useState(true)
  const [course, setCourse] = useState<Course | null>(null)
  const [referralCodeValid, setReferralCodeValid] = useState<boolean | null>(null)
  const [checkingReferral, setCheckingReferral] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    linkedin: "",
    city: "",
    state: "",
    education: "",
    experience: "",
    motivation: "",
    referralCode: "",
    agreeTerms: false,
    agreeMarketing: false,
  })

  useEffect(() => {
    fetchCourse()
  }, [params.courseId])

  const fetchCourse = async () => {
    try {
      setCourseLoading(true)
      const response = await fetch(`/api/courses/${params.courseId}`)
      const result = await response.json()

      if (result.success) {
        setCourse(result.data as Course)
      } else {
        toast({
          title: "Error",
          description: result.error || "Course not found",
          variant: "destructive",
        })
        // router.push("/courses")
      }
    } catch (error) {
      console.error("Error fetching course:", error)
      toast({
        title: "Error",
        description: "Failed to load course details",
        variant: "destructive",
      })
      router.push("/courses")
    } finally {
      setCourseLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (field === "referralCode") {
      setReferralCodeValid(null)
    }
  }

  const validateReferralCode = async (code: string) => {
    if (!code.trim()) {
      setReferralCodeValid(null)
      return
    }
    setCheckingReferral(true)
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const validCodes = [
        "FRIEND99",
        "STUDENT50",
        "WELCOME25",
        "REFER100",
        "SAVE15",
        "NEWUSER",
        "DISCOUNT20",
        "SPECIAL30",
      ]

      const isValid = validCodes.includes(code.toUpperCase())
      setReferralCodeValid(isValid)

      if (isValid) {
        toast({
          title: "✅ Valid Referral Code!",
          description: "You'll receive a special discount.",
        })
      } else {
        toast({
          title: "❌ Invalid Referral Code",
          description: "The referral code is not valid or expired.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error validating referral:", error)
      setReferralCodeValid(false)
    } finally {
      setCheckingReferral(false)
    }
  }

  const handleReferralCodeBlur = () => {
    if (formData.referralCode.trim()) {
      validateReferralCode(formData.referralCode.trim())
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!course) return
    setIsLoading(true)

    try {
      const enrollmentData = {
        ...formData,
        courseId: params.courseId as string,
        referralCodeValid,
      }

    //   const response = await fetch("/api/courses/contact", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(enrollmentData),
    //   })
    const response = await fetch("/api/courses/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
})


      const result = await response.json()

      if (result.success) {
        toast({
          title: "Enrollment Successful!",
          description:
            "You will receive a confirmation email soon.",
        })
        setTimeout(() => {
          router.push(`/courses/payment/${course.id}`)
        }, 100)
      } else {
        toast({
          title: "Enrollment Failed",
          description: result.error || "Failed to submit enrollment",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid =
    !!formData.firstName &&
    !!formData.lastName &&
    !!formData.email &&
    !!formData.phone &&
    !!formData.city &&
    !!formData.state &&
    !!formData.education &&
    !!formData.experience &&
    formData.agreeTerms

  const getDiscountedPrice = () => {
    if (referralCodeValid && course) {
      const discount = 0.1 // 10%
      return Math.round(course.price * (1 - discount))
    }
    return course?.price || 0
  }

  const getDiscountAmount = () => {
    if (referralCodeValid && course) {
      const discount = 0.1
      return Math.round(course.price * discount)
    }
    return 0
  }

  if (courseLoading) {
    return (
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading course details …</p>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container py-8 max-w-4xl">
        <div className="text-center">
          <p className="text-red-500 mb-4">Course not found</p>
          <Link href="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/courses"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>
        <h1 className="text-3xl font-bold">Enroll in {course.title}</h1>
        <p className="text-muted-foreground mt-2">
          Complete your enrollment to start with {course.title}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Please fill your details for enrollment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          handleInputChange("whatsapp", e.target.value)
                        }
                        placeholder="Same as phone if none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) =>
                        handleInputChange("linkedin", e.target.value)
                      }
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Background */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="education">Highest Education *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("education", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="bachelors">Bachelor's</SelectItem>
                        <SelectItem value="masters">Master's</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Work Experience *</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("experience", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher (0 yrs)</SelectItem>
                        <SelectItem value="1-2">1-2 yrs</SelectItem>
                        <SelectItem value="3-5">3-5 yrs</SelectItem>
                        <SelectItem value="5+">5+ yrs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="motivation">Why do you want this course?</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) =>
                        handleInputChange("motivation", e.target.value)
                      }
                      placeholder="Tell us your goals"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Referral Code */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Referral Code (Optional)</h3>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Gift className="h-5 w-5 text-purple-600" />
                      <h4 className="font-medium text-purple-900">Have a referral code?</h4>
                    </div>
                    <p className="text-sm text-purple-700 mb-4">
                      Enter it below for an instant discount.
                    </p>
                    <div className="relative">
                      <Input
                        id="referralCode"
                        value={formData.referralCode}
                        onChange={(e) =>
                          handleInputChange("referralCode", e.target.value.toUpperCase())
                        }
                        onBlur={handleReferralCodeBlur}
                        placeholder="Enter referral code"
                        className={`pr-10 ${
                          referralCodeValid === true
                            ? "border-green-500 bg-green-50"
                            : referralCodeValid === false
                            ? "border-red-500 bg-red-50"
                            : ""
                        }`}
                        disabled={checkingReferral}
                      />
                      {checkingReferral && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                        </div>
                      )}
                      {referralCodeValid === true && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                      {referralCodeValid === false && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
                            <span className="text-white text-xs">✕</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {referralCodeValid === true && (
                      <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            🎉 Referral code applied! You save ₹
                            {getDiscountAmount().toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                    {referralCodeValid === false && (
                      <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-red-700">
                            ❌ Invalid referral code. Try again.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Terms & Marketing */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeTerms", checked as boolean)
                      }
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      *
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeMarketing}
                      onCheckedChange={(checked) =>
                        handleInputChange("agreeMarketing", checked as boolean)
                      }
                    />
                    <Label htmlFor="marketing" className="text-sm leading-relaxed">
                      I agree to receive marketing communications
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>

                      Submit Enrollment
                      <CreditCard className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Course Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              {/* <CardDescription>{course.duration} • Complete Course</CardDescription> */}
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                {referralCodeValid && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        Referral Discount Applied!
                      </span>
                    </div>
                    <div className="text-sm text-green-700">
                      <div className="flex justify-between">
                        <span>Original Price:</span>
                        <span className="line-through">
                          ₹{course.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Discount:</span>
                        <span>-₹{getDiscountAmount().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-2xl font-bold ${
                      referralCodeValid ? "text-green-600" : ""
                    }`}
                  >
                    ₹{getDiscountedPrice().toLocaleString()}
                  </span>
                  {/* <Badge variant="secondary">
                    Save{" "}
                    {Math.round(
                      ((course.originalPrice - getDiscountedPrice()) /
                        course.originalPrice) *
                        100,
                    )}
                    %
                  </Badge> */}
                </div>
                {!referralCodeValid && (
                  <p className="text-sm text-muted-foreground line-through">
                    {/* Original Price: ₹{course.originalPrice.toLocaleString()} */}
                  </p>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">What's Included:</h4>
                {/* <div className="space-y-2">
                  {course.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div> */}
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">
                  Technologies You’ll Learn:
                </h4>
                {/* <div className="flex flex-wrap gap-2">
                  {course.features.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div> */}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2 flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Referral Benefits
                </h4>
                <p className="text-sm text-purple-700 mb-2">
                  Enter a referral code to get instant benefits!
                </p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>• 10% instant discount</li>
                  <li>• Priority support</li>
                  <li>• Exclusive community access</li>
                  <li>• Faster enrollment processing</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Questions about the course? Our team is here.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
