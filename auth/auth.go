package auth

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/4cecoder/drip-campaign/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

var jwtKey = []byte("your-secret-key")

func GenerateToken(user *models.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   user.ID,
		"role": "user",
	})
	return token.SignedString(jwtKey)
}

func GenerateAdminToken(user *models.User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   user.ID,
		"role": "admin",
	})
	return token.SignedString(jwtKey)
}

func VerifyToken(c *gin.Context) (string, error) {
	tokenString := ExtractToken(c)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("invalid signing method")
		}
		return jwtKey, nil
	})
	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return "", fmt.Errorf("invalid token")
	}

	role, ok := claims["role"].(string)
	if !ok {
		return "", fmt.Errorf("invalid role")
	}

	return role, nil
}

func ExtractToken(c *gin.Context) string {
	bearerToken := c.GetHeader("Authorization")
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}

func AdminAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		role, err := VerifyToken(c)
		if err != nil || role != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}

func UserAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		role, err := VerifyToken(c)
		if err != nil || role != "user" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}
