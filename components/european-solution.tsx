import { Flag, Shield, Scale, Building2 } from "lucide-react"

const benefits = [
  {
    icon: Flag,
    title: "European Origin",
    description: "Designed and built in Europe by a European team. Not a US company with an EU subsidiary.",
  },
  {
    icon: Shield,
    title: "Data Sovereignty",
    description: "Your workflow data stays on your infrastructure. No data routing through US servers.",
  },
  {
    icon: Scale,
    title: "GDPR by Design",
    description: "Built with European privacy regulations in mind. Full audit trails for compliance.",
  },
  {
    icon: Building2,
    title: "No US Cloud Lock-in",
    description: "Self-hosted on any infrastructure. No mandatory AWS, Azure, or GCP dependencies.",
  },
]

export function EuropeanSolution() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm text-blue-400">
            <span>🇪🇺</span>
            <span className="font-medium">Made in Europe</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            A European alternative to US workflow platforms
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            For organizations that need workflow orchestration without sending data to US clouds.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div key={i} className="feature-card text-center">
              <div className="feature-card-icon mx-auto !bg-blue-500/10 !text-blue-400">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
