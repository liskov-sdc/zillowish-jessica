FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run react-dev
RUN npm install knex -g
RUN knex migrate:rollback --env development 
RUN knex migrate:latest --env development
RUN ls ./knex/seeds
RUN npm run db-seed
Expose 3002

CMD ["npm","run","node-start"]
