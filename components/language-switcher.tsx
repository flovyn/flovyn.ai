"use client"

import { useLanguage, SupportedLanguage } from "./language-context"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

const languages: { id: SupportedLanguage; label: string; icon: string }[] = [
  { id: "python", label: "Python", icon: "🐍" },
  { id: "typescript", label: "TypeScript", icon: "💠" },
  { id: "kotlin", label: "Kotlin", icon: "🟣" },
  { id: "rust", label: "Rust", icon: "🦀" },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const current = languages.find((l) => l.id === language) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50">
        <span>{current.icon}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.id}
            onClick={() => setLanguage(lang.id)}
            className={language === lang.id ? "bg-secondary/50" : ""}
          >
            <span className="mr-2">{lang.icon}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
