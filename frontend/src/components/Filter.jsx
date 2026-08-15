import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const categories = [
    { id: "ai", label: "AI" },
    { id: "cloud engineering", label: "Cloud Engineering" },
    { id: "cybersecurity", label: "CyberSecurity" },
    { id: "cs core", label: "CS Core" },
    { id: "database", label: "Database" },
    { id: "data science", label: "Data Science" },
    { id: "web development", label: "Web Development" },
    { id: "mobile development", label: "Mobile Development" },
    { id: "programming language", label: "Programming Languages" },
    { id: "machine learning", label: "Machine Learning" },
    { id: "system design", label: "System Design" },
    { id: "others", label: "Others" },
];

const Filter = () => {

    const handleCategoryChange = (categoryId) => (
        console.log(categoryId)
    );

    return (
        <div className="w-full md:w-[20%]">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg md:text-xl">Filter Courses</h1>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by Price</SelectLabel>
                            <SelectItem value="Low">Low to High</SelectItem>
                            <SelectItem value="High">High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Separator className="my-4" />
            <div>
                <h1 className="font-semibold mb-2">CATEGORY</h1>
                {categories.map((category) => (
                    <div className="flex items-center space-x-2 my-2">
                        <Checkbox
                            id={category.id}
                            onCheckedChange={() => handleCategoryChange(category.id)} 
                        />
                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {category.label}
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filter
