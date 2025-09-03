import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { getMagnitudeColor, formatDateTime, formatLocation } from '../lib/utils.js';

const MapUpdater = ({ center, earthquakes }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 5); // Zoom level 5 for country searches
    } else if (earthquakes.length > 0) {
      // Fit map to show all earthquakes with better zoom
      const bounds = earthquakes.map(eq => [
        eq.geometry.coordinates[1], 
        eq.geometry.coordinates[0]
      ]);
      if (bounds.length > 0) {
        map.fitBounds(bounds, { 
          padding: [20, 20],
          maxZoom: 8 // Prevent too much zoom when fitting bounds
        });
      }
    }
  }, [center, earthquakes, map]);
  
  return null;
};

const MapView = ({ earthquakes, center }) => {
  const defaultCenter = [20, 0];
  const defaultZoom = 2;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-700">
      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        worldCopyJump={false}
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        
        <MapUpdater center={center} earthquakes={earthquakes} />
        
        {earthquakes.map((earthquake) => {
          const [longitude, latitude, depth] = earthquake.geometry.coordinates;
          const { mag, place, time, url } = earthquake.properties;
          const { date, time: timeStr } = formatDateTime(time);
          
          return (
            <CircleMarker
              key={earthquake.id}
              center={[latitude, longitude]}
              radius={Math.max(4, Math.min(mag * 2, 20))}
              pathOptions={{
                color: getMagnitudeColor(mag),
                fillColor: getMagnitudeColor(mag),
                fillOpacity: 0.7,
                weight: 2
              }}
            >
              <Popup>
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-2">
                    Magnitude {mag?.toFixed(1) || 'Unknown'}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Location:</strong> {formatLocation(place)}</p>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time:</strong> {timeStr}</p>
                    <p><strong>Depth:</strong> {depth?.toFixed(1) || 'Unknown'} km</p>
                    <p><strong>Coordinates:</strong> {latitude.toFixed(3)}, {longitude.toFixed(3)}</p>
                  </div>
                  {url && (
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline text-xs"
                    >
                      View Details on USGS
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;