# Dockerized Laravel and vue app

 - PHP 7.2
 - Vue.js

## Run

### Quickstart

There are scripts to run the commands to set up the environment in the folder bin. Tested on ubuntu 18.04.

With docker `sh bin/docker.sh`
Without docker `sh bin/local.sh`


### With a docker
Install [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

Copy .env.example to .env and set the variable OWLBOT_API_TOKEN with a valid api token

Build and run the Docker containers
`docker-compose build`
`docker-compose up -d`

Install php dependecies
`docker exec -it dictionaryapp_app_1 composer install`

Install node js dependecies and build production version
`docker exec -it dictionaryapp_app_1 npm install && npm run production`

Generate artisan key
`docker exec -it dictionaryapp_app_1 php artisan key:generate && php artisan cache:clear`

Visit your app at [http://localhost:8080](http://localhost:8080/)

For additional docker commands in shell use
`docker exec -it dictionaryapp_app_1 bash`

### Local development version

Have Installed PHP, composer, nodejs, and npm

Copy .env.example to .env and set the variable OWLBOT_API_TOKEN with a valid api token

Install composer dependencies
`composer install`

Install node js dependencies
`npm install`

Generate artisan key
`php artisan key:generate && php artisan cache:clear`

Run Composer server
`php artisan serve`

For npm production version
`npm run production`

For npm development version
`npm run development`

Or for npm hot reload development verison
`npm run watch`

Visit your app at [http://localhost:8000](http://localhost:8000/)

### With a docker

Run Laravel phpunut tests `./vendor/bin/phpunit`
Run vuejs tests on dictionary component `npm test`
   
