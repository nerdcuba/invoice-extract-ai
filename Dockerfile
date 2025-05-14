# Etapa 1: build
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2: servir contenido
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
