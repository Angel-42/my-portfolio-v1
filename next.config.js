/** @type {import('next').NextConfig} */
const basePath = process.env.GITHUB_PAGES_BASEPATH || ''

const nextConfig = {
  reactStrictMode: true,
  // export to static HTML (usable for GitHub Pages)
  output: 'export',
  // exported files use trailing slash which is often preferred for static hosting
  trailingSlash: true,
  // when deploying to GitHub Pages as a project site set
  // GITHUB_PAGES_BASEPATH to the repo path (eg. '/my-portfolio-v1')
  ...(basePath ? { basePath, assetPrefix: basePath } : {})
}

module.exports = nextConfig
