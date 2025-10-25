# Etapa 1: Build
FROM node:20.19.5-alpine AS builder
WORKDIR /app

# Dependencias necesarias para compilar Next.js en Alpine
RUN apk add --no-cache python3 g++ make

# Copiamos package.json y yarn.lock
COPY package.json yarn.lock ./

# Instalamos dependencias
RUN yarn install --frozen-lockfile

# Copiamos el resto del código
COPY . .

# Variables de entorno con valores dummy para el build
# (Azure las sobreescribirá en runtime)
ENV NEXT_PUBLIC_BASE_URL=http://localhost:3000
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXTAUTH_SECRET=dummy-secret-for-build

# Build de Next.js
RUN yarn build

# Etapa 2: Runtime
FROM node:20.19.5-alpine AS runner
WORKDIR /app

# Solo necesitamos dependencias de producción
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copiamos la app construida
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Puerto que usará Azure Container Apps
EXPOSE 3000

# Arrancamos la app en modo producción
CMD ["yarn", "start"]
