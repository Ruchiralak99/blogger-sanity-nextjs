"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize if open
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
          : "bg-white py-5"
      }`}
    >
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
              <span className="text-white text-2xl font-bold">✦</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Nuvana
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
            >
              Articles
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
            >
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {/* Subscribe CTA Button */}
            <Link
              href="/contact"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-6 h-0.5 bg-green-600 transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`} />
            <span className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-6 h-0.5 bg-green-600 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`} />
            <span className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block w-6 h-0.5 bg-green-600 transition-all duration-300 ${
              menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl min-h-screen"
            >
              <div className="flex flex-col p-6 space-y-4">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium py-3 px-4 rounded-lg hover:bg-green-50 transition-all duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium py-3 px-4 rounded-lg hover:bg-green-50 transition-all duration-200"
                >
                  Articles
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium py-3 px-4 rounded-lg hover:bg-green-50 transition-all duration-200"
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium py-3 px-4 rounded-lg hover:bg-green-50 transition-all duration-200"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-medium text-center hover:shadow-lg hover:shadow-green-500/30 transform hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}