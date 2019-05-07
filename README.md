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

📁 Tests - Client side tests

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

## Via local

You will need to have redis and mongodb running locally.

After those are up and running, run the commands:

From the server directory you can use either `nodemon` or `npm run server`

From the server directory you can use either `nodemon` or `npm run dev`

To run tests, run `npm run test-watch`

## Via Docker

You will need to have Docker set up.

After Docker is up and running, use `docker-compose up --build`

## Running Tests

Client Tests - `npm test`

Server Tests - `npm test` or `npm run test-watch`

## Deployment (Coming soon!)
