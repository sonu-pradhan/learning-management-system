import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'
import { ArrowLeft } from 'lucide-react'

const EditLecture = () => {
    const params = useParams();
    const courseId = params.courseId;

    return (
        <div>
            <div className="flex items-center justify-between mt-24">
                <div className="flex items-center gap-2">
                    <Link to={`/admin/courses/${courseId}/lectures`}>
                        <Button size="icon" variant='outline' className="rounded-full cursor-pointer">
                            <ArrowLeft size={16} />
                        </Button>
                    </Link>
                    <h1 className="font-bold text-xl text-zinc-700 ml-4">Update your lecture</h1>
                </div>
            </div>
            <LectureTab />
        </div>
    )
}

export default EditLecture
