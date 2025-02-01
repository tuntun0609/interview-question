/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.fe-question.top',
  generateRobotsTxt: true,
  sitemapSize: 7000,
}
