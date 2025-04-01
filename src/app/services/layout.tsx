import { type Metadata } from "next";
import { ReactNode } from "react";

/**
 * Services page metadata
 */
export const metadata: Metadata = {
  title: "Services",
  description: "Explore our comprehensive range of education and training services",
};

/**
 * Services layout component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Page content
 * @returns Services layout JSX
 */
export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
