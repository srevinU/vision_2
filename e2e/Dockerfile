FROM node:alpine As development

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "test"]