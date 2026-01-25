"use client"

import { Cpu, Zap, RotateCcw, Radio } from "lucide-react"
import { TabbedCodeBlock } from "./code-block"

const agentExamples = [
  {
    language: "python" as const,
    label: "Python",
    filename: "research_agent.py",
    code: `@workflow(name="research-agent")
class ResearchAgent:
    async def run(self, ctx: WorkflowContext, query: Query) -> Report:
        results = []

        while len(results) < 10:
            # Each search is a durable task
            search = await ctx.execute_task(WebSearchTask, query.text)
            results.append(search)

            # LLM decision - streams tokens in real-time
            decision = await ctx.execute_task(LLMDecideTask, results)
            if decision.complete:
                break

            # Resume point on crash
            await ctx.check_cancellation()

        return await ctx.execute_task(CompileReportTask, results)`,
  },
  {
    language: "typescript" as const,
    label: "TypeScript",
    filename: "researchAgent.ts",
    code: `const researchAgent = workflow<Query, Report>({
  name: "research-agent",

  async run(ctx, query) {
    const results: SearchResult[] = [];

    while (results.length < 10) {
      // Each search is a durable task
      const search = await ctx.task(webSearchTask, query.text);
      results.push(search);

      // LLM decision - streams tokens in real-time
      const decision = await ctx.task(llmDecideTask, results);
      if (decision.complete) break;

      // Resume point on crash
      ctx.checkCancellation();
    }

    return ctx.task(compileReportTask, results);
  },
});`,
  },
  {
    language: "kotlin" as const,
    label: "Kotlin",
    filename: "ResearchAgent.kt",
    code: `class ResearchAgent : WorkflowDefinition<Query, Report>() {
    override val kind = "research-agent"

    override suspend fun execute(ctx: WorkflowContext, input: Query): Report {
        val results = mutableListOf<SearchResult>()

        while (results.size < 10) {
            // Each search is a durable task
            val search = ctx.schedule<SearchResult>("web-search", input.query)
            results.add(search)

            // LLM decision - streams tokens in real-time
            val decision = ctx.schedule<AgentDecision>("llm-decide", results)
            if (decision.complete) break

            // Resume point on crash
            ctx.checkCancellation()
        }

        return ctx.schedule("compile-report", results)
    }
}`,
  },
  {
    language: "rust" as const,
    label: "Rust",
    filename: "research_agent.rs",
    code: `pub struct ResearchAgent;

#[async_trait]
impl WorkflowDefinition for ResearchAgent {
    type Input = Query;
    type Output = Report;

    fn kind(&self) -> &str { "research-agent" }

    async fn execute(&self, ctx: &dyn WorkflowContext, input: Self::Input) -> Result<Self::Output> {
        let mut results = Vec::new();

        while results.len() < 10 {
            // Each search is a durable task
            let search: SearchResult = ctx.schedule(WebSearchTask, &input.query).await?;
            results.push(search);

            // LLM decision - streams tokens in real-time
            let decision: AgentDecision = ctx.schedule(LLMDecideTask, &results).await?;
            if decision.complete { break; }

            // Resume point on crash
            ctx.check_cancellation().await?;
        }

        ctx.schedule(CompileReportTask, &results).await
    }
}`,
  },
]

const features = [
  {
    icon: Zap,
    title: "Resume from Any Point",
    description: "Agent crashes mid-research? No problem. Flovyn resumes exactly where it stopped without losing context or duplicating work.",
  },
  {
    icon: RotateCcw,
    title: "Time-Travel Debugging",
    description: "Replay agent executions with different inputs or models. See exactly what decisions the agent made at each step.",
  },
  {
    icon: Radio,
    title: "Real-time Token Streaming",
    description: "Stream LLM tokens to your UI as they're generated. Progress updates and intermediate results via Server-Sent Events.",
  },
]

export function AIAgents() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary">
            <Cpu className="h-3.5 w-3.5" />
            <span className="font-medium">AI Agent Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Run AI Agents Reliably</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Agent loops that survive crashes and resume exactly where they left off
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            {features.map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="feature-card-icon !mb-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <TabbedCodeBlock tabs={agentExamples} />
        </div>
      </div>
    </section>
  )
}
