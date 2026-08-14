import { useGetCourseDeatailWithStatusQuery } from '@/api/purchaseApi'
import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

const CourseDetail = () => {
    const params = useParams();
    const courseId = params.courseId;

    const { data, isLoading, isError } = useGetCourseDeatailWithStatusQuery(courseId);

    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>Failed to load course details</h1>

    const { course, purchased } = data;
    console.log(course);

    return (
        <div className="mt-18 space-y-5">
            <div className="bg-[#2f494c] text-white">
                <div className="max-w-7xl mx-auto py-4 px-4 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-3xl">{course?.courseTitle}</h1>
                    <p>{course?.subTitle}</p>
                    <p>created by{" "} <span className="underline italic">{course?.author.name}</span></p>
                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo size={16} />
                        <p>Last Updated on {course?.createdAt.split("T")[0]}</p>
                    </div>
                    <p>Students enrolled: {course?.enrolledStudents.length}</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-5 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-cl md:text-2xl">Description</h1>
                    <p
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: course.description }}
                    />
                    <Card>
                        <CardHeader>
                            <CardTitle>Course content</CardTitle>
                            <CardDescription>7 lectures</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {
                                course?.lectures.map((lecture, index) => (
                                    <div className="mb-2 flex items-center gap-3 text-sm" key={index}>
                                        <span>
                                            {
                                                true ? (<PlayCircle size={14} />) : (<Lock size={14} />)
                                            }
                                        </span>
                                        <p>{lecture?.lectureTitle}</p>
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card>
                        <CardContent className="p-2 flex flex-col">
                            <div className="w-full aspect-video mb-4">
                                <ReactPlayer
                                    width="100%"
                                    height={"100%"}
                                    src={course?.lectures[0]?.videoUrl}
                                    controls={true}
                                />
                            </div>
                            <h1>Lecture Title</h1>
                            <Separator className="my-2" />
                            {purchased ? "" : (<h1 className="text-lg md:text-xl font-semibold">₹{course?.coursePrice}</h1>)}
                            <div className="flex justify-center p-1">
                                {
                                    purchased ? (<Button className="w-full h-10 bg-[#2f494c] cursor-pointer">Countinue</Button>) : <BuyCourseButton courseId={courseId} />
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
