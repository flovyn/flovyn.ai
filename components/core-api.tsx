"use client"

import { TabbedCodeBlock, type SupportedLanguage } from "./code-block"

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

# Long-running tasks - delegated with retries
payment = await ctx.execute_task(PaymentTask, input)

# Parallel execution
results = await asyncio.gather(
    ctx.execute_task(TaskA, input_a),
    ctx.execute_task(TaskB, input_b),
)`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `// Side effects - cached on replay
const result = await ctx.run("fetch-data", () => httpClient.get(url));

// Long-running tasks - delegated with retries
const payment = await ctx.task(paymentTask, input);

// Parallel execution
const [resultA, resultB] = await Promise.all([
  ctx.task(taskA, inputA),
  ctx.task(taskB, inputB),
]);`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `// Side effects - cached on replay
val result = ctx.run("fetch-data") { httpClient.get(url) }

// Long-running tasks - delegated with retries
val payment = ctx.schedule<PaymentResponse>("payment-task", input)

// Parallel execution
val (resultA, resultB) = awaitAll(
    ctx.scheduleAsync<ResultA>("task-a", inputA),
    ctx.scheduleAsync<ResultB>("task-b", inputB),
)`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `// Side effects - cached on replay
let result = ctx.run("fetch-data", || http_client.get(&url)).await?;

// Long-running tasks - delegated with retries
let payment: PaymentResponse = ctx.schedule(PaymentTask, &input).await?;

// Parallel execution
let (result_a, result_b) = tokio::try_join!(
    ctx.schedule(TaskA, &input_a),
    ctx.schedule(TaskB, &input_b),
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
status = await ctx.get_state("status")

# Clear state when done
await ctx.clear_state("status")`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `// Persisted across restarts
await ctx.setState("status", "processing");
const status = await ctx.getState<string>("status");

// Clear state when done
await ctx.clearState("status");`,
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
        code: `// Persisted across restarts
ctx.set_state("status", "processing").await?;
let status: Option<String> = ctx.get_state("status").await?;

// Clear state when done
ctx.delete_state("status").await?;`,
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
approval = await ctx.wait_for_promise(
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
const approval = await ctx.promise<ApprovalResult>(
  "manager-approval",
  Duration.days(7)
);`,
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
let approval: ApprovalResult = ctx.promise("manager-approval")
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
            # Stream tokens in real-time
            await ctx.stream_token(token)

        # Report final progress
        await ctx.stream_progress(1.0, "Generation complete")
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
      // Stream tokens in real-time
      await ctx.streamToken(token);
    }

    // Report final progress
    await ctx.streamProgress(1.0, "Generation complete");
    return response;
  },
});`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `class LLMGenerateTask : TaskDefinition<String, String>() {
    override val kind = "llm-generate"

    override suspend fun execute(input: String, ctx: TaskContext): String {
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

    async fn execute(&self, input: Self::Input, ctx: &dyn TaskContext) -> Result<Self::Output> {
        let mut response = String::new();
        let mut stream = llm.stream(&input).await?;

        while let Some(token) = stream.next().await {
            response.push_str(&token);
            // Stream tokens in real-time
            ctx.stream_token(&token).await?;
        }

        // Report final progress
        ctx.stream_progress(1.0, Some("Generation complete")).await?;
        Ok(response)
    }
}`,
      },
    ],
  },
]

export function CoreAPI() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Simple, <span className="gradient-text">Powerful</span> API
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The WorkflowContext API gives you everything you need for reliable execution across all supported languages
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {apiExamples.map((example, i) => (
            <div
              key={i}
              className={`feature-card ${i === apiExamples.length - 1 && apiExamples.length % 2 !== 0 ? 'lg:col-span-2 lg:max-w-2xl lg:mx-auto' : ''}`}
            >
              <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
              <TabbedCodeBlock tabs={example.tabs} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
