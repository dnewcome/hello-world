# wasm-messing

A sandbox for experimenting with WebAssembly (WASM) via [Emscripten](https://emscripten.org/). Contains two demos written in C and compiled to WASM for the browser.

## Demos

### Hello World (`hello.c`)

A minimal C program that prints "Hello World" to stdout, compiled to WASM.

**Build:**
```sh
emcc hello.c -o hello.html
```

### SDL Noise (`sdl-noise.c`)

A 512x512 canvas that fills with random pixel noise at 60fps using SDL. Demonstrates using Emscripten's main loop integration with SDL.

**Build:**
```sh
emcc sdl-noise.c -s USE_SDL=1 -o sdl.html
```

## Running

Emscripten-generated HTML files must be served over HTTP (not opened directly as `file://`). Use any local static file server, for example:

```sh
python3 -m http.server
```

Then open `http://localhost:8000/hello.html` or `http://localhost:8000/sdl.html`.

## Prerequisites

- [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html)
