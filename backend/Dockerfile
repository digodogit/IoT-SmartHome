FROM node:22.10

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]