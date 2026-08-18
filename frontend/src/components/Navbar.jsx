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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogoutUserMutation } from "@/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {

    const user = useSelector(store => store.auth.user);
    const role = user?.role;


    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const response = await logoutUser().unwrap();

            toast.success(response?.message || "User logged out.");

            navigate("/login");

        } catch (error) {
            toast.error(error?.data?.message || "Logout failed");
        }
    };


    return (
        <div className="h-18 bg-[linear-gradient(180deg,#dee6ea_0%,#cbd2df_20%,#b8bfce_40%,#a5aebc_60%,#929eab_80%,#8090a1_100%)] dark:bg-[linear-gradient(0deg,#121216_0%,#1f2023_25%,#2b2c2f_50%,#36373a_75%,#3d3e42_100%)] border-b dark:border-b-gray-800 border-b-[#dbdbdb] fixed top-0 left-0 right-0 duration-300 z-10">
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">

                <div className="flex items-center gap-2">
                    <LibraryBig size={"25"} className="text-slate-800 dark:text-slate-200" />
                    <Link to="/">
                        <h1 className="hidden md:block font-extrabold text-2xl text-slate-900 dark:font-semibold dark:text-white">Learn <span className="bg-[conic-gradient(from_270deg,#d4dec7_0deg,#b6c0b7_51.429deg,#98a4a8_102.857deg,#7e899a_154.286deg,#66718c_205.714deg,#535d7f_257.143deg,#454d73_308.571deg,#3c4268_360deg)]
                        dark:bg-[conic-gradient(from_225deg,#000004_0deg,#000006_18deg,#030309_36deg,#06060b_54deg,#09090e_72deg,#0c0c11_90deg,#0f0f14_108deg,#121317_126deg,#15161a_144deg,#19191d_162deg,#1c1c20_180deg,#1f2023_198deg,#222326_216deg,#252629_234deg,#28292c_252deg,#2b2c2f_270deg,#2e2f32_288deg,#313134_306deg,#333437_324deg,#353639_342deg,#38383c_360deg)] 
                        text-white dark:text-white">Infinity</span></h1>
                    </Link>
                </div>

                <div className="flex justify-center items-center gap-5 ">
                    {
                        user ?
                            (<DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar size="lg">
                                    <AvatarImage src={user?.profilePhoto || "https://github.com/shadcn.png"} alt="shadcn" />
                                    <AvatarFallback>LR</AvatarFallback>
                                </Avatar></Button>} />
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuItem><Link to="profile">Profile</Link></DropdownMenuItem>
                                        <DropdownMenuItem><Link to="my-learning">My Learning</Link></DropdownMenuItem> {role === "instructor" && (<DropdownMenuItem><Link to="/admin">Dashboard</Link></DropdownMenuItem>)}
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem variant="destructive" onClick={logoutHandler}>Logout<LogOut className="ml-8" /></DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>) :
                            (<div className="flex items-center cursor-pointer gap-2">
                                <Button variant="outline" onClick={() => navigate("/login?tab=login")}>Login</Button>
                                <Button variant="outline" onClick={() => navigate("/login?tab=signup")}>SignUp</Button>
                            </div>)
                    }<div className="pl-5">
                        <DarkMode />
                    </div>
                </div>
            </div>
            <div className="flex md:hidden items-center justify-between px-4 h-full">

                <div className="flex items-center gap-2">
                    <LibraryBig size={"20"} className="text-slate-800 dark:text-slate-200" />
                    <Link to="/">
                        <h1 className="font-extrabold text-xl text-slate-800 dark:font-semibold dark:text-white">Learn <span className="bg-[conic-gradient(from_270deg,#d4dec7_0deg,#b6c0b7_51.429deg,#98a4a8_102.857deg,#7e899a_154.286deg,#66718c_205.714deg,#535d7f_257.143deg,#454d73_308.571deg,#3c4268_360deg)]
                        dark:bg-[conic-gradient(from_225deg,#000004_0deg,#000006_18deg,#030309_36deg,#06060b_54deg,#09090e_72deg,#0c0c11_90deg,#0f0f14_108deg,#121317_126deg,#15161a_144deg,#19191d_162deg,#1c1c20_180deg,#1f2023_198deg,#222326_216deg,#252629_234deg,#28292c_252deg,#2b2c2f_270deg,#2e2f32_288deg,#313134_306deg,#333437_324deg,#353639_342deg,#38383c_360deg)]
                        text-white dark:text-white">Infinity</span></h1>
                    </Link>
                </div>

                <MobileNavbar />
            </div>
        </div >
    )
}

export default Navbar

const MobileNavbar = () => {

    const user = useSelector(store => store.auth.user);
    const role = user?.role;
    const [open, setOpen] = useState(false);

    const [logoutUser] = useLogoutUserMutation();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const response = await logoutUser().unwrap();

            toast.success(response?.message || "User logged out.");

            navigate("/login");

        } catch (error) {
            toast.error(error?.data?.message || "Logout failed");
        }
    };

    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);


    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button size="lg" className="rounded-2xl  bg-white hover:bg-gray-200" variant="outline"><Menu /></Button>} />
            <SheetContent className="flex flex-col">
                {user ? (
                    <>
                        <SheetHeader className="flex flex-row mt-14 pr-6 items-center justify-between">
                            <Link to="/" onClick={() => setOpen(false)}>
                                <SheetTitle><h1 className="font-extrabold text-xl text-slate-700 dark:text-slate-200">Learn <span className="bg-linear-to-r from-[#334d50] to-[#cbcaa5] dark: bg-clip-text text-transparent">Infinity</span></h1></SheetTitle>
                            </Link>
                            <DarkMode />
                        </SheetHeader>
                        <nav className="flex flex-col space-y-4 px-4 pt-4">
                            <span><Link to="my-learning" onClick={() => setOpen(false)}>My Learning</Link></span>
                            <span><Link to="profile" onClick={() => setOpen(false)}>Profile</Link></span>
                            {role === "instructor" && (<span><Link to="/admin">Dashboard</Link></span>)}
                        </nav>
                        <SheetFooter>
                            <Button variant="destructive" type="submit" onClick={logoutHandler}>logout</Button>
                            <SheetClose render={<Button variant="outline">Close</Button>} />
                        </SheetFooter>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
                        <h2 className="text-xl font-semibold">Please log in to continue</h2>
                        <p className="text-sm text-gray-400">
                            Access your courses, profile, and dashboard by signing into your account.
                        </p>
                        <Button className="w-full bg-white border-gray-700 text-black hover:bg-gray-200" onClick={() => navigate("/login?tab=signup")}>
                            Login
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}