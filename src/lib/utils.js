import { MAGNITUDE_COLORS, COUNTRY_COORDINATES } from './constants.js';

export const getMagnitudeColor = (magnitude) => {
  if (magnitude >= 8) return MAGNITUDE_COLORS[8];
  if (magnitude >= 6) return MAGNITUDE_COLORS[6];
  if (magnitude >= 4) return MAGNITUDE_COLORS[4];
  if (magnitude >= 2) return MAGNITUDE_COLORS[2];
  return MAGNITUDE_COLORS[0];
};

export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString()
  };
};

export const formatLocation = (place) => {
  if (!place) return 'Unknown Location';
  return place;
};

export const getCountryCoordinates = (countryName) => {
  const country = countryName.toLowerCase().trim();
  return COUNTRY_COORDINATES[country] || null;
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const filterEarthquakesByLocation = (earthquakes, targetCoords, radiusKm = 2000) => {
  if (!targetCoords) return earthquakes;
  
  return earthquakes.filter(eq => {
    const [lon, lat] = eq.geometry.coordinates;
    const distance = calculateDistance(targetCoords[0], targetCoords[1], lat, lon);
    return distance <= radiusKm;
  });
};