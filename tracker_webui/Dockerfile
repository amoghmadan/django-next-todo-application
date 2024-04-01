FROM node:20-bookworm-slim

LABEL maintainer="Amogh Madan <amoghmadaan@gmail.com>"

WORKDIR /tracker

COPY ./package*.json /tracker/

RUN npm ci --location=project
