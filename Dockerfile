FROM node:alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=::
ENV PORT=3000

# Auth configuration - set AUTH_POCKETBASE_URL to your auth provider
# Defaults to local pocketbase service, override for external auth
ENV AUTH_POCKETBASE_URL=http://pocketbase:8090
ENV AUTH_POCKETBASE_GROUP=default

# Copy built assets and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install only production dependencies needed for runtime
RUN npm install --omit=dev

EXPOSE 3000

# Start the Astro SSR server on all interfaces
CMD ["node", "./dist/server/entry.mjs", "--host", "0.0.0.0", "--port", "3000"]
