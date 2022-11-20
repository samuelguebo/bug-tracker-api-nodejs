# BugTracker API (Node.js)
A restful API built with Node.js, MySQL, JWT authentication, TypeScript, and Docker.

## Local development

### Install Docker
This project uses [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/).

### Set environment variables
Rename the `.env.example` file into `.env` and modify it according to your credentials and settings.

### Start Docker container
The Docker container includes the Node.js and the MySQL servers. Start the servers with the following command:

`docker compose up -d` 

A web server will be setup, available at http://localhost:5000. Change to TypeScript files will trigger an automatic reload of the server, and your modifications will imediatelly be taken into account. One database named `bugtracker_db` is also created in the MySQL server. 

### Stop Docker container
To stop, run `docker-compose stop` or hit CTRL-C on the terminal your docker-compose
is running in.

After that, to start with code changes, you'll want to `docker-compose down`
to clean up.

### Logs
Logs of containerized servers are captured and available in [Docker logs](https://docs.docker.com/config/containers/logging/).


## Features
### Initial data seed
On first run the app is populated with some initial data: tasks, users, projects, comments.

### Restful API
An api with the following routes
* `/signup`
`/login`
* `/tasks`
* `/projects`
* `/users`
* `/comments`

### JWT authentication
An authentication system is included using the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library. 
* `/signup` helps create an account 
* `/login` generates a token if valid `username` and `password` are provided
* All the other routes are protected by the token authentication system

## Unit testing
Tests are grouped under the folder `src/__tests__` and are powered by [Jest](https://jestjs.io/docs/getting-started). Run all test suites with the following command: 

`npm test`