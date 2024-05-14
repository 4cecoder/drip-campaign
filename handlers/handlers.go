package handlers

import (
	"github.com/4cecoder/drip-campaign/database"
	"net/http"
	"strconv"

	"github.com/4cecoder/drip-campaign/models"
	"github.com/gin-gonic/gin"
)

// CreateCampaignHandler creates a new drip campaign
// @Summary Create a campaign
// @Description Create a new drip campaign
// @Tags Campaigns
// @Accept json
// @Produce json
// @Param campaign body models.DripCampaign true "Campaign data"
// @Success 201 {object} models.DripCampaign
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /campaigns [post]
func CreateCampaignHandler(c *gin.Context) {
	var campaign models.DripCampaign
	if err := c.ShouldBindJSON(&campaign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&campaign).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create campaign"})
		return
	}

	c.JSON(http.StatusCreated, campaign)
}

// GetCampaignsHandler retrieves all drip campaigns
// @Summary Get all campaigns
// @Description Retrieve all drip campaigns
// @Tags Campaigns
// @Produce json
// @Success 200 {array} models.DripCampaign
// @Failure 500 {object} models.ErrorResponse
// @Router /campaigns [get]
func GetCampaignsHandler(c *gin.Context) {
	var campaigns []models.DripCampaign
	if err := database.DB.Find(&campaigns).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve campaigns"})
		return
	}

	c.JSON(http.StatusOK, campaigns)
}

// GetCampaignHandler retrieves a specific drip campaign by ID
// @Summary Get a campaign
// @Description Retrieve a specific drip campaign by ID
// @Tags Campaigns
// @Produce json
// @Param id path int true "Campaign ID"
// @Success 200 {object} models.DripCampaign
// @Failure 404 {object} models.ErrorResponse
// @Router /campaigns/{id} [get]
func GetCampaignHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaign models.DripCampaign
	if err := database.DB.First(&campaign, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign not found"})
		return
	}

	c.JSON(http.StatusOK, campaign)
}

// UpdateCampaignHandler updates a specific drip campaign by ID
// @Summary Update a campaign
// @Description Update a specific drip campaign by ID
// @Tags Campaigns
// @Accept json
// @Produce json
// @Param id path int true "Campaign ID"
// @Param campaign body models.DripCampaign true "Updated campaign data"
// @Success 200 {object} models.DripCampaign
// @Failure 400 {object} models.ErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /campaigns/{id} [put]
func UpdateCampaignHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaign models.DripCampaign
	if err := database.DB.First(&campaign, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign not found"})
		return
	}

	if err := c.ShouldBindJSON(&campaign); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&campaign).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update campaign"})
		return
	}

	c.JSON(http.StatusOK, campaign)
}

// DeleteCampaignHandler deletes a specific drip campaign by ID
// @Summary Delete a campaign
// @Description Delete a specific drip campaign by ID
// @Tags Campaigns
// @Produce json
// @Param id path int true "Campaign ID"
// @Success 200 {object} models.SuccessResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /campaigns/{id} [delete]
func DeleteCampaignHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaign models.DripCampaign
	if err := database.DB.First(&campaign, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign not found"})
		return
	}

	if err := database.DB.Delete(&campaign).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete campaign"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Campaign deleted successfully"})
}

// CreateStageHandler creates a new stage
// @Summary Create a stage
// @Description Create a new stage
// @Tags Stages
// @Accept json
// @Produce json
// @Param stage body models.Stage true "Stage data"
// @Success 201 {object} models.Stage
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /stages [post]
func CreateStageHandler(c *gin.Context) {
	var stage models.Stage
	if err := c.ShouldBindJSON(&stage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&stage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create stage"})
		return
	}

	c.JSON(http.StatusCreated, stage)
}

// GetStagesHandler retrieves all stages
// @Summary Get all stages
// @Description Retrieve all stages
// @Tags Stages
// @Produce json
// @Success 200 {array} models.Stage
// @Failure 500 {object} models.ErrorResponse
// @Router /stages [get]
func GetStagesHandler(c *gin.Context) {
	var stages []models.Stage
	if err := database.DB.Find(&stages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve stages"})
		return
	}

	c.JSON(http.StatusOK, stages)
}

// GetStageHandler retrieves a specific stage by ID
// @Summary Get a stage
// @Description Retrieve a specific stage by ID
// @Tags Stages
// @Produce json
// @Param id path int true "Stage ID"
// @Success 200 {object} models.Stage
// @Failure 404 {object} models.ErrorResponse
// @Router /stages/{id} [get]
func GetStageHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var stage models.Stage
	if err := database.DB.First(&stage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stage not found"})
		return
	}

	c.JSON(http.StatusOK, stage)
}

// UpdateStageHandler updates a specific stage by ID
// @Summary Update a stage
// @Description Update a specific stage by ID
// @Tags Stages
// @Accept json
// @Produce json
// @Param id path int true "Stage ID"
// @Param stage body models.Stage true "Updated stage data"
// @Success 200 {object} models.Stage
// @Failure 400 {object} models.ErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /stages/{id} [put]
func UpdateStageHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var stage models.Stage
	if err := database.DB.First(&stage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stage not found"})
		return
	}

	if err := c.ShouldBindJSON(&stage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&stage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update stage"})
		return
	}

	c.JSON(http.StatusOK, stage)
}

// DeleteStageHandler deletes a specific stage by ID
// @Summary Delete a stage
// @Description Delete a specific stage by ID
// @Tags Stages
// @Produce json
// @Param id path int true "Stage ID"
// @Success 200 {object} models.SuccessResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /stages/{id} [delete]
func DeleteStageHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var stage models.Stage
	if err := database.DB.First(&stage, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Stage not found"})
		return
	}

	if err := database.DB.Delete(&stage).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete stage"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Stage deleted successfully"})
}

// CreateStepHandler creates a new step
// @Summary Create a step
// @Description Create a new step
// @Tags Steps
// @Accept json
// @Produce json
// @Param step body models.Step true "Step data"
// @Success 201 {object} models.Step
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /steps [post]
func CreateStepHandler(c *gin.Context) {
	var step models.Step
	if err := c.ShouldBindJSON(&step); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&step).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create step"})
		return
	}

	c.JSON(http.StatusCreated, step)
}

// GetStepsHandler retrieves all steps
// @Summary Get all steps
// @Description Retrieve all steps
// @Tags Steps
// @Produce json
// @Success 200 {array} models.Step
// @Failure 500 {object} models.ErrorResponse
// @Router /steps [get]
func GetStepsHandler(c *gin.Context) {
	var steps []models.Step
	if err := database.DB.Find(&steps).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve steps"})
		return
	}

	c.JSON(http.StatusOK, steps)
}

// GetStepHandler retrieves a specific step by ID
// @Summary Get a step
// @Description Retrieve a specific step by ID
// @Tags Steps
// @Produce json
// @Param id path int true "Step ID"
// @Success 200 {object} models.Step
// @Failure 404 {object} models.ErrorResponse
// @Router /steps/{id} [get]
func GetStepHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var step models.Step
	if err := database.DB.First(&step, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Step not found"})
		return
	}

	c.JSON(http.StatusOK, step)
}

// UpdateStepHandler updates a specific step by ID
// @Summary Update a step
// @Description Update a specific step by ID
// @Tags Steps
// @Accept json
// @Produce json
// @Param id path int true "Step ID"
// @Param step body models.Step true "Updated step data"
// @Success 200 {object} models.Step
// @Failure 400 {object} models.ErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /steps/{id} [put]
func UpdateStepHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var step models.Step
	if err := database.DB.First(&step, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Step not found"})
		return
	}

	if err := c.ShouldBindJSON(&step); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&step).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update step"})
		return
	}

	c.JSON(http.StatusOK, step)
}

// DeleteStepHandler deletes a specific step by ID
// @Summary Delete a step
// @Description Delete a specific step by ID
// @Tags Steps
// @Produce json
// @Param id path int true "Step ID"
// @Success 200 {object} models.SuccessResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /steps/{id} [delete]
func DeleteStepHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var step models.Step
	if err := database.DB.First(&step, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Step not found"})
		return
	}

	if err := database.DB.Delete(&step).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete step"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Step deleted successfully"})
}

// CreateCustomerHandler creates a new customer
// @Summary Create a customer
// @Description Create a new customer
// @Tags Customers
// @Accept json
// @Produce json
// @Param customer body models.Customer true "Customer data"
// @Success 201 {object} models.Customer
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /customers [post]
func CreateCustomerHandler(c *gin.Context) {
	var customer models.Customer
	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&customer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create customer"})
		return
	}

	c.JSON(http.StatusCreated, customer)
}

// GetCustomersHandler retrieves all customers
// @Summary Get all customers
// @Description Retrieve all customers
// @Tags Customers
// @Produce json
// @Success 200 {array} models.Customer
// @Failure 500 {object} models.ErrorResponse
// @Router /customers [get]
func GetCustomersHandler(c *gin.Context) {
	var customers []models.Customer
	if err := database.DB.Find(&customers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve customers"})
		return
	}
	c.JSON(http.StatusOK, customers)

}

// GetCustomerHandler retrieves a specific customer by ID
// @Summary Get a customer
// @Description Retrieve a specific customer by ID
// @Tags Customers
// @Produce json
// @Param id path int true "Customer ID"
// @Success 200 {object} models.Customer
// @Failure 404 {object} models.ErrorResponse
// @Router /customers/{id} [get]
func GetCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var customer models.Customer
	if err := database.DB.First(&customer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}

	c.JSON(http.StatusOK, customer)
}

// UpdateCustomerHandler updates a specific customer by ID
// @Summary Update a customer
// @Description Update a specific customer by ID
// @Tags Customers
// @Accept json
// @Produce json
// @Param id path int true "Customer ID"
// @Param customer body models.Customer true "Updated customer data"
// @Success 200 {object} models.Customer
// @Failure 400 {object} models.ErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /customers/{id} [put]
func UpdateCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var customer models.Customer
	if err := database.DB.First(&customer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}
	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&customer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update customer"})
		return
	}

	c.JSON(http.StatusOK, customer)
}

// DeleteCustomerHandler deletes a specific customer by ID
// @Summary Delete a customer
// @Description Delete a specific customer by ID
// @Tags Customers
// @Produce json
// @Param id path int true "Customer ID"
// @Success 200 {object} models.SuccessResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /customers/{id} [delete]
func DeleteCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var customer models.Customer
	if err := database.DB.First(&customer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Customer not found"})
		return
	}
	if err := database.DB.Delete(&customer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete customer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Customer deleted successfully"})
}

// CreateCampaignCustomerHandler creates a new campaign customer
// @Summary Create a campaign customer
// @Description Create a new campaign customer
// @Tags CampaignCustomers
// @Accept json
// @Produce json
// @Param campaignCustomer body models.CampaignCustomer true "Campaign customer data"
// @Success 201 {object} models.CampaignCustomer
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /campaign-customers [post]
func CreateCampaignCustomerHandler(c *gin.Context) {
	var campaignCustomer models.CampaignCustomer
	if err := c.ShouldBindJSON(&campaignCustomer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&campaignCustomer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create campaign customer"})
		return
	}

	c.JSON(http.StatusCreated, campaignCustomer)
}

// GetCampaignCustomersHandler retrieves all campaign customers
// @Summary Get all campaign customers
// @Description Retrieve all campaign customers
// @Tags CampaignCustomers
// @Produce json
// @Success 200 {array} models.CampaignCustomer
// @Failure 500 {object} models.ErrorResponse
// @Router /campaign-customers [get]
func GetCampaignCustomersHandler(c *gin.Context) {
	var campaignCustomers []models.CampaignCustomer
	if err := database.DB.Find(&campaignCustomers).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve campaign customers"})
		return
	}
	c.JSON(http.StatusOK, campaignCustomers)

}

// GetCampaignCustomerHandler retrieves a specific campaign customer by ID
// @Summary Get a campaign customer
// @Description Retrieve a specific campaign customer by ID
// @Tags CampaignCustomers
// @Produce json
// @Param id path int true "Campaign customer ID"
// @Success 200 {object} models.CampaignCustomer
// @Failure 404 {object} models.ErrorResponse
// @Router /campaign-customers/{id} [get]
func GetCampaignCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaignCustomer models.CampaignCustomer
	if err := database.DB.First(&campaignCustomer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign customer not found"})
		return
	}
	c.JSON(http.StatusOK, campaignCustomer)
}

// UpdateCampaignCustomerHandler updates a specific campaign customer by ID
// @Summary Update a campaign customer
// @Description Update a specific campaign customer by ID
// @Tags CampaignCustomers
// @Accept json
// @Produce json
// @Param id path int true "Campaign customer ID"
// @Param campaignCustomer body models.CampaignCustomer true "Updated campaign customer data"
// @Success 200 {object} models.CampaignCustomer
// @Failure 400 {object} models.ErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /campaign-customers/{id} [put]
func UpdateCampaignCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaignCustomer models.CampaignCustomer
	if err := database.DB.First(&campaignCustomer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign customer not found"})
		return
	}
	if err := c.ShouldBindJSON(&campaignCustomer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&campaignCustomer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update campaign customer"})
		return
	}

	c.JSON(http.StatusOK, campaignCustomer)

}

// DeleteCampaignCustomerHandler deletes a specific campaign customer by ID
// @Summary Delete a campaign customer
// @Description Delete a specific campaign customer by ID
// @Tags CampaignCustomers
// @Produce json
// @Param id path int true "Campaign customer ID"
// @Success 200 {object} models.SuccessResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /campaign-customers/{id} [delete]
func DeleteCampaignCustomerHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var campaignCustomer models.CampaignCustomer
	if err := database.DB.First(&campaignCustomer, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Campaign customer not found"})
		return
	}

	if err := database.DB.Delete(&campaignCustomer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete campaign customer"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Campaign customer deleted successfully"})

}

// GetSettingsHandler retrieves the user settings
// @Summary Get settings
// @Description Retrieve the user settings
// @Tags Settings
// @Produce json
// @Success 200 {object} models.Settings
// @Failure 404 {object} models.ErrorResponse
// @Router /settings [get]
func GetSettingsHandler(c *gin.Context) {
	var settings models.Settings
	if err := database.DB.First(&settings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Settings not found"})
		return
	}
	c.JSON(http.StatusOK, settings)

}

// UpdateSettingsHandler updates the user settings
// @Summary Update settings
// @Description Update the user settings
// @Tags Settings
// @Accept json
// @Produce json
// @Param settings body models.Settings true "Updated settings data"
// @Success 200 {object} models.Settings
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /settings [put]
func UpdateSettingsHandler(c *gin.Context) {
	var settings models.Settings
	if err := database.DB.First(&settings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Settings not found"})
		return
	}

	if err := c.ShouldBindJSON(&settings); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&settings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update settings"})
		return
	}

	c.JSON(http.StatusOK, settings)
}
