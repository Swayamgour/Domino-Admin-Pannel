import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { useActiveFrenchiesMutation } from '../redux/api';
import CircularProgress from '@mui/material/CircularProgress';
import {
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineX,
  HiOutlineUser,
  HiOutlineLocationMarker,
  HiOutlineCurrencyRupee,
  HiOutlineCalendar,
  HiOutlinePhone,
  HiOutlineMail
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

const VendorCard = ({ data }) => {
  const vendors = data || [];
  // console.log(vendors)
  const [updateVendor, result] = useActiveFrenchiesMutation();
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);



  const handleStatusChange = async (vendorId, isActive) => {
    setLoadingId(vendorId);
    // console.log(vendorId, isActive)

    if (!vendorId) {
      console.error('Missing vendor ID!');
      return;
    }



    try {
      if (isActive) {
        let body = {
          isActive: false,
          vendorId

        }
        await updateVendor(body).unwrap();
      }
      else {
        let body = {
          isActive: true,
          vendorId
        }
        await updateVendor(body).unwrap();
      }
      console.log('Status toggled for:', vendorId);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getStatusColor = status => {
    // Since your data doesn't have a status field, we'll use a default
    return 'bg-green-100 text-green-800 border-green-200';
  };

  // Filter vendors based on search term and filters
  const filteredVendors = vendors?.filter(vendor => {
    const search = searchTerm.toLowerCase();

    // Combine all searchable fields in one string
    const searchableString = [
      vendor?.name,
      vendor?.city,
      vendor?.state,
      vendor?.address,
      vendor?.phone,
      vendor?._id,
      vendor?.ownerUserId?.name,
      vendor?.ownerUserId?.phone,
      vendor?.ownerUserId?._id
    ]
      .filter(Boolean) // remove undefined/null values
      .join(" ") // join into single string
      .toLowerCase();

    // Search filter (matches if searchTerm is empty or found anywhere)
    const matchesSearch = !searchTerm || searchableString.includes(search);

    // City filter
    const matchesCity =
      cityFilter === "all" ||
      vendor?.city?.toLowerCase() === cityFilter.toLowerCase();

    // State filter
    const matchesState =
      stateFilter === "all" ||
      vendor?.state?.toLowerCase() === stateFilter.toLowerCase();

    return matchesSearch && matchesCity && matchesState;
  });



  // Get unique values for filter dropdowns
  const cityOptions = ['all', ...new Set(vendors?.map(v => v.city).filter(Boolean))];
  const stateOptions = ['all', ...new Set(vendors?.map(v => v.state).filter(Boolean))];

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setCityFilter('all');
    setStateFilter('all');
  };

  // Check if any filter is active
  const isFilterActive = searchTerm !== '' || cityFilter !== 'all' || stateFilter !== 'all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search vendors?..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <HiOutlineFilter className="h-5 w-5" />
                Filters
                {isFilterActive && (
                  <span className="bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </button>

              {isFilterActive && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                >
                  <HiOutlineX className="h-5 w-5" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {cityOptions.map(city => (
                    <option key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  {stateOptions.map(state => (
                    <option key={state} value={state}>
                      {state === 'all' ? 'All States' : state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredVendors?.length} of {vendors?.length} vendors
          </p>

          {isFilterActive && (
            <div className="flex gap-2 flex-wrap">
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="text-blue-600 hover:text-blue-800">
                    <HiOutlineX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {cityFilter !== 'all' && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  City: {cityFilter}
                  <button onClick={() => setCityFilter('all')} className="text-purple-600 hover:text-purple-800">
                    <HiOutlineX className="h-3 w-3" />
                  </button>
                </span>
              )}
              {stateFilter !== 'all' && (
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  State: {stateFilter}
                  <button onClick={() => setStateFilter('all')} className="text-orange-600 hover:text-orange-800">
                    <HiOutlineX className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Vendor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors?.map(vendor => (
            <div
              key={vendor?._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 rounded-xl w-16 h-16 flex items-center justify-center">
                      <div className="text-white text-2xl font-bold">
                        {vendor?.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-bold text-white">
                        {vendor?.name}
                      </h2>
                      <p className="text-indigo-200 text-sm">
                        ID: {vendor?._id.substring(0, 8)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border 
                      ${vendor?.isActive
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                      }`}
                  >
                    {vendor?.isActive ? "Active" : "Inactive"}
                  </span>

                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Location Info */}
                <div className="flex items-center mb-4">
                  <HiOutlineLocationMarker className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <p className="text-gray-900">{vendor?.address}</p>
                    <p className="text-sm text-gray-500">
                      {vendor?.city}, {vendor?.state}
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <HiOutlinePhone className="h-5 w-5 text-indigo-500 mr-2" />
                    <span className="text-gray-700">{vendor?.phone}</span>
                  </div>

                  {vendor?.contact && (
                    <div className="flex items-center">
                      <HiOutlinePhone className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700">{vendor?.contact}</span>
                    </div>
                  )}

                  {vendor?.email && (
                    <div className="flex items-center">
                      <HiOutlineMail className="h-5 w-5 text-indigo-500 mr-2" />
                      <span className="text-gray-700 truncate">{vendor?.email}</span>
                    </div>
                  )}
                </div>

                {/* Dates */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <HiOutlineCalendar className="h-4 w-4 mr-2" />
                  Created: {new Date(vendor?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/FrenchiesMangement/${vendor?._id}`)}
                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View Details
                  </button>

                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3">
                    <span className="text-sm text-gray-700">Active</span>
                    {result?.isLoading && loadingId === vendor?._id ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <Switch
                        checked={vendor?.isActive} // Default to active since your data doesn't have status
                        onChange={() => handleStatusChange(vendor?._id, vendor?.isActive)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVendors?.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-2xl mx-auto mt-8">
            <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {vendors?.length === 0 ? 'No Vendors Found' : 'No Matching Vendors'}
            </h3>
            <p className="text-gray-600 mb-6">
              {vendors?.length === 0
                ? 'It looks like there are no vendors in your system yet. Add your first vendor to get started!'
                : 'Try adjusting your search or filters to find what you\'re looking for.'
              }
            </p>
            {isFilterActive && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all mr-3"
              >
                Clear All Filters
              </button>
            )}
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all">
              Add New Vendor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorCard;