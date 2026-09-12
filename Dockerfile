FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY src ./src
COPY fixtures ./fixtures
EXPOSE 3000
CMD ["node", "src/server.js"]
