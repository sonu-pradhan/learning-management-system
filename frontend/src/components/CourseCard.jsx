import React from 'react'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const CourseCard = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl mt-6 transform hover:scale-105 transition-all duration-300">
      <div className="relative  cursor-pointer">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl_YD7wKeqNW-kLgvBEUnKEZ2S1Qjmuy4yk5IVGEPFQQ&s=10"
          alt="course"
          className="w-full h-42 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="px-5 py-1 space-y-3">
        <h1 className="hover:underline font-bold border-b text-lg truncate">
          Docker Full course 2026 | English
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">John Cena</h1>
          </div>
          <Badge className="bg-[#385356] px-2 py-1 text-xs rounded-full">
            Medium
          </Badge>
        </div>
        <div className=" text-zinc-800 font-bold">
            <span>₹299</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
