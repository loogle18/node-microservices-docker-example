FROM node:latest

ENV PROJECT_NAME user_api

RUN mkdir -p /$PROJECT_NAME

WORKDIR /$PROJECT_NAME

COPY . /$PROJECT_NAME

RUN npm install

EXPOSE 3002

CMD ["npm", "start"]
