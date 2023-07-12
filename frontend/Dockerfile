# Stage 1: Build stage using Node.js
FROM node:16.13.2-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./package.json ./
COPY ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

ARG REACT_APP_CAB_API_URL
ENV REACT_APP_CAB_API_URL=$REACT_APP_CAB_API_URL

ARG REACT_APP_DRIVER_API_URL
ENV REACT_APP_DRIVER_API_URL=$REACT_APP_DRIVER_API_URL

ARG REACT_APP_CAB_ASSIGN_API_URL
ENV REACT_APP_CAB_ASSIGN_API_URL=$REACT_APP_CAB_ASSIGN_API_URL

ARG REACT_APP_AWS_ACCESS_KEY
ENV REACT_APP_AWS_ACCESS_KEY=$REACT_APP_AWS_ACCESS_KEY

ARG REACT_APP_AWS_SECRET_KEY
ENV REACT_APP_AWS_SECRET_KEY=$REACT_APP_AWS_SECRET_KEY

ARG REACT_APP_AWS_REGION
ENV REACT_APP_AWS_REGION=$REACT_APP_AWS_REGION

# Build the application
RUN npm run build

# Stage 2: Production stage using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground when a container is launched
CMD ["nginx", "-g", "daemon off;"]
