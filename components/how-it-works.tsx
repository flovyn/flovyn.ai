"use client"

import { TabbedCodeBlock, type SupportedLanguage } from "./code-block"

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
        code: `@task(name="send-email", timeout=timedelta(seconds=60))
class SendEmailTask:
    async def run(self, ctx: TaskContext, input: EmailInput) -> EmailResult:
        await ctx.report_progress(0.1, "Connecting to SMTP...")
        await ctx.report_progress(0.5, "Sending email...")

        message_id = await email_service.send(input)

        await ctx.report_progress(1.0, "Email sent")
        return EmailResult(message_id=message_id, status="sent")`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `const sendEmailTask = task<EmailInput, EmailResult>({
  name: "send-email",
  timeout: Duration.seconds(60),

  async run(ctx, input) {
    await ctx.reportProgress(0.1, "Connecting to SMTP...");
    await ctx.reportProgress(0.5, "Sending email...");

    const messageId = await emailService.send(input);

    await ctx.reportProgress(1.0, "Email sent");
    return { messageId, status: "sent" };
  },
});`,
      },
      {
        language: "kotlin",
        label: "Kotlin",
        code: `class SendEmailTask : TaskDefinition<EmailInput, EmailResult>() {
    override val kind = "send-email"
    override val timeoutSeconds = 60

    override suspend fun execute(input: EmailInput, ctx: TaskContext): EmailResult {
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
    fn timeout_seconds(&self) -> Option<u32> { Some(60) }

    async fn execute(&self, input: Self::Input, ctx: &dyn TaskContext) -> Result<Self::Output> {
        ctx.report_progress(0.1, Some("Connecting to SMTP...")).await?;
        ctx.report_progress(0.5, Some("Sending email...")).await?;

        let message_id = email_service.send(&input).await?;

        ctx.report_progress(1.0, Some("Email sent")).await?;
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

        # Run email and setup in parallel
        email_result, setup_result = await asyncio.gather(
            ctx.execute_task(SendEmailTask, EmailInput(
                to=input.email, subject="Welcome!", body="..."
            )),
            ctx.execute_task(SetupAccountTask, SetupInput(user_id=user.id)),
        )

        return OnboardingResult(user_id=user.id, status="completed")`,
      },
      {
        language: "typescript",
        label: "TypeScript",
        code: `const onboardingWorkflow = workflow<UserInput, OnboardingResult>({
  name: "user-onboarding",

  async run(ctx, input) {
    const user = await ctx.run("create-user", () => userService.create(input));

    // Run email and setup in parallel
    const [emailResult, setupResult] = await Promise.all([
      ctx.task(sendEmailTask, {
        to: input.email, subject: "Welcome!", body: "..."
      }),
      ctx.task(setupAccountTask, { userId: user.id }),
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

        // Run email and setup in parallel
        val (emailResult, setupResult) = awaitAll(
            ctx.scheduleAsync<EmailResult>("send-email",
                EmailInput(input.email, "Welcome!", "...")),
            ctx.scheduleAsync<SetupResult>("setup-account",
                SetupInput(user.id)),
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
        let user = ctx.run("create-user", || user_service.create(&input)).await?;

        // Run email and setup in parallel
        let (email_result, setup_result) = tokio::try_join!(
            ctx.schedule(SendEmailTask, &EmailInput::new(&input.email, "Welcome!", "...")),
            ctx.schedule(SetupAccountTask, &SetupInput::new(&user.id)),
        )?;

        Ok(OnboardingResult { user_id: user.id, status: "completed".into() })
    }
}`,
      },
    ],
  },
  {
    title: "Register and Start",
    description: "Register your workflows and tasks with the Flovyn client. They automatically appear in the visual builder.",
    tabs: [
      {
        language: "python",
        label: "Python",
        code: `async def main():
    client = (FlovynClientBuilder()
        .server_address("localhost:9090")
        .org_id(my_org_id)
        .queue("onboarding-workers")
        .register_workflow(OnboardingWorkflow)
        .register_task(SendEmailTask)
        .register_task(SetupAccountTask)
        .build())

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
        code: `fun main() {
    val client = FlovynClient.builder()
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
        .org_id(my_org_id)
        .queue("onboarding-workers")
        .register_workflow(OnboardingWorkflow)
        .register_task(SendEmailTask)
        .register_task(SetupAccountTask)
        .build()
        .await?;

    client.start_worker().await // Blocks and polls for work
}`,
      },
    ],
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From code to production in three steps
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="feature-card p-6 sm:p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      {i + 1}
                    </div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                <TabbedCodeBlock tabs={step.tabs} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
