FROM node:alpine As development

WORKDIR /usr/src/app

COPY .env .env
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
# COPY libs libs
COPY apps/users apps/users
COPY libs apps/users/libs

RUN npm install
RUN npm run build users