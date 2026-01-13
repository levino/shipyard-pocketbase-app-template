import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'
import shipyard from '@levino/shipyard-base'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://your-site.example.com',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    tailwind({ applyBaseStyles: false }),
    shipyard({
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
