FROM node:9-slim
WORKDIR /app
COPY . /app
WORKDIR /app/site
RUN npm install
EXPOSE 3001
CMD ["npm", "start"]