# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM registry.gitlab.com/chaiyot-mg/registry/bun:1.3.4 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && (bun install --frozen-lockfile || bun install --frozen-lockfile --registry https://registry.yarnpkg.com)

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

# copy production dependencies and source code into final image
FROM registry.gitlab.com/chaiyot-mg/registry/bun:1.3.4-distroless AS release
WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Copy standalone build instead of full node_modules
# This significantly reduces image size
COPY --from=prerelease --chown=1000:1000 /usr/src/app/public ./public
COPY --from=prerelease --chown=1000:1000 /usr/src/app/.next/standalone ./
COPY --from=prerelease --chown=1000:1000 /usr/src/app/.next/static ./.next/static

# run the app
# Use numeric UID 1000 (bun default) because distroless images lack /etc/passwd
USER 1000
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "server.js" ]
