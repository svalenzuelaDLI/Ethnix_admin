# Etapa 1: Build
FROM node:20.19.5-alpine AS builder
WORKDIR /app

# Dependencias necesarias para compilar Next.js en Alpine
RUN apk add --no-cache python3 g++ make

# Copiamos package.json y yarn.lock
COPY package.json yarn.lock* ./

# Instalamos dependencias
RUN yarn install

# Copiamos el resto del código
COPY . .

# Pasamos variables de entorno de build
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

# Build de Next.js
RUN yarn build

# Etapa 2: Runtime
FROM node:20.19.5-alpine
WORKDIR /app

# Copiamos la app ya construida
COPY --from=builder /app ./

# Puerto que usará Azure Container Apps
EXPOSE 3000

# Arrancamos la app en modo producción
CMD ["yarn", "start"]
