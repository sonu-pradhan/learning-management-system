import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = import.meta.env.VITE_PURCHASE_URL;

export const purchaseApi = createApi({
    reducerPath: "purchaseApi",
    tagTypes: ["CoursePurchase"],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PURCHASE_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createRazorpayOrder: builder.mutation({
            query: (courseId) => ({
                url: "/create-order",
                method: "POST",
                body: { courseId },
            }),
        }),
        verifyRazorpayPayment: builder.mutation({
            query: (paymentData) => ({
                url: "/verify-payment",
                method: "POST",
                body: paymentData,
            }),
            invalidatesTags: ["CoursePurchase"],
        }),
        getCourseDeatailWithStatus: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/detail-with-status`,
                method: "GET"
            }),
            providesTags: ["CoursePurchase"],
        }),
        getPurchasedCourses: builder.query({
            query: () => ({
                url: `/`,
                method: "GET",
            }),
        }),
    })
})

export const { useCreateRazorpayOrderMutation, useVerifyRazorpayPaymentMutation, useGetCourseDeatailWithStatusQuery, useGetPurchasedCoursesQuery } = purchaseApi;