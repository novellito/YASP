# We use this base image because bcrypt.js requires python & node.js
FROM nikolaik/python-nodejs:latest

WORKDIR '/app'
COPY ./package.json ./

# RUN npm install -g nodemon
RUN npm install

COPY . . 

CMD ["npm", "run","server"]