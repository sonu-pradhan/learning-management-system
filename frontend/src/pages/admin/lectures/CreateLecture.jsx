import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/api/courseApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {

    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId

    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();

    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId });
    };

    const {
        data: lectureData,
        isLoading: lectureLoading,
        isError: lectureError,
    } = useGetCourseLectureQuery(courseId);

    console.log(lectureData);

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message);
        }
        if (error) {
            toast.error(error.data.message);
        }
    }, [isSuccess, error]);

    const navigate = useNavigate();

    return (
        <div className="flex-1 mx-10 mt-24">
            <div className="mb-4">
                <h1 className="font-bold text-xl">Upload lectures </h1>
            </div>
            <div className="space-y-4">
                <div>
                    <Label className="mb-2">Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="Lecture Name"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate(`/admin/courses/${courseId}`)}>
                        Back
                    </Button>
                    <Button className="bg-[#415d60] cursor-pointer" disabled={isLoading} onClick={createLectureHandler}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Save"
                        )}
                    </Button>
                </div>
                <div className="mt-10">
                    {lectureLoading ? (
                        <p>Loading lectures...</p>
                    ) : lectureError ? (
                        <p>Failed to load lectures.</p>
                    ) : lectureData.lectures.length === 0 ? (
                        <p>No lectures availabe</p>
                    ) : (
                        lectureData.lectures.map((lecture, index) => (
                            <Lecture
                                key={lecture._id}
                                lecture={lecture}
                                courseId={courseId}
                                index={index}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateLecture
