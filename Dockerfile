FROM node:14.15.5-stretch
ENV HOME=/home/node
ENV APP_HOME=/home/node/facade-srv
ENV NO_UPDATE_NOTIFIER=true
## SETTING UP THE APP ##
RUN npm install -g npm
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
RUN cd $APP_HOME
# Bundle app source
COPY . $APP_HOME
# Chown all the files to node user.
RUN chown -R node:node $HOME
RUN pwd
# switch to the node user.
USER node
RUN npm install
RUN npm run build
EXPOSE 5000
CMD [ "npm", "start" ]
