FROM --platform=linux/amd64 node:20

WORKDIR /app

COPY . .
RUN npm install

# start app
CMD ["node", "src/index.js"]