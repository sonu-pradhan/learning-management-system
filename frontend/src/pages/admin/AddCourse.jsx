import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAddCourseMutation } from '@/api/courseApi';
import { toast } from 'sonner';

const AddCourse = () => {

    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");

    const [addCourse, { data, isLoading, error, isSuccess }] =
        useAddCourseMutation();


    const navigate = useNavigate();

    const getSelectedCategory = (value) => {
        setCategory(value);
    }
    const selectCourseLevel = (value) => {
        setLevel(value);
    };

    const createCourseHandler = async () => {
        await addCourse({ courseTitle, category, level });
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Added new course");
            navigate("/admin/courses");
        }
    }, [isSuccess, error])

    return (
        <div className="flex-1 mx-10 mt-24">
            <div className="mb-4">
                <h1 className="font-bold text-xl">Teach What You Know. Inspire What’s Next.</h1>
                <h1 className="text-sm">Create. Teach. Inspire.</h1>
            </div>
            <div className="space-y-4">
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="Your Course Name"
                    />
                </div>
                <div className="flex items-center gap-5">
                    <div>
                        <Label>Category</Label>
                        <Select onValueChange={getSelectedCategory}>
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="AI">AI</SelectItem>
                                    <SelectItem value="Cloud Engineering">Cloud Engineering</SelectItem>
                                    <SelectItem value="CyberSecurity">
                                        CyberSecurity
                                    </SelectItem>
                                    <SelectItem value="Computer Science core">Computer Science core</SelectItem>
                                    <SelectItem value="Software Testing">Database</SelectItem>
                                    <SelectItem value="Data Science">
                                        Data Science
                                    </SelectItem>
                                    <SelectItem value="Web Development">
                                        Web Development
                                    </SelectItem>
                                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                                    <SelectItem value="Programming Languages">Programming Languages</SelectItem>
                                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                                    <SelectItem value="System Design">System Design</SelectItem>
                                    <SelectItem value="Software Testing">Software Testing</SelectItem>
                                    <SelectItem value="Others">Others</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label className="mb-2">Course Level</Label>
                        <Select onValueChange={selectCourseLevel}>
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
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => navigate("/admin/courses")}>
                        Back
                    </Button>
                    <Button className="bg-[#415d60] cursor-pointer" disabled={isLoading} onClick={createCourseHandler}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Create"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourse
