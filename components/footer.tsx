import { Github, Twitter } from "lucide-react"
import { FlovynLogoIcon } from "./flovyn-logo"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <FlovynLogoIcon size="sm" />
              <span className="font-semibold">Flovyn</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The resilient execution platform for workflow orchestration.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#capabilities" className="hover:text-foreground transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-foreground transition-colors">
                  Use Cases
                </a>
              </li>
              <li>
                <a href="/ai-agents" className="hover:text-foreground transition-colors">
                  AI Agents
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/getting-started" className="hover:text-foreground transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="/core" className="hover:text-foreground transition-colors">
                  Core API
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/flovyn/flovyn-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Source Code
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/flovyn/flovyn-server"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="section-divider mb-8" />
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Flovyn. Made in Europe. Self-hosted first.</p>
        </div>
      </div>
    </footer>
  )
}
