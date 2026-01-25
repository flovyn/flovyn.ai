"use client"

import { useEffect, useState } from "react"
import { createHighlighter } from "shiki"

// --- Singleton highlighter instance ---
let highlighterPromise: Promise<import("shiki").Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["kotlin", "python", "rust", "typescript", "java", "xml", "json", "bash"],
    })
  }
  return highlighterPromise
}

export type SupportedLanguage = "kotlin" | "python" | "rust" | "typescript"

interface CodeBlockProps {
  code: string
  language?: SupportedLanguage
  className?: string
  showLineNumbers?: boolean
  filename?: string
}

export function CodeBlock({
  code,
  language = "kotlin",
  className = "",
  showLineNumbers = false,
  filename,
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
      <div className={`code-block-wrapper ${className}`}>
        {filename && (
          <div className="code-block-header">
            <span className="code-block-filename">{filename}</span>
          </div>
        )}
        <pre className={`code-block-pre ${showLineNumbers ? 'line-numbers' : ''}`}>
          <code>{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div className={`code-block-wrapper ${className}`}>
      {filename && (
        <div className="code-block-header">
          <div className="code-block-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="code-block-filename">{filename}</span>
        </div>
      )}
      <div
        className={`code-block-content ${showLineNumbers ? 'line-numbers' : ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

// Language tab selector component
interface LanguageTab {
  language: SupportedLanguage
  label: string
  code: string
  filename?: string
}

interface TabbedCodeBlockProps {
  tabs: LanguageTab[]
  className?: string
}

export function TabbedCodeBlock({ tabs, className = "" }: TabbedCodeBlockProps) {
  const [activeTab, setActiveTab] = useState<SupportedLanguage>(tabs[0]?.language || "kotlin")
  const activeTabData = tabs.find(t => t.language === activeTab) || tabs[0]

  const languageIcons: Record<SupportedLanguage, string> = {
    python: "🐍",
    kotlin: "🟣",
    rust: "🦀",
    typescript: "💠",
  }

  return (
    <div className={`tabbed-code-block ${className}`}>
      <div className="tab-header">
        <div className="tab-list">
          {tabs.map((tab) => (
            <button
              key={tab.language}
              onClick={() => setActiveTab(tab.language)}
              className={`tab-button ${activeTab === tab.language ? 'active' : ''}`}
            >
              <span className="tab-icon">{languageIcons[tab.language]}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
        {activeTabData.filename && (
          <span className="tab-filename">{activeTabData.filename}</span>
        )}
      </div>
      <CodeBlock
        code={activeTabData.code}
        language={activeTab}
      />
    </div>
  )
}
