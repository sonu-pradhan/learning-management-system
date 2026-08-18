import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useGetCoursesByAuthorQuery } from '@/api/courseApi'
import { Badge } from '@/components/ui/badge'
import { Edit } from 'lucide-react'

const CourseTable = () => {

    const { data, isLoading } = useGetCoursesByAuthorQuery();
    const navigate = useNavigate();

    console.log(data)

    return (
        <div className="mt-24">
            <Button className="bg-[#415d60] mb-4 cursor-pointer dark:text-white" onClick={() => navigate("/admin/courses/add")}>Create a new course</Button>
            <Table>
                <TableCaption>A list of your recent courses</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-25">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.courses?.map((course) => (
                        <TableRow key={course?._id}>
                            <TableCell className="font-medium">
                                {course?.coursePrice || "NA"}
                            </TableCell>

                            <TableCell>
                                <Badge className="bg-[#cbcaa5] text-gray-800">
                                    {course?.isPublished ? "Published" : "Unpublished"}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {course?.courseTitle}
                            </TableCell>

                            <TableCell className="text-right">
                                <Button size="icon" className="cursor-pointer" variant="ghost" onClick={() => navigate(`${course?._id}`)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CourseTable
