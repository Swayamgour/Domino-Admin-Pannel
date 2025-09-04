import React, { useState, useEffect, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {
  useCreateAdminBySuperAdminMutation,
  useGetAllVenderQuery
} from '../redux/api'
import VendorCard from '../component/VendorCard'
import Loader from '../component/Loader'

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const VendorManagement = () => {
  const [createAdminBySuperAdmin, result] = useCreateAdminBySuperAdminMutation()

  const [page, setPage] = useState(1)
  const [Frenchies, setFrenchies] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const loaderRef = useRef()

  const { data, isFetching } = useGetAllVenderQuery()

  console.log(data)

  useEffect(() => {
    if (data?.length) {
      setFrenchies(prev => [...prev, ...data])
      if (data.length < 10) {
        setHasMore(false)
      }
    } else {
      setHasMore(false)
    }
  }, [data])

  // Scroll observer logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0]
        if (first.isIntersecting && hasMore && !isFetching) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 1 }
    )

    const currentLoader = loaderRef.current
    if (currentLoader) observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [hasMore, isFetching])

  // console.log(Frenchies)

  // const [editingVendor, setEditingVendor] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [newProduct, setNewProduct] = useState('')

  // Filter Frenchies
  const filteredFrenchies = Frenchies.filter(vendor => {
    // Status filter
    const statusMatch = filter === 'all' || vendor.status === filter

    // Search term filter
    const searchMatch =
      !searchTerm ||
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact.person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.city.toLowerCase().includes(searchTerm.toLowerCase())

    return statusMatch && searchMatch
  })

  // Approve a vendor
  const approveVendor = id => {
    setFrenchies(
      Frenchies.map(v => (v.id === id ? { ...v, status: 'approved' } : v))
    )
  }

  // Reject a vendor
  const rejectVendor = id => {
    setFrenchies(
      Frenchies.map(v => (v.id === id ? { ...v, status: 'rejected' } : v))
    )
  }

  // Delete a vendor
  const deleteVendor = id => {
    setFrenchies(Frenchies.filter(v => v.id !== id))
  }

  // Open vendor form

  // console.log(editingVendor)

  // Handle form input changes


  const [states, setStates] = useState([]);
  const [editingVendor, setEditingVendor] = useState({ state: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("owner.")) {
      const ownerField = name.split(".")[1];
      setEditingVendor((prev) => ({
        ...prev,
        owner: {
          ...prev.owner, // keep existing owner fields
          [ownerField]: value,
        },
      }));
    } else {
      setEditingVendor((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchStates = async () => {
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India" }),
      });
      const data = await res.json();
      console.log(data)
      setStates(data?.data?.states || []);
    };
    fetchStates();
  }, []);

  console.log(states)


  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (editingVendor?.state) {
      const fetchCities = async () => {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India", state: editingVendor?.state }),
        });
        const data = await res.json();
        console.log(data)
        setCities(data?.data || []);
      };
      fetchCities();
    }
  }, [editingVendor?.state]);




  const openVendorForm = (vendor = null) => {
    setEditingVendor(
      vendor || {
        id: null,
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        owner: {
          name: '',
          phone: '',
          password: ''
        }
      }
    )
    setIsFormOpen(true)
  }

  // Submit vendor form
  const handleSubmit = async e => {
    e.preventDefault()

    let body = {
      name: editingVendor.name,
      phone: editingVendor.phone,
      address: editingVendor.address,
      city: editingVendor.city,
      state: editingVendor.state,
      owner: editingVendor.owner
    }

    console.log("Submitting:", body)

    await createAdminBySuperAdmin(body)

    setIsFormOpen(false)
    setEditingVendor(null)
  }

  // Open vendor details
  const openVendorDetails = vendor => {
    setSelectedVendor(vendor)
    setIsDetailOpen(true)
  }

  // Add product to vendor
  const addProduct = () => {
    if (newProduct.trim() && !selectedVendor.products.includes(newProduct)) {
      const updatedVendor = {
        ...selectedVendor,
        products: [...selectedVendor.products, newProduct]
      }

      setFrenchies(
        Frenchies.map(v => (v.id === selectedVendor.id ? updatedVendor : v))
      )
      setSelectedVendor(updatedVendor)
      setNewProduct('')
    }
  }

  // Remove product from vendor
  const removeProduct = product => {
    const updatedVendor = {
      ...selectedVendor,
      products: selectedVendor.products.filter(p => p !== product)
    }

    setFrenchies(
      Frenchies.map(v => (v.id === selectedVendor.id ? updatedVendor : v))
    )
    setSelectedVendor(updatedVendor)
  }

  // Sales chart data
  const salesChartData = {
    labels: Frenchies.filter(v => v.status === 'approved').map(v => v.name),
    datasets: [
      {
        label: 'Sales (₹)',
        data: Frenchies.filter(v => v.status === 'approved').map(v => v.sales),
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1
      }
    ]
  }

  const salesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Vendor Sales Performance',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return '₹' + value.toLocaleString()
          }
        }
      }
    }
  }

  // console.log(result)

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8'>
      {result?.isLoading && <Loader />}
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600'>
              Frenchies Management
            </h1>
            <p className='text-gray-600 mt-2 max-w-2xl mx-auto'>
              Manage all your Frenchies partners in one place with our intuitive
              dashboard
            </p>
          </div>
          <button
            onClick={() => openVendorForm()}
            className='mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5'
          >
            + Add New Frenchies
          </button>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-2xl shadow-xl p-6'>
            <div className='flex items-center'>
              <div className='bg-green-100 p-3 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-green-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm text-gray-500'>Total Frenchies</p>
                <p className='text-2xl font-bold text-gray-800'>
                  {data?.length}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-6'>
            <div className='flex items-center'>
              <div className='bg-blue-100 p-3 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-blue-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm text-gray-500'>Approved Frenchies</p>
                <p className='text-2xl font-bold text-gray-800'>
                  {data?.length}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-6'>
            <div className='flex items-center'>
              <div className='bg-yellow-100 p-3 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-yellow-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm text-gray-500'>Pending Approval</p>
                <p className='text-2xl font-bold text-gray-800'>
                  {Frenchies.totalPending || 0}
                </p>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl shadow-xl p-6'>
            <div className='flex items-center'>
              <div className='bg-purple-100 p-3 rounded-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-purple-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <div className='ml-4'>
                <p className='text-sm text-gray-500'>Total Sales</p>
                <p className='text-2xl font-bold text-gray-800'>
                  ₹ 0
                  {/* {Frenchies
                    .reduce((sum, vendor) => sum + vendor.salesCount, 0)
                    .toLocaleString()} */}
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Frenchies Table */}
        {/* {console.log(data === undefined)} */}
        <div>
          <div className='overflow-x-auto'>
            <VendorCard data={data} />

            {data != undefined && data?.data?.length === 0 && (
              <div className='text-center py-12'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-16 w-16 mx-auto text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <h3 className='mt-4 text-lg font-medium text-gray-900'>
                  No Frenchies found
                </h3>
                <p className='mt-1 text-gray-500'>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Detail Modal */}
      {isDetailOpen && selectedVendor && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-6'>
                <div>
                  <h3 className='text-2xl font-bold text-gray-800'>
                    {selectedVendor.name}
                  </h3>
                  <p className='text-gray-600'>
                    {selectedVendor.city} • Registered on{' '}
                    {selectedVendor.registrationDate}
                  </p>
                </div>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {/* Left Column - Vendor Info */}
                <div className='md:col-span-2'>
                  <div className='bg-gray-50 rounded-xl p-6 mb-6'>
                    <h4 className='text-lg font-bold text-gray-800 mb-4'>
                      Vendor Information
                    </h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <p className='text-sm text-gray-500'>Contact name</p>
                        <p className='font-medium'>
                          {selectedVendor.contact.person}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Email</p>
                        <p className='font-medium'>
                          {selectedVendor.contact.email}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Phone</p>
                        <p className='font-medium'>
                          {selectedVendor.contact.phone}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Status</p>
                        <p
                          className={`font-medium ${selectedVendor.status === 'approved'
                            ? 'text-green-600'
                            : selectedVendor.status === 'pending'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                            }`}
                        >
                          {selectedVendor.status.charAt(0).toUpperCase() +
                            selectedVendor.status.slice(1)}
                        </p>
                      </div>
                    </div>

                    {selectedVendor.status === 'pending' && (
                      <div className='mt-6 flex space-x-4'>
                        <button
                          onClick={() => approveVendor(selectedVendor.id)}
                          className='px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700'
                        >
                          Approve Vendor
                        </button>
                        <button
                          onClick={() => rejectVendor(selectedVendor.id)}
                          className='px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700'
                        >
                          Reject Vendor
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Product Access */}
                  <div className='bg-gray-50 rounded-xl p-6'>
                    <h4 className='text-lg font-bold text-gray-800 mb-4'>
                      Product Access
                    </h4>
                    <p className='text-sm text-gray-500 mb-4'>
                      Frenchies can only add/edit products assigned to them
                    </p>

                    <div className='mb-6'>
                      <div className='flex items-center mb-4'>
                        <input
                          type='text'
                          placeholder='Add new product category...'
                          value={newProduct}
                          onChange={e => setNewProduct(e.target.value)}
                          className='flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        />
                        <button
                          onClick={addProduct}
                          className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-lg hover:bg-indigo-700'
                        >
                          Add
                        </button>
                      </div>

                      <div className='flex flex-wrap gap-2'>
                        {selectedVendor.products.map((product, idx) => (
                          <div
                            key={idx}
                            className='flex items-center bg-purple-100 rounded-lg px-3 py-2'
                          >
                            <span className='text-purple-800 font-medium'>
                              {product}
                            </span>
                            <button
                              onClick={() => removeProduct(product)}
                              className='ml-2 text-purple-500 hover:text-purple-700'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                        {selectedVendor.products.length === 0 && (
                          <p className='text-gray-500 italic'>
                            No products assigned yet
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats */}
                <div>
                  {/* Sales Stats */}
                  <div className='bg-gray-50 rounded-xl p-6 mb-6'>
                    <h4 className='text-lg font-bold text-gray-800 mb-4'>
                      Sales Performance
                    </h4>
                    <div className='space-y-3'>
                      <div>
                        <p className='text-sm text-gray-500'>Total Sales</p>
                        <p className='text-2xl font-bold text-gray-800'>
                          ₹{selectedVendor.sales.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>Products</p>
                        <p className='font-medium'>
                          {selectedVendor.products.length} categories
                        </p>
                      </div>
                      <div>
                        <p className='text-sm text-gray-500'>
                          Average Order Value
                        </p>
                        <p className='font-medium'>
                          ₹
                          {(selectedVendor.sales > 0
                            ? selectedVendor.sales / 100
                            : 0
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ratings & Reviews */}
                  <div className='bg-gray-50 rounded-xl p-6'>
                    <h4 className='text-lg font-bold text-gray-800 mb-4'>
                      Ratings & Reviews
                    </h4>
                    <div className='flex items-center mb-4'>
                      <div className='text-3xl font-bold text-gray-800 mr-4'>
                        {selectedVendor.rating > 0
                          ? selectedVendor.rating.toFixed(1)
                          : 'N/A'}
                      </div>
                      <div>
                        <div className='flex'>
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns='http://www.w3.org/2000/svg'
                              className={`h-5 w-5 ${i < Math.floor(selectedVendor.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                                }`}
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                            </svg>
                          ))}
                        </div>
                        <p className='text-sm text-gray-500 mt-1'>
                          {selectedVendor.reviews} reviews
                        </p>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    {selectedVendor.reviews > 0 && (
                      <div className='space-y-4'>
                        <div className='border-t border-gray-200 pt-4'>
                          <div className='flex justify-between'>
                            <p className='font-medium'>Rajesh Kumar</p>
                            <div className='flex text-yellow-400'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                              <span className='text-gray-700 ml-1'>5.0</span>
                            </div>
                          </div>
                          <p className='text-sm text-gray-600 mt-1'>
                            Excellent food quality and timely delivery. Highly
                            recommended!
                          </p>
                          <p className='text-xs text-gray-400 mt-2'>
                            2 days ago
                          </p>
                        </div>

                        <div className='border-t border-gray-200 pt-4'>
                          <div className='flex justify-between'>
                            <p className='font-medium'>Priya Sharma</p>
                            <div className='flex text-yellow-400'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-4 w-4'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                              >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                              <span className='text-gray-700 ml-1'>4.5</span>
                            </div>
                          </div>
                          <p className='text-sm text-gray-600 mt-1'>
                            Good variety of dishes, but packaging could be
                            better.
                          </p>
                          <p className='text-xs text-gray-400 mt-2'>
                            1 week ago
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedVendor.reviews === 0 && (
                      <div className='text-center py-4'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-12 w-12 mx-auto text-gray-300'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z'
                          />
                        </svg>
                        <p className='text-gray-500 mt-2'>No reviews yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Form Modal */}
      {isFormOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-2xl font-bold text-gray-800'>
                  {editingVendor.id ? 'Edit Vendor' : 'Add New Frenchies'}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-gray-700 mb-2'>
                      Shop Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={editingVendor.name}
                      onChange={handleInputChange}
                      className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-gray-700 mb-2'>
                      Owner Name
                    </label>
                    <input
                      type='text'
                      name='owner.name'
                      value={editingVendor.owner?.name || ''}
                      onChange={handleInputChange}
                      className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-gray-700 mb-2'>
                      Shop Phone
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={editingVendor.phone}
                      onChange={e => {
                        const onlyNums = e.target.value.replace(/\D/g, '') // Remove non-digits
                        if (onlyNums.length <= 10) {
                          handleInputChange({
                            target: {
                              name: 'phone',
                              value: onlyNums
                            }
                          })
                        }
                      }}
                      inputMode='numeric'
                      maxLength={10}
                      pattern='^\d{10}$'
                      title='Enter a valid 10-digit phone number'
                      className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-gray-700 mb-2'>
                      Owner Phone
                    </label>
                    <input
                      type='tel'
                      name='owner.phone'
                      value={editingVendor.owner?.phone || ''}
                      onChange={e => {
                        const onlyNums = e.target.value.replace(/\D/g, '') // Remove non-digits
                        if (onlyNums.length <= 10) {
                          handleInputChange({
                            target: {
                              name: 'owner.phone',
                              value: onlyNums
                            }
                          })
                        }
                      }}
                      inputMode='numeric'
                      maxLength={10}
                      pattern='^\d{10}$'
                      title='Enter a valid 10-digit phone number'
                      className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-gray-700 mb-2'>
                      Owner Password
                    </label>
                    <input
                      type='password'
                      name='owner.password'
                      value={editingVendor.owner?.password || ''}
                      onChange={handleInputChange}
                      className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                      minLength={5}
                    />
                  </div>

                  <div>
                    <label className='block text-gray-700 mb-2'>Address</label>
                    <input
                      type='text'
                      name='address'
                      value={editingVendor.address}
                      onChange={handleInputChange}
                      className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">State</label>
                    <select
                      name="state"
                      value={editingVendor.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">City</label>
                    <select
                      name="city"
                      value={editingVendor.city || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    >
                      <option value="">Select City</option>
                      {cities?.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className='mt-8 flex justify-end space-x-4'>
                  <button
                    type='button'
                    onClick={() => setIsFormOpen(false)}
                    className='px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all'
                  >
                    {result?.isLoading
                      ? 'Loading...'
                      : editingVendor.id
                        ? 'Update Vendor'
                        : 'Add Vendor'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VendorManagement
