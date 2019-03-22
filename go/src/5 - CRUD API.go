package main

import (
	"fmt"

	"github.com/gin-contrib/cors" // Why do we need this package?
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error

type Person struct {
	ID        uint   `json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	UserName  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}
type Quiz struct {
	ID       uint   `json:"id"`
	QuizName string `json:"QuizName"`
}
type Question struct {
	ID           uint   `json:"id"`
	QuizID       string `json:"QuizId"`
	QuestionName string `json:"QuestionName"`
	Type         string `json:"Type"`
	Level        string `json:"Level"`
	Cat          string `json:"Cat"`
	A            string `json:"A"`
	B            string `json:"B"`
	C            string `json:"C"`
	D            string `json:"D"`
	OptionA      string `json:"OptionA`
	OptionB      string `json:"OptionB`
	OptionC      string `json:"OptionC`
	OptionD      string `json:"OptionD`
}
type Score struct {
	QuizId   string `json:"quizid"`
	QuizName string `json:"quizname"`
	Level    string `json:"level"`
	Player   string `json:"player"`
	Score    string `json:"score"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&Person{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Question{})
	db.AutoMigrate(&Score{})

	r := gin.Default()

	r.POST("/people", CreatePerson)
	r.GET("/people/", GetPeople) // Creating routes for each functionality
	r.DELETE("/people/:id", DeletePerson)
	r.GET("/people/:id", GetPerson)
	r.PUT("/people/:id", UpdatePerson)

	r.POST("/login", DoLogin)

	r.POST("/quiz", CreateQuiz)
	r.GET("/quiz/", GetQuiz)
	r.GET("/quizname/:id", GetQuizName)
	r.DELETE("/quiz/:id", DeleteQuiz)

	r.POST("/question", CreateQuestion)
	r.POST("/updatequestion/:id", UpdateQuestion)
	r.GET("/easyquestion/:QuizId", GetEasyQuestion)
	r.GET("/hardquestion/:QuizId", GetHardQuestion)
	r.GET("/question/:QuizId", GetQuestion)
	r.DELETE("/question/:id", DeleteQuestion)

	r.POST("/games", CreateScore)
	r.GET("/playerhistory/:name", GetPlayerHistory)

	r.GET("/leaderboard", CompleteLeaderboard)
	r.GET("/quizleaderboard/:id", QuizLeaderboard)
	r.GET("/quizeasyleaderboard/:id", QuizEasyLeaderboard)
	r.GET("/quizhardleaderboard/:id", QuizHardLeaderboard)
	r.GET("/levelleaderboard/:lvl", LevelLeaderboard)

	r.Use((cors.Default()))
	r.Run(":8080") // Run on port 8080
}

func DoLogin(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	if err := db.Where("email = ? AND password = ?", person.Email, person.Password).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	}
}
func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuiz(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz Quiz
	d := db.Where("id = ?", id).Delete(&quiz)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	d := db.Where("id = ?", id).Delete(&question)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
	var person Person
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&person)
	db.Save(&person)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, person)
}

func UpdateQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

func CreatePerson(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	if err := db.Where("email = ?", person.Email).First(&person).Error; err != nil {
		db.Create(&person)
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	} else {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
}
func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	c.BindJSON(&quiz)
	db.Create(&quiz)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, quiz)
}
func CreateQuestion(c *gin.Context) {
	var question Question
	c.BindJSON(&question)
	db.Create(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}
func CreateScore(c *gin.Context) {
	var score Score
	c.BindJSON(&score)
	db.Create(&score)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, score)
}
func GetPerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	}
}

func GetQuizName(c *gin.Context) {
	id := c.Params.ByName("id")
	var quiz []Quiz
	if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quiz)
	}
}

func GetPeople(c *gin.Context) {
	var people []Person
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, people)
	}
}
func GetQuiz(c *gin.Context) {
	var quiz []Quiz
	if err := db.Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, quiz)
	}
}
func GetEasyQuestion(c *gin.Context) {
	QuizId := c.Params.ByName("QuizId")
	var question []Question
	if err := db.Where("Level = ? AND quiz_id = ?", "0", QuizId).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
	}
}
func GetHardQuestion(c *gin.Context) {
	QuizId := c.Params.ByName("QuizId")
	var question []Question
	if err := db.Where("Level = ? AND quiz_id = ?", "1", QuizId).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
	}
}
func GetQuestion(c *gin.Context) {
	QuizId := c.Params.ByName("QuizId")
	var question []Question
	if err := db.Where("quiz_id = ?", QuizId).Find(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
		fmt.Println("error")
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
		fmt.Println("done")
	}
}
func GetPlayerHistory(c *gin.Context) {
	name := c.Params.ByName("name")
	var score []Score
	if err := db.Where("player = ?", name).Find(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
		fmt.Println("error")
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, score)
		fmt.Println("done")
	}
}
func CompleteLeaderboard(c *gin.Context) {
	var score []Score
	if err := db.Order("score desc").Find(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
		fmt.Println("error")
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, score)
		fmt.Println("done")
	}
}

func QuizLeaderboard(c *gin.Context) {
	id := c.Params.ByName("id")
	var score []Score
	if err := db.Where("quiz_id = ?", id).Order("score desc").Find(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
		fmt.Println("error")
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, score)
		fmt.Println("done")
	}
}
func QuizEasyLeaderboard(c *gin.Context) {
	id := c.Params.ByName("id")
	var score []Score
	if err := db.Where("quiz_id = ? AND level = ?", id, 0).Order("score desc").Find(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
		fmt.Println("error")
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, score)
		fmt.Println("done")
	}
}
func QuizHardLeaderboard(c *gin.Context) {
	id := c.Params.ByName("id")
	var score []Score
	if err := db.Where("quiz_id = ? AND level = ?", id, 0).Order("score desc").Find(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
		fmt.Println("error")
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, score)
		fmt.Println("done")
	}
}
func LevelLeaderboard(c *gin.Context) {
	lvl := c.Params.ByName("lvl")
	var score []Score
	if err := db.Where("level = ?", lvl).Order("score desc").Find(&score).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
		fmt.Println("error")
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, score)
		fmt.Println("done")
	}
}
