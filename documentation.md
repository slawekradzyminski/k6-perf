# Project Documentation

## Overview
This project provides a TypeScript and k6 template for performance testing. It integrates modern software testing practices by leveraging TypeScript for improved type-safety and maintainability, k6 for performance testing, and a Docker & Jenkins-based CI pipeline for automated testing.

## Project Structure

- **README.md**: Provides an overview of the project, installation instructions, and usage guidelines.
- **Dockerfile**: Contains multi-stage instructions to build the project using Node.js (for dependency installation and bundling) and then running tests using the grafana/k6 image.
- **Jenkinsfile**: Defines a Jenkins pipeline that builds and tests the project across different Node.js versions using a matrix build, running tests with k6.
- **LICENSE**: Contains the Apache License 2.0 for the project.
- **changebranch.sh**: A helper bash script to reset local changes and switch Git branches.
- **docker-compose.yml**: Provides a Docker Compose configuration to build and run the performance tests using Docker.
- **package.json**: Defines the project dependencies, devDependencies, and various npm scripts for building, bundling, and running tests in different environments.
- **tsconfig.json**: Configuration file for the TypeScript compiler with strict settings to ensure type safety.
- **webpack.config.js**: Configures Webpack (with Babel) to bundle and transpile TypeScript code into a format compatible with k6 (ES5.1 and CommonJS).
- **.babelrc**: Babel configuration to transform TypeScript and JavaScript code.
- **assets/**: Contains static data files (CSV, JSON) used in tests such as `products.csv`, `users.csv`, and `users.json`.
- **config/**: Contains configuration files:
  - **constants.ts**: Exports backend URL settings.
  - **httpConfig.ts**: Provides default HTTP headers and functions to add authentication headers.
  - **userAgentProvider.ts**: Provides a function to randomly select a user agent string.
- **generators/**:
  - **userGenerator.ts**: Generates random user data using Faker for testing.
- **http/**: Contains various modules for HTTP requests:
  - **addProductToCart.ts**: Function to add a product to the shopping cart.
  - **getCart.ts**: Function to retrieve the shopping cart details.
  - **getMe.ts**: Function to get the current user information.
  - **getProductById.ts**: Function to retrieve a specific product by its ID.
  - **getProducts.ts**: Function to retrieve a list of products.
  - **getUsers.ts**: Function to retrieve a list of users.
  - **postProduct.ts**: Function to create a new product.
  - **postSignIn.ts**: Function to perform user login.
  - **postSignUp.ts**: Function to register a new user.
- **src/**: Contains performance test scripts:
  - **product-setup-journey.ts**: Sets up products using CSV data and tests product creation.
  - **shopperjourney-staticcsv.ts**: Runs tests using static CSV user data for signing in.
  - **shopperjourney-staticjson.ts**: Runs tests using static JSON user data for signing in.
  - **shopperjourney.ts**: A comprehensive shopper journey that includes user registration, login, retrieving user details, products, and performing cart operations.
- **types/**: Contains TypeScript type definitions for:
  - **cartTypes.ts**: Types for cart-related requests.
  - **loginTypes.ts**: Types for login requests.
  - **productTypes.ts**: Types for product creation and product details.
  - **registerTypes.ts**: Types for user registration, including role definitions.
- **util/**: Utility modules:
  - **randomProductUtil.ts**: Provides a helper to select a random product based on criteria.
  - **randomUtil.ts**: Utility to generate random integers between specified values.
  - **requestUtil.ts**: Provides helper functions to repeat requests or run them with a certain probability.

## Running the Tests

- **Local Development:**
  - Install dependencies with `npm install`.
  - Transpile and bundle the tests with `npm run bundle`.
  - Run tests with k6 using a command like: `k6 run dist/shopperjourney.js` or using compatibility mode with `k6 run --compatibility-mode=base dist/get-200-status-test.js`.

- **Docker:**
  - Run the tests inside Docker using the provided Dockerfile with `docker run` commands.
  - Alternatively, use Docker Compose with `docker-compose up --build`.

- **CI/CD:**
  - The Jenkinsfile sets up a pipeline that builds the project on multiple Node.js versions, runs bundling, and executes tests with k6.
  - GitHub workflows are also configured to run tests on push or pull request events.

## Conclusion

This template aims to streamline the process of setting up a robust performance testing environment with TypeScript and k6. It combines modern development practices such as type safety, CI/CD automation, and containerization to help you achieve reliable and maintainable test suites.
