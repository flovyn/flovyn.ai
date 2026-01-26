import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Capabilities } from "@/components/capabilities"
import { CoreAPI } from "@/components/core-api"
import { UseCases } from "@/components/use-cases"
import { ValueComparison } from "@/components/value-comparison"
import { HowItWorks } from "@/components/how-it-works"
import { AIAgents } from "@/components/ai-agents"
import { BuiltWithRust } from "@/components/built-with-rust"
import { EuropeanSolution } from "@/components/european-solution"
import { ProductionReady } from "@/components/production-ready"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Capabilities />
      <CoreAPI />
      <UseCases />
      <ValueComparison />
      <HowItWorks />
      <AIAgents />
      <BuiltWithRust />
      <EuropeanSolution />
      <ProductionReady />
      <CTA />
      <Footer />
    </div>
  )
}
