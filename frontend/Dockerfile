FROM node:16.13.2-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY  . .
RUN npm run build
EXPOSE 3000
CMD npm start