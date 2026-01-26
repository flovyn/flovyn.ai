import { Server, Database, Lock, Flag } from "lucide-react"

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
    icon: Flag,
    title: "European Sovereignty",
    description: "Made in Europe. Self-hosted first with full data control. No US cloud dependencies required.",
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

      </div>
    </section>
  )
}
