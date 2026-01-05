document.addEventListener('DOMContentLoaded', function () {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  const map = L.map('map').setView(defaultCenter, defaultZoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);

  const loc = (mapEl.dataset.location || '').trim();
  const country = (mapEl.dataset.country || '').trim();
  const title = (mapEl.dataset.title || '').trim();

  const q = (loc && country) ? `${loc}, ${country}` : (loc || country);

  if (q && q.trim()) {
    fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(q), { headers: { 'User-Agent': 'wanderlust-demo/1.0 (your@email.example)' } })
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          map.setView([lat, lon], 12);
          L.marker([lat, lon]).addTo(map).bindPopup(title || 'Location').openPopup();
        } else {
          console.warn('No geocoding result for:', q);
        }
      })
      .catch(err => console.error('Geocoding error', err));
  }
});