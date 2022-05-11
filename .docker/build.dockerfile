FROM node:16-alpine

WORKDIR /opt/app

COPY . .

RUN yarn

RUN yarn lint

ENV NODE_ENV=production

WORKDIR /opt/app/dist

COPY config .

CMD ["yarn", "start"]
