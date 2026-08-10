import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { CircleQuestionMark, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const LectureTab = () => {
    const VIDEO_API = import.meta.env.VITE_VIDEO_URL;

    const [uploadedVideoInfo, setUploadedVideoInfo] = useState(null);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

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
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error);
                toast.error("video upload failed");
            } finally {
                setMediaProgress(false)
            }
        }
    }

    const updateLectureHandler = async () => {
        console.log("Updating lecture...");
        console.log(uploadedVideoInfo);
    };

    const params = useParams();
    const courseId = params.courseId;

    const isLoading = false;

    return (
        <Card className="mt-4 ml-4">
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click save when done.</CardDescription>
                </div>
                <div>
                    <Link to={`/admin/courses/${courseId}/lectures`}>
                        <Button variant="destructive" className="cursor-pointer mr-24 mt-4">Remove Lecture</Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title -</Label>
                    <Input
                        type="text"
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
                    <Switch id="airplane-mode" />
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
