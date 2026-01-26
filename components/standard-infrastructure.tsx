import { Database, Radio, Wrench, Eye } from "lucide-react"

const benefits = [
  {
    icon: Database,
    title: "PostgreSQL for Durability",
    description: "Workflow state in Postgres. Use pg_dump, your existing monitoring, and proven scaling patterns.",
  },
  {
    icon: Radio,
    title: "NATS for Messaging",
    description: "High-performance task distribution. No proprietary protocol—standard NATS tooling works.",
  },
  {
    icon: Wrench,
    title: "Zero New Runbooks",
    description: "Your on-call team already knows these systems. No 3am debugging of custom storage engines.",
  },
  {
    icon: Eye,
    title: "SQL-Queryable State",
    description: "SELECT * FROM workflows. Debug issues with tools you know. No black-box storage layer.",
  },
]

export function StandardInfrastructure() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-400">
            <Database className="h-3.5 w-3.5" />
            <span className="font-medium">Standard Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Operational simplicity with PostgreSQL + NATS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No custom storage to learn. No proprietary protocols. Your team already knows how to backup, monitor, and scale these systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="feature-card text-center">
              <div className="feature-card-icon mx-auto !bg-emerald-500/10 !text-emerald-400">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison callout */}
        <div className="mt-12 p-6 rounded-xl bg-secondary/30 border border-border">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Temporal</div>
              <div className="font-medium">Custom persistence layer</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Restate</div>
              <div className="font-medium">Custom Raft log + RocksDB</div>
            </div>
            <div className="text-emerald-400">
              <div className="text-sm text-emerald-400/70 mb-1">Flovyn</div>
              <div className="font-medium">PostgreSQL + NATS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
