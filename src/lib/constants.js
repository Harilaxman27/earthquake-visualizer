export const USGS_API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export const MAGNITUDE_COLORS = {
  0: '#10b981', // green for very low
  2: '#eab308', // yellow for low
  4: '#f97316', // orange for medium
  6: '#ef4444', // red for high
  8: '#8b5cf6'  // purple for severe
};

export const MAGNITUDE_RANGES = [
  { min: 0, max: 2, label: '0-2', color: '#10b981', description: 'Minor' },
  { min: 2, max: 4, label: '2-4', color: '#eab308', description: 'Light' },
  { min: 4, max: 6, label: '4-6', color: '#f97316', description: 'Moderate' },
  { min: 6, max: 8, label: '6-8', color: '#ef4444', description: 'Strong' },
  { min: 8, max: 10, label: '8+', color: '#8b5cf6', description: 'Great' }
];

export const COUNTRY_COORDINATES = {
  // North America
  'usa': [39.8283, -98.5795],
  'united states': [39.8283, -98.5795],
  'canada': [56.1304, -106.3468],
  'mexico': [23.6345, -102.5528],
  'california': [36.7783, -119.4179],
  'alaska': [61.2181, -149.9003],
  'texas': [31.9686, -99.9018],
  'florida': [27.7663, -82.6404],
  'new york': [42.1657, -74.9481],
  
  // South America
  'chile': [-35.6751, -71.543],
  'peru': [-9.1900, -75.0152],
  'brazil': [-14.2350, -51.9253],
  'argentina': [-38.4161, -63.6167],
  'colombia': [4.5709, -74.2973],
  'ecuador': [-1.8312, -78.1834],
  'bolivia': [-16.2902, -63.5887],
  'venezuela': [6.4238, -66.5897],
  
  // Europe
  'turkey': [38.9637, 35.2433],
  'italy': [41.8719, 12.5674],
  'greece': [39.0742, 21.8243],
  'spain': [40.4637, -3.7492],
  'france': [46.6034, 1.8883],
  'germany': [51.1657, 10.4515],
  'uk': [55.3781, -3.4360],
  'united kingdom': [55.3781, -3.4360],
  'norway': [60.4720, 8.4689],
  'iceland': [64.9631, -19.0208],
  'romania': [45.9432, 24.9668],
  'croatia': [45.1000, 15.2000],
  'albania': [41.1533, 20.1683],
  
  // Asia
  'japan': [36.2048, 138.2529],
  'china': [35.8617, 104.1954],
  'indonesia': [-0.7893, 113.9213],
  'philippines': [12.8797, 121.7740],
  'india': [20.5937, 78.9629],
  'nepal': [28.3949, 84.1240],
  'iran': [32.4279, 53.6880],
  'afghanistan': [33.9391, 67.7100],
  'pakistan': [30.3753, 69.3451],
  'taiwan': [23.6978, 120.9605],
  'south korea': [35.9078, 127.7669],
  'thailand': [15.8700, 100.9925],
  'myanmar': [21.9162, 95.9560],
  'vietnam': [14.0583, 108.2772],
  'malaysia': [4.2105, 101.9758],
  'russia': [61.5240, 105.3188],
  'kazakhstan': [48.0196, 66.9237],
  'uzbekistan': [41.3775, 64.5853],
  'kyrgyzstan': [41.2044, 74.7661],
  'tajikistan': [38.8610, 71.2761],
  
  // Middle East
  'saudi arabia': [23.8859, 45.0792],
  'iraq': [33.2232, 43.6793],
  'syria': [34.8021, 38.9968],
  'lebanon': [33.8547, 35.8623],
  'jordan': [30.5852, 36.2384],
  'israel': [31.0461, 34.8516],
  'yemen': [15.5527, 48.5164],
  'oman': [21.4735, 55.9754],
  'uae': [23.4241, 53.8478],
  
  // Oceania
  'australia': [-25.2744, 133.7751],
  'new zealand': [-40.9006, 174.8860],
  'fiji': [-16.5780, 179.4144],
  'papua new guinea': [-6.3150, 143.9555],
  'vanuatu': [-15.3767, 166.9592],
  'tonga': [-21.1789, -175.1982],
  'solomon islands': [-9.6457, 160.1562],
  
  // Africa
  'morocco': [31.7917, -7.0926],
  'algeria': [28.0339, 1.6596],
  'egypt': [26.0975, 30.0444],
  'ethiopia': [9.1450, 40.4897],
  'kenya': [-0.0236, 37.9062],
  'south africa': [-30.5595, 22.9375],
  'tanzania': [-6.3690, 34.8888],
  'madagascar': [-18.7669, 46.8691]
};