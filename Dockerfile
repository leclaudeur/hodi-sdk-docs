# ==========================================
# Build stage: Astro writes every page of the site into dist/.
# ==========================================
# The pages are the same on every processor: build them once, on the machine that builds the image.
FROM --platform=$BUILDPLATFORM node:24-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5 AS build

WORKDIR /app

# Install dependencies first to improve Docker layer caching.
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ==========================================
# Runtime stage: nginx serves the pages as plain files, nothing else runs.
# ==========================================
FROM nginx:1.30-alpine@sha256:caf4e1e032a20f9c3c5e28fc7f25ffd768ad8677b4975c54193075997b3a97e3

# Links the image on GitHub's registry to this repository.
LABEL org.opencontainers.image.source=https://github.com/leclaudeur/hodi-sdk-docs

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# The redirects the build wrote are nginx's configuration, not a page to serve.
COPY --from=build /app/dist/redirects.nginx /etc/nginx/redirects.conf
RUN rm /usr/share/nginx/html/redirects.nginx

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1/robots.txt || exit 1
