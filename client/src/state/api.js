import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Write the api slice

//The baseUrl will be attached beforehand to the paths you set. So can just write general/user etc
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard"
  ],
  endpoints: (build) => ({
    getUser: build.query({
      //Shorthand
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers/",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      //You only need to write your query like this whenever you need params. You need params because you are
      //passing data/attributes from MUI to query the backend
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"]
    }),
    getUserPerformance: build.query({
      query: (id) =>   `management/performance/${id}`,
      providesTags: ["Performance"]
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: "Dashboard"
    })
  }),
});

//Important for this hook, add 'use' as prefix and 'Query' as suffix. Also, capitalise all characters in your hook except for use
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery
} = api;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
//   reducerPath: "adminApi",
//   tagTypes: [
//     "User",
//     "Products",
//     "Customers",
//     "Transactions",
//     "Geography",
//     "Sales",
//     "Admins",
//     "Performance",
//     "Dashboard",
//   ],
//   endpoints: (build) => ({
//     getUser: build.query({
//       query: (id) => `general/user/${id}`,
//       providesTags: ["User"],
//     }),
//     getProducts: build.query({
//       query: () => "client/products",
//       providesTags: ["Products"],
//     }),
//     getCustomers: build.query({
//       query: () => "client/customers",
//       providesTags: ["Customers"],
//     }),
//     getTransactions: build.query({
//       query: ({ page, pageSize, sort, search }) => ({
//         url: "client/transactions",
//         method: "GET",
//         params: { page, pageSize, sort, search },
//       }),
//       providesTags: ["Transactions"],
//     }),
//     getGeography: build.query({
//       query: () => "client/geography",
//       providesTags: ["Geography"],
//     }),
//     getSales: build.query({
//       query: () => "sales/sales",
//       providesTags: ["Sales"],
//     }),
//     getAdmins: build.query({
//       query: () => "management/admins",
//       providesTags: ["Admins"],
//     }),
//     getUserPerformance: build.query({
//       query: (id) => `management/performance/${id}`,
//       providesTags: ["Performance"],
//     }),
//     getDashboard: build.query({
//       query: () => "general/dashboard",
//       providesTags: ["Dashboard"],
//     }),
//   }),
// });

// export const {
//   useGetUserQuery,
//   useGetProductsQuery,
//   useGetCustomersQuery,
//   useGetTransactionsQuery,
//   useGetGeographyQuery,
//   useGetSalesQuery,
//   useGetAdminsQuery,
//   useGetUserPerformanceQuery,
//   useGetDashboardQuery,
// } = api;
