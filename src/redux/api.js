import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-food-delivery-app-ffzz.onrender.com/api/',
    prepareHeaders: headers => {
      const token = Cookies.get('accessToken') // or localStorage.getItem('accessToken')
      if (token) {
        headers.set('Authorization', `${token}`)
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
      query: id => `v1/order/get-order-by-superAdmin/${id}`,
      providesTags: ['Admin']
    }),
    getOrderByfrenchie: build.query({
      query: id => `v1/order/fetch-order-by-frenchies`,
      providesTags: ['Admin']
    }),
    getCurrentUser: build.query({
      query: id => `v1/users/getcurrentuserdetails`,
      providesTags: id => [{ type: 'Admin', id }]
    }),

    AllLogin: build.mutation({
      query: newAdmin => ({
        url: 'v1/users/login',
        method: 'POST',
        body: newAdmin
        // credentials: 'include' // ✅ Required for sending cookies
      }),
      invalidatesTags: ['Admin']
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
      query: ({ page = 1, limit = 10 }) =>
        `v1/users/super-admin/getallfrenchies?page=${page}&limit=${limit}`,
      providesTags: ['Admin']
    }),

    createAdminBySuperAdmin: build.mutation({
      query: newAdmin => ({
        url: 'v1/users/super-admin/create-admin',
        method: 'POST',
        body: newAdmin
      }),
      invalidatesTags: ['Admin']
    }),

    activeFrenchies: build.mutation({
      query: body => ({
        url: `v1/users/super-admin/manage-frenchies`,
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
      query: () => `v1/product/getallproduct`,
      providesTags: ['product']
    }),

    addProduct: build.mutation({
      query: newAdmin => ({
        url: 'v1/product/create-product',
        method: 'POST',
        body: newAdmin
      }),
      invalidatesTags: ['product']
    }),

    updateProduct: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `v1/product/updateproduct/${id}`, // adjust to your API structure
        method: 'PUT', // or 'PATCH' if partial update
        body: updatedData
      }),
      invalidatesTags: ['product']
    }),

    deleteProduct: build.mutation({
      query: id => ({
        url: `v1/product/deleteproduct/${id}`, // assuming ID in URL
        method: 'DELETE'
      }),
      invalidatesTags: ['product']
    }),

    getAllCategory: build.query({
      query: () => `v1/category/getallcategory`,
      providesTags: id => [{ type: 'Category', id }]
    }),
    CreateCategory: build.mutation({
      query: newAdmin => ({
        url: 'v1/category/create-category',
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
  useGetOrderByfrenchieQuery
} = pokemonApi
