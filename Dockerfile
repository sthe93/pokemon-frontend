# Use the official Node.js 14 image as the base image
FROM node:lts AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app for production
RUN npm run build -- --configuration=production

# Use a lightweight HTTP server to serve the built Angular app
FROM nginx:alpine
COPY --from=build /usr/src/app/dist/pokemon-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
