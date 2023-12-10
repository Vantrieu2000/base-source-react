## Builder Image
FROM node:14.17.0-alpine3.13 as builder
RUN npm install -g nx
WORKDIR /build

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN nx run app:build

## Runner Image
FROM nginx:latest
COPY --from=builder /build/dist/apps/app /usr/share/nginx/html

EXPOSE 80
