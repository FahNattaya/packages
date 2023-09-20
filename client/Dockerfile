FROM node:14-alpine AS builder


COPY packages/client/dist/client /usr/src/app/build
COPY node_modules /usr/src/app/node_modules
FROM nginx:stable-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache tzdata

ENV TZ="Asia/Bangkok"
WORKDIR /usr/src/app
COPY packages/client/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

## add permissions
RUN chown -R nginx:nginx /usr/share/nginx && chmod -R 755 /usr/share/nginx && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid


USER nginx
CMD ["nginx", "-g", "daemon off;"]