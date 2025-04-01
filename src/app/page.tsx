"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * Newsletter subscription form component
 * @returns Newsletter subscription form JSX
 */
function NewsletterForm() {
  // Form state
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  /**
   * Handle form submission
   * @param e Form submit event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset status
    setStatus('loading');
    setMessage('');

    try {
      // Send request to API
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail(''); // Clear form
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again later.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-center space-y-4">
      <h2 className="text-2xl font-serif font-bold tracking-tight md:text-3xl">Stay Updated with Our Newsletter</h2>
      <p className="text-muted-foreground">
        Subscribe to receive the latest updates on new courses, tech trends, and exclusive learning resources.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <div className="flex-1 min-w-0">
          <label htmlFor="email-subscription" className="sr-only">Email address</label>
          <input
            type="email"
            id="email-subscription"
            placeholder="Your email address"
            className="w-full h-12 px-6 py-3 rounded-l-full sm:rounded-r-none rounded-r-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
          />
        </div>
        <Button
          type="submit"
          className="h-12 rounded-l-full sm:rounded-l-none rounded-r-full whitespace-nowrap px-6 font-medium"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>

      {status === 'success' && (
        <p className="text-sm text-green-600 mt-2">
          {message}
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600 mt-2">
          {message}
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
      </p>
    </div>
  );
}

/**
 * Home page component
 * @returns Home page JSX
 */
export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section className="w-full py-16 md:py-28 lg:py-36 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Your Career with <span className="italic">Industry-Driven</span> Training

            </h1>
            <p className="max-w-[700px] text-lg text-primary-foreground/90 md:text-xl font-light leading-relaxed">
              Discover our cutting-edge courses and services designed to elevate your learning experience and transform your career potential.
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row mt-4">
              <Button variant="secondary" asChild size="lg" className="font-medium rounded-full px-8">
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button variant="outline" className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-medium rounded-full px-8" asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">Why Choose Syncronata</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-light">
              Our commitment to excellence and innovation sets us apart in the educational landscape.
            </p>
          </div>
          <div className="grid gap-8 px-4 md:px-6 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-3 text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                  <path d="M10 2c1 .5 2 2 2 5" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold">Quality Education</h3>
              <p className="text-muted-foreground">
                Our courses are meticulously crafted by industry experts with years of practical experience.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold">Innovative Approach</h3>
              <p className="text-muted-foreground">
                We leverage cutting-edge technologies and methodologies to create engaging and effective learning experiences.
              </p>
            </div>
            <div className="space-y-3 text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold">Career Support</h3>
              <p className="text-muted-foreground">
                Our dedicated team provides comprehensive guidance and resources to help you advance your career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial section */}
      <section className="w-full py-16 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">What Our Students Say</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto font-light">
              Hear from our community of learners who have transformed their careers through our programs.
            </p>
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="italic text-xl md:text-2xl font-serif text-foreground/80">
              &ldquo;Syncronata&apos;s courses completely transformed my approach to learning. The instructors are top-notch and the curriculum is designed with real-world applications in mind.&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-medium">Maria Rodriguez</p>
              <p className="text-sm text-muted-foreground">Data Science Graduate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-muted py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight md:text-4xl">Ready to start your learning journey?</h2>
            <p className="mt-4 max-w-[700px] text-lg text-muted-foreground font-light">
              Join thousands of students who are already benefiting from our courses and transforming their careers.
            </p>
            <Button className="mt-8 rounded-full px-8" size="lg" asChild>
              <Link href="/courses">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter subscription section */}
      <section className="w-full py-16 md:py-20 bg-primary/5">
        <div className="container px-4 md:px-6">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
