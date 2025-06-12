# Dockerfile para el frontend Next.js
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
