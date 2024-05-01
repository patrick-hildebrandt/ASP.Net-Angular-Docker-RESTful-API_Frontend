# Stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2
FROM nginx:alpine
# check angular.json for outputPath "dist/frontend"
COPY --from=node /app/dist/frontend /usr/share/nginx/html/
# important: create nginx.conf !
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# ctrl+shift+p -> docker -> build -> enter (docker addon)
# docker build --pull --rm -f "Dockerfile" -t frontend:latest "."
# ctrl+shift+p -> docker -> run -> enter (docker addon)
# docker run --rm -d -p 80:80/tcp frontend:latest