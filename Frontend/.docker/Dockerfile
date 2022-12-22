FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci


COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/leaderboard/ /usr/share/nginx/html