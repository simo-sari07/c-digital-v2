import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cdigital.ma'

  // 1. Pages dyal l-khidamat o l-agency
  const mainPages = [
    '', '/services', '/expertises', '/portfolio', 
    '/about', '/team', '/blog', '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Sub-pages dial l-services o l-packs
  const servicePages = [
    '/services/development', '/services/ecommerce', '/services/production',
    '/packs/web', '/packs/seo', '/packs/video'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 3. Blog posts (Muhimin l-SEO Content)
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

  // 4. Local SEO Pages (L-villes li target-ina)
  const cities = ['casablanca', 'rabat', 'marrakech', 'agadir', 'tanger', 'fes', 'meknes'];
  const cityUrls = cities.map((city) => ({
    url: `${baseUrl}/agence/${city}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const, // Weekly bach Google i-checki l-updates d l-villes
    priority: 0.8, // Priority tal3a hit hado homa l-landing pages dial l-k-clients
  }))

  // N-jm3o kolchi f list wa7da
  return [...mainPages, ...servicePages, ...blogPosts, ...cityUrls]
}