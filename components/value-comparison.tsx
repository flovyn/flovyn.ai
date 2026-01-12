import { Card } from "@/components/ui/card"
import { X, Check } from "lucide-react"

const comparisons = [
  {
    without: "Manual retry loops with exponential backoff",
    with: "ctx.schedule() with automatic retries",
  },
  {
    without: "Database polling for timeouts",
    with: "ctx.sleep(Duration.ofDays(7))",
  },
  {
    without: "Custom state serialization",
    with: "ctx.set('key', value) / ctx.get('key')",
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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Why Flovyn?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop reinventing distributed systems primitives. Focus on business logic.
          </p>
        </div>

        <Card className="overflow-hidden border-border">
          <div className="grid md:grid-cols-2">
            <div className="bg-muted/40 p-6 border-b md:border-b-0 md:border-r border-border">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <X className="h-5 w-5 text-red-500" />
                Without Flovyn
              </h3>
              <ul className="space-y-4">
                {comparisons.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {item.without}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                With Flovyn
              </h3>
              <ul className="space-y-4">
                {comparisons.map((item, i) => (
                  <li key={i} className="text-sm font-mono text-foreground leading-relaxed">
                    {item.with}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
