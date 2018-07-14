#!/bin/bash


set -e

host="$1"
shift
cmd="$@"
retries=10

until pg_isready -h ${host} -p 5432 -U $USER_DB_USER_NAME > /dev/null 2>&1 || [ $retries -eq 0 ]; do
  >&2 echo "Postgres is unavailable, $((retries--)) remaining attempts..."
  sleep 1
done

if [ $retries -eq 0 ]; then
  echo "All retries attempted - executing command"
else
  echo "Postgres is up - executing command"
fi

exec $cmd
