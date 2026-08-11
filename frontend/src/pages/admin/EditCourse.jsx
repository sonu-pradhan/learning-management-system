import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseTab from "./CourseTab";
import { ArrowLeft, ArrowRight } from "lucide-react";

const EditCourse = () => {

    const navigate = useNavigate();

    return (
        <div className="flex-1 mt-24">
            <Button onClick={()=> navigate("/admin/courses")} variant="ghost" className="gap-2 mb-4 cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center justify-between mb-5">
                <h1 className="font-bold text-xl">
                    Add detail information regarding course
                </h1>
                <Link to ="lectures">
                    <Button className="hover:text-blue-600 cursor-pointer mr-12" variant="link">Go to lectures page<ArrowRight /></Button>
                </Link>
            </div>
            <CourseTab />
        </div>
    );
};

export default EditCourse;