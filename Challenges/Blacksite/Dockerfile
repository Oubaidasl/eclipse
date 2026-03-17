FROM php:8.1-apache
COPY src/ /var/www/html/
COPY robots.txt /var/www/html/robots.txt
RUN chown -R www-data:www-data /var/www/html
EXPOSE 80
