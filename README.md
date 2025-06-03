# Information
This repository contains a simple implementation of "Blog" backend services, implemented in NodeJS and PHP. For NodeJS, the following stack was used:
- NestJS for backend
- MySQL
- Prisma ORM

You should also have Docker and Docker Compose installed.

# Launch
## NestJS Backend
To successfully launch the NestJS backend service, you need to create a ```backend-nest/.env``` file similar to the ```backend-nest/.env.example```:
```
DATABASE_URL=mysql://mysql:mysql@bringit-mysql:3306/blog
```

The backend runs in container on port **3000**.

## PHP Backend
To successfully launch the NestJS backend service, you need to create a ```backend-php/config.php``` file similar to the ```backend-php/config.example.php```:
```
<?php
$DB_HOST = 'bringit-mysql';
$DB_USERNAME = 'mysql';
$DB_PASSWORD = 'mysql';
$DB_NAME = 'blog';
$DB_PORT = 3306;

$ORIGIN = '*';
?>
```

The backend runs in container on port **8000**.

## Configuration
In the root project folder you need to create a ```.env``` file similar to the ```.env.example```:
```
BACKEND_NEST_PORT=4000
BACKEND_PHP_PORT=5000
ROOT=/Users/mark/Workspace/Code/bringit-test-assignment
```

- ```BACKEND_NEST_PORT``` variable need to map ports for NestJS backend service. If everything is specified correctly, after launching all containers, Swagger for NestJS backend will be available at *http://localhost:BACKEND_NEST_PORT*, where ```BACKEND_NEST_PORT``` is **4000** by default (like in ```.env.example``` file).
- ```BACKEND_PHP_PORT``` variable need to map ports for PHP backend service. If everything is specified correctly, after launching all containers, PHP backend API will be available at *http://localhost:BACKEND_PHP_PORT*, where ```BACKEND_PHP_PORT``` is **5000** by default (like in ```config.example.php``` file).

## Run
To run all containers enter the command:
```bash
docker-compose up
```
or this comannd for detach mode
```bash
docker-compose up -d
```
