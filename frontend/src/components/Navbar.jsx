import { Button } from "./ui/button";
import { LibraryBig, LogOut, Menu } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from "./DarkMode";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {

    const user = true;
    const role = "instructor";
    return (
        <div className="h-18 dark:bg-[#0A0A0A] border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className="flex items-center gap-2">
                    <LibraryBig size={"25"} className="text-slate-800" />
                    <h1 className="hidden md:block font-extrabold text-2xl text-slate-800">Learn <span className="text-indigo-600 dark:text-white">Infinity</span></h1>
                </div>
                <div className="flex justify-center items-center gap-5 ">
                    {
                        user ?
                            (<DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar size="lg">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                                    <AvatarFallback>LR</AvatarFallback>
                                </Avatar></Button>} />
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>My Learning</DropdownMenuItem>
                                        {role === "instructor" && (<DropdownMenuItem>Dashboard</DropdownMenuItem>)}
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem variant="destructive">Logout<LogOut className="ml-8" /></DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>) :
                            (<div className="flex items-center cursor-pointer gap-2">
                                <Button variant="outline">Login</Button>
                                <Button variant="outline">SignUp</Button>
                            </div>)
                    }<div className="pl-5">
                        <DarkMode />
                    </div>
                </div>
            </div>
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <div className="flex items-center gap-2">
                    <LibraryBig size={"20"} className="text-slate-800" />
                    <h1 className="font-extrabold text-xl text-slate-800">Learn <span className="text-indigo-600 dark:text-white">Infinity</span></h1>
                </div>
                <MobileNavbar />
            </div>
        </div>
    )
}

export default Navbar

const MobileNavbar = () => {

    const user = true;
    const role = "instructor";

    return (
        <Sheet>
            <SheetTrigger render={<Button size="lg" className="rounded-2xl  bg-white hover:bg-gray-200" variant="outline"><Menu /></Button>} />
            <SheetContent className="flex flex-col">
                {user ? (
                    <>
                        <SheetHeader className="flex flex-row mt-14 pr-6 items-center justify-between">
                            <SheetTitle><h1 className="font-extrabold text-xl text-slate-800">Learn <span className="text-indigo-600 dark:text-white">Infinity</span></h1></SheetTitle>
                            <DarkMode />
                        </SheetHeader>
                        <nav className="flex flex-col space-y-4 px-4 pt-4">
                            <span>My learning</span>
                            <span>Profile</span>
                            {role === "instructor" && (<span>Dashboard</span>)}
                        </nav>
                        <SheetFooter>
                            <Button variant="destructive" type="submit">logout</Button>
                            <SheetClose render={<Button variant="outline">Close</Button>} />
                        </SheetFooter>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
                        <h2 className="text-xl font-semibold">Please log in to continue</h2>
                        <p className="text-sm text-gray-400">
                            Access your courses, profile, and dashboard by signing into your account.
                        </p>
                        <Button className="w-full bg-white border-gray-700 text-black hover:bg-gray-200">
                            Login
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}