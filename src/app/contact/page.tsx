import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

/**
 * Metadata for the Contact page
 */
export const metadata: Metadata = {
  title: 'Contact Us | Syncronata',
  description: 'Get in touch with Syncronata for any inquiries about our courses and services.',
};

/**
 * Contact page component
 * @returns Contact page with form and company information
 */
export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed">
            Have questions about our courses or services? Need more information?
            Fill out the form and our team will get back to you as soon as possible.
          </p>

          <div className="space-y-6">
            {/* Office address */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Our Office</h3>
              <address className="not-italic text-muted-foreground font-light">
                Syncronota Technologies Pvt. Ltd<br />
                Pattabhipuram, Guntur,AP<br />
                522006
              </address>
            </div>

            {/* Contact information */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Contact Information</h3>
              <div className="space-y-2 text-muted-foreground font-light">
                <p>Email: <a href="mailto:info@syncronata.com" className="text-primary hover:underline">info@syncronata.com</a></p>
                <p>Phone: <a href="tel:(0421) 431 2030" className="hover:underline">(0421) 431 2030</a>
                            <a href="tel:+91 9989033446" className="hover:underline">, +91 9989033446</a></p>
              </div>
            </div>

            {/* Business hours */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-2">Business Hours</h3>
              <div className="space-y-1 text-muted-foreground font-light">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-card rounded-lg border-2 border-gray-300 shadow-md p-6 md:p-8">
          <h2 className="font-serif text-2xl font-bold mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
