import React, { useEffect, useState } from 'react'
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllCategoryQuery,
  useGetAllProductQuery,
  useUpdateProductMutation
} from '../redux/api'
import AddCategoryDialog from '../component/AddCategory'
// import toast from 'react-hot-toast';
import { toast } from 'react-hot-toast'
// import 'react-toastify/dist/ReactToastify.css';

const ProductManagement = () => {
  // Mock data for products
  const initialProducts = [
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 12.99,
      description: 'Classic pizza with tomato ',
      category: 'Pizza',
      vendor: 'Pizza Corner',
      image: 'pizza-margherita.jpg',
      stock: 45,
      status: 'in-stock'
    },
    {
      id: 2,
      name: 'Veg Supreme Burger',
      price: 8.99,
      description: 'Vegetarian burger with special sauce',
      category: 'Burger',
      vendor: 'Burger King',
      image: 'veg-burger.jpg',
      stock: 0,
      status: 'out-of-stock'
    },
    {
      id: 3,
      name: 'Chicken Biryani',
      price: 14.99,
      description: 'Fragrant rice dish with chicken and spices',
      category: 'Rice',
      vendor: 'Spice Garden',
      image: 'chicken-biryani.jpg',
      stock: 32,
      status: 'in-stock'
    },
    {
      id: 4,
      name: 'Paneer Tikka',
      price: 9.99,
      description: 'Grilled cottage cheese cubes with spices',
      category: 'Appetizer',
      vendor: 'Spice Garden',
      image: 'paneer-tikka.jpg',
      stock: 18,
      status: 'in-stock'
    },
    {
      id: 5,
      name: 'Chocolate Brownie',
      price: 6.99,
      description: 'Rich chocolate brownie with walnuts',
      category: 'Dessert',
      vendor: 'Sweet Corner',
      image: 'chocolate-brownie.jpg',
      stock: 0,
      status: 'out-of-stock'
    }
  ]

  const [addProduct, result] = useAddProductMutation()
  const { data } = useGetAllCategoryQuery()
  const { data: Product } = useGetAllProductQuery()
  const [deleteProd, resultDelete] = useDeleteProductMutation()
  const [updateProduct, resultUpdate] = useUpdateProductMutation()

  // console.log(resultDelete)

  // State management

  useEffect(() => {
    if (resultDelete?.isSuccess) {
      toast.success('Delete Successfully')
    }
    if (resultUpdate?.isSuccess) {
      toast.success('Update Product successfully')
    }
  }, [resultDelete?.isSuccess, resultUpdate?.isSuccess])

  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [categories, setCategories] = useState([
    'Pizza',
    'Burger',
    'Rice',
    'Appetizer',
    'Dessert',
    'Beverage'
  ])
  const [newCategory, setNewCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    vendor: 'all',
    status: 'all'
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCategory = data => {
    console.log('Submitted Category:', data)
    // You can now send this data to your backend
  }

  // Vendor options
  const vendors = [...new Set(products.map(p => p.vendor))]

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    // Search term filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Category filter
    const matchesCategory =
      filters.category === 'all' || product.category === filters.category

    // Vendor filter
    const matchesVendor =
      filters.vendor === 'all' || product.vendor === filters.vendor

    // Status filter
    const matchesStatus =
      filters.status === 'all' || product.status === filters.status

    return matchesSearch && matchesCategory && matchesVendor && matchesStatus
  })

  // Handle form input changes
  const handleInputChange = e => {
    const { name, value } = e.target
    setEditingProduct({
      ...editingProduct,
      [name]: value
    })
  }

  // Toggle stock status
  const toggleStockStatus = id => {
    setProducts(
      products.map(product =>
        product.id === id
          ? {
              ...product,
              status:
                product.status === 'in-stock' ? 'out-of-stock' : 'in-stock',
              stock: product.status === 'in-stock' ? 0 : 50
            }
          : product
      )
    )
  }

  console.log(editingProduct, editingProduct?.category?._id)

  const handelDeleteProduct = async id => {
    await deleteProd(id)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('name', editingProduct?.name)
    formData.append('description', editingProduct?.description)
    formData.append('price', editingProduct?.price)

    // formData.append('stock', editingProduct?.status);

    try {
      if (editingProduct?._id) {
        formData.append(
          'category',
          editingProduct?.category?._id || editingProduct?.category
        )
        formData.append('Stock', editingProduct?.stock)
        // ✅ Update product
        await updateProduct({
          id: editingProduct._id,
          updatedData: formData
        })

        // toast.success('Product updated successfully')
      } else {
        // ✅ Add new product
        formData.append('image', editingProduct?.image)
        formData.append('category', editingProduct?.category)
        await addProduct(formData)
        toast.success('Product added successfully')
      }

      setIsFormOpen(false)
      setEditingProduct(null)
    } catch (error) {
      toast.error('Something went wrong')
      console.error(error)
    }
  }

  // Add a new category
  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory])
      setNewCategory('')
    }
  }

  // Remove a category
  const removeCategory = category => {
    setCategories(categories.filter(c => c !== category))
  }

  // Open form to add new product
  const openAddForm = () => {
    setEditingProduct({
      id: null,
      name: '',
      price: '',
      description: '',
      category: '',
      vendor: '',
      image: '',
      stock: 0,
      status: 'in-stock',
      image: null
    })
    setIsFormOpen(true)
  }

  // Open form to edit product
  const openEditForm = product => {
    setEditingProduct({ ...product })
    setIsFormOpen(true)
  }

  console.log(editingProduct)

  const handleImageChange = e => {
    const file = e.target.files[0]
    setEditingProduct(prev => ({
      ...prev,
      image: file
    }))
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-6'>
      {/* <Toaster /> */}

      {/* Add Category Dialo box */}

      <AddCategoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleAddCategory}
      />

      <div className='max-w-7xl mx-auto'>
        {/* Mobile header */}
        <div className='md:hidden flex justify-between items-center mb-4'>
          <div>
            <h1 className='text-xl font-bold text-gray-800'>
              Product Management
            </h1>
            <p className='text-xs text-gray-600 mt-1'>
              Manage your menu items and inventory
            </p>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-2 rounded-lg bg-indigo-600 text-white'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='md:hidden bg-white rounded-xl shadow-lg p-4 mb-4'>
            <button
              onClick={openAddForm}
              className='w-full mb-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg'
            >
              + Add New Product
            </button>

            <div className='mb-4'>
              <input
                type='text'
                placeholder='Search products...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-lg'
              />
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-gray-700 text-xs mb-1'>
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={e =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className='w-full p-2 border border-gray-300 rounded-lg text-sm'
                >
                  <option value='all'>All Categories</option>
                  {data?.message?.map(category => (
                    <option key={category} value={category?.name}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-gray-700 text-xs mb-1'>
                  Vendor
                </label>
                <select
                  value={filters.vendor}
                  onChange={e =>
                    setFilters({ ...filters, vendor: e.target.value })
                  }
                  className='w-full p-2 border border-gray-300 rounded-lg text-sm'
                >
                  <option value='all'>All Vendors</option>
                  {vendors.map(vendor => (
                    <option key={vendor} value={vendor}>
                      {vendor}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-gray-700 text-xs mb-1'>
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={e =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className='w-full p-2 border border-gray-300 rounded-lg text-sm'
                >
                  <option value='all'>All Status</option>
                  <option value='in-stock'>In Stock</option>
                  <option value='out-of-stock'>Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <div className='hidden md:flex flex-col md:flex-row md:items-center justify-between mb-6'>
          <div>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
              Product Management
            </h1>
            <p className='text-gray-600 mt-1'>
              Manage your menu items, inventory, and categories
            </p>
          </div>
          <button
            onClick={openAddForm}
            className='mt-4 md:mt-0 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg md:rounded-xl shadow hover:shadow-md transition-all'
          >
            + Add New Product
          </button>
        </div>

        {/* Filters Section - Desktop */}
        <div className='hidden md:block bg-white rounded-xl shadow p-4 md:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4'>
            {/* Search */}
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-1'>
                Search Products
              </label>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search by name or description...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
                />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 md:h-5 md:w-5 absolute right-3 top-2.5 md:top-3.5 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-1'>
                Category
              </label>
              <select
                value={filters.category}
                onChange={e =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className='w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                <option value='all'>All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Vendor Filter */}
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-1'>
                Vendor
              </label>
              <select
                value={filters.vendor}
                onChange={e =>
                  setFilters({ ...filters, vendor: e.target.value })
                }
                className='w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                <option value='all'>All Vendors</option>
                {vendors.map(vendor => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className='block text-gray-700 text-sm font-medium mb-1'>
                Availability
              </label>
              <select
                value={filters.status}
                onChange={e =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className='w-full p-2 md:p-3 border border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500'
              >
                <option value='all'>All Status</option>
                <option value='in-stock'>In Stock</option>
                <option value='out-of-stock'>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products List - Mobile View */}
        <div className='md:hidden mb-6'>
          {Product?.message?.map(product => (
            <div
              key={product.id}
              className='bg-white rounded-xl shadow mb-4 overflow-hidden'
            >
              <div className='p-4 border-b border-gray-200'>
                <div className='flex justify-between items-start'>
                  <div>
                    <div className='font-bold text-gray-800'>
                      {product.name}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {product.category?.name}
                    </div>
                  </div>
                  <span
                    onClick={() => toggleStockStatus(product.id)}
                    className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full cursor-pointer ${
                      product.stock === 'In Stock'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock === 'In Stock' ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className='p-4'>
                <div className='flex items-center mb-3'>
                  <div className='flex-shrink-0 h-16 w-16 bg-gray-200 rounded-lg overflow-hidden mr-3'>
                    {product.image ? (
                      <img
                        className='h-full w-full object-cover'
                        src={product?.image}
                        alt={product.name}
                      />
                    ) : (
                      <div className='bg-gray-200 border-2 border-dashed rounded-xl w-full h-full' />
                    )}
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>
                      {product.description}
                    </p>
                    <p className='text-sm font-medium text-gray-900 mt-1'>
                      ₹ {product.price} • {product.stock} items
                    </p>
                  </div>
                </div>

                <div className='flex justify-between pt-3 border-t border-gray-100'>
                  <button
                    onClick={() => openEditForm(product)}
                    className='text-indigo-600 hover:text-indigo-900 text-sm'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handelDeleteProduct(product?._id)}
                    className='text-red-600 hover:text-red-900 text-sm'
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className='text-center py-8 bg-white rounded-xl shadow'>
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
                No products found
              </h3>
              <p className='mt-1 text-gray-500'>
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Products Table - Desktop View */}
        <div className='hidden md:block bg-white rounded-xl shadow overflow-hidden mb-6'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Product
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Category
                  </th>
                  {/* <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Vendor
                  </th> */}
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Price
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Stock
                  </th>
                  <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {Product?.message?.map(product => (
                  <tr
                    key={product._id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='px-4 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 h-10 w-10 bg-gray-200 rounded-lg overflow-hidden'>
                          {product.image ? (
                            <img
                              className='h-full w-full object-cover'
                              src={product.image}
                              alt={product.name}
                            />
                          ) : (
                            <div className='bg-gray-200 border-2 border-dashed rounded-xl w-full h-full' />
                          )}
                        </div>
                        <div className='ml-3'>
                          <div className='text-sm font-medium text-gray-900'>
                            {product.name}
                          </div>
                          <div className='text-xs text-gray-500 line-clamp-1 max-w-xs'>
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      <span className='px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800'>
                        {product.category.name}
                      </span>
                    </td>
                    {/* <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {product.vendor}
                    </td> */}
                    <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                      ₹ {product.price}
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {product.stock} items
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      <span
                        onClick={() => toggleStockStatus(product.id)}
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                          product.stock === 'In Stock'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock === 'In Stock'
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </span>
                    </td>
                    <td className='px-4 py-4 whitespace-nowrap text-right text-sm font-medium'>
                      <button
                        onClick={() => openEditForm(product)}
                        className='text-indigo-600 hover:text-indigo-900 mr-3'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handelDeleteProduct(product._id)}
                        className='text-red-600 hover:text-red-900'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
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
                  No products found
                </h3>
                <p className='mt-1 text-gray-500'>
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Categories Management */}
        <div className='bg-white rounded-xl shadow p-4 md:p-6'>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6'>
            <h2 className='text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-0'>
              Food Categories
            </h2>
            <div className='flex'>
              <input
                type='text'
                placeholder='Add new category...'
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className='flex-grow px-3 py-2 border border-gray-300 rounded-l-lg md:rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm'
              />
              <button
                onClick={addCategory}
                className='px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-lg md:rounded-r-xl hover:bg-indigo-700 transition-colors text-sm'
              >
                Add
              </button>
            </div>
          </div>

          <div className='flex flex-wrap gap-2 md:gap-3'>
            {categories.map(category => (
              <div
                key={category}
                className='flex items-center bg-purple-50 rounded-lg md:rounded-xl px-3 py-1 md:px-4 md:py-2'
              >
                <span className='text-purple-800 font-medium text-sm md:text-base'>
                  {category}
                </span>
                <button
                  onClick={() => removeCategory(category)}
                  className='ml-1 md:ml-2 text-purple-500 hover:text-purple-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3 w-3 md:h-4 md:w-4'
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
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-3 md:p-4'>
          <div className='bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto'>
            <div className='p-4 md:p-6'>
              <div className='flex justify-between items-center mb-4 md:mb-6'>
                <h3 className='text-xl md:text-2xl font-bold text-gray-800'>
                  {editingProduct.id ? 'Edit Product' : 'Add New Product'}
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
                <div className='grid grid-cols-1 gap-4 md:gap-5'>
                  <div>
                    <label className='block text-gray-700 mb-1 text-sm md:text-base'>
                      Product Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={editingProduct.name}
                      onChange={handleInputChange}
                      className='w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                      placeholder='Product Name'
                    />
                  </div>

                  <div>
                    <label className='block text-gray-700 mb-1 text-sm md:text-base'>
                      Price (₹)
                    </label>
                    <input
                      type='number'
                      name='price'
                      value={editingProduct.price}
                      onChange={handleInputChange}
                      min='0'
                      step='0.01'
                      className='w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  <div>
                    <div className='flex justify-between'>
                      <label className='block text-gray-700 mb-1 text-sm md:text-base'>
                        Category
                      </label>
                      <label
                        onClick={() => setIsDialogOpen(true)}
                        className='block  mb-1 text-sm md:text-base p-1 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg'
                      >
                        Add Category
                      </label>
                    </div>

                    <select
                      name='category'
                      value={editingProduct.category}
                      onChange={handleInputChange}
                      className='w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    >
                      <option value=''>Select a category</option>
                      {data?.message?.map(category => (
                        <option key={category?._id} value={category?._id}>
                          {category?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className='block text-gray-700 mb-1 text-sm md:text-base'>
                      Description
                    </label>
                    <textarea
                      name='description'
                      value={editingProduct.description}
                      onChange={handleInputChange}
                      rows='3'
                      className='w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      required
                    ></textarea>
                  </div>

                  {editingProduct?._id === undefined && (
                    <div>
                      <label className='block text-gray-700 mb-1 text-sm md:text-base'>
                        Product Image
                      </label>
                      <input
                        type='file'
                        name='image'
                        accept='image/*'
                        onChange={handleImageChange}
                        className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm'
                      />
                    </div>
                  )}

                  <div>
                    <label className='block text-gray-700 mb-1 text-sm md:text-base'>
                      Inventory Stock
                    </label>
                    <div className='flex space-x-3 md:space-x-4'>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          name='status'
                          value='in-stock'
                          checked={editingProduct.stock === 'In Stock'}
                          onChange={handleInputChange}
                          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500'
                        />
                        <span className='ml-2 text-sm'>In Stock</span>
                      </label>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          name='status'
                          value='out-of-stock'
                          checked={
                            editingProduct._id &&
                            editingProduct.stock != 'In Stock'
                          }
                          onChange={handleInputChange}
                          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500'
                        />
                        <span className='ml-2 text-sm'>Out of Stock</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className='mt-6 flex justify-end space-x-3'>
                  <button
                    type='button'
                    onClick={() => setIsFormOpen(false)}
                    className='px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 text-sm md:text-base'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-medium rounded-lg shadow hover:shadow-md transition-all text-sm md:text-base'
                  >
                    {editingProduct._id ? 'Update Product' : 'Add Product'}
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

export default ProductManagement
