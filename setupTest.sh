#!/bin/bash

# Start MongoDB service
docker-compose up -d

# Wait for MongoDB to be ready
sleep 20

# Stop MongoDB service
docker-compose down