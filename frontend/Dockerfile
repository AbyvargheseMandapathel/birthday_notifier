# Use official Node runtime as a parent image
FROM node:20-slim

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project
COPY . .

# Expose port
EXPOSE 3000

# Command to run on container start
CMD ["npm", "run", "dev"]
