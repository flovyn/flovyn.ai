import { Zap, Shield, Cpu, Box, Flag, MapPin } from "lucide-react"

const rustBenefits = [
  {
    icon: Zap,
    title: "Predictable Performance",
    description: "No garbage collection pauses. Consistent low-latency workflow execution under load.",
  },
  {
    icon: Shield,
    title: "Memory Safety",
    description: "Compile-time guarantees prevent null pointer crashes and memory leaks in production.",
  },
  {
    icon: Cpu,
    title: "Low Resource Usage",
    description: "Efficient memory footprint. Self-host on minimal infrastructure without breaking the bank.",
  },
  {
    icon: Box,
    title: "Single Binary",
    description: "No runtime dependencies. Deploy anywhere with a single executable and a PostgreSQL connection.",
  },
]

const europeanBenefits = [
  {
    icon: Flag,
    title: "European Sovereignty",
    description: "Designed and built in Europe. Your data stays under your control, on your infrastructure.",
  },
  {
    icon: MapPin,
    title: "No US Cloud Lock-in",
    description: "Self-hosted first. No mandatory dependencies on AWS, Azure, or Google Cloud services.",
  },
]

export function BuiltWithRust() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-sm text-orange-400">
              <span>🦀</span>
              <span className="font-medium">Built with Rust</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm text-blue-400">
              <span>🇪🇺</span>
              <span className="font-medium">Made in Europe</span>
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Engineered for reliability and sovereignty
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The Flovyn server is written in Rust for maximum performance and safety.
            Designed in Europe with data sovereignty as a first-class concern.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Rust Benefits */}
          <div className="feature-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 text-xl">
                🦀
              </div>
              <h3 className="text-xl font-semibold">Why Rust?</h3>
            </div>
            <div className="space-y-6">
              {rustBenefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* European Benefits */}
          <div className="feature-card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl">
                🇪🇺
              </div>
              <h3 className="text-xl font-semibold">Why European?</h3>
            </div>
            <div className="space-y-6">
              {europeanBenefits.map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}

              {/* Additional context */}
              <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">GDPR-friendly by design.</span>{" "}
                  Run Flovyn on your own servers in any EU data center. No data leaves your infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom comparison */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Unlike workflow platforms built on the JVM or hosted exclusively on US clouds,
            Flovyn gives you <span className="text-foreground font-medium">full control</span> over your execution infrastructure.
          </p>
        </div>
      </div>
    </section>
  )
}
