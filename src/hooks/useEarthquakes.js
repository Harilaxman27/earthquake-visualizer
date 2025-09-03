import { useState, useEffect } from 'react';
import { USGS_API_URL } from '../lib/constants.js';

export const useEarthquakes = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchEarthquakes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(USGS_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setEarthquakes(data.features || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Error fetching earthquakes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    earthquakes,
    loading,
    error,
    lastUpdated,
    refetch: fetchEarthquakes
  };
};