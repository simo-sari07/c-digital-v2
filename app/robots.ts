import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Ga3 l-robots (Google, Bing, etc.)
      allow: '/',     // Khllihom i-choufou ga3 l-pages
      disallow: [
        '/admin/',    // Ila derti chi dashboard
        '/private/',  // Ay blassa fiha l-data sghira
        '/api/',      // L-routes dial backend f Next.js
      ],
    },
    sitemap: 'https://cdigital.ma/sitemap.xml', // Goul lihom fin kayna l-khrita
  }
}