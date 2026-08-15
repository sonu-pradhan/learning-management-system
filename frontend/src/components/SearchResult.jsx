import React from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/badge';

const SearchResult = () => {
    const courseId = 4893;
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
            <Link
                to={`/course-detail/${courseId}`}
                className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
            >
                <img
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYNYwNVToAvArFIaoIZLG-mtkN0QY9J0tt3QJsVV9kg&s=10"}
                    alt="course-thumbnial"
                    className="h-32 w-full md:w-56 object-cover rounded"
                />
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-lg md:text-xl">Course Title</h1>
                    <p className="text-sm text-gray-600">Course subtitle</p>
                    <p className="text-sm mb-2 text-gray-700">
                        Intructor: <span className="font-bold">name</span>{" "}
                    </p>
                    <Badge className="w-fit bg-[#cbcaa5] text-zind-700 md:mt-0">course level</Badge>
                </div>
            </Link>
            <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
                <h1 className="font-bold text-lg md:text-xl">₹price</h1>
            </div>
        </div>
    )
}

export default SearchResult
