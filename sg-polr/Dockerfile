# Forked from TrafeX/docker-php-nginx (https://github.com/TrafeX/docker-php-nginx/)

FROM alpine:latest
LABEL Maintainer="Aurélien JANVIER <dev@ajanvier.fr>" \
      Description="Unofficial Docker image for Polr."

# Environment variables
ENV APP_NAME My Polr
ENV APP_PROTOCOL https://
ENV DB_PORT 3306
ENV DB_DATABASE polr
ENV DB_USERNAME polr
ENV POLR_BASE 62

# Install packages
RUN apk --no-cache add gettext git php7 php7-fpm php7-pdo php7-mysqli php7-json php7-openssl php7-curl \
    php7-zlib php7-xml php7-phar php7-intl php7-dom php7-xmlreader php7-ctype \
    php7-mbstring php7-gd php7-xmlwriter php7-tokenizer php7-pdo_mysql php7-memcached nginx supervisor curl bash

# Configure nginx
COPY config/nginx.conf /etc/nginx/nginx.conf

# Configure PHP-FPM
COPY config/fpm-pool.conf /etc/php7/php-fpm.d/zzz_custom.conf
COPY config/php.ini /etc/php7/conf.d/zzz_custom.ini

# Configure supervisord
COPY config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy start.sh script
COPY start.sh /start.sh
RUN chmod u+x /start.sh

# Copy wait-for-it.sh
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod u+x /wait-for-it.sh

# Install composer
RUN curl -sS https://getcomposer.org/installer \
    | php -- --install-dir=/usr/local/bin --filename=composer

# Pull application
RUN mkdir -p /src && \
    git clone https://github.com/cydrobolt/polr.git /src

WORKDIR /src

# Install dependencies
RUN composer install --no-dev -o

# Setting logs permissions
RUN mkdir -p storage/logs && \
    touch storage/logs/lumen.log && \
    chmod -R go+w storage

# Copy env file and setup values
COPY config/.env_polr .env_polr

# Copy admin seeder
COPY seeders/AdminSeeder.php AdminSeeder_withoutEnv.php

# Removing now useless dependency
RUN apk del git

EXPOSE 80
ENTRYPOINT /wait-for-it.sh $DB_HOST:$DB_PORT --strict --timeout=120 -- /start.sh
