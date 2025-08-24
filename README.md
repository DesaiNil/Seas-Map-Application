# SEASMap Navigation

Express + MongoDB project that stores named maps (nodes + weighted paths) and provides a shortest-path navigation endpoint (Dijkstra). Includes a minimal static frontend.

## Features
- Create, list and manage maps (name + paths)
- Find shortest path between two nodes on a saved map
- Static frontend (frontend/) that calls the backend API

## Requirements
- Node.js 
- npm
- MongoDB

## Project layout (important files)

- backend/
  - server.js — Express server entry
  - routes/maps.js — route definitions
  - models/map.js — Mongoose schema
- frontend/
  - index.html, create_map.html, navigate.html, manage.html
- README.md — this file


## Installation & run (Windows)

1. Open terminal in backend:

cd "c:\Users\nilde\OneDrive\Desktop\SEAS FULL STACK\backend"
npm install

2. Start server:

npm nodemon server.js

## API (examples)

Base: http://localhost:5000/api/maps

- List maps
  - GET /api/maps

- Create map
  - POST /api/maps
  - Body example:
    ```json
    {
      "name": "Campus",
      "paths": [
        { "start": "A", "end": "B", "distance": 10 },
        { "start": "B", "end": "C", "distance": 5 }
      ]
    }
    ```

- Find shortest path
  - POST /api/maps/navigate
  - Body example:
    ```json
    {
      "mapName": "Campus",
      "start": "A",
      "end": "C"
    }

