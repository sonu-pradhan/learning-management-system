import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault()
        if (searchQuery.trim() !== "") {
            navigate(`/course/search?query=${searchQuery}`)
        }
        setSearchQuery("");
    };
    return (
        <div className="relative mt-18 py-16 px-4 h-100 
        dark:bg-[conic-gradient(from_225deg,#000004_0deg,#000006_18deg,#030309_36deg,#06060b_54deg,#09090e_72deg,#0c0c11_90deg,#0f0f14_108deg,#121317_126deg,#15161a_144deg,#19191d_162deg,#1c1c20_180deg,#1f2023_198deg,#222326_216deg,#252629_234deg,#28292c_252deg,#2b2c2f_270deg,#2e2f32_288deg,#313134_306deg,#333437_324deg,#353639_342deg,#38383c_360deg)]
        bg-[conic-gradient(from_225deg,#d4dec7_0deg,#c9d3c1_18deg,#bfc9bc_36deg,#b4bfb6_54deg,#aab5b1_72deg,#a0abac_90deg,#96a1a7_108deg,#8c98a2_126deg,#838e9d_144deg,#7a8698_162deg,#717d93_180deg,#69758e_198deg,#626d89_216deg,#5b6685_234deg,#555f80_252deg,#4f597c_270deg,#4a5378_288deg,#454e73_306deg,#414a6f_324deg,#3e466c_342deg,#3c4268_360deg)] text-center">
            <div className="max-w-3xl mx-auto ">
                <h1 className="text-zinc-800 dark:text-zinc-100 text-4xl font-bold mb-4">Ready to reimagine your career? </h1>
                <p className="text-white dark:text-gray-300 mb-8 ">
                    <span className="hidden md:block">
                        Level up your career with expert-led, flexible courses from Harvard faculty — plus insights from award-winning celebrities, including Cynthia Erivo, Amy Poehler, Michael B. Jordan, John Cena, and more.
                    </span>

                    <span className="block md:hidden">
                        Access world-class education from institutions like Harvard, MIT, and Cambridge.
                    </span>
                </p>
                <form onSubmit={searchHandler} className="flex items-center 
                bg-[linear-gradient(180deg,#dee6ea_0%,#cbd2df_20%,#b8bfce_40%,#a5aebc_60%,#929eab_80%,#8090a1_100%)] 
                dark:bg-[linear-gradient(0deg,#121216_0%,#1f2023_25%,#2b2c2f_50%,#36373a_75%,#3d3e42_100%)]
                rounded-full shadow-lg overflow-hidden max-w-xl h-10 mx-auto mt-14">
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Courses"
                        className="bg-white grow border-none focus-visible:ring-0 px-6 py-3 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300" />
                    <Button type="submit" className="text-slate-700 bg-[] dark:text-gray-200 px-6 py-5 rounded-r-full hover:bg-[#a5aebc] hover:text-zinc-900 cursor-pointer dark:hover:bg-[#2b2c2f]">Search</Button>
                </form>
                <Button onClick={() => navigate(`/course/search?query`)} className="bg-[#c5bbb8] dark:bg-[#09090e] dark:hover:bg-[#2b2c2f] dark:text-slate-200 text-neutral-900 rounded-full cursor-pointer mt-10 hover:bg-gray-200">Explore Courses<ChevronRight /></Button>
            </div>
        </div>
    )
}

export default HeroSection
