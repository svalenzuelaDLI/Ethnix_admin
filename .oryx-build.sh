#!/bin/bash
echo "Instalando Yarn..."
npm install -g yarn

echo "Ejecutando build con Yarn..."
yarn install --frozen-lockfile
yarn build
