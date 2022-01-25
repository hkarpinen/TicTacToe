FROM node:latest
WORKDIR /games/TicTacToe
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]