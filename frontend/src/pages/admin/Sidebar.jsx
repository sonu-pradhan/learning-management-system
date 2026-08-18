import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="mt-24 w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-300 dark:border-gray-700 p-4 lg:p-5 lg:sticky lg:top-0">
                <div className="flex flex-row lg:flex-col gap-4 lg:gap-8">
                    <Link to="/admin" className="flex items-center gap-2">
                        <ChartNoAxesColumn size={22} />
                        <h1>Dashboard</h1>
                    </Link>
                    <Link to="courses" className="flex items-center gap-2">
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>
            <div className="flex-1 p-4 sm:p-6 lg:p-10 ">
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;