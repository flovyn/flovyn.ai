import { Flag, Server, Box, Database } from "lucide-react"

const benefits = [
  {
    icon: Flag,
    title: "European Sovereignty",
    description: "Designed and built in Europe. Your data stays under your control, on your infrastructure.",
  },
  {
    icon: Server,
    title: "Self-Hosted First",
    description: "No mandatory cloud dependencies. Run on your own servers in any EU data center.",
  },
  {
    icon: Box,
    title: "Single Binary",
    description: "One executable + PostgreSQL. No JVM, no containers required, no complex setup.",
  },
  {
    icon: Database,
    title: "Minimal Infrastructure",
    description: "PostgreSQL is the only dependency. Start on a single server, scale as you grow.",
  },
]

export function EuropeanSolution() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm text-blue-400">
            <span>🇪🇺</span>
            <span className="font-medium">Made in Europe</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            A European alternative
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Full data sovereignty with self-hosted infrastructure. No US cloud lock-in.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="feature-card text-center">
              <div className="feature-card-icon mx-auto !bg-blue-500/10 !text-blue-400">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 text-center">
          <p className="text-muted-foreground">
            <span className="font-medium text-foreground">GDPR-friendly by design.</span>{" "}
            Unlike workflow platforms hosted exclusively on US clouds, Flovyn gives you full control over where your data lives.
          </p>
        </div>
      </div>
    </section>
  )
}
