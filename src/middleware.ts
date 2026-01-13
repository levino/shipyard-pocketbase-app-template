import { defineMiddleware } from 'astro:middleware'
import { handleAuthRequest } from '@levino/pocketbase-auth'

// Public paths that don't require authentication
const publicPaths = ['/public/', '/api/health']

export const onRequest = defineMiddleware(async (context, next) => {
  // Skip auth entirely in test environment
  if (import.meta.env.DISABLE_AUTH === 'true') {
    return next()
  }

  const path = new URL(context.request.url).pathname

  // Skip auth for public paths
  if (publicPaths.some((p) => path.startsWith(p))) {
    return next()
  }

  // Configure these for your deployment
  const authUrl = import.meta.env.AUTH_POCKETBASE_URL || 'http://localhost:8090'
  const authGroup = import.meta.env.AUTH_POCKETBASE_GROUP || 'default'

  // handleAuthRequest handles /api/cookie, /api/logout, and auth checks
  const authResponse = await handleAuthRequest(context.request, {
    pocketbaseUrl: authUrl,
    groupField: authGroup,
  })

  if (authResponse) {
    return authResponse
  }

  return next()
})
