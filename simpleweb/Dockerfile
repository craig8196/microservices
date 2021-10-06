# Base image
FROM node:alpine
WORKDIR /usr/app

# Install dependencies
COPY ./package.json ./
RUN npm install

# Mount this directory
COPY ./ ./

# Start command
CMD ["npm", "start"]
