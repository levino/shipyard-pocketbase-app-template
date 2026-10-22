import node from '@astrojs/node'
import shipyard from '@levino/shipyard-base'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import globalCss from './src/styles/global.css?url'

export default defineConfig({
  site: 'https://your-site.example.com',
  output: 'server',
  // Astro 7 entfernt mit dem neuen Standard 'jsx' Leerzeichen zwischen
  // Inline-Elementen. Bisheriges Verhalten beibehalten.
  compressHTML: true,
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    shipyard({
      css: globalCss,
      brand: 'Todo App',
      title: 'Todo App',
      tagline: 'A simple todo application',
      navigation: {
        home: { label: 'Todos', href: '/' },
        logout: { label: 'Logout', href: '/logout' },
      },
    }),
  ],
})
