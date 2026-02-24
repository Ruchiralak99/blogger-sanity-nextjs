import AboutSection from "./components/About";
import Blog from "./components/blog";
import FooterSection from "./components/Footer";
import Footer from "./components/Footer";
import HeroCarousel from "./components/Hero";
import Navbar from "./components/Navbar";
import { client } from "./sanity/lib/client"; // path එක හරියට බලන්න
import { urlFor } from "./sanity/lib/image";
import Image from "next/image";

import Link from "next/link";
export const revalidate = 10; // තත්පර 60කට වරක් අලුත් දත්ත තිබේදැයි බලන්න
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts =
    await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    mainImage,
    publishedAt,
    "authorName": author->name
  }`);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      
      <Navbar />
      <HeroCarousel />
      <Blog   />
      <FooterSection />
   
      
     
    </main>
  );
}
