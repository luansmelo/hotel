FROM node:20
WORKDIR /app
COPY . .
RUN npm install

COPY tsconfig.json .

EXPOSE 80
EXPOSE 3000
CMD ["npm", "run", "dev"]