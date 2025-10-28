FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production

# Cloud Run/Render/Fly will provide PORT; default is 3001 in code
EXPOSE 3001

CMD ["node", "server.js"]


