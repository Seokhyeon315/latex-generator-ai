# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

### Project Structure

This is a Next.js 15 application using React 19 with TypeScript, styled with Tailwind CSS. The project has been refactored from an AI-dependent system to a curated database-first approach with AI fallback, focusing on Math, Physics, and Aerospace Engineering. Also, the new goal is trying to build new algorithm for this project to utilize not only just one AI model like Gemini, but select AI model that's strong in certain field or category before their API is called.

### Core Technologies

- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS 4.x, Radix UI components
- **Data Layer**: Curated JSON/YAML formula database with Zod validation
- **AI Integration**: Google Gemini models (fallback only when formula not in database)
- **Math Rendering**: KaTeX for LaTeX formula display
- **State Management**: React Server Components with instant lookups
- **Search**:
  - Direct Search for users who know formula and theorem.
  - Goal is to switch from fully relying on AI models to generate answer to Semantic/Fuzzy search with filtering and categorization

### Key Features

1. **Curated Formula Database**: 500+ professionally curated formulas across 3 STEM domains
2. **Direct Search**: Instant database lookup with intelligent search suggestions
3. **Multi-step Browse**: Navigate through organized STEM categories, fields, and topics
4. **Enhanced Metadata**: Academic references, derivations, variables, applications
5. **Educational Features**: Difficulty levels, prerequisites, related formulas

### Application Flow (Refactored)

```
User Input → Database Lookup → Instant Results → Formula Rendering
                     ↓ (if not found)
              AI Service (Gemini) → Curated Response
```

### STEM Domains Focus

> Since I have B.S. in Aerospace engineering, only field I could revalidate and confirm is math, physics, and all details of aerospace engineering. So, categories would be starting from there.

- **Mathematics**: Calculus, Linear Algebra, Statistics, Discrete Math
- **Physics**: Classical Mechanics, Thermodynamics, Electromagnetism
- **Aerospace**: Fluid Dynamics, Orbital Mechanics, Propulsion

### Enhanced Data Schema

- **Zod Validation**: Comprehensive schema validation in `lib/validation/formula-schemas.ts`
- **Rich Metadata**: Academic references, derivations, variables, units, applications
- **Educational Structure**: Difficulty levels, prerequisites, related formulas
- **Search Optimization**: Keywords, categories, fields for enhanced discoverability

### Component Structure

- **Search Panels**: `DirectSearchPanel.tsx` and `MultiSearchPanel.tsx` handle user interactions
- **Dynamic Loading**: Heavy components (FormulaRenderer, MarkdownRender, PaperReferences) are dynamically imported
- **Error Handling**: Comprehensive error boundaries and retry mechanisms
- **Responsive Design**: Mobile-first approach with fixed bottom search bars

### API Integration

- Uses Google Generative AI (Gemini 1.5 Pro) via `@google/generative-ai`
- Structured responses with Zod schema validation
- Retry mechanisms with exponential backoff
- LaTeX code cleaning and standardization

### Type System

Central types defined in `lib/types.ts`:

- `Formula` - Core formula interface with metadata
- `AcademicReference` - Academic paper references
- `SearchResult` - Search response structure
- Component prop interfaces with proper TypeScript constraints

### Environment Variables

Required:

- `GOOGLE_GENERATIVE_AI_API_KEY` - Google Gemini API key

### Styling Approach

- Tailwind CSS 4.x with custom configuration
- Responsive design with mobile-first breakpoints
- Component-based styling with shadcn/ui patterns
- KaTeX CSS for mathematical notation rendering

### Performance Optimizations

- Dynamic imports for heavy components
- Streaming responses with Server Actions
- Image optimization with Next.js built-in features
- Bundle analysis available through build process

### Error Handling Strategy

- Global error boundaries in layout
- Component-level error states with retry functionality
- API error handling with user-friendly messages
- Validation errors caught and handled gracefully

### Testing Setup

- Vitest with jsdom for React component testing
- Setup file at `vitest.setup.ts` configures testing environment
- Test files follow pattern `*.test.tsx` and `*.test.ts`
- Coverage reports available via `pnpm test:coverage`

## Important Notes

### LaTeX Handling

The application has specific challenges with LaTeX code processing:

- Double backslash handling for proper rendering
- Special character escaping in API responses
- KaTeX rendering with proper styling
- Copy-to-clipboard functionality for LaTeX code

### AI Response Processing

- The AI models can be more than Gemini.
- JSON response cleaning and validation
- Retry logic for failed API calls
- Duplicate formula detection in multi-step search
- Structured data extraction with fallback handling

### Component Loading Strategy

Heavy components are dynamically imported to improve initial page load:

- FormulaRenderer (KaTeX rendering)
- MarkdownRender (markdown processing)
- PaperReferences (academic reference display, not the top priority yet)

### Responsive Design Patterns

- Fixed bottom search bars on mobile
- Collapsible navigation with mobile hamburger menu
- Adaptive layouts for different screen sizes
- Touch-friendly interactive elements
