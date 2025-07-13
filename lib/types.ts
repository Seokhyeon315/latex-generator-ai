// Enhanced type definitions for STEM Hub

export interface Formula {
  id?: string;
  formulaName: string;
  description: string;
  usage: string;
  explanation: string;
  latexCode: string;
  renderedFormula?: string;
  category?: string;
  field?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  academicReferences?: AcademicReference[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AcademicReference {
  title: string;
  authors: string[];
  year: number;
  significance: string;
  link?: string;
  doi?: string;
  journal?: string;
  field?: string;
  subfield?: string;
}

export interface SearchResult {
  formulas: Formula[];
  totalCount: number;
  hasMore: boolean;
  searchQuery: string;
  searchTime: number;
}

export interface FieldCategory {
  id: number;
  fieldName: string;
  description: string;
  useCases: string[];
  topics: string[];
  icon?: string;
  color?: string;
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