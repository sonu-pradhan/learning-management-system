import React, { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const categories = [
    { id: "AI", label: "AI" },
    { id: "Cloud Engineering", label: "Cloud Engineering" },
    { id: "CyberSecurity", label: "CyberSecurity" },
    { id: "Computer Science core", label: "CS Core" },
    { id: "Database", label: "Database" },
    { id: "Data Science", label: "Data Science" },
    { id: "Web Development", label: "Web Development" },
    { id: "Mobile Development", label: "Mobile Development" },
    { id: "Programming Languages", label: "Programming Languages" },
    { id: "Machine Learning", label: "Machine Learning" },
    { id: "System Design", label: "System Design" },
    { id: "Software Testing", label: "Software Testing" },
    { id: "Others", label: "Others" },
];

const Filter = ({ handleFilterChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortByPrice, setSortByPrice] = useState("");

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prevCategories) => {
            const newCategories = prevCategories.includes(categoryId)
                ? prevCategories.filter((id) => id !== categoryId)
                : [...prevCategories, categoryId];

            handleFilterChange(newCategories, sortByPrice);
            return newCategories;
        });
    };

    const selectByPriceHandler = (selectedValue) => {
        setSortByPrice(selectedValue);
        handleFilterChange(selectedCategories, selectedValue);
    }

    return (
        <div className="w-full md:w-[20%]">
            <div className="flex items-center justify-between">
                <h1 className="font-semibold text-lg md:text-xl">Filter Courses</h1>
                <Select onValueChange={selectByPriceHandler}>
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
