import { describe, it, expect } from 'vitest'

// Mock utility functions for LaTeX processing
const cleanLatexCode = (latex: string): string => {
  if (!latex) return '$$$$'
  return latex.includes('$$') ? latex : `$$${latex}$$`
}

const validateLatex = (latex: string): boolean => {
  if (!latex) return false
  // Basic validation - check for balanced braces
  const openBraces = (latex.match(/\{/g) || []).length
  const closeBraces = (latex.match(/\}/g) || []).length
  return openBraces === closeBraces
}

describe('Formula Utilities', () => {
  describe('cleanLatexCode', () => {
    it('adds $$ wrapper to latex without it', () => {
      const input = 'E = mc^2'
      const expected = '$$E = mc^2$$'
      expect(cleanLatexCode(input)).toBe(expected)
    })

    it('preserves existing $$ wrapper', () => {
      const input = '$$E = mc^2$$'
      expect(cleanLatexCode(input)).toBe(input)
    })

    it('returns default for empty input', () => {
      expect(cleanLatexCode('')).toBe('$$$$')
      expect(cleanLatexCode(null as any)).toBe('$$$$')
      expect(cleanLatexCode(undefined as any)).toBe('$$$$')
    })
  })

  describe('validateLatex', () => {
    it('validates balanced braces', () => {
      expect(validateLatex('\\frac{a}{b}')).toBe(true)
      expect(validateLatex('\\sqrt{x^2 + y^2}')).toBe(true)
    })

    it('detects unbalanced braces', () => {
      expect(validateLatex('\\frac{a}{b')).toBe(false)
      expect(validateLatex('\\sqrt{x^2 + y^2}}')).toBe(false)
    })

    it('returns false for empty input', () => {
      expect(validateLatex('')).toBe(false)
      expect(validateLatex(null as any)).toBe(false)
      expect(validateLatex(undefined as any)).toBe(false)
    })

    it('handles complex formulas', () => {
      const complexFormula = '\\begin{aligned} E &= mc^2 \\\\ F &= ma \\end{aligned}'
      expect(validateLatex(complexFormula)).toBe(true)
    })
  })
}) 