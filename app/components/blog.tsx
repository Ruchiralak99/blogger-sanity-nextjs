import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 10;
export const dynamic = "force-dynamic";

export default async function Blog() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    mainImage,
    publishedAt,
    "authorName": author->name,
    "categories": categories[]->title
  }`);

  // Featured post (first post)
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section with Green Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-green-900/30 to-gray-900 py-24 px-6 border-b border-green-500/20">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
        
        {/* Floating Code Snippets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['<blog />', 'const post = {}', 'fetch()', 'async/await'].map((snippet, i) => (
            <div
              key={i}
              className="absolute text-green-500/10 font-mono text-2xl whitespace-nowrap animate-float"
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

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-green-500/10 backdrop-blur-sm rounded-full text-green-400 text-sm font-mono border border-green-500/30">
              &lt;tech_blog /&gt;
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              Tech Insights
            </span>
            <br />
            <span className="text-white">for Modern Developers</span>
          </h1>
          
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            අලුත්ම තාක්ෂණික තොරතුරු, coding best practices, 
            සහ developer community එකට එකතුවෙන්න.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg hover:shadow-green-500/30 transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl font-bold text-white">Featured Article</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-green-500/50 to-transparent" />
            <span className="px-3 py-1 bg-green-500/10 rounded-full text-green-400 text-xs font-mono border border-green-500/30">
              HOT 🔥
            </span>
          </div>

          <Link
            href={`/post/${featuredPost.slug.current}`}
            className="group block"
          >
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-[400px] lg:h-full overflow-hidden">
                  {featuredPost.mainImage && (
                    <Image
                      src={urlFor(featuredPost.mainImage).url()}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-xs font-mono border border-green-500/30">
                      {featuredPost.categories?.[0] || 'Technology'}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                    {featuredPost.title}
                  </h2>

                  <p className="text-gray-300 mb-6 line-clamp-3">
                    {featuredPost.excerpt || `By ${featuredPost.authorName} · An in-depth look at modern development practices and techniques.`}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {featuredPost.authorName?.[0]}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Written by</p>
                        <p className="text-white font-semibold">{featuredPost.authorName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-green-400 group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-semibold">Read More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-white">Latest Articles</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-green-500/50 to-transparent" />
          <span className="text-sm text-gray-400">{posts.length} articles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post: any, index: number) => (
            <Link
              href={`/post/${post.slug.current}`}
              key={post.slug.current}
              className="group"
            >
              <div className="relative h-full bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-52 w-full overflow-hidden">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                      <span className="text-4xl text-green-500/30">{'</>'}</span>
                    </div>
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-green-400 text-xs font-mono border border-green-500/30">
                      {post.categories?.[0] || 'Tech'}
                    </span>
                  </div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gray-900/50 backdrop-blur-sm rounded-full text-gray-300 text-xs border border-gray-700">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt || `Explore the latest insights and developments in ${post.categories?.[0] || 'technology'}...`}
                  </p>

                  {/* Author and Meta */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {post.authorName?.[0] || 'A'}
                      </div>
                      <span className="text-sm text-gray-300">{post.authorName || 'Anonymous'}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-green-400 text-sm group-hover:translate-x-1 transition-transform">
                      <span>Read</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {posts.length > 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-gray-700 hover:border-green-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 group">
              <span>Load More Articles</span>
              <svg className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m14-6l-7-7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-green-500/20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-2 bg-green-500/10 backdrop-blur-sm rounded-full text-green-400 text-sm font-mono border border-green-500/30 mb-6">
                &lt;newsletter /&gt;
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay <span className="text-green-400">Updated</span>
              </h2>
              
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Get the latest tech articles, tutorials, and news delivered straight to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}