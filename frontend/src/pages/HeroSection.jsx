import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ChevronRight } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative bg-linear-to-r from-[#cbcaa5] to-[#385356] dark:from-[#385356] mt-18 dark:to-[#859398] py-16 px-4 h-100 text-center">
            <div className="max-w-3xl mx-auto ">
                <h1 className="text-zinc-700 text-4xl font-bold mb-4">Ready to reimagine your career? </h1>
                <p className="text-white dark:text-gray-400 mb-8">
                    <span className="hidden md:block">
                        Level up your career with expert-led, flexible courses from Harvard faculty — plus insights from award-winning celebrities, including Cynthia Erivo, Amy Poehler, Michael B. Jordan, John Cena, and more.
                    </span>

                    <span className="block md:hidden">
                        Access world-class education from institutions like Harvard, MIT, and Cambridge.
                    </span>
                </p>
                <form className="flex items-center bg-linear-to-r from-[#cbcaa5] to-[#385356] dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl h-10 mx-auto mt-14">
                    <Input
                        type="text" 
                        placeholder="Search Courses" 
                        className="bg-white grow border-none focus-visible:ring-0 px-6 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" />
                    <Button className="bg-[#526769] dark:bg-gray-700 text-slate-300 px-6 py-5 rounded-r-full hover:bg-[#526769] hover:text-zinc-900 cursor-pointer dark:hover:bg-blue-800">Search</Button>   
                </form>
                <Button className="bg-[#cbcaa5] dark:bg-gray-800 text-neutral-900 rounded-full cursor-pointer mt-10 hover:bg-gray-200">Explore Courses<ChevronRight/></Button>
            </div>
        </div>
    )
}

export default HeroSection
