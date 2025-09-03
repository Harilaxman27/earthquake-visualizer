# 🌎 Earthquake Visualizer

A web application that displays real-time earthquake data from the [USGS API](https://earthquake.usgs.gov/) using an interactive map powered by [Leaflet.js](https://leafletjs.com/).

---

## 🚀 Features
- **Live Earthquake Map** → View global earthquake activity from the last 24 hours.
- **Color-Coded Magnitude** → Circles range from yellow (minor) to red (strong).
- **Search by Location** → Focus on specific countries or regions.
- **Real-Time Stats** → Total earthquakes, significant (M4+), and highest magnitude.
- **Refresh Button** → Get the latest data instantly.
- **Responsive Design** → Works on desktop, tablet, and mobile.

---

## 🛠 Tech Stack
- **Frontend**: HTML, CSS, JavaScript (or React if applicable)
- **Mapping Library**: Leaflet.js
- **API**: USGS Earthquake GeoJSON Feed
- **Deployment**: Vercel / Netlify

---

## 📂 File Structure
```plaintext
earthquake-visualizer/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css
   ├─ components/
   │  ├─ MapView.jsx
   │  └─ Legend.jsx
   ├─ hooks/
   │  └─ useEarthquakes.js
   └─ lib/
      ├─ constants.js
      └─ utils.js
```
## Setup Locally
```bash
git clone https://github.com/Harilaxman27/earthquake-visualizer.git
cd earthquake-visualizer
npm install
npm run dev
```
---
## 🙌 Credits

* Built for the **Web Developer position at Aganitha.**
* By: Salendra Harilaxman
* Date: **9th September 2025**

---
