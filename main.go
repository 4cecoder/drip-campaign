// main.go
package main

import (
	"github.com/4cecoder/drip-campaign/config"
	"github.com/4cecoder/drip-campaign/database"
	_ "github.com/4cecoder/drip-campaign/docs"
	"github.com/4cecoder/drip-campaign/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"log"
	"os"
)

// @title Drip Campaign API
// @version 1.0
// @description API documentation for the Drip Campaign application.
// @host localhost:8080
// @BasePath /api/v1
func main() {
	// Load environment variables from .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Error loading .env file")
	}

	// Initialize the database connection
	config.Init()
	defer database.DB.Close()

	// Create a new Gin router
	router := gin.Default()

	// Enable CORS for all origins and methods
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Register routes
	routes.RegisterRoutes(router)
	// Register Swagger route
	router.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

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
