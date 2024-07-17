package models

import (
	"time"
)

type Model struct {
	ID        uint       `gorm:"primary_key"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `sql:"index" json:"deleted_at"`
}

type DripCampaign struct {
	Model
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	StartDate   time.Time `json:"start_date"`
	EndDate     time.Time `json:"end_date"`
	Stages      []Stage   `json:"stages" gorm:"foreignkey:CampaignID"`
}

type Stage struct {
	Model
	CampaignID  uint   `json:"campaign_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Order       int    `json:"order"`
	Steps       []Step `json:"steps" gorm:"foreignkey:StageID"`
}

type Step struct {
	Model
	StageID         uint           `json:"stage_id"`
	Name            string         `json:"name"`
	Description     string         `json:"description"`
	EmailTemplateID uint           `json:"email_template_id"`
	EmailTemplate   *EmailTemplate `json:"email_template,omitempty" gorm:"foreignkey:EmailTemplateID"`
	WaitTime        int            `json:"wait_time"`
}

type Customer struct {
	Model
	Email         string `json:"email"`
	FirstName     string `json:"first_name"`
	LastName      string `json:"last_name"`
	Phone         string `json:"phone" gorm:"default:null"`
	Company       string `json:"company" gorm:"default:null"`
	Address       string `json:"address" gorm:"default:null"`
	City          string `json:"city" gorm:"default:null"`
	State         string `json:"state" gorm:"default:null"`
	Country       string `json:"country" gorm:"default:null"`
	PostalCode    string `json:"postal_code" gorm:"default:null"`
	Notes         string `json:"notes" gorm:"default:null"`
	Tags          string `json:"tags" gorm:"default:null"`
	EmailVerified bool   `json:"email_verified" gorm:"default:false"`
	Subscribed    bool   `json:"subscribed" gorm:"default:false"`
	LastContacted string `json:"last_contacted" gorm:"default:null"`
	LeadSource    string `json:"lead_source" gorm:"default:null"`
	LeadStatus    string `json:"lead_status" gorm:"default:null"`
	CreatedBy     uint   `json:"created_by"`
	AssignedTo    uint   `json:"assigned_to"`
}

type CampaignCustomer struct {
	Model
	CampaignID uint      `json:"campaign_id"`
	CustomerID uint      `json:"customer_id"`
	Status     string    `json:"status"`
	StartDate  time.Time `json:"start_date"`
	EndDate    time.Time `json:"end_date"`
	Subscribed bool      `json:"subscribed" gorm:"default:false"`
}

type EmailTemplate struct {
	Model
	Name        string `json:"name"`
	Subject     string `json:"subject"`
	Body        string `json:"body"`
	ContentType string `json:"content_type" description:"Specifies the content type of the email body. Valid values are 'text/plain' for plain text emails and 'text/html' for HTML emails."`
}

type EmailLog struct {
	Model
	CampaignID      uint      `json:"campaign_id"`
	CustomerID      uint      `json:"customer_id"`
	EmailTemplateID uint      `json:"email_template_id"`
	Subject         string    `json:"subject"`
	Body            string    `json:"body"`
	SentAt          time.Time `json:"sent_at"`
	Status          string    `json:"status"`
}

type Settings struct {
	Model
	UserID              uint   `json:"user_id"`
	CRMAPIKey           string `json:"crm_api_key"`
	GmailEmail          string `json:"gmail_email"`
	GmailPassword       string `json:"gmail_password"`
	EmailPollingSeconds int    `json:"email_polling_seconds"`
}

type TokenResponse struct {
	Token string `json:"token"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

type SuccessResponse struct {
	Message string `json:"message"`
}

type EmailRequest struct {
	To      string `json:"to"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
}
