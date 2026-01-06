// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://allseasonsliving.com.au',
  output: 'server', // Enables server-side rendering for API routes
  trailingSlash: 'never', // Ensures URLs in sitemap don't have trailing slashes
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    })
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
});
