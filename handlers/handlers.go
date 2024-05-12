package handlers

import (
	"github.com/4cecoder/drip-campaign/auth"
	"net/http"
	"strconv"

	"github.com/4cecoder/drip-campaign/config"
	"github.com/4cecoder/drip-campaign/models"
	"github.com/gin-gonic/gin"
)

// LoginHandler handles user login
func LoginHandler(c *gin.Context) {
	var loginReq models.LoginRequest
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := models.GetUserByEmail(loginReq.Email)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	if !models.CheckPasswordHash(loginReq.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	token, err := auth.GenerateToken(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

// CreateCampaignHandler creates a new drip campaign
func CreateCampaignHandler(c *gin.Context) {
	var campaign models.DripCampaign
	if err := c.ShouldBindJSON(&campaign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&campaign).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create campaign"})
		return
	}

	c.JSON(http.StatusCreated, campaign)
}

// GetCampaignsHandler retrieves all drip campaigns
func GetCampaignsHandler(c *gin.Context) {
	var campaigns []models.DripCampaign
	if err := config.DB.Find(&campaigns).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve campaigns"})
		return
	}

	c.JSON(http.StatusOK, campaigns)
}

// GetCampaignHandler retrieves a specific drip campaign by ID
func GetCampaignHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaign models.DripCampaign
	if err := config.DB.First(&campaign, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign not found"})
		return
	}

	c.JSON(http.StatusOK, campaign)
}

// UpdateCampaignHandler updates a specific drip campaign by ID
func UpdateCampaignHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaign models.DripCampaign
	if err := config.DB.First(&campaign, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign not found"})
		return
	}

	if err := c.ShouldBindJSON(&campaign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&campaign).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update campaign"})
		return
	}

	c.JSON(http.StatusOK, campaign)
}

// DeleteCampaignHandler deletes a specific drip campaign by ID
func DeleteCampaignHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaign models.DripCampaign
	if err := config.DB.First(&campaign, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign not found"})
		return
	}

	if err := config.DB.Delete(&campaign).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete campaign"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Campaign deleted successfully"})
}

// CreateStageHandler creates a new stage
func CreateStageHandler(c *gin.Context) {
	var stage models.Stage
	if err := c.ShouldBindJSON(&stage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&stage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create stage"})
		return
	}

	c.JSON(http.StatusCreated, stage)
}

// GetStagesHandler retrieves all stages
func GetStagesHandler(c *gin.Context) {
	var stages []models.Stage
	if err := config.DB.Find(&stages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve stages"})
		return
	}

	c.JSON(http.StatusOK, stages)
}

// GetStageHandler retrieves a specific stage by ID
func GetStageHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var stage models.Stage
	if err := config.DB.First(&stage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stage not found"})
		return
	}

	c.JSON(http.StatusOK, stage)
}

// UpdateStageHandler updates a specific stage by ID
func UpdateStageHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var stage models.Stage
	if err := config.DB.First(&stage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stage not found"})
		return
	}

	if err := c.ShouldBindJSON(&stage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&stage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update stage"})
		return
	}

	c.JSON(http.StatusOK, stage)
}

// DeleteStageHandler deletes a specific stage by ID
func DeleteStageHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var stage models.Stage
	if err := config.DB.First(&stage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stage not found"})
		return
	}

	if err := config.DB.Delete(&stage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete stage"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Stage deleted successfully"})
}

// CreateStepHandler creates a new step
func CreateStepHandler(c *gin.Context) {
	var step models.Step
	if err := c.ShouldBindJSON(&step); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&step).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create step"})
		return
	}

	c.JSON(http.StatusCreated, step)
}

// GetStepsHandler retrieves all steps
func GetStepsHandler(c *gin.Context) {
	var steps []models.Step
	if err := config.DB.Find(&steps).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve steps"})
		return
	}

	c.JSON(http.StatusOK, steps)
}

// GetStepHandler retrieves a specific step by ID
func GetStepHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var step models.Step
	if err := config.DB.First(&step, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Step not found"})
		return
	}

	c.JSON(http.StatusOK, step)
}

// UpdateStepHandler updates a specific step by ID
func UpdateStepHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var step models.Step
	if err := config.DB.First(&step, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Step not found"})
		return
	}

	if err := c.ShouldBindJSON(&step); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&step).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update step"})
		return
	}

	c.JSON(http.StatusOK, step)
}

// DeleteStepHandler deletes a specific step by ID
func DeleteStepHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var step models.Step
	if err := config.DB.First(&step, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Step not found"})
		return
	}

	if err := config.DB.Delete(&step).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete step"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Step deleted successfully"})
}

// CreateCustomerHandler creates a new customer
func CreateCustomerHandler(c *gin.Context) {
	var customer models.Customer
	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&customer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create customer"})
		return
	}

	c.JSON(http.StatusCreated, customer)
}

// GetCustomersHandler retrieves all customers
func GetCustomersHandler(c *gin.Context) {
	var customers []models.Customer
	if err := config.DB.Find(&customers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve customers"})
		return
	}

	c.JSON(http.StatusOK, customers)
}

// GetCustomerHandler retrieves a specific customer by ID
func GetCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var customer models.Customer
	if err := config.DB.First(&customer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	c.JSON(http.StatusOK, customer)
}

// UpdateCustomerHandler updates a specific customer by ID
func UpdateCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var customer models.Customer
	if err := config.DB.First(&customer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&customer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update customer"})
		return
	}

	c.JSON(http.StatusOK, customer)
}

// DeleteCustomerHandler deletes a specific customer by ID
func DeleteCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var customer models.Customer
	if err := config.DB.First(&customer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	if err := config.DB.Delete(&customer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete customer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Customer deleted successfully"})
}

// CreateCampaignCustomerHandler creates a new campaign customer
func CreateCampaignCustomerHandler(c *gin.Context) {
	var campaignCustomer models.CampaignCustomer
	if err := c.ShouldBindJSON(&campaignCustomer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&campaignCustomer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create campaign customer"})
		return
	}

	c.JSON(http.StatusCreated, campaignCustomer)
}

// GetCampaignCustomersHandler retrieves all campaign customers
func GetCampaignCustomersHandler(c *gin.Context) {
	var campaignCustomers []models.CampaignCustomer
	if err := config.DB.Find(&campaignCustomers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve campaign customers"})
		return
	}

	c.JSON(http.StatusOK, campaignCustomers)
}

// GetCampaignCustomerHandler retrieves a specific campaign customer by ID
func GetCampaignCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaignCustomer models.CampaignCustomer
	if err := config.DB.First(&campaignCustomer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign customer not found"})
		return
	}

	c.JSON(http.StatusOK, campaignCustomer)
}

// UpdateCampaignCustomerHandler updates a specific campaign customer by ID
func UpdateCampaignCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaignCustomer models.CampaignCustomer
	if err := config.DB.First(&campaignCustomer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign customer not found"})
		return
	}

	if err := c.ShouldBindJSON(&campaignCustomer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&campaignCustomer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update campaign customer"})
		return
	}

	c.JSON(http.StatusOK, campaignCustomer)
}

// DeleteCampaignCustomerHandler deletes a specific campaign customer by ID
func DeleteCampaignCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaignCustomer models.CampaignCustomer
	if err := config.DB.First(&campaignCustomer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign customer not found"})
		return
	}
	if err := config.DB.Delete(&campaignCustomer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete campaign customer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Campaign customer deleted successfully"})
}

// GetSettingsHandler retrieves the user settings
func GetSettingsHandler(c *gin.Context) {
	var settings models.Settings
	if err := config.DB.First(&settings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Settings not found"})
		return
	}
	c.JSON(http.StatusOK, settings)

}

// UpdateSettingsHandler updates the user settings
func UpdateSettingsHandler(c *gin.Context) {
	var settings models.Settings
	if err := config.DB.First(&settings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Settings not found"})
		return
	}

	if err := c.ShouldBindJSON(&settings); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Save(&settings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update settings"})
		return
	}

	c.JSON(http.StatusOK, settings)
}
