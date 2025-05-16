# database/Dockerfile
FROM mysql:8.0

ENV MYSQL_DATABASE=tu_alerta
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=admin123
ENV MYSQL_ROOT_PASSWORD=root123

COPY init.sql /docker-entrypoint-initdb.d/
