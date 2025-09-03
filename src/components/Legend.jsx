import { MAGNITUDE_RANGES } from '../lib/constants.js';

const Legend = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-700">
      <h3 className="text-lg font-semibold mb-3 text-center">Earthquake Magnitude Scale</h3>
      <div className="space-y-2">
        {MAGNITUDE_RANGES.map((range, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border border-gray-600"
                style={{ backgroundColor: range.color }}
              ></div>
              <span className="text-sm font-medium">{range.label}</span>
            </div>
            <span className="text-xs text-gray-400">{range.description}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center">
          Data updates every 5 minutes from USGS
        </p>
      </div>
    </div>
  );
};

export default Legend;