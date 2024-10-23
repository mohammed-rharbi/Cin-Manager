FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["node","server"]

EXPOSE 5000