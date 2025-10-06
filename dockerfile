# Etapa 1: Build
FROM node:20-alpine AS builder

# Directorio de trabajo
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package.json yarn.lock ./

# Instalamos dependencias
RUN yarn install --frozen-lockfile

# Copiamos todo el código
COPY . .

# Build de Next.js
RUN yarn build

# Etapa 2: Producción
FROM node:20-alpine AS runner

WORKDIR /app

# Copiamos solo lo necesario de la etapa de build
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Puerto que usará Next.js
EXPOSE 3000

# Comando para correr la app
CMD ["yarn", "start"]
