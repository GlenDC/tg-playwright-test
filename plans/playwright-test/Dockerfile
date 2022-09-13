# Get the base image of Node version 17
FROM node:17

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal

WORKDIR /plan
COPY . /plan

RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

RUN yarn install

ENTRYPOINT [ "yarn", "run", "testground"]
