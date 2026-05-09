FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Build the Next.js app
RUN npm run build

EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
