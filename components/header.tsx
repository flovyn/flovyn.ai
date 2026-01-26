import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BookOpen, Github, ChevronDown } from "lucide-react"
import { FlovynLogoIcon } from "./flovyn-logo"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2.5">
              <FlovynLogoIcon size="md" />
              <span className="text-xl font-semibold">Flovyn</span>
            </a>
            <nav className="hidden items-center gap-6 md:flex">
              <a href="#capabilities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Capabilities
              </a>
              <a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Use Cases
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Comparisons
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <a href="/vs-temporal" className="w-full cursor-pointer">
                      vs Temporal
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/vs-restate" className="w-full cursor-pointer">
                      vs Restate
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/vs-celery" className="w-full cursor-pointer">
                      vs Celery
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/vs-java" className="w-full cursor-pointer">
                      vs Java Ecosystem
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
              <a href="https://github.com/flovyn/flovyn-server" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <BookOpen className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
