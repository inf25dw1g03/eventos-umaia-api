FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=maia_campus_event

COPY init.sql /docker-entrypoint-initdb.d/
    