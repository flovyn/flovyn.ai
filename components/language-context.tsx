"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type SupportedLanguage = "python" | "typescript" | "kotlin" | "rust"

interface LanguageContextType {
  language: SupportedLanguage
  setLanguage: (lang: SupportedLanguage) => void
}

const LanguageContext = createContext<LanguageContextType>({
  language: "python",
  setLanguage: () => {},
})

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguage>("python")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("preferred-language") as SupportedLanguage | null
    if (saved && ["python", "typescript", "kotlin", "rust"].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang)
    localStorage.setItem("preferred-language", lang)
  }

  // Prevent hydration mismatch by rendering with default until mounted
  const value = {
    language: mounted ? language : "python",
    setLanguage,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
