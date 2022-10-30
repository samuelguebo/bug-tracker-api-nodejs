# CRUD API with Node.js
A restful API in Node.js with token-based authentication, TypeScript and Docker support.

## Set environment variables
Rename the `.env.example` file into `.env` and modify it according to your credentials and settings.

## Start Docker container
`docker compose up -d`

## Features
### Initial data seed
On first run the app is populated with some initial data: posts, users, categories

### Restful API
An api with the following routes
* `/posts`
* `/categories`
* `/users`

### Token authentication
An authentication system is included using the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library. 
* `/authentication` generates a token if valid `username` and `password` are provided via Post
* `/posts` endpoints are protected by the token authentication system

## Development
### Hot-reload in development mode
Install nodemon with `npm install -g nodemon` and reload server on file change with `nodemon -w . -x 'docker compose down && docker compose up -d'`

### Unit testing
`npm test`