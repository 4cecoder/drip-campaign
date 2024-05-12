package main

import (
	"log"
	"os"

	"github.com/4cecoder/drip-campaign/config"
	"github.com/4cecoder/drip-campaign/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Error loading .env file")
	}

	// Initialize the database connection
	config.Init()
	defer config.DB.Close()

	// Create a new Gin router
	router := gin.Default()

	// Register routes
	routes.RegisterRoutes(router)

	// Get the port from the environment variable or use a default value
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start the server
	err = router.Run(":" + port)
	if err != nil {
		log.Fatal("Error starting server:", err)
	}
}
