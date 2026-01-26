"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TabbedCodeBlock, type SupportedLanguage } from "@/components/code-block"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface APIExample {
  title: string
  description: string
  tabs: {
    language: SupportedLanguage
    label: string
    code: string
  }[]
}

const apiExamples: APIExample[] = [
  {
    title: "Side Effects & Tasks",
    description: "Execute side effects with automatic caching on replay, and schedule long-running tasks with built-in retries.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `# Side effects - cached on replay
result = await ctx.run("fetch-data", lambda: http_client.get(url))

# Long-running tasks - string-based task reference
payment = await ctx.execute_task("payment-task", {"amount": 100})

# Parallel execution with schedule_task
handle_a = ctx.schedule_task("task-a", input_a)
handle_b = ctx.schedule_task("task-b", input_b)
result_a = await handle_a.result()
result_b = await handle_b.result()`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `// Side effects - cached on replay
const result = await ctx.run("fetch-data", () => httpClient.get(url));

// Long-running tasks - typed task reference
const payment = await ctx.task(paymentTask, { amount: 100 });

// Parallel execution with scheduleTask
const handleA = ctx.scheduleTask(taskA, inputA);
const handleB = ctx.scheduleTask(taskB, inputB);
const [resultA, resultB] = await Promise.all([
  handleA.result(),
  handleB.result(),
]);`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `// Side effects - cached on replay
val result = ctx.run("fetch-data") { httpClient.get(url) }

// Long-running tasks - string-based task kind
val payment = ctx.schedule<PaymentResponse>(
    kind = "payment-task",
    input = PaymentInput(amount = 100)
)

// Parallel execution with scheduleAsync
val (resultA, resultB) = awaitAll(
    ctx.scheduleAsync<ResultA>(kind = "task-a", input = inputA),
    ctx.scheduleAsync<ResultB>(kind = "task-b", input = inputB),
)`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `// Side effects - run_raw with pre-computed value
let fetch_result = http_client.get(&url).await?;
let result = ctx.run_raw("fetch-data", serde_json::to_value(&fetch_result)?).await?;

// Long-running tasks - schedule_raw with JSON
let input = serde_json::to_value(&PaymentInput { amount: 100 })?;
let payment: Value = ctx.schedule_raw("payment-task", input).await?;

// Parallel execution
let (result_a, result_b) = tokio::try_join!(
    ctx.schedule_raw("task-a", serde_json::to_value(&input_a)?),
    ctx.schedule_raw("task-b", serde_json::to_value(&input_b)?),
)?;`,
      },
    ],
  },
  {
    title: "Deterministic Operations",
    description: "Get reproducible values for time, UUIDs, and randomness that remain consistent across replays.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `# Deterministic - same value on replay
id = ctx.random_uuid()
now = ctx.current_time()
delay = ctx.random() * 4000 + 1000  # 1000-5000`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `// Deterministic - same value on replay
const id = ctx.randomUUID();
const now = ctx.currentTimeMillis();
const delay = Math.floor(ctx.random() * 4000) + 1000;`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `// Deterministic - same value on replay
val id = ctx.randomUUID()
val now = ctx.currentTimeMillis()
val delay = ctx.random().nextInt(1000, 5000)`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `// Deterministic - same value on replay
let id = ctx.random_uuid();
let now = ctx.current_time_millis();
let delay = ctx.random().gen_range(1000..5000);`,
      },
    ],
  },
  {
    title: "Durable State",
    description: "Persist workflow state that survives crashes and restarts, with type-safe access.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `# Persisted across restarts
await ctx.set_state("status", "processing")
status = await ctx.get_state("status", type_hint=str)

# Clear state when done
await ctx.clear_state("status")`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `// Persisted across restarts (synchronous API)
ctx.setState("status", "processing");
const status = ctx.getState<string>("status");

// Clear state when done
ctx.clearState("status");`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `// Persisted across restarts
ctx.set("status", "processing")
val status = ctx.get<String>("status")

// Clear state when done
ctx.clear("status")`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `// Persisted across restarts (JSON-based)
ctx.set_raw("status", serde_json::to_value("processing")?).await?;
let status: Value = ctx.get_raw("status").await?.unwrap_or_default();

// Clear state when done
ctx.delete_raw("status").await?;`,
      },
    ],
  },
  {
    title: "Timers & Signals",
    description: "Durable timers that survive restarts, and external signals for human-in-the-loop workflows.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `# Durable timer - survives restarts
await ctx.sleep(timedelta(hours=1))

# Wait for external signal with timeout
approval = await ctx.promise(
    "manager-approval",
    timeout=timedelta(days=7)
)`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `// Durable timer - survives restarts
await ctx.sleep(Duration.hours(1));

// Wait for external signal with timeout
const approval = await ctx.promise<ApprovalResult>("manager-approval", {
  timeout: Duration.days(7),
});`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `// Durable timer - survives restarts
ctx.sleep(Duration.ofHours(1))

// Wait for external signal with timeout
val approval = ctx.promise<ApprovalResult>(
    "manager-approval",
    timeout = Duration.ofDays(7)
)`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `// Durable timer - survives restarts
ctx.sleep(Duration::from_secs(3600)).await?;

// Wait for external signal with timeout
let approval: Value = ctx.promise_raw("manager-approval")
    .with_timeout(Duration::from_secs(7 * 24 * 3600))
    .await?;`,
      },
    ],
  },
  {
    title: "Real-time Streaming",
    description: "Stream LLM tokens, progress updates, and data in real-time via Server-Sent Events.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `@task(name="llm-generate")
class LLMGenerateTask:
    async def run(self, ctx: TaskContext, prompt: str) -> str:
        response = ""
        async for token in llm.stream(prompt):
            response += token
            # Stream tokens in real-time (sync call)
            ctx.stream_token(token)

        # Report final progress
        ctx.stream_progress(1.0, "Generation complete")
        return response`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `const llmGenerateTask = task<string, string>({
  name: "llm-generate",

  async run(ctx, prompt) {
    let response = "";
    for await (const token of llm.stream(prompt)) {
      response += token;
      // Stream tokens in real-time (sync call)
      ctx.streamToken(token);
    }

    // Report final progress
    ctx.streamProgress(1.0, "Generation complete");
    return response;
  },
});`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `class LLMGenerateTask : TaskDefinition<String, String>() {
    override val kind = "llm-generate"

    override suspend fun execute(ctx: TaskContext, input: String): String {
        val response = StringBuilder()
        llm.stream(input).collect { token ->
            response.append(token)
            // Stream tokens in real-time
            ctx.stream(StreamEvent.Token(token))
        }

        // Report final progress
        ctx.stream(StreamEvent.Progress(1.0, "Generation complete"))
        return response.toString()
    }
}`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `pub struct LLMGenerateTask;

#[async_trait]
impl TaskDefinition for LLMGenerateTask {
    type Input = String;
    type Output = String;

    fn kind(&self) -> &str { "llm-generate" }

    async fn execute(&self, ctx: &dyn TaskContext, input: Self::Input) -> Result<Self::Output> {
        let mut response = String::new();
        let mut stream = llm.stream(&input).await?;

        while let Some(token) = stream.next().await {
            response.push_str(&token);
            // Stream tokens in real-time
            ctx.stream_token(&token)?;
        }

        // Report final progress
        ctx.stream_progress(1.0, Some("Generation complete"))?;
        Ok(response)
    }
}`,
      },
    ],
  },
]

export default function APIReferencePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="space-y-4 mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold">API Reference</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              The WorkflowContext API gives you everything you need for reliable execution across Python, TypeScript, Kotlin, and Rust.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {apiExamples.map((example, i) => (
              <div
                key={i}
                className={`feature-card ${i === apiExamples.length - 1 && apiExamples.length % 2 !== 0 ? 'lg:col-span-2 lg:max-w-2xl lg:mx-auto' : ''}`}
              >
                <h2 className="text-xl font-semibold mb-2">{example.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
                <TabbedCodeBlock tabs={example.tabs} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
