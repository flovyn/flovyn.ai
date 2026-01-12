import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CodeBlock } from "@/components/code-block"
import { CheckCircle2, XCircle } from "lucide-react"

export default function VsJavaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Flovyn vs Java Ecosystem</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Common Java approaches for workflow orchestration: Spring Batch, Quartz Scheduler, Camunda/Flowable BPMN,
              or manual state management. Flovyn provides durable execution without the complexity.
            </p>
          </div>

          {/* Quick Summary */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Quick Summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Tool</th>
                    <th className="text-left py-3 px-4 font-semibold">Best For</th>
                    <th className="text-left py-3 px-4 font-semibold">Limitation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Spring Batch</td>
                    <td className="py-3 px-4">ETL, batch jobs</td>
                    <td className="py-3 px-4 text-muted-foreground">No long-running workflows</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Quartz</td>
                    <td className="py-3 px-4">Scheduled jobs</td>
                    <td className="py-3 px-4 text-muted-foreground">No state between runs</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Camunda/Flowable</td>
                    <td className="py-3 px-4">BPMN diagrams</td>
                    <td className="py-3 px-4 text-muted-foreground">XML/diagram-driven, heavyweight</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Spring + DB</td>
                    <td className="py-3 px-4">Custom workflows</td>
                    <td className="py-3 px-4 text-muted-foreground">You build everything yourself</td>
                  </tr>
                  <tr className="bg-accent/10 border-b border-border/50">
                    <td className="py-3 px-4 font-semibold">Flovyn</td>
                    <td className="py-3 px-4">Durable workflows</td>
                    <td className="py-3 px-4 text-muted-foreground">Code-first, event sourcing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Spring Batch Comparison */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Spring Batch Comparison</h2>
            <p className="text-muted-foreground mb-8">
              Spring Batch is designed for batch processing (read → process → write). Not for multi-step business
              workflows.
            </p>

            <h3 className="text-xl font-semibold mb-4">Batch Processing</h3>
            <div className="grid gap-8 lg:grid-cols-2 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-muted-foreground">Spring Batch</h4>
                <CodeBlock
                  code={`@Configuration
public class BatchConfig {
    @Bean
    public Job importJob(JobRepository repo, Step step1, Step step2) {
        return new JobBuilder("importJob", repo)
            .start(step1)
            .next(step2)
            .build();
    }

    @Bean
    public Step step1(JobRepository repo, PlatformTransactionManager tx) {
        return new StepBuilder("step1", repo)
            .<Input, Output>chunk(100, tx)
            .reader(reader())
            .processor(processor())
            .writer(writer())
            .faultTolerant()
            .retryLimit(3)
            .retry(TransientException.class)
            .build();
    }
}
// Lots of configuration, rigid chunk-based model`}
                  language="java"
                  filename="BatchConfig.java"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-accent">Flovyn</h4>
                <CodeBlock
                  code={`class ImportWorkflow : WorkflowDefinition<ImportInput, ImportResult>() {
    override val kind = "import-job"
    override val name = "Import Job"

    override suspend fun execute(ctx: WorkflowContext, input: ImportInput): ImportResult {
        val records = ctx.run("read-records") { readFromSource(input.source) }

        val processed = records.mapIndexed { i, record ->
            ctx.run("process-\$i") { transform(record) }
        }

        ctx.run("write-results") { writeToDestination(processed) }

        return ImportResult(processed.size)
    }
}`}
                  language="kotlin"
                  filename="ImportWorkflow.kt"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Where Spring Batch Falls Short</h3>
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <CodeBlock
                  code={`// Spring Batch cannot:
// 1. Wait for external approval mid-job
// 2. Sleep for days then resume
// 3. Handle webhooks triggering next steps
// 4. Coordinate with external services with compensation`}
                  language="java"
                  filename="Limitations.java"
                />
              </div>

              <div>
                <CodeBlock
                  code={`class DataReviewWorkflow : WorkflowDefinition<ReviewInput, ReviewResult>() {
    override val kind = "data-review"

    override suspend fun execute(ctx: WorkflowContext, input: ReviewInput): ReviewResult {
        val imported = ctx.run("import") { importData(input) }

        // Wait for manual review (days/weeks) - worker NOT blocked
        val approval = ctx.promise<Approval>("review-approval", timeout = Duration.ofDays(7))

        val decision = try {
            approval.await()
        } catch (e: TimeoutException) {
            null
        }

        if (decision?.approved == true) {
            ctx.run("publish") { publishData(imported) }
        } else {
            ctx.run("archive") { archiveData(imported) }
        }

        return ReviewResult(status = "completed")
    }
}`}
                  language="kotlin"
                  filename="FlexibleWorkflow.kt"
                />
              </div>
            </div>
          </div>

          {/* Quartz Scheduler Comparison */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Quartz Scheduler Comparison</h2>
            <p className="text-muted-foreground mb-8">
              Quartz runs jobs on schedule. No state persistence between runs, no workflow coordination.
            </p>

            <h3 className="text-xl font-semibold mb-4">Scheduled Job</h3>
            <div className="grid gap-8 lg:grid-cols-2 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-muted-foreground">Quartz</h4>
                <CodeBlock
                  code={`public class SyncJob implements Job {
    @Override
    public void execute(JobExecutionContext context) {
        // No state from previous run
        // If this fails, you lose all progress
        List<Record> records = fetchRecords();
        for (Record r : records) {
            syncToExternal(r);  // What if this fails halfway?
        }
    }
}

// Schedule it
Trigger trigger = TriggerBuilder.newTrigger()
    .withSchedule(CronScheduleBuilder.cronSchedule("0 0 * * * ?"))
    .build();
scheduler.scheduleJob(job, trigger);`}
                  language="java"
                  filename="SyncJob.java"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-accent">Flovyn</h4>
                <CodeBlock
                  code={`class SyncWorkflow : WorkflowDefinition<SyncInput, SyncResult>() {
    override val kind = "sync-job"
    override val name = "Sync Job"

    override suspend fun execute(ctx: WorkflowContext, input: SyncInput): SyncResult {
        val records = fetchRecords(input.source)
        var synced = 0

        for ((i, record) in records.withIndex()) {
            ctx.set("progress", "\${i}/\${records.size}")
            ctx.run("sync-\${i}") { syncToExternal(record) }
            synced++
            // Server can restart here - progress preserved
        }

        return SyncResult(synced = synced)
    }
}
// Trigger via schedule, webhook, or API - same workflow
`}
                  language="kotlin"
                  filename="SyncWorkflow.kt"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Retry with State</h3>
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-muted-foreground">Quartz - Manual retry tracking</h4>
                <CodeBlock
                  code={`public class RetryJob implements Job {
    @Autowired
    private RetryStateRepository retryRepo;  // You manage this

    @Override
    public void execute(JobExecutionContext context) {
        String taskId = context.getJobDetail().getKey().getName();
        RetryState state = retryRepo.findById(taskId)
            .orElse(new RetryState(taskId, 0));

        try {
            callExternalApi();
            retryRepo.delete(state);
        } catch (Exception e) {
            state.incrementAttempt();
            state.setLastError(e.getMessage());
            retryRepo.save(state);

            if (state.getAttempts() < 5) {
                // Reschedule with backoff
                long delay = (long) Math.pow(2, state.getAttempts()) * 1000;
                rescheduleJob(taskId, delay);
            } else {
                alertOps("Job failed after 5 attempts");
            }
        }
    }
}
// 50+ lines just for retry logic`}
                  language="java"
                  filename="RetryJob.java"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-accent">Flovyn - Built-in</h4>
                <CodeBlock
                  code={`class ApiCallWorkflow : WorkflowDefinition<ApiInput, ApiResult>() {
    override val kind = "api-call"

    override suspend fun execute(ctx: WorkflowContext, input: ApiInput): ApiResult {
        repeat(5) { attempt ->
            try {
                val response = ctx.schedule<ApiResponse>("call-api", input)
                return ApiResult(response)
            } catch (e: Exception) {
                ctx.set("lastError", e.message)
                val delay = (1L shl attempt) * 1000  // Exponential backoff
                ctx.sleep(Duration.ofMillis(delay))
            }
        }
        throw NonRetryableException("Failed after 5 attempts")
    }
}
// State persisted, survives restarts, full history
`}
                  language="kotlin"
                  filename="RetryWorkflow.kt"
                />
              </div>
            </div>
          </div>

          {/* Camunda/Flowable Comparison */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Camunda/Flowable Comparison</h2>
            <p className="text-muted-foreground mb-8">
              BPMN engines are powerful but heavyweight. XML/diagram-driven, not code-first.
            </p>

            <h3 className="text-xl font-semibold mb-4">Simple Approval Flow</h3>
            <div className="grid gap-8 lg:grid-cols-2 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-muted-foreground">
                  Camunda BPMN - XML + Java delegates
                </h4>
                <CodeBlock
                  code={`<!-- approval-process.bpmn -->
<bpmn:process id="approval" isExecutable="true">
  <bpmn:startEvent id="start"/>
  <bpmn:serviceTask id="sendRequest" 
    camunda:delegateExpression="\${sendRequestDelegate}"/>
  <bpmn:userTask id="managerApproval" 
    camunda:assignee="\${manager}"/>
  <bpmn:exclusiveGateway id="gateway"/>
  <bpmn:serviceTask id="approved" 
    camunda:delegateExpression="\${processApprovalDelegate}"/>
  <bpmn:serviceTask id="rejected" 
    camunda:delegateExpression="\${processRejectionDelegate}"/>
  <bpmn:endEvent id="end"/>
  <!-- Plus all the sequence flows... -->
</bpmn:process>`}
                  language="xml"
                  filename="approval-process.bpmn"
                />
                <div className="mt-4">
                  <CodeBlock
                    code={`@Component("sendRequestDelegate")
public class SendRequestDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution execution) {
        String requestId = (String) execution.getVariable("requestId");
        emailService.sendApprovalRequest(requestId);
    }
}
// One class per task, scattered across codebase`}
                    language="java"
                    filename="SendRequestDelegate.java"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-accent">Flovyn - Single file, readable flow</h4>
                <CodeBlock
                  code={`class ApprovalWorkflow : WorkflowDefinition<ApprovalRequest, ApprovalResult>() {
    override val kind = "approval-process"
    override val name = "Approval Process"

    override suspend fun execute(ctx: WorkflowContext, input: ApprovalRequest): ApprovalResult {
        // Send request
        ctx.run("send-request") {
            emailService.sendApprovalRequest(input.requestId, input.manager)
        }

        // Wait for approval (human task) - worker NOT blocked
        val approvalPromise = ctx.promise<ApprovalDecision>(
            "manager-approval",
            timeout = Duration.ofDays(7)
        )

        val decision = try {
            approvalPromise.await()
        } catch (e: TimeoutException) {
            null
        }

        return when {
            decision == null -> {
                ctx.run("timeout") { notifyTimeout(input) }
                ApprovalResult(status = "timeout")
            }
            decision.approved -> {
                ctx.run("process-approval") { processApproval(input) }
                ApprovalResult(status = "approved")
            }
            else -> {
                ctx.run("process-rejection") { processRejection(input, decision.reason) }
                ApprovalResult(status = "rejected", reason = decision.reason)
            }
        }
    }
}`}
                  language="kotlin"
                  filename="ApprovalWorkflow.kt"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Why Code-First Beats BPMN</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Aspect</th>
                    <th className="text-left py-3 px-4 font-semibold">BPMN (Camunda)</th>
                    <th className="text-left py-3 px-4 font-semibold">Flovyn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Define workflow</td>
                    <td className="py-3 px-4 text-muted-foreground">XML + diagram editor</td>
                    <td className="py-3 px-4 text-accent">Kotlin/Java code</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Version control</td>
                    <td className="py-3 px-4 text-muted-foreground">XML diffs unreadable</td>
                    <td className="py-3 px-4 text-accent">Normal code diffs</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Refactoring</td>
                    <td className="py-3 px-4 text-muted-foreground">Manual diagram updates</td>
                    <td className="py-3 px-4 text-accent">IDE refactoring works</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Testing</td>
                    <td className="py-3 px-4 text-muted-foreground">Deploy to engine</td>
                    <td className="py-3 px-4 text-accent">Unit test directly</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Debugging</td>
                    <td className="py-3 px-4 text-muted-foreground">Engine logs</td>
                    <td className="py-3 px-4 text-accent">Step through code</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Learning curve</td>
                    <td className="py-3 px-4 text-muted-foreground">BPMN spec + engine</td>
                    <td className="py-3 px-4 text-accent">Just write code</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* DIY Spring Comparison */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Spring + Database (DIY)</h2>
            <p className="text-muted-foreground mb-8">
              The most common approach: manual state management with Spring services and database.
            </p>

            <h3 className="text-xl font-semibold mb-4">Order Processing</h3>
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-muted-foreground">
                  DIY - 200+ lines, bug-prone state machine
                </h4>
                <CodeBlock
                  code={`@Service
public class OrderService {
    @Autowired private OrderRepository orderRepo;
    @Autowired private PaymentService paymentService;
    @Autowired private InventoryService inventoryService;
    @Autowired private ShippingService shippingService;

    @Transactional
    public void processOrder(String orderId) {
        Order order = orderRepo.findById(orderId).orElseThrow();

        // Resume from last state
        switch (order.getStatus()) {
            case CREATED:
                processPayment(order);
                // fall through
            case PAYMENT_COMPLETED:
                reserveInventory(order);
                // fall through
            case INVENTORY_RESERVED:
                createShipment(order);
                break;
            case FAILED:
                handleFailure(order);
                break;
        }
    }

    private void processPayment(Order order) {
        try {
            PaymentResult result = paymentService.charge(order);
            order.setPaymentId(result.getId());
            order.setStatus(PAYMENT_COMPLETED);
            orderRepo.save(order);
        } catch (Exception e) {
            order.setStatus(FAILED);
            order.setError(e.getMessage());
            orderRepo.save(order);
            throw e;
        }
    }

    private void reserveInventory(Order order) {
        try {
            InventoryResult result = inventoryService.reserve(order);
            order.setReservationId(result.getId());
            order.setStatus(INVENTORY_RESERVED);
            orderRepo.save(order);
        } catch (Exception e) {
            // Compensate: refund payment
            paymentService.refund(order.getPaymentId());
            order.setStatus(FAILED);
            orderRepo.save(order);
            throw e;
        }
    }

    // More methods, more state transitions, more edge cases...
}`}
                  language="java"
                  filename="OrderService.java"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-accent">Flovyn - 40 lines, clear flow</h4>
                <CodeBlock
                  code={`@Workflow(name = "order-processing")
class OrderWorkflow : TypedWorkflowDefinition<OrderInput, OrderOutput> {
    override suspend fun execute(ctx: WorkflowContext, input: OrderInput): OrderOutput {
        ctx.set("status", "processing")

        // Step 1: Payment
        val payment = ctx.schedule<PaymentResult>("payment-task", input)
        ctx.set("paymentId", payment.id)

        // Step 2: Inventory (with compensation)
        val inventory = try {
            ctx.schedule<InventoryResult>("inventory-task", input)
        } catch (e: Exception) {
            ctx.run("refund") { paymentService.refund(payment.id) }
            throw e
        }
        ctx.set("reservationId", inventory.id)

        // Step 3: Shipping (with compensation)
        val shipment = try {
            ctx.schedule<ShipmentResult>("shipment-task", input)
        } catch (e: Exception) {
            ctx.run("release-inventory") { 
                inventoryService.release(inventory.id) 
            }
            ctx.run("refund") { paymentService.refund(payment.id) }
            throw e
        }

        ctx.set("status", "completed")
        return OrderOutput(
            orderId = input.orderId,
            trackingNumber = shipment.trackingNumber
        )
    }
}
// Automatic state persistence, clear compensation logic`}
                  language="kotlin"
                  filename="OrderWorkflow.kt"
                />
              </div>
            </div>
          </div>

          {/* Feature Matrix */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Feature Matrix</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold">Spring Batch</th>
                    <th className="text-center py-3 px-4 font-semibold">Quartz</th>
                    <th className="text-center py-3 px-4 font-semibold">Camunda</th>
                    <th className="text-center py-3 px-4 font-semibold">DIY Spring</th>
                    <th className="text-center py-3 px-4 font-semibold text-accent">Flovyn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Batch processing</td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">Manual</td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Scheduled jobs</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">Manual</td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Long-running workflows</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">Manual</td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Durable state</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Human tasks</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">Manual</td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Event sourcing</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Time-travel debug</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Code-first</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Saga/compensation</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">Manual</td>
                    <td className="py-3 px-4 text-center">Manual</td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Lightweight</td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <XCircle className="h-5 w-5 text-muted-foreground/50 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* When to Use What */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">When to Use What</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-muted-foreground/30 pl-6">
                <h3 className="text-lg font-semibold mb-2">Spring Batch</h3>
                <p className="text-muted-foreground">High-volume ETL, chunk-based processing with restart capability</p>
              </div>

              <div className="border-l-4 border-muted-foreground/30 pl-6">
                <h3 className="text-lg font-semibold mb-2">Quartz</h3>
                <p className="text-muted-foreground">Simple scheduled jobs without state requirements</p>
              </div>

              <div className="border-l-4 border-muted-foreground/30 pl-6">
                <h3 className="text-lg font-semibold mb-2">Camunda/Flowable</h3>
                <p className="text-muted-foreground">
                  Business users need visual BPMN diagrams, compliance requires audit trails in specific format
                </p>
              </div>

              <div className="border-l-4 border-muted-foreground/30 pl-6">
                <h3 className="text-lg font-semibold mb-2">DIY Spring</h3>
                <p className="text-muted-foreground">
                  Simple flows, team prefers full control, willing to maintain state machine
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6 bg-accent/5 py-4 -ml-1 rounded-r">
                <h3 className="text-lg font-semibold mb-2 text-accent">Flovyn</h3>
                <p className="text-muted-foreground">
                  Multi-step business workflows, external service coordination, long-running processes, need event
                  sourcing without BPMN complexity
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to simplify your Java workflows?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              See how Flovyn can replace your complex Java workflow infrastructure with clean, maintainable code.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Get Started
              </a>
              <a
                href="#docs"
                className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-accent/10 transition-colors"
              >
                Read Documentation
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
