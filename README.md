# Itunes-search-app

## Deployment links:

Frontend: https://pd7yqt-3000.csb.app/
API: https://pd7yqt-3001.csb.app/

## Introduction

This is the backend of my project. It provides the server-side functionality and APIs to support my application. It's responsible for handling requests to the itunes api.

## Getting Started

To get started with this backend project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/sabisa-siganga/itunes-search-app.git
   ```

## Change into the project directory:

cd itunes-search-app

## Install the required dependencies:

npm install

## Available Scripts

In the project directory, you can use the following scripts:

## npm run dev

Starts the backend server in development mode.

The server will be accessible at http://localhost:8080.

# Running Backend Tests

To execute tests for the backend of the iTunes-search-app, follow these steps:

1. **Navigate to the Backend Directory:**

   Change your current directory to the Backend by using the following command:

   cd itunes-search-app

2. **Run Tests:**

To initiate the testing process,execute the following command on itunes-search-app directory in your command line:

    npm test

3. **jest.config.js for separation purposes:**

- I have utilized jest.config.js because i wanted to separate test configurations from my application code which improves code organization.
- It also follows best practices by keeping frontend and backend application and test code separate.

# Application Security

This document outlines the security measures implemented in my backend application to ensure the safety.

I have employed or incoportated Helmet in my application to secure

## Helmet.js Integration

[Helmet](https://helmetjs.github.io/) is a set of middleware for Express.js applications designed to enhance application security.

To integrate Helmet with my application, I have added the following lines of code:

```javascript
const express = require("express");
const helmet = require("helmet");

const app = express();
app.use(helmet());
```

# Find front-end documentation

Navigate to: ` ./itunes-search-ui/README.md`
