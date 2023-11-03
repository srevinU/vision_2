FROM node:alpine As development

WORKDIR /usr/src/app

COPY .env .env
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

COPY apps/users apps/users
# COPY libs libs

RUN npm run build users