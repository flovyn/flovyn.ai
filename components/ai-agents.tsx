import { Card } from "@/components/ui/card"
import { Cpu, Zap, RotateCcw } from "lucide-react"
import { CodeBlock } from "./code-block"

export function AIAgents() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent-foreground">
            <Cpu className="h-3.5 w-3.5" />
            AI Agent Execution
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">Run AI Agents Reliably</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Agent loops that survive crashes and resume exactly where they left off
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-6 w-6 text-accent" />
                <h3 className="text-xl font-semibold">Resume from Any Point</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Agent crashes mid-research? No problem. Flovyn resumes exactly where it stopped without losing context
                or duplicating work.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-3 mb-3">
                <RotateCcw className="h-6 w-6 text-accent" />
                <h3 className="text-xl font-semibold">Time-Travel Debugging</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Replay agent executions with different inputs or models. See exactly what decisions the agent made at
                each step.
              </p>
            </Card>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground ml-2">ResearchAgent.kt</span>
            </div>
            <CodeBlock
              code={`@Workflow(name = "research-agent")
class ResearchAgent : 
    TypedWorkflowDefinition<Query, Report> {
    
    override suspend fun execute(
        ctx: WorkflowContext, 
        input: Query
    ): Report {
        val results = mutableListOf<SearchResult>()

        while (results.size < 10) {
            val search = ctx.schedule<SearchResult>(
                "web-search", 
                input.query
            )
            results.add(search)

            val decision = ctx.schedule<AgentDecision>(
                "llm-decide", 
                results
            )
            if (decision.complete) break

            // Resume point on crash
            ctx.checkCancellation()
        }

        return ctx.schedule("compile-report", results)
    }
}`}
              language="kotlin"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
