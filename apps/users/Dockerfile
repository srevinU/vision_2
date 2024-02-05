FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY apps/users/nest-cli.json nest-cli.json
COPY apps/users apps/users
COPY .env .env
COPY libs libs

RUN npm install
RUN npm run build users
RUN cd libs/common/src/prisma && npx prisma generate

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3001

RUN cd dist/libs/common/src/prisma && npx prisma generate

CMD ["node", "dist/apps/users/src/main"]