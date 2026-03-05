package main

import (
	rt "github.com/mattrtaylor/go-rtmidi"	
	"log"
)

func ExampleMIDIIn_Message() {
	in, err := rt.NewMIDIInDefault()
	if err != nil {
		log.Fatal(err)
	}
	defer in.Destroy()
	if err := in.OpenPort(0, "RtMidi"); err != nil {
		log.Fatal(err)
	}
	defer in.Close()

	for {
		m, t, err := in.Message()
		if len(m) > 0 {
			log.Println(m, t, err)
		}
	}
}

func main() {
	for _, api := range rt.CompiledAPI() {
		log.Println("Compiled API: ", api)
	}

	ExampleMIDIIn_Message()
}
