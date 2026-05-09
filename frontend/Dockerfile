FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Set the API URL at build time (Next.js bakes NEXT_PUBLIC_ vars during build)
ARG NEXT_PUBLIC_API_URL=https://apitest.birthdayremainder.online
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build the Next.js app
RUN npm run build

EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
