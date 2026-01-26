import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, CheckCircle2, Database, HardDrive, Globe, Search } from "lucide-react"
import Link from "next/link"

export default function VsRestatePage() {
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
            <h1 className="text-4xl font-bold mb-4 text-balance">Flovyn vs Restate</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Both offer durable execution with a focus on simplicity. The difference is in storage architecture.
            </p>
          </div>

          {/* Core Difference */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Storage Architecture</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Restate uses a custom Raft-based distributed log with RocksDB. Flovyn uses PostgreSQL and NATS—infrastructure
              your team already knows.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Restate</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <HardDrive className="h-5 w-5 mt-0.5 text-muted-foreground/50" />
                    <span>Custom Raft-based distributed log for durability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Database className="h-5 w-5 mt-0.5 text-muted-foreground/50" />
                    <span>RocksDB for indexing and state storage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Search className="h-5 w-5 mt-0.5 text-muted-foreground/50" />
                    <span>PostgreSQL-compatible query endpoint (read-only)</span>
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
                    <span>PostgreSQL for durability, state, and queries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <HardDrive className="h-5 w-5 mt-0.5 text-emerald-500" />
                    <span>NATS for high-performance task distribution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Search className="h-5 w-5 mt-0.5 text-emerald-500" />
                    <span>Full SQL access—read and write with standard tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Standard Infrastructure */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Standard Infrastructure Matters</h2>
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Database className="h-5 w-5 text-emerald-500" />
                  Operational Knowledge
                </h3>
                <p className="text-muted-foreground">
                  Your team knows how to operate PostgreSQL. Backup strategies, monitoring, scaling, failover—it's all
                  documented and practiced. With a custom storage engine, you're learning new failure modes at 3am.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Search className="h-5 w-5 text-emerald-500" />
                  Debugging with SQL
                </h3>
                <p className="text-muted-foreground">
                  When something goes wrong, you can query workflow state with SQL. Find stuck workflows, analyze patterns,
                  export data for analysis. No special tools or APIs required.
                </p>
                <div className="mt-4 bg-secondary/30 rounded-lg p-4 font-mono text-sm">
                  <code className="text-muted-foreground">
                    SELECT * FROM workflows WHERE status = 'stuck' AND created_at &lt; now() - interval '1 hour';
                  </code>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-emerald-500" />
                  Ecosystem Integration
                </h3>
                <p className="text-muted-foreground">
                  PostgreSQL integrates with everything. Existing data pipelines, BI tools, audit systems, backup
                  solutions—they all work out of the box. No adapters or custom integrations needed.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Aspect</th>
                    <th className="text-left py-4 px-4 font-semibold">Restate</th>
                    <th className="text-left py-4 px-4 font-semibold">Flovyn</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Durability", "Custom Raft log", "PostgreSQL"],
                    ["State storage", "RocksDB", "PostgreSQL"],
                    ["Messaging", "Built-in", "NATS"],
                    ["Query interface", "PostgreSQL-compatible (read-only)", "Native PostgreSQL (full access)"],
                    ["Backup", "Custom tooling", "pg_dump, standard Postgres backups"],
                    ["Deployment", "Single binary", "Single binary + Postgres + NATS"],
                    ["Language", "Rust", "Rust"],
                    ["European origin", "Yes (Germany)", "Yes"],
                    ["SDK languages", "TypeScript, Java, Python, Go, Kotlin, Rust", "Python, TypeScript, Kotlin, Rust"],
                  ].map(([aspect, restate, flovyn], i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{aspect}</td>
                      <td className="py-4 px-4 text-muted-foreground">{restate}</td>
                      <td className="py-4 px-4 text-muted-foreground">{flovyn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Similarities */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">What We Have in Common</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Built with Rust for performance and safety",
                "Durable execution with automatic recovery",
                "Code-first workflows (no YAML/JSON)",
                "European company and origin",
                "Self-hosted first approach",
                "Focus on developer experience",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-lg p-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* When to Choose */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">When to Choose What</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Choose Restate when:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You want zero external dependencies (single binary)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You need Go SDK support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You prefer Restate Cloud managed service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>The Apache Flink team pedigree matters</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Choose Flovyn when:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You want standard infrastructure (Postgres + NATS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Your team already operates PostgreSQL</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You need full SQL access to workflow state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Existing Postgres tooling integration is important</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You prefer familiar operational patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Honest Assessment */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Honest Assessment</h2>
            <div className="bg-secondary/30 border border-border rounded-xl p-8">
              <p className="text-muted-foreground mb-4">
                Restate is an excellent project built by experienced distributed systems engineers. Their custom storage
                approach has technical merits—the Raft-based log provides strong consistency guarantees and the single
                binary deployment is genuinely simpler for getting started.
              </p>
              <p className="text-muted-foreground">
                Flovyn's bet is that operational familiarity matters more than deployment simplicity for production
                workloads. When things go wrong at 3am, your team's existing PostgreSQL knowledge is more valuable than
                learning a new storage engine's failure modes.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
