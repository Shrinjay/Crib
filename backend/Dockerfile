FROM node

COPY package*.json ./

RUN npm install 
RUN npm install typescript -g

COPY . .

RUN chmod a+x node_modules/.bin/tsc

RUN npm run build

ENV PORT=8080
EXPOSE 8080

CMD ["node", "build/server.js"]