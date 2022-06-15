# syntax = docker/dockerfile:experimental

### Base
FROM node:16.3.0-alpine as base
ENV NO_UPDATE_NOTIFIER=true
RUN npm install -g typescript@3.4.1

RUN apk add --no-cache git
RUN npm install -g lerna
RUN apk add g++ make python3
USER node
ARG APP_HOME=/home/node/srv
WORKDIR $APP_HOME

COPY package.json package.json
COPY package-lock.json package-lock.json


### Build
FROM base as build

RUN npm ci

COPY --chown=node:node . .

RUN npm run build


### Deployment
FROM base as deployment

RUN npm ci --only=production

COPY cfg $APP_HOME/cfg
COPY --from=build $APP_HOME/lib $APP_HOME/lib

EXPOSE 5000

CMD [ "npm", "start" ]
