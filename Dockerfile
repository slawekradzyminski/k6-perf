# Build stage
FROM node:20-slim as builder
WORKDIR /app
COPY package*.json ./
COPY node_modules* ./node_modules/
RUN npm install

# Copy the rest of the source code
COPY . .
RUN npm run bundle

# K6 stage
FROM grafana/k6
WORKDIR /app
COPY --from=builder /app/dist ./dist 
