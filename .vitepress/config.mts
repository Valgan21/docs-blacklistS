import { defineConfig } from 'vitepress'

// Sitio de documentación de s-blacklist (FiveM). Bilingüe EN (root) / ES (/es/).
// base = nombre del repo de GitHub Pages → https://valgan21.github.io/S-blacklist/
export default defineConfig({
  title: 's-blacklist',
  description: 'Underground street racing system for FiveM — REP, Blacklist Top 10, Pink Slips, Heat, Race Hubs & a premium React UI.',
  base: '/docs-blacklistS/',
  cleanUrls: true,
  appearance: 'force-dark', // solo modo oscuro (sin versión blanca ni toggle)
  lastUpdated: true,

  // `cfg` (server.cfg) no es un lenguaje de Shiki; lo resaltamos como ini.
  markdown: { languageAlias: { cfg: 'ini' } },

  head: [
    ['meta', { name: 'theme-color', content: '#f5a524' }],
    ['meta', { property: 'og:title', content: 's-blacklist — FiveM' }],
    ['meta', { property: 'og:description', content: 'Underground street racing for FiveM.' }],
  ],

  themeConfig: {
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Valgan21/docs-blacklistS' }],
    footer: {
      message: 'Proprietary — for licensed customers.',
      copyright: '© 2026 s-blacklist',
    },
  },

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/guide/installation' },
          { text: 'Showcase', link: '/showcase' },
          { text: 'API', link: '/guide/api' },
          { text: 'Buy', link: 'https://github.com/Valgan21/docs-blacklistS' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Getting started',
              items: [
                { text: 'Overview', link: '/guide/' },
                { text: 'Installation', link: '/guide/installation' },
                { text: 'Configuration', link: '/guide/configuration' },
                { text: 'Access & Whitelist', link: '/guide/access' },
              ],
            },
            {
              text: 'Reference',
              items: [
                { text: 'Commands', link: '/guide/commands' },
                { text: 'Integration API', link: '/guide/api' },
              ],
            },
          ],
        },
      },
    },

    es: {
      label: 'Español',
      lang: 'es-ES',
      link: '/es/',
      themeConfig: {
        nav: [
          { text: 'Guía', link: '/es/guide/installation' },
          { text: 'Galería', link: '/es/showcase' },
          { text: 'API', link: '/es/guide/api' },
          { text: 'Comprar', link: 'https://github.com/Valgan21/docs-blacklistS' },
        ],
        sidebar: {
          '/es/guide/': [
            {
              text: 'Primeros pasos',
              items: [
                { text: 'Resumen', link: '/es/guide/' },
                { text: 'Instalación', link: '/es/guide/installation' },
                { text: 'Configuración', link: '/es/guide/configuration' },
                { text: 'Acceso y Whitelist', link: '/es/guide/access' },
              ],
            },
            {
              text: 'Referencia',
              items: [
                { text: 'Comandos', link: '/es/guide/commands' },
                { text: 'API de integración', link: '/es/guide/api' },
              ],
            },
          ],
        },
      },
    },
  },
})
