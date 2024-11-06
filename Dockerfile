### Build
FROM node:22.2.0-alpine3.20 AS build
ENV NO_UPDATE_NOTIFIER=true

USER node
ARG APP_HOME=/home/node/srv
WORKDIR $APP_HOME

COPY --chown=node:node . .

RUN npm ci
RUN npm run build


### Deployment
FROM node:22.2.0-alpine3.20 AS deployment

ENV NO_UPDATE_NOTIFIER=true

USER node
ARG APP_HOME=/home/node/srv
WORKDIR $APP_HOME

COPY --chown=node:node ./cfg $APP_HOME/cfg
COPY --chown=node:node --from=build $APP_HOME/lib $APP_HOME/lib

EXPOSE 5000

CMD [ "node", "./lib/start.cjs" ]
