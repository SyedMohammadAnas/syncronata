"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import supabase from "@/lib/supabase";

/**
 * Form data interface for contact form
 */
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Error interface from Supabase
 */
interface SupabaseError {
  message: string;
  [key: string]: any;
}

/**
 * Initial empty form state
 */
const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

/**
 * Contact form component that submits data to Supabase
 * @returns Contact form with validation and submission handling
 */
export default function ContactForm() {
  // Form state management
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  /**
   * Handle form input changes
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns True if email is valid
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handle form submission
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    // Basic validation
    if (!formData.name.trim()) {
      setFormError("Please enter your name.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.trim()) {
      setFormError("Please enter your email address.");
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setFormError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim()) {
      setFormError("Please enter a message.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if Supabase client is properly initialized
      if (!supabase) {
        throw new Error("Database connection not available. Please try again later.");
      }

      // Submit data to Supabase user_queries table
      const { error } = await supabase.from("user_queries").insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || null, // Allow empty phone
          message: formData.message.trim(),
        },
      ]);

      if (error) throw error;

      // Clear form and show success message
      setFormSuccess("Thank you for your message! We'll get back to you soon.");
      setFormData(initialFormData);
    } catch (error: SupabaseError | Error | unknown) {
      console.error("Error submitting form:", error);
      let errorMessage = "Failed to submit the form. Please try again later.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = (error as { message: string }).message;
      }

      setFormError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success message */}
      {formSuccess && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md">
          {formSuccess}
        </div>
      )}

      {/* Error message */}
      {formError && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          {formError}
        </div>
      )}

      {/* Name field */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
        />
      </div>

      {/* Phone field (optional) */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (123) 456-7890"
        />
      </div>

      {/* Message field */}
      <div className="space-y-2">
        <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please provide details about your inquiry..."
          rows={5}
          required
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        className="w-full rounded-full"
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {/* Privacy policy note */}
      <p className="text-xs text-muted-foreground text-center mt-4">
        By submitting this form, you agree to our{" "}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
