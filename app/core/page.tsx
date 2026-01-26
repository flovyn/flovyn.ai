"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TabbedCodeBlock, type SupportedLanguage } from "@/components/code-block"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface CodeTabs {
  language: SupportedLanguage
  label: string
  code: string
}[]

export default function CoreAPIPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          {/* Hero */}
          <div className="space-y-6 mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              The WorkflowContext API
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Durable execution means your code can crash and resume exactly where it left off.
              But this only works if every operation is recorded and can be replayed. The
              WorkflowContext is your interface to make this happen.
            </p>
          </div>

          {/* Section 1: Side Effects */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-4">Wrapping Side Effects</h2>
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed">
                When a workflow replays after a crash, it re-executes your code from the beginning.
                Without protection, this means HTTP calls fire twice, database writes duplicate,
                and external APIs see the same request again.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The <code className="text-primary">ctx.run()</code> function solves this. It executes
                your side effect once, records the result, and on replay returns the cached result
                instead of re-executing. Your code looks normal, but behaves correctly across restarts.
              </p>
            </div>
            <TabbedCodeBlock tabs={sideEffectsTabs} />
          </section>

          {/* Section 2: Tasks */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-4">Scheduling Tasks</h2>
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed">
                For operations that take longer or need their own retry policies, use tasks.
                Tasks are separate units of work that run independently and can be distributed
                across workers. They have built-in timeouts, retries, and progress reporting.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Use <code className="text-primary">execute_task()</code> to run a task and wait for
                its result. Use <code className="text-primary">schedule_task()</code> to start multiple
                tasks in parallel, then await their results when needed.
              </p>
            </div>
            <TabbedCodeBlock tabs={tasksTabs} />
          </section>

          {/* Section 3: Determinism */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-4">Deterministic Operations</h2>
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Replay only works if your code produces the same results every time. But some
                operations are inherently non-deterministic: the current time changes, UUIDs are
                random, and <code className="text-primary">Math.random()</code> returns different values.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The context provides deterministic alternatives. These record their value on first
                execution and return the same value on replay. Use them instead of the standard
                library equivalents.
              </p>
            </div>
            <TabbedCodeBlock tabs={deterministicTabs} />
          </section>

          {/* Section 4: Durable State */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-4">Persisting State</h2>
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Sometimes you need to store data that persists across workflow restarts but isn't
                part of the execution log. Maybe you're tracking progress through a multi-step
                process, or caching expensive computations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The state API gives you a key-value store scoped to each workflow execution.
                State survives crashes and restarts, and is automatically cleaned up when the
                workflow completes.
              </p>
            </div>
            <TabbedCodeBlock tabs={stateTabs} />
          </section>

          {/* Section 5: Timers & Signals */}
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-4">Timers and External Signals</h2>
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Long-running workflows often need to wait. Maybe you're implementing a reminder
                that fires in 24 hours, or waiting for human approval before proceeding. Normal
                sleep calls don't survive restarts—if your worker crashes, the timer is lost.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Durable timers are persisted to the database. The workflow can sleep for days,
                and even if every worker restarts, the timer will fire at the right time.
                Promises let you pause execution until an external system sends a signal.
              </p>
            </div>
            <TabbedCodeBlock tabs={timersTabs} />
          </section>

          {/* Section 6: Streaming */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Real-time Streaming</h2>
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-muted-foreground leading-relaxed">
                Modern AI applications need to stream responses as they're generated. Users
                expect to see LLM tokens appear in real-time, not wait for the entire response.
                But streaming and durable execution seem incompatible—how do you replay a stream?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Flovyn separates streaming from execution. The streaming APIs send data directly
                to clients via Server-Sent Events without affecting the execution log. On replay,
                the final result is returned immediately while any active subscribers receive
                the cached stream.
              </p>
            </div>
            <TabbedCodeBlock tabs={streamingTabs} />
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}

const sideEffectsTabs = [
  {
    language: "python" as const,
    label: "Python",
    code: `# Without ctx.run() - this HTTP call would fire on every replay
result = await http_client.get(url)  # BAD: duplicates on crash

# With ctx.run() - executes once, replays from cache
result = await ctx.run("fetch-data", lambda: http_client.get(url))`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    code: `// Without ctx.run() - this HTTP call would fire on every replay
const result = await httpClient.get(url);  // BAD: duplicates on crash

// With ctx.run() - executes once, replays from cache
const result = await ctx.run("fetch-data", () => httpClient.get(url));`,
  },
  {
    language: "kotlin" as const,
    label: "Kotlin",
    code: `// Without ctx.run() - this HTTP call would fire on every replay
val result = httpClient.get(url)  // BAD: duplicates on crash

// With ctx.run() - executes once, replays from cache
val result = ctx.run("fetch-data") { httpClient.get(url) }`,
  },
  {
    language: "rust" as const,
    label: "Rust",
    code: `// Rust SDK uses run_raw with pre-computed values
// First compute the result, then record it
let fetch_result = http_client.get(&url).await?;
let result = ctx.run_raw("fetch-data", serde_json::to_value(&fetch_result)?).await?;`,
  },
]

const tasksTabs = [
  {
    language: "python" as const,
    label: "Python",
    code: `# Execute a task and wait for result
payment = await ctx.execute_task("payment-task", {"amount": 100})

# Run multiple tasks in parallel
handle_a = ctx.schedule_task("send-email", email_data)
handle_b = ctx.schedule_task("send-sms", sms_data)

# Wait for both to complete
email_result = await handle_a.result()
sms_result = await handle_b.result()`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    code: `// Execute a task and wait for result
const payment = await ctx.task(paymentTask, { amount: 100 });

// Run multiple tasks in parallel
const emailHandle = ctx.scheduleTask(sendEmailTask, emailData);
const smsHandle = ctx.scheduleTask(sendSmsTask, smsData);

// Wait for both to complete
const [emailResult, smsResult] = await Promise.all([
  emailHandle.result(),
  smsHandle.result(),
]);`,
  },
  {
    language: "kotlin" as const,
    label: "Kotlin",
    code: `// Execute a task and wait for result
val payment = ctx.schedule<PaymentResult>(
    kind = "payment-task",
    input = PaymentInput(amount = 100)
)

// Run multiple tasks in parallel
val (emailResult, smsResult) = awaitAll(
    ctx.scheduleAsync<EmailResult>(kind = "send-email", input = emailData),
    ctx.scheduleAsync<SmsResult>(kind = "send-sms", input = smsData),
)`,
  },
  {
    language: "rust" as const,
    label: "Rust",
    code: `// Execute a task and wait for result
let input = serde_json::to_value(&PaymentInput { amount: 100 })?;
let payment: Value = ctx.schedule_raw("payment-task", input).await?;

// Run multiple tasks in parallel
let (email_result, sms_result) = tokio::try_join!(
    ctx.schedule_raw("send-email", serde_json::to_value(&email_data)?),
    ctx.schedule_raw("send-sms", serde_json::to_value(&sms_data)?),
)?;`,
  },
]

const deterministicTabs = [
  {
    language: "python" as const,
    label: "Python",
    code: `# These return the same value on replay
order_id = ctx.random_uuid()
created_at = ctx.current_time()
delay_ms = int(ctx.random() * 4000) + 1000`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    code: `// These return the same value on replay
const orderId = ctx.randomUUID();
const createdAt = ctx.currentTimeMillis();
const delayMs = Math.floor(ctx.random() * 4000) + 1000;`,
  },
  {
    language: "kotlin" as const,
    label: "Kotlin",
    code: `// These return the same value on replay
val orderId = ctx.randomUUID()
val createdAt = ctx.currentTimeMillis()
val delayMs = ctx.random().nextInt(1000, 5000)`,
  },
  {
    language: "rust" as const,
    label: "Rust",
    code: `// These return the same value on replay
let order_id = ctx.random_uuid();
let created_at = ctx.current_time_millis();
let delay_ms = ctx.random().gen_range(1000..5000);`,
  },
]

const stateTabs = [
  {
    language: "python" as const,
    label: "Python",
    code: `# Store progress through a multi-step process
await ctx.set_state("current_step", "processing_payment")
await ctx.set_state("items_processed", 42)

# Read state (survives restarts)
step = await ctx.get_state("current_step", type_hint=str)
count = await ctx.get_state("items_processed", type_hint=int)

# Clean up when done
await ctx.clear_state("current_step")`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    code: `// Store progress through a multi-step process
ctx.setState("currentStep", "processing_payment");
ctx.setState("itemsProcessed", 42);

// Read state (survives restarts)
const step = ctx.getState<string>("currentStep");
const count = ctx.getState<number>("itemsProcessed");

// Clean up when done
ctx.clearState("currentStep");`,
  },
  {
    language: "kotlin" as const,
    label: "Kotlin",
    code: `// Store progress through a multi-step process
ctx.set("currentStep", "processing_payment")
ctx.set("itemsProcessed", 42)

// Read state (survives restarts)
val step = ctx.get<String>("currentStep")
val count = ctx.get<Int>("itemsProcessed")

// Clean up when done
ctx.clear("currentStep")`,
  },
  {
    language: "rust" as const,
    label: "Rust",
    code: `// Store progress through a multi-step process
ctx.set_raw("current_step", json!("processing_payment")).await?;
ctx.set_raw("items_processed", json!(42)).await?;

// Read state (survives restarts)
let step: String = serde_json::from_value(ctx.get_raw("current_step").await?)?;
let count: i32 = serde_json::from_value(ctx.get_raw("items_processed").await?)?;

// Clean up when done
ctx.delete_raw("current_step").await?;`,
  },
]

const timersTabs = [
  {
    language: "python" as const,
    label: "Python",
    code: `# Sleep for 24 hours - survives worker restarts
await ctx.sleep(timedelta(hours=24))

# Wait for external approval with 7-day timeout
approval = await ctx.promise(
    "manager-approval",
    timeout=timedelta(days=7)
)

if approval["approved"]:
    # proceed with the workflow
    ...`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    code: `// Sleep for 24 hours - survives worker restarts
await ctx.sleep(Duration.hours(24));

// Wait for external approval with 7-day timeout
const approval = await ctx.promise<ApprovalResult>("manager-approval", {
  timeout: Duration.days(7),
});

if (approval.approved) {
  // proceed with the workflow
}`,
  },
  {
    language: "kotlin" as const,
    label: "Kotlin",
    code: `// Sleep for 24 hours - survives worker restarts
ctx.sleep(Duration.ofHours(24))

// Wait for external approval with 7-day timeout
val approval = ctx.promise<ApprovalResult>(
    "manager-approval",
    timeout = Duration.ofDays(7)
)

if (approval.approved) {
    // proceed with the workflow
}`,
  },
  {
    language: "rust" as const,
    label: "Rust",
    code: `// Sleep for 24 hours - survives worker restarts
ctx.sleep(Duration::from_secs(24 * 3600)).await?;

// Wait for external approval with 7-day timeout
let approval: ApprovalResult = serde_json::from_value(
    ctx.promise_raw("manager-approval")
        .with_timeout(Duration::from_secs(7 * 24 * 3600))
        .await?
)?;

if approval.approved {
    // proceed with the workflow
}`,
  },
]

const streamingTabs = [
  {
    language: "python" as const,
    label: "Python",
    code: `@task(name="llm-generate")
class LLMGenerateTask:
    async def run(self, ctx: TaskContext, prompt: str) -> str:
        response = ""

        async for token in llm.stream(prompt):
            response += token
            ctx.stream_token(token)  # Sent to client immediately

        ctx.stream_progress(1.0, "Done")
        return response  # This is what gets recorded`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    code: `const llmGenerateTask = task<string, string>({
  name: "llm-generate",

  async run(ctx, prompt) {
    let response = "";

    for await (const token of llm.stream(prompt)) {
      response += token;
      ctx.streamToken(token);  // Sent to client immediately
    }

    ctx.streamProgress(1.0, "Done");
    return response;  // This is what gets recorded
  },
});`,
  },
  {
    language: "kotlin" as const,
    label: "Kotlin",
    code: `class LLMGenerateTask : TaskDefinition<String, String>() {
    override val kind = "llm-generate"

    override suspend fun execute(ctx: TaskContext, input: String): String {
        val response = StringBuilder()

        llm.stream(input).collect { token ->
            response.append(token)
            ctx.stream(StreamEvent.Token(token))  // Sent immediately
        }

        ctx.stream(StreamEvent.Progress(1.0, "Done"))
        return response.toString()  // This is what gets recorded
    }
}`,
  },
  {
    language: "rust" as const,
    label: "Rust",
    code: `impl TaskDefinition for LLMGenerateTask {
    // ...

    async fn execute(&self, ctx: &dyn TaskContext, prompt: Self::Input) -> Result<Self::Output> {
        let mut response = String::new();
        let mut stream = llm.stream(&prompt).await?;

        while let Some(token) = stream.next().await {
            response.push_str(&token);
            ctx.stream_token(&token)?;  // Sent immediately
        }

        ctx.stream_progress(1.0, Some("Done"))?;
        Ok(response)  // This is what gets recorded
    }
}`,
  },
]
