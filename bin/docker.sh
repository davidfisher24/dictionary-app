#!/bin/bash
docker-compose build
docker-compose up -d
docker exec -it dictionaryapp_app_1 composer install
docker exec -it dictionaryapp_app_1 npm install && npm run production
echo "Done. You can visit the site at http://localhost:8080"
