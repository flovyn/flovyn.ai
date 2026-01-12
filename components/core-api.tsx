import { Card } from "@/components/ui/card"
import { CodeBlock } from "./code-block"

export function CoreAPI() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Simple, Powerful API</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The WorkflowContext API gives you everything you need for reliable execution
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4">Side Effects & Tasks</h3>
            <CodeBlock
              code={`// Side effects - cached on replay
val result = ctx.run("fetch-data") { 
    httpClient.get(url) 
}

// Long-running tasks - delegated
val payment = ctx.schedule<PaymentResponse>(
    "payment-task", 
    input
)`}
              language="kotlin"
            />
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4">Deterministic Operations</h3>
            <CodeBlock
              code={`// Deterministic - same value on replay
val id = ctx.randomUUID()
val now = ctx.currentTimeMillis()
val delay = ctx.random().nextInt(1000, 5000)
`}
              language="kotlin"
            />
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4">Durable State</h3>
            <CodeBlock
              code={`// Persisted across restarts
ctx.set("status", "processing")
val status = ctx.get<String>("status")
`}
              language="kotlin"
            />
          </Card>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4">Timers & Signals</h3>
            <CodeBlock
              code={`// Durable timers and signals
ctx.sleep(Duration.ofHours(1))
val signal = ctx.promise<ApprovalResult>(
    "manager-approval"
)`}
              language="kotlin"
            />
          </Card>
        </div>
      </div>
    </section>
  )
}
