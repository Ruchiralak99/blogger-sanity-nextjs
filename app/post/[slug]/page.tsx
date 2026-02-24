import Navbar from "@/app/components/Navbar";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;
export const dynamic = "force-dynamic";

// Custom components for PortableText
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold text-white mt-8 mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold text-white mt-8 mb-4 border-b border-green-500/30 pb-2">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold text-green-400 mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold text-gray-200 mt-4 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-400 my-4 bg-gray-800/50 py-2 pr-2 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-300"><span className="text-green-400 mr-2">•</span>{children}</li>,
    number: ({ children }: any) => <li className="text-gray-300"><span className="text-green-400 mr-2 font-mono">#</span>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-green-400">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-gray-200">{children}</em>,
    code: ({ children }: any) => <code className="bg-gray-800 text-green-400 px-1 py-0.5 rounded font-mono text-sm border border-gray-700">{children}</code>,
    link: ({ children, value }: any) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors">
        {children}
      </a>
    ),
  },
  types: {
    code: ({ value }: any) => (
      <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto border border-gray-700 my-4 font-mono text-sm">
        <code>{value.code}</code>
      </pre>
    ),
    image: ({ value }: any) => (
      <div className="relative h-96 w-full my-8 rounded-xl overflow-hidden border border-gray-700">
        <Image
          src={urlFor(value).url()}
          alt="Blog content image"
          fill
          className="object-cover"
        />
      </div>
    ),
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image,
    "categories": categories[]->title
  }`;

  const post = await client.fetch(query, { slug: slug });

  if (!post) {
    return (

     
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-6">
        
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Calculate reading time (rough estimate)
  const wordCount = post.body ? JSON.stringify(post.body).split(' ').length : 0;
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar />
      {/* Back Button - Sticky at top */}
      <div className="sticky top-16 z-50 bg-gray-900/80 backdrop-blur-md border-b border-green-500/20">
        <div className=" mx-auto px-10 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors group"
          >
            <svg 
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to all articles</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src={urlFor(post.mainImage).url()}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/50" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-16 w-full">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-green-400 text-xs font-mono border border-green-500/30"
                  >
                    #{category}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{readingTime} min read</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300">
          <div className="flex items-center gap-4">
            {/* Author Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50" />
              {post.authorImage ? (
                <Image
                  src={urlFor(post.authorImage).url()}
                  alt={post.authorName}
                  width={64}
                  height={64}
                  className="relative rounded-full border-4 border-green-500/30 object-cover w-16 h-16"
                />
              ) : (
                <div className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-green-500/30">
                  {post.authorName?.[0]}
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <p className="text-sm text-gray-400">Written by</p>
              <h2 className="text-xl font-bold text-white">{post.authorName}</h2>
              <p className="text-sm text-gray-400 mt-1">Tech enthusiast & developer</p>
            </div>

            {/* Share Buttons */}
            <div className="flex gap-2">
              <button className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button className="p-2 bg-gray-700/50 rounded-lg text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12">
          {/* Content with custom styling */}
          <div className="prose prose-invert max-w-none">
            <PortableText 
              value={post.body} 
              components={portableTextComponents}
            />
          </div>

          {/* Tags/Footer */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Share this article:</span>
                <button className="p-2 bg-gray-700/30 rounded-lg text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="p-2 bg-gray-700/30 rounded-lg text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
              </div>
              
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors group"
              >
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>More articles</span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts Suggestion */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-green-500/10 to-transparent rounded-2xl p-8 border border-green-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Enjoyed this article?</h3>
          <p className="text-gray-300 mb-6">
            Check out more articles in our {post.categories?.[0] || 'technology'} series.
          </p>
          <Link
            href={`/blog?category=${post.categories?.[0] || 'tech'}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm text-white rounded-lg border border-gray-700 hover:border-green-500/50 hover:bg-gray-800/80 transition-all duration-300 group"
          >
            <span>Browse related articles</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}