FROM node:16-alpine AS BUILD_STAGE
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
EXPOSE 80

FROM nginx:1.23.3
COPY --from=BUILD_STAGE /app/build/ /usr/share/nginx/html
COPY --from=BUILD_STAGE /app/default.conf /etc/nginx/conf.d/default.conf