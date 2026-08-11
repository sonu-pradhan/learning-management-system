import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation, useRemoveCourseMutation } from '@/api/courseApi';
import Tiptap from '@/components/TiptapTextEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {

    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: 0,
        courseThumbnail: "",
    });
    const params = useParams();
    const courseId = params.courseId;
    const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId);
    const [previewThumbnail, setPreviewThumbnail] = useState("");

    const [editCourse, { data, isLoading, isSuccess, error }] = useEditCourseMutation();

    const [publishCourse] = usePublishCourseMutation();

    const [removeCourse, { isLoading: removeIsLoading }] = useRemoveCourseMutation();

    useEffect(() => {
        if (courseByIdData?.course) {
            const course = courseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: "",
            });
        }
    }, [courseByIdData]);

    const selectCategory = (value) => {
        setInput({ ...input, category: value });
    };
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
    };

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const publishStatusHandler = async (action) => {
        try {
            const response = await publishCourse({ courseId, query: action });
            if (response?.data) {
                refetch();
                console.log(response?.data);
                toast.success(response?.data.message);
            }
        } catch (error) {
            toast.error("Failed to update");
        }
    };

    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("subTitle", input.subTitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        if (input.coursePrice) {
            formData.append("coursePrice", input.coursePrice);
        }
        if (input.courseThumbnail) {
            formData.append("courseThumbnail", input.courseThumbnail);
        }

        await editCourse({ formData, courseId });

    }


    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course update.");
            navigate("/admin/courses")
        }
        if (error) {
            toast.error(error?.data?.message || "Failed to update course");
        }
    }, [isSuccess, error]);

    if (courseByIdLoading) return <h1>Loading...</h1>

    const removeCourseHandler = async () => {
        try {
            const result = await removeCourse(courseId).unwrap();

            console.log(result);
            toast.success(result.message);
            navigate("/admin/courses")
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || "Failed to remove course");
        }
    };

    if (removeIsLoading) return <h1> <Loader2 className="mr-2 h-4 w-4 animate-spin" />please wait</h1>

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you're done.
                    </CardDescription>
                </div>
                <div className="space-x-2">
                    <Button disabled={courseByIdData?.course.lectures.length === 0} variant="outline" onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")} >
                        {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button className="cursor-pointer" onClick={removeCourseHandler} variant="destructive">Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label className="mb-2">Title</Label>
                        <Input
                            type="text"
                            name="courseTitle"
                            value={input.courseTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Fullstack developer"
                        />
                    </div>
                    <div>
                        <Label className="mb-2">Subtitle</Label>
                        <Input
                            type="text"
                            name="subTitle"
                            value={input.subTitle}
                            onChange={changeEventHandler}
                            placeholder="Ex. Become a Fullstack developer from basic to advance in 4 months"
                        />
                    </div>
                    <div>
                        <Label className="mb-2">Description</Label>
                        <Tiptap input={input} setInput={setInput} />
                    </div>
                    <div className="flex items-center gap-5">
                        <div>
                            <Label className="mb-2">Category</Label>
                            <Select value={input.category} onValueChange={selectCategory}>
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Next JS">Next JS</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="Frontend Development">
                                            Frontend Development
                                        </SelectItem>
                                        <SelectItem value="Fullstack Development">
                                            Fullstack Development
                                        </SelectItem>
                                        <SelectItem value="MERN Stack Development">
                                            MERN Stack Development
                                        </SelectItem>
                                        <SelectItem value="Javascript">Javascript</SelectItem>
                                        <SelectItem value="Python">Python</SelectItem>
                                        <SelectItem value="Docker">Docker</SelectItem>
                                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                                        <SelectItem value="HTML">HTML</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="mb-2">Course Level</Label>
                            <Select value={input.courseLevel} onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-45">
                                    <SelectValue placeholder="Select a course level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Course Level</SelectLabel>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className="mb-2">Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEventHandler}
                                placeholder="199"
                                className="w-fit"
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="mb-2">Course Thumbnail</Label>
                        <Input
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-fit"
                        />
                        {previewThumbnail && (
                            <img
                                src={previewThumbnail}
                                className="w-64 my-2"
                                alt="Course Thumbnail"
                            />
                        )}
                    </div>
                    <div>
                        <Button onClick={() => navigate("/admin/courses")} variant="outline">
                            Cancel
                        </Button>
                        <Button className="bg-[#415d60] cursor-pointer" onClick={updateCourseHandler} disabled={isLoading}>
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
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab
