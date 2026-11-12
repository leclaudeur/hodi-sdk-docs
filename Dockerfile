# ==========================================
# Build stage: Astro writes every page of the site into dist/.
# ==========================================
# The pages are the same on every processor: build them once, on the machine that builds the image.
FROM --platform=$BUILDPLATFORM node:24-alpine AS build

WORKDIR /app

# Install dependencies first to improve Docker layer caching.
COPY package*.json ./
RUN npm ci

COPY . .
# The site's public address, for canonical links, hreflang and the sitemap.
ARG SITE_URL
ENV SITE_URL=$SITE_URL
RUN npm run build

# ==========================================
# Runtime stage: nginx serves the pages as plain files, nothing else runs.
# ==========================================
FROM nginx:1.30-alpine

# Links the image on GitHub's registry to this repository.
LABEL org.opencontainers.image.source=https://github.com/leclaudeur/hodi-sdk-docs

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1/robots.txt || exit 1
