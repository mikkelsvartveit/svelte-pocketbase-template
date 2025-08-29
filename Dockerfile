# SvelteKit build step
FROM node:20-alpine AS vite-build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# PocketBase build step
FROM golang:1.25 AS go-build

WORKDIR /app

COPY ./pocketbase/ .

RUN CGO_ENABLED=0 go build

# Production image
FROM alpine:latest

COPY --from=vite-build /app/build /pb/pb_public
COPY --from=go-build /app/pocketbase /pb/pocketbase
COPY --from=go-build /app/pb_migrations* /pb/pb_migrations
COPY --from=go-build /app/pb_hooks* /pb/pb_hooks

EXPOSE 8080

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
