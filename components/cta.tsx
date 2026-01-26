import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
              Build resilient workflows today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              Start with code in Python, TypeScript, Kotlin, or Rust. Run AI agents reliably in production.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <BookOpen className="mr-2 h-4 w-4" />
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
