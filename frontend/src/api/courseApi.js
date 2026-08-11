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
        getPublishedCourse: builder.query({
            query: () => ({
                url: "/published-courses",
                method: "GET",
            }),
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
            invalidatesTags: (result, error, { courseId }) => [
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
        editLecture: builder.mutation({
            query: ({
                lectureTitle,
                videoInfo,
                isPreviewFree,
                courseId,
                lectureId,
            }) => ({
                url: `/${courseId}/lectures/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isPreviewFree },
            }),
        }),
        removeLecture: builder.mutation({
            query: ({ lectureId }) => ({
                url: `/lectures/${lectureId}`,
                method: "DELETE",
            }),

            invalidatesTags: (result, error, { courseId }) => [
                { type: "Added_Lecture", id: courseId }
            ],
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lectures/${lectureId}`,
                method: "GET",
            }),
        }),
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `/${courseId}?publish=${query}`,
                method: "PATCH",
            }),
        }),
        removeCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Refetch_Courses_By_Admin"]
        })
    })
})

export const { useAddCourseMutation, useGetCoursesByAuthorQuery, useEditCourseMutation, useGetCourseByIdQuery, useCreateLectureMutation, useGetCourseLectureQuery, useEditLectureMutation, useRemoveLectureMutation, useGetLectureByIdQuery, usePublishCourseMutation, useRemoveCourseMutation, useGetPublishedCourseQuery } = courseApi;