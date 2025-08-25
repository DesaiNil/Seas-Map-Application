# SEASMap

**SEASMap** is a full-stack project using **Node.js, Express, and MongoDB** that allows users to create, store, and navigate maps. Users can define nodes and weighted paths, and the backend provides a shortest-path navigation endpoint using **Dijkstra’s algorithm**. A minimal static frontend is included for interacting with the backend API.

---

## Project Overview

SEASMap allows users to:
- Create and manage named maps consisting of nodes and weighted paths.
- Find the shortest path between two nodes on a saved map.
- Store maps persistently in MongoDB.
- Interact via a simple static frontend.

---

## Functionality

- **Map Management:** Create, view, and delete maps with nodes and paths.
- **Shortest Path Calculation:** Compute the shortest path between two nodes using Dijkstra’s algorithm.
- **Frontend Interaction:** Minimal static frontend pages that call backend APIs.
- **Data Persistence:** Maps and paths stored in MongoDB using Mongoose schemas.

---

## Project Structure

### Backend (`backend/`)
- `server.js` — Express server entry point
- `routes/maps.js` — API routes for map creation, retrieval, navigation
- `models/map.js` — Mongoose schema for storing maps

### Frontend (`frontend/`)
- `index.html` — Main landing page
- `create_map.html` — Form to create a new map
- `navigate.html` — Interface to find shortest paths
- `manage.html` — Manage and view existing maps

### Root
- `README.md` — this file

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** HTML, CSS, plain JavaScript
- **Algorithm:** Dijkstra for shortest path

---

## Installation & Run (Windows)

1. Open terminal in the backend directory:  
   ```powershell
   cd "c:\Users\nilde\OneDrive\Desktop\SEAS FULL STACK\backend"
   npm install
