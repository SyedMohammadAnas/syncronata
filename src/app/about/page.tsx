import { type Metadata } from "next";
import Image from "next/image";

/**
 * Team member data for leadership cards
 */
const teamMembers = [
  {
    name: "Raju Mithra Kantheti",
    role: "Founder & CEO",
    image: "/about/founder.jpg",
    linkedin: "https://www.linkedin.com/in/raju-mithra-kantheti-22342520b//",
    bio: "Visionary leader with experience in AI and machine learning. Former Amazon engineer passionate about bridging education and technology."
  },
  {
    name: "Bhaskar Reddy Mukkamalla",
    role: "Chief Technology Officer",
    image: "/about/cto.jpg",
    linkedin: "https://www.linkedin.com/in/mukkamalla-bhaskar-reddy-b66a372b8/",
    bio: "Technology expert with deep expertise in software architecture and emerging technologies. Driving innovation at Syncronata."
  }
];

/**
 * About page metadata
 */
export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Syncronata and our mission to transform education",
};

/**
 * Team member card component
 * @param props Team member properties
 * @returns Team member card JSX
 */
function TeamMemberCard({
  name,
  role,
  image,
  linkedin,
  bio
}: {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  bio: string;
}) {
  return (
    <div className="relative flex flex-col rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="relative w-full h-80">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="p-6 space-y-3 flex-grow">
        <h3 className="font-serif text-2xl font-bold">{name}</h3>
        <p className="text-primary font-semibold">{role}</p>
        <p className="text-muted-foreground">{bio}</p>
      </div>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
        aria-label={`${name}'s LinkedIn profile`}
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  );
}

/**
 * About page component
 * @returns About page JSX
 */
export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Leadership Team Section */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Our Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the visionaries behind Syncronata who are dedicated to transforming the educational landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Syncronata</h1>
            <p className="text-xl text-muted-foreground">
              We are on a mission to transform the education landscape through innovative technology and expert-led courses.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2020, Syncronata emerged from a vision to bridge the gap between traditional education and the rapidly evolving demands of today&apos;s workforce.
              Our founders, experienced educators and industry professionals, recognized the need for a more dynamic, accessible, and effective approach to learning.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              At Syncronata, we believe that quality education should be accessible to everyone. Our mission is to empower individuals with the knowledge and skills needed to thrive in an ever-changing world through innovative learning solutions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Values</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Excellence in all we do</li>
              <li>Innovation that drives progress</li>
              <li>Inclusivity and accessibility</li>
              <li>Continuous improvement and learning</li>
              <li>Integrity and transparency</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
