#!/bin/bash
composer install
npm install
php artisan key:generate && php artisan cache:clear
npm run development
php artisan serve
echo "Done. You can visit the site at http://localhost:8000"
