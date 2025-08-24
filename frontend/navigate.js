document.getElementById('navigateForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // stop form refresh

  const mapName = document.getElementById('mapName').value.trim();
  const start = document.getElementById('startNode').value.trim();
  const end = document.getElementById('endNode').value.trim();

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ""; // clear old result

  if (!mapName || !start || !end) {
    resultDiv.innerHTML = "❌ Please fill in all fields.";
    return;
  }

  try {
    console.log(mapName+" "+ start +" " + end);
    // ?mapName=${mapName}&start=${start}&end=${end}
   const res = await fetch('http://localhost:5000/api/maps/navigate', {
  method: 'POST', // or 'GET' (but POST is better for sending data in body)
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mapName,
    start,
    end,
    }),
  });
    const data = await res.json();

    

    if (res.ok && data.path && data.path.length > 0) {
        const walkingTime = Math.round(data.distance / 75);
        const bikeCarTime = Math.round(data.distance / 325);
      resultDiv.innerHTML = `
        ✅ Shortest distance: <b>${data.distance} Meters</b><br>
        🛤️ Path: <b>${data.path.join(' → ')}</b>
        <p>🚶 <strong>Walking Time:</strong> ${walkingTime} minutes</p>
        <p>🚲 <strong>Bike/Car Time:</strong> ${bikeCarTime} minutes</p>
      `;

    } else {
      resultDiv.innerHTML = `❌ ${data.message || "No path found."}`;
    }
  } catch (err) {
    console.error("Error fetching shortest path:", err);
    resultDiv.innerHTML = "❌ Server error.";
  }
});
