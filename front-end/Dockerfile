FROM node:20.1-alpine3.16 AS builder

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.4-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
