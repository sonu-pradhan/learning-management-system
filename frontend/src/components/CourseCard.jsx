import React from 'react'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl mt-6 transform hover:scale-105 transition-all duration-300">
      <div className="relative  cursor-pointer">
        <img
          src={course?.courseThumbnail || "https://i0.wp.com/picjumbo.com/wp-content/uploads/creative-designer-photographer-workspace-desk-setup-free-photo.jpg?w=2210&quality=70"}
          alt="course"
          className="w-full h-42 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-1 space-y-3">
        <h1 className="hover:underline font-bold border-b text-lg truncate">
          {course?.courseTitle}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={course?.author?.profilePhoto || "https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{course?.author?.name}</h1>
          </div>
          <Badge className="bg-[#385356] px-2 py-1 text-xs rounded-full">
            {course?.courseLevel}
          </Badge>
        </div>
        <div className=" text-zinc-800 font-bold">
            <span>₹{course?.coursePrice}</span>
        </div>
      </CardContent>
    </Card>
    </Link>
  )
}

export default CourseCard
