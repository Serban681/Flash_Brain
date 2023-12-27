# Step 1: Build the app in a node container
FROM node:18.18.0 as builder

# Set the working directory in the container
WORKDIR /app

# Define the build arguments
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ORIGIN
ARG NEXT_PUBLIC_URL

# Set the environment variables from the build arguments
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-https://secure-shore-14093-7824f4d91873.herokuapp.com}
ENV NEXT_PUBLIC_ORIGIN=${NEXT_PUBLIC_ORIGIN:-http://localhost:8000:3000}
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL:-http://localhost:3000}

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
