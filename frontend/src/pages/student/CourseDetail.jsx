import BuyCourseButton from '@/components/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import React from 'react'

const CourseDetail = () => {
    const purchasedCourse = false;
    return (
        <div className="mt-18 space-y-5">
            <div className="bg-[#2f494c] text-white">
                <div className="max-w-7xl mx-auto py-4 px-4 flex flex-col gap-2">
                    <h1 className="font-bold text-2xl md:text-3xl">course title</h1>
                    <p>course sub title</p>
                    <p>created by{" "} <span className="underline italic">john cena</span></p>
                    <div className="flex items-center gap-2 text-sm">
                        <BadgeInfo size={16} />
                        <p>Last Updated on 12.8.26</p>
                    </div>
                    <p>Students enrolled: 24</p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto my-5 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
                <div className="w-full lg:w-1/2 space-y-5">
                    <h1 className="font-bold text-cl md:text-2xl">Description</h1>
                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, minima? Ex, quis maxime. Officia cupiditate qui enim maxime magni exercitationem sed labore mollitia aliquam ad dolorem, facere sunt minima autem.</p>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course content</CardTitle>
                            <CardDescription>7 lectures</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {
                                [1, 3, 4].map((lecutre, index) => (
                                    <div className="mb-2 flex items-center gap-3 text-sm" key={index}>
                                        <span>
                                            {
                                                true ? (<PlayCircle size={14} />) : (<Lock size={14} />)
                                            }
                                        </span>
                                        <p>lecture title</p>
                                    </div>
                                ))
                            }
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full lg:w-1/3">
                    <Card>
                        <CardContent className="p-2 flex flex-col">
                            <div className="w-full aspect-video mb-4">video</div>
                            <h1>Lecture Title</h1>
                            <Separator className="my-2" />
                            <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
                            <div className="flex justify-center p-1">
                                {
                                    purchasedCourse ? (<Button className="w-full h-10 bg-[#2f494c] cursor-pointer">Countinue</Button>) : <BuyCourseButton />
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
