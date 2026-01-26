import { Code2, Cpu, GitBranch, Shield, Zap } from "lucide-react"

const capabilities = [
  {
    icon: Code2,
    title: "Code-first Workflows",
    description:
      "Write workflows in Python, TypeScript, Kotlin, or Rust with a simple WorkflowContext API. Event sourcing ensures deterministic replay.",
  },
  {
    icon: Cpu,
    title: "AI Agent Execution",
    description:
      "Resume agent loops at any point without losing state. Stream LLM tokens in real-time. Time-travel debugging lets you replay executions.",
  },
  {
    icon: GitBranch,
    title: "Event Sourcing",
    description:
      "Complete audit trail of all executions. Replay workflows from any point. Understand exactly what happened and why.",
  },
  {
    icon: Shield,
    title: "Built-in Resilience",
    description:
      "Automatic retries, compensation logic, and failure handling. Focus on business logic, not infrastructure complexity.",
  },
  {
    icon: Zap,
    title: "Production-Grade",
    description:
      "Multi-tenancy, quota enforcement, rate limiting, and data retention. gRPC communication protocol. Deploy on your infrastructure with full control.",
  },
]

export function Capabilities() {
  return (
    <section id="capabilities" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Core Capabilities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build reliable distributed workflows
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, i) => (
            <div key={i} className="feature-card">
              <div className="feature-card-icon">
                <capability.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{capability.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
