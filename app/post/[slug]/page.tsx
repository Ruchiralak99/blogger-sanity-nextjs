import { client } from "../../sanity/lib/client"; 
import { urlFor } from "../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Image from "next/image";


export const revalidate = 60; // තත්පර 60කට වරක් අලුත් දත්ත තිබේදැයි බලන්න
export const dynamic = "force-dynamic";
// params Promise එකක් විදියට define කරන්න
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // params await කරන්න (මේක තමයි අලුත් ක්‍රමය)
  const { slug } = await params;

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image
  }`;

  // දැන් slug එක මෙතනින් pass වෙනවා
  const post = await client.fetch(query, { slug: slug });

  if (!post) {
    return <div className="text-center py-20 font-bold text-xl">Post not found</div>;
  }

  return (
    <article className="max-w-4xl mx-auto py-20 px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 border-y py-4 border-gray-100">
           {post.authorImage && (
             <Image 
                src={urlFor(post.authorImage).url()} 
                alt={post.authorName} 
                width={48} height={48} 
                className="rounded-full shadow-sm"
             />
           )}
           <div className="text-left">
              <p className="text-gray-900 font-bold leading-none">{post.authorName}</p>
              <p className="text-gray-500 text-sm mt-1">{new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
           </div>
        </div>
      </header>

      <div className="relative h-[300px] md:h-[500px] w-full mb-12 shadow-2xl rounded-3xl overflow-hidden">
        <Image 
          src={urlFor(post.mainImage).url()} 
          alt={post.title} 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg prose-blue mx-auto text-gray-800 leading-relaxed prose-headings:font-bold prose-a:text-blue-600">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}