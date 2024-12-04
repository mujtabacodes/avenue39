
FROM node:20.3.1


WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


EXPOSE 3300


CMD ["node", "dist/main"]
