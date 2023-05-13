# Delivery Order Backend

## Project Overview

A backend application that designed to manage orders. It provides APIs for create, modify and read order. The application is written in Node.js and uses MySQL for data storage.

## Features

- **Order Creation**: Users can create new orders with details of origin and destination.
- **Order Modification**: Users can modify existing orders, changing the status.
- **Order Listing**: Users can view a list of all orders, along with their detail.

## Setting Up

### Prerequisites

- Docker installed on your local machine.

### Setting Up Environment Variables

The application uses environment variables for configuration. These are stored in a `.env` file in the project root.

A sample environment file `.env.sample` is included in the project. 

Here are the steps to set up your `.env` file:

1. Copy the sample environment file: `cp .env.sample .env`
2. Open the newly created `.env` file: `nano .env`
3. Replace the value with your actual values (Mainly the GOOGLE_MAPS_API_KEY).
4. Save and exit.

Here's a brief description of each environment variable:

- `DB_HOST`: The hostname of your MySQL database.
- `DB_PORT`: The port number for your MySQL database.
- `DB_USER`: The username for your MySQL database.
- `DB_PASSWORD`: The password for your MySQL database.
- `DB_NAME`: The name of your MySQL database.
- `GOOGLE_MAPS_API_KEY`: The API key for Google Maps API.

### Running the Application

After setting up your environment variables, you can run the application by running `start.sh` script.

- During the first run, the script will build the Docker image and start the application.
- Simultaneously, it will also create the database tables and seed the database with sample data.
- Application will be available at `http://localhost:8080`, after MySQL docker is ready.