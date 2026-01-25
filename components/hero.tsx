"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Sparkles } from "lucide-react"
import { TabbedCodeBlock } from "./code-block"

const workflowExamples = [
  {
    language: "python" as const,
    label: "Python",
    filename: "order_workflow.py",
    code: `@workflow(name="order-processing", cancellable=True)
class OrderWorkflow:
    async def run(self, ctx: WorkflowContext, input: OrderInput) -> OrderOutput:
        # Schedule payment task
        payment = await ctx.execute_task(PaymentTask, input.payment_details)
        await ctx.check_cancellation()

        # Schedule inventory task
        inventory = await ctx.execute_task(InventoryTask, input.items)
        if inventory.out_of_stock:
            await ctx.run("refund", lambda: refund_payment(payment.transaction_id))
            raise NonRetryableError("Inventory unavailable")

        return OrderOutput(order_id=input.order_id, status="completed")`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    filename: "orderWorkflow.ts",
    code: `const orderWorkflow = workflow<OrderInput, OrderOutput>({
  name: "order-processing",
  cancellable: true,

  async run(ctx, input) {
    // Schedule payment task
    const payment = await ctx.task(paymentTask, input.paymentDetails);
    ctx.checkCancellation();

    // Schedule inventory task
    const inventory = await ctx.task(inventoryTask, input.items);
    if (inventory.outOfStock) {
      await ctx.run("refund", () => refundPayment(payment.transactionId));
      throw new NonRetryableError("Inventory unavailable");
    }

    return { orderId: input.orderId, status: "completed" };
  },
});`,
  },
  {
    language: "kotlin" as const,
    label: "Kotlin",
    filename: "OrderWorkflow.kt",
    code: `class OrderWorkflow : WorkflowDefinition<OrderInput, OrderOutput>() {
    override val kind = "order-processing"
    override val cancellable = true

    override suspend fun execute(ctx: WorkflowContext, input: OrderInput): OrderOutput {
        // Schedule payment task
        val payment = ctx.schedule<PaymentResult>("payment-task", input.paymentDetails)
        ctx.checkCancellation()

        // Schedule inventory task
        val inventory = ctx.schedule<InventoryResult>("inventory-task", input.items)
        if (inventory.outOfStock) {
            ctx.run("refund") { refundPayment(payment.transactionId) }
            throw NonRetryableException("Inventory unavailable")
        }

        return OrderOutput(orderId = input.orderId, status = "completed")
    }
}`,
  },
  {
    language: "rust" as const,
    label: "Rust",
    filename: "order_workflow.rs",
    code: `pub struct OrderWorkflow;

#[async_trait]
impl WorkflowDefinition for OrderWorkflow {
    type Input = OrderInput;
    type Output = OrderOutput;

    fn kind(&self) -> &str { "order-processing" }
    fn cancellable(&self) -> bool { true }

    async fn execute(&self, ctx: &dyn WorkflowContext, input: Self::Input) -> Result<Self::Output> {
        // Schedule payment task
        let payment: PaymentResult = ctx.schedule(PaymentTask, &input.payment_details).await?;
        ctx.check_cancellation().await?;

        // Schedule inventory task
        let inventory: InventoryResult = ctx.schedule(InventoryTask, &input.items).await?;
        if inventory.out_of_stock {
            ctx.run("refund", || refund_payment(&payment.transaction_id)).await?;
            return Err(NonRetryableError::new("Inventory unavailable"));
        }

        Ok(OrderOutput { order_id: input.order_id, status: "completed".into() })
    }
}`,
  },
]

export function Hero() {
  return (
    <section className="hero-gradient grid-pattern pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-medium">Event sourcing + deterministic replay</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
            <span className="text-foreground">The </span>
            <span className="gradient-text">resilient execution</span>
            <span className="text-foreground"> platform</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Workflow orchestration built on event sourcing. Start code-first, extend to visual workflows, run AI agents reliably.
          </p>

          {/* SDK Badges */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="sdk-badge sdk-python">
              <span>🐍</span> Python
            </span>
            <span className="sdk-badge sdk-typescript">
              <span>💠</span> TypeScript
            </span>
            <span className="sdk-badge sdk-kotlin">
              <span>🟣</span> Kotlin
            </span>
            <span className="sdk-badge sdk-rust">
              <span>🦀</span> Rust
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-border hover:bg-secondary" asChild>
              <a href="https://github.com/flovyn/flovyn-server" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>

          {/* Code Example */}
          <div className="pt-12 text-left max-w-4xl mx-auto">
            <TabbedCodeBlock tabs={workflowExamples} />
          </div>
        </div>
      </div>
    </section>
  )
}
