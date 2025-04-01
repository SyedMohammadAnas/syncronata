"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Navigation items for main menu
 */
const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

/**
 * Navbar component for the website
 * @returns Navbar JSX
 */
export default function Navbar() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Scroll state
  const [scrolled, setScrolled] = useState(false);
  // Previous scroll position
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  // Navbar visibility
  const [visible, setVisible] = useState(true);
  // Current pathname
  const pathname = usePathname();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine if page is scrolled past threshold
      if (currentScrollPos > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine scroll direction and visibility
      // If scrolling up or at the top, show navbar
      // If scrolling down and not at the top, hide navbar
      const isScrolledDown = currentScrollPos > prevScrollPos;

      setVisible(!isScrolledDown || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b shadow-md bg-background/95 backdrop-blur-sm' : 'bg-background'
      } ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container flex h-20 items-center justify-between py-4">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/syncronota.png"
              alt="Syncronata Logo"
              width={50}
              height={50}
              className="h-10 w-auto"
            />
            <span className="font-serif text-2xl font-bold tracking-tight ml-2 hidden sm:inline-block">
              Syncronata
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-sans font-bold text-sm tracking-wide uppercase transition-colors hover:text-primary relative
                  ${isActive(item.href)
                    ? "text-primary font-extrabold after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[3px] after:bg-primary"
                    : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* CTA button */}
        <div className="flex items-center gap-4">
          <Button size="sm" className="rounded-full px-6 font-bold">Enroll Now</Button>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <div className="space-y-1 px-4 pb-5 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-3 font-bold text-sm tracking-wide uppercase transition-colors hover:text-primary border-b border-border/20
                  ${isActive(item.href)
                    ? "text-primary font-extrabold border-primary"
                    : ""
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
