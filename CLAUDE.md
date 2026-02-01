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

## Testing Protocol

**MANDATORY: After implementing ANY feature, bug fix, or refactor, you MUST complete ALL of these testing steps:**

### 1. TypeScript Check (REQUIRED)
```bash
pnpm tsc --noEmit
```
Fix ALL TypeScript errors before proceeding. No exceptions.

### 2. End-to-End Manual Testing (REQUIRED)
Test the COMPLETE user flow, not just the changed code:

1. **Navigate to the feature** - Use Chrome DevTools MCP to navigate to the relevant page
2. **Test the happy path** - Complete the primary user flow from start to finish
3. **Verify database persistence** - Use `curl` or direct database queries to confirm data was saved correctly
4. **Test edge cases** - Empty states, error states, validation
5. **Check console** - Use `list_console_messages` to verify no errors

### 3. Test Scenarios for This Project

**Teacher Selection & Conversation Creation:**
- [ ] Navigate to home page (`/`)
- [ ] Click on a teacher
- [ ] Verify new conversation created
- [ ] Verify redirected to `/conversation/[id]`
- [ ] Verify welcome message displays

**Chat Flow:**
- [ ] Send a message
- [ ] Verify user message displays immediately
- [ ] Wait for AI response
- [ ] Verify assistant response displays
- [ ] Check database: verify BOTH messages saved with correct roles
- [ ] Verify title auto-generated from first message
- [ ] Reload page and verify messages persist

**Message Persistence:**
After ANY change to message saving logic:
```bash
# Check message count and order
curl -s http://localhost:3000/api/conversations/[ID] | jq '.conversation | {messageCount: (.messages | length), roles: (.messages | map(.role))}'
```

### 4. When to Skip Testing

NEVER. Always test. Even "small changes" can break the system.

### 5. Testing Checklist Template

After implementing a feature, copy this checklist and verify each item:

```
- [ ] TypeScript check passed (pnpm tsc --noEmit)
- [ ] Navigated to the feature in browser
- [ ] Tested complete user flow
- [ ] Verified data saved to database correctly
- [ ] Checked console for errors
- [ ] Tested with fresh conversation
- [ ] Tested with existing conversation
- [ ] Reloaded page to verify persistence
```

**If you skip testing, you WILL introduce bugs. Don't skip it.**
