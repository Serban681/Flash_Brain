# Step 1: Build the app in a node container
FROM node:18.18.0 as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
