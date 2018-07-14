FROM node:latest

ENV PROJECT_NAME gateway

RUN mkdir -p /$PROJECT_NAME

WORKDIR /$PROJECT_NAME

COPY . /$PROJECT_NAME

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]
