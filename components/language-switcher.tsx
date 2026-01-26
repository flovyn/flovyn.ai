"use client"

import { useLanguage, SupportedLanguage } from "./language-context"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { PythonIcon, TypeScriptIcon, KotlinIcon, RustIcon } from "./language-icons"
import { ReactNode } from "react"

const languages: { id: SupportedLanguage; label: string; icon: ReactNode }[] = [
  { id: "python", label: "Python", icon: <PythonIcon className="h-4 w-4" /> },
  { id: "typescript", label: "TypeScript", icon: <TypeScriptIcon className="h-4 w-4" /> },
  { id: "kotlin", label: "Kotlin", icon: <KotlinIcon className="h-4 w-4" /> },
  { id: "rust", label: "Rust", icon: <RustIcon className="h-4 w-4" /> },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const current = languages.find((l) => l.id === language) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/50">
        {current.icon}
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
