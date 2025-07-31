import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { Formula, FormulaFilter, SearchResult } from '../types';
import { validateFormula, validateFormulaDatabase } from '../validation/formula-schemas';
import { LRUCache } from 'lru-cache';

// Cache configuration
const formulaCache = new LRUCache<string, Formula[]>({
  max: 100, // Maximum number of cached entries
  ttl: 1000 * 60 * 15, // 15 minutes TTL
});

const searchCache = new LRUCache<string, SearchResult>({
  max: 500, // Cache search results
  ttl: 1000 * 60 * 5, // 5 minutes TTL
});

// Database paths
const DATA_DIR = join(process.cwd(), 'data');
const DOMAINS = ['math', 'physics', 'aerospace'] as const;

/**
 * Formula Database Service
 * Handles all database operations for formula lookup, search, and filtering
 */
export class FormulaDatabaseService {
  private static instance: FormulaDatabaseService;
  private allFormulas: Formula[] = [];
  private formulaIndex: Map<string, Formula> = new Map();
  private categoryIndex: Map<string, Formula[]> = new Map();
  private keywordIndex: Map<string, Set<string>> = new Map(); // keyword -> formula IDs
  private initialized = false;

  private constructor() {}

  public static getInstance(): FormulaDatabaseService {
    if (!FormulaDatabaseService.instance) {
      FormulaDatabaseService.instance = new FormulaDatabaseService();
    }
    return FormulaDatabaseService.instance;
  }

  /**
   * Initialize the database by loading all formula files
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Load formulas from all domains
      for (const domain of DOMAINS) {
        await this.loadDomainFormulas(domain);
      }

      // Build search indexes
      this.buildSearchIndexes();

      // Database initialized successfully
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize formula database:', error);
      throw new Error('Database initialization failed');
    }
  }

  /**
   * Load formulas from a specific domain directory
   */
  private async loadDomainFormulas(domain: string): Promise<void> {
    const domainPath = join(DATA_DIR, domain);
    
    try {
      const files = readdirSync(domainPath).filter(f => f.endsWith('.json'));
      
      for (const file of files) {
        const filePath = join(domainPath, file);
        const fileContent = readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Validate database structure
        const validation = validateFormulaDatabase(data);
        if (!validation.success) {
          console.warn(`Invalid database structure in ${filePath}:`, validation.error);
          continue;
        }

        // Validate and add each formula
        for (const formulaData of data.formulas) {
          // Convert date strings to Date objects and handle optional fields
          const processedFormula = {
            ...formulaData,
            createdAt: new Date(formulaData.createdAt),
            updatedAt: new Date(formulaData.updatedAt),
            prerequisites: formulaData.prerequisites || [],
          };

          const formulaValidation = validateFormula(processedFormula);
          if (!formulaValidation.success) {
            console.warn(`Invalid formula ${formulaData.id}:`, formulaValidation.error);
            continue;
          }

          const validatedFormula = {
            ...formulaValidation.data,
            prerequisites: formulaValidation.data.prerequisites || []
          };
          this.allFormulas.push(validatedFormula);
        }
      }
    } catch (error) {
      console.error(`Error loading formulas from ${domain}:`, error);
    }
  }

  /**
   * Build search indexes for efficient lookup
   */
  private buildSearchIndexes(): void {
    this.formulaIndex.clear();
    this.categoryIndex.clear();
    this.keywordIndex.clear();

    for (const formula of this.allFormulas) {
      // Index by formula ID
      this.formulaIndex.set(formula.id, formula);

      // Index by category
      const categoryKey = `${formula.domain}-${formula.category}`;
      if (!this.categoryIndex.has(categoryKey)) {
        this.categoryIndex.set(categoryKey, []);
      }
      this.categoryIndex.get(categoryKey)!.push(formula);

      // Index by keywords
      for (const keyword of formula.keywords) {
        const normalizedKeyword = keyword.toLowerCase();
        if (!this.keywordIndex.has(normalizedKeyword)) {
          this.keywordIndex.set(normalizedKeyword, new Set());
        }
        this.keywordIndex.get(normalizedKeyword)!.add(formula.id);
      }

      // Also index formula name words
      const nameWords = formula.formulaName.toLowerCase().split(/\s+/);
      for (const word of nameWords) {
        if (word.length > 2) { // Skip very short words
          if (!this.keywordIndex.has(word)) {
            this.keywordIndex.set(word, new Set());
          }
          this.keywordIndex.get(word)!.add(formula.id);
        }
      }
    }
  }

  /**
   * Get formula by ID
   */
  public async getFormulaById(id: string): Promise<Formula | null> {
    await this.initialize();
    return this.formulaIndex.get(id) || null;
  }

  /**
   * Get formulas by category
   */
  public async getFormulasByCategory(domain: string, category: string): Promise<Formula[]> {
    await this.initialize();
    
    const cacheKey = `${domain}-${category}`;
    const cached = formulaCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const formulas = this.categoryIndex.get(cacheKey) || [];
    formulaCache.set(cacheKey, formulas);
    return formulas;
  }

  /**
   * Search formulas with fuzzy matching and filtering
   */
  public async searchFormulas(
    query: string, 
    filter?: FormulaFilter,
    limit: number = 20,
    offset: number = 0
  ): Promise<SearchResult> {
    await this.initialize();

    const cacheKey = `search:${query}:${JSON.stringify(filter)}:${limit}:${offset}`;
    const cached = searchCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const startTime = Date.now();
    
    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      return this.getFilteredFormulas(filter, limit, offset, startTime);
    }

    // Find matching formula IDs based on keywords and name matching
    const matchingIds = new Set<string>();
    const queryWords = normalizedQuery.split(/\s+/);

    // Exact keyword matches get highest priority
    for (const word of queryWords) {
      if (this.keywordIndex.has(word)) {
        for (const id of this.keywordIndex.get(word)!) {
          matchingIds.add(id);
        }
      }
    }

    // Partial keyword matches (fuzzy search)
    for (const [keyword, ids] of this.keywordIndex.entries()) {
      for (const queryWord of queryWords) {
        if (keyword.includes(queryWord) || queryWord.includes(keyword)) {
          for (const id of ids) {
            matchingIds.add(id);
          }
        }
      }
    }

    // Convert IDs to formulas and apply filters
    let matchingFormulas = Array.from(matchingIds)
      .map(id => this.formulaIndex.get(id)!)
      .filter(formula => formula !== undefined);

    // Apply filters
    if (filter) {
      matchingFormulas = this.applyFilters(matchingFormulas, filter);
    }

    // Calculate relevance scores and sort
    const scoredFormulas = matchingFormulas.map(formula => ({
      formula,
      score: this.calculateRelevanceScore(formula, normalizedQuery, queryWords)
    })).sort((a, b) => b.score - a.score);

    // Apply pagination
    const totalCount = scoredFormulas.length;
    const paginatedFormulas = scoredFormulas
      .slice(offset, offset + limit)
      .map(item => item.formula);

    const result: SearchResult = {
      formulas: paginatedFormulas,
      totalCount,
      hasMore: offset + limit < totalCount,
      searchQuery: query,
      searchTime: Date.now() - startTime,
      filters: filter,
      suggestions: this.generateSuggestions(normalizedQuery)
    };

    searchCache.set(cacheKey, result);
    return result;
  }

  /**
   * Get filtered formulas without search query
   */
  private getFilteredFormulas(
    filter?: FormulaFilter, 
    limit: number = 20,
    offset: number = 0,
    startTime: number = Date.now()
  ): SearchResult {
    let formulas = this.allFormulas;

    if (filter) {
      formulas = this.applyFilters(formulas, filter);
    }

    const totalCount = formulas.length;
    const paginatedFormulas = formulas.slice(offset, offset + limit);

    return {
      formulas: paginatedFormulas,
      totalCount,
      hasMore: offset + limit < totalCount,
      searchQuery: '',
      searchTime: Date.now() - startTime,
      filters: filter
    };
  }

  /**
   * Apply filters to formula array
   */
  private applyFilters(formulas: Formula[], filter: FormulaFilter): Formula[] {
    return formulas.filter(formula => {
      if (filter.domains && !filter.domains.includes(formula.domain)) {
        return false;
      }
      if (filter.categories && !filter.categories.includes(formula.category)) {
        return false;
      }
      if (filter.fields && !filter.fields.includes(formula.field)) {
        return false;
      }
      if (filter.difficulties && !filter.difficulties.includes(formula.difficulty)) {
        return false;
      }
      if (filter.hasDerivation !== undefined && Boolean(formula.derivation) !== filter.hasDerivation) {
        return false;
      }
      if (filter.verified !== undefined && formula.verified !== filter.verified) {
        return false;
      }
      if (filter.keywords) {
        const hasAllKeywords = filter.keywords.every(keyword =>
          formula.keywords.some(fKeyword => 
            fKeyword.toLowerCase().includes(keyword.toLowerCase())
          )
        );
        if (!hasAllKeywords) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Calculate relevance score for search results
   */
  private calculateRelevanceScore(formula: Formula, query: string, queryWords: string[]): number {
    let score = 0;

    // Exact name match gets highest score
    if (formula.formulaName.toLowerCase().includes(query)) {
      score += 100;
    }

    // Keyword matches
    for (const queryWord of queryWords) {
      for (const keyword of formula.keywords) {
        if (keyword.toLowerCase() === queryWord) {
          score += 50; // Exact keyword match
        } else if (keyword.toLowerCase().includes(queryWord)) {
          score += 25; // Partial keyword match
        }
      }
    }

    // Description matches
    if (formula.description.toLowerCase().includes(query)) {
      score += 20;
    }

    // Field and category matches
    if (formula.field.toLowerCase().includes(query)) {
      score += 30;
    }
    if (formula.category.toLowerCase().includes(query)) {
      score += 25;
    }

    // Boost verified formulas slightly
    if (formula.verified) {
      score += 5;
    }

    return score;
  }

  /**
   * Generate search suggestions based on query
   */
  private generateSuggestions(query: string): string[] {
    const suggestions: string[] = [];
    const queryWords = query.split(/\s+/);

    // Find similar keywords
    for (const keyword of this.keywordIndex.keys()) {
      for (const queryWord of queryWords) {
        if (keyword.includes(queryWord) && keyword !== queryWord) {
          suggestions.push(keyword);
        }
      }
    }

    // Limit suggestions
    return suggestions.slice(0, 5);
  }

  /**
   * Get all available categories and their counts
   */
  public async getCategories(): Promise<Array<{domain: string, category: string, count: number}>> {
    await this.initialize();
    
    const categories: Array<{domain: string, category: string, count: number}> = [];
    
    for (const [key, formulas] of this.categoryIndex.entries()) {
      const [domain, category] = key.split('-');
      categories.push({
        domain,
        category,
        count: formulas.length
      });
    }

    return categories.sort((a, b) => a.domain.localeCompare(b.domain));
  }

  /**
   * Get database statistics
   */
  public async getStats(): Promise<{
    totalFormulas: number;
    formulasByDomain: Record<string, number>;
    formulasByDifficulty: Record<string, number>;
    verified: number;
  }> {
    await this.initialize();

    const stats = {
      totalFormulas: this.allFormulas.length,
      formulasByDomain: {} as Record<string, number>,
      formulasByDifficulty: {} as Record<string, number>,
      verified: 0
    };

    for (const formula of this.allFormulas) {
      // Count by domain
      stats.formulasByDomain[formula.domain] = (stats.formulasByDomain[formula.domain] || 0) + 1;
      
      // Count by difficulty
      stats.formulasByDifficulty[formula.difficulty] = (stats.formulasByDifficulty[formula.difficulty] || 0) + 1;
      
      // Count verified
      if (formula.verified) {
        stats.verified++;
      }
    }

    return stats;
  }

  /**
   * Clear caches (useful for testing or cache management)
   */
  public clearCache(): void {
    formulaCache.clear();
    searchCache.clear();
  }
}

// Export singleton instance
export const formulaDB = FormulaDatabaseService.getInstance();