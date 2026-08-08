import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = import.meta.env.VITE_COURSE_URL;

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Refetch_Courses_By_Admin"],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        addCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "",
                method: "POST",
                body: { courseTitle, category }
            }),
            invalidatesTags: ["Refetch_Courses_By_Admin"]
        }),
        getCoursesByAuthor: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ["Refetch_Courses_By_Admin"]
        }),
        editCourse: builder.mutation({
            query: ({formData, courseId}) => ({
                url: `/${courseId}`,
                method:"PUT",
                body:formData,
            })
        })
    })
})

export const { useAddCourseMutation, useGetCoursesByAuthorQuery, useEditCourseMutation } = courseApi;