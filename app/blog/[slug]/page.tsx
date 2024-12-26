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
    description:
      "Thoughts on AI agent to agent user experience and the potential end of applications as we know it.",
    date: "2024-12-21",
    author: "Arek",
    tags: ["AI", "Agents", "SaaS", "UX"],
    content: `
      <div class="prose prose-invert prose-zinc max-w-none">
        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">The Future of SaaS UX</h2>
        <p class="mb-6">A paradigm shift is underway where AI agents could become the primary interface between users and services, fundamentally changing how we interact with applications. Unlike traditional apps requiring direct user interaction, this new model positions AI agents as intelligent intermediaries.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">The Agent Architecture</h2>
        <p class="mb-4">Looking at the architectural diagram, we can see how an agent-based system functions. The AI agent serves as the central hub for all interactions, with access to various tools (calendars, calculators, search functions), memory systems, and planning capabilities. This architecture enables sophisticated decision-making and task execution without direct user intervention.</p>
        
        <div class="relative w-full aspect-[16/9] mb-12">
          <div data-image="agent-architecture"></div>
        </div>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">How It Works: A Practical Example</h2>
        <p class="mb-6">When a user interacts with an agent-based system, every input - whether voice, text, or even gestures - first passes through the agent. This creates a single, consistent entry point for all user interactions. Here's how the flow typically works:</p>

        <h3 class="text-xl font-semibold mt-6 mb-3 text-white">Input Flow:</h3>
        <p class="mb-4">You make a request (e.g., "Show me my calendar for next week and add any free slots to my shopping list")</p>

        <p class="mb-4">The agent processes this input through several stages:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Natural language understanding to parse the intent</li>
          <li>Memory access to check context from previous interactions</li>
          <li>Planning to break down complex requests into subtasks</li>
        </ul>

        <p class="mb-4">The agent then coordinates with the appropriate tools:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Queries the Calendar() function for next week's schedule</li>
          <li>Uses Memory to access your shopping habits and preferences</li>
          <li>Employs Search() to find relevant information if needed</li>
        </ul>

        <h3 class="text-xl font-semibold mt-6 mb-3 text-white">Output Flow:</h3>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>The agent collects responses from various tools and functions</li>
          <li>It synthesizes this information through its planning module</li>
        </ul>

        <p class="mb-4">Before presenting to the user, the agent:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Formats the response appropriately (text, UI elements, voice)</li>
          <li>Checks for completeness through self-critics</li>
          <li>Uses reflection to ensure the response matches the original intent</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Agent-to-Agent Communication & Development</h2>
        <p class="mb-4">For businesses and developers, this shift requires a new approach:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Building APIs accessible only through authenticated agents</li>
          <li>Creating agents that effectively communicate with other agents</li>
          <li>Implementing secure data endpoints while enabling seamless interactions</li>
          <li>Designing flexible UI generation systems for when visual interaction is necessary</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">The Gray Areas: Unauthorized Agents</h2>
        <p class="mb-6">Not all companies will participate willingly in this ecosystem. This gap will likely spawn unauthorized agents that scrape websites and automate actions – essentially sophisticated RPA (Robotic Process Automation) tools. While more accessible than traditional RPA, these practices will likely violate terms of service and face legal challenges.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Current Agent Building Tools</h2>
        <p class="mb-4">Several platforms and tools are already emerging to support agent development:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>AI16z - Eliza: An open-source framework for building conversational agents with sophisticated reasoning capabilities.</li>
          <li>GPTs by OpenAI: A platform for creating custom agents with specific capabilities and knowledge domains.</li>
          <li>ZerePy: A Python framework focusing on agent-to-agent communication protocols.</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">The Business Model Challenge</h2>
        <p class="mb-4">Companies embracing agent-to-agent interactions will likely implement new revenue models:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Premium API access fees for agent interactions</li>
          <li>Compensation structures for lost advertising revenue</li>
          <li>Tiered pricing based on automation levels and usage patterns</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Security and Trust Considerations</h2>
        <p class="mb-4">The shift to agent-based interfaces raises important questions:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>How will user data remain secure across agent interactions?</li>
          <li>What authentication standards will emerge for agent-to-agent communication?</li>
          <li>How will users maintain control over their agent's actions?</li>
          <li>What mechanisms will prevent unauthorized agent access?</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Looking Ahead</h2>
        <p class="mb-4">While this vision is compelling, the transition won't be immediate. Companies need to:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Develop robust agent interfaces</li>
          <li>Establish secure communication protocols</li>
          <li>Create clear pricing models</li>
          <li>Build trust with users</li>
        </ul>

        <p class="mb-6">The success of this model will ultimately depend on finding the right balance between convenience, security, and business interests. As AI capabilities advance, we might find ourselves in a world where direct app manipulation becomes increasingly rare, replaced by intelligent agents managing our digital interactions.</p>
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
