
document.addEventListener('DOMContentLoaded', async () => {
  const listEl = document.getElementById('mapsList');

  async function loadMaps() {
    try {
      const res = await fetch('http://localhost:5000/api/maps');
      if (!res.ok) throw new Error('Failed to fetch maps');
      const maps = await res.json();
      if (!maps.length) {
        listEl.innerHTML = '<p>No maps found. Create one from Home.</p>';
        return;
      }
      listEl.innerHTML = '';
      const ul = document.createElement('ul');
      maps.forEach(m => {
        const li = document.createElement('li');
        li.style.marginBottom = '12px';
        const nameSpan = document.createElement('strong');
        nameSpan.textContent = m.name;
        const info = document.createElement('span');
        info.textContent = ` — ${m.paths.length} paths `;
        const btnView = document.createElement('button');
        btnView.textContent = 'View / Navigate';
        btnView.onclick = () => { window.location.href = `navigate.html?mapName=${encodeURIComponent(m.name)}`; };

        btnView.style.marginLeft = '8px';

        li.appendChild(nameSpan);
        li.appendChild(info);
        li.appendChild(btnView);
        ul.appendChild(li);
      });
      listEl.appendChild(ul);
    } catch (err) {
      listEl.innerHTML = `<p>Error loading maps: ${err.message}</p>`;
    }
  }

  await loadMaps();
});
