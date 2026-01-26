"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import { TabbedCodeBlock } from "./code-block"
import { PythonIcon, TypeScriptIcon, KotlinIcon, RustIcon } from "./language-icons"
import { EUFlag } from "./eu-flag"

const workflowExamples = [
  {
    language: "python" as const,
    label: "Python",
    filename: "order_workflow.py",
    code: `@workflow(name="order-processing")
class OrderWorkflow:
    async def run(self, ctx: WorkflowContext, input: OrderInput) -> OrderOutput:
        # Schedule payment task (string-based task reference)
        payment = await ctx.execute_task("payment-task", {
            "amount": input.amount,
            "currency": input.currency
        })

        # Schedule inventory task
        inventory = await ctx.execute_task("inventory-task", {"items": input.items})
        if inventory["out_of_stock"]:
            await ctx.run("refund", lambda: refund_payment(payment["transaction_id"]))
            raise NonRetryableError("Inventory unavailable")

        return OrderOutput(order_id=input.order_id, status="completed")`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    filename: "orderWorkflow.ts",
    code: `const orderWorkflow = workflow<OrderInput, OrderOutput>({
  name: "order-processing",

  async run(ctx, input) {
    // Schedule payment task (typed task reference)
    const payment = await ctx.task(paymentTask, {
      amount: input.amount,
      currency: input.currency,
    });

    // Schedule inventory task
    const inventory = await ctx.task(inventoryTask, { items: input.items });
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

    override suspend fun execute(ctx: WorkflowContext, input: OrderInput): OrderOutput {
        // Schedule payment task (string-based task kind)
        val payment = ctx.schedule<PaymentResult>(
            kind = "payment-task",
            input = PaymentInput(input.amount, input.currency)
        )

        // Schedule inventory task
        val inventory = ctx.schedule<InventoryResult>(
            kind = "inventory-task",
            input = InventoryInput(input.items)
        )
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

    async fn execute(&self, ctx: &dyn WorkflowContext, input: Self::Input) -> Result<Self::Output> {
        // Schedule payment task (JSON-based with string kind)
        let payment_input = serde_json::to_value(&PaymentInput::from(&input))?;
        let payment_result = ctx.schedule_raw("payment-task", payment_input).await?;
        let payment: PaymentResult = serde_json::from_value(payment_result)?;

        // Schedule inventory task
        let inventory_input = serde_json::to_value(&input.items)?;
        let inventory_result = ctx.schedule_raw("inventory-task", inventory_input).await?;
        let inventory: InventoryResult = serde_json::from_value(inventory_result)?;

        if inventory.out_of_stock {
            let refund = serde_json::to_value(&payment.transaction_id)?;
            ctx.run_raw("refund", refund).await?;
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
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm" style={{ backgroundColor: '#003399', color: '#FFCC00' }}>
            <EUFlag className="h-5 w-7" />
            <span className="font-medium">European. Self-hosted. Runs on PostgreSQL.</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
            <span className="text-foreground">Your workflows. </span>
            <span className="gradient-text">Your infrastructure.</span>
            <span className="text-foreground"> Your data.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Durable execution for workflows and AI agents. Self-hosted on PostgreSQL and NATS—no US cloud dependency.
          </p>

          {/* SDK Badges */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="sdk-badge sdk-python">
              <PythonIcon className="h-4 w-4" /> Python
            </span>
            <span className="sdk-badge sdk-typescript">
              <TypeScriptIcon className="h-4 w-4" /> TypeScript
            </span>
            <span className="sdk-badge sdk-kotlin">
              <KotlinIcon className="h-4 w-4" /> Kotlin
            </span>
            <span className="sdk-badge sdk-rust">
              <RustIcon className="h-4 w-4" /> Rust
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
