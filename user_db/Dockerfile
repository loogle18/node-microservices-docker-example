FROM postgres:10

COPY ./setup/init.sql /docker-entrypoint-initdb.d/init.sql

VOLUME  ["/var/lib/postgresql/data"]

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 5432

CMD ["postgres"]
