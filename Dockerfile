FROM node:14.16.1-alpine3.13 AS build

ARG NGINX_VERSION="1.20.0"
ARG NODE_VERSION="14.16.1-alpine3.13"
ARG REST_API_URL="http://localhost:4200/"

COPY . /workspace/

RUN cd /workspace/ && \
    npm install    && \
    REST_API_URL=${REST_API_URL}  npm run build -- --prod --configuration=production

FROM nginx:1.20.0 AS runtime


COPY  --from=build /workspace/dist/ /usr/share/nginx/html/

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
    sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf


EXPOSE 8080

USER nginx
