FROM node:18-alpine

# Create app directory
WORKDIR /app

# Bundle files
COPY . .

# Install dependencies
RUN npm ci

# Expose port 3000
EXPOSE 3003

# Start app
CMD source migrate-and-start.sh