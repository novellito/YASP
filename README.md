# YASP (Yet Another Starter Pack)

A boilerplate project made to help you get up and running with apps that require authentication 🚀

The app currently supports the following authentication strategies using [passport.js](http://www.passportjs.org/).

- Local
- Facebook
- Twitter
- Google

It uses a JWT authentication flow with refresh tokens.

## Tech Stack

- Node.js
- MongoDB
- Redis
- Docker

## App Structure

⭐️ Index.js - Entry point of the app

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

📁 Tests - Contains test suites for the different parts of the app.

# Running the app

Clone the repo & run `npm install`

## Via local

You will need to have redis and mongodb running locally.

After those are up and running, either use `node index.js` or `nodemon`

To run tests, run `npm run test-watch`

## Via Docker

You will need to have Docker set up.

After Docker is up and running, use `docker-compose up --build`