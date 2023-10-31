FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./
COPY package-lock.json ./

RUN npm install

COPY apps/auth apps/auth
# COPY libs libs

RUN cd apps/auth && npm install

RUN npm run build auth