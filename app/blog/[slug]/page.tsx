import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, User } from "lucide-react";
import PixelTrail from "@/components/PixelTrail";
import Image from "next/image";
import { Fragment } from "react";

// This would typically come from your CMS or database
const blogPosts = {
  "will-agents-eat-apps": {
    title: "Will Agents Eat Apps?",
    description: "",
    date: "2024-12-21",
    author: "Arek",
    tags: ["AI", "Agents", "SaaS", "UX"],
    content: `
      <div class="prose prose-invert prose-zinc max-w-none">
        <div class="relative w-full aspect-[16/9] mb-12">
          <div data-image="agent-architecture"></div>
        </div>

        <p class="mb-6">Imagine an agent can action on specific functions that an app has - the function to buy a product on an app, the function to get data from an app, etc...</p>

        <p class="mb-6">Imagine all user interactions flow through the agent - whether they're uploading files, requesting visualizations, or needing data analysis. The agent then orchestrates these functions and returns both computational results and UI components back to the user.</p>

        <p class="mb-6">Now imagine it more like agent-to-agent communication - think Apple's Siri chatting with Amazon's agent:</p>

        <div class="mb-6">
          <p>"Hey Siri, grab me some toilet paper from Amazon"</p>
          <p>Siri -> Amazon's Agent: "Need to order toilet paper for my user"</p>
          <p>Amazon's Agent -> Siri: "Order confirmed, arriving Tuesday"</p>
          <p>Siri -> You: "Got your toilet paper ordered, it'll be here Tuesday"</p>
        </div>

        <p class="mb-6">The key thing is you never touch the Amazon app directly. Need a visual of your cart because audio feedback isn't cutting it? Just go: "Hey Siri, show me my Amazon cart" And Siri pings Amazon's agent, which generates and sends back the UI that Siri then displays on your phone. The Amazon app becomes obsolete for direct user interaction. This might be where software as a service UX is heading, though it's definitely debatable if this'll be the dominant paradigm. I think it will coexist with apps for a while but not long after, take over as the go-to user experience.</p>

        <p class="mb-6">To future-proof your app in this ecosystem, you need two things:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Your core IP/data/endpoints locked down tight</li>
          <li>Everything connects to your agent</li>
        </ul>

        <p class="mb-6">The really interesting question is how this gets distributed. Maybe users download your agent directly (like apps today), or maybe Apple creates an "Agent Store" where your agent lives in their cloud and users just permission it. The implementation details aren't as important as ensuring your agent is the sole interface to your app's core functionality.</p>

        <p class="mb-6">This agent-mediated architecture preserves your IP while enabling seamless integration into an agent-centric computing future. The user never needs to learn your specific UI patterns or workflows - they just chat with their preferred agent, which knows how to coordinate with your agent to get things done.</p>
      </div>
    `,
  },
};

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    return {
      title: "Post Not Found | Arek Halpern's Blog",
    };
  }

  return {
    title: `${post.title} | Arek Halpern's Blog`,
    description: post.description,
    openGraph: {
      title: `${post.title} | Arek Halpern's Blog`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts[params.slug as keyof typeof blogPosts];

  if (!post) {
    notFound();
  }

  const contentWithImage = post.content.replace(
    '<div data-image="agent-architecture"></div>',
    '<div style="position: relative; width: 100%; height: 100%;">' +
      '<img src="/agent-architecture-img.jpeg" alt="AI Agent Architecture Diagram" ' +
      'style="position: absolute; top: 0; left: 0; object-fit: cover; width: 100%; height: 100%; border-radius: 0.5rem;" ' +
      'width="1920" height="1080" />' +
      "</div>" +
      '<div style="margin-bottom: 3rem;"></div>'
  );

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
        <article className="max-w-4xl mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white mix-blend-difference">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-zinc-400 mix-blend-difference">
                  <User className="mr-2 h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center text-zinc-400 mix-blend-difference">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="flex gap-3 text-zinc-500 mix-blend-difference">
                {post.tags.map((tag, i) => (
                  <Fragment key={tag}>
                    {i > 0 && <span>·</span>}
                    <span>{tag}</span>
                  </Fragment>
                ))}
              </div>
            </div>
            <p className="text-lg text-zinc-300 mix-blend-difference">
              {post.description}
            </p>
          </header>
          <div
            className="text-zinc-200 mix-blend-difference"
            dangerouslySetInnerHTML={{ __html: contentWithImage }}
          />
        </article>
      </div>
    </div>
  );
}
