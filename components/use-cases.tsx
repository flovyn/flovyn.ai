import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const useCases = [
  {
    category: "E-commerce",
    title: "Order Processing with Automatic Compensation",
    description:
      "Process orders across payment, inventory, and fulfillment with automatic compensation on failures. If delivery fails after payment, Flovyn automatically triggers refunds and inventory restoration.",
    tags: ["Saga Pattern", "Compensation", "Distributed Transactions"],
  },
  {
    category: "Billing",
    title: "Subscription Billing with Payment Recovery",
    description:
      "Handle failed payments with scheduled retries, notification escalation, and support team handoff. Ensures reminders aren't duplicated and maintains exact billing state for compliance.",
    tags: ["Retry Logic", "State Management", "Audit Trail"],
  },
  {
    category: "AI Agents",
    title: "Multi-step Research Agents",
    description:
      "Agent loops that search web, analyze results, decide next steps, and compile reports. If the agent crashes mid-research, Flovyn resumes exactly where it left off without losing context.",
    tags: ["AI Execution", "State Persistence", "Time-travel Debug"],
  },
  {
    category: "Integration",
    title: "Webhook Processing",
    description:
      "Receive webhooks from payment providers, validate signatures, enrich with database context, update downstream systems. Guarantees exactly-once processing despite webhook retries.",
    tags: ["Exactly-once", "Deduplication", "Event Processing"],
  },
  {
    category: "Batch",
    title: "Batch Processing with Fan-out/Fan-in",
    description:
      "Process thousands of documents in parallel (OCR, ML inference, validation), aggregate results, handle partial failures by retrying specific items.",
    tags: ["Parallel Execution", "Partial Failure", "Aggregation"],
  },
  {
    category: "Enterprise",
    title: "Multi-tenant Workflows",
    description:
      "Build SaaS products with complete tenant isolation, quota enforcement, rate limiting, and team-based access control. Built-in multi-tenancy and RBAC.",
    tags: ["Multi-tenancy", "RBAC", "Quotas"],
  },
]

export function UseCases() {
  return (
    <section id="use-cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">What You Can Build</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flovyn handles the complexity of distributed workflows so you can focus on business logic
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, i) => (
            <Card key={i} className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {useCase.category}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{useCase.description}</p>
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent-foreground border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
