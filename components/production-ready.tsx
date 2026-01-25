import { Server, Database, Lock, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Server,
    title: "Minimal Deployment",
    description: "PostgreSQL + single Flovyn server. Start simple, scale as requirements grow.",
  },
  {
    icon: Database,
    title: "Data Retention",
    description: "Automatic retention with configurable policies. Optional S3-compatible archival for long-term storage.",
  },
  {
    icon: Lock,
    title: "Multi-tenancy",
    description: "Built-in tenant isolation with quota enforcement and rate limiting. Perfect for SaaS products.",
  },
  {
    icon: BarChart3,
    title: "Self-hosted First",
    description: "Run on your infrastructure with full control. No vendor lock-in, deploy anywhere.",
  },
]

export function ProductionReady() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Running in Production</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built-in operational features for production workloads
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="feature-card text-center">
              <div className="feature-card-icon mx-auto">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 feature-card p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Scale?</h3>
          <p className="text-muted-foreground mb-6">
            Add Redis for advanced features when needed. Start simple, grow as you go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
              <span>PostgreSQL</span>
            </div>
            <div className="h-px w-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span>Flovyn Server</span>
            </div>
            <div className="h-px w-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/50" />
              <span>Redis (optional)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
