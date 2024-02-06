FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY apps/auth/nest-cli.json nest-cli.json
COPY apps/auth apps/auth
COPY .env .env
COPY libs libs

RUN npm install
RUN npm run build auth
RUN cd libs/common/src/prisma && npx prisma generate

FROM node:alpine AS staging

ARG NODE_ENV=staging
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/dist ./dist

RUN npm install
RUN cd dist/libs/common/src/prisma && npx prisma generate

EXPOSE 3001

CMD ["node", "dist/apps/auth/src/main"]