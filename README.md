# Smart Teacher

A Socratic learning companion that helps you truly understand concepts by encouraging you to explain, iterate, and refine your thinking—rather than passively receiving answers.

## The Problem

As AI becomes more accessible, there's a growing risk of intellectual atrophy. When answers are a prompt away, we tend to work less, think less, and ultimately become less capable. Traditional note-taking workflows are also fragmented: read something, check understanding with an LLM, then take separate notes.

## The Solution

Smart Teacher applies Socrates's maieutic method to modern learning:

1. **Explain, don't ask** — Instead of asking "What is X?", you explain your understanding of X
2. **Iterative refinement** — The AI guides you to narrow down and correct your mental model
3. **Capture understanding** — Once you've demonstrated comprehension, notes are generated from *your* validated understanding

This flips the typical AI interaction from "ask and receive" to "explain and refine."

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Anthropic Claude via `@ai-sdk/anthropic`

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start learning.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm start    # Run production server
pnpm lint     # Run ESLint
```
