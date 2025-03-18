# Use an official Node.js runtime as the base image

FROM node:18

# Set the working directory inside the container

USER node

WORKDIR /app

# Copy package.json and package-lock.json to the container

COPY . .

USER root
RUN chown -R node:node .
USER node

# Install project dependencies

RUN npm install

# Copy the rest of the application code to the container


# Build your Vite React project

RUN npm run build

# Expose the port your application runs on

EXPOSE 4173

# Start the application when the container starts

CMD [ "npm", "run", "preview", "--", "--host" ]
