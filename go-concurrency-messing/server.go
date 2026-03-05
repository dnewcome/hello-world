package main

import (
	"net/http"
	"fmt"
	"time"
)

const timeout = 2

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r* http.Request) {
		time.Sleep(2 * time.Second)
		fmt.Println("working")
	})

	http.ListenAndServe(":8080", nil)
}

