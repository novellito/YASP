# YASP (Yet Another Starter Pack)

A boilerplate project made to help you get up and running with apps that require authentication 🚀

## Tech Stack

- Next.js
- Node.js
- MongoDB
- Redis
- Docker

## Features

Support for the following authentication strategies using [passport.js](http://www.passportjs.org/).

- Local
- Facebook
- Twitter
- Google

---

- Next.js configured with Redux, Jest, Sass, and Express

- JWT authentication flow with refresh tokens (using Redis)

- Docker ready 🐳

## App Structure

⭐️ Index.js - Entry point of the client

📁 Components - Application components

📁 Lib - Library specific setup

📁 Pages - Application pages

📁 Store - Store & Reducer logic

📁 HOC - Higher Order Components

📁 Tests - Client side tests

📁 Utils - Client side util functions

## Server 📁

⭐️ Index.js - Entry point of the server

📁 Auth - Contains logic for the various authentication strategies.

📁 Controllers - Handles the logic after an endpoint is hit.

📁 Models - Holds the User Schema with the following structure:

```
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
```

📁 Routes - Holds the different endpoints of the app.

📁 Services - Classes that hold utility methods which are used throughout the application.

📁 Test - Contains test suites for the different parts of the app.

# Running the app

Clone the repo & run `npm install` at the root directory and in the server directory.

Create a .env file in the server directory with the following content.

```
FACEBOOK_CLIENT_SECRET=YOUR_INFO
FACEBOOK_CLIENT_ID=YOUR_INFO
TWITTER_SECRET=YOUR_INFO
TWITTER_KEY=YOUR_INFO
GOOGLE_CONSUMER_KEY=YOUR_INFO
GOOGLE_CONSUMER_SECRET=YOUR_INFO
SECRET_ONE=YOUR_INFO
SECRET_TWO=YOUR_INFO
MONGO_URL=YOUR_INFO - used for deployment - comment this out during development
REDIS_URL=YOUR_INFO - used for deployment - comment this out during development
DOCKER_MONGO=mongodb://mongo/yasp-server - Use only if you want to use docker-compose file
DOCKER_REDIS=redis://redis:6379 - Use only if you want to use docker-compose file
```

You will need to register onto the various platforms and create your credentials as well as configure the proper callback urls.

## Via Local

You will need to have redis and mongodb running locally.

After those are up and running, run the commands:

From the server directory you can use either `nodemon` or `npm run server`

From the root directory you can use either `nodemon` or `npm run dev`

To run tests, run `npm run test-watch`

## Via Docker Local

You will need to have Docker set up.

After Docker is up and running, use `docker-compose up --build`

## Running Tests

Client Tests - `npm test`

Server Tests - `npm test` or `npm run test-watch`

## Deployment

Note: You will need to have [Docker](https://www.docker.com/) set up on your machine to do this deployment.

[Heroku](https://www.heroku.com/) is my platform of choice as it is very quick and easy to set up!

If you do not have an account go ahead and register for a free deployment!

Since this app consists of the client and server you will need to create two apps.

## Server

- Create an app for the server

- After creating an app go into the resources tab and under **Add-ons** select mLab MongoDB and Heroku Redis.

- Go ahead into the mLab site and click the **Users** tab. Add a new database user & remember the credentials as this will be used soon!

- There should be a section that has a URI similar to `mongodb://<dbuser>:<dbpassword>@something.mlab.com:1234/heroku_12133`. You will want to add this to the `MONGO_URL` variable in your .env file (make sure to put in your dbuser and dbpassword).

- Now go back to your Heroku resources and go the the Heroku Redis page. Click on the **View Credentials** button and copy the URI into the `REDIS_URL` env variable. (it should look similar to `redis://h:somelongstring@ec2-3-123-456-789.compute-1.amazonaws.com:12345`)

- Go to the settings section of the Heroku dashboard and add all of the environment variables you have in your .env file into the **config vars** section.

- Go into the server directory (`cd server`) and run the following commands:

```
heroku login

heroku container:login

heroku container:push web -a your-app-name

heroku container:release web -a your-app-name
```

- Make note of the url that the server is hosted on as we will be placing this in various places in the client app.

## Client

- Copy the server url and substitute the `BASE_URL` variable in login.js. Go into `index.js` and place the server url into the `target` property of the `prodProxy` variable.

- Create an app for the client

- Now from the client directory (`cd ..`) run the same commands as before:

```
heroku container:push web -a your-app-name

heroku container:release web -a your-app-name
```

**NOTE: That in order to use Facebook Authentication for deployment, you will need to set up https for your site.**
