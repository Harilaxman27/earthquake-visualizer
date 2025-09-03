import { useState, useMemo } from 'react';
import MapView from './components/MapView.jsx';
import Legend from './components/Legend.jsx';
import { useEarthquakes } from './hooks/useEarthquakes.js';
import { getCountryCoordinates, filterEarthquakesByLocation } from './lib/utils.js';

function App() {
  const { earthquakes, loading, error, lastUpdated, refetch } = useEarthquakes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  const filteredEarthquakes = useMemo(() => {
    if (!selectedLocation || !searchQuery) return earthquakes;
    return filterEarthquakesByLocation(earthquakes, selectedLocation, 1000);
  }, [earthquakes, selectedLocation]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSelectedLocation(null);
      return;
    }
    
    const coordinates = getCountryCoordinates(searchQuery);
    if (coordinates) {
      setSelectedLocation(coordinates);
    } else {
      alert(`Location "${searchQuery}" not found. Try: Japan, USA, California, Alaska, Indonesia, etc.`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedLocation(null);
  };

  const statsData = useMemo(() => {
    const total = filteredEarthquakes.length;
    const significantQuakes = filteredEarthquakes.filter(eq => eq.properties.mag >= 4.0).length;
    const maxMagnitude = Math.max(...filteredEarthquakes.map(eq => eq.properties.mag || 0));
    
    return { total, significantQuakes, maxMagnitude: isFinite(maxMagnitude) ? maxMagnitude : 0 };
  }, [filteredEarthquakes]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🌍</div>
              <h1 className="text-2xl font-bold text-white">Earthquake Visualizer</h1>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-400">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={refetch}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Search & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Section */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">🔍 Search Location</h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., Japan, California, Turkey..."
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Search
                  </button>
                  {selectedLocation && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>
              
              {selectedLocation && (
                <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
                  <p className="text-sm text-blue-300">
                    📍 Showing earthquakes within 2000km of <strong>{searchQuery}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">📊 Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Earthquakes:</span>
                  <span className="font-bold text-lg">{statsData.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Significant (M4.0+):</span>
                  <span className="font-bold text-lg text-orange-400">{statsData.significantQuakes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Highest Magnitude:</span>
                  <span className="font-bold text-lg text-red-400">
                    {statsData.maxMagnitude.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <Legend />
          </div>

          {/* Main Content - Map */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  🗺️ Live Earthquake Map
                  {selectedLocation && ` - ${searchQuery}`}
                </h2>
                <div className="text-sm text-gray-400">
                  Last 24 hours • {filteredEarthquakes.length} earthquakes
                </div>
              </div>
              
              <div className="h-[500px] lg:h-[650px]">
                {loading && (
                  <div className="flex items-center justify-center h-full bg-gray-700 rounded-lg">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading earthquake data...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center justify-center h-full bg-red-900/20 border border-red-700 rounded-lg">
                    <div className="text-center text-red-400">
                      <div className="text-4xl mb-4">⚠️</div>
                      <p className="text-lg font-semibold mb-2">Error loading data</p>
                      <p className="text-sm">{error}</p>
                      <button 
                        onClick={refetch}
                        className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                {!loading && !error && (
                  <MapView 
                    earthquakes={filteredEarthquakes} 
                    center={selectedLocation}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              Data provided by{' '}
              <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                USGS Earthquake Hazards Program
              </a>
              {' • '}
              Built with React, Tailwind CSS & Leaflet
            </p>
            <p className="text-xs mt-2">
              Real-time earthquake data updates every 5 minutes. Click markers for detailed information.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;