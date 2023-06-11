FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18
WORKDIR /app
RUN npm install -g serve
COPY --from=build-stage /app/dist /app
EXPOSE 5173
CMD ["serve", "-s", "/app", "-l", "5173"]
