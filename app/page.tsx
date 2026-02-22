import { client } from "./sanity/lib/client"; // path එක හරියට බලන්න
import { urlFor } from "./sanity/lib/image";
import Image from "next/image";

import Link from "next/link";

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
      <section className="bg-white border-b py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            The Modern <span className="text-blue-600">Blog.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            අලුත්ම තාක්ෂණික තොරතුරු සහ ලිපි කියවන්න එක්වන්න.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post: any) => (
            <Link
              href={`/post/${post.slug.current}`}
              key={post.slug.current}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="relative h-60 w-full overflow-hidden">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Technology
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 mt-3 text-sm line-clamp-2">
                    By {post.authorName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
