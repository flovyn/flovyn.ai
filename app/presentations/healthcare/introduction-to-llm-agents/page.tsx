"use client"

import { useEffect, useRef } from "react"
import "reveal.js/dist/reveal.css"

const THEME = {
  bg: "#1a1625",
  bgAlt: "#221d30",
  surface: "#2a2440",
  surfaceLight: "#352e4a",
  primary: "#8b6cf6",
  primaryLight: "#a78bfa",
  primaryDim: "rgba(139, 108, 246, 0.15)",
  accent: "#38bdf8",
  accentDim: "rgba(56, 189, 248, 0.12)",
  teal: "#2dd4bf",
  tealDim: "rgba(45, 212, 191, 0.12)",
  amber: "#fbbf24",
  rose: "#4ade80",
  text: "#f1f0f5",
  textMuted: "#9ca3af",
  border: "#3d3558",
}

export default function IntroToLLMAgentsPresentation() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let deck: any = null
    async function init() {
      const Reveal = (await import("reveal.js")).default
      if (!deckRef.current) return
      deck = new Reveal(deckRef.current, {
        hash: true,
        slideNumber: "c/t",
        controls: true,
        progress: true,
        center: true,
        transition: "slide",
        backgroundTransition: "fade",
        width: 1280,
        height: 720,
      })
      await deck.initialize()
    }
    init()
    return () => { deck?.destroy() }
  }, [])

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; overflow: hidden; height: 100%; }
        .reveal { font-family: "Geist", system-ui, -apple-system, sans-serif; font-size: 23px; }
        .reveal .slides section {
          text-align: left;
          padding: 40px 60px;
          box-sizing: border-box;
        }
        .reveal h1, .reveal h2, .reveal h3, .reveal h4 {
          font-family: "Geist", system-ui, sans-serif;
          font-weight: 700;
          color: ${THEME.text};
          text-transform: none;
          letter-spacing: -0.02em;
        }
        .reveal h1 { font-size: 2.8em; line-height: 1.1; }
        .reveal h2 { font-size: 2em; line-height: 1.2; }
        .reveal h3 { font-size: 1.4em; }
        .reveal p, .reveal li { color: ${THEME.textMuted}; font-size: 0.95em; line-height: 1.35; }
        .reveal ul, .reveal ol { margin-left: 0; }
        .reveal li { margin-bottom: 0.3em; }
        .reveal .slides { text-align: left; }
        .reveal .slide-number { background: ${THEME.surface}; color: ${THEME.textMuted}; font-size: 14px; padding: 6px 12px; border-radius: 6px; }
        .reveal .progress span { background: ${THEME.primary}; }
        .reveal .controls { color: ${THEME.primary}; }

        .slide-label { display: inline-block; font-size: 0.7em; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: ${THEME.primaryLight}; background: ${THEME.primaryDim}; padding: 6px 16px; border-radius: 999px; margin-bottom: 16px; }
        .slide-subtitle { color: ${THEME.textMuted} !important; font-size: 1em !important; font-weight: 400; margin-top: 8px; }
        .slide-footer { position: absolute; bottom: 24px; left: 60px; right: 60px; display: flex; justify-content: space-between; font-size: 0.6em; color: ${THEME.textMuted}; opacity: 0.6; }
        .accent { color: ${THEME.primaryLight}; }
        .accent-teal { color: ${THEME.teal}; }
        .accent-amber { color: ${THEME.amber}; }
        .accent-rose { color: ${THEME.rose}; }

        .card { background: ${THEME.surface}; border: 1px solid ${THEME.border}; border-radius: 12px; padding: 24px; }
        .card-grid { display: grid; gap: 20px; }
        .card-grid-2 { grid-template-columns: 1fr 1fr; }
        .card-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
        .card-grid-4 { grid-template-columns: 1fr 1fr 1fr 1fr; }
        .card-header { font-size: 0.95em; font-weight: 700; color: ${THEME.text}; margin-bottom: 8px; }
        .card-icon { font-size: 1.5em; margin-bottom: 8px; }

        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; align-items: start; }

        .badge { display: inline-block; font-size: 0.75em; font-weight: 600; padding: 4px 12px; border-radius: 6px; margin-right: 8px; }
        .badge-workflow { background: rgba(56, 189, 248, 0.15); color: ${THEME.accent}; }
        .badge-agent { background: rgba(74, 222, 128, 0.15); color: ${THEME.rose}; }
        .badge-tbd { background: rgba(156, 163, 175, 0.15); color: ${THEME.textMuted}; border: 1px dashed ${THEME.textMuted}; }

        .step-num { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: ${THEME.primaryDim}; color: ${THEME.primaryLight}; font-weight: 700; font-size: 0.9em; margin-right: 14px; flex-shrink: 0; }
        .step-row { display: flex; align-items: flex-start; margin-bottom: 14px; }
        .step-content { flex: 1; }
        .step-title { font-size: 0.95em; font-weight: 600; color: ${THEME.text}; }
        .step-desc { font-size: 0.8em; color: ${THEME.textMuted}; margin-top: 2px; }

        .table-wrap { width: 100%; border-collapse: collapse; font-size: 0.8em; }
        .table-wrap th { text-align: left; padding: 12px 16px; color: ${THEME.primaryLight}; border-bottom: 2px solid ${THEME.border}; font-weight: 600; }
        .table-wrap td { padding: 12px 16px; color: ${THEME.textMuted}; border-bottom: 1px solid ${THEME.border}; }
        .table-wrap tr:last-child td { border-bottom: none; }
        .table-wrap .row-header { color: ${THEME.text}; font-weight: 600; }

        .code-block { background: ${THEME.bgAlt}; border: 1px solid ${THEME.border}; border-radius: 10px; padding: 16px 20px; font-family: "Geist Mono", monospace; font-size: 0.75em; line-height: 1.35; color: ${THEME.textMuted}; overflow: hidden; white-space: pre; }
        .code-comment { color: #6b7280; font-style: italic; }
        .code-keyword { color: ${THEME.primaryLight}; }
        .code-string { color: ${THEME.teal}; }
        .code-fn { color: ${THEME.accent}; }
        .code-var { color: ${THEME.text}; }

        .callout { background: ${THEME.primaryDim}; border-left: 3px solid ${THEME.primary}; border-radius: 0 8px 8px 0; padding: 14px 20px; font-size: 0.85em; color: ${THEME.textMuted}; margin-top: 16px; }
        .callout strong { color: ${THEME.text}; }

        .part-slide { display: flex !important; flex-direction: column; align-items: center !important; justify-content: center !important; text-align: center !important; }
        .part-slide .part-num { font-size: 1.1em; font-weight: 700; color: ${THEME.primary}; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 12px; }
        .part-slide h2 { text-align: center; margin-bottom: 12px; }
        .part-slide .slide-subtitle { text-align: center; }

        .vs-table { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-radius: 12px; overflow: hidden; border: 1px solid ${THEME.border}; }
        .vs-col { padding: 28px; }
        .vs-col-left { background: ${THEME.accentDim}; }
        .vs-col-right { background: rgba(251, 113, 133, 0.08); }
        .vs-col h3 { text-align: center; margin-bottom: 16px; }
        .vs-item { font-size: 0.8em; color: ${THEME.textMuted}; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; gap: 8px; }
        .vs-item:last-child { border-bottom: none; }

        .chat-msg { display: flex; gap: 10px; margin-bottom: 8px; font-size: 0.75em; align-items: flex-start; }
        .chat-icon { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9em; flex-shrink: 0; }
        .chat-user { background: ${THEME.surfaceLight}; }
        .chat-bot { background: ${THEME.primaryDim}; }
        .chat-tool { background: ${THEME.tealDim}; }
        .chat-text { color: ${THEME.textMuted}; line-height: 1.3; padding-top: 3px; }

        .timeline { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .timeline-phase { background: ${THEME.surface}; border: 1px solid ${THEME.border}; border-radius: 12px; padding: 20px; }
        .timeline-phase-label { font-size: 0.7em; font-weight: 600; color: ${THEME.primaryLight}; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
        .timeline-phase-title { font-size: 0.95em; font-weight: 700; color: ${THEME.text}; margin-bottom: 10px; }
        .timeline-phase li { font-size: 0.75em; }

        .guardrail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .guardrail { background: ${THEME.surface}; border: 1px solid ${THEME.border}; border-radius: 12px; padding: 20px; }
        .guardrail-icon { font-size: 1.4em; margin-bottom: 8px; }
        .guardrail-title { font-size: 0.95em; font-weight: 700; color: ${THEME.text}; margin-bottom: 6px; }
        .guardrail-desc { font-size: 0.75em; color: ${THEME.textMuted}; line-height: 1.35; }

        .flow-diagram { display: flex; align-items: center; justify-content: center; gap: 0; margin: 12px 0; }
        .flow-node { display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; font-size: 0.6em; font-weight: 600; white-space: nowrap; }
        .flow-node-code { background: ${THEME.tealDim}; color: ${THEME.teal}; border: 1px solid rgba(45, 212, 191, 0.25); }
        .flow-node-llm { background: ${THEME.primaryDim}; color: ${THEME.primaryLight}; border: 1px solid rgba(139, 108, 246, 0.25); }
        .flow-arrow { color: ${THEME.textMuted}; font-size: 0.7em; margin: 0 4px; opacity: 0.5; }

        .takeaway-list { list-style: none; padding: 0; counter-reset: takeaway; }
        .takeaway-list li { counter-increment: takeaway; display: flex; align-items: flex-start; gap: 16px; margin-bottom: 14px; font-size: 0.95em; color: ${THEME.text}; }
        .takeaway-list li::before { content: counter(takeaway); display: flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; border-radius: 50%; background: ${THEME.primaryDim}; color: ${THEME.primaryLight}; font-weight: 700; font-size: 0.85em; }
      `}</style>

      <div className="reveal" ref={deckRef} style={{ background: THEME.bg }}>
        <div className="slides">

          {/* ===== SLIDE 1: TITLE ===== */}
          <section data-background={`linear-gradient(135deg, ${THEME.bg} 0%, ${THEME.bgAlt} 50%, ${THEME.bg} 100%)`}>
            <div style={{ textAlign: "center", paddingTop: 40 }}>
              <h1 style={{ fontSize: "2.6em", marginBottom: 16 }}>
                Introduction to LLMs,<br />
                <span style={{ color: THEME.accent }}>Workflows</span> <span style={{ color: THEME.rose }}>&amp; AI Agents.</span>
              </h1>
              <p style={{ fontSize: "1.4em", color: THEME.textMuted, marginTop: 24 }}>Manh-Ha Vu</p>
            </div>
          </section>

          {/* ===== SLIDE 2: AGENDA ===== */}
          <section>
            <div className="slide-label">Overview</div>
            <h2>Agenda</h2>
            <div className="card-grid card-grid-2" style={{ marginTop: 24 }}>
              {[
                { n: "01", title: "What is an LLM?", desc: "Language models explained simply" },
                { n: "02", title: "Building with LLMs", desc: "Workflows, agents, and trade-offs" },
                { n: "03", title: "Use Cases", desc: "Smarter products & internal processes" },
                { n: "04", title: "Getting Started", desc: "Practical next steps" },
              ].map((item) => (
                <div className="card" key={item.n} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.4em", fontWeight: 800, color: THEME.primary, lineHeight: 1 }}>{item.n}</span>
                  <div>
                    <div className="card-header">{item.title}</div>
                    <p style={{ margin: 0, fontSize: "0.6em" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* ===== SLIDE 3: PART 01 ===== */}
          <section className="part-slide" data-background={`radial-gradient(ellipse at center, ${THEME.bgAlt} 0%, ${THEME.bg} 70%)`}>
            <div className="part-num">Part 01</div>
            <h2>What is an LLM?</h2>
            <p className="slide-subtitle">Large Language Models — the engine behind AI assistants</p>
          </section>

          {/* ===== SLIDE 4: WHAT IS AN LLM ===== */}
          <section>
            <div className="slide-label">Part 01</div>
            <h2 style={{ fontSize: "1.5em" }}>What is a Large Language Model?</h2>
            <p className="slide-subtitle">A very well-read autocomplete — at massive scale</p>
            <div className="two-col" style={{ marginTop: 20 }}>
              <div>
                <h3 style={{ fontSize: "1em", marginBottom: 12 }}>Think of it like this&hellip;</h3>
                <p style={{ fontSize: "0.85em", lineHeight: 1.4 }}>
                  An LLM is trained on hundreds of billions of words — books, websites, code, papers.
                </p>
                <p style={{ fontSize: "0.85em", lineHeight: 1.4 }}>
                  It learned to predict the next token so well that it can hold conversations, answer questions,
                  summarize documents, and write code.
                </p>
                <p style={{ fontSize: "0.85em", lineHeight: 1.4 }}>
                  You send text (a <strong className="accent">prompt</strong>) &rarr; it returns text (a <strong className="accent">response</strong>).
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "1em", marginBottom: 12 }}>Well-known LLMs</h3>
                <div className="card-grid" style={{ gap: 10 }}>
                  {[
                    { name: "ChatGPT", org: "OpenAI" },
                    { name: "Claude", org: "Anthropic" },
                    { name: "Gemini", org: "Google" },
                    { name: "Llama", org: "Meta — open source" },
                  ].map((m) => (
                    <div className="card" key={m.name} style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.9em", color: THEME.text }}>{m.name}</span>
                      <span style={{ fontSize: "0.75em", color: THEME.textMuted }}>{m.org}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="callout">
              &#128161; <strong>Not magic — pattern matching at scale.</strong> The model does not think, feel, or understand.
            </div>

          </section>

          {/* ===== SLIDE 5: HOW DOES AN LLM WORK ===== */}
          <section>
            <div className="slide-label">Part 01</div>
            <h2 style={{ fontSize: "1.5em" }}>How Does an LLM Actually Work?</h2>
            <p className="slide-subtitle">Four steps from your text to its response</p>
            <div style={{ marginTop: 24 }}>
              {[
                { n: "1", title: "You write a prompt", desc: '"Summarize this patient note in 2 sentences"' },
                { n: "2", title: "Tokenization", desc: "Text is split into small units called tokens (~3/4 of a word each)" },
                { n: "3", title: "Neural network processing", desc: "Billions of learned weights predict the best next token — repeatedly" },
                { n: "4", title: "Response assembled", desc: "Tokens are decoded back into human-readable text" },
              ].map((s) => (
                <div className="step-row" key={s.n}>
                  <span className="step-num">{s.n}</span>
                  <div className="step-content">
                    <div className="step-title">{s.title}</div>
                    <div className="step-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="callout">
              <strong>Key insight:</strong> LLMs predict — they do not think, feel, or truly understand.
            </div>

          </section>

          {/* ===== SLIDE 6: BEYOND TEXT — MODERN LLM CAPABILITIES ===== */}
          <section>
            <div className="slide-label">Part 01</div>
            <h2 style={{ fontSize: "1.4em" }}>Beyond Text — What Modern LLMs Can Do</h2>
            <p className="slide-subtitle">Not just a chat UI — these capabilities enable real products</p>
            <div className="card-grid card-grid-3" style={{ marginTop: 20 }}>
              {[
                {
                  icon: "\u{1F527}",
                  title: "Tool Use",
                  desc: "LLMs can call APIs, query databases, book appointments, send emails — any function you expose.",
                  color: THEME.accent,
                },
                {
                  icon: "\u{1F9E0}",
                  title: "Reasoning",
                  desc: "Chain-of-thought, step-by-step problem solving. Can analyze symptoms, compare options, plan multi-step tasks.",
                  color: THEME.primaryLight,
                },
                {
                  icon: "\u{1F441}",
                  title: "Vision",
                  desc: "Read images: prescriptions, lab results, X-rays, handwritten notes, scanned documents.",
                  color: THEME.teal,
                },
                {
                  icon: "\u{1F3A4}",
                  title: "Audio",
                  desc: "Speech-to-text and text-to-speech. Enables voice-based interfaces for patients and doctors.",
                  color: THEME.amber,
                },
                {
                  icon: "\u{1F5A5}",
                  title: "Computer Use",
                  desc: "Control a browser or desktop — navigate patient record systems, fill forms, extract data from legacy software.",
                  color: THEME.rose,
                },
                {
                  icon: "\u{1F517}",
                  title: "Structured Output",
                  desc: "Return JSON, fill schemas, generate typed data — not just free text. Integrates directly into your code.",
                  color: THEME.primary,
                },
              ].map((cap, i) => (
                <div className="card" key={i} style={{ borderTopWidth: 2, borderTopColor: cap.color }}>
                  <div style={{ fontSize: "1.4em", marginBottom: 6 }}>{cap.icon}</div>
                  <div className="card-header" style={{ color: cap.color }}>{cap.title}</div>
                  <p style={{ margin: 0, fontSize: "0.7em" }}>{cap.desc}</p>
                </div>
              ))}
            </div>
            <div className="callout" style={{ textAlign: "center" }}>
              These capabilities turn LLMs from chat assistants into <strong>building blocks for real products</strong>.
            </div>
          </section>

          {/* ===== SLIDE: HOW ARE LLMs HOSTED ===== */}
          <section>
            <div className="slide-label">Part 01</div>
            <h2 style={{ fontSize: "1.4em" }}>How Are LLMs Hosted?</h2>
            <p className="slide-subtitle">Two deployment models — each with different trade-offs</p>
            <div className="two-col" style={{ marginTop: 24 }}>
              <div className="card" style={{ borderTopWidth: 2, borderTopColor: THEME.accent }}>
                <div style={{ fontSize: "1.4em", marginBottom: 6 }}>&#9729;&#65039;</div>
                <div className="card-header" style={{ fontSize: "1em", color: THEME.accent }}>API / Model Provider</div>
                <p style={{ fontSize: "0.75em", marginBottom: 12 }}>Use a hosted service — pay per token, no infrastructure to manage.</p>
                <ul style={{ paddingLeft: 16, margin: 0, listStyleType: "disc" }}>
                  {[
                    "OpenAI, Anthropic, Google, Mistral, etc.",
                    "Fastest way to start — API key and go",
                    "Always the latest models",
                    "Pay-as-you-go pricing (per token)",
                    "Data leaves your infrastructure",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.68em", marginBottom: 3, lineHeight: 1.35 }}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ borderTopWidth: 2, borderTopColor: THEME.teal }}>
                <div style={{ fontSize: "1.4em", marginBottom: 6 }}>&#127968;</div>
                <div className="card-header" style={{ fontSize: "1em", color: THEME.teal }}>Self-Hosted / Dedicated GPU</div>
                <p style={{ fontSize: "0.75em", marginBottom: 12 }}>Run open-source models on your own infrastructure.</p>
                <ul style={{ paddingLeft: 16, margin: 0, listStyleType: "disc" }}>
                  {[
                    "Llama, Mistral, Qwen — open-weight models",
                    "Full data sovereignty — nothing leaves your servers",
                    "Required for sensitive patient data (GDPR / HDS)",
                    "Needs GPU hardware (NVIDIA A100, H100, etc.)",
                    "You manage updates, scaling, and ops",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.68em", marginBottom: 3, lineHeight: 1.35 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="callout" style={{ textAlign: "center" }}>
              <strong>In healthcare:</strong> API providers for internal tools &amp; non-sensitive data. Self-hosted for anything touching patient records.
            </div>
          </section>

          {/* ===== SLIDE: PART 02 ===== */}
          <section className="part-slide" data-background={`radial-gradient(ellipse at center, ${THEME.bgAlt} 0%, ${THEME.bg} 70%)`}>
            <div className="part-num">Part 02</div>
            <h2>Building with LLMs</h2>
            <p className="slide-subtitle">Workflows, agents, and the trade-offs between them</p>
          </section>

          {/* ===== SLIDE 7: KEY DISTINCTION ===== */}
          <section>
            <div className="slide-label">Part 02</div>
            <h2 style={{ fontSize: "1.4em" }}>The Key Architectural Distinction</h2>
            <p className="slide-subtitle">{"From Anthropic's \"Building Effective Agents\" — Dec 2024"}</p>
            <div className="vs-table" style={{ marginTop: 20 }}>
              <div className="vs-col vs-col-left">
                <h3 style={{ fontSize: "1.1em" }}>
                  <span className="badge badge-workflow">Workflow</span>
                </h3>
                <p style={{ fontSize: "0.85em", color: THEME.text, fontWeight: 600, marginBottom: 12 }}>
                  LLMs and tools orchestrated through predefined code paths.
                </p>
                {[
                  "You define the flow in code",
                  "Steps run in a fixed sequence",
                  "Predictable & consistent output",
                  "Easier to test and validate",
                  "Good for well-defined tasks",
                ].map((item, i) => (
                  <div className="vs-item" key={i}><span style={{ color: THEME.accent }}>&#10003;</span> {item}</div>
                ))}
              </div>
              <div className="vs-col vs-col-right">
                <h3 style={{ fontSize: "1.1em" }}>
                  <span className="badge badge-agent">Agent</span>
                </h3>
                <p style={{ fontSize: "0.85em", color: THEME.text, fontWeight: 600, marginBottom: 12 }}>
                  LLMs dynamically direct their own process and tool usage.
                </p>
                {[
                  "LLM decides the next step itself",
                  "Path is not known in advance",
                  "More flexible & autonomous",
                  "Higher cost, more complexity",
                  "Good for open-ended problems",
                ].map((item, i) => (
                  <div className="vs-item" key={i}><span style={{ color: THEME.rose }}>&#10003;</span> {item}</div>
                ))}
              </div>
            </div>
            <div className="callout" style={{ textAlign: "center" }}>
              Anthropic: <em>{'"Start simple. Only increase complexity when it demonstrably improves outcomes."'}</em>
            </div>

          </section>

          {/* ===== SLIDE 8: WORKFLOW DIAGRAM ===== */}
          <section>
            <div className="slide-label">Part 02 &middot; Workflow</div>
            <h2 style={{ fontSize: "1.3em" }}>Workflow Example — Post-Consultation Pipeline</h2>
            <p className="slide-subtitle">After a doctor appointment: transcribe, structure, act — automatically</p>
            <div style={{ margin: "40px auto 0", maxWidth: 900 }}>
              <svg width="100%" viewBox="0 0 900 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* ── Node boxes ── */}
                {/* Audio */}
                <rect x="5" y="80" width="100" height="36" rx="6" fill={THEME.surface} stroke={THEME.teal} strokeWidth="1.5" />
                <text x="55" y="103" textAnchor="middle" fontSize="14" fill={THEME.teal} fontFamily="Geist, system-ui, sans-serif">&#127908; Audio</text>
                {/* Transcribe */}
                <rect x="165" y="80" width="120" height="36" rx="6" fill={THEME.surface} stroke={THEME.teal} strokeWidth="1.5" />
                <text x="225" y="103" textAnchor="middle" fontSize="14" fill={THEME.teal} fontFamily="Geist, system-ui, sans-serif">Transcribe</text>
                {/* LLM: Note */}
                <rect x="430" y="35" width="120" height="36" rx="6" fill={THEME.surface} stroke={THEME.primary} strokeWidth="1.5" />
                <text x="490" y="58" textAnchor="middle" fontSize="14" fill={THEME.primaryLight} fontFamily="Geist, system-ui, sans-serif">LLM: Note</text>
                {/* LLM: Actions */}
                <rect x="430" y="127" width="140" height="36" rx="6" fill={THEME.surface} stroke={THEME.primary} strokeWidth="1.5" />
                <text x="500" y="150" textAnchor="middle" fontSize="14" fill={THEME.primaryLight} fontFamily="Geist, system-ui, sans-serif">LLM: Actions</text>
                {/* Patient Update */}
                <rect x="640" y="35" width="130" height="36" rx="6" fill={THEME.surface} stroke={THEME.teal} strokeWidth="1.5" />
                <text x="705" y="58" textAnchor="middle" fontSize="14" fill={THEME.teal} fontFamily="Geist, system-ui, sans-serif">Patient Update</text>
                {/* Schedule & Notify */}
                <rect x="660" y="127" width="160" height="36" rx="6" fill={THEME.surface} stroke={THEME.teal} strokeWidth="1.5" />
                <text x="740" y="150" textAnchor="middle" fontSize="14" fill={THEME.teal} fontFamily="Geist, system-ui, sans-serif">Schedule &amp; Notify</text>

                {/* ── Connecting lines (dashed) ── */}
                {/* Audio → Transcribe */}
                <line x1="105" y1="98" x2="165" y2="98" stroke={THEME.textMuted} strokeWidth="2" strokeDasharray="5 4" />
                {/* Transcribe → fork dot */}
                <line x1="285" y1="98" x2="380" y2="98" stroke={THEME.textMuted} strokeWidth="2" strokeDasharray="5 4" />
                {/* Fork vertical lines */}
                <line x1="390" y1="53" x2="390" y2="145" stroke={THEME.textMuted} strokeWidth="2" strokeDasharray="5 4" />
                {/* Fork → LLM: Note */}
                <line x1="390" y1="53" x2="430" y2="53" stroke={THEME.textMuted} strokeWidth="2" strokeDasharray="5 4" />
                {/* Fork → LLM: Actions */}
                <line x1="390" y1="145" x2="430" y2="145" stroke={THEME.textMuted} strokeWidth="2" strokeDasharray="5 4" />
                {/* LLM: Note → Patient Update */}
                <line x1="550" y1="53" x2="640" y2="53" stroke={THEME.textMuted} strokeWidth="2" strokeDasharray="5 4" />
                {/* LLM: Actions → Schedule & Notify */}
                <line x1="570" y1="145" x2="660" y2="145" stroke={THEME.textMuted} strokeWidth="2" strokeDasharray="5 4" />

                {/* Fork dot */}
                <circle cx="390" cy="98" r="5" fill={THEME.primary} />
                {/* Parallel label */}
                <text x="390" y="115" textAnchor="middle" fontSize="11" fill={THEME.textMuted} fontStyle="italic">parallel</text>
              </svg>
            </div>
            <div className="callout" style={{ textAlign: "center", marginTop: 24 }}>
              Code steps in <strong style={{ color: THEME.teal }}>teal</strong>, LLM steps in <strong style={{ color: THEME.primary }}>purple</strong>. The path is fully predefined — no LLM decides what happens next.
            </div>
          </section>

          {/* ===== SLIDE 9: WORKFLOW DETAILS ===== */}
          <section>
            <div className="slide-label">Part 02 &middot; Workflow</div>
            <h2 style={{ fontSize: "1.3em" }}>Post-Consultation Pipeline — In Code</h2>
            <p className="slide-subtitle">Each step is explicit — mix of plain code and LLM calls</p>
            <div className="two-col" style={{ marginTop: 16 }}>
              <div>
                {[
                  { n: "1", title: "Transcribe consultation", desc: "Audio recording → speech-to-text transcription", llm: false },
                  { n: "2", title: "Generate clinical note", desc: "LLM structures transcript into a clinical note", llm: true },
                  { n: "3", title: "Extract follow-up actions", desc: "LLM identifies prescriptions, lab orders, referrals, next appointment", llm: true },
                  { n: "4", title: "Update patient record", desc: "Write note + actions to patient record, attach to patient file", llm: false },
                  { n: "5", title: "Schedule & notify", desc: "Book follow-up, send prescription to pharmacy, notify patient", llm: false },
                ].map((s) => (
                  <div className="step-row" key={s.n} style={{ marginBottom: 8 }}>
                    <span className="step-num" style={{ background: s.llm ? THEME.primaryDim : THEME.tealDim, color: s.llm ? THEME.primaryLight : THEME.teal }}>{s.n}</span>
                    <div className="step-content">
                      <div className="step-title">
                        {s.title}
                        {s.llm && <span className="badge badge-workflow" style={{ marginLeft: 8, fontSize: "0.9em" }}>LLM</span>}
                      </div>
                      <div className="step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="code-block"><span className="code-comment">{"# post_consultation.py"}</span>{"\n\n"}<span className="code-comment">{"# Step 1 — Transcribe (no LLM)"}</span>{"\n"}<span className="code-var">transcript</span>{" = "}<span className="code-fn">stt.transcribe</span>{"(audio)\n\n"}<span className="code-comment">{"# Step 2–3 — Parallel LLM calls"}</span>{"\n"}<span className="code-var">note</span>{", "}<span className="code-var">actions</span>{" = "}<span className="code-fn">parallel</span>{"(\n  "}<span className="code-fn">llm.generate</span>{"(transcript, "}<span className="code-keyword">schema</span>{"="}<span className="code-string">ClinicalNote</span>{"),\n  "}<span className="code-fn">llm.extract</span>{"(transcript, "}<span className="code-keyword">schema</span>{"="}<span className="code-string">FollowUpActions</span>{"),\n)\n\n"}<span className="code-comment">{"# Step 4–5 — Update & schedule"}</span>{"\n"}<span className="code-fn">ehr.save</span>{"(patient, note, actions)\n"}<span className="code-fn">scheduler.book</span>{"(actions.followup)"}</div>
            </div>
            <div className="callout">
              <strong>Key:</strong> every step is predefined. The LLM handles text intelligence (steps 2–3), plain code handles the rest.
            </div>

          </section>

          {/* ===== SLIDE 9: AGENT EXAMPLE ===== */}
          <section>
            <div className="slide-label">Part 02 &middot; Agent</div>
            <h2 style={{ fontSize: "1.3em" }}>Agent Example — Live Booking Call</h2>
            <p className="slide-subtitle">Real-time voice: user can barge in, change mind, go off-script</p>
            <div className="two-col" style={{ marginTop: 16 }}>
              <div>
                <div style={{ background: THEME.surface, borderRadius: 12, padding: 20, border: `1px solid ${THEME.border}` }}>
                  {[
                    { icon: "&#128100;", type: "user", text: "I need to see a doctor about my knee" },
                    { icon: "&#9881;", type: "tool", text: "Tool: check_availability(orthopedics)" },
                    { icon: "&#129302;", type: "bot", text: "I have Thursday 9am or Friday 2pm" },
                    { icon: "&#128100;", type: "user", text: "Thursday — wait, is it covered by carte vitale?" },
                    { icon: "&#9881;", type: "tool", text: "Tool: check_coverage(patient_id)" },
                    { icon: "&#129302;", type: "bot", text: "Yes, fully covered. Confirm Thursday 9am?" },
                    { icon: "&#128100;", type: "user", text: "Actually, make it the afternoon please" },
                    { icon: "&#9881;", type: "tool", text: "Tool: check_availability(thursday, pm)" },
                    { icon: "&#129302;", type: "bot", text: "Thursday 3pm available. Book it?" },
                    { icon: "&#128100;", type: "user", text: "Yes, perfect" },
                    { icon: "&#9881;", type: "tool", text: "Tool: book_appointment(...) ✓" },
                  ].map((msg, i) => (
                    <div className="chat-msg" key={i}>
                      <span className={`chat-icon chat-${msg.type}`} dangerouslySetInnerHTML={{ __html: msg.icon }} />
                      <span className="chat-text">{msg.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: "1em", marginBottom: 12 }}>Tools available to the agent</h3>
                <div className="code-block" style={{ fontSize: "0.6em", marginBottom: 12 }}><span className="code-var">tools</span>{" = [\n"}<span className="code-fn">{"  check_availability"}</span>{"(specialty, date),\n"}<span className="code-fn">{"  check_coverage"}</span>{"(patient_id),\n"}<span className="code-fn">{"  book_appointment"}</span>{"(doctor, slot),\n"}<span className="code-fn">{"  send_confirmation"}</span>{"(patient, slot),\n]"}</div>
                <div className="code-block" style={{ fontSize: "0.6em", marginBottom: 12 }}><span className="code-comment">{"# The agent loop"}</span>{"\n"}<span className="code-keyword">while</span>{" "}<span className="code-keyword">not</span>{" done:\n  user_msg = "}<span className="code-fn">listen</span>{"()\n  response = "}<span className="code-fn">llm</span>{"(user_msg, tools)\n  "}<span className="code-keyword">if</span>{" response.tool_call:\n    result = "}<span className="code-fn">run</span>{"(response.tool_call)\n    response = "}<span className="code-fn">llm</span>{"(result, tools)\n  "}<span className="code-fn">speak</span>{"(response.text)"}</div>
                <p style={{ fontSize: "0.7em" }}>
                  You define the <strong className="accent">tools</strong> — the LLM decides <strong className="accent">when and how</strong> to use them.
                </p>
              </div>
            </div>

          </section>

          {/* ===== SLIDE 10: DECISION TABLE ===== */}
          <section>
            <div className="slide-label">Part 02</div>
            <h2 style={{ fontSize: "1.4em" }}>How to Decide: Workflow or Agent?</h2>
            <p className="slide-subtitle">Ask these questions before you build</p>
            <div style={{ marginTop: 16 }}>
              <table className="table-wrap">
                <thead>
                  <tr>
                    <th>Decision question</th>
                    <th><span className="badge badge-workflow">&rarr; Workflow</span></th>
                    <th><span className="badge badge-agent">&rarr; Agent</span></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Is the user interacting in real time?", "No — batch or async", "Yes — live conversation"],
                    ["Do you know all the steps in advance?", "Yes — code the path", "No — depends on inputs/replies"],
                    ["Does the task require mid-task decisions?", "No — fixed branching is enough", "Yes — LLM must reason at each step"],
                    ["Is auditability critical?", "Yes — predefined steps are auditable", "Harder — add logging + guardrails"],
                    ["What's the latency tolerance?", "Can tolerate batch delay", "Needs real-time response (< 2s)"],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="row-header">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="callout" style={{ textAlign: "center" }}>
              <strong>Rule of thumb:</strong> if the task can be decomposed into predictable steps &rarr; <strong style={{ color: THEME.accent }}>Workflow</strong>.
              If it requires flexible, model-driven decision-making &rarr; <strong style={{ color: THEME.rose }}>Agent</strong>. Always start with the simplest approach.
            </div>

          </section>

          {/* ===== SLIDE: THE CATCH ===== */}
          <section>
            <div className="slide-label">Part 02</div>
            <h2 style={{ fontSize: "1.3em" }}>The Reality Check — Why Not Agents Everywhere?</h2>
            <p className="slide-subtitle">AI agents are powerful, but they come with real trade-offs</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 24 }}>
              {[
                {
                  icon: "&#127922;",
                  title: "Predictability",
                  items: [
                    "LLMs are non-deterministic — same input can produce different output",
                    "Even in workflows: LLM steps need validation & guardrails",
                    "Agents amplify this: each decision compounds uncertainty",
                    "Workflows help by constraining the path, but LLM outputs still vary",
                    "In healthcare: predictability = safety",
                  ],
                },
                {
                  icon: "&#128176;",
                  title: "Cost",
                  items: [
                    "Each LLM call costs tokens — agents make many calls per task",
                    "An agent loop can be 10–50× more expensive than a single prompt",
                    "Retries, reasoning, tool use all add up fast",
                    "Budget for eval & monitoring on top",
                  ],
                },
                {
                  icon: "&#127968;",
                  title: "Self-Hosting for Patient Data",
                  items: [
                    "Patient data cannot go to external APIs (GDPR / HDS)",
                    "Self-hosted LLMs (e.g. Llama, Mistral) require GPU infrastructure",
                    "Smaller models = cheaper but less capable",
                    "Total cost: hardware + ops + model tuning",
                  ],
                },
              ].map((col, i) => (
                <div className="card" key={i} style={{ borderTopWidth: 2, borderTopColor: i === 0 ? THEME.amber : i === 1 ? "#f87171" : THEME.accent }}>
                  <div style={{ fontSize: "1.2em", marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: col.icon }} />
                  <div className="card-header" style={{ fontSize: "0.85em" }}>{col.title}</div>
                  <ul style={{ paddingLeft: 16, margin: 0, listStyleType: "disc" }}>
                    {col.items.map((item, j) => (
                      <li key={j} style={{ fontSize: "0.62em", marginBottom: 3, lineHeight: 1.35 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="callout" style={{ textAlign: "center", marginTop: 16 }}>
              <strong>Start with workflows.</strong> Use agents only where the flexibility justifies the cost and complexity.
            </div>
          </section>

          {/* ===== SLIDE: GUARDRAILS ===== */}
          <section>
            <div className="slide-label">Part 02</div>
            <h2 style={{ fontSize: "1.3em" }}>Healthcare AI — Non-Negotiable Guardrails</h2>
            <p className="slide-subtitle">These apply whether {"you're"} using workflows or full agents</p>
            <div className="guardrail-grid" style={{ marginTop: 20 }}>
              {[
                { icon: "&#128274;", title: "Data Privacy & GDPR / HDS", desc: "Anonymize data before sending to any API. Use GDPR-compliant or on-premise models. Never send identifiable patient data to unvetted services." },
                { icon: "&#128105;&zwj;&#9877;", title: "Human-in-the-Loop Always", desc: "AI assists — it does not decide. All clinical outputs need a qualified professional to review. Build confirmation steps into every UX flow." },
                { icon: "&#128203;", title: "Regulatory Awareness", desc: "In France, HAS provides AI guidelines. Software used in clinical decisions may require MDR Class IIa certification. Verify early." },
                { icon: "&#129514;", title: "Test, Evaluate, Monitor", desc: "LLMs can hallucinate. Build eval pipelines, log outputs, monitor for drift. Treat AI outputs like any untrusted external input." },
              ].map((g, i) => (
                <div className="guardrail" key={i}>
                  <div className="guardrail-icon" dangerouslySetInnerHTML={{ __html: g.icon }} />
                  <div className="guardrail-title">{g.title}</div>
                  <div className="guardrail-desc">{g.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ===== SLIDE: PART 03 ===== */}
          <section className="part-slide" data-background={`radial-gradient(ellipse at center, ${THEME.bgAlt} 0%, ${THEME.bg} 70%)`}>
            <div className="part-num">Part 03</div>
            <h2>Use Cases</h2>
            <p className="slide-subtitle">Two axes of AI opportunity for your team</p>
          </section>

          {/* ===== SLIDE: SMARTER PRODUCTS — INTRO ===== */}
          <section>
            <h2 style={{ fontSize: "1.4em" }}>&#128640; Smarter Products</h2>
            <p className="slide-subtitle">Make your products more intelligent — directly improving productivity for your customers</p>
            <div className="card-grid card-grid-2" style={{ marginTop: 20 }}>
              {[
                { badge: "agent", title: "Live Voice Booking Call", desc: "Patient speaks freely — books, changes mind, asks about coverage. Agent handles the full conversation, calls tools on demand." },
                { badge: "workflow", title: "Smart Transcription", desc: "After the call: transcribe → extract reason & specialty → enrich patient record → update CRM. Fixed, repeatable pipeline." },
                { badge: "workflow", title: "Referral & Lab Result Triage", desc: "Incoming PDF/fax → extract → classify urgency & specialty → route to right GP queue → archive. Mixed code + LLM pipeline." },
                { badge: "agent", title: "Admin & Paperwork Assistant", desc: "Automates mundane tasks for doctors — fills forms, drafts referral letters, updates patient records, prepares billing summaries. Less admin, more care." },
                { badge: "tbd", title: "To Discover", desc: "What other product features could benefit from AI? Let's brainstorm together during the discussion." },
              ].map((c, i) => (
                <div className="card" key={i}>
                  <span className={`badge badge-${c.badge}`}>{c.badge}</span>
                  <div className="card-header" style={{ marginTop: 8 }}>{c.title}</div>
                  <p style={{ margin: 0, fontSize: "0.7em" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== SLIDE: INTERNAL PROCESSES ===== */}
          <section>
            <h2 style={{ fontSize: "1.4em" }}>&#9881;&#65039; Internal Processes</h2>
            <p className="slide-subtitle">Automate and accelerate your own workflows — ship faster, reduce manual work</p>
            <div className="card-grid card-grid-2" style={{ marginTop: 20 }}>
              {[
                { badge: "agent", title: "Coding Agents", desc: "Tools like Claude Code accelerate development — write features, debug issues, refactor code with full codebase context." },
                { badge: "workflow", title: "Automated Code Review", desc: "PR submitted → run static analysis → LLM reviews for logic errors, security issues → post comments. Consistent, repeatable." },
                { badge: "agent", title: "In-App Support Agent", desc: "Agent guides users through features, answers how-to questions, and resolves trivial issues — reducing support tickets and educating users." },
                { badge: "tbd", title: "To Discover", desc: "What internal processes could benefit from AI? Let's brainstorm together during the discussion." },
              ].map((c, i) => (
                <div className="card" key={i}>
                  <span className={`badge badge-${c.badge}`}>{c.badge}</span>
                  <div className="card-header" style={{ marginTop: 8 }}>{c.title}</div>
                  <p style={{ margin: 0, fontSize: "0.7em" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ===== SLIDE: PART 04 ===== */}
          <section className="part-slide" data-background={`radial-gradient(ellipse at center, ${THEME.bgAlt} 0%, ${THEME.bg} 70%)`}>
            <div className="part-num">Part 04</div>
            <h2>Getting Started</h2>
            <p className="slide-subtitle">What your team can do right now</p>
          </section>

          {/* ===== SLIDE: GETTING STARTED ===== */}
          <section>
            <div className="slide-label">Part 04</div>
            <h2 style={{ fontSize: "1.4em" }}>Getting Started — Two Tracks in Parallel</h2>
            <p className="slide-subtitle">Start building experience now, on both axes</p>
            <div className="two-col" style={{ marginTop: 24 }}>
              <div className="card" style={{ borderTopWidth: 2, borderTopColor: THEME.teal }}>
                <div style={{ fontSize: "1.4em", marginBottom: 6 }}>&#9881;&#65039;</div>
                <div className="card-header" style={{ fontSize: "1em", color: THEME.teal }}>Internal — Adopt AI Today</div>
                <p style={{ fontSize: "0.75em", marginBottom: 12 }}>Start with coding agents to build AI fluency across the team.</p>
                <ul style={{ paddingLeft: 16, margin: 0, listStyleType: "disc" }}>
                  {[
                    "Set up Claude Code / Cursor for the dev team",
                    "Use AI for code review, debugging, refactoring",
                    "Learn prompting through daily development work",
                    "Low risk, immediate productivity gains",
                    "Builds intuition for what LLMs can (and can't) do",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.68em", marginBottom: 3, lineHeight: 1.35 }}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ borderTopWidth: 2, borderTopColor: THEME.accent }}>
                <div style={{ fontSize: "1.4em", marginBottom: 6 }}>&#128640;</div>
                <div className="card-header" style={{ fontSize: "1em", color: THEME.accent }}>Product — Pick One High-Value Feature</div>
                <p style={{ fontSize: "0.75em", marginBottom: 12 }}>Start with AI-powered telephony booking to gain real-world experience.</p>
                <ul style={{ paddingLeft: 16, margin: 0, listStyleType: "disc" }}>
                  {[
                    "Voice booking agent: clear value, measurable impact",
                    "Covers the full stack: audio, LLM, tool use, workflows",
                    "Learn about latency, cost, and error handling in practice",
                    "Use the experience to inform your broader AI roadmap",
                  ].map((item, i) => (
                    <li key={i} style={{ fontSize: "0.68em", marginBottom: 3, lineHeight: 1.35 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="callout" style={{ textAlign: "center" }}>
              <strong>Both tracks reinforce each other:</strong> internal AI adoption builds the skills needed to ship smarter products.
            </div>
          </section>

          {/* ===== SLIDE 19: QUICK REFERENCE TABLE ===== */}
          <section>
            <div className="slide-label">Reference</div>
            <h2 style={{ fontSize: "1.4em" }}>Quick Reference: LLM &middot; Workflow &middot; Agent</h2>
            <p className="slide-subtitle">Choose the right tool for the job</p>
            <div style={{ marginTop: 16 }}>
              <table className="table-wrap">
                <thead>
                  <tr>
                    <th></th>
                    <th>LLM alone</th>
                    <th>Workflow</th>
                    <th>Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Definition", "Text in → text out", "Predefined code paths", "LLM drives its own process"],
                    ["Memory", "None", "State between fixed steps", "Persistent, across steps"],
                    ["Tools/APIs", "No", "Fixed tools in sequence", "Chooses tools dynamically"],
                    ["Predictable", "Yes (prompt → output)", "Yes (path is coded)", "No — LLM decides path"],
                    ["Use when", "Draft, summarize, translate", "Fixed, repeatable pipelines", "Open-ended, multi-step tasks"],
                    ["Example", '"Summarize this note"', "Transcribe → classify → book", '"Handle today\'s no-shows"'],
                    ["Complexity", "Very simple", "Moderate", "High — use last resort"],
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="row-header">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </section>

          {/* ===== SLIDE 20: KEY TAKEAWAYS ===== */}
          <section data-background={`linear-gradient(135deg, ${THEME.bg} 0%, ${THEME.bgAlt} 50%, ${THEME.bg} 100%)`}>
            <div style={{ textAlign: "center", paddingTop: 20 }}>
              <h2 style={{ fontSize: "2.2em", marginBottom: 32 }}>
                Key<br /><span className="accent">Takeaways.</span>
              </h2>
            </div>
            <ol className="takeaway-list" style={{ maxWidth: 800, margin: "0 auto" }}>
              <li>LLMs are powerful text processors — not magic, not infallible</li>
              <li>Workflows = predefined paths. Agents = LLM-driven, open-ended</li>
              <li>Use the simplest approach that works. Add complexity only when needed</li>
              <li>Your products have clear, high-value opportunities for both</li>
              <li>Privacy and safety are non-negotiable in any healthcare AI system</li>
            </ol>
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <p style={{ fontSize: "0.9em", color: THEME.primaryLight }}>
                {"Questions? Let's discuss!"}
              </p>
            </div>
          </section>

          {/* ===== SLIDE: REFERENCES ===== */}
          <section>
            <h2 style={{ fontSize: "1.4em" }}>References</h2>
            <div style={{ marginTop: 32 }}>
              <ul style={{ listStyle: "none", padding: 0, lineHeight: 2.2 }}>
                <li style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ color: THEME.primary }}>&#9679;</span>
                  <span>
                    <strong>Building Effective Agents</strong> — Anthropic, Dec 2024<br />
                    <a href="https://www.anthropic.com/research/building-effective-agents" target="_blank" rel="noopener noreferrer" style={{ color: THEME.accent, fontSize: "0.85em" }}>
                      anthropic.com/research/building-effective-agents
                    </a><br />
                    <span style={{ color: THEME.textMuted, fontSize: "0.8em" }}>
                      Covers workflow vs agent distinction, 5 workflow patterns (prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer)
                    </span>
                  </span>
                </li>
                <li style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 16 }}>
                  <span style={{ color: THEME.primary }}>&#9679;</span>
                  <span>
                    <strong>A Practical Guide to Building Agents</strong> — OpenAI<br />
                    <a href="https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf" target="_blank" rel="noopener noreferrer" style={{ color: THEME.accent, fontSize: "0.85em" }}>
                      openai.com/.../a-practical-guide-to-building-agents.pdf
                    </a><br />
                    <span style={{ color: THEME.textMuted, fontSize: "0.8em" }}>
                      Practical patterns for designing, orchestrating, and deploying AI agents in production
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
