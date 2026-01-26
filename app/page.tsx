import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Capabilities } from "@/components/capabilities"
import { UseCases } from "@/components/use-cases"
import { ValueComparison } from "@/components/value-comparison"
import { DetailTeasers } from "@/components/detail-teasers"
import { BuiltWithRust } from "@/components/built-with-rust"
import { EuropeanSolution } from "@/components/european-solution"
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
      <DetailTeasers />
      <BuiltWithRust />
      <EuropeanSolution />
      <CTA />
      <Footer />
    </div>
  )
}
