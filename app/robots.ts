import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',

    },
    sitemap: 'https://latex-generator-ai-production.up.railway.app/',
  }
}