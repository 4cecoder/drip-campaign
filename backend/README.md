# Backend Overview and Database Deployment

## Table of Contents
1. [Backend](#backend)
2. [Database Deployment](#database-deployment)
3. [Running the Backend](#running-the-backend)

## Backend

The backend of this application is built with Go (Golang) using the Gin framework and GORM for database interactions. It provides RESTful API endpoints for managing drip campaigns, customers, email templates, and user authentication.

Key components:
- Gin: A web framework for Go
- GORM: An ORM library for database operations
- JWT: Used for authentication
- Swagger: API documentation

The main entry point is in `backend/main.go`:

## Database Deployment

The database used is PostgreSQL, which can be easily deployed using Docker Compose. Here's how to set it up:

1. Ensure you have Docker and Docker Compose installed on your system.

2. Create two `.env` files:

   a. In the `backend/deploy` directory, create a `.env` file for Docker Compose with the following content (adjust values as needed):

   ```
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=drip_campaign
   DB_PORT=5432
   ```

   b. In the `backend` directory, create another `.env` file for the Go application with the following content:

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=drip_campaign
   JWT_SECRET=your_jwt_secret
   ```

3. Use the following Docker Compose file to deploy the database:

```yaml:backend/deploy/docker-compose.yml
startLine: 1
endLine: 18
```

4. Run the following command in the `backend/deploy` directory:

   ```
   docker-compose up -d
   ```

This will start a PostgreSQL container with the specified environment variables.

5. The backend will automatically connect to this database using the configuration in `backend/config/config.go`:

```go:backend/config/config.go
startLine: 23
endLine: 54
```

Make sure the environment variables in your `backend/.env` file match the ones used in the `config.go` file and the database settings in the Docker Compose file.

With these steps, you'll have a PostgreSQL database running and ready for the backend to connect to it.

## Running the Backend

After setting up the database, you can run the backend server:

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install the required Go dependencies:
   ```
   go mod download
   ```

3. Run the main.go file:
   ```
   go run main.go
   ```

The server will start, and you should see output indicating that it's running, typically on `http://localhost:8080` (unless you've specified a different port in your environment variables).

Make sure your `.env` file in the `backend` directory is properly configured before running the server.