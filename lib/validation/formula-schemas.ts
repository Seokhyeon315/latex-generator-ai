import { z } from 'zod';

// Core domain types
export const domainSchema = z.enum(['math', 'physics', 'aerospace']);
export const difficultySchema = z.enum(['beginner', 'intermediate', 'advanced']);
export const unitSystemSchema = z.enum(['SI', 'Imperial', 'CGS', 'Natural']);

// Variable schema for formula components
export const variableSchema = z.object({
  symbol: z.string().min(1, 'Symbol is required'),
  name: z.string().min(1, 'Variable name is required'),
  description: z.string().min(1, 'Description is required'),
  unit: z.string().optional(),
  domain: z.string().optional(),
  example: z.union([z.number(), z.string()]).optional(),
});

// Unit system schema
export const unitSystemConfigSchema = z.object({
  primary: unitSystemSchema,
  alternativeUnits: z.array(z.object({
    system: z.string(),
    conversion: z.string(),
  })).optional(),
});

// Academic reference schema with enhanced validation
export const academicReferenceSchema = z.object({
  title: z.string().min(1, 'Reference title is required'),
  authors: z.array(z.string().min(1)).min(1, 'At least one author is required'),
  year: z.number().int().min(1500).max(new Date().getFullYear() + 5),
  significance: z.string().min(10, 'Significance description should be meaningful'),
  link: z.string().url().optional(),
  doi: z.string().regex(/^10\.\d{4,}\/.*/, 'Invalid DOI format').optional(),
  journal: z.string().optional(),
  isbn: z.string().optional(),
  field: z.string().optional(),
  subfield: z.string().optional(),
  citationCount: z.number().int().min(0).optional(),
});

// Derivation step schema
export const derivationStepSchema = z.object({
  step: z.number().int().min(1),
  description: z.string().min(1, 'Step description is required'),
  equation: z.string().min(1, 'LaTeX equation is required'),
  reasoning: z.string().min(1, 'Reasoning is required'),
});

// Formula derivation schema
export const formulaDerivationSchema = z.object({
  steps: z.array(derivationStepSchema).min(1, 'At least one derivation step is required'),
  assumptions: z.array(z.string()),
  startingFormulas: z.array(z.string()).optional(),
});

// MathJSON expression schema (flexible structure)
export const mathJsonExpressionSchema = z.record(z.any()).optional();

// Main formula schema with comprehensive validation
export const formulaSchema = z.object({
  id: z.string()
    .min(1, 'Formula ID is required')
    .regex(/^[a-z0-9-_]+$/, 'ID must contain only lowercase letters, numbers, hyphens, and underscores'),
  
  formulaName: z.string().min(1, 'Formula name is required'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  usage: z.string().min(10, 'Usage description should be meaningful'),
  explanation: z.string().min(20, 'Explanation should be comprehensive'),
  latexCode: z.string()
    .min(1, 'LaTeX code is required')
    .refine(
      (code) => code.includes('$') || code.includes('\\[') || code.includes('\\('),
      'LaTeX code should contain proper math delimiters'
    ),
  renderedFormula: z.string().optional(),
  
  // Enhanced categorization
  domain: domainSchema,
  category: z.string().min(1, 'Category is required'),
  field: z.string().min(1, 'Field is required'),
  topic: z.string().optional(),
  
  // Educational metadata
  difficulty: difficultySchema,
  prerequisites: z.array(z.string()).optional(),
  applications: z.array(z.string().min(1)).min(1, 'At least one application is required'),
  keywords: z.array(z.string().min(1)).min(2, 'At least two keywords are required for searchability'),
  
  // Academic and reference data
  academicReferences: z.array(academicReferenceSchema).min(1, 'At least one academic reference is required'),
  derivation: formulaDerivationSchema.optional(),
  relatedFormulas: z.array(z.string()).optional(),
  
  // MathJSON support
  mathJson: mathJsonExpressionSchema,
  
  // Units and variables
  variables: z.array(variableSchema).optional(),
  units: unitSystemConfigSchema.optional(),
  
  // Metadata
  createdAt: z.date(),
  updatedAt: z.date(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be in semver format (e.g., 1.0.0)'),
  verified: z.boolean(),
});

// Database schema
export const databaseMetadataSchema = z.object({
  totalFormulas: z.number().int().min(0),
  formulasByDomain: z.record(z.number().int().min(0)),
  formulasByDifficulty: z.record(z.number().int().min(0)),
  contributors: z.array(z.string()),
  verificationStatus: z.object({
    verified: z.number().int().min(0),
    pending: z.number().int().min(0),
    total: z.number().int().min(0),
  }),
});

export const formulaDatabaseSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must be in semver format'),
  lastUpdated: z.date(),
  formulas: z.array(formulaSchema),
  metadata: databaseMetadataSchema,
});

// Search and filtering schemas
export const formulaFilterSchema = z.object({
  domains: z.array(domainSchema).optional(),
  categories: z.array(z.string()).optional(),
  fields: z.array(z.string()).optional(),
  difficulties: z.array(difficultySchema).optional(),
  keywords: z.array(z.string()).optional(),
  hasDerivation: z.boolean().optional(),
  verified: z.boolean().optional(),
});

// STEM domain structure schemas
export const stemFieldSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  topics: z.array(z.string()),
  difficulty: difficultySchema,
  prerequisites: z.array(z.string()).optional(),
  formulaCount: z.number().int().min(0).optional(),
});

export const stemCategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  domain: domainSchema,
  fields: z.array(stemFieldSchema),
  useCases: z.array(z.string()),
  formulaCount: z.number().int().min(0).optional(),
});

export const stemDomainSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  categories: z.array(stemCategorySchema),
  icon: z.string().optional(),
  color: z.string().optional(),
  formulaCount: z.number().int().min(0).optional(),
});

// Search result schema
export const searchResultSchema = z.object({
  formulas: z.array(formulaSchema),
  totalCount: z.number().int().min(0),
  hasMore: z.boolean(),
  searchQuery: z.string(),
  searchTime: z.number().min(0),
  filters: formulaFilterSchema.optional(),
  suggestions: z.array(z.string()).optional(),
});

// Validation helper functions
export const validateFormula = (data: unknown) => {
  return formulaSchema.safeParse(data);
};

export const validateFormulaDatabase = (data: unknown) => {
  return formulaDatabaseSchema.safeParse(data);
};

export const validateSearchFilter = (data: unknown) => {
  return formulaFilterSchema.safeParse(data);
};

// Type inference for TypeScript
export type FormulaValidation = z.infer<typeof formulaSchema>;
export type DatabaseValidation = z.infer<typeof formulaDatabaseSchema>;
export type FilterValidation = z.infer<typeof formulaFilterSchema>;