import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CodeBlock } from "@/components/code-block"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"

export default function VsCeleryPage() {
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
            <h1 className="text-4xl font-bold mb-4 text-balance">Flovyn vs Celery</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Celery is a distributed task queue. Flovyn is a workflow orchestration platform with event sourcing. They
              solve different problems.
            </p>
          </div>

          {/* Core Difference */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Core Difference</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-orange-500" />
                  Celery
                </h3>
                <p className="text-muted-foreground">Fire tasks, hope they complete, manually handle failures.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Flovyn
                </h3>
                <p className="text-muted-foreground">
                  Define workflows as code, the platform guarantees completion with full history.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Sections */}
          <section className="space-y-16">
            <ComparisonSection
              title="Simple Task Execution"
              celeryCode={`@celery.task(bind=True, max_retries=3)
def process_payment(self, order_id, amount):
    try:
        result = payment_gateway.charge(amount)
        return result
    except PaymentError as e:
        self.retry(exc=e, countdown=60)`}
              flovynCode={`@dataclass
class OrderInput:
    order_id: str
    amount: float

class OrderWorkflow(WorkflowDefinition[OrderInput, PaymentResult]):
    kind = "order-workflow"

    async def execute(self, ctx: WorkflowContext, input: OrderInput) -> PaymentResult:
        # Automatic retries, result cached on replay
        return await ctx.schedule("process-payment", {"order_id": input.order_id, "amount": input.amount})`}
            />

            <ComparisonSection
              title="Multi-Step Process"
              celeryLabel="Chain tasks, hope nothing fails in between"
              flovynLabel="Single workflow with automatic compensation"
              celeryCode={`@celery.task
def charge_payment(order_id, amount):
    return payment_gateway.charge(amount)

@celery.task
def reserve_inventory(order_id, items):
    return inventory_service.reserve(items)

@celery.task
def create_shipment(order_id, address):
    return shipping_service.create(address)

# Orchestration via chains - no compensation on failure
chain = (
    charge_payment.s(order_id, amount) |
    reserve_inventory.s(order_id, items) |
    create_shipment.s(order_id, address)
)
chain.apply_async()

# What if create_shipment fails after payment succeeded?
# You need separate error handling, dead letter queues, manual intervention`}
              flovynCode={`class OrderWorkflow(WorkflowDefinition[OrderInput, OrderResult]):
    kind = "order-workflow"

    async def execute(self, ctx: WorkflowContext, input: OrderInput) -> OrderResult:
        # Step 1: Payment
        payment = await ctx.schedule("charge-payment", input.payment_details)

        # Step 2: Inventory
        inventory = await ctx.schedule("reserve-inventory", input.items)
        if inventory["status"] == "failed":
            # Compensate: refund payment
            await ctx.run("refund", lambda: refund_payment(payment["transaction_id"]))
            raise NonRetryableError("Inventory unavailable")

        # Step 3: Shipment
        try:
            shipment = await ctx.schedule("create-shipment", input.shipping_address)
        except Exception:
            # Compensate: release inventory, refund payment
            await ctx.run("release", lambda: release_inventory(inventory["reservation_id"]))
            await ctx.run("refund", lambda: refund_payment(payment["transaction_id"]))
            raise

        return OrderResult(status="completed", tracking_number=shipment["tracking_number"])
`}
            />

            <ComparisonSection
              title="Waiting for External Events"
              celeryLabel="Poll database, manage state manually"
              flovynLabel="Durable promises, sleep for days"
              celeryCode={`@celery.task
def wait_for_approval(request_id):
    # Poll database every minute for 7 days
    for _ in range(10080):  # 7 days * 24 hours * 60 minutes
        approval = db.get_approval(request_id)
        if approval:
            return approval
        time.sleep(60)
    return {"status": "timeout"}

# Problems:
# - Worker tied up polling for days
# - Server restart loses progress
# - No way to know current state`}
              flovynCode={`class ApprovalWorkflow(WorkflowDefinition[ApprovalRequest, ApprovalResult]):
    kind = "approval-workflow"

    async def execute(self, ctx: WorkflowContext, input: ApprovalRequest) -> ApprovalResult:
        await ctx.run("send-request", lambda: send_approval_request(input))

        # Wait up to 7 days - worker is NOT blocked
        manager_approval = await ctx.promise("manager-approval", timeout=timedelta(days=7))

        try:
            approval = await manager_approval.wait()
        except TimeoutError:
            await ctx.run("escalate", lambda: escalate_to_director(input))
            approval = await ctx.promise("director-approval", timeout=timedelta(days=3)).wait()

        return ApprovalResult(approved=True, approver=approval["approver_id"])

# External system calls: POST /workflows/{id}/signals/manager-approval
# Workflow resumes exactly where it left off
`}
            />

            <ComparisonSection
              title="Scheduled Retries with Backoff"
              celeryLabel="Manual retry state management"
              flovynLabel="State preserved across restarts"
              celeryCode={`@celery.task(bind=True)
def sync_with_api(self, resource_id):
    try:
        return api_client.sync(resource_id)
    except RateLimitError:
        # Retry with exponential backoff
        retry_count = self.request.retries
        countdown = min(2 ** retry_count * 60, 3600)  # Max 1 hour
        self.retry(countdown=countdown, max_retries=10)

# Problems:
# - Retry count lost on worker restart
# - No visibility into retry history
# - Hard to debug failed syncs`}
              flovynCode={`class SyncWorkflow(WorkflowDefinition[SyncInput, SyncResult]):
    kind = "sync-workflow"

    async def execute(self, ctx: WorkflowContext, input: SyncInput) -> SyncResult:
        max_retries = 10

        for attempt in range(max_retries):
            await ctx.set("attempt", attempt + 1)

            try:
                return await ctx.schedule("api-sync", input)
            except RateLimitError:
                delay = min(2 ** attempt * 60, 3600)
                await ctx.sleep(timedelta(seconds=delay))

        raise NonRetryableError(f"Failed after {max_retries} attempts")

# Server can restart mid-sleep - workflow resumes at correct point
# Full history: see every attempt, every delay, every error
`}
            />

            <ComparisonSection
              title="Parallel Execution with Aggregation"
              celeryLabel="Chord pattern, complex error handling"
              flovynLabel="Async execution with partial failure handling"
              celeryCode={`@celery.task
def process_document(doc_id):
    return ocr_service.process(doc_id)

@celery.task
def aggregate_results(results):
    return {"processed": len(results), "results": results}

# Fan-out/fan-in with chord
chord(
    [process_document.s(doc_id) for doc_id in document_ids],
    aggregate_results.s()
).apply_async()

# Problems:
# - One failure can break entire chord
# - Partial results lost
# - No way to retry specific documents`}
              flovynCode={`@dataclass
class BatchInput:
    document_ids: list[str]

@dataclass
class BatchResult:
    processed: int
    failed: int
    results: list[dict]
    failures: list[dict]

class BatchProcessWorkflow(WorkflowDefinition[BatchInput, BatchResult]):
    kind = "batch-process"

    async def execute(self, ctx: WorkflowContext, input: BatchInput) -> BatchResult:
        # Fan-out: schedule all in parallel
        tasks = [
            await ctx.schedule_async("process-document", {"doc_id": doc_id})
            for doc_id in input.document_ids
        ]

        # Fan-in: collect results, handle partial failures
        results = []
        failures = []

        for i, task in enumerate(tasks):
            try:
                result = await task
                results.append(result)
            except Exception as e:
                failures.append({"doc_id": input.document_ids[i], "error": str(e)})

        return BatchResult(
            processed=len(results),
            failed=len(failures),
            results=results,
            failures=failures
        )

# Partial failures don't break the workflow
# Can retry individual documents by re-running workflow
# Full audit trail of what succeeded and what failed
`}
            />
          </section>

          {/* Feature Comparison Table */}
          <section className="mt-16 mb-16">
            <h2 className="text-3xl font-bold mb-6">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-left py-4 px-4 font-semibold">Celery</th>
                    <th className="text-left py-4 px-4 font-semibold">Flovyn</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ["Task execution", "Yes", "Yes"],
                    ["Automatic retries", "Yes (per-task)", "Yes (per-task and workflow-level)"],
                    ["State persistence", "No (use Redis/DB manually)", "Yes (event sourcing)"],
                    ["Long-running waits", "Blocks worker", "Durable sleep (no worker blocked)"],
                    ["External signals", "Manual polling", "Durable promises"],
                    ["Workflow history", "Logs only", "Complete event history"],
                    ["Replay/debug", "No", "Yes (time-travel debugging)"],
                    ["Compensation (saga)", "Manual", "Built-in pattern"],
                    ["Server restart", "Tasks may be lost", "Workflows resume exactly"],
                    ["Multi-step orchestration", "Chains/chords (fragile)", "Native workflow code"],
                  ].map(([feature, celery, flovyn], i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{feature}</td>
                      <td className="py-4 px-4 text-muted-foreground">{celery}</td>
                      <td className="py-4 px-4 text-muted-foreground">{flovyn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* When to Use What */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">When to Use What</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Use Celery when:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Simple fire-and-forget tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>No need for multi-step coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>State doesn't matter (idempotent operations)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>You already have Celery infrastructure</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Use Flovyn when:</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Multi-step business processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Need compensation/rollback on failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Long-running workflows (hours/days/weeks)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Audit trail required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>External system coordination (webhooks, approvals)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground mt-1">•</span>
                    <span>Debugging production issues matters</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Migration Path */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Migration Path</h2>
            <p className="text-muted-foreground mb-6">Flovyn tasks can wrap existing Celery tasks:</p>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-4 py-2 border-b border-border">
                <span className="text-xs font-mono text-muted-foreground">migration.py</span>
              </div>
              <div className="p-6">
                <CodeBlock
                  code={`# Existing Celery task
@celery.task
def legacy_process(data):
    return process_data(data)

# Flovyn task that calls Celery
class LegacyProcessTask(Task):
    type = "legacy-process"

    async def execute(self, input: dict, context: TaskContext) -> dict:
        # Call existing Celery task synchronously
        result = legacy_process.delay(input["data"]).get()
        return result

# Orchestrate with Flovyn, execute with Celery
class MigrationWorkflow(WorkflowDefinition):
    async def execute(self, ctx: WorkflowContext, input: dict):
        # Step 1: Use existing Celery task
        legacy_result = await ctx.schedule("legacy-process", input)

        # Step 2: New Flovyn-native task
        new_result = await ctx.schedule("new-process", legacy_result)

        return new_result`}
                  language="python"
                  filename="migration.py"
                />
              </div>
            </div>
            <p className="text-muted-foreground mt-4">
              Migrate incrementally: wrap existing tasks, add new tasks natively, gain workflow orchestration
              immediately.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function ComparisonSection({
  title,
  celeryLabel,
  flovynLabel,
  celeryCode,
  flovynCode,
}: {
  title: string
  celeryLabel?: string
  flovynLabel?: string
  celeryCode: string
  flovynCode: string
}) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-lg font-semibold">Celery</h4>
            {celeryLabel && <span className="text-xs text-muted-foreground">- {celeryLabel}</span>}
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-6">
              <CodeBlock code={celeryCode} language="python" filename="celery_example.py" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-lg font-semibold">Flovyn</h4>
            {flovynLabel && <span className="text-xs text-muted-foreground">- {flovynLabel}</span>}
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-6">
              <CodeBlock code={flovynCode} language="python" filename="flovyn_example.py" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
