import { Metadata } from "next";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import PixelTrail from "@/components/PixelTrail";

export const metadata: Metadata = {
  title: "Blog | Arek Halpern",
  description:
    "Thoughts on software development, marketing strategy, and generative AI",
  openGraph: {
    title: "Blog | Arek Halpern",
    description:
      "Thoughts on software development, marketing strategy, and generative AI",
    type: "website",
    url: "https://arekhalpern.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Arek Halpern",
    description:
      "Thoughts on software development, marketing strategy, and generative AI",
  },
};

// This would typically come from your CMS or database
const blogPosts = [
  {
    title: "Will Agents Eat Apps?",
    description:
      "Thoughts on AI agent to agent user experience and the potential end of applications as we know it.",
    date: "2024-12-21",
    tags: ["AI", "Agents", "SaaS", "UX"],
    slug: "will-agents-eat-apps",
  },
];

export default function BlogPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/bg-gradient.png')] bg-cover bg-fixed bg-no-repeat" />
        <div className="absolute inset-0 bg-zinc-900/60" />
      </div>
      <div className="fixed inset-0 -z-5">
        <PixelTrail
          pixelSize={20}
          delay={100}
          fadeDuration={400}
          pixelClassName="bg-yellow-300"
        />
      </div>
      <div className="relative z-10 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-white mix-blend-difference">
            Blog
          </h1>
          <p className="text-lg text-zinc-300 mb-8 mix-blend-difference">
            Thoughts on software development, marketing strategy, and generative
            AI
          </p>
          <div className="space-y-6">
            {blogPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="flex justify-between items-center py-3 hover:bg-zinc-900/20 transition-colors duration-200 -mx-4 px-4 rounded-lg group"
              >
                <h2 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors mix-blend-difference">
                  {post.title}
                </h2>
                <span className="text-sm text-zinc-400 mix-blend-difference">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
