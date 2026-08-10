import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/api/courseApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { CircleQuestionMark, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const LectureTab = () => {
    const VIDEO_API = import.meta.env.VITE_VIDEO_URL;
    const params = useParams();
    const { courseId, lectureId } = params;
    const navigate = useNavigate();

    const { data: lectureData } = useGetLectureByIdQuery(lectureId);
    const lecture = lectureData?.lecture;

    const [lectureTitle, setLectureTitle] = useState("");
    const [isFree, setIsFree] = useState(false);
    const [uploadedVideoInfo, setUploadedVideoInfo] = useState(null);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        if (lecture) {
            setLectureTitle(lecture.lectureTitle);
            setIsFree(lecture.isPreviewFree);
        }
    }, [lecture])

    const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
    const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();


    const videoUploadHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            setMediaProgress(true);
            try {
                const res = await axios.post(`${VIDEO_API}/upload`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    },
                });
                if (res.data.success) {
                    setUploadedVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id,
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setMediaProgress(false)
            }
        }
    }

    const updateLectureHandler = async () => {
        await editLecture({
            lectureTitle,
            videoInfo: uploadedVideoInfo,
            isPreviewFree: isFree,
            courseId,
            lectureId,
        });
    };
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate(`/admin/courses/${courseId}/lectures`);
        }
        if (error) {
            toast.error(error?.data?.message);
        }
    }, [isSuccess, error]);

    const removeLectureHandler = async () => {
        await removeLecture({
            lectureId,
            courseId,
        }).unwrap();
    };

    useEffect(() => {
        if (removeSuccess) {
            toast.success(removeData?.message);
            navigate(`/admin/courses/${courseId}/lectures`);
        }
    }, [removeSuccess])


    return (
        <Card className="mt-4 ml-4">
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click save when done.</CardDescription>
                </div>
                <div>
                    <Button variant="destructive" className="cursor-pointer mr-24 mt-4" onClick={removeLectureHandler}>
                        {
                            removeLoading ? <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </> : "Remove Lecture"
                        }
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title -</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="Ex. Basic Setup"
                        className="mt-2"
                    />
                </div>
                <div className="my-5">
                    <Label>Video<span className="text-red-600">*</span></Label>
                    <Input
                        type="file"
                        accept="video/*"
                        onChange={videoUploadHandler}
                        placeholder="Ex. Basic Setup"
                        className="w-1/4 mt-2"
                    />
                </div>
                {mediaProgress && (
                    <div className="my-4">
                        <Progress value={uploadProgress} className="w-1/4" />
                        <p>{uploadProgress}% uploaded</p>
                    </div>
                )}
                <div className="flex items-center space-x-2 my-7">
                    <CircleQuestionMark size={16} />
                    <Label htmlFor="airplane-mode">Is this video FREE?</Label>
                    <Switch id="airplane-mode" checked={isFree}
                        onCheckedChange={setIsFree} />
                </div>
                <div className="mt-7 ml-32">
                    <Button className="bg-[#415d60]" onClick={updateLectureHandler} disabled={isLoading || mediaProgress}>
                        {
                            (isLoading || mediaProgress) ? <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </> : "Update Lecture"
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab
