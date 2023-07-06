# Stage 1: Build the React app
FROM node:16.13.2-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

# Stage 2: Serve the built React app
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf  
# Add this line
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
