import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Capabilities } from "@/components/capabilities"
import { UseCases } from "@/components/use-cases"
import { ValueComparison } from "@/components/value-comparison"
import { StandardInfrastructure } from "@/components/standard-infrastructure"
import { EuropeanSolution } from "@/components/european-solution"
import { BuiltWithRust } from "@/components/built-with-rust"
import { DetailTeasers } from "@/components/detail-teasers"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Capabilities />
      <UseCases />
      <ValueComparison />
      <StandardInfrastructure />
      <EuropeanSolution />
      <BuiltWithRust />
      <DetailTeasers />
      <CTA />
      <Footer />
    </div>
  )
}
