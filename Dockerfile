# Use the official Node.js 14 image as the base image
FROM node:lts AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY package-lock.json package-lock.json
RUN npm ci  --debug 

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Angular app
RUN npm run build --configuration production

# Use a lightweight web server to serve the app
FROM nginx:alpine
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder  /app/dist/pokemon-app /usr/share/nginx/html 
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

