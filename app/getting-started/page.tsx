"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TabbedCodeBlock, type SupportedLanguage } from "@/components/code-block"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Step {
  title: string
  description: string
  tabs: {
    language: SupportedLanguage
    label: string
    code: string
  }[]
}

const steps: Step[] = [
  {
    title: "Define Tasks",
    description: "Create task handlers that do one thing well. Built-in timeout, retry, and progress reporting.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `@task(name="send-email")
class SendEmailTask:
    async def run(self, ctx: TaskContext, input: EmailInput) -> EmailResult:
        ctx.report_progress(0.1, "Connecting to SMTP...")
        ctx.report_progress(0.5, "Sending email...")

        message_id = await email_service.send(input)

        ctx.report_progress(1.0, "Email sent")
        return EmailResult(message_id=message_id, status="sent")`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `const sendEmailTask = task<EmailInput, EmailResult>({
  name: "send-email",

  async run(ctx, input) {
    ctx.reportProgress(0.1, "Connecting to SMTP...");
    ctx.reportProgress(0.5, "Sending email...");

    const messageId = await emailService.send(input);

    ctx.reportProgress(1.0, "Email sent");
    return { messageId, status: "sent" };
  },
});`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `class SendEmailTask : TaskDefinition<EmailInput, EmailResult>() {
    override val kind = "send-email"

    override suspend fun execute(ctx: TaskContext, input: EmailInput): EmailResult {
        ctx.reportProgress(0.1, "Connecting to SMTP...")
        ctx.reportProgress(0.5, "Sending email...")

        val messageId = emailService.send(input)

        ctx.reportProgress(1.0, "Email sent")
        return EmailResult(messageId, "sent")
    }
}`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `pub struct SendEmailTask;

#[async_trait]
impl TaskDefinition for SendEmailTask {
    type Input = EmailInput;
    type Output = EmailResult;

    fn kind(&self) -> &str { "send-email" }

    async fn execute(&self, ctx: &dyn TaskContext, input: Self::Input) -> Result<Self::Output> {
        ctx.report_progress(0.1, Some("Connecting to SMTP..."))?;
        ctx.report_progress(0.5, Some("Sending email..."))?;

        let message_id = email_service.send(&input).await?;

        ctx.report_progress(1.0, Some("Email sent"))?;
        Ok(EmailResult { message_id, status: "sent".into() })
    }
}`,
      },
    ],
  },
  {
    title: "Compose Workflows",
    description: "Build workflows using the WorkflowContext API. Orchestrate tasks, handle failures, add compensation logic.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `@workflow(name="user-onboarding")
class OnboardingWorkflow:
    async def run(self, ctx: WorkflowContext, input: UserInput) -> OnboardingResult:
        user = await ctx.run("create-user", lambda: user_service.create(input))

        # Run email and setup in parallel (schedule_task returns handles)
        email_handle = ctx.schedule_task("send-email", {
            "to": input.email, "subject": "Welcome!", "body": "..."
        })
        setup_handle = ctx.schedule_task("setup-account", {"user_id": user["id"]})
        email_result = await email_handle.result()
        setup_result = await setup_handle.result()

        return OnboardingResult(user_id=user["id"], status="completed")`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `const onboardingWorkflow = workflow<UserInput, OnboardingResult>({
  name: "user-onboarding",

  async run(ctx, input) {
    const user = await ctx.run("create-user", () => userService.create(input));

    // Run email and setup in parallel (scheduleTask returns handles)
    const emailHandle = ctx.scheduleTask(sendEmailTask, {
      to: input.email, subject: "Welcome!", body: "..."
    });
    const setupHandle = ctx.scheduleTask(setupAccountTask, { userId: user.id });
    const [emailResult, setupResult] = await Promise.all([
      emailHandle.result(),
      setupHandle.result(),
    ]);

    return { userId: user.id, status: "completed" };
  },
});`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `class OnboardingWorkflow : WorkflowDefinition<UserInput, OnboardingResult>() {
    override val kind = "user-onboarding"

    override suspend fun execute(ctx: WorkflowContext, input: UserInput): OnboardingResult {
        val user = ctx.run("create-user") { userService.create(input) }

        // Run email and setup in parallel (scheduleAsync returns deferred)
        val (emailResult, setupResult) = awaitAll(
            ctx.scheduleAsync<EmailResult>(
                kind = "send-email",
                input = EmailInput(input.email, "Welcome!", "...")
            ),
            ctx.scheduleAsync<SetupResult>(
                kind = "setup-account",
                input = SetupInput(user.id)
            ),
        )

        return OnboardingResult(user.id, "completed")
    }
}`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `pub struct OnboardingWorkflow;

#[async_trait]
impl WorkflowDefinition for OnboardingWorkflow {
    type Input = UserInput;
    type Output = OnboardingResult;

    fn kind(&self) -> &str { "user-onboarding" }

    async fn execute(&self, ctx: &dyn WorkflowContext, input: Self::Input) -> Result<Self::Output> {
        let user_data = serde_json::to_value(&input)?;
        let user: User = serde_json::from_value(ctx.run_raw("create-user", user_data).await?)?;

        // Run email and setup in parallel (schedule_raw with JSON)
        let email_input = serde_json::to_value(&EmailInput::new(&input.email, "Welcome!", "..."))?;
        let setup_input = serde_json::to_value(&SetupInput::new(&user.id))?;
        let (email_result, setup_result) = tokio::try_join!(
            ctx.schedule_raw("send-email", email_input),
            ctx.schedule_raw("setup-account", setup_input),
        )?;

        Ok(OnboardingResult { user_id: user.id, status: "completed".into() })
    }
}`,
      },
    ],
  },
  {
    title: "Register and Start",
    description: "Register your workflows and tasks with the Flovyn client. Start the worker to poll and execute jobs.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `async def main():
    client = FlovynClient(
        server_url="localhost:9090",
        org_id=my_org_id,
        queue="onboarding-workers",
    )

    client.register_workflow(OnboardingWorkflow)
    client.register_task(SendEmailTask)
    client.register_task(SetupAccountTask)

    async with client:
        await client.run()  # Blocks and polls for work`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `const client = new FlovynClient({
  serverUrl: "localhost:9090",
  orgId: myOrgId,
  queue: "onboarding-workers",
});

client.registerWorkflow(onboardingWorkflow);
client.registerTask(sendEmailTask);
client.registerTask(setupAccountTask);

await client.start(); // Blocks and polls for work`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `fun main() = runBlocking {
    val client = FlovynClientBuilder()
        .serverAddress("localhost", 9090)
        .orgId(myOrgId)
        .queue("onboarding-workers")
        .registerWorkflow(OnboardingWorkflow())
        .registerTask(SendEmailTask())
        .registerTask(SetupAccountTask())
        .build()

    client.start() // Blocks and polls for work
}`,
      },
      {
        language: "rust",
        label: "Rust",
        code: `#[tokio::main]
async fn main() -> Result<()> {
    let client = FlovynClient::builder()
        .server_url("localhost:9090")
        .org_id(&my_org_id)
        .queue("onboarding-workers")
        .register_workflow(OnboardingWorkflow)
        .register_task(SendEmailTask)
        .register_task(SetupAccountTask)
        .build()
        .await?;

    client.run().await // Blocks and polls for work
}`,
      },
    ],
  },
]

export default function GettingStartedPage() {
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
            <h1 className="text-4xl sm:text-5xl font-bold">Getting Started</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              From code to production in three steps. Define tasks, compose workflows, and run your workers.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="feature-card p-6 sm:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {i + 1}
                      </div>
                      <h2 className="text-2xl font-semibold">{step.title}</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  <TabbedCodeBlock tabs={step.tabs} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
