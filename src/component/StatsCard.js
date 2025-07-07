// src/components/StatsCard.js
import React from 'react';

const StatsCard = ({ title, value, change, positive }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition-shadow">
      <h3 className="text-gray-500 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className={`ml-2 text-sm font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${positive ? 'bg-green-500' : 'bg-red-500'}`} 
            style={{ width: positive ? '72%' : '24%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;