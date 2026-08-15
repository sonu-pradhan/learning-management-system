import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '@/api/courseProgressApi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseProgress = () => {
    const params = useParams();
    const courseId = params.courseId;

    const [currentLecture, setCurrentLecture] = useState(null);


    const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
    const [updateLectureProgress] = useUpdateLectureProgressMutation();
    const [
        completeCourse,
        { data: markCompleteData, isSuccess: completedSuccess },
    ] = useCompleteCourseMutation();
    const [
        inCompleteCourse,
        { data: markInCompleteData, isSuccess: inCompleteSuccess },
    ] = useInCompleteCourseMutation();

    useEffect(() => {
        if (completedSuccess) {
            refetch();
            toast.success(markCompleteData.message);
        }
        if (inCompleteSuccess) {
            refetch();
            toast.success(markInCompleteData.message);
        }
    }, [completedSuccess, inCompleteSuccess]);

    if (isLoading) return <p>Loading ...</p>;
    if (isError) return <p>Failed to load course details</p>

    const { courseDetails, progress, completed } = data.data;

    const initialLecture = currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

    const isLectureCompleted = (lectureId) => {
        return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
    };

    const handleSelectLecture = (lecture) => {
        setCurrentLecture(lecture);
    };

    const handleLectureProgress = async (lectureId) => {
        await updateLectureProgress({ courseId, lectureId });
        refetch();
    };

    const handleCompleteCourse = async () => {
        await completeCourse(courseId);
    };
    const handleInCompleteCourse = async () => {
        await inCompleteCourse(courseId);
    };


    return (
        <div className="max-w-7xl mx-auto p-4 mt-24">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">{courseDetails?.courseTitle}</h1>
                <Button
                    onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
                    variant={completed ? "outline" : "default"}
                >
                    {completed ? (
                        <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
                        </div>
                    ) : (
                        "Mark as completed"
                    )}
                </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 md:w-2/3 h-fit rounded-lg shadow-lg p-4">
                    <div>
                        <video
                            key={currentLecture?._id || initialLecture._id}
                            className="w-full max-h-120 h-auto md:rounded-lg"
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            onEnded={() =>
                                handleLectureProgress(currentLecture?._id || initialLecture._id)}
                        >
                            <source
                                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                    <div className="mt-2">
                        <h3 className="font-medium text-lg">
                            {`Lecture ${courseDetails.lectures.findIndex(
                                (lec) =>
                                    lec._id === (currentLecture?._id || initialLecture._id)
                            ) + 1
                                } : ${currentLecture?.lectureTitle || initialLecture.lectureTitle
                                }`}
                        </h3>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
                    <h1 className="font-semibold text-xl mb-4">Course Lectures</h1>
                    <div className="flex-1 overflow-y-auto">
                        {
                            courseDetails?.lectures.map((lecture) => (
                                <Card onClick={() => handleSelectLecture(lecture)} key={lecture._id} className={`mb-3 hover:cursor-pointer transition transform ${lecture._id === currentLecture?._id
                                    ? "bg-gray-200 dark:dark:bg-gray-800"
                                    : ""
                                    } `}>
                                    <CardContent className="flex p-2 items-center justify-between">
                                        <div className="flex items-center">
                                            {isLectureCompleted(lecture._id) ? (
                                                <CheckCircle2 size={24} className="text-green-700 mr-2" />
                                            ) : (
                                                <CirclePlay size={24} className="text-gray-500 mr-2" />
                                            )}
                                            <div>
                                                <CardTitle className="text-lg hover:text-blue-800 hover:underline font-medium">
                                                    {lecture.lectureTitle}
                                                </CardTitle>
                                            </div>
                                        </div>
                                        {isLectureCompleted(lecture._id) && (
                                            <Badge
                                                variant={"outline"}
                                                className="bg-green-200 text-green-600"
                                            >
                                                Completed
                                            </Badge>
                                        )}
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CourseProgress
