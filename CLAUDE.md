# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Orchestrator Workflow

**ALWAYS follow this process before implementing features:**

1. **Receive task** → Consult `@~/.claude/PRD.md` to define scope and user stories
2. **Plan implementation** → Select appropriate skill(s) from `@~/.claude/skills/`
3. **Execute** → Follow skill constraints and patterns
4. **Feedback loop** → Update rules based on corrections

For new features, present the PRD (scope, user stories, skill assignment) before coding.

## Commands

```bash
pnpm dev          # Start development server (Turbopack enabled)
pnpm build        # Production build
pnpm start        # Run production server
pnpm lint         # Run ESLint
```

## Architecture

This is a Next.js 16 application using the App Router with TypeScript.

- **Source code**: `src/` directory
- **App Router**: `src/app/` - pages and layouts
- **Import alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS v4 with PostCSS
- **AI**: `@ai-sdk/anthropic` for Anthropic API integration
- **UI Components**: shadcn/ui
- **AI Chat UI**: Vercel AI Elements (`src/components/ai-elements/`)

## Vercel Agent Skills

This project includes skills from [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) in `.skills/`:

| Skill | When to Use | File |
|-------|-------------|------|
| **react-best-practices** | When writing/reviewing React components, optimizing performance, or auditing Next.js code | `.skills/react-best-practices/SKILL.md` |
| **web-design-guidelines** | When building UI, reviewing designs, or auditing accessibility/UX | `.skills/web-design-guidelines/SKILL.md` |

**IMPORTANT:** Before implementing UI or React components, read the relevant SKILL.md file to ensure best practices are followed.

## shadcn/ui Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for UI components. Components are installed to `src/components/ui/`.

**When a component is needed but not present**, add it with:

```bash
npx shadcn@latest add <component-name>
```

Examples:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input textarea
```

Do not manually create shadcn components—always use the CLI to ensure proper configuration.
