# Base image using nodejs v20
FROM node:20-alpine AS base

# Using base image to install dependencies
# This image is used to install dependencies and build the source code
FROM base AS deps

# Install compatibility libraries
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Create a directory and set the working directory
# This directory will be used to copy the dependencies and the source code
WORKDIR /app

# Stage 1: Install dependencies only when needed
# This image is used to install dependencies only

# Copy the package-manager files to the working directory
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install the dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci ; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Stage 2: Build the source code
# Rebuild the source code only when needed
FROM base AS builder

# set the working directory
WORKDIR /app

# Copy the dependencies and the source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set default environment variables (with a placeholder)
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Set a placeholder for NEXTAUTH_SECRET at build time
ARG NEXTAUTH_SECRET_PLACEHOLDER=default_secret
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET_PLACEHOLDER}

RUN echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}"

# Build the source code
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Production image
# Production image, copy all the files and run next
FROM base AS runner

# Set the working directory
WORKDIR /app

# Create a user and group to run the application
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the files from the builder image to the runner image 
# this is copy the static files 
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# Copy the standalone files to the working directory
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# using the user nextjs to run the application
USER nextjs

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Export the port and run the application
EXPOSE ${PORT}

# Run the application 
# run the server.js file from standalone
CMD ["node", "server.js"]