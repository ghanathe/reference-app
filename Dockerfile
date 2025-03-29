# Stage 1: Build the app
FROM node:18-alpine AS builder
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
# Copy the remaining files and build the production bundle
COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
# Copy the production build from the builder stage to the nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx configuration to handle dynamic routes
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (nginx default)
EXPOSE 3030
CMD ["nginx", "-g", "daemon off;"]
