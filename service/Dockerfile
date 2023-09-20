FROM node:18-alpine AS server

ENV PHANTOMJS_VERSION 2.1.1

RUN apk update && apk add bash && apk add jq

RUN apk add --update --no-cache curl && \
    curl -Ls "https://github.com/dustinblackman/phantomized/releases/download/${PHANTOMJS_VERSION}/dockerized-phantomjs.tar.gz" | tar xz -C / && \
    curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-linux-x86_64.tar.bz2 | tar -jxvf - -C / && \
    cp phantomjs-${PHANTOMJS_VERSION}-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs && \
    rm -fR phantomjs-${PHANTOMJS_VERSION}-linux-x86_64 && \
    apk del curl

WORKDIR /usr/src/app

COPY packages/service/start-container.sh /usr/src/app/start-container.sh
COPY packages/service/dist/service /usr/src/app/build
COPY node_modules /usr/src/app/node_modules

RUN  chmod +x start-container.sh

ENTRYPOINT ["/bin/bash", "./start-container.sh"]