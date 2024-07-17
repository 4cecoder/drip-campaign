package models

import (
	"crypto/rand"
	"encoding/base64"
	"github.com/4cecoder/drip-campaign/database"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"log"
	"strings"
)

const AdminRole = "admin"
const UserRole = "user"

type User struct {
	Model
	Email    string `gorm:"unique;not null"`
	Password string `gorm:"not null"`
	Role     string `gorm:"not null"`
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
