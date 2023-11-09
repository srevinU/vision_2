FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY apps/auth/nest-cli.json nest-cli.json
COPY apps/auth apps/auth
COPY .env .env
COPY libs libs

RUN npm install
RUN npm run build auth
RUN cd libs/common/src/prisma && npx prisma generate