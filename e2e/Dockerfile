FROM node:alpine As development

WORKDIR /usr/src/app/e2e

COPY ./e2e/. .

RUN npm install

CMD ["npm", "test"]