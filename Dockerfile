FROM node:20.3.1

WORKDIR /app

COPY . /app

RUN npm install --force

EXPOSE 3000

CMD ["npm", "start"]
