"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Services data array with corresponding colors and icons
 * Note: Images should be placed in /public/images/services/ folder
 */
const servicesData = [
  {
    id: 1,
    title: "Comprehensive Curriculum",
    description: "Stay ahead of the curve with our up-to-date curriculum.",
    iconPath: "/images/services/comprehensiveCurriculum.png",
    borderColor: "border-l-blue-500",
    hoverBorderColor: "#3b82f6", // blue-500
    shadowColor: "rgba(59, 130, 246, 0.5)" // blue-500 with opacity
  },
  {
    id: 2,
    title: "Qualified Experts",
    description: "Learn from seasoned professionals with real-world experience.",
    iconPath: "/images/services/qualifiedExperts.png",
    borderColor: "border-l-purple-500",
    hoverBorderColor: "#a855f7", // purple-500
    shadowColor: "rgba(168, 85, 247, 0.5)" // purple-500 with opacity
  },
  {
    id: 3,
    title: "Pre-Sessions",
    description: "Build foundational knowledge with our comprehensive pre-sessions.",
    iconPath: "/images/services/preSessions.png",
    borderColor: "border-l-green-500",
    hoverBorderColor: "#22c55e", // green-500
    shadowColor: "rgba(34, 197, 94, 0.5)" // green-500 with opacity
  },
  {
    id: 4,
    title: "Startup Ecosystem",
    description: "Be part of a vibrant startup ecosystem that nurtures innovation.",
    iconPath: "/images/services/startupEnvironment.png",
    borderColor: "border-l-orange-500",
    hoverBorderColor: "#f97316", // orange-500
    shadowColor: "rgba(249, 115, 22, 0.5)" // orange-500 with opacity
  },
  {
    id: 5,
    title: "Innovation Protection",
    description: "Protect your intellectual property with our comprehensive patent services.",
    iconPath: "/images/services/innovationProtection.png",
    borderColor: "border-l-red-500",
    hoverBorderColor: "#ef4444", // red-500
    shadowColor: "rgba(239, 68, 68, 0.5)" // red-500 with opacity
  }
];

/**
 * Animation variants for service cards
 */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/**
 * Service Card component with enhanced hover animations
 * Features:
 * - Thicker left color bar (8px)
 * - Card scale effect on hover (1.05x)
 * - Prominent colored shadow on hover
 * - Colored outline effect on hover
 */
function ServiceCard({ service, index }: { service: typeof servicesData[0], index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      {/* Card with hover effects */}
      <motion.div
        className={`h-full overflow-hidden group relative rounded-lg cursor-pointer
                  border border-gray-200 bg-white
                  ${service.borderColor} border-l-[8px]
                  transition-all duration-300 ease-out`}
        initial={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
        whileHover={{
          scale: 1.05,
          boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2),
                      0 10px 10px -5px ${service.shadowColor},
                      0 0 0 2px ${service.hoverBorderColor}`,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        {/* Card content container */}
        <div className="p-6">
          {/* Service icon with hover animation */}
          <motion.div
            className="w-20 h-20 mb-4 relative flex justify-center items-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Image
              src={service.iconPath}
              alt={service.title}
              width={80}
              height={80}
              className="object-contain"
            />
          </motion.div>

          {/* Service title */}
          <h3 className="font-serif text-xl font-bold mb-2">{service.title}</h3>

          {/* Service description */}
          <p className="text-muted-foreground font-light">{service.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Services page component
 * @returns Services page JSX
 */
export default function ServicesPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            We offer a comprehensive range of educational services tailored to meet the needs of individuals and organizations.
          </p>
        </motion.div>

        {/* First row - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.slice(0, 3).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Second row - 2 cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {servicesData.slice(3, 5).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index + 3} />
          ))}
        </div>

        {/* Note about adding icons */}
        <div className="text-center text-sm text-muted-foreground mt-8 p-4 border border-dashed rounded-md max-w-md mx-auto hidden">
          <p>Note: Please upload service icons to the /public/images/services/ folder with the following names:</p>
          <ul className="mt-2 list-disc list-inside">
            <li>comprehensiveCurriculum.png</li>
            <li>qualifiedExperts.png</li>
            <li>preSessions.png</li>
            <li>startupEnvironment.png</li>
            <li>innovationProtection.png</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
