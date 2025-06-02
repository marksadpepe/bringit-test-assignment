FROM node:20-alpine

VOLUME ["/app"]

ARG APP_UID=1000
ENV APP_UID=${APP_UID}

RUN if [ ${APP_UID} = "1000" ]; then\
  deluser node; \
  fi

RUN addgroup -g ${APP_UID} application
RUN adduser -u ${APP_UID} -G application -s /bin/sh -D application

WORKDIR /app

RUN npm install --ignore-scripts -g @nestjs/cli

USER application

CMD npm ci && npm run start:dev

