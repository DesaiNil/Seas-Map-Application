document.addEventListener("DOMContentLoaded", async function() {
  const urlParams = new URLSearchParams(window.location.search);
  const mapName = urlParams.get("mapName");
  const numPaths = parseInt(urlParams.get("numPaths"), 10);

  // If mapName missing, show an alert and redirect to create page
  if (!mapName) {
    alert("Map name missing. Please create a map first.");
    window.location.href = "create_map.html";
    return;
  }

  document.getElementById("mapTitle").textContent = mapName;
  const pathsContainer = document.getElementById("pathsContainer");

  // create input blocks
  const n = isNaN(numPaths) || numPaths < 1 ? 1 : numPaths;
  for (let i = 1; i <= n; i++) {
    const div = document.createElement("div");
    div.className = "path-block";
    div.innerHTML = `
      <label>Start Location ${i}:</label>
      <input type="text" id="start${i}" required>

      <label>End Location ${i}:</label>
      <input type="text" id="end${i}" required>

      <label>Distance ${i} (meters):</label>
      <div class="distance-input">
        <input type="number" id="distance${i}" min="1" required>
        <span class="unit">meters</span>
      </div>
      <hr/>
    `;
    pathsContainer.appendChild(div);
  }

  document.getElementById("pathsForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // collect input values
    let paths = [];
    for (let i = 1; i <= n; i++) {
      const startEl = document.getElementById(`start${i}`);
      const endEl = document.getElementById(`end${i}`);
      const distEl = document.getElementById(`distance${i}`);

      const start = startEl?.value.trim();
      const end = endEl?.value.trim();
      const distance = distEl ? parseInt(distEl.value.trim(), 10) : NaN;

      if (!start || !end || isNaN(distance) || distance <= 0) {
        alert("❌ Please enter valid path details for every path.");
        return;
      }

      paths.push({ start, end, distance });
    }

    try {
      const res = await fetch("http://localhost:5000/api/maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: mapName, paths })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error saving map.");
        return;
      }

      document.getElementById("saveMessage").style.display = "block";
      setTimeout(() => window.location.href = "index.html", 1200);
    } catch (err) {
      console.error(err);
      alert("Failed to save map. See console for details.");
    }
  });
});
