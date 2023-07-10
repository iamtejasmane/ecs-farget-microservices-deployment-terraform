FROM node:16.13.2-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY  . .
RUN npm run build
FROM nginx:1.23.1-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]