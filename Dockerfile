FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src ./src
COPY fixtures ./fixtures
COPY tsconfig.json ./
EXPOSE 3000
CMD ["npm", "start"]
