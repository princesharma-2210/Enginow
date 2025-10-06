// "use client"

import { AnimatedElement } from "@/components/ui/animated-element"
import { PageTransition } from "@/components/ui/page-transition"

export const metadata = {
  title: "Refund Policy | Enginow",
  description: "Refund Policy for Enginow - Learn Fast, Understand Better",
}

export default function RefundPolicy() {
  return (
    <PageTransition>
      <div className="container max-w-4xl py-12 md:py-16">
        <AnimatedElement animation="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 gradient-text-primary">
            Refund Policy
          </h1>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1}>
          <div className="prose prose-lg max-w-none">
            <p>
              <strong>Last Updated: {new Date().toLocaleDateString()}</strong>
            </p>

            <h2>Introduction</h2>
            <p>
              At Enginow, we are committed to providing quality educational content. 
              If you are not satisfied with your purchase, please review our refund policy below.
            </p>

            <h2>Eligibility for Refunds</h2>
            <p>Refunds are applicable under the following conditions:</p>
            <ul>
              <li>Refund requests must be made within 7 days of purchase.</li>
              <li>The course or content has not been fully accessed or completed.</li>
              <li>Proof of purchase (receipt or invoice) must be provided.</li>
            </ul>

            <h2>Non-Refundable Items</h2>
            <p>The following are not eligible for a refund:</p>
            <ul>
              <li>Gift cards, promotional credits, or discounts.</li>
              <li>Courses that have been fully accessed or completed.</li>
              <li>Any digital content that has been downloaded or consumed.</li>
            </ul>

            <h2>Refund Process</h2>
            <p>
              To request a refund, please contact our support team at <strong>care@enginow.in</strong> with your purchase details.
              Our team will review your request and notify you of the approval or rejection within 5 business days.
            </p>

            <h2>Processing Refunds</h2>
            <p>
              Approved refunds will be processed using the original payment method. Depending on your bank or payment provider, 
              it may take 5–10 business days for the refund to reflect in your account.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions regarding this Refund Policy, please contact us at:
            </p>
            <p>
              Email: care@enginow.in
              <br />
              Address: 123 Tech Park, Sector 62, Noida, Uttar Pradesh 201301
            </p>
          </div>
        </AnimatedElement>
      </div>
    </PageTransition>
  )
}
