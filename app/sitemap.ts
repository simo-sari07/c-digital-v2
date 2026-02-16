import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cdigital.ma'

  // Pages dyal l-khidamat o l-agency
  const mainPages = [
    '', '/services', '/expertises', '/portfolio', 
    '/about', '/team', '/blog', '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Sub-pages dial l-services o l-packs
  const servicePages = [
    '/services/development', '/services/ecommerce', '/services/production',
    '/packs/web', '/packs/seo', '/packs/video'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog posts (Hado muhimin b-zaf l-SEO)
  const blogPosts = [
    '/blog/modern-development-workflows-2026',
    '/blog/branding-strategies-new-era',
    '/blog/rise-of-creative-coding',
    '/blog/psychology-digital-identity'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...mainPages, ...servicePages, ...blogPosts]
}