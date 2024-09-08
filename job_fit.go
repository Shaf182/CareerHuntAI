package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "strings"
)

type JobDescription struct {
    Description string `json:"description"`
}

type FitScoreResponse struct {
    FitScore int `json:"fitScore"`
}

var keywords = []string{"Python", "JavaScript", "React", "Node.js", "SQL"}

func calculateFitScore(description string) int {
    score := 0
    for _, keyword := range keywords {
        if strings.Contains(strings.ToLower(description), strings.ToLower(keyword)) {
            score += 20  
        }
    }
    if score > 100 {
        score = 100
    }
    return score
}

func jobFitHandler(w http.ResponseWriter, r *http.Request) {
    var jobDesc JobDescription
    err := json.NewDecoder(r.Body).Decode(&jobDesc)
    if err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    fitScore := calculateFitScore(jobDesc.Description)

    response := FitScoreResponse{FitScore: fitScore}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func main() {
    http.HandleFunc("/job-fit", jobFitHandler)

    fmt.Println("Go Job-Fit service running on port 8080...")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
