FROM node:12.14.1-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.8-alpine
WORKDIR /usr/share/nginx/html/
COPY --from=builder /app/dist/* .
