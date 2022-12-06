FROM node:16.11.1

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

WORKDIR /app/api
COPY ./ .

RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express
RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma
RUN npx nx build api --prod

WORKDIR /app/api/dist/apps/api
CMD ["node", "main.js"]