# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.17.1

# Build stage
FROM node:${NODE_VERSION}-alpine as build
WORKDIR /usr/src/app
COPY ["package*.json", "tsconfig.json", "./"]
COPY ["prisma", "./prisma/"]
RUN npm install --silent
RUN npx prisma generate
COPY ["src", "./src"]
RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-alpine as production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma
RUN npm ci --omit=dev

# Run stage
FROM node:${NODE_VERSION}-alpine
USER node
WORKDIR /usr/src/app
COPY --from=production /usr/src/app .
EXPOSE 8000
CMD ["npm", "run", "start:prod"]
