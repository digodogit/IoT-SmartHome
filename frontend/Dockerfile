FROM node:22.9.0

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]