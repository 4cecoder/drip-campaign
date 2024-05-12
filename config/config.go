package config

import (
	"fmt"
	"log"
	"os"

	"github.com/4cecoder/drip-campaign/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var (
	DB *gorm.DB
)

type Config struct {
	DBHost     string
	DBPort     string
	DBUser     string
	DBPassword string
	DBName     string
	JWTSecret  string
}

func Init() {
	var err error

	config := LoadConfig()

	dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
		config.DBHost, config.DBPort, config.DBUser, config.DBName, config.DBPassword)

	DB, err = gorm.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	log.Println("Connected to the database")

	// Migrate the database schema
	DB.AutoMigrate(
		&models.User{},
		&models.DripCampaign{},
		&models.Stage{},
		&models.Step{},
		// Add other models here
	)

	log.Println("Database migration completed")
}

func LoadConfig() *Config {
	return &Config{
		DBHost:     getEnv("DB_HOST", "localhost"),
		DBPort:     getEnv("DB_PORT", "5432"),
		DBUser:     getEnv("DB_USER", "postgres"),
		DBPassword: getEnv("DB_PASSWORD", "password"),
		DBName:     getEnv("DB_NAME", "drip_campaign"),
		JWTSecret:  getEnv("JWT_SECRET", "your-secret-key"),
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}
