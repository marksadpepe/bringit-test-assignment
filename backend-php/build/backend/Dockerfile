FROM php:8.3.7-cli

RUN php -v && echo "PHP Version confirmed: $(php -r 'echo PHP_VERSION;')"

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    netcat-openbsd \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libicu-dev \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    mysqli \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl

RUN docker-php-ext-install opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ARG USER_ID=1000
ARG GROUP_ID=1000
RUN groupadd -g ${GROUP_ID} appuser && \
    useradd -u ${USER_ID} -g appuser -m appuser -s /bin/bash

WORKDIR /var/www/html

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

COPY composer.* ./

RUN if [ -f composer.json ]; then \
    composer install --no-dev --optimize-autoloader --no-scripts --no-interaction; \
    fi

COPY . .

RUN mkdir -p /var/log/php && \
    chown -R appuser:appuser /var/log/php

RUN chown -R appuser:appuser /var/www/html

USER appuser

ENV PORT=8000
ENV HOST=0.0.0.0
ENV PHP_VERSION=8.3.7

EXPOSE $PORT

RUN php -v | head -1

ENTRYPOINT ["docker-entrypoint.sh"]