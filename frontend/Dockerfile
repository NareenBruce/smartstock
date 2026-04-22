# frontend/Dockerfile
FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run Vite, exposing it to the network so Docker can map it
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]