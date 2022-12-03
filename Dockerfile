FROM node:14.15.1 as build-deps
# set working directory
WORKDIR /usr/src/app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./

RUN export NODE_OPTIONS=--max_old_space_size=8192

# install dependencies
RUN npm i
RUN npm install react-scripts@3.4.3 -g --silent

# add app
COPY . ./

# RUN npm run build
# start app
CMD ["npm", "start"]