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

const CourseTable = () => {
    const navigate = useNavigate();

    return (
        <div className="mt-24">
            <Button onClick={() => navigate("/admin/courses/add")}>Create a new course</Button>
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
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default CourseTable
