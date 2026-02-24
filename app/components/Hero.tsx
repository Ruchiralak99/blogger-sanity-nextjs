"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Transition, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Tech-focused blog images
const heroImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    title: "The Future of Web Development",
    subtitle: "Exploring Next.js 15, React Server Components, and the evolving landscape of modern web architecture",
    category: "Web Dev",
    tech: ["React", "Next.js", "TypeScript"],
    readTime: "8 min read"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    title: "Cloud Native Architecture",
    subtitle: "Building scalable microservices with Kubernetes, Docker, and cloud-native best practices",
    category: "Cloud",
    tech: ["Kubernetes", "Docker", "AWS"],
    readTime: "10 min read"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    title: "AI-Powered Development",
    subtitle: "How machine learning and AI tools are transforming the way we write and deploy code",
    category: "AI/ML",
    tech: ["Python", "TensorFlow", "OpenAI"],
    readTime: "12 min read"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    title: "Cybersecurity Best Practices",
    subtitle: "Essential security strategies for modern applications and protecting user data",
    category: "Security",
    tech: ["Security", "Encryption", "Auth"],
    readTime: "7 min read"
  }
];

export default function TechHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    setImageError(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
    setImageError(false);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setImageError(false);
  };

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  // Fixed: Properly typed variants with specific transition type
  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring" as const, // Fixed: Use const assertion for type
        stiffness: 300,
        damping: 30
      } as Transition
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        type: "spring" as const, // Fixed: Use const assertion for type
        stiffness: 300,
        damping: 30
      } as Transition
    })
  };

  const codeSnippets = [
    "const innovation = 'code';",
    "npm run deploy --prod",
    "git commit -m 'feat: hero'",
    "console.log('Hello World');",
    "<TechStack />",
    "docker-compose up -d",
    "npx create-next-app@latest",
    "import { Future } from 'tech';"
  ];

  return (
    <section 
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-gray-900"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, green 1px, transparent 0)`,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />
      </div>

      {/* Floating Code Snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            className="absolute text-green-500/10 font-mono text-sm whitespace-nowrap"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse" as const, // Fixed: Use const assertion
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />

      {/* Carousel Container */}
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Image with Overlay */}
            <div className="relative h-full w-full">
              {!imageError ? (
                <Image
                  src={heroImages[currentIndex].url}
                  alt={heroImages[currentIndex].title}
                  fill
                  priority
                  className="object-cover opacity-40"
                  sizes="100vw"
                  onError={() => setImageError(true)}
                  quality={90}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-gray-900" />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center mt-20 ml-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="max-w-3xl"
                  >
                    {/* Tech Category with Icons */}
                    <div className="flex items-center gap-3 mb-6">
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="px-4 py-2 bg-green-500/10 backdrop-blur-sm rounded-full text-green-400 text-sm font-mono border border-green-500/30"
                      >
                        &lt;{heroImages[currentIndex].category} /&gt;
                      </motion.span>
                      
                      <motion.span 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-gray-300 text-sm"
                      >
                        {heroImages[currentIndex].readTime}
                      </motion.span>
                    </div>
                    
                    {/* Title with Tech Glow */}
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-5 text-5xl md:text-5xl lg:text-5xl font-bold mb-6"
                    >
                      <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
                        {heroImages[currentIndex].title.split(' ')[0]}
                      </span>
                      <span className="text-white "> {heroImages[currentIndex].title.split(' ').slice(1).join(' ')}</span>
                    </motion.h1>
                    
                    {/* Subtitle */}
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-sm text-gray-300 mb-8 max-w-2xl leading-relaxed"
                    >
                      {heroImages[currentIndex].subtitle}
                    </motion.p>
                    
                    {/* Tech Stack Pills */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap gap-3 mb-8"
                    >
                      {heroImages[currentIndex].tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-lg text-green-400 text-sm font-mono border border-green-500/30"
                        >
                          #{tech}
                        </span>
                      ))}
                    </motion.div>
                    
                    {/* CTA Buttons */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex flex-wrap gap-4"
                    >
                      <Link
                        href="/blog"
                        className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold overflow-hidden shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Read Tech Articles
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                      
                      <Link
                        href="/categories"
                        className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg font-semibold border-2 border-gray-700 hover:border-green-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Explore Tech Stack
                      </Link>
                    </motion.div>

                    {/* Live Stats */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="flex gap-6 mt-12"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        <span className="text-sm text-gray-400">1.2k developers reading</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        <span className="text-sm text-gray-400">98% recommend</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-green-400 hover:bg-gray-800/80 hover:text-green-300 transition-all duration-300 group border border-gray-700 hover:border-green-500/50"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-gray-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-green-400 hover:bg-gray-800/80 hover:text-green-300 transition-all duration-300 group border border-gray-700 hover:border-green-500/50"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Tech Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group relative h-1 rounded-full transition-all duration-500 ${
              index === currentIndex 
                ? "w-12 bg-green-500" 
                : "w-8 bg-gray-600 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <motion.div
                layoutId="activeTechIndicator"
                className="absolute inset-0 bg-green-500 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Binary Rain Effect (subtle) */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-900/30 to-transparent pointer-events-none" />
    </section>
  );
}