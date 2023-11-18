# Shopping List Backend

This is the backend part of a simple MERN (MongoDB, Express.js, React, Node.js) stack application for creating and managing shopping lists for various shoppers.

## Getting Started

These instructions will help you set up and run the frontend of the application on your local machine.

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) should be installed on your machine.

## Installing & Running

1. Clone the repository to your local machine:

```
git clone https://github.com/FarisRizvanovic/TactaInternship-NodeBackend.git
```

2. Navigate to the project directory and install dependencies:

```
npm install
```

3. There is 3 start commands

- 1. Running tests (also you can download the jest plugin to run the test if that is your prefered way of doing it)

  ```
  npm test
  ```

- 2. Running the app in development (gives more details about errors)

  ```
  npm start
  ```

- 3. Running the app in production (hides dangerous error details)

  ```
  npm start:prod
  ```

  **After this take look at the [ReactFrontend](https://github.com/FarisRizvanovic/TactaInternship-Frontend) and its instructions**

## Built with

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [Mongoose](https://mongoosejs.com/)
- [Jest](https://jestjs.io/)

## Project Structure

- \***\*tests**:\*\* Directory containing test files for the application.
- **controllers:** Directory with files handling the application's business logic.
- **models:** Directory containing files defining the structure of data in the database.
- **routes:** Directory with files defining endpoints and route handlers.
- **utils:** Directory for utility functions or helper modules used throughout the application.
