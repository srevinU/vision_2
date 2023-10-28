FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

COPY libs libs
COPY apps/auth auth

RUN cd auth && npm install 

RUN npm run build auth