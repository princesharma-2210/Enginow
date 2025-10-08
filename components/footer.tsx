"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube, BookOpen, ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedElement } from "@/components/ui/animated-element";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 1000);
      } else alert(data.error || "Something went wrong");
    } catch (err) {
      console.error(err);
      alert("Failed to subscribe. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-gradient-mesh border-t border-white/20">
      <div className="container py-12 md:py-16">
        {/* Newsletter */}
        <AnimatedElement animation="fade-up" className="mb-16 p-6 md:p-8 glass-card rounded-2xl border border-white/20 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold gradient-text-primary mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-0">Subscribe to our newsletter for the latest updates, resources, and special offers.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/50 border-white/30 rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || isSubmitted}
                required
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="gradient-button text-white rounded-full shadow-md" disabled={isSubmitting || isSubmitted}>
                  {isSubmitting ? "Subscribing..." : isSubmitted ? "Subscribed!" : <span className="flex items-center">Subscribe <ArrowRight className="h-4 w-4 ml-2" /></span>}
                </Button>
              </motion.div>
            </form>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-12">
          {/* Company Info */}
          <AnimatedElement animation="fade-right" delay={0.1} className="md:col-span-2 lg:col-span-4">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-1.5 shadow-sm"><BookOpen className="h-6 w-6 text-primary" /></div>
              <div className="ml-2">
                <span className="block text-xl font-bold text-black font-kolka">Enginow</span>
                <span className="text-xs" style={{ color: "#9A2FC4" }}>Learn Fast, Understand Better</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">Comprehensive learning resources for engineering students and learners of Computer Science/IT-related subjects.</p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start"><MapPin className="h-5 w-5 mr-3 text-primary" /><p className="text-sm text-muted-foreground">Noida, <br /> Uttar Pradesh 201301</p></div>
              <div className="flex items-center"><Phone className="h-5 w-5 mr-3 text-primary" /><p className="text-sm text-muted-foreground">+91 89350 69570</p></div>
              <div className="flex items-center"><Mail className="h-5 w-5 mr-3 text-primary" /><p className="text-sm text-muted-foreground">care@enginow.in</p></div>
            </div>
            <div className="flex gap-3">
              {[{ icon: Linkedin, href: "https://www.linkedin.com/company/enginow" },
                { icon: Instagram, href: "https://www.instagram.com/enginow.in" },
                { icon: Youtube, href: "https://youtube.com/@enginow" },
                { icon: Facebook, href: "https://www.facebook.com/enginow.in/" }].map((item, i) => (
                <Link key={i} href={item.href} className="text-muted-foreground hover:text-primary transition-colors bg-white/50 backdrop-blur-sm p-2 rounded-full border border-white/20 hover:border-primary/20 hover:shadow-sm">
                  <item.icon className="h-5 w-5" /><span className="sr-only">{item.icon.name}</span>
                </Link>
              ))}
            </div>
          </AnimatedElement>

          {/* Quick Links */}
          <AnimatedElement animation="fade-up" delay={0.2} className="md:col-span-1 lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold gradient-text-primary">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {[{ name: "Courses", href: "/courses" }, { name: "Learn", href: "/learn" }, { name: "Blog", href: "/blog" }].map((link, i) => (
                <li key={i}><Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" /> {link.name}</Link></li>
              ))}
            </ul>
          </AnimatedElement>

          {/* Company Links */}
          <AnimatedElement animation="fade-up" delay={0.3} className="md:col-span-1 lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold gradient-text-secondary">Company</h3>
            <ul className="space-y-3 text-sm">
              {[{ name: "About Us", href: "/about" }, { name: "Contact", href: "/contact" }, { name: "Jobs & Internships", href: "/jobs" }].map((link, i) => (
                <li key={i}><Link href={link.href} className="text-muted-foreground hover:text-secondary transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" /> {link.name}</Link></li>
              ))}
            </ul>
          </AnimatedElement>

          {/* Resources */}
          <AnimatedElement animation="fade-left" delay={0.4} className="md:col-span-2 lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold gradient-text-accent">Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[{ title: "DSA Cheat Sheet", desc: "Algorithms and data structures reference", href: "/learn" },
                { title: "OS Notes", desc: "Operating systems concepts explained", href: "/learn" },
                { title: "DBMS Tutorial", desc: "Database management fundamentals", href: "/learn" },
                { title: "Coding Practice", desc: "Programming exercises and solutions", href: "/learn" }].map((resource, i) => (
                <Link key={i} href={resource.href} className="p-3 glass-card rounded-lg border border-white/20 hover:border-accent/20 hover:shadow-sm transition-all block">
                  <h4 className="text-sm font-medium">{resource.title}</h4>
                  <p className="text-xs text-muted-foreground">{resource.desc}</p>
                </Link>
              ))}
            </div>
          </AnimatedElement>

          {/* Footer Bottom */}
          <AnimatedElement animation="fade-up" delay={0.6} className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Enginow. All rights reserved.</p>
            <div className="flex gap-6 text-xs font-bold">
              {[{ name: "Privacy Policy", href: "/privacy" }, { name: "Terms of Service", href: "/terms" }, { name: "Cookie Policy", href: "/cookies" }, { name: "Refund Policy", href: "/refundpolicy" }].map((link, i) => (
                <Link key={i} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.name}</Link>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </div>
    </footer>
  );
}
