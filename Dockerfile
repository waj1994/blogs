FROM nginx:latest

RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app

RUN npm config set registry https://registry.npmmirror.com/
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
RUN npm run build

COPY nginx.conf /etc/nginx/nginx.conf

# Show current folder structure in logs
EXPOSE 80