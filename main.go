// main.go
package main

import (
	"github.com/4cecoder/drip-campaign/config"
	"github.com/4cecoder/drip-campaign/database"
	_ "github.com/4cecoder/drip-campaign/docs"
	"github.com/4cecoder/drip-campaign/models"
	"github.com/4cecoder/drip-campaign/routes"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
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
	defer func(DB *gorm.DB) {
		err := DB.Close()
		if err != nil {
			log.Println("Error closing database connection:", err)
		}
	}(database.DB)

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

	// Create an admin user
	// Change me to your desired admin username and password
	adminUsername := "admin"
	adminPassword := "password"
	err = CreateAdminUser(adminUsername, adminPassword)
	if err != nil {
		log.Println("Failed to create admin user: " + err.Error())
	}

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

func CreateAdminUser(username, password string) error {
	hashedPassword, err := models.HashPassword(password)
	if err != nil {
		return err
	}

	adminUser := models.User{
		Email:    username,
		Password: hashedPassword,
		Role:     models.AdminRole,
	}

	if err := database.DB.Create(&adminUser).Error; err != nil {
		return err
	}

	return nil
}
