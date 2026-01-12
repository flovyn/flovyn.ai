import { Card } from "@/components/ui/card"
import { CodeBlock } from "./code-block"

const steps = [
  {
    title: "Define Tasks",
    description:
      "Create task handlers with the @TaskInfo annotation. Each task does one thing well with built-in timeout, retry, and progress reporting.",
    code: `@Serializable
data class EmailInput(val to: String, val subject: String, val body: String)
@Serializable
data class EmailResult(val messageId: String, val status: String)

class SendEmailTask : TaskDefinition<EmailInput, EmailResult>() {
    override val kind = "send-email"
    override val name = "Send Email"
    override val description = "Sends email via SMTP"
    override val timeoutSeconds = 60

    override suspend fun execute(input: EmailInput, context: TaskContext): EmailResult {
        context.reportProgress(0.1, "Connecting to SMTP...")
        context.reportProgress(0.5, "Sending email...")
        val messageId = emailService.send(input)
        context.reportProgress(1.0, "Email sent")
        return EmailResult(messageId, "sent")
    }
}`,
  },
  {
    title: "Compose Workflows",
    description:
      "Build workflows using the WorkflowContext API. Orchestrate tasks, handle failures, add compensation logic - all with full type safety.",
    code: `@Serializable
data class UserInput(val email: String, val name: String)
@Serializable
data class OnboardingResult(val userId: String, val status: String)

class OnboardingWorkflow : WorkflowDefinition<UserInput, OnboardingResult>() {
    override val kind = "user-onboarding"
    override val name = "User Onboarding"
    override val description = "Onboards new users with welcome email and account setup"

    override suspend fun execute(ctx: WorkflowContext, input: UserInput): OnboardingResult {
        val user = ctx.run("create-user") { userService.create(input) }

        // Run email and account setup in parallel
        val emailTask = ctx.scheduleAsync<EmailResult>("send-email", EmailInput(input.email, "Welcome!", "..."))
        val setupTask = ctx.scheduleAsync<SetupResult>("setup-account", SetupInput(user.id))
        awaitAll(emailTask, setupTask)

        return OnboardingResult(user.id, "completed")
    }
}`,
  },
  {
    title: "Register and Start",
    description:
      "Register your workflows and tasks with the Flovyn client using gRPC. They automatically appear in the visual builder and can be started via API or UI.",
    code: `fun main() {
    val client = FlovynClient.builder()
        .serverAddress("localhost", 9090)
        .tenantId(myTenantId)
        .taskQueue("onboarding-workers")
        .registerWorkflow(OnboardingWorkflow())
        .registerTask(SendEmailTask())
        .registerTask(SetupAccountTask())
        .build()

    client.start() // Blocks and polls for work
}`,
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From code to production in three steps</p>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <Card key={i} className="p-6 sm:p-8 bg-card border-border">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-semibold">
                      {i + 1}
                    </div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                <CodeBlock code={step.code} language="kotlin" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
