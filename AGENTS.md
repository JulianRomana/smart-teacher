# AGENTS.md

This file provides guidance for agentic coding agents working in this repository.

## Build Commands

```bash
pnpm dev          # Start development server (Next.js with Turbopack)
pnpm build        # Production build
pnpm start        # Run production server
pnpm lint         # Run ESLint
```

**Note**: This project does not have test commands configured. Use `pnpm lint` to validate code quality.

## Architecture

This is a Next.js 16 application using the App Router with TypeScript and AI integration.

- **Source code**: `src/` directory
- **App Router**: `src/app/` - pages and layouts
- **Import alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS v4 with PostCSS
- **AI**: `@ai-sdk/anthropic` for Anthropic API integration
- **UI Components**: shadcn/ui
- **AI Chat UI**: Vercel AI Elements (`src/components/ai-elements/`)

## Code Style Guidelines

### Imports
- Use `@/*` alias for src imports (e.g., `@/components/chat`)
- Group imports: React hooks first, then external libraries, then internal components
- Use named imports for React hooks: `import { useState } from "react"`
- Use default imports for components: `import { Chat } from "@/components/chat"`

### TypeScript
- Strict mode enabled in `tsconfig.json`
- Use proper typing for all props and return values
- Use `Readonly<>` for React component props when appropriate
- Use `type` instead of `interface` for simple type definitions
- Use `interface` for object shapes that might be extended

### Component Structure
- Use function components with React 19+ patterns
- Client components: start with `"use client";` directive
- Use descriptive component names in PascalCase
- Export components as named exports, not default exports
- Use proper prop destructuring with TypeScript types

### Styling
- Use Tailwind CSS classes only
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui component patterns
- Use semantic color tokens: `bg-primary`, `text-foreground`, `border-border`
- Use spacing utilities consistently: `p-4`, `m-2`, `gap-4`

### Naming Conventions
- Components: PascalCase (e.g., `ChatComponent`)
- Functions/variables: camelCase (e.g., `handleSubmit`, `inputValue`)
- Constants: UPPER_SNAKE_CASE (e.g., `SYSTEM_PROMPT`)
- Files: kebab-case for utilities, PascalCase for components
- CSS classes: kebab-case following Tailwind patterns

### Error Handling
- Use try-catch blocks for async operations
- Return proper HTTP status codes in API routes
- Log errors with `console.error()` for debugging
- Use user-friendly error messages in UI
- Validate request data in API routes

### API Routes
- Use `export const maxDuration = 30;` for long-running operations
- Validate request body with proper error responses
- Use proper content-type headers
- Handle errors gracefully with try-catch blocks
- Return JSON responses with consistent error format

### React Patterns
- Use hooks for state management: `useState`, `useEffect`, `useChat`
- Use proper dependency arrays in `useEffect`
- Avoid inline functions in render when possible
- Use proper key props for lists
- Use `asChild` pattern from Radix UI when needed

### File Organization
- Components in `src/components/`
- UI components in `src/components/ui/` (shadcn/ui)
- AI elements in `src/components/ai-elements/`
- API routes in `src/app/api/`
- Utilities in `src/lib/`
- Keep related files together

### shadcn/ui Components
- Use CLI to add components: `npx shadcn@latest add <component-name>`
- Do not manually create shadcn components
- Follow existing component patterns in `src/components/ui/`
- Use `cva()` for variant styling with class-variance-authority

### AI Integration
- Use `@ai-sdk/react` for chat functionality
- Use `@ai-sdk/anthropic` for Anthropic API
- Follow streaming patterns with `streamText()`
- Use proper message formatting with `convertToModelMessages()`
- Handle loading states and error states in UI

### Linting
- Run `pnpm lint` before committing
- Follow Next.js ESLint configuration
- Use TypeScript strict mode compliance
- Fix all linting errors before considering code complete

## Development Workflow

### Core Workflow
1. **Receive task** → Understand requirements using opencode's task analysis
2. **Plan implementation** → Use Tab key to switch to Plan agent for analysis if needed
3. **Execute** → Use Build agent (default) with full tool access
4. **Test** → Start dev server and verify functionality manually
5. **Iterate** → Use `/undo` and `/redo` commands as needed

### Agent Modes
- **Build** (default): Full tool access for implementation
- **Plan**: Read-only analysis and planning (use Tab key to switch)
- **General**: Multi-step task execution (invoke with `@general`)
- **Explore**: Fast codebase exploration (invoke with `@explore`)

### Testing Protocol
After implementing a feature:

1. **Start the dev server** - Run `pnpm dev` 
2. **Manual testing** - Navigate to localhost:3000 and test functionality
3. **Check for errors** - Monitor browser console and network requests
4. **Fix and iterate** - If errors found, fix them and use `/undo` if needed
5. **Run linting** - Execute `pnpm lint` to validate code quality

### Commands
- `/init` - Initialize opencode for project (creates AGENTS.md)
- `/undo` - Undo last changes
- `/redo` - Redo undone changes
- `/share` - Share conversation
- `@agent-name` - Invoke specific subagent

### Standard Development Steps
1. Start development server with `pnpm dev`
2. Make changes following the style guidelines above
3. Run `pnpm lint` to check for issues
4. Test functionality manually in browser
5. Use `/undo` if changes need to be reverted
6. Fix any linting errors before considering task complete