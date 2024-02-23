#!/bin/bash

# Start MongoDB service
docker-compose up -d

# Wait for MongoDB to be ready
sleep 20

# Run your tests
npm run cypress:run

# Stop MongoDB service
docker-compose down