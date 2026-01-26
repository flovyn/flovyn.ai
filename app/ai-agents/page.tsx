"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TabbedCodeBlock } from "@/components/code-block"
import { Cpu, Zap, RotateCcw, Radio, ArrowLeft } from "lucide-react"
import Link from "next/link"

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
            # Each search is a durable task (string-based reference)
            search = await ctx.execute_task("web-search", {"query": query.text})
            results.append(search)

            # LLM decision - streams tokens in real-time
            decision = await ctx.execute_task("llm-decide", {"results": results})
            if decision["complete"]:
                break

        return await ctx.execute_task("compile-report", {"results": results})`,
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
      // Each search is a durable task (typed reference)
      const search = await ctx.task(webSearchTask, { query: query.text });
      results.push(search);

      // LLM decision - streams tokens in real-time
      const decision = await ctx.task(llmDecideTask, { results });
      if (decision.complete) break;
    }

    return ctx.task(compileReportTask, { results });
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
            // Each search is a durable task (string-based kind)
            val search = ctx.schedule<SearchResult>(
                kind = "web-search",
                input = SearchInput(input.query)
            )
            results.add(search)

            // LLM decision - streams tokens in real-time
            val decision = ctx.schedule<AgentDecision>(
                kind = "llm-decide",
                input = DecideInput(results)
            )
            if (decision.complete) break
        }

        return ctx.schedule(kind = "compile-report", input = ReportInput(results))
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
        let mut results: Vec<SearchResult> = Vec::new();

        while results.len() < 10 {
            // Each search is a durable task (JSON-based)
            let search_input = serde_json::to_value(&SearchInput::new(&input.query))?;
            let search_result = ctx.schedule_raw("web-search", search_input).await?;
            results.push(serde_json::from_value(search_result)?);

            // LLM decision - streams tokens in real-time
            let decide_input = serde_json::to_value(&results)?;
            let decision: AgentDecision = serde_json::from_value(
                ctx.schedule_raw("llm-decide", decide_input).await?
            )?;
            if decision.complete { break; }
        }

        let report_input = serde_json::to_value(&results)?;
        Ok(serde_json::from_value(ctx.schedule_raw("compile-report", report_input).await?)?)
    }
}`,
  },
]

const features = [
  {
    icon: Zap,
    title: "Resume from Any Point",
    description: "Agent crashes mid-research? No problem. Flovyn resumes exactly where it stopped without losing context or duplicating work. Every LLM call, tool invocation, and intermediate result is durably persisted.",
  },
  {
    icon: RotateCcw,
    title: "Time-Travel Debugging",
    description: "Replay agent executions with different inputs or models. See exactly what decisions the agent made at each step. Understand token usage, latency, and reasoning paths.",
  },
  {
    icon: Radio,
    title: "Real-time Token Streaming",
    description: "Stream LLM tokens to your UI as they're generated. Progress updates and intermediate results via Server-Sent Events. Build responsive UIs that show agent thinking in real-time.",
  },
]

export default function AIAgentsPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary">
              <Cpu className="h-3.5 w-3.5" />
              <span className="font-medium">AI Agent Execution</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">Run AI Agents Reliably</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Agent loops that survive crashes and resume exactly where they left off.
              Perfect for multi-step research, code generation, and autonomous workflows.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
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

          <div className="feature-card p-8">
            <h2 className="text-2xl font-semibold mb-4">Why Durable Execution for AI Agents?</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                AI agents make multiple LLM calls, execute tools, and maintain state across long-running sessions.
                Without durable execution, a crash means starting over from scratch—losing all context, repeating
                expensive API calls, and frustrating users.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Flovyn records every step of agent execution to PostgreSQL. When a worker restarts, it replays
                the execution log and resumes from exactly where it left off. No duplicate LLM calls, no lost
                intermediate results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Combined with real-time streaming, you can build agent UIs that show thinking progress,
                intermediate results, and gracefully handle interruptions.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
