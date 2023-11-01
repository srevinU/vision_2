FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY package-lock.json ./

RUN npm install

COPY apps/users users
# COPY libs libs

RUN cd users && npm install

RUN npm run build .