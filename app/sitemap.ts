import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://latex-generator-ai-production.up.railway.app'
  
  const routes = [
    '',
    '/about',
    '/search',
    '/search/direct-search',
    '/search/multistep-search',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
} 