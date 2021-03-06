# build from the latest Node 8.x on Docker Apline Linux
FROM node:8.9.4-alpine


# set the application name
ENV APP_NAME alligoric-api

# Create app directory
WORKDIR /usr/src/$APP_NAME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]