ARG NODE=node:23-alpine3.20

# Stage 1: Build the Next.js app
FROM ${NODE} AS deps

RUN apk add --no-cache libc6-compat

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install -g npm@10.9.0 && \
    npm uninstall -g cross-spawn@7.0.3 && \
    npm cache clean --force && \
    find /usr/local/lib/node_modules -name "cross-spawn" -type d -exec rm -rf {} + && \
    npm install -g cross-spawn@7.0.5 --force && \
    npm config set save-exact=true && \
    npm config set legacy-peer-deps=true && \
    npm install sharp && \
    npm install

FROM ${NODE} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the app source code
COPY . .

# Build the app (This will generate the .next folder and standalone files)
RUN npm run build

# Stage 3: Serve the built app using a lightweight image
FROM ${NODE} AS production

RUN npm install -g npm@11.2.0 && \
    npm config set save-exact=true && \
    npm config set legacy-peer-deps=true

# Set working directory
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output and necessary static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

# Expose port 3000 to be accessed
EXPOSE 3000

# Start the Next.js standalone app
CMD ["node", "server.js"]
