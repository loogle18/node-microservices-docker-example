FROM node:latest

ENV PROJECT_NAME book_api

RUN mkdir -p /$PROJECT_NAME

WORKDIR /$PROJECT_NAME

COPY . /$PROJECT_NAME

RUN npm install

EXPOSE 3003

CMD ["npm", "start"]
