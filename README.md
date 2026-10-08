# 💧 JalaMitra – Smart Water and Drainage Monitoring System
> **Community Service Project (CSP)**  
> *"Clean Water. Healthy Communities. Smarter Solutions."*

![JalaMitra Theme](https://img.shields.io/badge/Theme-Water%20%26%20Environment-0077b6?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed%20Prototype-10b981?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS%20%7C%20GIS-00b4d8?style=for-the-badge)

---

## 📌 Project Overview

**JalaMitra** is a modern, responsive web application and digital portal designed to solve water distribution and drainage management challenges in rural and semi-urban communities. 

The system empowers citizens to instantly report water shortages, pipe leakages, contaminated tap water, blocked drains, and stagnant water pools while providing municipal administrators with a centralized **GIS Community Map** and **Analytics Dashboard** to track, assign, and resolve community grievances efficiently.

---

## 🌟 Key Features & Core Modules

The application comprises **10 distinct interactive pages/modules**:

1. **🏠 Home Page**
   - JalaMitra animated water droplet logo & emblem
   - Official Tagline: *"Clean Water. Healthy Communities. Smarter Solutions."*
   - Direct action buttons: **Get Started** & **Report Problem**
   - Live metrics ticker (Resolved issues, Active Wards, Response time) and feature overview cards.

2. **📊 Resident Dashboard**
   - Real-time **Water Supply Status** (Tap & Tanker distribution schedules)
   - **Drainage Health Index** for locality wards
   - **My Complaints** summary list with live status badges
   - Community maintenance alert announcements
   - Composite **Community Health Risk Level** indicator.

3. **💧 Water Supply Monitoring**
   - Active availability status badge (Available / Intermittent / Unavailable)
   - Main village reservoir capacity meter (e.g. 78% capacity)
   - Source selector (**Municipal Tap**, **Borewell**, **Emergency Tanker**)
   - Daily supply timing schedule countdown timer
   - Quick report triggers for irregular supply & water quality/contamination complaints.

4. **🌊 Drainage & Sanitation**
   - Categorized issue reporting: **Blocked Drain**, **Drain Overflow**, **Stagnant Water**
   - Ward-wise drain cleaning operation schedule
   - Photo uploader with instant visual check
   - Vector breeding risk warnings.

5. **📝 Report Problem (Citizen Reporting)**
   - Category dropdown (Water Supply vs Drainage & Sewage)
   - Severity level picker (**Low**, **Medium**, **Critical / Urgent**)
   - Detailed description input with quick preset tag chips + Voice input simulation
   - Photo upload zone supporting camera capture & image file preview
   - Location input with one-click **GPS Auto-Locate** pin button
   - Submit report trigger generating a unique **Complaint ID** (e.g., `JM-2026-8942`) with celebration confetti.

6. **🔍 Complaint Tracking**
   - Real-time search bar by Complaint ID
   - 3-Stage Progress Timeline Stepper (**Submitted ➔ In Progress ➔ Resolved**)
   - Assigned field technician contact card
   - Estimated completion time & resolution verification feedback prompt.

7. **🗺️ GIS Community Map**
   - Leaflet.js interactive map centered on the township/ward district
   - Geotagged color-coded markers for **Water Problems (Blue)**, **Blocked Drains (Amber)**, **Stagnant Water (Red)**, and **Monsoon Flood-Risk Overlays**
   - Clickable popups with issue details, photo previews, and one-click tracking.

8. **🛡️ Admin Dashboard (Municipal Portal)**
   - High-level metric counters: Total Complaints, Water Issues, Drainage Issues, Pending, and Resolved
   - Interactive Chart.js Donut & Bar charts displaying category distribution and resolution velocity
   - Live **Admin Management Table** to update complaint lifecycle states (*Submitted ➔ In Progress ➔ Resolved*) in real time!

9. **🏥 Health & Environment Advisory**
   - **Mosquito Breeding Risk Index** (Dengue & Malaria prevention score)
   - **Water Contamination Risk Meter** (TDS & Chlorine residual scores)
   - **Flooding Vulnerability Meter**
   - Actionable community health & safety guidelines.

10. **⭐ Citizen Feedback**
    - Interactive 1–5 Star Rating System with dynamic emoji labels
    - Water Supply & Drainage Satisfaction Sliders (1–100%)
    - Text feedback & improvement suggestion box.

---

## 🔁 Complete Main Workflow

```
[Resident] ➔ [Report Problem] ➔ [Photo + GPS Location] ➔ [Submit Report]
                                                               📊
[Resident Gives Feedback] ⬅️ [Problem Resolved] ⬅️ [Admin Receives & Assigns]
```

---

## 🚀 Getting Started & How to Run

No installation, build tools, or server setup required!

1. Clone or download this project repository to your computer.
2. Navigate to the project directory:
   ```
   c:\Users\srihi\OneDrive\Desktop\csp project
   ```
3. Open `index.html` directly in any web browser:
   - **Windows**: Double-click `index.html` or right-click and select **Open with ➔ Google Chrome / Microsoft Edge**.
   - Or open your browser and press `Ctrl + O` to open the `index.html` file.

---

## 🛠️ Technology Stack

- **Frontend Core**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox/Grid, Glassmorphism, Dark Mode), JavaScript (ES6+)
- **Icons**: Lucide Icons CDN (`https://unpkg.com/lucide@latest`)
- **Interactive Mapping**: Leaflet.js (`https://unpkg.com/leaflet@1.9.4/`)
- **Analytics & Charts**: Chart.js (`https://cdn.jsdelivr.net/npm/chart.js`)
- **Effects**: Canvas Confetti (`https://cdn.jsdelivr.net/npm/canvas-confetti`)
- **Typography**: Google Fonts (*Outfit* & *Plus Jakarta Sans*)

---

## 📁 Project Directory Structure

```text
csp project/
├── index.html       # Single-Page Application (SPA) structure with all 10 page views
├── styles.css       # Custom design system, water-eco theme, dark mode, phone frame styling
├── app.js           # State management, map plotting, chart rendering & complaint lifecycle logic
└── README.md        # Comprehensive project documentation
```

---

## 🔮 Future Scope & Enhancements

1. **IoT Sensor Integration**: Connecting ultrasonic water level sensors in overhead tanks and flow meters in drainage pipelines.
2. **AI Image Quality Check**: Automated machine learning model to verify blocked drain photos before technician dispatch.
3. **SMS & WhatsApp Alerts**: Integration with Twilio/Fast2SMS to send offline SMS alerts to citizens in low-network rural areas.
4. **Offline PWA Support**: Progressive Web App capabilities for offline report drafting.

---

## 🤝 Authors & Acknowledgments

- **Project Title**: JalaMitra – Smart Water and Drainage Monitoring System
- **Domain**: Community Service Project (CSP)
- **Built for**: Rural and Semi-Urban Community Development & Municipal Water Management.
