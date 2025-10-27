# Etapa 1: Build
FROM node:20.19.5-alpine AS builder
WORKDIR /app

# Debug info
RUN echo "=== STARTING BUILD ===" && node --version && yarn --version

# Dependencias necesarias
RUN apk add --no-cache python3 g++ make

# Copiar archivos de dependencias
COPY package.json yarn.lock ./
RUN echo "=== PACKAGE FILES COPIED ===" && ls -la

# Instalar dependencias
RUN yarn install --frozen-lockfile --verbose

# Copiar código fuente
COPY . .
RUN echo "=== ALL FILES COPIED ===" && find . -name "*.js" -o -name "*.ts" -o -name "*.json" | head -10

# Recibir variables desde el pipeline
#ARG NEXT_PUBLIC_BASE_URL
#ARG NEXTAUTH_URL
#ARG NEXTAUTH_SECRET

# Pasarlas al entorno de build
#ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
#ENV NEXTAUTH_URL=${NEXTAUTH_URL}
#ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
#ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build con logging máximo
RUN echo "=== STARTING YARN BUILD ===" && yarn build 

# Etapa 2: Runtime
FROM node:20.19.5-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["yarn", "start"]
