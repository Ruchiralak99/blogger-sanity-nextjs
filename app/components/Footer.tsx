import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 border-t border-green-500/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        
        {/* Floating Code Snippets */}
        <div className="absolute inset-0">
          {['</>', '{...}', 'const', 'import'].map((snippet, i) => (
            <div
              key={i}
              className="absolute text-green-500/5 font-mono text-4xl whitespace-nowrap animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 2}s`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {snippet}
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-16">
          {/* Brand Column - Larger */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-green-500/20">
                <span className="text-white text-2xl font-bold">✦</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                Nuvana
              </span>
            </Link>
            
            <p className="text-gray-400 leading-relaxed max-w-md">
              අලුත්ම තාක්ෂණික තොරතුරු, coding best practices, 
              සහ developer community එකට එකතුවෙන්න.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-gray-800/80 transition-all duration-300"
                aria-label="Twitter"
              >
                <span className="text-lg font-bold">𝕏</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-gray-800/80 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <span className="text-lg font-bold">in</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-gray-800/80 transition-all duration-300"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-500/50 hover:bg-gray-800/80 transition-all duration-300"
                aria-label="RSS"
              >
                <span className="text-lg">◎</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-mono text-green-400 tracking-wider uppercase">Navigate</h4>
            <div className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Articles', path: '/blog' },
                { name: 'Categories', path: '/categories' },
                { name: 'About', path: '/about' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="block text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm group"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300" />
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Topics Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-mono text-green-400 tracking-wider uppercase">Topics</h4>
            <div className="space-y-3">
              {[
                { name: 'Technology', path: '/categories/tech' },
                { name: 'Artificial Intelligence', path: '/categories/ai' },
                { name: 'Science', path: '/categories/science' },
                { name: 'Design', path: '/categories/design' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="block text-gray-400 hover:text-green-400 transition-colors duration-200 text-sm group"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-green-500 transition-all duration-300" />
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-sm font-mono text-green-400 tracking-wider uppercase">Stay Updated</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Get the latest tech articles, tutorials, and news delivered straight to your inbox.
            </p>
            
            {/* <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm rounded-md hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-1 group"
                >
                  <span>Join</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
              
              <p className="text-xs text-gray-600">
                No spam. Unsubscribe anytime.
              </p>
            </form> */}

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Sanity'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded text-xs text-gray-400"
                >
                  #{tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 order-2 md:order-1">
            © {new Date().getFullYear()} Nuvana Blog. All rights reserved. Developed by Ruchira Lakshan
          </p>
          
          <div className="flex items-center gap-6 order-1 md:order-2">
            <Link 
              href="/privacy" 
              className="text-xs text-gray-500 hover:text-green-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-xs text-gray-500 hover:text-green-400 transition-colors"
            >
              Terms of Use
            </Link>
            <Link 
              href="/sitemap" 
              className="text-xs text-gray-500 hover:text-green-400 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
    </footer>
  );
}