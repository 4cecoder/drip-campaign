package handlers

import (
	"fmt"
	"github.com/4cecoder/drip-campaign/auth"
	"github.com/4cecoder/drip-campaign/database"
	"log"
	"net/http"
	"net/smtp"
	"strconv"

	"github.com/4cecoder/drip-campaign/models"
	"github.com/gin-gonic/gin"
)

// LoginHandler authenticates user credentials and generates a JWT token
// @Summary User login
// @Description Authenticate user credentials and generate a JWT token
// @Tags Auth
// @Accept json
// @Produce json
// @Param credentials body models.LoginRequest true "User credentials"
// @Success 200 {object} models.TokenResponse
// @Failure 400 {object} models.ErrorResponse
// @Failure 401 {object} models.ErrorResponse
// @Router /login [post]
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

	if user == nil || !models.CheckPasswordHash(loginReq.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	var token string
	if user.Role == "admin" {
		token, err = auth.GenerateAdminToken(user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate admin token"})
			return
		}
	} else {
		token, err = auth.GenerateToken(user)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

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
	if err := database.DB.Preload("EmailTemplate").Find(&steps).Error; err != nil {
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
	if err := database.DB.Preload("EmailTemplate").First(&step, id).Error; err != nil {
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
		log.Println("Error binding JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	log.Println("Received customer data:", customer)

	// Validate required fields
	if customer.Email == "" || customer.FirstName == "" || customer.LastName == "" {
		log.Println("Missing required fields")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email, FirstName, and LastName are required fields"})
		return
	}

	if err := database.DB.Create(&customer).Error; err != nil {
		log.Println("Error creating customer in database:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create customer"})
		return
	}

	log.Println("Customer created successfully:", customer)
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

// SendEmailHandler sends an email using Gmail SMTP with simple authentication
// @Summary Send an email
// @Description Send an email using Gmail SMTP with simple authentication
// @Tags Email
// @Accept json
// @Produce json
// @Param emailRequest body models.EmailRequest true "Email request data"
// @Success 200 {object} models.SuccessResponse
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /send-email [post]
func SendEmailHandler(c *gin.Context) {
	var emailRequest models.EmailRequest
	if err := c.ShouldBindJSON(&emailRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	to := emailRequest.To
	subject := emailRequest.Subject
	body := emailRequest.Body

	// Retrieve email settings from the database
	var settings models.Settings
	if err := database.DB.First(&settings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve email settings"})
		return
	}

	from := settings.GmailEmail
	password := settings.GmailPassword

	msg := []byte(fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s", from, to, subject, body))

	smtpServer := "smtp.gmail.com"
	smtpPort := "587"
	authEmail := smtp.PlainAuth("", from, password, smtpServer)

	err := smtp.SendMail(smtpServer+":"+smtpPort, authEmail, from, []string{to}, msg)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email sent successfully"})
}

// CreateEmailTemplateHandler creates a new email template
// @Summary Create an email template
// @Description Create a new email template
// @Tags EmailTemplates
// @Accept json
// @Produce json
// @Param emailTemplate body models.EmailTemplate true "Email template data"
// @Success 201 {object} models.EmailTemplate
// @Failure 400 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /email-templates [post]
func CreateEmailTemplateHandler(c *gin.Context) {
	var emailTemplate models.EmailTemplate
	if err := c.ShouldBindJSON(&emailTemplate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&emailTemplate).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create email template"})
		return
	}

	c.JSON(http.StatusCreated, emailTemplate)
}

// GetEmailTemplatesHandler retrieves all email templates
// @Summary Get all email templates
// @Description Retrieve all email templates
// @Tags EmailTemplates
// @Produce json
// @Success 200 {array} models.EmailTemplate
// @Failure 500 {object} models.ErrorResponse
// @Router /email-templates [get]
func GetEmailTemplatesHandler(c *gin.Context) {
	var emailTemplates []models.EmailTemplate
	if err := database.DB.Find(&emailTemplates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve email templates"})
		return
	}
	c.JSON(http.StatusOK, emailTemplates)

	// GetEmailTemplateHandler retrieves a specific email template by ID
	// @Summary Get an email template
	// @Description Retrieve a specific email template by ID
	// @Tags EmailTemplates
	// @Produce json
	// @Param id path int true "Email template ID"
	// @Success 200 {object} models.EmailTemplate
	// @Failure 404 {object} models.ErrorResponse
	// @Router /email-templates/{id} [get]
}
func GetEmailTemplateHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var emailTemplate models.EmailTemplate
	if err := database.DB.First(&emailTemplate, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Email template not found"})
		return
	}
	c.JSON(http.StatusOK, emailTemplate)
}

// UpdateEmailTemplateHandler updates a specific email template by ID
// @Summary Update an email template
// @Description Update a specific email template by ID
// @Tags EmailTemplates
// @Accept json
// @Produce json
// @Param id path int true "Email template ID"
// @Param emailTemplate body models.EmailTemplate true "Updated email template data"
// @Success 200 {object} models.EmailTemplate
// @Failure 400 {object} models.ErrorResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /email-templates/{id} [put]
func UpdateEmailTemplateHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var emailTemplate models.EmailTemplate
	if err := database.DB.First(&emailTemplate, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Email template not found"})
		return
	}

	if err := c.ShouldBindJSON(&emailTemplate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Save(&emailTemplate).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update email template"})
		return
	}

	c.JSON(http.StatusOK, emailTemplate)
}

// DeleteEmailTemplateHandler deletes a specific email template by ID
// @Summary Delete an email template
// @Description Delete a specific email template by ID
// @Tags EmailTemplates
// @Produce json
// @Param id path int true "Email template ID"
// @Success 200 {object} models.SuccessResponse
// @Failure 404 {object} models.ErrorResponse
// @Failure 500 {object} models.ErrorResponse
// @Router /email-templates/{id} [delete]
func DeleteEmailTemplateHandler(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var emailTemplate models.EmailTemplate
	if err := database.DB.First(&emailTemplate, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Email template not found"})
		return
	}

	if err := database.DB.Delete(&emailTemplate).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete email template"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Email template deleted successfully"})
}
