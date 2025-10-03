/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://agromane.com.br',
  generateRobotsTxt: true,
  exclude: ['/admin', '/login', '/assistant'],
  additionalPaths: async (config) => [
    // Provide explicit priority and changefreq per important page
    ...(
      await Promise.all([
        { loc: '/', priority: 1.0, changefreq: 'daily' },
        { loc: '/about', priority: 0.7, changefreq: 'monthly' },
        { loc: '/services', priority: 0.8, changefreq: 'weekly' },
        { loc: '/products', priority: 0.8, changefreq: 'weekly' },
        { loc: '/units', priority: 0.6, changefreq: 'monthly' },
        { loc: '/reviews', priority: 0.5, changefreq: 'monthly' },
        { loc: '/contact', priority: 0.6, changefreq: 'monthly' },
        { loc: '/blog', priority: 0.5, changefreq: 'weekly' },
      ].map(async (p) => {
        const entry = await config.transform(config, p.loc)
        return { ...entry, priority: p.priority, changefreq: p.changefreq }
      }))
    ),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/assistant'],
      },
    ],
  },
}