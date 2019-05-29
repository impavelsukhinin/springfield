FROM node:latest
EXPOSE 3000
COPY ["./src", "package.json", "tsconfig.json", "yarn.lock", ".env", "/app/"]
RUN cd /app && yarn
WORKDIR /app

CMD [ "yarn", "start" ]
