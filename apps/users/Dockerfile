FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY apps/users/nest-cli.json nest-cli.json
COPY apps/users apps/users
COPY .env .env
COPY libs libs

RUN npm install
RUN npm run build users
RUN cd libs/common/src/prisma && npx prisma generate