/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://agromane.com.br',
  generateRobotsTxt: true,
  exclude: ['/admin', '/login', '/assistant'],
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/services'),
    await config.transform(config, '/products'),
    await config.transform(config, '/units'),
    await config.transform(config, '/reviews'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/blog'),
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