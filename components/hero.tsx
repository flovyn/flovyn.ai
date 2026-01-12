import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal, Github } from "lucide-react"
import { CodeBlock } from "./code-block"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent-foreground">
            <Terminal className="h-3.5 w-3.5" />
            Event sourcing + deterministic replay
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            The resilient execution platform
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Workflow orchestration built on event sourcing. Start code-first, extend to visual workflows, run AI agents
            reliably.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <a href="https://github.com/flovyn/flovyn-server" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>

          <div className="pt-8 text-left">
            <div className="rounded-lg border border-border bg-card p-4 sm:p-6 max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground ml-2">OrderWorkflow.kt</span>
              </div>
              <CodeBlock
                code={`class OrderWorkflow : WorkflowDefinition<OrderInput, OrderOutput>() {
    override val kind = "order-processing"
    override val name = "Order Processing"
    override val cancellable = true

    override suspend fun execute(ctx: WorkflowContext, input: OrderInput): OrderOutput {
        val payment = ctx.schedule<PaymentResult>("payment-task", input.paymentDetails)
        ctx.checkCancellation()

        val inventory = ctx.schedule<InventoryResult>("inventory-task", input.items)
        if (inventory.outOfStock) {
            ctx.run("refund") { refundPayment(payment.transactionId) }
            throw NonRetryableException("Inventory unavailable")
        }

        return OrderOutput(orderId = input.orderId, status = "completed")
    }
}`}
                language="kotlin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
