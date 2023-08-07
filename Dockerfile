# Stage 1: Build the Angular app
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

# Stage 2: Use nginx to serve the built app
FROM nginx:alpine

# Copy configuration files (make sure these files exist in the same directory as Dockerfile)
#COPY default.conf.template /etc/nginx/conf.d/default.conf.template
#COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular app from the build stage
COPY --from=build /app/dist/pokemon-app /usr/share/nginx/html

# Configure nginx and start
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
