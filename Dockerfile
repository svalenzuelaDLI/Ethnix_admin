FROM node:20.19.5-alpine
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install

COPY . .

EXPOSE 3000
CMD yarn start
