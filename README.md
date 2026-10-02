# SteerWell

> **You drive the AI. SteerWell follows.**

SteerWell is an AI meeting assistant designed around user control. Rather than acting as an intrusive, constantly watching observer, SteerWell adapts to how you work through three distinct modes: Driver, Passenger, and Just Capture.

- **Live Site:** [z1taz.github.io/SteerWell](https://z1taz.github.io/SteerWell/)
- **GitHub Repository:** [github.com/z1taz/SteerWell](https://github.com/z1taz/SteerWell)

---

## The Core Concept: Who's Driving Today?

Most AI meeting assistants either take over completely or silently observe, score participants, and generate unsolicited commentary. SteerWell is built on a different philosophy: **AI shouldn't take the wheel.**

### The Three Modes

1. **Driver: "You think. I'll help you remember."**
   SteerWell provides subtle hints and contextual cues drawn from the actual discussion, allowing you to recall key decisions and context yourself. If you need the direct answer, you can ask for it with one click.
2. **Passenger: "You relax. I'll handle the recall."**
   SteerWell provides direct answers backed by exact meeting timestamps and source references so you can verify before taking action.
3. **Just Capture: "Record + transcribe. Nothing more."**
   Zero active AI prompts, summaries, or interruptions. Perfect for sensitive 1:1s, client feedback sessions, or creative discussions where you want raw notes without AI commentary.

---

## Key Capabilities

- **Transparent Meeting Capture:** When SteerWell joins, it introduces itself in the meeting chat and announces itself out loud so every participant is aware. Participants can type "object" to request removal.
- **SteerWell MCP Server:** Connect meeting intelligence directly to your daily AI workflow in tools like Claude, ChatGPT, and Devin via standard Model Context Protocol:
  ```bash
  npx @steerwell/mcp-server
  ```
- **Export to Five Formats:** Full export support for PDF, DOCX, Markdown, Plain text (.TXT), and CSV.
- **Auto-Organised Notes:** Key questions, chapters, and action items organized automatically.
- **Auto Meeting Titles:** Automatic descriptive meeting titles instead of generic placeholders.
- **Private Speaking Feedback:** Filler word counts and speech clarity feedback visible strictly to the speaker.
- **Meeting Data Controls:** Explicit privacy toggles, adjustable retention periods, and on-demand data export or deletion.

---

## Tech Stack and Design Architecture

- **Frontend:** Pure semantic HTML5, modern vanilla CSS3, and lightweight vanilla JavaScript.
- **Zero Dependencies:** No heavy frontend frameworks or build steps. Instant loading and minimal bundle size.
- **Accessibility (WCAG AA):**
  - Text contrast ratio strictly exceeds 4.5:1 across all elements.
  - Interactive tap targets calibrated to a minimum of 44px.
  - Full keyboard accessibility and focus rings.
  - Native `prefers-reduced-motion` compliance across all animations.
- **Responsive:** Mobile-first responsive grid down to 375px viewport widths with no horizontal overflow.

---

## Project Structure

```text
steerwell/
├── index.html        # Semantic HTML structure and content
├── styles.css        # Modular design system, variables, and responsive layout
├── script.js         # Interactive mode switching, MCP demo, and form validation
├── README.md         # Project documentation and product overview
└── assets/
    ├── logo.jpeg     # SteerWell brand logo
    ├── driver.png    # Driver Mode steering wheel icon
    ├── passenger.png # Passenger Mode navigation icon
    ├── microphone.png# Just Capture Mode microphone icon
    ├── claude.webp   # Official Anthropic Claude logo
    ├── chatgpt.png   # Official OpenAI ChatGPT logo
    └── devin.png     # Official Cognition Devin logo
```

---

## Assignment Context

SteerWell was conceived and built as part of the **WhatBytes Product Management Internship Assignment**. The objective was to analyze competitive products in the AI meeting assistant space (such as Read AI), identify user friction points around surveillance and passive participation, and design a compelling, user-centric MVP landing page with clear positioning and interactive demonstrations.

---

## Author

**Ziya M Soudagar**
- LinkedIn: [linkedin.com/in/ziya-s-846562320](https://linkedin.com/in/ziya-s-846562320)
- GitHub: [github.com/z1taz](https://github.com/z1taz)
