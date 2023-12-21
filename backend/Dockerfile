FROM node:18-alpine


COPY . .

RUN npm ci

EXPOSE 3003

CMD ["npm", "run", "dev"]
