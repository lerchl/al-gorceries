# Use node to build
FROM node:20.1-alpine3.16 AS builder

# Establish the working directory
WORKDIR /app

# Copy package.json
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

RUN touch .env
RUN echo "REACT_APP_API_URL=http://yustheyokai.xyz" >> .env
RUN echo "REACT_APP_API_PORT=8080" >> .env

# Build the app
RUN npm run build

# Nginx Base Image
FROM nginx:1.23.4-alpine

# Copy the build files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
