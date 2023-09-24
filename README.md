# Node.js Dockerized Project

This is a Node.js project with Docker integration for easy deployment. It includes a basic test suite, a start script, and lists project requirements.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed on your machine
- [NVM](https://github.com/coreybutler/nvm-windows) installed on your machine
- [Docker](https://www.docker.com/get-started) installed and running
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Mubariz-a18/shyftlabs-assignment


2. Change to the project directory:
    cd shyftlabs-assignment

3. Use command to change Node version: 
   nvm use 20.3.1

4. Install project dependencies:
    npm install

## Running the Application

5. To run the application locally, use the following command:
    npm start
    This will start the application on http://localhost:3000.

## Using Docker-Compose
    use command : 
        docker-compose up
    restart docker containers:
        docker-compose restart



## Using Docker
    To run the application using Docker, follow these steps:

    Build the Docker image: 
        docker build -t shyftlabs-test .

    Run the Docker container:
        docker run -p 3000:3000 -d shyftlabs-test


## Running Tests

To run the tests, use the following command:
    npm test

## Folder Structure

The project structure is organized as follows:

`src`/: Contains the source code of the Node.js application.
`test`/: Contains test files for the application.
`Dockerfile`: Defines the Docker image.
`docker-compose.yml` (optional): Defines services for more complex setups.
`package.json`: Lists project dependencies and scripts.
`README.md`: The README file you are currently reading.
