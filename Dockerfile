FROM nginx:latest

RUN mkdir -p /home/app
WORKDIR /home/app
COPY ./blog/.vuepress/dist /home/app

COPY nginx.conf /etc/nginx/nginx.conf

# Show current folder structure in logs
EXPOSE 80