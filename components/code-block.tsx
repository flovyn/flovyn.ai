"use client"

import { useEffect, useState } from "react"
import { createHighlighter } from "shiki"

// --- Singleton highlighter instance ---
let highlighterPromise: Promise<import("shiki").Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["kotlin", "python", "java", "xml"],
    })
  }
  return highlighterPromise
}

interface CodeBlockProps {
  code: string
  language?: "kotlin"
  className?: string
}

export function CodeBlock({
  code,
  language = "kotlin",
  className = "",
}: CodeBlockProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    let mounted = true

    const highlight = async () => {
      const highlighter = await getHighlighter()
      if (!mounted) return

      const highlighted = highlighter.codeToHtml(code, {
        lang: language,
        theme: "github-dark",
      })

      setHtml(highlighted)
    }

    highlight()

    return () => {
      mounted = false
    }
  }, [code, language])

  if (!html) {
    return (
      <div className={`rounded-lg border border-border bg-card p-4 ${className}`}>
        <pre className="text-xs sm:text-sm font-mono overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        fontSize: "0.75rem",
        lineHeight: "1.5",
      }}
    />
  )
}
