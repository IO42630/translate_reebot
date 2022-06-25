FROM node:16.15-buster-slim
WORKDIR /app
COPY . /app
RUN npm install && npm install -g tsc --force  && npm install -g typescript --force
RUN tsc -b
CMD npm run start
EXPOSE 8081
