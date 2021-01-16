ARG DOCKER_HUB="docker.io"
ARG NPM_REGISTRY="http://registry.npmjs.org"
ARG NODE_VERSION="14" 

FROM node:${NODE_VERSION} as build

COPY . /workspace/

RUN echo "registry = http://registry.npmjs.org" > /workspace/.npmrc  && \
    cd /workspace/                                             && \
    npm install                                                && \
    npm run build

FROM node:${NODE_VERSION} as runtime

COPY --from=build /workspace/dist/ /usr/local/nodejs/document-root/
COPY --from=build /workspace/nodejs/ /usr/local/nodejs/

RUN chmod a+rx /usr/local/nodejs/server.js                     && \
    chmod a+rwx /usr/local/nodejs/document-root/*              

EXPOSE 8080

USER node

CMD ["node", "/usr/local/nodejs/server.js"]

