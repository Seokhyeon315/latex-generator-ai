// Enhanced type definitions for STEM Hub - Refactored for curated database approach

export interface Formula {
  id: string; // Required unique identifier
  formulaName: string;
  description: string;
  usage: string;
  explanation: string;
  latexCode: string;
  renderedFormula?: string | undefined;
  
  // Enhanced categorization
  domain: 'math' | 'physics' | 'aerospace'; // Primary STEM domain
  category: string; // e.g., 'calculus', 'classical-mechanics', 'fluid-dynamics'
  field: string; // e.g., 'derivatives', 'kinematics', 'thermodynamics'
  topic?: string | undefined; // Specific subtopic
  
  // Educational metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[]; // Formula IDs that should be understood first
  applications: string[]; // Real-world applications
  keywords: string[]; // Searchable keywords for discovery
  
  // Academic and reference data
  academicReferences: AcademicReference[];
  derivation?: FormulaDerivation;
  relatedFormulas?: string[]; // Formula IDs of related equations
  
  // MathJSON support for structured mathematical notation
  mathJson?: MathJsonExpression;
  
  // Units and variables
  variables?: Variable[];
  units?: UnitSystem;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  version: string; // For data versioning
  verified: boolean; // Quality assurance flag
}

export interface AcademicReference {
  title: string;
  authors: string[];
  year: number;
  significance: string;
  link?: string;
  doi?: string;
  journal?: string;
  isbn?: string;
  field?: string;
  subfield?: string;
  citationCount?: number;
}

// New interfaces for enhanced functionality

export interface Variable {
  symbol: string;
  name: string;
  description: string;
  unit?: string;
  domain?: string; // e.g., "real numbers", "positive integers"
  example?: number | string;
}

export interface UnitSystem {
  primary: 'SI' | 'Imperial' | 'CGS' | 'Natural';
  alternativeUnits?: { system: string; conversion: string }[];
}

export interface FormulaDerivation {
  steps: DerivationStep[];
  assumptions: string[];
  startingFormulas?: string[]; // Formula IDs used as starting points
}

export interface DerivationStep {
  step: number;
  description: string;
  equation: string; // LaTeX representation
  reasoning: string;
}

// MathJSON type definitions for structured mathematical notation
export interface MathJsonExpression {
  [key: string]: any; // Flexible structure for MathJSON format
}

// Enhanced search and filtering interfaces
export interface FormulaFilter {
  domains?: ('math' | 'physics' | 'aerospace')[];
  categories?: string[];
  fields?: string[];
  difficulties?: ('beginner' | 'intermediate' | 'advanced')[];
  keywords?: string[];
  hasDerivation?: boolean;
  verified?: boolean;
}

export interface FormulaDatabase {
  version: string;
  lastUpdated: Date;
  formulas: Formula[];
  metadata: DatabaseMetadata;
}

export interface DatabaseMetadata {
  totalFormulas: number;
  formulasByDomain: Record<string, number>;
  formulasByDifficulty: Record<string, number>;
  contributors: string[];
  verificationStatus: {
    verified: number;
    pending: number;
    total: number;
  };
}

export interface SearchResult {
  formulas: Formula[];
  totalCount: number;
  hasMore: boolean;
  searchQuery: string;
  searchTime: number;
  filters?: FormulaFilter | undefined;
  suggestions?: string[] | undefined; // Alternative search suggestions
}

export interface STEMDomain {
  id: string;
  name: string;
  description: string;
  categories: STEMCategory[];
  icon?: string;
  color?: string;
  formulaCount?: number;
}

export interface STEMCategory {
  id: string;
  name: string;
  description: string;
  domain: 'math' | 'physics' | 'aerospace';
  fields: STEMField[];
  useCases: string[];
  formulaCount?: number;
}

export interface STEMField {
  id: string;
  name: string;
  description: string;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[]; // Field IDs
  formulaCount?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
  timestamp: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress?: number;
}

export interface SearchState extends LoadingState {
  results: Formula[];
  query: string;
  hasMore: boolean;
  totalCount: number;
}

export interface ThemeConfig {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

// API error types
export type ApiErrorType = 'VALIDATION_ERROR' | 'NETWORK_ERROR' | 'SERVER_ERROR' | 'TIMEOUT_ERROR' | 'UNKNOWN_ERROR';

export interface ApiError extends Error {
  type: ApiErrorType;
  statusCode?: number;
  details?: Record<string, unknown>;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SearchComponentProps extends BaseComponentProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export interface FormulaCardProps extends BaseComponentProps {
  formula: Formula;
  onCopy?: (latex: string) => void;
  showReferences?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Event handler types
export type SearchHandler = (query: string) => void | Promise<void>;
export type ErrorHandler = (error: Error) => void;
export type LoadingHandler = (isLoading: boolean) => void;

// Environment types
export interface EnvConfig {
  GOOGLE_GENERATIVE_AI_API_KEY: string;
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_URL: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {}
  }
} 