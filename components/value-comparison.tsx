import { X, Check } from "lucide-react"

const comparisons = [
  {
    without: "Manual retry loops with exponential backoff",
    with: "ctx.schedule() with automatic retries",
  },
  {
    without: "Database polling for timeouts",
    with: "ctx.sleep(Duration.hours(1))",
  },
  {
    without: "Custom state serialization",
    with: "ctx.setState('key', value)",
  },
  {
    without: "Distributed transaction coordination",
    with: "Saga pattern with ctx.run() compensation",
  },
  {
    without: "Random UUID breaks replay",
    with: "ctx.randomUUID() deterministic on replay",
  },
]

export function ValueComparison() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Why Flovyn?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop reinventing distributed systems primitives. Focus on business logic.
          </p>
        </div>

        <div className="feature-card overflow-hidden p-0">
          <div className="grid md:grid-cols-2">
            <div className="bg-destructive/5 p-6 border-b md:border-b-0 md:border-r border-border">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="h-4 w-4 text-destructive" />
                </div>
                Without Flovyn
              </h3>
              <ul className="space-y-4">
                {comparisons.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed pl-10">
                    {item.without}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-success/5 p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-success" />
                </div>
                With Flovyn
              </h3>
              <ul className="space-y-4">
                {comparisons.map((item, i) => (
                  <li key={i} className="text-sm font-mono text-foreground leading-relaxed pl-10">
                    {item.with}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
