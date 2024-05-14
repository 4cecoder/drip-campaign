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

	// Private routes
	private := router.Group("/api/v1")
	private.Use(auth.UserAuthMiddleware())
	{
		// Campaign routes
		private.POST("/campaigns", handlers.CreateCampaignHandler)
		private.GET("/campaigns", handlers.GetCampaignsHandler)
		private.GET("/campaigns/:id", handlers.GetCampaignHandler)
		private.PUT("/campaigns/:id", handlers.UpdateCampaignHandler)
		private.DELETE("/campaigns/:id", handlers.DeleteCampaignHandler)

		// Stage routes
		private.POST("/stages", handlers.CreateStageHandler)
		private.GET("/stages", handlers.GetStagesHandler)
		private.GET("/stages/:id", handlers.GetStageHandler)
		private.PUT("/stages/:id", handlers.UpdateStageHandler)
		private.DELETE("/stages/:id", handlers.DeleteStageHandler)

		// Step routes
		private.POST("/steps", handlers.CreateStepHandler)
		private.GET("/steps", handlers.GetStepsHandler)
		private.GET("/steps/:id", handlers.GetStepHandler)
		private.PUT("/steps/:id", handlers.UpdateStepHandler)
		private.DELETE("/steps/:id", handlers.DeleteStepHandler)

		// Customer routes
		private.POST("/customers", handlers.CreateCustomerHandler)
		private.GET("/customers", handlers.GetCustomersHandler)
		private.GET("/customers/:id", handlers.GetCustomerHandler)
		private.PUT("/customers/:id", handlers.UpdateCustomerHandler)
		private.DELETE("/customers/:id", handlers.DeleteCustomerHandler)

		// Campaign customer routes
		private.POST("/campaign-customers", handlers.CreateCampaignCustomerHandler)
		private.GET("/campaign-customers", handlers.GetCampaignCustomersHandler)
		private.GET("/campaign-customers/:id", handlers.GetCampaignCustomerHandler)
		private.PUT("/campaign-customers/:id", handlers.UpdateCampaignCustomerHandler)
		private.DELETE("/campaign-customers/:id", handlers.DeleteCampaignCustomerHandler)

		// Send an email route
		private.POST("/send-email", handlers.SendEmailHandler)

		// Email Template routes
		private.POST("/templates", handlers.CreateEmailTemplateHandler)
		private.GET("/templates", handlers.GetEmailTemplatesHandler)
		private.GET("/templates/:id", handlers.GetEmailTemplateHandler)
		private.PUT("/templates/:id", handlers.UpdateEmailTemplateHandler)
		private.DELETE("/templates/:id", handlers.DeleteEmailTemplateHandler)

		// Settings routes
		private.GET("/settings", handlers.GetSettingsHandler)
		private.PUT("/settings", handlers.UpdateSettingsHandler)

		// Admin routes
		admin := router.Group("/api/v1/admin")
		admin.Use(auth.AdminAuthMiddleware())
		{
			// User routes
			admin.POST("/users", handlers.CreateUserHandler)
			admin.GET("/users", handlers.GetUsersHandler)
			admin.GET("/users/:id", handlers.GetUserHandler)
			admin.PUT("/users/:id", handlers.UpdateUserHandler)
			admin.DELETE("/users/:id", handlers.DeleteUserHandler)
		}

	}
}
