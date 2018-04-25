FROM node:7.9-alpine

WORKDIR /usr/app/

COPY ./package.json ./
RUN npm install --quiet

COPY ./ ./