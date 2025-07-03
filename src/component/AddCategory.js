import React from 'react'
import { useCreateCategoryMutation } from '../redux/api'

const AddCategoryDialog = ({ isOpen, onClose, onSubmit }) => {
  const [categoryName, setCategoryName] = React.useState('')
  const [image, setImage] = React.useState(null)
  const [createCategory, result] = useCreateCategoryMutation()

  const handleSubmit = e => {
    e.preventDefault()

    if (categoryName && image) {
      const formData = new FormData()
      formData.append('name', categoryName)
      formData.append('image', image) // Binary file

      createCategory(formData) // RTK Query will handle the request

      setCategoryName('')
      setImage(null)
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40'>
          {/* Drawer */}
          <div className='bg-white rounded-t-xl w-full max-w-md p-6 relative animate-slide-up'>
            {/* Close Icon */}
            <button
              className='absolute top-2 right-4 text-gray-600 hover:text-black text-2xl font-bold'
              onClick={onClose}
            >
              &times;
            </button>

            <h2 className='text-xl font-semibold mb-4 text-center'>
              Add New Category
            </h2>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Category Name */}
              <div>
                <label className='block text-gray-700 mb-1'>
                  Category Name
                </label>
                <input
                  type='text'
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter category name'
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className='block text-gray-700 mb-1'>Upload Image</label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={e => setImage(e.target.files[0])}
                  className='w-full'
                  required
                />
              </div>

              {/* Submit Button */}
              <div className='text-center'>
                <button
                  type='submit'
                  className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg'
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AddCategoryDialog
