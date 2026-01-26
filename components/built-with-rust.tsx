import { Zap, Shield, Cpu } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Predictable Performance",
    description: "No garbage collection pauses. Consistent low-latency workflow execution under load.",
  },
  {
    icon: Shield,
    title: "Memory Safety",
    description: "Compile-time guarantees prevent null pointer crashes and memory leaks in production.",
  },
  {
    icon: Cpu,
    title: "Low Resource Usage",
    description: "Efficient memory footprint. Run thousands of workflows on modest hardware.",
  },
]

export function BuiltWithRust() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-sm text-orange-400">
            <span>🦀</span>
            <span className="font-medium">Built with Rust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Engineered for reliability
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Flovyn server is written in Rust for maximum performance and safety. No JVM, no interpreter, no surprises.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="feature-card text-center">
              <div className="feature-card-icon mx-auto !bg-orange-500/10 !text-orange-400">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
