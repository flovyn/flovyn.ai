import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, CheckCircle2, Database, Server, Globe, Wrench } from "lucide-react"
import Link from "next/link"

export default function VsTemporalPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-balance">Flovyn vs Temporal</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Both are durable execution platforms. The difference is in infrastructure and sovereignty.
            </p>
          </div>

          {/* Core Difference */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Same Problem, Different Approach</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Temporal pioneered durable execution. Flovyn builds on the same concepts with different infrastructure choices
              and a European-first approach.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Temporal</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Server className="h-5 w-5 mt-0.5 text-muted-foreground/50" />
                    <span>Custom persistence layer (Cassandra, MySQL, or Postgres with specific schema)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 mt-0.5 text-muted-foreground/50" />
                    <span>US company, Temporal Cloud hosted in US regions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wrench className="h-5 w-5 mt-0.5 text-muted-foreground/50" />
                    <span>Requires learning Temporal-specific operational patterns</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-primary/30 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  Flovyn
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Our approach</span>
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Database className="h-5 w-5 mt-0.5 text-emerald-500" />
                    <span>Standard PostgreSQL + NATS. Use existing backup, monitoring, and scaling tools.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe className="h-5 w-5 mt-0.5 text-blue-500" />
                    <span>European company. Self-hosted on your infrastructure. No US cloud dependency.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wrench className="h-5 w-5 mt-0.5 text-emerald-500" />
                    <span>Your team already knows Postgres and NATS. Zero new runbooks.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Infrastructure Comparison */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Infrastructure Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold">Temporal</th>
                    <th className="text-left py-4 px-4 font-semibold">Flovyn</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Durability storage", "Custom persistence layer", "PostgreSQL"],
                    ["Task distribution", "Custom task queues", "NATS"],
                    ["State queries", "Visibility API", "SQL queries"],
                    ["Backup strategy", "Temporal-specific tooling", "pg_dump, standard Postgres backups"],
                    ["Monitoring", "Temporal metrics + custom dashboards", "Standard Postgres/NATS metrics"],
                    ["Scaling", "Temporal cluster scaling", "Postgres read replicas, NATS clustering"],
                    ["On-call debugging", "Learn Temporal internals", "Standard database debugging"],
                    ["Deployment", "Temporal Server + dependencies", "Single binary + Postgres + NATS"],
                  ].map(([aspect, temporal, flovyn], i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{aspect}</td>
                      <td className="py-4 px-4 text-muted-foreground">{temporal}</td>
                      <td className="py-4 px-4 text-muted-foreground">{flovyn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* European Sovereignty */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">European Data Sovereignty</h2>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Globe className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Why it matters</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 text-blue-400 shrink-0" />
                      <span><strong>GDPR compliance:</strong> Workflow data containing PII stays on EU infrastructure you control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 text-blue-400 shrink-0" />
                      <span><strong>No US Cloud Act exposure:</strong> Self-hosted means no mandatory data access by US authorities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 text-blue-400 shrink-0" />
                      <span><strong>Audit requirements:</strong> Financial services and healthcare often require EU-only data residency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 text-blue-400 shrink-0" />
                      <span><strong>Vendor independence:</strong> No dependency on US cloud provider availability or pricing changes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Operational Simplicity */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Operational Simplicity</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Temporal Operations</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Learn Temporal cluster architecture</li>
                  <li>• Configure history, matching, and frontend services</li>
                  <li>• Set up Temporal-specific monitoring</li>
                  <li>• Handle Temporal-specific failure modes</li>
                  <li>• Manage Temporal schema migrations</li>
                  <li>• Debug with Temporal CLI and APIs</li>
                </ul>
              </div>
              <div className="bg-card border border-emerald-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Flovyn Operations</h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Standard Postgres administration</li>
                  <li>• Standard NATS cluster management</li>
                  <li>• Use existing monitoring (Prometheus, Datadog, etc.)</li>
                  <li>• Debug with SQL queries and standard tools</li>
                  <li>• Backup with pg_dump</li>
                  <li>• Scale with Postgres read replicas</li>
                </ul>
              </div>
            </div>
          </section>

          {/* When to Choose */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">When to Choose What</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Choose Temporal when:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You want managed cloud (Temporal Cloud)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>US data residency is acceptable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You need the mature ecosystem and community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Enterprise support contracts are required</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Choose Flovyn when:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>European data sovereignty is required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You want standard infrastructure (Postgres + NATS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Your team already operates Postgres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You need SQL-queryable workflow state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Self-hosted with full control is preferred</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* API Similarity */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Similar Developer Experience</h2>
            <p className="text-muted-foreground mb-6">
              If you know Temporal's programming model, Flovyn will feel familiar. The core concepts are the same:
              workflows, activities/tasks, signals, timers, and deterministic execution.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { temporal: "Workflow", flovyn: "Workflow", desc: "Long-running orchestration" },
                { temporal: "Activity", flovyn: "Task", desc: "Side effects with retries" },
                { temporal: "Signal", flovyn: "Promise", desc: "External events" },
                { temporal: "Timer", flovyn: "Sleep", desc: "Durable delays" },
                { temporal: "Query", flovyn: "State", desc: "Read current state" },
                { temporal: "Side Effect", flovyn: "Run", desc: "Non-deterministic ops" },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">{item.desc}</div>
                  <div className="font-mono text-sm">
                    <span className="text-muted-foreground">{item.temporal}</span>
                    <span className="text-muted-foreground/50 mx-2">→</span>
                    <span className="text-primary">{item.flovyn}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
