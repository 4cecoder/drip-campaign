package models

import (
	"crypto/rand"
	"encoding/base64"
	"github.com/4cecoder/drip-campaign/database"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"log"
	"strings"
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
	Email     string `json:"email"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Phone     string `json:"phone"`
}

type CampaignCustomer struct {
	Model
	CampaignID uint      `json:"campaign_id"`
	CustomerID uint      `json:"customer_id"`
	Status     string    `json:"status"`
	StartDate  time.Time `json:"start_date"`
	EndDate    time.Time `json:"end_date"`
	Subscribed bool      `json:"subscribed"` // Added field to track subscription status
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

type User struct {
	Model
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	hashedPassword, err := HashPassword(u.Password)
	if err != nil {
		return err
	}
	u.Password = hashedPassword
	return nil
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type LoginUser struct {
	Email string `json:"email"`
	Role  string `json:"role"`
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

// GetUserByEmail retrieves a user from the database based on the provided email
func GetUserByEmail(email string) (*User, error) {
	var user User
	if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil // User not found
		}
		return nil, err // Other database error
	}
	return &user, nil
}

func HashPassword(password string) (string, error) {
	salt := GenerateSalt()
	truncatedPassword := password
	if len(password) > 72 {
		truncatedPassword = password[:72]
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(truncatedPassword+salt), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword) + ":" + salt, nil
}

func CheckPasswordHash(password, hashedPassword string) bool {
	parts := strings.Split(hashedPassword, ":")
	if len(parts) != 2 {
		return false
	}
	truncatedPassword := password
	if len(password) > 72 {
		truncatedPassword = password[:72]
	}
	err := bcrypt.CompareHashAndPassword([]byte(parts[0]), []byte(truncatedPassword+parts[1]))
	return err == nil
}

func GenerateSalt() string {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		log.Fatal(err)
	}
	return base64.StdEncoding.EncodeToString(salt)
}

type EmailRequest struct {
	To      string `json:"to"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
}
