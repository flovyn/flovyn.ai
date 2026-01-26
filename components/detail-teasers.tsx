import { ArrowRight, Code2, Cpu, BookOpen } from "lucide-react"
import Link from "next/link"

const pages = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "Define tasks, compose workflows, and run your first worker in three steps.",
    href: "/getting-started",
    color: "emerald",
  },
  {
    icon: Code2,
    title: "Core API",
    description: "Side effects, durable state, timers, signals, and real-time streaming across all SDKs.",
    href: "/core",
    color: "primary",
  },
  {
    icon: Cpu,
    title: "AI Agents",
    description: "Build reliable AI agent loops that survive crashes and resume exactly where they left off.",
    href: "/ai-agents",
    color: "violet",
  },
]

export function DetailTeasers() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Learn More</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deeper into how Flovyn works
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {pages.map((page, i) => (
            <Link
              key={i}
              href={page.href}
              className="group feature-card hover:border-primary/50 transition-all duration-300"
            >
              <div className={`feature-card-icon ${
                page.color === "emerald" ? "!bg-emerald-500/10 !text-emerald-400" :
                page.color === "violet" ? "!bg-violet-500/10 !text-violet-400" :
                ""
              }`}>
                <page.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {page.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {page.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
