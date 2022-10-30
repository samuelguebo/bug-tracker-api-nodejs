# CRUD API with Node.js
A restful API in Node.js with token-based authentication, TypeScript and Docker support.

## Setup
Global variables such as server port and MYSQL credetials can be set in `app/utils/config.js`

## Start Docker container
`docker compose up -d`

## Features
### Initial data seed
On first run the app is populated with some initial data: posts, users, categories

### Restful API
An api with the following routes
* /posts
* /categories
* /users

### Token authentication
An authentication system is included using the [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library. 
* `/authentication` generates a token if valid `username` and `password` are provided via Post
* `/posts` endpoints are protected by the token authentication system

## Development
### Hot-reload in development mode
1. Install nodemon with `npm install -g nodemon`
2. Create the shortcode below in your profile.
```bash
# restart services in docker-compose
docker-compose-restart(){
	docker-compose stop $@
	docker-compose rm -f -v $@
	docker-compose create --force-recreate $@
	docker-compose start $@
}
```
3. And reload server on file change with `nodemon -w . -x 'docker compose down && docker compose up -d'`
docker compose  -f "docker-compose.yml" up -d --build moveez_server_node

### Unit testing
`npm test`

## License and credits

The project is released for free under the terms of the GNU General Public License version 2
and some parts under their respective licenses. In general words, feel free and encouraged to use, modify and redistribute this theme however you like. You may remove any copyright references (unless required by third party components) and crediting is not necessary. It is offered free of charge. Unless otherwise specified, all the files, scripts and images are licensed under [GNU General Public License version 2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html).


# Contributors
 * Samuel Guebo ([@samuelguebo](http://samuelguebo.co))