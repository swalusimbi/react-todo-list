# Use the official Node.js image as a parent image
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN npm run build

# Use a lighter image to serve the built app
FROM nginx:alpine

# Copy the build files from the previous stage to NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port that NGINX will listen on
EXPOSE 80

# Command to run NGINX
CMD ["nginx", "-g", "daemon off;"]
