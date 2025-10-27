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
# Argumentos
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_BASE_URL
ARG REACT_APP_API_URL

# Pasarlas al entorno de build
ENV NEXTAUTH_URL = $NEXTAUTH_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL_TOKEN='ijy0TtLbtWvF7WyIoaYL+OgckXLEJ18zeAfJtez0LRvro2Acm2cSBD3/umecdJUNwF+jfVcKV0Bszf5IWCVy45PwDtSv0XRBLSyP9+lmUhW7w+9zEuQgj2n5c/Ft7Z0R0vuYLOM8c/aEAveFboFjuMGchFzD4whSgPr7OjCXHf4FzhwLeQwW9s3qMmFw71jgkcPkLAz3NtgSoWiNkV3c7DTGOP0k95e7LSgZUhTaRXhxuezxSp9s3eHRp7/xFKMTMmkfV9sEcH8zHlEtjmcCyLk7dLQ3eWSi1abSp52ErvKDdF6oWdKufW3KJ3e5Nl+2C+BG3H+fe6df49MNvuvZLrvbXHJN8dWM0HmHYR1fB0OF+G0PxEXBcKdt3fF5eZBvNxKAUqscfdk+6yN7kFDWcl3Tt8LT4FeFveqLS//zl+/maRufSZu3FTBGfp+UJtzp'
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build con logging máximo
RUN echo "=== STARTING YARN BUILD ===" && yarn build 

# Etapa 2: Runtime
FROM node:20.19.5-alpine AS runner
WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000
CMD ["yarn", "start"]
