import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { CheckCircle2, CirclePlay } from 'lucide-react';
import React from 'react'

const CourseProgress = () => {

    const isCompleted = true;
    return (
        <div className="max-w-7xl mx-auto p-4 mt-24">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Course Title</h1>
                <Button className="bg-[#2f494c]">Completed</Button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 md:w-2/3 h-fit rounded-lg shadow-lg p-4">
                    <div>
                        <video />
                    </div>
                    <div className="mt-2">
                        <h3 className="font-medium text-lg">Lecture1: intro</h3>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
                    <h1 className="font-semibold text-xl mb-4">Course Lectures</h1>
                    <div className="flex-1 overflow-y-auto">
                        {
                            [1, 2, 3, 4].map((lecture, idx) => (
                                <Card key={idx} className="mb-3 hover:cursor-pointer transition transform">
                                    <CardContent className="flex p-2 items-center justify-between">
                                        <div className="flex items-center">
                                            { isCompleted ? (
                                                <CheckCircle2 size={24} className="text-green-700 mr-2" />
                                            ) : (
                                                <CirclePlay size={24} className="text-gray-500 mr-2" />
                                            )}
                                            <div>
                                                <CardTitle className="text-lg font-medium">
                                                    lecture title
                                                </CardTitle>
                                            </div>
                                        </div>
                                        { isCompleted && (
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
        </div>
    )
}

export default CourseProgress
