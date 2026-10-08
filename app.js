/* JalaMitra - Smart Water and Drainage Monitoring System */
/* JavaScript Application Logic & State Controller */

// Global State
let currentPage = 'home';
let isPhoneMode = false;
let currentRole = 'Resident View'; // 'Resident View' or 'Admin View'
let selectedSeverity = 'Low';
let selectedStarRating = 4;
let mapInstance = null;
let categoryChartInstance = null;
let velocityChartInstance = null;
let uploadedPhotoData = null;

// Initial Dataset (Pre-populated Realistic Complaints)
let complaintsData = [
  {
    id: 'JM-2026-8942',
    category: 'Drainage',
    type: 'Blocked Drain',
    severity: 'Medium',
    description: 'Main drainage choked with plastic waste near shop #14',
    location: 'Ward 2, Main Market',
    ward: 'Ward 2',
    status: 'In Progress',
    date: '2026-10-08 08:30 AM',
    officer: 'Ramesh Kumar (Sanitation Crew)',
    estTime: 'Today, 04:00 PM',
    photo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400',
    lat: 17.3850,
    lng: 78.4867
  },
  {
    id: 'JM-2026-8941',
    category: 'Water Supply',
    type: 'No Water Supply',
    severity: 'Critical',
    description: 'Tap supply completely stopped since morning 6 AM',
    location: 'Ward 1, Temple Street',
    ward: 'Ward 1',
    status: 'Submitted',
    date: '2026-10-08 09:15 AM',
    officer: 'Suresh Singh (Water Dept)',
    estTime: 'Tomorrow, 10:00 AM',
    photo: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400',
    lat: 17.3890,
    lng: 78.4890
  },
  {
    id: 'JM-2026-8940',
    category: 'Drainage',
    type: 'Stagnant Water Pool',
    severity: 'Medium',
    description: 'Rainwater accumulated near primary school gate',
    location: 'Ward 3, School Road',
    ward: 'Ward 3',
    status: 'Resolved',
    date: '2026-10-07 02:45 PM',
    officer: 'Anil Reddy (Health Dept)',
    estTime: 'Completed 2026-10-07 06:00 PM',
    photo: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=400',
    lat: 17.3810,
    lng: 78.4820
  },
  {
    id: 'JM-2026-8939',
    category: 'Water Supply',
    type: 'Pipeline Leakage',
    severity: 'Low',
    description: 'Minor water seepage from pipe joiner near bus stop',
    location: 'Ward 4, Highway Junction',
    ward: 'Ward 4',
    status: 'Submitted',
    date: '2026-10-08 07:00 AM',
    officer: 'Prakash Rao (Pipe Maintenance)',
    estTime: '2026-10-09 12:00 PM',
    photo: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
    lat: 17.3830,
    lng: 78.4910
  }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderMyComplaints();
  updateAdminMetrics();
  initStarRating();
});

// Navigation Controller
function navigateTo(pageId) {
  currentPage = pageId;

  // Update Page Visibility
  document.querySelectorAll('.page-view').forEach(page => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update Sidebar & Bottom Nav Active State
  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(item => {
    if (item.getAttribute('data-page') === pageId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Re-trigger Page Specific Plugins
  if (pageId === 'map') {
    setTimeout(initMap, 200);
  } else if (pageId === 'admin') {
    setTimeout(initAdminCharts, 200);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle Viewport Frame (Phone vs Desktop Full Width)
function toggleViewMode() {
  const wrapper = document.getElementById('viewportWrapper');
  const btnText = document.getElementById('viewModeText');
  isPhoneMode = !isPhoneMode;

  if (isPhoneMode) {
    wrapper.classList.remove('full-mode');
    wrapper.classList.add('phone-mode');
    btnText.innerText = 'Full View';
  } else {
    wrapper.classList.remove('phone-mode');
    wrapper.classList.add('full-mode');
    btnText.innerText = 'Phone Frame';
  }

  if (currentPage === 'map' && mapInstance) {
    setTimeout(() => mapInstance.invalidateSize(), 300);
  }
}

// Dark/Light Theme Switcher
function toggleTheme() {
  const htmlEl = document.documentElement;
  const currentTheme = htmlEl.getAttribute('data-theme');
  const themeIcon = document.getElementById('themeIcon');

  if (currentTheme === 'dark') {
    htmlEl.setAttribute('data-theme', 'light');
    themeIcon.setAttribute('data-lucide', 'moon');
  } else {
    htmlEl.setAttribute('data-theme', 'dark');
    themeIcon.setAttribute('data-lucide', 'sun');
  }
  lucide.createIcons();
}

// Multi-Language Switcher Simulation
function changeLanguage(lang) {
  const notifications = {
    en: "Language set to English",
    hi: "भाषा बदलकर हिन्दी की गई",
    te: "భాష తెలుగుకి మార్చబడింది",
    kn: "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ"
  };
  alert(notifications[lang] || notifications.en);
}

// Water Source Selection (Page 3)
function selectWaterSource(source, element) {
  document.querySelectorAll('.source-card').forEach(c => c.classList.remove('active'));
  element.classList.add('active');
  const textMap = {
    tap: "Municipal Tap Water Active (Ward 2)",
    borewell: "Borewell #2 Switched to Active",
    tanker: "Emergency Water Tanker Dispatched to Ward 2"
  };
  alert(textMap[source]);
}

// Quick Water Issue Reporting Trigger
function reportWaterIssue(issueType) {
  navigateTo('report');
  const select = document.getElementById('problemType');
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].text.includes(issueType)) {
      select.selectedIndex = i;
      break;
    }
  }
}

// Quick Drainage Issue Reporting Trigger
function reportDrainageIssue(issueType) {
  navigateTo('report');
  const select = document.getElementById('problemType');
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].text.includes(issueType)) {
      select.selectedIndex = i;
      break;
    }
  }
}

// Report Form Severity Switcher
function setSeverity(level, btn) {
  selectedSeverity = level;
  document.querySelectorAll('.severity-btn').forEach(b => b.classList.remove('active', 'btn-primary'));
  btn.classList.add('active', 'btn-primary');
}

// Quick Text Chips Adder
function addChipText(text) {
  const textarea = document.getElementById('issueDescription');
  if (textarea.value) {
    textarea.value += ' ' + text;
  } else {
    textarea.value = text;
  }
}

// Photo Upload Handler
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedPhotoData = e.target.result;
      const img = document.getElementById('photoPreview');
      img.src = uploadedPhotoData;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

// Detect GPS Location Mock
function detectGPSLocation() {
  const coordsText = document.getElementById('gpsCoordsText');
  coordsText.innerText = "17.3854° N, 78.4871° E (GPS Locked)";
  document.getElementById('locationInput').value = "Ward 2, Temple Road (Detected GPS)";
}

// Form Submission Handler (Main Workflow Trigger!)
function handleFormSubmit(e) {
  e.preventDefault();

  const type = document.getElementById('problemType').value;
  const description = document.getElementById('issueDescription').value;
  const location = document.getElementById('locationInput').value;

  if (!type || !description || !location) {
    alert("Please fill in all required fields.");
    return;
  }

  // Determine Category
  const category = (type.includes('Water') || type.includes('Pressure') || type.includes('Leakage')) ? 'Water Supply' : 'Drainage';
  
  // Generate Unique Complaint ID
  const newID = `JM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const newComplaint = {
    id: newID,
    category: category,
    type: type,
    severity: selectedSeverity,
    description: description,
    location: location,
    ward: location.includes('Ward') ? location.split(',')[0] : 'Ward 2',
    status: 'Submitted',
    date: new Date().toLocaleString(),
    officer: 'Pending Assignment',
    estTime: 'Within 24 Hours',
    photo: uploadedPhotoData || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=400',
    lat: 17.3850 + (Math.random() - 0.5) * 0.01,
    lng: 78.4867 + (Math.random() - 0.5) * 0.01
  };

  // Push to Dataset
  complaintsData.unshift(newComplaint);

  // Trigger Confetti Celebration 🎉
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Open Success Modal
  document.getElementById('modalComplaintID').innerText = newID;
  document.getElementById('successModal').classList.add('active');

  // Reset Form
  document.getElementById('reportForm').reset();
  document.getElementById('photoPreview').style.display = 'none';
  uploadedPhotoData = null;

  // Sync Resident & Admin Views
  renderMyComplaints();
  updateAdminMetrics();
}

// Modal Actions
function closeModal() {
  document.getElementById('successModal').classList.remove('active');
}

function closeModalAndTrack() {
  closeModal();
  navigateTo('tracking');
  const latestID = complaintsData[0].id;
  document.getElementById('trackSearchInput').value = latestID;
  searchTrackComplaint();
}

// Render My Complaints in Resident Dashboard
function renderMyComplaints() {
  const container = document.getElementById('myComplaintsList');
  if (!container) return;

  if (complaintsData.length === 0) {
    container.innerHTML = `<div style="font-size:0.85rem; color:var(--text-muted); padding:1rem; text-align:center;">No complaints filed yet.</div>`;
    return;
  }

  let html = '';
  complaintsData.slice(0, 3).forEach(c => {
    let badgeClass = 'badge-info';
    if (c.status === 'In Progress') badgeClass = 'badge-warning';
    if (c.status === 'Resolved') badgeClass = 'badge-success';

    html += `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:0.65rem 0; border-bottom:1px solid var(--border-color);" onclick="trackSpecificID('${c.id}')">
        <div>
          <div style="font-weight:700; font-size:0.85rem;">${c.id} - ${c.type}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${c.location} • ${c.date}</div>
        </div>
        <span class="badge ${badgeClass}">${c.status}</span>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Track Specific ID
function trackSpecificID(id) {
  navigateTo('tracking');
  document.getElementById('trackSearchInput').value = id;
  searchTrackComplaint();
}

// Search and Render Tracking Page details
function searchTrackComplaint() {
  const query = document.getElementById('trackSearchInput').value.trim();
  const target = complaintsData.find(c => c.id.toLowerCase() === query.toLowerCase()) || complaintsData[0];

  if (!target) {
    alert("Complaint ID not found.");
    return;
  }

  document.getElementById('trackIDText').innerText = target.id;
  document.getElementById('trackDateText').innerText = `Reported: ${target.date}`;
  document.getElementById('trackProblemText').innerText = `${target.type} (${target.severity} Severity)`;
  document.getElementById('trackLocationText').innerText = target.location;
  document.getElementById('trackOfficerText').innerText = target.officer;
  document.getElementById('trackEstText').innerText = target.estTime;

  const badge = document.getElementById('trackStatusBadge');
  badge.innerText = target.status;
  if (target.status === 'Submitted') badge.className = 'badge badge-info';
  if (target.status === 'In Progress') badge.className = 'badge badge-warning';
  if (target.status === 'Resolved') badge.className = 'badge badge-success';

  // Update Stepper Pipeline UI
  const steps = document.querySelectorAll('.timeline-stepper .step-item');
  steps.forEach(s => s.className = 'step-item');

  if (target.status === 'Submitted') {
    steps[0].className = 'step-item active';
  } else if (target.status === 'In Progress') {
    steps[0].className = 'step-item completed';
    steps[1].className = 'step-item active';
  } else if (target.status === 'Resolved') {
    steps[0].className = 'step-item completed';
    steps[1].className = 'step-item completed';
    steps[2].className = 'step-item completed';
  }

  // Render Feedback Action Prompt if Resolved
  const actionBox = document.getElementById('resolutionActionBox');
  if (target.status === 'Resolved') {
    actionBox.innerHTML = `
      <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:1rem; border-radius:var(--radius-md); text-align:center;">
        <div style="font-weight:700; color:var(--eco-600); margin-bottom:0.4rem;">🎉 Problem Successfully Resolved!</div>
        <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.75rem;">Please take a moment to rate our field technician service.</p>
        <button class="btn btn-eco btn-sm" onclick="navigateTo('feedback')"><i data-lucide="star"></i> Give Feedback</button>
      </div>
    `;
    lucide.createIcons();
  } else {
    actionBox.innerHTML = '';
  }
}

// ── MY LOCATION: GPS + Reverse Geocoding ──────────────────────────────────
let myLocationMarker = null;

function showMyLocationOnMap() {
  const btn = document.getElementById('myLocationBtn');
  if (!navigator.geolocation) {
    alert('❌ Geolocation is not supported by your browser.');
    return;
  }

  btn.innerText = '⏳ Locating...';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      // Make sure map is initialized first
      if (!mapInstance) initMap();

      // Remove old "my location" marker if exists
      if (myLocationMarker) mapInstance.removeLayer(myLocationMarker);

      // Create a pulsing blue "You Are Here" marker
      const myIcon = L.divIcon({
        className: '',
        html: `
          <div style="position:relative; width:36px; height:36px;">
            <div style="
              position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
              width:36px; height:36px; border-radius:50%;
              background:rgba(0,180,216,0.18);
              animation:pulse 1.5s ease-out infinite;
            "></div>
            <div style="
              position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
              width:16px; height:16px; border-radius:50%;
              background:#0077b6; border:3px solid #fff;
              box-shadow:0 2px 8px rgba(0,119,182,0.6);
            "></div>
          </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
      });

      myLocationMarker = L.marker([lat, lng], { icon: myIcon, zIndexOffset: 9999 }).addTo(mapInstance);
      myLocationMarker.bindPopup(`
        <div style="text-align:center; padding:0.4rem;">
          <strong style="color:#0077b6;">📍 You Are Here</strong><br>
          <span style="font-size:0.78rem; color:#64748b;">${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E</span>
        </div>
      `).openPopup();

      // Fly to user's location smoothly
      mapInstance.flyTo([lat, lng], 15, { duration: 1.5 });

      // Show the info card while we load
      const card = document.getElementById('myLocationCard');
      card.style.display = 'block';
      document.getElementById('locCoords').innerText = `${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E`;

      // Update bottom bar
      document.getElementById('mapCenterLabel').innerHTML =
        `📍 Centered on <strong>Your Location</strong> &nbsp;|&nbsp; Zoom: 15x`;

      btn.innerText = '✅ Located!';
      btn.disabled = false;

      // ── Reverse Geocode via Nominatim (free, no API key) ──────────────
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        const addr = data.address || {};

        const village  = addr.village || addr.hamlet || addr.suburb || addr.neighbourhood || addr.town || '—';
        const city     = addr.city || addr.district || addr.county || addr.town || '—';
        const state    = addr.state || '—';
        const country  = addr.country || '—';

        document.getElementById('locVillage').innerText = village;
        document.getElementById('locCity').innerText    = city;
        document.getElementById('locState').innerText   = state;
        document.getElementById('locCountry').innerText = country;

        // Update marker popup with place name
        myLocationMarker.setPopupContent(`
          <div style="text-align:center; padding:0.4rem;">
            <strong style="color:#0077b6;">📍 You Are Here</strong><br>
            <div style="font-size:0.82rem; font-weight:600; margin:0.3rem 0;">${village !== '—' ? village + ', ' : ''}${city}</div>
            <span style="font-size:0.75rem; color:#64748b;">${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E</span>
          </div>
        `);
      } catch (err) {
        document.getElementById('locVillage').innerText = 'Could not fetch (check internet)';
      }
    },
    (err) => {
      btn.innerText = '📍 My Location';
      btn.disabled = false;
      const messages = {
        1: '❌ Location permission denied. Please allow location access in your browser.',
        2: '❌ Location unavailable. Try again.',
        3: '❌ Location request timed out.'
      };
      alert(messages[err.code] || '❌ Could not get your location.');
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
  );
}

// Leaflet Community Map Initialization
function initMap() {
  const mapEl = document.getElementById('communityMap');
  if (!mapEl) return;

  // If map already exists, just refresh size and markers
  if (mapInstance) {
    mapInstance.invalidateSize();
    plotMapMarkers('all');
    updateMapStats();
    return;
  }

  // Create map centered on Hyderabad
  mapInstance = L.map('communityMap', {
    center: [17.3850, 78.4867],
    zoom: 14,
    zoomControl: true,
    scrollWheelZoom: true
  });

  // CartoDB Voyager tiles — works from local file:// without 403 blocks
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    subdomains: 'abcd',
    attribution: '© <a href="https://carto.com/">CARTO</a> © <a href="https://openstreetmap.org">OpenStreetMap</a> | JalaMitra GIS 🌊'
  }).addTo(mapInstance);

  // Plot all markers initially
  plotMapMarkers('all');
  updateMapStats();
}

// Returns a colored custom divIcon based on complaint category/status
function getMarkerIcon(complaint) {
  let colorClass = 'marker-water';
  let emoji = '💧';

  if (complaint.status === 'Resolved') {
    colorClass = 'marker-resolved'; emoji = '✅';
  } else if (complaint.type.includes('Stagnant')) {
    colorClass = 'marker-stagnant'; emoji = '🔴';
  } else if (complaint.category === 'Drainage') {
    colorClass = 'marker-drain'; emoji = '🟠';
  }

  return L.divIcon({
    className: '',
    html: `<div class="custom-map-marker ${colorClass}"><div class="marker-inner">${emoji}</div></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34]
  });
}

// Get popup header color based on complaint
function getHeaderColor(complaint) {
  if (complaint.status === 'Resolved') return '#10b981';
  if (complaint.type.includes('Stagnant')) return '#ef4444';
  if (complaint.category === 'Drainage') return '#f59e0b';
  return '#0077b6';
}

// Build rich HTML popup
function buildPopupHTML(c) {
  const headerColor = getHeaderColor(c);
  const statusColors = {
    'Submitted': '#3b82f6',
    'In Progress': '#f59e0b',
    'Resolved': '#10b981'
  };
  const statusColor = statusColors[c.status] || '#64748b';

  return `
    <div class="map-popup-card">
      <div class="map-popup-header" style="background:${headerColor};">
        <span class="map-popup-id">${c.id}</span>
        <span class="map-popup-status" style="background:${statusColor}80;">${c.status}</span>
      </div>
      <div class="map-popup-body">
        <div class="map-popup-type">${c.type}</div>
        <div class="map-popup-location">📍 ${c.location}</div>
        <div class="map-popup-desc">${c.description}</div>
        <div class="map-popup-footer">
          <button class="map-popup-btn map-popup-btn-primary" onclick="trackSpecificID('${c.id}')">🔍 Track Issue</button>
          <button class="map-popup-btn map-popup-btn-secondary" onclick="navigateTo('report')">📝 Report New</button>
        </div>
      </div>
    </div>
  `;
}

// Plot Markers on Map with Category Filter
function plotMapMarkers(filter) {
  if (!mapInstance) return;

  // Clear all non-tile layers
  mapInstance.eachLayer(layer => {
    if (layer instanceof L.Marker || layer instanceof L.Polygon || layer instanceof L.Circle) {
      mapInstance.removeLayer(layer);
    }
  });

  // Flood Risk Overlay Polygon (Ward 4)
  if (filter === 'all' || filter === 'flood') {
    const floodZone = L.polygon([
      [17.3820, 78.4880],
      [17.3840, 78.4930],
      [17.3810, 78.4940]
    ], {
      color: '#ef4444',
      fillColor: '#ef4444',
      fillOpacity: 0.18,
      weight: 2,
      dashArray: '6 4'
    }).addTo(mapInstance);
    floodZone.bindPopup(`
      <div class="map-popup-card">
        <div class="map-popup-header" style="background:#ef4444;">
          <span class="map-popup-id">⚠️ FLOOD RISK ZONE</span>
          <span class="map-popup-status">Ward 4</span>
        </div>
        <div class="map-popup-body">
          <div class="map-popup-type">Monsoon Flood-Risk Area</div>
          <div class="map-popup-desc">Low-lying drainage bottleneck. High risk during heavy rainfall. Residents advised to report any waterlogging immediately.</div>
        </div>
      </div>
    `);
  }

  // Plot complaint markers
  complaintsData.forEach(c => {
    let show = false;
    if (filter === 'all') show = true;
    if (filter === 'water' && c.category === 'Water Supply') show = true;
    if (filter === 'blocked' && c.type.includes('Blocked')) show = true;
    if (filter === 'stagnant' && c.type.includes('Stagnant')) show = true;

    if (show) {
      const marker = L.marker([c.lat, c.lng], { icon: getMarkerIcon(c) }).addTo(mapInstance);
      marker.bindPopup(buildPopupHTML(c), {
        maxWidth: 260,
        className: 'leaflet-popup-custom'
      });
    }
  });
}

// Update stats counters on the map page
function updateMapStats() {
  const waterEl = document.getElementById('mapCountWater');
  const drainEl = document.getElementById('mapCountDrain');
  const stagnantEl = document.getElementById('mapCountStagnant');
  const resolvedEl = document.getElementById('mapCountResolved');

  if (waterEl) waterEl.innerText = complaintsData.filter(c => c.category === 'Water Supply').length;
  if (drainEl) drainEl.innerText = complaintsData.filter(c => c.type.includes('Blocked')).length;
  if (stagnantEl) stagnantEl.innerText = complaintsData.filter(c => c.type.includes('Stagnant')).length;
  if (resolvedEl) resolvedEl.innerText = complaintsData.filter(c => c.status === 'Resolved').length;
}

function filterMap(category, btn) {
  document.querySelectorAll('.map-filter-bar button').forEach(b => b.classList.remove('active', 'btn-primary'));
  btn.classList.add('active');
  plotMapMarkers(category);
}


// Update Admin Metrics Counters
function updateAdminMetrics() {
  const total = complaintsData.length;
  const water = complaintsData.filter(c => c.category === 'Water Supply').length;
  const drainage = complaintsData.filter(c => c.category === 'Drainage').length;
  const pending = complaintsData.filter(c => c.status !== 'Resolved').length;
  const resolved = complaintsData.filter(c => c.status === 'Resolved').length;

  document.getElementById('adminTotalCount').innerText = total;
  document.getElementById('adminWaterCount').innerText = water;
  document.getElementById('adminDrainageCount').innerText = drainage;
  document.getElementById('adminPendingCount').innerText = pending;
  document.getElementById('adminResolvedCount').innerText = resolved;

  // Stat ticker home page
  const homeResolved = document.getElementById('statResolvedCount');
  if (homeResolved) homeResolved.innerText = `${1420 + resolved}+`;

  renderAdminTable();
}

// Render Admin Control Table
function renderAdminTable() {
  const tbody = document.getElementById('adminTableBody');
  if (!tbody) return;

  let html = '';
  complaintsData.forEach(c => {
    html += `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td>${c.type}</td>
        <td>${c.location}</td>
        <td><span class="badge ${c.severity === 'Critical' ? 'badge-danger' : 'badge-info'}">${c.severity}</span></td>
        <td>
          <select class="form-select" style="padding:0.25rem 0.5rem; font-size:0.8rem;" onchange="updateComplaintStatus('${c.id}', this.value)">
            <option value="Submitted" ${c.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
            <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
          </select>
        </td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="trackSpecificID('${c.id}')">View</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Update Complaint Lifecycle Status from Admin Table
function updateComplaintStatus(id, newStatus) {
  const target = complaintsData.find(c => c.id === id);
  if (target) {
    target.status = newStatus;
    if (newStatus === 'Resolved') {
      target.estTime = `Resolved at ${new Date().toLocaleTimeString()}`;
    }
    updateAdminMetrics();
    renderMyComplaints();
    if (categoryChartInstance) initAdminCharts();
    alert(`Complaint ${id} status updated to: ${newStatus}`);
  }
}

// Chart.js Visualizations (Page 8)
function initAdminCharts() {
  const catCanvas = document.getElementById('categoryChart');
  const velCanvas = document.getElementById('velocityChart');

  if (!catCanvas || !velCanvas) return;

  if (categoryChartInstance) categoryChartInstance.destroy();
  if (velocityChartInstance) velocityChartInstance.destroy();

  const waterCount = complaintsData.filter(c => c.category === 'Water Supply').length;
  const drainCount = complaintsData.filter(c => c.category === 'Drainage').length;

  // Donut Chart
  categoryChartInstance = new Chart(catCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Water Supply', 'Drainage System'],
      datasets: [{
        data: [waterCount, drainCount],
        backgroundColor: ['#0077b6', '#10b981'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });

  // Bar Chart (Resolution Velocity)
  velocityChartInstance = new Chart(velCanvas, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Reported',
          data: [12, 19, 8, 15, 22, 10, complaintsData.length],
          backgroundColor: '#00b4d8'
        },
        {
          label: 'Resolved',
          data: [10, 15, 8, 14, 20, 9, complaintsData.filter(c => c.status === 'Resolved').length],
          backgroundColor: '#10b981'
        }
      ]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

// Star Rating Interactive Component (Page 10)
function initStarRating() {
  setStarRating(4);
}

function setStarRating(stars) {
  selectedStarRating = stars;
  const container = document.getElementById('starRatingBox');
  if (!container) return;

  const icons = container.querySelectorAll('i');
  const labels = ["Poor (1 Star)", "Fair (2 Stars)", "Good (3 Stars)", "Very Good (4 Stars)", "Excellent (5 Stars)!"];

  icons.forEach((icon, index) => {
    if (index < stars) {
      icon.classList.add('selected');
      icon.style.fill = '#f59e0b';
      icon.style.color = '#f59e0b';
    } else {
      icon.classList.remove('selected');
      icon.style.fill = 'none';
      icon.style.color = '#cbd5e1';
    }
  });

  document.getElementById('ratingLabelText').innerText = labels[stars - 1];
}

// Feedback Submission Handler
function handleFeedbackSubmit(e) {
  e.preventDefault();
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.6 }
  });
  alert("Thank you! Your community feedback has been recorded and submitted to the Ward Panchayat Administrator.");
  document.getElementById('feedbackForm').reset();
  setStarRating(5);
}
