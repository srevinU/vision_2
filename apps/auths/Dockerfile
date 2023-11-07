FROM node:alpine As development

WORKDIR /usr/src/app

COPY .env .env
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json tsconfig.json
COPY apps/auths/nest-cli.json nest-cli.json
COPY apps/auths apps/auths
COPY libs libs

RUN npm install
RUN npm run build auths
RUN cd libs/common/src/prisma && npx prisma generate