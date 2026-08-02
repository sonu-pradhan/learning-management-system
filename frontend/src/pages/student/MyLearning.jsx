import CourseCard from '@/components/CourseCard';
import React from 'react'

const MyLearning = () => {
    const isLoading = false;
    const enrolledCourses = [1,2];
    return (
        <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
            <h1 className="font-bold text-2xl">MY LEARNING</h1>
            <div className="my-5">
                {isLoading ? (
                    <MyLearningSkeleton />
                ) : (enrolledCourses.length === 0 ? ((<p>You have not enrolled for in any course</p>)) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[1,2].map((_, index) => (
                            <CourseCard key={index} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyLearning;

const MyLearningSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
            <div
                key={index}
                className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
            ></div>
        ))}
    </div>
);
