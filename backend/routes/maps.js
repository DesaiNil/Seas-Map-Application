const express = require('express');
const router = express.Router();
const Map = require('../models/map.js');

// Create map
router.post('/', async (req, res) => {
  console.log("post /");
  try {
    const { name, paths } = req.body;
    if (!name) return res.status(400).json({ message: 'Map name is required' });

    const existing = await Map.findOne({ name });
    if (existing) return res.status(400).json({ message: `Map "${name}" already exists` });

    const m = new Map({ name, paths: paths || [] });
    await m.save();
    res.status(201).json({ message: 'Map saved successfully', map: m });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// List all maps
router.get('/', async (req, res) => {
  try {
    const maps = await Map.find({}, { name: 1, paths: 1 }).sort({ name: 1 });
    res.json(maps);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/navigate', async (req, res) => {

  console.log(req.body);

  try {
    const { mapName, start, end } = req.body;

     console.log(mapName+" "+ start +" " + end);

    if (!mapName || !start || !end) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    const mapDoc = await Map.findOne({ name: mapName });
    if (!mapDoc) {
      return res.status(404).json({ message: `Map "${mapName}" not found` });
    }

    // Build graph
    const graph = {};
    
    for (const { start: s, end: e, distance } of mapDoc.paths) {
      if (!graph[s]) graph[s] = [];
      if (!graph[e]) graph[e] = [];
      graph[s].push({ node: e, distance: Number(distance) });
      graph[e].push({ node: s, distance: Number(distance) });
    }

    // Dijkstra
    const distances = {};
    const prev = {};
    const pq = [];

    for (const node of Object.keys(graph)) {
      distances[node] = Infinity;
      prev[node] = null;
    }
    
    distances[start] = 0;
    pq.push({ node: start, dist: 0 });

    while (pq.length) {
      pq.sort((a, b) => a.dist - b.dist);
      const { node } = pq.shift();

      if (node === end) break;

      for (const neighbor of graph[node] || []) {
        const alt = distances[node] + neighbor.distance;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          prev[neighbor.node] = node;
          pq.push({ node: neighbor.node, dist: alt });
        }
      }
    }

    if (distances[end] === Infinity) {
      return res.status(404).json({ message: 'No path found' });
    }

    // Rebuild path
    const path = [];
    let u = end;
    while (u) {
      path.unshift(u);
      u = prev[u];
    }

    res.json({ distance: distances[end], path });

  } catch (err) {
    console.error("Navigation error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
