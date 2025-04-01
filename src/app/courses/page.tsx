"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

/**
 * Courses data array with corresponding colors and images
 * Images are placed in /public/images/courses/ folder
 */
const coursesData = [
  {
    id: 1,
    title: "Full Stack Development",
    description: "Building robust and scalable web applications",
    imagePath: "/images/courses/full-stack.jpg",
    hoverBorderColor: "#3b82f6", // blue-500
    shadowColor: "rgba(59, 130, 246, 0.5)" // blue-500 with opacity
  },
  {
    id: 2,
    title: "Data Analytics",
    description: "Unlocking insights and driving business decisions with data",
    imagePath: "/images/courses/data-analytics.png",
    hoverBorderColor: "#a855f7", // purple-500
    shadowColor: "rgba(168, 85, 247, 0.5)" // purple-500 with opacity
  },
  {
    id: 3,
    title: "Generative AI",
    description: "Creating innovative solutions with artificial intelligence",
    imagePath: "/images/courses/generative-ai.jpg",
    hoverBorderColor: "#22c55e", // green-500
    shadowColor: "rgba(34, 197, 94, 0.5)" // green-500 with opacity
  },
  {
    id: 4,
    title: "Machine Learning Tools",
    description: "Automating tasks and predicting outcomes with precision",
    imagePath: "/images/courses/machine-learning.jpg",
    hoverBorderColor: "#f97316", // orange-500
    shadowColor: "rgba(249, 115, 22, 0.5)" // orange-500 with opacity
  },
  {
    id: 5,
    title: "Microsoft Technologies",
    description: "Leveraging Microsoft's ecosystem for enterprise solutions",
    imagePath: "/images/courses/microsoft.jpg",
    hoverBorderColor: "#6366f1", // indigo-500
    shadowColor: "rgba(99, 102, 241, 0.5)" // indigo-500 with opacity
  },
  {
    id: 6,
    title: "DevOps",
    description: "Streamlining development and operations for faster delivery",
    imagePath: "/images/courses/devops.jpg",
    hoverBorderColor: "#f59e0b", // amber-500
    shadowColor: "rgba(245, 158, 11, 0.5)" // amber-500 with opacity
  },
  {
    id: 7,
    title: "Cyber Security",
    description: "Protecting digital assets from threats and vulnerabilities",
    imagePath: "/images/courses/cyber-security.jpg",
    hoverBorderColor: "#ef4444", // red-500
    shadowColor: "rgba(239, 68, 68, 0.5)" // red-500 with opacity
  },
  {
    id: 8,
    title: "Internet of Things (IoT)",
    description: "Connecting devices and transforming industries with IoT solutions",
    imagePath: "/images/courses/iot.jpg",
    hoverBorderColor: "#14b8a6", // teal-500
    shadowColor: "rgba(20, 184, 166, 0.5)" // teal-500 with opacity
  }
];

/**
 * Programming language data for the slider
 */
const programmingLanguages = [
  {
    id: 1,
    name: "C/C++ Programming",
    description: "Master the fundamentals of programming with C/C++, the foundation of system-level software development. Learn memory management, performance optimization, and build efficient applications.",
    icon: "🔧",
    color: "bg-blue-500",
    imagePath: "/images/languages/ccpp.png"
  },
  {
    id: 2,
    name: "C# and ASP.NET",
    description: "Develop robust web and desktop applications using Microsoft's powerful C# language and ASP.NET framework. Learn object-oriented programming principles and enterprise-level development.",
    icon: "🌐",
    color: "bg-purple-500",
    imagePath: "/images/languages/csharp.png"
  },
  {
    id: 3,
    name: "Python",
    description: "Explore the versatility of Python for web development, data analysis, AI, and automation. Our courses cover both fundamental concepts and advanced applications in this increasingly popular language.",
    icon: "🐍",
    color: "bg-green-500",
    imagePath: "/images/languages/python.png"
  },
  {
    id: 4,
    name: "R Programming",
    description: "Analyze and visualize data with R, the leading language for statistical computing. Learn to clean, manipulate, and extract insights from complex datasets for informed decision-making.",
    icon: "📊",
    color: "bg-cyan-500",
    imagePath: "/images/languages/rprogramming.png"
  },
  {
    id: 5,
    name: "Java Programming",
    description: "Build cross-platform applications with Java, one of the most widely used programming languages. From core concepts to advanced enterprise development, our courses cover the complete Java ecosystem.",
    icon: "☕",
    color: "bg-red-500",
    imagePath: "/images/languages/java.png"
  },
  {
    id: 6,
    name: "SQL",
    description: "Master database management with SQL. Learn to design, query, and optimize relational databases to efficiently store and retrieve data for your applications and business needs.",
    icon: "🗄️",
    color: "bg-amber-500",
    imagePath: "/images/languages/sql.png"
  },
  {
    id: 7,
    name: "JavaScript",
    description: "Create dynamic, interactive web experiences with JavaScript. Our courses cover everything from core language features to modern frameworks like React, Angular, and Node.js.",
    icon: "⚡",
    color: "bg-yellow-500",
    imagePath: "/images/languages/javascript.png"
  }
];

/**
 * Animation variants for course cards
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
 * Course Card component with enhanced hover animations
 * Features:
 * - Background course image with overlay
 * - Taller, cleaner design
 * - Card scale effect on hover (1.03x)
 * - Prominent colored shadow on hover
 * - Colored outline effect on hover
 */
function CourseCard({ course, index }: { course: typeof coursesData[0], index: number }) {
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
        className="h-full overflow-hidden group relative rounded-xl cursor-pointer
                  border border-gray-200 shadow-md
                  transition-all duration-300 ease-out"
        initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
        whileHover={{
          scale: 1.03,
          boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.2),
                      0 10px 10px -5px ${course.shadowColor},
                      0 0 0 2px ${course.hoverBorderColor}`,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        {/* Course image with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-black/50 z-10" />
          <Image
            src={course.imagePath}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Card content container */}
        <div className="relative z-10 p-6 h-full flex flex-col min-h-[280px]">
          {/* Course title */}
          <h3 className="font-serif text-xl font-bold mb-2 text-white">{course.title}</h3>

          {/* Course description */}
          <p className="text-gray-100 font-light mb-4 text-sm">{course.description}</p>

          {/* Know More button */}
          <div className="mt-auto">
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-5 py-1 text-sm font-bold"
            >
              Know More
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Language Slider component that automatically cycles through programming languages
 */
function LanguageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance the slider
  useEffect(() => {
    // Only set interval if not paused
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % programmingLanguages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  // Navigation handlers
  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? programmingLanguages.length - 1 : current - 1
    );

    // Pause automatic sliding
    setIsPaused(true);

    // Resume automatic sliding after 5 seconds
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      (current + 1) % programmingLanguages.length
    );

    // Pause automatic sliding
    setIsPaused(true);

    // Resume automatic sliding after 5 seconds
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // Helper function to determine image sizing based on language
  const getImageSizing = (languageName: string) => {
    if (languageName === "C# and ASP.NET" || languageName === "JavaScript") {
      return {
        width: 120,
        height: 120,
        className: "w-auto h-auto max-w-[120px] max-h-[120px] object-contain"
      };
    }
    return {
      width: 96,
      height: 96,
      className: "w-full h-full object-contain"
    };
  };

  // Get current language
  const currentLanguage = programmingLanguages[activeIndex];
  const imageSizing = getImageSizing(currentLanguage.name);

  return (
    <div className="relative overflow-hidden py-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl shadow-lg">
      {/* Progress bar - increased height to 4px */}
      <div className="absolute top-0 left-0 w-full h-2">
        <div
          className="h-full bg-primary"
          style={{
            width: `${(activeIndex + 1) / programmingLanguages.length * 100}%`,
            transition: isPaused ? 'none' : 'width 5s linear'
          }}
        />
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        aria-label="Previous language"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        aria-label="Next language"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="container max-w-4xl mx-auto px-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Language image - custom sizing based on language */}
            <div className="w-28 h-28 flex items-center justify-center flex-shrink-0">
              <Image
                src={currentLanguage.imagePath}
                alt={currentLanguage.name}
                width={imageSizing.width}
                height={imageSizing.height}
                className={imageSizing.className}
                priority
              />
            </div>

            <div className="text-white space-y-4">
              <h3 className="font-serif text-2xl font-bold">{currentLanguage.name}</h3>
              <p className="text-gray-300">{currentLanguage.description}</p>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900 rounded-full">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Courses page component
 * @returns Courses page JSX
 */
export default function CoursesPage() {
  return (
    <div className="container pt-6 pb-12 bg-gray-50">
      <div className="mx-auto max-w-7xl space-y-12">
        <motion.div
          className="space-y-2 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-5xl font-bold tracking-tight">Our Courses</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light">
            Discover our range of courses designed to equip you with the skills and knowledge needed for success in today&apos;s fast-paced world.
          </p>
        </motion.div>

        {/* Grid layout for courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coursesData.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* Added spacer div to create more vertical separation */}
        <div className="h-32 md:h-10"></div>

        {/* Programming Languages Section */}
        <motion.div
          className="mt-20 space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center space-y-4">
            <h2 className="font-serif text-5xl font-bold tracking-tight">Programming Languages Offerings</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light">
              Explore our comprehensive curriculum covering today's most in-demand programming languages and technologies.
            </p>
          </div>

          <LanguageSlider />
        </motion.div>
      </div>
    </div>
  );
}
