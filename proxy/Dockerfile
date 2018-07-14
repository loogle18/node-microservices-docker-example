FROM node:latest

ENV PROJECT_NAME proxy

RUN apt-get update && \
    apt-get install -f -y postgresql-client && \
    mkdir -p /$PROJECT_NAME

WORKDIR /$PROJECT_NAME

COPY . /$PROJECT_NAME

RUN npm install && \
    chmod -R +x /$PROJECT_NAME/setup

EXPOSE 3000
