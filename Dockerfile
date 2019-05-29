FROM node:latest
EXPOSE 3000
COPY ["./src", "package.json", "tsconfig.json", "yarn.lock", "/app/"]
RUN cd /app && yarn
WORKDIR /app

CMD [ "yarn", "start" ]
