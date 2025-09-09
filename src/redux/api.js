import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-dominos-admin-pannel.onrender.com/api/',
    // baseUrl: 'http://localhost:5000/api/',
    prepareHeaders: headers => {
      const token = Cookies.get('accessToken') // or localStorage.getItem('accessToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['Admin', 'Category', 'product'],
  endpoints: build => ({
    getAdmins: build.query({
      query: () => 'v1/users/super-admin/get-admins',
      providesTags: ['Admin']
    }),

    getAdminById: build.query({
      query: id => `v1/users/super-admin/admin/${id}`,
      providesTags: ['Admin']
    }),
    getOrderById: build.query({
      query: id => `order`,
      providesTags: ['Admin']
    }),
    getOrderByfrenchie: build.query({
      query: id => `v1/order/fetch-order-by-frenchies`,
      providesTags: ['Admin']
    }),
    getCurrentUser: build.query({
      query: id => `auth/check-token`,
      providesTags: id => [{ type: 'Admin', id }]
    }),

    AllLogin: build.mutation({
      query: newAdmin => ({
        url: 'auth/login',
        method: 'POST',
        body: newAdmin
        // credentials: 'include' // ✅ Required for sending cookies
      }),
      invalidatesTags: ['Admin']
    }),

    updateProfileImage: build.mutation({
      query: (formData) => ({
        url: `auth/profile/image`, // 👈 aapka backend route
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Admin"], // 👈 taaki getCurrentUser refetch ho jaye
    }),

    logout: build.mutation({
      query: newAdmin => ({
        url: 'v1/users/logout',
        method: 'POST',
        body: newAdmin
      }),
      invalidatesTags: ['Admin']
    }),

    getAllVender: build.query({
      query: () =>
        `franchise`,
      providesTags: ['Admin']
    }),
    getFranchiseById: build.query({
      query: (id) =>
        `franchise/${id}`,
      providesTags: ['Admin']
    }),

    createAdminBySuperAdmin: build.mutation({
      query: newAdmin => ({
        url: 'franchise',
        method: 'POST',
        body: newAdmin
      }),
      invalidatesTags: ['Admin']
    }),

    activeFrenchies: build.mutation({
      query: body => ({
        url: `franchise/${body.vendorId}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Admin']
    }),

    updateAdmin: build.mutation({
      query: ({ id, ...data }) => ({
        url: `v1/users/super-admin/admin/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Admin', id }]
    }),

    deleteAdmin: build.mutation({
      query: id => ({
        url: `v1/users/super-admin/admin/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Admin', id }]
    }),

    getAllProduct: build.query({
      query: () => `product`,
      providesTags: ['product']
    }),

    addProduct: build.mutation({
      query: (formData) => ({
        url: 'product',
        method: 'POST',
        body: formData,   // FormData bhejna hai
      }),
      invalidatesTags: ['product']
    }),

    updateProduct: build.mutation({
      query: ({ id, formData }) => ({
        url: `product/${id}`,
        method: 'PUT',
        body: formData // ✅ abhi bhi FormData jaayega
      }),
      invalidatesTags: ['product']
    })
    ,

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['product']
    }),




    getAllCategory: build.query({
      query: () => `category`,
      providesTags: id => [{ type: 'Category', id }]
    }),
    CreateCategory: build.mutation({
      query: newAdmin => ({
        url: 'category',
        method: 'POST',
        body: newAdmin
      }),
      invalidatesTags: ['Category']
    }),
    updatePassword: build.mutation({
      query: ({ id, ...data }) => ({
        url: `v1/users/update-password`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Admin']
    }),
    updateFrenchie: build.mutation({
      query: formData => ({
        url: `v1/users/frenchies/update-details-frenchie`,
        method: 'PUT',
        body: formData // formData directly
      }),
      invalidatesTags: ['Admin']
    })
  })
})

export const {
  useGetAdminsQuery,
  useGetAdminByIdQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useAllLoginMutation,
  useCreateAdminBySuperAdminMutation,
  useGetAllVenderQuery,
  useGetCurrentUserQuery,
  useAddProductMutation,
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useGetAllProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useLogoutMutation,
  useUpdatePasswordMutation,
  useUpdateFrenchieMutation,
  useActiveFrenchiesMutation,
  useGetOrderByIdQuery,
  useGetOrderByfrenchieQuery,
  useUpdateProfileImageMutation,
  useGetFranchiseByIdQuery,
  // useUpdateProductMutation , 
} = pokemonApi
