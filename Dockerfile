# Imagen base con Apache y PHP
FROM php:8.2-apache

# Instalar extensiones necesarias
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Habilitar módulos de Apache necesarios
RUN a2enmod rewrite headers

# Configurar el DocumentRoot para que apunte a /var/www/html/GestiondeTareas
ENV APACHE_DOCUMENT_ROOT=/var/www/html/GestiondeTareas
RUN sed -ri 's#DocumentRoot /var/www/html#DocumentRoot ${APACHE_DOCUMENT_ROOT}#g' /etc/apache2/sites-available/000-default.conf \
    && sed -ri 's#<Directory /var/www/>#<Directory ${APACHE_DOCUMENT_ROOT}/>#g' /etc/apache2/apache2.conf \
    && sed -ri 's#<Directory /var/www/html/>#<Directory ${APACHE_DOCUMENT_ROOT}/>#g' /etc/apache2/apache2.conf

# Copiar (en build) solo composer.json si existiera para aprovechar cache (opcional)
# COPY composer.json composer.lock ./

# Copiar proyecto (en producción se usa COPY; en desarrollo se usará volumen)
COPY . /var/www/html/GestiondeTareas

# Establecer permisos apropiados (en dev en Windows puede no ser necesario)
RUN chown -R www-data:www-data /var/www/html \
    && find /var/www/html -type d -exec chmod 755 {} \; \
    && find /var/www/html -type f -exec chmod 644 {} \;

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["apache2-foreground"]


