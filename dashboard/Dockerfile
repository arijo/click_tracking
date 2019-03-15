FROM node:9-slim
WORKDIR /app
COPY . /app
WORKDIR /app/frontend
RUN npm install
RUN npm run-script development
WORKDIR /app/backend
RUN npm install
EXPOSE 3000
WORKDIR /app
RUN chmod a+x ./start.sh
CMD ./start.sh