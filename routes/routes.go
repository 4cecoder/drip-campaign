package routes

import (
	"github.com/4cecoder/drip-campaign/auth"
	"github.com/4cecoder/drip-campaign/handlers"
	"github.com/4cecoder/drip-campaign/models"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	// Public routes
	public := router.Group("/api/v1")
	{
		public.POST("/login", handlers.LoginHandler)
	}

	// Private routes accessible by users
	userPrivate := router.Group("/api/v1")
	userPrivate.Use(auth.AuthMiddleware("user")) // Use AuthMiddleware for user-accessible routes
	{
		// Campaign routes
		userPrivate.POST("/campaigns", handlers.CreateCampaignHandler)
		userPrivate.GET("/campaigns", handlers.GetCampaignsHandler)
		userPrivate.GET("/campaigns/:id", handlers.GetCampaignHandler)
		userPrivate.PUT("/campaigns/:id", handlers.UpdateCampaignHandler)
		userPrivate.DELETE("/campaigns/:id", handlers.DeleteCampaignHandler)

		// Stage routes
		userPrivate.POST("/stages", handlers.CreateStageHandler)
		userPrivate.GET("/stages", handlers.GetStagesHandler)
		userPrivate.GET("/stages/:id", handlers.GetStageHandler)
		userPrivate.PUT("/stages/:id", handlers.UpdateStageHandler)
		userPrivate.DELETE("/stages/:id", handlers.DeleteStageHandler)

		// Step routes
		userPrivate.POST("/steps", handlers.CreateStepHandler)
		userPrivate.GET("/steps", handlers.GetStepsHandler)
		userPrivate.GET("/steps/:id", handlers.GetStepHandler)
		userPrivate.PUT("/steps/:id", handlers.UpdateStepHandler)
		userPrivate.DELETE("/steps/:id", handlers.DeleteStepHandler)

		// Customer routes
		userPrivate.POST("/customers", handlers.CreateCustomerHandler)
		userPrivate.GET("/customers", handlers.GetCustomersHandler)
		userPrivate.GET("/customers/:id", handlers.GetCustomerHandler)
		userPrivate.PUT("/customers/:id", handlers.UpdateCustomerHandler)
		userPrivate.DELETE("/customers/:id", handlers.DeleteCustomerHandler)

		// Campaign customer routes
		userPrivate.POST("/campaign-customers", handlers.CreateCampaignCustomerHandler)
		userPrivate.GET("/campaign-customers", handlers.GetCampaignCustomersHandler)
		userPrivate.GET("/campaign-customers/:id", handlers.GetCampaignCustomerHandler)
		userPrivate.PUT("/campaign-customers/:id", handlers.UpdateCampaignCustomerHandler)
		userPrivate.DELETE("/campaign-customers/:id", handlers.DeleteCampaignCustomerHandler)

		// Send an email route
		userPrivate.POST("/send-email", handlers.SendEmailHandler)

		// Email Template routes
		userPrivate.POST("/templates", handlers.CreateEmailTemplateHandler)
		userPrivate.GET("/templates", handlers.GetEmailTemplatesHandler)
		userPrivate.GET("/templates/:id", handlers.GetEmailTemplateHandler)
		userPrivate.PUT("/templates/:id", handlers.UpdateEmailTemplateHandler)
		userPrivate.DELETE("/templates/:id", handlers.DeleteEmailTemplateHandler)

		// Settings routes
		userPrivate.GET("/settings", handlers.GetSettingsHandler)
		userPrivate.PUT("/settings", handlers.UpdateSettingsHandler)
	}

	// Admin routes
	adminPrivate := router.Group("/api/v1")
	adminPrivate.Use(auth.AuthMiddleware(models.AdminRole)) // Use AuthMiddleware for admin-only routes
	{
		// User routes
		adminPrivate.POST("/users", handlers.CreateUserHandler)
		adminPrivate.GET("/users", handlers.GetUsersHandler)
		adminPrivate.GET("/users/:id", handlers.GetUserHandler)
		adminPrivate.PUT("/users/:id", handlers.UpdateUserHandler)
		adminPrivate.DELETE("/users/:id", handlers.DeleteUserHandler)
	}
}
