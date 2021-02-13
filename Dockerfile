# Bajo la imagen
FROM php:8.0.2-apache

# Instalo los modulos "mysqli" y el driver mysql de PDO
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Actualizo e instalo "libpq-dev", necesario para instalar el driver de PostgreSQL de PDO (si no se necesita, los siguientes pasos se pueden saltar)
RUN apt-get update && apt-get install -y libpq-dev

# Configuro el driver PostgreSQL de PDO
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql

# Finalmente instalo el driver PostgreSQL de PDO
RUN docker-php-ext-install pdo_pgsql
