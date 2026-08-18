import { useGetCourseDeatailWithStatusQuery } from '@/api/purchaseApi'
import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CourseDetail = () => {
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();

    const { data, isLoading, isError } = useGetCourseDeatailWithStatusQuery(courseId);

    if (isLoading) return <h1> Loading ...</h1>
    if (isError) return <h1>Failed to load course details</h1>

    const { course, purchased } = data;

    const handleContinueCourse = () => {
        if (purchased) {
            navigate(`/course-progress/${courseId}`)
        }
    }

    return (
        <div className="mt-18 space-y-5">
            <div className="bg-[#2f494c] dark:bg-[linear-gradient(180deg,#000_0%,#000_5%,#000_10%,#000_15%,#000_20%,#000_25%,#000001_30%,#000003_35%,#020306_40%,#040508_45%,#06070a_50%,#08090c_55%,#0a0b0e_60%,#0c0d10_65%,#0e0f12_70%,#0f1014_75%,#111216_80%,#121317_85%,#141419_90%,#15151a_95%,#16161b_100%)] text-white">
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
                            <CardDescription>{course?.lectures.length} Lectures</CardDescription>
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
                                <video
                                    className="w-full h-full"
                                    controls
                                    controlsList="nodownload"
                                    onContextMenu={(e) => e.preventDefault()}
                                >
                                    <source
                                        src={course?.lectures?.[0]?.videoUrl}
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                            <h1>{course.courseTitle}</h1>
                            <Separator className="my-2" />
                            {purchased ? "" : (<h1 className="text-lg md:text-xl font-semibold">₹{course?.coursePrice}</h1>)}
                            <div className="flex justify-center p-1">
                                {
                                    purchased ? (<Button onClick={handleContinueCourse} className="w-full h-10 bg-[#2f494c] dark:bg-[#0e0f12] dark:text-slate-200 cursor-pointer">Countinue</Button>) : <BuyCourseButton courseId={courseId} />
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
