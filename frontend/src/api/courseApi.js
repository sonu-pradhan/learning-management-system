import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = import.meta.env.VITE_COURSE_URL;

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Refetch_Courses_By_Admin", "Edited_Course", "Added_Lecture"],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        addCourse: builder.mutation({
            query: ({ courseTitle, category, level }) => ({
                url: "",
                method: "POST",
                body: { courseTitle, category, level }
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
            query: ({ formData, courseId }) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Refetch_Courses_By_Admin", "Edited_Course",]
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET",
            }),
            providesTags: ["Edited_Course"]
        }),
        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `/${courseId}/lectures`,
                method: "POST",
                body: { lectureTitle },
            }),
            invalidatesTags: (result, error, {courseId}) => [
                { type: "Added_Lecture", id: courseId }
            ],
        }),
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lectures`,
                method: "GET",
            }),
            providesTags: (result, error, courseId) => [
                { type: "Added_Lecture", id: courseId }
            ],
        }),
    })
})

export const { useAddCourseMutation, useGetCoursesByAuthorQuery, useEditCourseMutation, useGetCourseByIdQuery, useCreateLectureMutation, useGetCourseLectureQuery } = courseApi;