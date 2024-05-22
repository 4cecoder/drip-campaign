package routes

import (
	"github.com/4cecoder/drip-campaign/auth"
	"github.com/4cecoder/drip-campaign/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	// Public routes
	public := router.Group("/api/v1")
	{
		public.POST("/login", handlers.LoginHandler)
	}

	// Routes accessible by users and admins
	userAndAdmin := router.Group("/api/v1")
	userAndAdmin.Use(auth.IsUserOrAdmin) // Use IsUserOrAdmin middleware
	{
		// Campaign routes
		userAndAdmin.POST("/campaigns", handlers.CreateCampaignHandler)
		userAndAdmin.GET("/campaigns", handlers.GetCampaignsHandler)
		userAndAdmin.GET("/campaigns/:id", handlers.GetCampaignHandler)
		userAndAdmin.PUT("/campaigns/:id", handlers.UpdateCampaignHandler)
		userAndAdmin.DELETE("/campaigns/:id", handlers.DeleteCampaignHandler)

		// Stage routes
		userAndAdmin.POST("/stages", handlers.CreateStageHandler)
		userAndAdmin.GET("/stages", handlers.GetStagesHandler)
		userAndAdmin.GET("/stages/:id", handlers.GetStageHandler)
		userAndAdmin.PUT("/stages/:id", handlers.UpdateStageHandler)
		userAndAdmin.DELETE("/stages/:id", handlers.DeleteStageHandler)

		// Step routes
		userAndAdmin.POST("/steps", handlers.CreateStepHandler)
		userAndAdmin.GET("/steps", handlers.GetStepsHandler)
		userAndAdmin.GET("/steps/:id", handlers.GetStepHandler)
		userAndAdmin.PUT("/steps/:id", handlers.UpdateStepHandler)
		userAndAdmin.DELETE("/steps/:id", handlers.DeleteStepHandler)

		// Customer routes
		userAndAdmin.POST("/customers", handlers.CreateCustomerHandler)
		userAndAdmin.GET("/customers", handlers.GetCustomersHandler)
		userAndAdmin.GET("/customers/:id", handlers.GetCustomerHandler)
		userAndAdmin.PUT("/customers/:id", handlers.UpdateCustomerHandler)
		userAndAdmin.DELETE("/customers/:id", handlers.DeleteCustomerHandler)

		// Campaign customer routes
		userAndAdmin.POST("/campaign-customers", handlers.CreateCampaignCustomerHandler)
		userAndAdmin.GET("/campaign-customers", handlers.GetCampaignCustomersHandler)
		userAndAdmin.GET("/campaign-customers/:id", handlers.GetCampaignCustomerHandler)
		userAndAdmin.PUT("/campaign-customers/:id", handlers.UpdateCampaignCustomerHandler)
		userAndAdmin.DELETE("/campaign-customers/:id", handlers.DeleteCampaignCustomerHandler)

		// Send an email route
		userAndAdmin.POST("/send-email", handlers.SendEmailHandler)

		// Email Template routes
		userAndAdmin.POST("/templates", handlers.CreateEmailTemplateHandler)
		userAndAdmin.GET("/templates", handlers.GetEmailTemplatesHandler)
		userAndAdmin.GET("/templates/:id", handlers.GetEmailTemplateHandler)
		userAndAdmin.PUT("/templates/:id", handlers.UpdateEmailTemplateHandler)
		userAndAdmin.DELETE("/templates/:id", handlers.DeleteEmailTemplateHandler)

		// Settings routes
		userAndAdmin.GET("/settings", handlers.GetSettingsHandler)
		userAndAdmin.PUT("/settings", handlers.UpdateSettingsHandler)
	}

	// Admin routes
	adminPrivate := router.Group("/api/v1")
	adminPrivate.Use(auth.AuthMiddleware("admin")) // Use AuthMiddleware for admin-only routes
	{
		// User routes
		adminPrivate.POST("/users", handlers.CreateUserHandler)
		adminPrivate.GET("/users", handlers.GetUsersHandler)
		adminPrivate.GET("/users/:id", handlers.GetUserHandler)
		adminPrivate.PUT("/users/:id", handlers.UpdateUserHandler)
		adminPrivate.DELETE("/users/:id", handlers.DeleteUserHandler)
	}
}
